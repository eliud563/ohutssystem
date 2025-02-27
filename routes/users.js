const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router(); // ✅ Define router before using it

// Register a new user
router.post("/register", async (req, res) => {
  const { first_name, second_name, username, email, password, phone_number, user_type, university_name } = req.body;

  if (!first_name || !second_name || !username || !email || !password || !phone_number || !user_type || !university_name) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const [existingEmail] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingEmail.length > 0) {
      return res.status(400).json({ error: "Email is already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (first_name, second_name, username, email, password, phone_number, user_type, university_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [first_name, second_name, username, email, hashedPassword, phone_number, user_type.toLowerCase(), university_name]
    );

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    
    if (user.length === 0) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    res.json({ message: "Login successful", user: user[0] });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router; // ✅ Export router


