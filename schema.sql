CREATE DATABASE ECOMERCE;
USE ECOMERCE;

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

INSERT INTO products (name, description, price) VALUES
('Laptop', 'A high-performance laptop for professionals.', 999.99),
('Smartphone', 'Latest model smartphone with advanced features.', 699.99),
('Headphones', 'Noise-cancelling headphones for immersive sound.', 199.99),
('Smartwatch', 'Stylish smartwatch with fitness tracking capabilities.', 249.99),
('Tablet', 'Portable tablet with a large display and long battery life.', 399.99);
