const pool = require("../config/db");
const {
    getAllBookings,
    getBookingById,
    getBookingsByUserId,
    createBooking,
    deleteBooking,
} = require("../models/bookingModel");

const getBookings = async (req, res) => {
    try {
        const bookings = await getAllBookings();

        return res.status(200).json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch bookings",
        });
    }
};

const getBookingDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await getBookingById(id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: booking,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch booking detail",
        });
    }
};

const getUserBookings = async (req, res) => {
    try {
        const { id } = req.params;
        const bookings = await getBookingsByUserId(id);

        return res.status(200).json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user bookings",
        });
    }
}

const addBooking = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { movie_id, booking_date, ticket_count } = req.body;

        if (!movie_id || !booking_date || ticket_count === undefined) {
            return res.status(400).json({
                success: false,
                message: "movie_id, booking_date, and ticket_count are required",
            });
        }

        if (Number(ticket_count) <= 0) {
            return res.status(400).json({
                success: false,
                message: "ticket_count must be greater than 0",
            });
        }

        const [userRows] = await pool.query("SELECT id FROM users WHERE id = ? LIMIT 1", [userId]);
        if (userRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const [movieRows] = await pool.query("SELECT id FROM movies WHERE id = ? LIMIT 1", [movie_id]);
        if (movieRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Movie not found",
            });
        }

        const total_price = Number(ticket_count) * 50000;
        const status = 'success';

        const result = await createBooking({
            user_id: userId,
            movie_id,
            booking_date,
            ticket_count,
            total_price,
            status
        });

        const booking = await getBookingById(result.insertId);

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create booking",
        });
    }
};

const removeBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await getBookingById(id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        await deleteBooking(id);

        return res.status(200).json({
            success: true,
            message: "Booking deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete booking",
        });
    }
};

module.exports = {
    getBookings,
    getBookingDetail,
    getUserBookings,
    addBooking,
    removeBooking,
};