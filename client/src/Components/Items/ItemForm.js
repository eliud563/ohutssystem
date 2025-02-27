import React, { useState } from "react";

function ItemForm({ item, onSubmit }) {
    const [formData, setFormData] = useState(item || { name: "", price: "", description: "", category: "", image: null, imagePreview: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file),
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.category || !formData.image) {
            alert("All fields including image are required.");
            return;
        }
        onSubmit(formData);
        setFormData({ name: "", price: "", description: "", category: "", image: null, imagePreview: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="add-item-form">
            <label>
                Name: <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
                Price: <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </label>
            <label>
                Description: <textarea name="description" value={formData.description} onChange={handleChange} required />
            </label>
            <label>
                Category:
                <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="TEXTBOOKS">Textbooks</option>
                    <option value="ELECTRONICS">Electronics</option>
                    <option value="FURNITURE">Furniture</option>
                    <option value="KITCHENWARE">Kitchenware</option>
                    <option value="CLOTHING">Clothing</option>
                </select>
            </label>
            <label>
                Image: <input type="file" accept="image/*" onChange={handleImageUpload} required />
            </label>
            {formData.imagePreview && <img src={formData.imagePreview} alt="Preview" className="image-preview" />}
            <button type="submit" className="add-button">{item ? "Update Item" : "Add Item"}</button>
        </form>
    );
}

export default ItemForm;
