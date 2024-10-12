import { createApp } from "@deroll/app";
import { createWallet } from "@deroll/wallet";
import { Hex, Address, toHex, getAddress, hexToNumber, hexToString  } from "viem";

const app = createApp({url: process.env.ROLLUP_HTTP_SERVER_URL || "http://127.0.0.1:5004"});

const wallet = createWallet();

// Constants for LCG (can be customized as needed)
const a = 1664525;
const c = 1013904223;
const m = Math.pow(2, 32);

// Linear Congruential Generator (LCG) function
function lcg(seed: number): number {
  return (a * seed + c) % m;
}

var attempts: number = 0; 

app.addAdvanceHandler(wallet.handler);




// Function to convert a flat array back to a 2D array
function convertFlatArrayTo2DArray(flatArray: Uint8Array, rows: number, cols: number): number[][] {
  let index = 0;
  const twoDArray: number[][] = []; // Make sure this is a 2D array of numbers

  for (let i = 0; i < rows; i++) {
    const row: number[] = []; // Declare the row as a number[] array
    for (let j = 0; j < cols; j++) {
      const value = flatArray[index]!; // Use the non-null assertion operator to assert it's a number
      row.push(value); // Push the value into the row array
      index++;
    }
    twoDArray.push(row); // Push the row into the 2D array
  }

  return twoDArray;
}



// {"method":"generate_random","rows":5,"cols":5,"max":4}
// 0x7b226d6574686f64223a2267656e65726174655f72616e646f6d222c22726f7773223a352c22636f6c73223a352c226d6178223a347d

function generateRandomObstacleDataFromHex(rows: number, cols: number, min: number, max: number): number[][] {
  // Convert the hex payload to a numeric seed and factor in the number of attempts

  let seed = attempts;

  // console.log("attempt:",attempts);


  // Create the 2D array of random obstacle data
  const random2DArray: number[][] = Array.from({ length: rows }, () => {
    const row = new Array(cols).fill(0); // Initialize a row of zeros
    seed = lcg(seed); // Generate the next random number for the index
    const randomIndex = seed % cols; // Random index for the non-zero element

    seed = lcg(seed); // Generate the next random number for the value
    const randomValue = seed % (max - min + 1) + min; // Random value between min and max

    row[randomIndex] = randomValue; // Place the random value in the random index
    return row;
  });

  return random2DArray;
}

app.addAdvanceHandler(async ({ metadata, payload }) => {
  const payloadString = hexToString(payload);
  console.log("Payload: ", payloadString);
  const sender = getAddress(metadata.msg_sender);
  const jsonPayload = JSON.parse(payloadString) as {
    method: string;
    rows: number;
    cols: number;
    max: number;
  };

  if (jsonPayload.method === "generate_random") {
    // Increment the number of attempts before generating the random obstacle data
    attempts += 1;

    // Generate a 2D array of random obstacle data using hex payload and attempts
    const randomObstacleData = generateRandomObstacleDataFromHex(jsonPayload.rows, jsonPayload.cols, 1, jsonPayload.max);
    console.log("2D Array created: ", randomObstacleData);

    // Convert the 2D array to a flat Uint8Array and send it back as hex
    const flatArray = randomObstacleData.flat();
    const arr = new Uint8Array(flatArray);
    console.log("1D Array created: ", arr);
    console.log("Convert back to 2d: ", convertFlatArrayTo2DArray(arr, 5, 5))
    app.createNotice({ payload: toHex(arr) });
  }

  return "accept";
});

app.start().catch((e) => {
  console.error(e);
  process.exit(1);
});
