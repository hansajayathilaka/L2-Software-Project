require('dotenv').config({path:__dirname+'/.env'})
require("@nomicfoundation/hardhat-toolbox");

const privateKey = process.env.PRIVATE_KEY
const projectId = process.env.INFURA_PROJECT_ID;
const polygonScanApiKey = process.env.POLYGON_ETHER_SCAN_APIKEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    polygonMumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: polygonScanApiKey
    }
  },
  solidity: "0.8.19"
};
