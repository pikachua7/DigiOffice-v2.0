import { ethers } from "ethers";
import { ACTIVE_CHAIN_ID } from ".././utils/constants/Constants";
import { DIGIOFFICE_CONTRACT } from ".././abis/DigiOfficeContract";

const getSigner = async () => {
    let signer;
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    return signer;
}

export const getPrimaryAccount = async () => {
    let provider;
    if (window.ethereum) {
        await window.ethereum.enable();
        provider = new ethers.providers.Web3Provider(window.ethereum);
    }
    else {
        return undefined; //no account detected
    }

    const accounts = await provider.listAccounts();
    return accounts[0];

}

export const deployContract = async (title, authorityAddress) => {
    const signer = await getSigner();

    // create contract factory
    const factory = new ethers.ContractFactory(
        DIGIOFFICE_CONTRACT.abi,
        DIGIOFFICE_CONTRACT.bytecode,
        signer
    );

    const validAddress = ethers.utils.getAddress(authorityAddress);

    // Deploy Contracts
    // Returns promise that resolves contract object
    let contract;
    contract = await factory.deploy(title, validAddress);
    await contract.deployed();
    console.log("Contract Deployed to Address : ", contract.address);
    return contract;
}

export const validAddress = (address) => {
    try {
        ethers.utils.getAddress(address);
        return true;
    }
    catch (error) {
        return false;
    }
}

export const markContractCompleted = async (contractAddress, signatureURL) => {
    if (!contractAddress || !signatureURL) {
        return {};
    }

    const signer = await getSigner();
    const digiofficeContract = new ethers.Contract(contractAddress, DIGIOFFICE_CONTRACT.abi, signer);
    const result = await digiofficeContract.completedSignatureURL(signatureURL);
    return result;
}