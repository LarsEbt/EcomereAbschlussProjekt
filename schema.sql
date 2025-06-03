CREATE DATABASE ECOMERCE;
USE ECOMERCE;

CREATE TABLE products (
    productId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(7, 2) NOT NULL,
    types ENUM('Handtaschen', 'Schmuck', 'Accesoirs'),
    size ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL'),
    color ENUM('Rot', 'Blau', 'Grün', 'Gelb', 'Schwarz', 'Weiß'),
);

CREATE TABLE users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    vname VARCHAR(50) NOT NULL UNIQUE,
    nname VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price) VALUES
('Handtasche Rot', 'Eine schicke rote Handtasche.', 49.99, 'Handtaschen', 'M', 'Rot'),
('Schmuck Blau', 'Eleganter blauer Schmuck.', 29.99, 'Schmuck', 'S', 'Blau'),
('Accesoires Grün', 'Stylische grüne Accesoires.', 19.99, 'Accesoirs', 'L', 'Grün');
// Add more products as needed