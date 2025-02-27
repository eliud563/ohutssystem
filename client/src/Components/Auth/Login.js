import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';  // Import the updated Login.css

function Login({ onLogin }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [showResetForm, setShowResetForm] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('/api/login', formData);
            if (response.data.success) {
                alert('Login successful!');
                onLogin(response.data.user);
            } else {
                setErrors({ general: 'Invalid email or password' });
            }
        } catch (err) {
            console.error('Login failed:', err);
            setErrors({ general: 'An error occurred while logging in' });
        }
    };

    // Handle Forgot Password Form Submission
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!resetEmail.trim()) {
            setMessage('Please enter your email.');
            return;
        }

        try {
            const response = await axios.post('/api/forgot-password', { email: resetEmail });
            setMessage(response.data.message || 'If your email is registered, you will receive reset instructions.');
        } catch (err) {
            console.error('Password reset failed:', err);
            setMessage('An error occurred while processing your request.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                {errors.general && <p className="error">{errors.general}</p>}

                <form onSubmit={handleSubmit} className="login-form">
                    <label className="login-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="login-input"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label className="login-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="login-input"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <button type="submit" className="login-button">Login</button>
                </form>

                {/* Forgot Password Link */}
                <p className="forgot-password-link" onClick={() => setShowResetForm(!showResetForm)}>
                    Forgot Password?
                </p>

                {/* Forgot Password Form */}
                {showResetForm && (
                    <form onSubmit={handleForgotPassword} className="forgot-password-form">
                        <label className="login-label">Enter your registered email:</label>
                        <input
                            type="email"
                            className="login-input"
                            placeholder="Enter your email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="login-button">Reset Password</button>
                        {message && <p className="info-message">{message}</p>}
                    </form>
                )}
            </div>
        </div>
    );
}

export default Login;