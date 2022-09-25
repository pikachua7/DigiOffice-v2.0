import { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import PendingRequest from "../pendingRequest/PendingRequest";
import { useParams } from "react-router-dom";
import { createSignatureNFT, getMintedNFT } from "../../utils/nftport/NFTPort";
import { fetchIPFS } from "../../utils/ipfs/IPFS";
import { explorerURL } from "../../utils/constants/Constants";
import { getPrimaryAccount, markContractCompleted } from "../../contract/DigiOffice";
import ViewTransaction from "../ViewTransaction/ViewTransaction";

function AuthoritySign() {
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState(false);
    const [data, setData] = useState({});

    let params = useParams();
    let signID = params.signId;

    const fetchData = async () => {
        console.log("signID", signID);
        if (!signID) {
            return;
        }
        setLoading(true);

        //apply try catch if not works
        const account = await getPrimaryAccount();
        console.group(account);
        setAuth(!!account); //try setAuth(account)

        const res = await fetchIPFS(signID);
        setData(res.data);
        console.log("data", res.data);

        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const { description, title, authorityAddress, contractAddress } = data;

    const sign = async (signatureData) => {

        let nftResults = {};

        setLoading(true);

        let res = await createSignatureNFT(title, description, authorityAddress, signatureData);
        console.log(res);
        console.log(res.data);
        console.log(res.data.transaction_hash);
        let transaction_hash = res.data.transaction_hash;
        console.log(typeof transaction_hash)
        nftResults["signatureNFT"] = res.data;
        const url = nftResults["transaction_external_url"];
        console.log("url", url);
        res = await markContractCompleted(contractAddress, url || signID);
        nftResults = { nftResults, ...res };
        setResult(nftResults);
        console.log(nftResults);
        setLoading(false);
    }

    if (loading) {
        return (
            <Spin tip="Loading..." size="large" >
            </Spin>
        );
    }

    if (result) {
        return (
            <div className="container">
                <br />
                <br />
                <center><h1>Document Successfully Signed !!!</h1>
                    <a href={explorerURL(contractAddress)} target="_blank" rel="noreferrer">
                        View Contract
                    </a>
                    <ViewTransaction />
                </center>
            </div>
        )
    }

    else {
        return (
            // className="container boxed white"
            <div>
                <h2 className="centered">View User Request</h2>
                <br />
                <PendingRequest {...data} sign={sign} signID={signID} auth={auth} />
            </div>

        )
    }

}

export default AuthoritySign;