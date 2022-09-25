import { LIVEPEER_KEY } from "../../utils/constants/Constants";
import { useState } from "react";
import axios from 'axios';
import { Button } from "antd";
import ShakaPlayer from 'shaka-player-react';

function Video() {
    const Livepeer = require("livepeer-nodejs");
    const [data, setData] = useState(null);
    const [streamUrl, setStreamUrl] = useState(null);
    const [showButton, setShowButton] = useState(false);
    const apiKey = LIVEPEER_KEY;
    console.log(apiKey);
    const livepeerObject = new Livepeer(apiKey);

    const content = {
        "name": "Streams",
        "profiles": [
            {
                "name": "720p",
                "bitrate": 2000000,
                "fps": 30,
                "width": 1280,
                "height": 720
            },
            {
                "name": "480p",
                "bitrate": 1000000,
                "fps": 30,
                "width": 854,
                "height": 480
            },
            {
                "name": "360p",
                "bitrate": 500000,
                "fps": 30,
                "width": 640,
                "height": 360
            },
        ],
        "record": true
    };
    const startStream = () => {
        livepeerObject.Stream.create(content).then((res) => {
            setData(res);
            setShowButton(true);
        });
    };

    const getStreamUrl = async () => {
        // const url = `https://livepeer.com/api/session?limit=20&parentId=${data.id}`;
        const url = "https://livepeer.com/api/session?limit=20&parentId=00e2c8cf-7154-46cb-9ab8-a0987ff7e8e0"

        const listOfAllStreams = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        if (listOfAllStreams.data.length === 0) {
            alert("No stream detected");
            return;
        }

        // setStreamUrl(listOfAllStreams.data[0].mp4Url);
        setStreamUrl("https://livepeer.com/api/session?limit=20&parentId=00e2c8cf-7154-46cb-9ab8-a0987ff7e8e0")

        if (streamUrl === "") alert("Stream is currently processing!! Please have some Patience :)");
    };
    return (
        <>
            <center><h1>Help other users by creating Stream Videos of the steps</h1></center>
            <div >
                <b>Url:</b> {streamUrl !== "" && streamUrl !== null ? <b>{streamUrl}</b> : streamUrl === "" ? <b>Stream Currently Processing!! Please Wait :)</b> : <b>No Streams Created :(</b>}
            </div>
            <br />
            <Button variant="contained" onClick={startStream}>
                Stream Video
            </Button>
            {data ? <h4 style={{ fontFamily: "cursive" }}>Stream key: {data.streamKey}  </h4> : null}
            <br />
            <h4 style={{ fontFamily: "cursive" }}>Server: rtmp://rtmp.livepeer.com/live  </h4>
            <br></br>
            {showButton ? <Button onClick={getStreamUrl} variant="contained">Play Video</Button> : null}
            <br /><br />
            <div className="video-container">
                {/* <ShakaPlayer src={streamUrl} /> */}
            </div>

        </>


    )
}

export default Video