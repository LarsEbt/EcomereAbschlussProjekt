const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

// Verbindung zur Datenbank
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Alle Produkte abrufen
async function getProduct() {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows;
}

// Produkt nach ID abrufen
async function getProductById(id) {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
}

// Produkt hinzufügen
async function addProduct(product) {
  const { name, description, price } = product;
  const [result] = await pool.query('INSERT INTO products (name, description, price) VALUES (?, ?, ?)', [name, description, price]);
  return result.insertId;
}

// Hauptfunktion
async function main() {
  try {
    // Neues Produkt hinzufügen
    const newProduct = { name: 'Testprodukt', description: 'Dies ist ein Testprodukt.', price: 19.99};
    const newProductId = await addProduct(newProduct);
    console.log(`Neues Produkt eingefügt mit ID: ${newProductId}`);

    // Alle Produkte abrufen
    const products = await getProduct();
    console.log('Alle Produkte:');
    console.log(products);

    // Einzelnes Produkt abrufen
    const productId = newProductId;
    const product = await getProductById(productId);
    console.log(`\nProdukt mit ID ${productId}:`);
    console.log(product);

  } catch (error) {
    console.error('Fehler bei der Datenbankabfrage:', error);
  }
}

main();
