const {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
} = require("../models/movieModel");

const getMovies = async (req, res) => {
    try {
        const { search, genre } = req.query;
        const movies = await getAllMovies(search, genre);

        return res.status(200).json({
            success: true,
            message: "Movies retrieved successfully",
            data: movies,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch movies",
        });
    }
};

const getMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await getMovieById(id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Movie retrieved successfully",
            data: movie,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch movie",
        });
    }
};

const create = async (req, res) => {
    try {
        const { title, genre, duration, rating, poster, description } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "title is required",
            });
        }

        const result = await createMovie({
            title,
            genre,
            duration,
            rating,
            poster,
            description,
        });

        return res.status(201).json({
            success: true,
            message: "Movie created successfully",
            data: {
                id: result.insertId,
                title,
                genre,
                duration,
                rating,
                poster,
                description,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create movie",
        });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, genre, duration, rating, poster, description } = req.body;

        const existingMovie = await getMovieById(id);
        if (!existingMovie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found",
            });
        }

        const result = await updateMovie(id, {
            title,
            genre,
            duration,
            rating,
            poster,
            description,
        });

        if (!result || result.affectedRows === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields updated",
            });
        }

        const updatedMovie = await getMovieById(id);

        return res.status(200).json({
            success: true,
            message: "Movie updated successfully",
            data: updatedMovie,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update movie",
        });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await getMovieById(id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found",
            });
        }

        await deleteMovie(id);

        return res.status(200).json({
            success: true,
            message: "Movie deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete movie",
        });
    }
};

module.exports = {
    getMovies,
    getMovie,
    create,
    update,
    remove,
};