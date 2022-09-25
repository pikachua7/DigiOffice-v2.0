export const PREFILLED_FORM = {
    title: "Apply for Passport",
    description: "Applying Visa for going to : ",
    authorityAddress: "0x4D97F9Fc23Ce4B0be1F59d450B1acF550f18da5A",
    files: []
}

export const APP_NAME = "DigiOffice";
export const APP_DESC = "Leading towards a Paperless Revolution";

export const CHAIN_OPTIONS = {
    80001: {
        name: "Mumbai Testnet",
        url: "https://mumbai.polygonscan.com/",
        id: 80001
    }
};

export const ACTIVE_CHAIN_ID = CHAIN_OPTIONS["80001"];

export const IPFS_BASE_URL = "https://ipfs.moralis.io:2053/ipfs";

export const COVALENT_KEY = "ckey_9330b642fdfb41c2ab4593fe705";
export const NFT_PORT_KEY = "702a0efe-0092-4ee6-adee-f0e396774018";
export const LIVEPEER_KEY = "20d69c53-f581-4241-9598-3d2c22aef5a1";
export const MORALIS_APP_ID = "3YV0TGjMFukNbi6ifz9KmgYm8glU38ljH6CZQ5Tc";
export const MORALIS_SERVER = "https://6pvmf4enpar2.usemoralis.com:2053/server";

export const ipfsURL = (cid, fileName) => {
    let url = `${IPFS_BASE_URL}/${cid}`;
    if (fileName) {
        return `${url}/${fileName}`;
    }
    return url;
}

export const authorityURL = (cid) => `${window.location.origin}/authority/sign/${cid}`;

export const explorerURL = (address, txID) => `${ACTIVE_CHAIN_ID.url}${txID ? "tx/" : "address/"}${address}`;

