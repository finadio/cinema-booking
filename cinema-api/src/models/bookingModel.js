const pool = require("../config/db");

const getAllBookings = async () => {
    const [rows] = await pool.query(
        `SELECT b.id, b.user_id, b.movie_id, b.booking_date, b.ticket_count, b.total_price, b.status,
                u.name AS user_name, u.email AS user_email, u.phone AS user_phone,
                m.title AS movie_title, m.genre AS movie_genre, m.duration AS movie_duration, m.rating AS movie_rating
         FROM bookings b
         INNER JOIN users u ON b.user_id = u.id
         INNER JOIN movies m ON b.movie_id = m.id
         ORDER BY b.id DESC`
    );
    return rows;
};

const getBookingById = async (id) => {
    const [rows] = await pool.query(
        `SELECT b.id, b.user_id, b.movie_id, b.booking_date, b.ticket_count, b.total_price, b.status,
                u.name AS user_name, u.email AS user_email, u.phone AS user_phone,
                m.title AS movie_title, m.genre AS movie_genre, m.duration AS movie_duration, m.rating AS movie_rating
         FROM bookings b
         INNER JOIN users u ON b.user_id = u.id
         INNER JOIN movies m ON b.movie_id = m.id
         WHERE b.id = ?
         LIMIT 1`,
        [id]
    );
    return rows[0] || null;
};

const getBookingsByUserId = async (userId) => {
    const [rows] = await pool.query(
        `SELECT b.id, b.user_id, b.movie_id, b.booking_date, b.ticket_count, b.total_price, b.status,
                m.title AS movie_title, m.genre AS movie_genre, m.poster AS movie_poster
         FROM bookings b
         INNER JOIN movies m ON b.movie_id = m.id
         WHERE b.user_id = ?
         ORDER BY b.id DESC`,
        [userId]
    );
    return rows;
};

const createBooking = async (bookingData) => {
    const { user_id, movie_id, booking_date, ticket_count, total_price, status } = bookingData;
    const [result] = await pool.query(
        "INSERT INTO bookings (user_id, movie_id, booking_date, ticket_count, total_price, status) VALUES (?, ?, ?, ?, ?, ?)",
        [user_id, movie_id, booking_date, ticket_count, total_price, status]
    );
    return result;
};

const deleteBooking = async (id) => {
    const [result] = await pool.query("DELETE FROM bookings WHERE id = ?", [id]);
    return result;
};

module.exports = {
    getAllBookings,
    getBookingById,
    getBookingsByUserId,
    createBooking,
    deleteBooking,
};