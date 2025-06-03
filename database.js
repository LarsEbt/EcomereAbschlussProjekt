const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '#1Ecommerce',
  database: 'ECOMERCE',
});



async function getProduct() {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows;
}

const product = getProduct();
console.log(product);
