CREATE DATABASE IF NOT EXISTS ECOMERCE;
USE ECOMERCE;

-- Produkte-Tabelle mit allen notwendigen Feldern
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    category ENUM('handtaschen', 'schmuck', 'accessoires') NOT NULL,
    size ENUM('Klein', 'Mittel', 'Groß') NULL,
    color ENUM('Schwarz', 'Weiß', 'Braun', 'Rot', 'Blau', 'Grün', 'Gelb') NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Benutzer-Tabelle
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Verschlüsselt speichern!
    address TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bestellungen-Tabelle
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('neu', 'bezahlt', 'versendet', 'abgeschlossen', 'storniert') DEFAULT 'neu',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Bestellpositionen-Tabelle
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL, -- Preis zum Zeitpunkt der Bestellung
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Beispiel-Produkte einfügen
INSERT INTO products (name, description, price, imageUrl, category, size, color, stock) VALUES
('Elegante Handtasche', 'Eine elegante schwarze Handtasche für jeden Anlass.', 149.99, 'placeholder1.jpg', 'handtaschen', 'Mittel', 'Schwarz', 10),
('Kleine Clutch', 'Perfekte kleine Clutch für besondere Anlässe.', 79.99, 'placeholder2.png', 'handtaschen', 'Klein', 'Weiß', 15),
('Business Tasche', 'Geräumige Tasche für Business-Anlässe.', 199.99, 'placeholder1.jpg', 'handtaschen', 'Groß', 'Braun', 8),
('Gold-Armband', 'Elegantes Armband in Gold-Optik.', 59.99, 'placeholder3.jpg', 'schmuck', NULL, 'Gelb', 20),
('Silber-Kette', 'Filigrane Silberkette mit Anhänger.', 49.99, 'placeholder3.jpg', 'schmuck', NULL, 'Weiß', 25),
('Designer-Uhr', 'Hochwertige Designer-Uhr im modernen Look.', 299.99, 'placeholder3.jpg', 'accessoires', NULL, 'Schwarz', 5);

-- Weitere 6 Produkte für die Handtaschen-Kategorie (um 3 Zeilen mit je 4 Spalten zu füllen)
INSERT INTO products (name, description, price, imageUrl, category, size, color, stock) VALUES
('Shopper Tasche', 'Große Shopper Tasche für den Alltag.', 129.99, 'placeholder1.jpg', 'handtaschen', 'Groß', 'Blau', 12),
('Mini-Rucksack', 'Stylischer Mini-Rucksack für Damen.', 89.99, 'placeholder1.jpg', 'handtaschen', 'Klein', 'Rot', 18),
('Leder-Umhängetasche', 'Hochwertige Umhängetasche aus echtem Leder.', 179.99, 'placeholder1.jpg', 'handtaschen', 'Mittel', 'Braun', 7),
('Vintage-Handtasche', 'Handtasche im Vintage-Look mit goldenen Details.', 139.99, 'placeholder1.jpg', 'handtaschen', 'Mittel', 'Schwarz', 9),
('Sommer-Strandtasche', 'Große Strandtasche für den Sommerurlaub.', 69.99, 'placeholder1.jpg', 'handtaschen', 'Groß', 'Blau', 22),
('Party-Clutch', 'Glitzernde Clutch für Partys und Events.', 59.99, 'placeholder1.jpg', 'handtaschen', 'Klein', 'Schwarz', 15);

-- Neue Produkte hinzufügen
INSERT INTO products (name, description, price, imageUrl, category, size, color, stock) VALUES
('Luxus-Armband Gold', 'Edles Armband aus echtem Gold mit Diamantbesatz.', 499.99, 'placeholder3.jpg', 'schmuck', NULL, 'Gelb', 5),
('Premium Crossbody Bag', 'Moderne Crossbody-Tasche aus veganem Leder.', 129.99, 'placeholder1.jpg', 'handtaschen', 'Klein', 'Blau', 12),
('Designer-Ohrringe', 'Elegante Ohrringe mit modernem Design.', 89.99, 'placeholder3.jpg', 'schmuck', NULL, 'Weiß', 8);