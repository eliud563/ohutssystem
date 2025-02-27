import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';

function SellerMessages({ sellerId }) {
    const [messages, setMessages] = useState([]);

    // Fetch messages from the backend (mock for now)
    useEffect(() => {
        setMessages([
            { id: 1, sender: "Alice", text: "Hey, is this still available?" },
            { id: 2, sender: "Bob", text: "Yes, it's available!" },
            { id: 3, sender: "Charlie", text: "I'm interested. Can we negotiate?" }
        ]);
    }, []);

    // Handle Replying
    const handleReply = (msgId, receiver, text) => {
        if (!text.trim()) return;
        
        console.log("Replying to:", receiver, "Message:", text); // Debugging Log

        // Create new message object
        const newMessage = {
            id: Date.now(), // Unique ID
            sender: "You",
            text: `Reply to ${receiver}: ${text}`
        };

        // Update state (ensure React re-renders)
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return (
        <div>
            <h2>Your Messages</h2>
            <MessageList messages={messages} onReply={handleReply} />  {/* Ensure onReply is passed */}
        </div>
    );
}

export default SellerMessages;

