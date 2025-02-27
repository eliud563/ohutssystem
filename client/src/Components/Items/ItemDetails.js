import React from "react";

function ItemDetails({ item, onClose }) {
    if (!item) return null;

    return (
        <div className="item-details-overlay">
            <div className="item-details">
                <button className="close-button" onClick={onClose}>✖</button> {/* X Button */}
                <h2>{item.name}</h2>
                <p><strong>Price:</strong> KES {item.price}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Description:</strong> {item.description || "No description available."}</p>
            </div>
        </div>
    );
}

export default ItemDetails;
