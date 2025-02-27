import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext"; // Import AuthContext
import SearchBar from "./SearchBar";
import Items from "../Items/Items";  // Import Items component
import MyListings from "./MyListings";
import MyMessages from "./MyMessages";
import ProfileSettings from "./ProfileSettings";
import Help from "./Help";
import Support from "./Support";
import "./Dashboard.css";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedUniversity, setSelectedUniversity] = useState("");  // Store selected university
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const navigate = useNavigate();
  const { user } = useAuth(); // Get logged-in user

  const handleNavigation = (section) => {
    if (section === "home") {
      navigate("/"); // Redirect to landing page
    } else if (section === "transactions") {
      if (user?.id) {
        navigate(`/transaction-history/${user.id}`);
      } else {
        console.error("User ID not found");
      }
    } else {
      setActiveSection(section);
    }
  };

  const sections = {
    home: <h2>Welcome to your Dashboard!</h2>,
    search: (
      <SearchBar 
        onUniversitySelect={setSelectedUniversity} 
        setSearchQuery={setSearchQuery} 
        setSelectedCategory={(category) => setSelectedCategory(category.toUpperCase())} 
        setPriceRange={setPriceRange} 
        setSortOrder={setSortOrder} 
      />
    ),
    listings: <MyListings university={selectedUniversity} />,
    items: (
      <Items 
        selectedUniversity={selectedUniversity} 
        searchQuery={searchQuery} 
        selectedCategory={selectedCategory} 
        priceRange={priceRange} 
        sortOrder={sortOrder} 
      />
    ),
    messages: <MyMessages />,
    profile: <ProfileSettings />,
    help: <Help />,
    support: <Support />,
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <ul>
          {["home", "search", "items", "listings", "transactions", "messages", "profile", "help", "support"].map((section) => (
            <li
              key={section}
              onClick={() => handleNavigation(section)}
              className={activeSection === section ? "active" : ""}
            >
              {section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ")}
            </li>
          ))}
        </ul>
      </nav>
      <div className="dashboard-content">{sections[activeSection]}</div>
    </div>
  );
}

export default Dashboard;







