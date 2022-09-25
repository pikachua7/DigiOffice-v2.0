const hre = require("hardhat");

async function main() {
    const DigiOffice = await hre.ethers.getContractFactory("DigiOffice");
    const digioffice = await DigiOffice.deploy("DigiOffice", "0x4D97F9Fc23Ce4B0be1F59d450B1acF550f18da5A");

    await digioffice.deployed();

    console.log("DigiOffice Contract deployed to:", digioffice.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });