import axios from "axios";
import { COVALENT_KEY } from "../constants/Constants";

export const getTransactions = (chainId, address) => {
    const url = `https://api.covalenthq.com/v1/${chainId}/address/${address}/transactions_v2/?&key=${COVALENT_KEY}`;
    console.log(url);
    return axios.get(url);
};