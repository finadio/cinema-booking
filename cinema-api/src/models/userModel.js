const pool = require("../config/db");

const createUser = async (userData) => {
    const { name, email, password, phone } = userData;
    const [result] = await pool.query(
        "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)",
        [name, email, password, phone]
    );
    return result;
};

const findUserByEmail = async (email) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
    return rows[0] || null;
};

const findUserById = async (id) => {
    const [rows] = await pool.query(
        "SELECT id, name, email, phone, password FROM users WHERE id = ? LIMIT 1",
        [id]
    );
    return rows[0] || null;
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
};