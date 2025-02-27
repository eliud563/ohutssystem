const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "GG.44.ggg123",
    database: process.env.DB_NAME || "my_database",
    port: process.env.DB_PORT || 3308,
    waitForConnections: true,
    connectionLimit: 10, // Controls max concurrent connections
    queueLimit: 0,
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Connected to MySQL database");
        connection.release(); // Release the connection after testing
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
    }
})();

module.exports = pool;
