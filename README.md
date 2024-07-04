#Getting Started
Installing
To run this program, follow these steps:

Clone this public repository.

bash
Copy code
git clone [<repository-url>](https://github.com/MetacrafterChris/SCM-Starter.git)
cd <repository-directory>
Inside the project directory, install dependencies:

bash
Copy code
npm install
Open two additional terminals in your Visual Studio Code (VS Code).

In the second terminal, start a local Ethereum node using Hardhat:

bash
Copy code
npx hardhat node
In the third terminal, deploy smart contracts to the local network (Hardhat node):

bash
Copy code
npx hardhat run --network localhost scripts/deploy.js
Back in the first terminal, launch the Next.js frontend:

bash
Copy code
npm run dev
After completing these steps, the project will be running locally at http://localhost:3000/.

Setting up MetaMask
To interact with the local Hardhat node, set up MetaMask as follows:

Open MetaMask in your browser extension.

Navigate to the three dots in the top-right corner of the extension.

Go to Settings and then Networks.

Click on "Add Network" to manually add a network.

Enter the following details:

Network Name: Any name
New RPC URL: http://127.0.0.1:8545/
Chain ID: 31337
Currency Symbol: ETH
Import Account #0 (Owner)
To import the account used by Hardhat:

From the terminal where you have the list of all Hardhat addresses, copy the private key of Account #0.

In MetaMask, navigate to the Account tab.

Click on "Import Account."

Paste the copied private key into the field.

Click "Import."

Executing the Program
Once MetaMask is set up and connected:

Refresh the website to see text views such as the header, your account address, and your balance in the system.

Use MetaMask to confirm transactions when using the deposit or withdraw buttons.

Real-time transaction history will update automatically after each successful transaction, showing details such as timestamp, action performed, and amount.

Help: Fix Nonce Error
If you encounter nonce errors in Solidity with MetaMask:

Open your MetaMask extension.

Navigate to the three dots in the top-right corner.

Go to Settings and then Advanced.

Scroll down to find and click on "Clear Activity Tab Data."

Author

Franz Leeann U. Ferry