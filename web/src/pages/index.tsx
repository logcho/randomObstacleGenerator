"use client"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useWriteInputBoxAddInput } from "../hooks/generated";
import { Hex, stringToHex, fromHex } from "viem";

import { useEffect, useState } from 'react';
import { fetchGraphQLData } from '../utils/api';
import { Notice } from '../utils/types';
import { NOTICES_QUERY } from '../utils/queries';


const Home: NextPage = () => {


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

  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  const fetchNotices = async () => {
    try {
      const data = 
      await fetchGraphQLData<{ notices: 
      { edges: { node: Notice }[] } }>(NOTICES_QUERY);
      setNotices(data.notices.edges.map(edge => edge.node));
    } finally {
      setLoading(false);
    }
  };

  fetchNotices();
  // }, []);
  const dAppAddress = `0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e`;


  const { isPending, isSuccess, error, writeContractAsync } = useWriteInputBoxAddInput();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    await writeContractAsync({
      args: [
        dAppAddress,
        '0x7b226d6574686f64223a2267656e65726174655f72616e646f6d222c22726f7773223a352c22636f6c73223a352c226d6178223a347d'
      ],
    });
    console.log("sent");
    fetchNotices();
  }
  return (
    <div className={styles.container}>
      <ConnectButton />
      <form onSubmit={submit}>
        <button type="submit">test</button>

      </form>
      {notices.map((notice, idx) => {
        const twoDArray = convertFlatArrayTo2DArray(fromHex(notice.payload as Hex, 'bytes'), 5, 5);
        return (
          <div key={idx}>
            <h2>Notice {idx + 1}:</h2>
            <table>
              <tbody>
                {twoDArray.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((value, colIndex) => (
                      <td key={colIndex}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}

    </div>
  );
};

export default Home;
