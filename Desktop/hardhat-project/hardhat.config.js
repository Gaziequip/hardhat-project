require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables

module.exports = {
  solidity: "0.8.19",
  networks: {
    bsctest: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: [process.env.d7f29e8df968d002cb827ddd813477515f98852cd8ba78261981eb898ed23747], // Now correctly loaded
    },
  },
};
