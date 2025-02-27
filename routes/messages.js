const express = require('express');
const db = require('../db');

const router = express.Router();

// Send a message
router.post('/', (req, res) => {
    const { sender_id, receiver_id, content } = req.body;
    const sql = 'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)';
    db.query(sql, [sender_id, receiver_id, content], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Message sent successfully', messageId: result.insertId });
    });
});

// Get all messages
router.get('/', (req, res) => {
    db.query('SELECT * FROM messages', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get messages between two users
router.get('/:sender_id/:receiver_id', (req, res) => {
    db.query('SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY created_at ASC',
        [req.params.sender_id, req.params.receiver_id, req.params.receiver_id, req.params.sender_id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
});

// Delete a message
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM messages WHERE message_id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Message deleted successfully' });
    });
});

module.exports = router;