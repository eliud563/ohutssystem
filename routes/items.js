const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db');

const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save to 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add a unique timestamp to the filename
    }
});

// Initialize multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Images only!');
        }
    }
}).single('image'); // 'image' is the field name for the uploaded file

// Add an item with an image
router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        
        const { item_name, description, price, category_id } = req.body;
        const image = req.file ? req.file.filename : null; // Get the uploaded file's name
        const user_id = req.body.user_id; // Get user_id from request body or another source

        const sql = 'INSERT INTO items (item_name, description, price, category, image, user_id) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [item_name, description, price, category_id, image, user_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Item added successfully', itemId: result.insertId });
        });
    });
});

// Update an item with a new image
router.put('/:id', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        }

        const { item_name, description, price, category_id } = req.body;
        const image = req.file ? req.file.filename : null; // Get the uploaded file's name
        const user_id = req.body.user_id; // Get user_id from request body or another source

        const sql = 'UPDATE items SET item_name = ?, description = ?, price = ?, category = ?, image = ? WHERE item_id = ? AND user_id = ?';
        db.query(sql, [item_name, description, price, category_id, image, req.params.id, user_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(403).json({ message: 'Unauthorized or item not found' });
            res.json({ message: 'Item updated successfully' });
        });
    });
});

// Other routes (GET, DELETE) remain the same
router.get('/', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    db.query('SELECT * FROM items WHERE item_id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Item not found' });
        res.json(result[0]);
    });
});

router.delete('/:id', (req, res) => {
    const user_id = req.body.user_id; // Get user_id from request body or another source
    db.query('DELETE FROM items WHERE item_id = ? AND user_id = ?', [req.params.id, user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(403).json({ message: 'Unauthorized or item not found' });
        res.json({ message: 'Item deleted successfully' });
    });
});

module.exports = router;