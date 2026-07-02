const express = require("express");

const {
    getMovies,
    getMovie,
    create,
    update,
    remove,
} = require("../controllers/movieController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie endpoints
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter by genre
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", getMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get movie by ID
 *     tags: [Movies]
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
 *         description: Movie not found
 */
router.get("/:id", getMovie);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create new movie (Protected)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: string
 *               duration:
 *                 type: integer
 *               rating:
 *                 type: number
 *               poster:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, create);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update movie (Protected)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: string
 *               duration:
 *                 type: integer
 *               rating:
 *                 type: number
 *               poster:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Movie not found
 */
router.put("/:id", authMiddleware, update);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete movie (Protected)
 *     tags: [Movies]
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
 *         description: Movie deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Movie not found
 */
router.delete("/:id", authMiddleware, remove);

module.exports = router;