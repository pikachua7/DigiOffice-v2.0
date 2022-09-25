import axios from "axios";
import { Moralis } from "moralis";
import { ACTIVE_CHAIN_ID, IPFS_BASE_URL } from "../constants/Constants";

export const saveToIPFS = async (obj, filename) => {
    const file = new Moralis.File(filename || "metadata.json", {
        base64: btoa(JSON.stringify(obj)),
    });
    await file.saveIPFS();
    return file;
}

export const uploadFiles = async (title, description, authorityAddress, contractAddress, files) => {
    const params = {
        chainID: ACTIVE_CHAIN_ID.id
    }
    await Moralis.authenticate(params);

    const outputObject = {
        title,
        description,
        authorityAddress,
        contractAddress,
        files: []
    };

    for (let i in files) {
        const file = files[i];
        console.log("file : ", file);
        const fileObject = new Moralis.File(file.name, file);
        console.log("fileObject : ", fileObject);
        await fileObject.saveIPFS();
        console.log("saved to ipfs")
        outputObject.files.push({
            name: file.name,
            hash: fileObject.hash(),
            url: fileObject.ipfs()
        });
        console.log("outputObject : ", outputObject);
    }

    return await saveToIPFS(outputObject);
}

export const fetchIPFS = async (ipfsHash) => {
    const url = `${IPFS_BASE_URL}/${ipfsHash}`;
    const response = await axios.get(url);
    console.log("Fetch from IPFS : ", response, url);
    return response;
}