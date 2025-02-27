import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get current page

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:3001/api/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.username) {
            setIsAuthenticated(true);
            setUser(data);
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
          setUser(null);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="auth-links">
        <Link to="/" className="nav-link">Home</Link>

        {/* Show Login/Register ONLY on the Home Page */}
        {!isAuthenticated && location.pathname === "/" && (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>

      {isAuthenticated && (
        <div className="nav-links">
          <span className="username">Welcome, {user?.username}</span>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/items" className="nav-link">Items</Link>
          <Link to="/messages" className="nav-link">Messages</Link>
          <Link to="/notifications" className="nav-link">Notifications</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;


