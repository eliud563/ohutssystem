const express = require('express');
const cors = require('cors');
const db = require('./db'); // Database connection file

// Import routes
const usersRoutes = require('./routes/users');
const itemsRoutes = require('./routes/items');
const categoriesRoutes = require('./routes/categories');
const messagesRoutes = require('./routes/messages');
const transactionsRoutes = require('./routes/transactions');
const transactionCategoriesRoutes = require('./routes/transaction_categories');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: '*' })); // Allow all origins
app.use(express.json()); // Parse JSON request bodies

// Test database connection before starting the server
async function startServer() {
    try {
        await db.query("SELECT 1"); // ✅ Fix: Using await instead of callback
        console.log("✅ Database connected successfully!");

        // Start the server only if DB is connected
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Database connection failed:", err);
        process.exit(1); // Stop the server if DB connection fails
    }
}

// Call function to start server
startServer();

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/transaction-categories', transactionCategoriesRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Online Household University Trading System API');
});
