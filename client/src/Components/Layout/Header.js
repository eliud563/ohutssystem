import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext'; // Import AuthContext
import './Header.css'; // Import styles

// src/components/layout/Header.js

function Header() {
  const { isLoggedIn, user, login, logout } = useContext(AuthContext);
  const location = useLocation();

  // Hide navigation if on the Landing Page
  const isLandingPage = location.pathname === "/";

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>University Trading Platform</h1>
        
        {!isLandingPage && ( // Hide navigation links on Landing Page
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/items">Items</Link></li>
              <li><Link to="/messages">Messages</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </nav>
        )}

        <div className="auth-actions">
          {isLoggedIn ? (
            <>
              <span className="username">{user?.username || 'User'}</span>
              <button onClick={logout} className="auth-button">
                Logout
              </button>
            </>
          ) : (
            !isLandingPage && ( // Hide Login button on Landing Page
              <button onClick={login} className="auth-button">
                Login
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;