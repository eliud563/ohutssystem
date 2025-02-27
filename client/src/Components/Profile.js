import React, { useState } from 'react';
import './profile.css'; // Import the CSS file for styling

const Profile = () => {
  // State variables
  const [user, setUser] = useState({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone_number: '123-456-7890',
    user_type: 'Student',
    university_name: 'Example University',
  });
  const [message, setMessage] = useState(''); // For success/error messages
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode

  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Updated User Data:", user); // Debugging Log
    setMessage('Profile updated successfully!');
    setIsEditing(false); // Disable edit mode after saving
  };

  // Toggle edit mode
  const handleEdit = () => {
    console.log("Edit button clicked!"); // Debugging log
    setIsEditing(true);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      {message && <p className="profile-message">{message}</p>}
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-field">
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            disabled={!isEditing}
            className="profile-input"
          />
        </div>
        <div className="profile-field">
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            disabled={!isEditing}
            className="profile-input"
          />
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="profile-input"
          />
        </div>
        <div className="profile-field">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={user.phone_number}
            onChange={handleChange}
            disabled={!isEditing}
            className="profile-input"
          />
        </div>
        <div className="profile-field">
          <label>User Type:</label>
          <input
            type="text"
            name="user_type"
            value={user.user_type}
            disabled
            className="profile-input"
          />
        </div>
        <div className="profile-field">
          <label>University Name:</label>
          <input
            type="text"
            name="university_name"
            value={user.university_name}
            onChange={handleChange}
            disabled={!isEditing}
            className="profile-input"
          />
        </div>
        <div className="profile-buttons">
          {isEditing ? (
            <button type="submit" className="save-button">Save</button>
          ) : (
            <button type="button" onClick={handleEdit} className="edit-button">Edit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
