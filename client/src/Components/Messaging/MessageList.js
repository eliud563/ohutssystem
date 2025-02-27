import React, { useState, useEffect } from 'react';
import './Messages.css';

function MessageList({ messages = [], onReply }) {
    const [replyText, setReplyText] = useState({});

    // Ensure messages is always an array
    useEffect(() => {
        if (!Array.isArray(messages)) {
            console.error("Invalid messages data:", messages);
        }
    }, [messages]);

    // Handle input change
    const handleReplyChange = (msgId, text) => {
        setReplyText((prev) => ({ ...prev, [msgId]: text }));
    };

    // Handle reply button click
    const handleReplyClick = (msgId, sender) => {
        if (!replyText[msgId]?.trim()) {
            console.warn("Attempted to send an empty reply."); // Debugging Log
            return; // Prevent empty replies
        }

        console.log("Replying to:", msgId, "Message:", replyText[msgId]); // Debugging Log

        if (typeof onReply !== "function") {
            console.error("onReply is not a function"); // Debugging Log
            return;
        }

        // Call the onReply function passed from SellerMessages.js
        onReply(msgId, sender, replyText[msgId]);

        // Clear input after sending
        setReplyText((prev) => ({ ...prev, [msgId]: "" }));
    };

    return (
        <section className="message-list">
            <h2>Messages</h2>
            {messages.length > 0 ? (
                <ul>
                    {messages.map((msg) => (
                        <li key={msg.id}>
                            <strong>{msg.sender || "Unknown Sender"}</strong>: {msg.text || "No message content"}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Write a reply..."
                                    value={replyText[msg.id] || ""}
                                    onChange={(e) => handleReplyChange(msg.id, e.target.value)}
                                />
                                <button onClick={() => handleReplyClick(msg.id, msg.sender)}>
                                    Reply
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No messages found.</p>
            )}
        </section>
    );
}

export default MessageList;
