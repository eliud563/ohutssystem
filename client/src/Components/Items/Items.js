import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemForm from "./ItemForm"; 
import "./Items.css";

function Items() {  
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const mockItems = [
            { id: 1, name: "Laptop", price: 1000, category: "ELECTRONICS", university: "University of Nairobi" },
            { id: 2, name: "Smartphone", price: 500, category: "ELECTRONICS", university: "Kenyatta University" },
            { id: 3, name: "Bookshelf", price: 150, category: "FURNITURE", university: "Moi University" },
            { id: 4, name: "Cooking Pot", price: 50, category: "KITCHENWARE", university: "University of Nairobi" },
            { id: 5, name: "Textbook - Mathematics", price: 200, category: "TEXTBOOKS", university: "Egerton University" }
        ];
        setItems(mockItems);
    }, []);

    const handleAddItem = (newItem) => {
        setItems([...items, { id: items.length + 1, ...newItem }]);
        setShowForm(false);
    };

    return (
        <div className="items-container">
            <h1 className="items-title">Manage Items</h1>

            <button className="view-items-button" onClick={() => navigate("/itemlist")}>
                View All Items
            </button>

            <button className="add-item-button blue-button" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "Add Item"}
            </button>

            {showForm && <ItemForm onSubmit={handleAddItem} />}

            {/* ✅ Display All Items */}
            <ul className="items-list">
                {items.length > 0 ? (
                    items.map(item => (
                        <li key={item.id} className="item-list-item">
                            <span><strong>{item.name}</strong></span>
                            <span>Category: {item.category}</span>
                            <span>Price: ${item.price}</span>
                            <span>University: {item.university}</span>
                        </li>
                    ))
                ) : (
                    <p>No items available.</p>
                )}
            </ul>
        </div>
    );
}

export default Items;
