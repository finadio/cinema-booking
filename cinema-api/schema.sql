CREATE DATABASE IF NOT EXISTS movie;
USE movie;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;
-- Also drop old tables if they exist
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS movie;
DROP TABLE IF EXISTS user;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    duration INT,
    rating DECIMAL(2,1),
    poster VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    movie_id INT,
    booking_date DATE,
    ticket_count INT,
    total_price DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'success',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

-- Insert Sample Data
-- Password for all sample users is '123456' (hashed with bcryptjs, rounds=10)
INSERT INTO users (name, email, phone, password)
VALUES
('Nana', 'nana@gmail.com', '081234567890', '$2a$10$Ew.V/5a.V5eZ2J3J7P6wZe3R0.aJ1aY1/2/4.R/Y.M6/5.7.D6.3e'),
('Budi', 'budi@gmail.com', '085678901234', '$2a$10$Ew.V/5a.V5eZ2J3J7P6wZe3R0.aJ1aY1/2/4.R/Y.M6/5.7.D6.3e'),
('Siti', 'siti@gmail.com', '082345678901', '$2a$10$Ew.V/5a.V5eZ2J3J7P6wZe3R0.aJ1aY1/2/4.R/Y.M6/5.7.D6.3e');

INSERT INTO movies (title, genre, duration, rating, poster, description)
VALUES
('Interstellar', 'Sci-Fi', 169, 8.7, 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.'),
('Inception', 'Sci-Fi', 148, 8.8, 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQQspzOuk.jpg', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'),
('Parasite', 'Thriller', 132, 8.5, 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', 'All unemployed, Ki-taek''s family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.'),
('Avengers Endgame', 'Action', 181, 8.4, 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg', 'After the devastating events of Infinity War, the Avengers assemble once more in order to reverse Thanos'' actions and restore balance to the universe.');

INSERT INTO bookings (user_id, movie_id, booking_date, ticket_count, total_price, status)
VALUES
(1, 1, '2026-07-01', 2, 100000, 'success'),
(2, 3, '2026-07-02', 1, 50000, 'success'),
(3, 2, '2026-07-02', 4, 200000, 'success');