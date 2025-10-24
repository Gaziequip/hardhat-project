const { ethers } = require("hardhat");

async function main() {
  console.log("🔍 Checking wallet balance...\n");
  
  // Get signer
  const [signer] = await ethers.getSigners();
  const address = await signer.getAddress();
  
  console.log("Wallet Address:", address);
  
  // Get balance
  const balance = await signer.provider.getBalance(address);
  const balanceInBNB = ethers.formatEther(balance);
  const balanceInUSD = (parseFloat(balanceInBNB) * 1072.31).toFixed(2); // Approx BNB price
  
  console.log("Current Balance:", balanceInBNB, "BNB");
  console.log("Approximate Value: $" + balanceInUSD + " USD");
  
  // Check if sufficient for deployment
  const required = ethers.parseEther("0.003");
  const recommended = ethers.parseEther("0.005");
  
  console.log("\n💰 Deployment Requirements:");
  console.log("- Minimum needed: 0.003 BNB");
  console.log("- Recommended: 0.005 BNB");
  
  if (balance >= recommended) {
    console.log("✅ Sufficient funds for deployment");
    console.log("✅ Ready to deploy to mainnet");
  } else if (balance >= required) {
    console.log("⚠️  Sufficient for basic deployment but consider adding more");
  } else {
    console.log("❌ Insufficient funds for deployment");
    const needed = ethers.formatEther(required - balance);
    console.log("Please add at least", needed, "BNB more");
    process.exit(1);
  }
  
  // Show nonce (transaction count)
  const nonce = await signer.provider.getTransactionCount(address);
  console.log("\n🔢 Current Nonce:", nonce);
  
  console.log("\n📋 Next Steps:");
  console.log("1. If balance is sufficient, run: npx hardhat run scripts/deploy-safe.js --network bscMainnet");
  console.log("2. Always verify on BscScan after deployment");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
