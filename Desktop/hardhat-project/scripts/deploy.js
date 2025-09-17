const { ethers } = require("hardhat");

async function main() {
  // Deploy DevToken (not MegaDrainer)
  const DevToken = await ethers.getContractFactory("DevToken");
  const devToken = await DevToken.deploy(
    "Test Token",   // name
    "TT",           // symbol
    18,             // decimals
    ethers.parseEther("1000000") // totalSupply (1 million tokens)
  );

  await devToken.waitForDeployment();

  console.log("DevToken deployed to:", await devToken.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
