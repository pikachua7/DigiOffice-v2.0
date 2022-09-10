export const PREFILLED_FORM = {
    title: "Apply for Passport",
    description: "Applying Visa for going to",
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

export const COVALENT_KEY = process.env.COVALENT_KEY;
export const NFT_PORT_KEY = process.env.NFT_PORT_KEY;
export const MORALIS_APP_ID = process.env.MORALIS_ID;
export const MORALIS_SERVER = process.env.MORALIS_SERVER;