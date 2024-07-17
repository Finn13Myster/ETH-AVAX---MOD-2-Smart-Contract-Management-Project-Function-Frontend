# Smart Contract Management Project

The program is built to implement a high degree of automation, together with security and regulatory compliance, through an ATM-based robust smart contract management subsystem. Utilizing blockchain technology, the system ensures that only permitted transactions are processed, maintaining all security aspects. Simultaneously, it automates transaction execution to avoid errors and speed impacts. It integrates both KYC and AML regulations directly into the smart contracts, helping to automate compliance with standards at all transaction levels. The system also includes smart, self-executing contracts that automatically ensure regulatory compliance, thereby improving transaction security via ATMs.

## Description

This project aims to provide a comprehensive solution for managing smart contracts with a focus on automation, security, and regulatory compliance. By leveraging blockchain technology, the system ensures that transactions are processed securely and efficiently. It integrates Know Your Customer (KYC) and Anti-Money Laundering (AML) regulations into the smart contracts, automating compliance processes. The project also features self-executing contracts that enhance security and compliance in ATM transactions. This solution is ideal for financial institutions seeking to streamline their operations while adhering to regulatory requirements.

## Code Explanation

### Frontend Code (`HomePage.js`)

This React component interfaces with the Ethereum blockchain to manage and display information related to the Blood Bank DApp. Key functionalities include:

- **MetaMask Integration:** The app checks if MetaMask is installed and connects to the user's account.
- **ATM Contract Initialization:** Once connected, it initializes the ATM smart contract.
- **Balance Management:** The component fetches and displays the user's balance and updates it after transactions.
- **Transaction History:** It maintains and displays the history of transactions, including deposits, withdrawals, and transfers.
- **Deposit and Withdraw:** Functions for depositing and withdrawing blood (ETH) are implemented, with corresponding transaction history updates.
- **Transfer Functionality:** Allows the user to transfer blood (ETH) to another account, recording the transaction details.
- **UI Elements:** Buttons and input fields for interacting with the contract and managing transactions.

### Smart Contract (`Assessment.sol`)

This Solidity contract implements the backend logic for the Blood Bank DApp. Key features include:

- **Owner Management:** The contract owner can deposit and withdraw blood (ETH), and interest is accrued over time.
- **Interest Calculation:** Interest on the deposited blood (ETH) is calculated and added periodically.
- **Transaction Recording:** Each transaction (deposit, withdraw, transfer) is recorded with a timestamp and action performed.
- **Balance Management:** User balances are maintained, with checks to ensure sufficient funds for transactions.
- **Events:** Emits events for deposits, withdrawals, interest accruals, and transaction recordings, providing a log for frontend updates.
- **Modifiers:** Includes a modifier to calculate and accrue interest automatically when certain functions are called.

## Getting Started

### Installing and Executing the Program

1. **Clone this Public Repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Open Two Additional Terminals in Visual Studio Code (VS Code):**

4. **Start a Local Ethereum Node Using Hardhat in the Second Terminal:**
    ```bash
    npx hardhat node
    ```

5. **Deploy Smart Contracts to the Local Network (Hardhat Node) in the Third Terminal:**
    ```bash
    npx hardhat run --network localhost scripts/deploy.js
    ```

6. **Launch the Next.js Frontend in the First Terminal:**
    ```bash
    npm run dev
    ```

After completing these steps, the project will be running locally at [http://localhost:3000/](http://localhost:3000/).

### Setting Up MetaMask

To interact with the local Hardhat node, set up MetaMask as follows:

1. **Open MetaMask in Your Browser Extension.**

2. **Navigate to the Three Dots in the Top-Right Corner of the Extension.**

3. **Go to Settings and then Networks.**

4. **Click on "Add Network" to Manually Add a Network.**

5. **Enter the Following Details:**
    - **Network Name:** Any name
    - **New RPC URL:** [http://127.0.0.1:8545/](http://127.0.0.1:8545/)
    - **Chain ID:** 31337
    - **Currency Symbol:** ETH

6. **Import Account #0 (Owner):**
    - From the terminal where you have the list of all Hardhat addresses, copy the private key of Account #0.
    - In MetaMask, navigate to the Account tab.
    - Click on "Import Account."
    - Paste the copied private key into the field.
    - Click "Import."

### Executing the Program

Once MetaMask is set up and connected:

1. **Refresh the Website:** 
    - You should see text views such as the header, your account address, and your balance in the system.

2. **Use MetaMask to Confirm Transactions:** 
    - Use the deposit or withdraw buttons.

3. **Real-Time Transaction History:** 
    - Transaction history will update automatically after each successful transaction, showing details such as timestamp, action performed, and amount.

### Help: Fix Nonce Error

If you encounter nonce errors in Solidity with MetaMask:

1. **Open Your MetaMask Extension.**

2. **Navigate to the Three Dots in the Top-Right Corner.**

3. **Go to Settings and then Advanced.**

4. **Scroll Down to Find and Click on "Clear Activity Tab Data."**

## Author

- Franz Leeann U. Ferry [@LinkedIn](www.linkedin.com/in/franz-leeann-ferry-a286552a2)

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details
