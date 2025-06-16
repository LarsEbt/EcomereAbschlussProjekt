USE ECOMERCE;

-- Leeren aller Tabellen (in der richtigen Reihenfolge wegen Fremdschlüsseln)
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE products;
TRUNCATE TABLE users;

-- Alternativ: Tabellen löschen und neu erstellen
-- DROP TABLE IF EXISTS order_items;
-- DROP TABLE IF EXISTS orders;
-- DROP TABLE IF EXISTS products;
-- DROP TABLE IF EXISTS users;

-- Nach dem Löschen der Tabellen können Sie die Strukturen mit dem Schema in schema.sql neu erstellen
