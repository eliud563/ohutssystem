import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import Register.css

const universitiesAndTVETs = [
  "University of Nairobi", "Kenyatta University", "Jomo Kenyatta University of Agriculture and Technology",
  "Moi University", "Egerton University", "Technical University of Kenya", "Maseno University",
  "Masinde Muliro University of Science and Technology", "Dedan Kimathi University of Technology",
  "Meru University of Science and Technology", "Multimedia University of Kenya", "South Eastern Kenya University",
  "Pwani University", "Laikipia University", "Kibabii University", "Kirinyaga University",
  "Cooperative University of Kenya", "Kenya School of Government", "Kenya Medical Training College",
  "Kabete National Polytechnic", "Nairobi Technical Training Institute", "Eldoret National Polytechnic",
  "Mombasa Technical Training Institute"
];

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",  
    second_name: "", 
    username: "",
    email: "",
    password: "",
    phone_number: "",
    user_type: "",  // Set user_type properly
    university_name: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before new submission

    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed. Please check your details.");
      }

      alert("Registration successful! Please login.");
      navigate("/login");

    } catch (error) {
      setError(error.message); // Display exact error from backend
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
        <input type="text" name="second_name" placeholder="Second Name" value={formData.second_name} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} required />

        {/* Dropdown for user_type (Student or Staff) */}
        <select name="user_type" value={formData.user_type} onChange={handleChange} required>
          <option value="">Select User Type</option>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
        </select>

        <select name="university_name" value={formData.university_name} onChange={handleChange} required>
          <option value="">Select Your University/TVET</option>
          {universitiesAndTVETs.map((institution, index) => (
            <option key={index} value={institution}>{institution}</option>
          ))}
        </select>

        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login" className="login-link">Login</a></p>
    </div>
  );
}

export default Register;
