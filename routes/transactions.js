const express = require('express');
const db = require('../db');

const router = express.Router();

// Create a transaction
router.post('/', (req, res) => {
    const { buyer_id, seller_id, item_id, amount } = req.body;
    const sql = 'INSERT INTO transactions (buyer_id, seller_id, item_id, amount) VALUES (?, ?, ?, ?)';
    db.query(sql, [buyer_id, seller_id, item_id, amount], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Transaction created successfully', transactionId: result.insertId });
    });
});

// Get all transactions
router.get('/', (req, res) => {
    db.query('SELECT * FROM transactions', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get a transaction by ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM transactions WHERE transaction_id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Transaction not found' });
        res.json(result[0]);
    });
});

// Update a transaction
router.put('/:id', (req, res) => {
    const { buyer_id, seller_id, item_id, amount } = req.body;
    const sql = 'UPDATE transactions SET buyer_id = ?, seller_id = ?, item_id = ?, amount = ? WHERE transaction_id = ?';
    db.query(sql, [buyer_id, seller_id, item_id, amount, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Transaction updated successfully' });
    });
});

// Delete a transaction
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM transactions WHERE transaction_id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Transaction deleted successfully' });
    });
});

module.exports = router;