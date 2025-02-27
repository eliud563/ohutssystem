import React from 'react';
import { Link } from 'react-router-dom';
import './MyMessages.css';

const MyMessages = () => {
    return (
        <div className="my-messages-container">
            <h2>My Messages</h2>
            <p>View and manage your messages.</p>
            
            <Link to="/messages" className="view-messages-button">
                Go to Messaging
            </Link>
        </div>
    );
};

export default MyMessages;
