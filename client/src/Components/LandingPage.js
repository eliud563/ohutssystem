import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"; // Ensure LandingPage.css is correctly placed
import Footer from "./Layout/Footer"; // Corrected import path for Footer.js

function LandingPage() {
    return (
        <div className="page-container">
            <h1>Welcome to University Trading Platform</h1>
            <p>Buy, sell, and trade household items within your university community.</p>

            <nav className="nav-menu">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>

            {/* Footer Section */}
            <Footer />
        </div>
    );
}

export default LandingPage;