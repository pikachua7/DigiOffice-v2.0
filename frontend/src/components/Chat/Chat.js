import React, { useState } from 'react';
import { Client } from '@xmtp/xmtp-js';
import { Button } from "antd";


const BOTH_STYLES = "inline py-1 px-2  my-2 rounded";
const LEFT_STYLES = "bg-gray-200 " + BOTH_STYLES;
const RIGHT_STYLES = "float-right bg-blue-300 " + BOTH_STYLES;

function Chat({ account, authorityAccount }) {

    const [xmtpMethod, setxmtpMethod] = useState(null);
    const [conversationMethod, setconversationMethod] = useState(null);
    const [messagesList, setMessagesList] = useState([]);
    const [toAddress, setToAddress] = useState(authorityAccount);
    const [newMessage, setNewMessage] = useState("");

    const connect = async () => {
        console.log(account)
        // Create the client with your wallet. This will connect to the XMTP development network by default
        const xmtp = await Client.create(account);
        console.log(xmtp);
        setxmtpMethod(xmtp);
    }

    const chatWith = async () => {
        const conversation = await xmtpMethod.conversations.newConversation(toAddress);
        setconversationMethod(conversation);

        const messages = await conversation.messages();
        console.log(messages);
        setMessagesList(messages);

        // Listen for new messages in the conversation
        for await (const message of await conversation.streamMessages()) {
            console.log(`[${message.senderAddress}]: ${message.content}`)
            setMessagesList([...messages, message]);
        }
    }

    const sendMessage = async () => {
        // Send a message
        await conversationMethod.send(newMessage);
    }

    return (
        <div className="container mx-auto">
            <div className="bg-white p-3 rounded shadow w-4/12 mx-auto mt-10">
                <center><h2>Chat with Customer Executive</h2></center>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Customer Executive Address to Chat With : </label>
                    <input
                        className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm"
                        id="address"
                        value={toAddress}
                        onChange={(e) => setToAddress(e.target.value)} />
                </div>
                <div className="mb-3">
                    <Button variant="primary" >
                        Chat
                    </Button>
                </div>
            </div>
            {conversationMethod && <div className="bg-white p-3 rounded shadow mx-auto mt-2 flex flex-col" style={{ maxWidth: "800px" }}>
                <h2 className='mb-3 text-lg'>Messages to {toAddress}</h2>
                {messagesList.map(m => (
                    <div key={m.id}>
                        <p className={m.senderAddress === account ? RIGHT_STYLES : LEFT_STYLES}>
                            {m.content}
                        </p>
                    </div>

                ))}
                <div className="flex mt-3">
                    <div className="flex-1">
                        <input className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm" id="message" onChange={(e) => setNewMessage(e.target.value)} placeholder="Message..." />
                    </div>
                    <button className="py-2 px-4 text-white bg-blue-600 rounded baseline hover:bg-blue-400" onClick={sendMessage}>
                        Send
                    </button>
                </div>
            </div>}
        </div>
    )
}

export default Chat;