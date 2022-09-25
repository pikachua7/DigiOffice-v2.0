import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button, Col, Input, Row } from "antd";
import { explorerURL, ipfsURL, ACTIVE_CHAIN_ID } from "../../utils/constants/Constants";


function PendingRequest({ loading, auth, sign, signID, description, title, authorityAddress, contractAddress, files }) {

    const [name, setName] = useState();
    const [showModal, setShowModal] = useState(false);
    const sigCanvas = useRef();

    const postSignature = () => {
        const dataURL = sigCanvas.current.toDataURL();
        sign(dataURL);
    };

    const openURL = (url) => window.open(url, "_blank");
    console.log("authorized", auth);
    const filesToSign = files || [];

    if (!auth) {
        return (
            <div className="centered">
                <h1>User is not Registered as Authority</h1>
            </div>
        )
    }

    else {
        return (
            <Row>
                <Col span={15}>
                    <div className="create-form white boxed">
                        <span>
                            <p>
                                <h4>Request :</h4> <h1>{title}</h1>
                            </p>
                        </span>
                        <span>
                            <p>
                                <h4>About Request  : </h4><h1>{description}</h1>
                            </p>
                        </span>

                        <div>
                            <p><h4>View Request Info : </h4></p>
                            <a href={explorerURL(contractAddress)} target="_blank" rel="noreferrer">
                                View Contract ({ACTIVE_CHAIN_ID.name})
                            </a>
                            <br />
                            <a href={ipfsURL(signID)} target="_blank" rel="noreferrer">
                                View Request
                            </a>
                        </div>
                        <br />
                        <h3>Documents to acknowledge: </h3>
                        {filesToSign.map((f, i) => {
                            return (
                                <li key={i}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            openURL(f.url);
                                        }}

                                    >
                                        {f.name}
                                    </a>
                                </li>
                            );
                        })}
                        <br />
                        <Button
                            type="primary"
                            disabled={!auth || filesToSign.length === 0}
                            onClick={() => setShowModal(true)}
                        >
                            Accept Documents
                        </Button>
                    </div>
                </Col>
                <Col span={1}>
                </Col>
                <Col span={8}>
                    {showModal ? <>
                        <Input
                            placeholder="Type name"
                            value={name}
                            prefix="Name of Authority: "
                            onChange={(e) => setName(e.target.value)}
                        />
                        <br />
                        <hr />
                        <p>Draw signature: </p>
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor="green"
                            canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
                        />
                        <Button key="back" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button> &nbsp; &nbsp;
                        <Button
                            key="submit"
                            type="primary"
                            loading={loading}
                            onClick={postSignature}
                        >
                            Sign
                        </Button></> : <></>}


                </Col>
            </Row>





        )
    }
}

export default PendingRequest