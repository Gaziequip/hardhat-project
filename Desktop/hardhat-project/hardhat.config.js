require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: ["YOUR_PRIVATE_KEY_HERE"] // Replace with your testnet private key
    },
    bscMainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: ["7b51e639dcb3ebe9c00852f802cb3c6d2049c6356869715781a3ddcaf2826ead"], // Replace with your mainnet private key
      gasPrice: 5000000000, // 5 Gwei
      gasLimit: 5000000,
      timeout: 60000
    }
  }
};
