import React from 'react';

function MessageThread({ messages, sender }) {
    return (
        <section className="message-thread">
            <h2>Conversation with {sender}</h2>
            <ul>
                {messages.map((msg) => (
                    <li key={msg.id}>
                        <strong>{msg.sender}</strong>: {msg.text}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default MessageThread;