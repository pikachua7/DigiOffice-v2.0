import { useState } from "react";
import { Button, Input, Row, Col, Radio, Steps } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { PREFILLED_FORM, authorityURL, explorerURL, ipfsURL } from "../../utils/constants/Constants";
import { uploadFiles } from "../../utils/ipfs/IPFS";
import DropFile from "../dropfile/DropFile";
import { deployContract, validAddress } from "../../contract/DigiOffice";
import { useNavigate } from 'react-router-dom';
export let cid;

function CreateRequest() {
    const [data, setdata] = useState({ ...PREFILLED_FORM })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [result, setResult] = useState();

    const navigate = useNavigate();

    const goToChat = () => {
        navigate("/user/chat");
    }

    const updateData = (key, value) => {
        setdata({ ...data, [key]: value });
    }

    const isValid = (data) => {
        return (data.title && data.description && data.files.length > 0 && validAddress(data.authorityAddress))
    }

    const isValidData = isValid(data);

    const createRequest = async () => {

        if (!isValidData) {
            setError("Please provide a title, description, valid address, and at least one file.")
            return;
        }

        setLoading(true);

        const body = { ...data };

        const files = body.files.map((file) => {
            return file;
        });


        let res = { ...data };
        console.log("res : ", res);

        try {
            //deploy contract
            const contract = await deployContract(data.title, data.authorityAddress);
            res["contract"] = contract;

            console.log("files : ", files)

            //upload files to IPFS
            const metadata = await uploadFiles(
                data.title,
                data.description,
                data.authorityAddress,
                contract.address,
                files
            );

            //get sharable URL
            res["authorityURL"] = authorityURL(metadata.hash());
            res["hash"] = metadata.hash();
            res["contractURL"] = explorerURL(contract.address);

            console.log("res after upload of metadata : ", res);
            cid = res.hash;
            console.log(cid);
            setResult(res);

        }
        catch (error) {
            console.log("Error Posting Signature Request : ", error);
        }
        finally {
            setLoading(false);
            console.log(cid);
        }
    }

    return (
        <div>
            <Row>
                <Col span={18}>
                    <div className="create-form white boxed">
                        <center><h2>Create new Request at Passport Office</h2></center>
                        <br />
                        <h3 className="vertical-margin">
                            Request Title
                        </h3>
                        <Input
                            placeholder="Request Concern"
                            value={data.title}
                            prefix=""
                            onChange={(e) => updateData("title", e.target.value)}
                        />
                        <h3 className="vertical-margin">
                            Request Description
                        </h3>
                        <TextArea
                            placeholder="Request Concern"
                            value={data.description}
                            prefix=""
                            onChange={(e) => updateData("description", e.target.value)}
                        />
                        <h3 className="vertical-margin">
                            Upload necessary documents
                        </h3>
                        <DropFile files={data.files} setFiles={(files) => updateData("files", files)} />
                        <br></br>
                        <h3 className="vertical-margin">
                            Authority Address
                        </h3>
                        <Input
                            placeholder="Wallet address of Author"
                            value={data.authorityAddress}
                            prefix=""
                            onChange={(e) => updateData("authorityAddress", e.target.value)}
                        />
                        <br></br>
                        <center>
                            <Button
                                type="primary"
                                className="standard-button"
                                onClick={createRequest}
                                disabled={loading}
                                loading={loading}
                            > Create Request for Passport
                            </Button>
                        </center>
                    </div>
                </Col>
                <Col span={1}></Col>
                <Col span={5}>
                    <div className="white boxed">
                        {!error && !result && loading && (
                            <span>&nbsp;Waiting for request to submit...</span>
                        )}
                        {error && <div className="error-text">{error}</div>}
                        {result && (
                            <>

                                <div className="success-text">
                                    Request Submitted Successfully!!
                                </div>
                                <br /><br />
                                <a href={ipfsURL(result.hash)} target="_blank" rel="noreferrer">
                                    View Metadata
                                </a>
                                <br />
                                <a href={result.contractURL} target="_blank" rel="noreferrer">
                                    View Contract
                                </a>
                                <br /><br />
                                <a href={result.authorityURL} target="_blank" rel="noreferrer">
                                    View Request
                                </a>
                            </>

                        )}
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />
                    <Row>
                        <div className="white boxed">
                            <h4>Having some trouble...</h4>
                            <p>Chat with our customer executive</p>
                            <center>
                                <Button type="primary" size="large" onClick={goToChat}>Chat</Button>
                            </center>
                        </div>
                    </Row>

                </Col>

            </Row>
        </div >
    )
}

export default CreateRequest;