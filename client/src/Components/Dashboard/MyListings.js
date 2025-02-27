import React, { useState } from "react";
import "./MyListings.css";

function MyListings() {
  // Mock Data for Listings
  const [listings] = useState([
    {
      id: 1,
      item_name: "Laptop",
      category: "Electronics",
      price: 50000,
      status: "Active",
    },
    {
      id: 2,
      item_name: "Office Chair",
      category: "Furniture",
      price: 7000,
      status: "Sold",
    },
    {
      id: 3,
      item_name: "Textbooks",
      category: "Books",
      price: 1500,
      status: "Active",
    },
  ]);

  return (
    <div className="my-listings-container">
      <h2>My Listings</h2>

      {listings.length === 0 ? (
        <p className="no-listings">You have no active listings.</p>
      ) : (
        <table className="listings-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Price (KES)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing.id}>
                <td>{listing.item_name}</td>
                <td>{listing.category}</td>
                <td>{listing.price}</td>
                <td style={{ fontWeight: "bold", color: listing.status === "Sold" ? "red" : "green" }}>
                  {listing.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyListings;
