const express = require('express');
const db = require('../db');

const router = express.Router();

// Link a transaction to a category
router.post('/', (req, res) => {
    const { transaction_id, category_id } = req.body;
    const sql = 'INSERT INTO transaction_categories (transaction_id, category_id) VALUES (?, ?)';
    db.query(sql, [transaction_id, category_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Transaction linked to category', transactionCategoryId: result.insertId });
    });
});

// Get all transaction-category links
router.get('/', (req, res) => {
    db.query('SELECT * FROM transaction_categories', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get categories for a transaction
router.get('/:transaction_id', (req, res) => {
    db.query('SELECT * FROM transaction_categories WHERE transaction_id = ?', [req.params.transaction_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Delete a transaction-category link
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM transaction_categories WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Transaction-category link deleted successfully' });
    });
});

module.exports = router;