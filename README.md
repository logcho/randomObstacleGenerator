# randomObstacleGenerator

`randomObstacleGenerator` is a project that generates a 2D array filled with random obstacles represented by random numbers placed at random indexes. This project leverages Cartesi to create and manage the random generation process.

## Features

- **2D Array Generation**: Creates a 2D array of specified dimensions.
- **Random Obstacles**: Fills the array with random numbers at random indices, simulating obstacles in a grid.

## Technologies Used

- **Cartesi**: Used for executing computations off-chain while maintaining security and transparency.
- **JavaScript/TypeScript**: Programming language used for developing the random obstacle generation logic.

## Installation

1. **Set Up the Cartesi Environment**: Make sure you have Cartesi set up and running on your machine.

2. **Build the DApp**:
   - Navigate to the `dapp` directory:
     ```bash
     cd dapp
     ```
   - Install the necessary dependencies:
     ```bash
     npm install
     ```
   - Build the Cartesi project:
     ```bash
     cartesi build
     ```

3. **Set Up the Web Interface**:
   - Navigate to the `web` directory:
     ```bash
     cd ../web
     ```
   - Install the necessary dependencies:
     ```bash
     npm install
     ```

## Usage

1. **Run the Cartesi DApp**:
   - Navigate to the `dapp` directory:
     ```bash
     cd dapp
     ```
   - Run the Cartesi DApp:
     ```bash
     cartesi run
     ```

2. **Run the Development Server**:
   - Navigate to the `web` directory:
     ```bash
     cd ../web
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

3. **Access the Application**: Open your browser and go to [http://localhost:3000](http://localhost:3000) (or the specified port) to interact with the random obstacle generator.

## Project Structure

- `/dapp`: Contains the Cartesi DApp logic for generating the 2D array and placing obstacles.
- `/web`: Contains the frontend code for the web interface.
- `index.js`: The entry point for executing the random obstacle generation.

## Contribution

Contributions are welcome! If you have suggestions or improvements, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact [your_email@example.com](mailto:lsjcwma@gmail.com).
