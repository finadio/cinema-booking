const pool = require("../config/db");

const getAllMovies = async (search = '', genre = '') => {
    let query = "SELECT * FROM movies";
    let queryParams = [];
    let conditions = [];

    if (search) {
        conditions.push("title LIKE ?");
        queryParams.push(`%${search}%`);
    }

    if (genre) {
        conditions.push("genre = ?");
        queryParams.push(genre);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }
    
    query += " ORDER BY id DESC";

    const [rows] = await pool.query(query, queryParams);
    return rows;
};

const getMovieById = async (id) => {
    const [rows] = await pool.query("SELECT * FROM movies WHERE id = ? LIMIT 1", [id]);
    return rows[0] || null;
};

const createMovie = async (movieData) => {
    const { title, genre, duration, rating, poster, description } = movieData;
    const [result] = await pool.query(
        "INSERT INTO movies (title, genre, duration, rating, poster, description) VALUES (?, ?, ?, ?, ?, ?)",
        [title, genre, duration, rating, poster, description]
    );
    return result;
};

const updateMovie = async (id, movieData) => {
    const fields = [];
    const values = [];

    if (movieData.title !== undefined) {
        fields.push("title = ?");
        values.push(movieData.title);
    }

    if (movieData.genre !== undefined) {
        fields.push("genre = ?");
        values.push(movieData.genre);
    }

    if (movieData.duration !== undefined) {
        fields.push("duration = ?");
        values.push(movieData.duration);
    }

    if (movieData.rating !== undefined) {
        fields.push("rating = ?");
        values.push(movieData.rating);
    }

    if (movieData.poster !== undefined) {
        fields.push("poster = ?");
        values.push(movieData.poster);
    }

    if (movieData.description !== undefined) {
        fields.push("description = ?");
        values.push(movieData.description);
    }

    if (fields.length === 0) {
        return null;
    }

    values.push(id);

    const [result] = await pool.query(
        `UPDATE movies SET ${fields.join(", ")} WHERE id = ?`,
        values
    );
    return result;
};

const deleteMovie = async (id) => {
    const [result] = await pool.query("DELETE FROM movies WHERE id = ?", [id]);
    return result;
};

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
};