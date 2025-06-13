const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

// Verbindung zur Datenbank
let pool;
try {
  pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'ECOMERCE',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
} catch (error) {
  console.error('Fehler beim Erstellen des Connection Pools:', error.message);
  throw error;
}

// Testen der Verbindung
if (pool) {
  pool.getConnection()
    .then(conn => {
      console.log('Datenbankverbindung erfolgreich hergestellt');
      conn.release();
    })
    .catch(err => {
      console.error('Fehler beim Verbinden zur Datenbank:', err.message);
    });
}

// Alle Produkte abrufen
async function getProducts() {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
  } catch (error) {
    console.error('Fehler beim Abrufen der Produkte:', error.message);
    return [];
  }
}

// Produkt nach ID abrufen
async function getProductById(id) {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0] || null;
  } catch (error) {
    console.error('Fehler beim Abrufen des Produkts:', error.message);
    return null;
  }
}

// Produkte nach Kategorie abrufen
async function getProductsByCategory(category) {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE category = ?', [category]);
    return rows;
  } catch (error) {
    console.error('Fehler beim Abrufen der Produkte nach Kategorie:', error.message);
    return [];
  }
}

// Produkt hinzufügen
async function addProduct(product) {
  try {
    const { name, description, price, imageUrl, category, color, size } = product;
    const [result] = await pool.query(
      'INSERT INTO products (name, description, price, imageUrl, category, color, size) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [name, description, price, imageUrl, category, color, size]
    );
    return result.insertId;
  } catch (error) {
    console.error('Fehler beim Hinzufügen des Produkts:', error.message);
    return -1;
  }
}

// Produkt aktualisieren
async function updateProduct(id, product) {
  try {
    const { name, description, price, imageUrl, category, color, size } = product;
    const [result] = await pool.query(
      'UPDATE products SET name = ?, description = ?, price = ?, imageUrl = ?, category = ?, color = ?, size = ? WHERE id = ?', 
      [name, description, price, imageUrl, category, color, size, id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Produkts:', error.message);
    return false;
  }
}

// Produkt löschen
async function deleteProduct(id) {
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Fehler beim Löschen des Produkts:', error.message);
    return false;
  }
}

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct
};
