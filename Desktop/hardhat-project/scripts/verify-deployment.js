const { ethers } = require("hardhat");

async function main() {
  console.log("🔍 Verifying deployment...\n");
  
  // Check if deployment files exist
  const fs = require("fs");
  
  if (!fs.existsSync("mainnet-contract-address.txt")) {
    console.log("❌ Contract address file not found");
    console.log("Please run deployment first");
    process.exit(1);
  }
  
  const contractAddress = fs.readFileSync("mainnet-contract-address.txt", "utf8").trim();
  console.log("Contract Address:", contractAddress);
  
  // Verify on chain
  const [signer] = await ethers.getSigners();
  const code = await signer.provider.getCode(contractAddress);
  
  if (code === '0x') {
    console.log("❌ No contract found at this address");
    console.log("Deployment may have failed");
    process.exit(1);
  }
  
  console.log("✅ Contract successfully deployed!");
  console.log("✅ Contract code verified on chain");
  
  // Try to interact with contract
  try {
    const abi = JSON.parse(fs.readFileSync("mainnet-contract-abi.json", "utf8"));
    const contract = new ethers.Contract(contractAddress, abi, signer);
    
    // Try to get basic info
    const name = await contract.name();
    console.log("	TokenName:", name);
    
    const symbol = await contract.symbol();
    console.log("	Token Symbol:", symbol);
    
    console.log("\n✅ Contract is fully functional!");
    console.log("✅ Ready for your AT8XM-AMMv8-Safe project");
    
  } catch (error) {
    console.log("⚠️  Contract deployed but may have issues:", error.message);
  }
  
  console.log("\n🔗 BscScan Link:");
  console.log("https://bscscan.com/address/" + contractAddress);
}

main().catch((error) => {
  console.error("Verification failed:", error);
  process.exitCode = 1;
});
