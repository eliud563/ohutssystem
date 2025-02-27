const express = require('express');
const db = require('../db');

const router = express.Router();

// Add a category
router.post('/', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO categories (name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Category added successfully', categoryId: result.insertId });
    });
});

// Get all categories
router.get('/', (req, res) => {
    db.query('SELECT * FROM categories', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Update a category
router.put('/:id', (req, res) => {
    const { name } = req.body;
    const sql = 'UPDATE categories SET name = ? WHERE category_id = ?';
    db.query(sql, [name, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Category updated successfully' });
    });
});

// Delete a category
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM categories WHERE category_id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Category deleted successfully' });
    });
});

module.exports = router;