import React, { useEffect, useState } from "react";
import "./Home.css"; // Ensure Home.css is correctly linked

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch recent items from backend
    fetch("http://localhost:3001/items/recent")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to OHUTS System</h1>
      <p>Find and trade household items within your university.</p>

      <h2 className="recent-listings">Recent Listings</h2>
      {items.length > 0 ? (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.item_id}>
              <strong>{item.item_name}</strong> - {item.category}
              <p>Price: {item.price} KES</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items listed yet.</p>
      )}
    </div>
  );
}

export default Home;






