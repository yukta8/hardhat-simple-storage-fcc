require("@nomicfoundation/hardhat-toolbox");
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")  //how many lines of code in .sol is tested

require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia"  
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

  module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url : SEPOLIA_RPC_URL,
      accounts : [PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost : {
      url : "http://127.0.0.1:8545/",
      chainId: 31337,

    }
  },
  solidity: "0.8.8",
  etherscan : {
    apiKey : ETHERSCAN_API_KEY
  },
  gasReporter : {
    enabled : false,
    outputFile : "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap : COINMARKETCAP_API_KEY,  // makes an api call to coin market cap whenever we run our gas reporter
    token: "MATIC",  //deploying to polygon
  }
}
