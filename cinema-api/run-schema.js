const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function runSchema() {
    const sql = fs.readFileSync('schema.sql', 'utf8');
    
    try {
        const pool = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            multipleStatements: true
        });
        
        console.log("Connected to MySQL");
        await pool.query(sql);
        console.log("Schema executed successfully");
        await pool.end();
    } catch (error) {
        console.error("Error executing schema:", error);
    }
}

runSchema();
