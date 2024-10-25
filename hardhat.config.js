require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.1",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/IeTm9gd49OLboNSR3Gc5psJVGl-h1rcO",
      accounts: [`a440f2d382785ee2e55e96d68b11b2466bfcadc339d5a92e03f136edd937740e`]
    }
  },
}
