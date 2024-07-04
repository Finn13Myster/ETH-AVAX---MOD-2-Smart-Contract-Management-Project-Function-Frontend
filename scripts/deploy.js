// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const initBalance = ethers.utils.parseEther("1.0"); // Initial balance in ether
  const interestRate = 1000; // Example interest rate: 100%
  const interestInterval = 1; // Example interval: 10 seconds

  // Get the ContractFactory and deploy the Assessment contract
  const Assessment = await hre.ethers.getContractFactory("Assessment");
  const assessment = await Assessment.deploy(initBalance, interestRate, interestInterval);

  await assessment.deployed();

  console.log(`Assessment contract deployed to: ${assessment.address}`);
  console.log(`Initial balance: ${ethers.utils.formatEther(initBalance)} ETH`);
  console.log(`Interest rate set to: ${interestRate}%`);
  console.log(`Interest interval set to: ${interestInterval} seconds`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });