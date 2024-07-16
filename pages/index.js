import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

const ETH_TO_USD_RATE = 2500;

export default function HomePage() {
    const [ethWallet, setEthWallet] = useState(undefined);
    const [account, setAccount] = useState(undefined);
    const [atm, setATM] = useState(undefined);
    const [balance, setBalance] = useState(undefined);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [loadingBalance, setLoadingBalance] = useState(true);
    const [loadingTransactionHistory, setLoadingTransactionHistory] = useState(true);
    const [recipient, setRecipient] = useState("");
    const [transferAmount, setTransferAmount] = useState("");
    const [atmStatus, setATMStatus] = useState(false); // ATM status: false for closed, true for open

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const atmABI = atm_abi.abi;

    const checkMetaMask = async () => {
        if (window.ethereum) {
            await connectMetaMask();
        } else {
            console.error("MetaMask is not installed");
        }
    };

    const connectMetaMask = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setEthWallet(provider);
            const accounts = await provider.listAccounts();
            handleAccount(accounts);
        } catch (error) {
            console.error("Error connecting MetaMask:", error);
        }
    };

    const handleAccount = (accounts) => {
        if (accounts && accounts.length > 0) {
            console.log("Account connected: ", accounts[0]);
            setAccount(accounts[0]);
            initializeATMContract();
        } else {
            console.log("No account found");
        }
    };

    const initializeATMContract = () => {
        if (!ethWallet) return;

        const signer = ethWallet.getSigner();
        const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

        setATM(atmContract);
        console.log("ATM Contract initialized:", atmContract.address);

        getBalance();
        fetchTransactionHistory();
    };

    const getBalance = async () => {
        if (!atm) return;

        try {
            setLoadingBalance(true);
            const balance = await atm.getBalance();
            console.log("Balance fetched:", balance.toString());
            setBalance(balance.toString());
            setLoadingBalance(false);
        } catch (error) {
            console.error("Error fetching balance:", error);
            setLoadingBalance(false);
        }
    };

    const deposit = async () => {
        if (!atm) return;

        try {
            const tx = await atm.deposit(1);
            await tx.wait();
            getBalance();
            fetchTransactionHistory();
            updateTransactionHistory("Transfused blood");
        } catch (error) {
            console.error("Error depositing:", error);
        }
    };

    const withdraw = async () => {
        if (!atm) return;
    
        try {
            const tx = await atm.withdraw(1);
            await tx.wait();
            getBalance();
            fetchTransactionHistory();
            updateTransactionHistory("Extracted blood");
        } catch (error) {
            console.error("Error withdrawing:", error);
        }
    };
    

    const transferETH = async () => {
        if (!atm || !recipient || !transferAmount) return;

        try {
            const tx = await atm.transferETH(recipient, transferAmount);
            await tx.wait();
            console.log(`Donated ${transferAmount} blood to ${recipient}`);
            getBalance();
            fetchTransactionHistory();
            updateTransactionHistory(`Donated ${transferAmount} blood to ${recipient}`);
            setRecipient("");
            setTransferAmount("");
        } catch (error) {
            console.error("Error Donating Blood:", error);
        }
    };

    const updateTransactionHistory = (action) => {
        setTransactionHistory([
            ...transactionHistory,
            {
                action: action,
                amount: transferAmount,
                timestamp: new Date().toLocaleDateString()
            }
        ]);
    };

    const fetchTransactionHistory = async () => {
        if (!atm) return;

        try {
            setLoadingTransactionHistory(true);

            const length = await atm.getTransactionHistoryLength();
            const transactions = [];
            for (let i = 0; i < length; i++) {
                const txn = await atm.getTransaction(i);
                const action = txn[1] === account ? "Extraction" : "Transfusion";
                const amount = ethers.utils.formatEther(txn[3]);
                const timestamp = new Date(txn[0] * 1000).toLocaleDateString();

                transactions.push({
                    action: action,
                    amount: amount,
                    timestamp: timestamp
                });
            }

            console.log("Transaction history:", transactions);
            setTransactionHistory(transactions);
            setLoadingTransactionHistory(false);
        } catch (error) {
            console.error("Error fetching transaction history:", error);
            setLoadingTransactionHistory(false);
        }
    };

    const openATM = async () => {
        try {
            if (!atm) return;

            // Perform open ATM logic (if any)
            console.log("Opening Blood Bank...");
            setATMStatus(true); // Update ATM status to open
        } catch (error) {
            console.error("Error opening Blood Bank:", error);
        }
    };

    const closeATM = async () => {
        try {
            if (!atm) return;

            // Perform close ATM logic (if any)
            console.log("Closing Blood Bank...");
            setATMStatus(false); // Update ATM status to closed
        } catch (error) {
            console.error("Error closing Blood Bank:", error);
        }
    };

    const deleteTransactionHistory = async () => {
        try {
            // Perform delete transaction history logic
            console.log("Deleting transaction history...");
            setTransactionHistory([]);
        } catch (error) {
            console.error("Error deleting transaction history:", error);
        }
    };

    useEffect(() => {
        checkMetaMask();
    }, []);

    useEffect(() => {
        if (ethWallet) {
            initializeATMContract();
        }
    }, [ethWallet]);

    return (
        <main className="container">
            <header><h1>Welcome to Blood Bank!</h1></header>
            {ethWallet && account ? (
                <div>
                    <p>Your Account: {account}</p>
                    <p>Your Balance: {loadingBalance || balance === undefined ? '0' : ethers.utils.formatEther(balance)} blood</p>
                    <button onClick={deposit} disabled={!atm || !atmStatus}>Transfuse blood</button>
                    <button onClick={withdraw} disabled={!atm || !atmStatus}>Extract blood</button>

                    <div>
                        <h2>Transfer Blood</h2>
                        <label htmlFor="recipient">Recipient Address:</label>
                        <input id="recipient" type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
                        <label htmlFor="transferAmount">Amount:</label>
                        <input id="transferAmount" type="text" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} />
                        <button onClick={transferETH} disabled={!atm || !recipient || !transferAmount}>Transfer</button>
                    </div>

                    <div>
                        <h2>Transaction History</h2>
                        {loadingTransactionHistory ? (
                            <p>Loading transaction history...</p>
                        ) : (
                            <ul>
                                {transactionHistory.map((tx, index) => (
                                    <li key={index}>
                                        <div>{tx.timestamp}</div>
                                        <div>{tx.action}</div>
                                        <div>{tx.amount} blood</div>
                                        <br />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            ) : (
                <p>Please install MetaMask and connect to use this Blood Bank.</p>
            )}
            <button onClick={openATM} disabled={!atm || !ethWallet || atmStatus}>Open Blood Bank</button>
            <button onClick={closeATM} disabled={!atm || !ethWallet || !atmStatus}>Close Blood Bank</button>
            <style jsx>{`
                .container {
                    text-align: center;
                    margin-top: 50px;
                    background-color: #ffebeb;
                    color: #b00000;
                    border: 2px solid #b00000;
                    border-radius: 15px;
                    padding: 20px;
                    font-family: "Comic Sans MS", cursive, sans-serif;
                    font-size: 16px;
                    letter-spacing: 2px;
                    word-spacing: 2px;
                    font-weight: normal;
                    text-decoration: none;
                    font-style: normal;
                    font-variant: normal;
                    text-transform: none;
                }
                button {
                    margin: 10px;
                    background-color: #b00000;
                    font-family: "Comic Sans MS", cursive, sans-serif;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                }
                button:disabled {
                    background-color: #f5a4a4;
                    cursor: not-allowed;
                }
                h1 {
                    color: #b00000;
                    font-family: "Times New Roman", Times, serif;
                    font-size: 28px;
                    letter-spacing: 0.8px;
                    word-spacing: 0.8px;
                    font-weight: 700;
                    text-decoration: underline solid;
                    font-variant: normal;
                    text-transform: uppercase;
                }
                input {
                    margin: 5px;
                    padding: 5px;
                    border: 1px solid #b00000;
                    border-radius: 5px;
                }
            `}</style>
        </main>
    );
}
