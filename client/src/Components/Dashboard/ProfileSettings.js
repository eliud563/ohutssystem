import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileSettings.css';

const ProfileSettings = () => {
    return (
        <div className="profile-settings-container">
            <h2>Profile Settings</h2>
            <p>Manage and edit your profile details.</p>
            
            <Link to="/profile" className="edit-profile-button">
                Edit Profile
            </Link>
        </div>
    );
};

export default ProfileSettings;
