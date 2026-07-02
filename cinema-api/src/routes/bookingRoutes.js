const express = require("express");

const {
    getBookings,
    getBookingDetail,
    getUserBookings,
    addBooking,
    removeBooking,
} = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking endpoints
 */

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings (Admin only conceptually, but unprotected/protected depending on need. Using unprotected here for demo or add auth later)
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", getBookings);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Booking not found
 */
router.get("/:id", getBookingDetail);

/**
 * @swagger
 * /api/bookings/user/{id}:
 *   get:
 *     summary: Get user booking history
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Server Error
 */
router.get("/user/:id", getUserBookings);

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movie_id
 *               - ticket_count
 *               - booking_date
 *             properties:
 *               movie_id:
 *                 type: integer
 *               ticket_count:
 *                 type: integer
 *               booking_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Movie/User not found
 */
router.post("/", authMiddleware, addBooking);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Cancel/Delete booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.delete("/:id", authMiddleware, removeBooking);

module.exports = router;