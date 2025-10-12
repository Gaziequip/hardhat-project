const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying MegaDrainer contract...");
  
  // Token parameters
  const name = "MegaDrainer Token";
  const symbol = "MDT";
  const decimals = 18;
  const totalSupply = ethers.parseEther("1000000"); // 1 million tokens
  
  const MegaDrainer = await ethers.getContractFactory("MegaDrainer");
  const contract = await MegaDrainer.deploy(name, symbol, decimals, totalSupply);
  
  await contract.waitForDeployment();
  
  console.log("MegaDrainer deployed to:", await contract.getAddress());
  console.log("Token Name:", await contract.name());
  console.log("Token Symbol:", await contract.symbol());
  console.log("Total Supply:", ethers.formatEther(await contract.totalSupply()));
  
  // Save contract address and ABI
  const fs = require("fs");
  const contractAddress = await contract.getAddress();
  const contractABI = JSON.stringify(MegaDrainer.interface.fragments, null, 2);
  
  fs.writeFileSync("contract-address.txt", contractAddress);
  fs.writeFileSync("contract-abi.json", contractABI);
  
  console.log("Contract address saved to contract-address.txt");
  console.log("Contract ABI saved to contract-abi.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
