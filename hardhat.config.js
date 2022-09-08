require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const dotenv = require("dotenv");

dotenv.config({ path: __dirname + '/.env' });
const { POLYGON_URL, PRIVATE_KEY } = process.env;


module.exports = {
  solidity: "0.8.15",
  networks: {
    polygon: {
      url: POLYGON_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 80001
    }
  }
};


//Deployed contract address : 0xC0beEC1B54b1A6f7B333144ca0ee1e2f0B40dd6c