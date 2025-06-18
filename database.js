const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

// Platzhalter-Produkte für den Fall, dass keine Datenbankverbindung besteht
const placeholderProducts = [
  // Handtaschen-Platzhalter (12 Stück)
  {
    id: 1,
    Marke: 'Markenname',
    Name: 'Handtasche 1',
    description: 'Beschreibung',
    price: 99.99,
    imageUrl: '/placeholder1.jpg',
    category: 'Handtasche',
    size: 'Mittel',
    color: 'Schwarz',
    stock: 10
  },
  {
    id: 2,
    Marke: 'Markenname',
    Name: 'Handtasche 2',
    description: 'Beschreibung',
    price: 129.99,
    imageUrl: '/placeholder1.jpg',
    category: 'Handtasche',
    size: 'Klein',
    color: 'Braun',
    stock: 5
  },
  {
    id: 3,
    Marke: 'Markenname',
    Name: 'Handtasche 3',
    description: 'Beschreibung',
    price: 149.99,
    imageUrl: '/placeholder1.jpg',
    category: 'Handtasche',
    size: 'Groß',
    color: 'Schwarz',
    stock: 8
  },
  {
    id: 4,
    Marke: 'Markenname',
    Name: 'Handtasche 4',
    description: 'Beschreibung',
    price: 199.99,
    imageUrl: '/placeholder1.jpg',
    category: 'Handtasche',
    size: 'Mittel',
    color: 'Weiß',
    stock: 3
  },
  {
    id: 5,
    Marke: 'Markenname',
    Name: 'Handtasche 5',
    description: 'Beschreibung',
    price: 89.99,
    imageUrl: '/placeholder1.jpg',
    category: 'Handtasche',
    size: 'Klein',
    color: 'Schwarz',
    stock: 15
  },
  {
    id: 6,
    Marke: 'Markenname',
    Name: 'Handtasche 6',
    description: 'Beschreibung',
    price: 179.99,
    imageUrl: '/placeholder1.jpg',
    category: 'Handtasche',
    size: 'Groß',
    color: 'Braun',
    stock: 2
  },
  {
    id: 7,
    Marke: 'Markenname',
    Name: 'Handtasche 7',
    description: 'Beschreibung',
    price: 159.99,
    imageUrl: '/placeholder1.jpg',
    category: 'Handtasche',
    size: 'Mittel',
    color: 'Weiß',
    stock: 7
  },
  {
    id: 8,
    Marke: 'Markenname',
    Name: 'Handtasche 8',
    description: 'Beschreibung',
    price: 139.99,
    imageUrl: '/placeholder1.jpg',
    category: 'Handtasche',
    size: 'Klein',
    color: 'Schwarz',
    stock: 9
  },
  {
    id: 9,
    Marke: 'Markenname',
    Name: 'Handtasche 9',
    description: 'Beschreibung',
    price: 109.99,
    imageUrl: '/placeholder1.jpg',
    category: 'Handtasche',
    size: 'Groß',
    color: 'Braun',
    stock: 4
  },
  {
    id: 10,
    Marke: 'Markenname',
    Name: 'Handtasche 10',
    description: 'Beschreibung',
    price: 219.99,
    imageUrl: '/placeholder1.jpg',
    category: 'Handtasche',
    size: 'Mittel',
    color: 'Schwarz',
    stock: 6
  },
  {
    id: 11,
    Marke: 'Markenname',
    Name: 'Handtasche 11',
    description: 'Beschreibung',
    price: 169.99,
    imageUrl: '/placeholder1.jpg',
    category: 'Handtasche',
    size: 'Klein',
    color: 'Weiß',
    stock: 11
  },
  {
    id: 12,
    Marke: 'Markenname',
    Name: 'Handtasche 12',
    description: 'Beschreibung',
    price: 189.99,
    imageUrl: '/placeholder1.jpg',
    category: 'Handtasche',
    size: 'Groß',
    color: 'Schwarz',
    stock: 3
  },

  // Schmuck-Platzhalter (12 Stück)
  {
    id: 101,
    Marke: 'Markenname',
    Name: 'Schmuck 1',
    description: 'Beschreibung',
    price: 49.99,
    imageUrl: '/placeholder3.jpg',
    category: 'Schmuck',
    color: 'Silber',
    stock: 20
  },
  {
    id: 102,
    Marke: 'Markenname',
    Name: 'Schmuck 2',
    description: 'Beschreibung',
    price: 79.99,
    imageUrl: '/placeholder3.jpg',
    category: 'Schmuck',
    color: 'Gold',
    stock: 15
  },
  {
    id: 103,
    Marke: 'Markenname',
    Name: 'Schmuck 3',
    description: 'Beschreibung',
    price: 59.99,
    imageUrl: '/placeholder3.jpg',
    category: 'Schmuck',
    color: 'Silber',
    stock: 12
  },
  {
    id: 104,
    Marke: 'Markenname',
    Name: 'Schmuck 4',
    description: 'Beschreibung',
    price: 99.99,
    imageUrl: '/placeholder3.jpg',
    category: 'Schmuck',
    color: 'Gold',
    stock: 8
  },
  {
    id: 105,
    Marke: 'Markenname',
    Name: 'Schmuck 5',
    description: 'Beschreibung',
    price: 39.99,
    imageUrl: '/placeholder3.jpg',
    category: 'Schmuck',
    color: 'Silber',
    stock: 25
  },
  {
    id: 106,
    Marke: 'Markenname',
    Name: 'Schmuck 6',
    description: 'Beschreibung',
    price: 69.99,
    imageUrl: '/placeholder3.jpg',
    category: 'Schmuck',
    color: 'Gold',
    stock: 7
  },
  {
    id: 107,
    Marke: 'Markenname',
    Name: 'Schmuck 7',
    description: 'Beschreibung',
    price: 29.99,
    imageUrl: '/placeholder3.jpg',
    category: 'Schmuck',
    color: 'Silber',
    stock: 18
  },
  {
    id: 108,
    Marke: 'Markenname',
    Name: 'Schmuck 8',
    description: 'Beschreibung',
    price: 89.99,
    imageUrl: '/placeholder3.jpg',
    category: 'Schmuck',
    color: 'Gold',
    stock: 9
  },
  {
    id: 109,
    Marke: 'Markenname',
    Name: 'Schmuck 9',
    description: 'Beschreibung',
    price: 34.99,
    imageUrl: '/placeholder3.jpg',
    category: 'Schmuck',
    color: 'Silber',
    stock: 14
  },
  {
    id: 110,
    Marke: 'Markenname',
    Name: 'Schmuck 10',
    description: 'Beschreibung',
    price: 119.99,
    imageUrl: '/placeholder3.jpg',
    category: 'Schmuck',
    color: 'Gold',
    stock: 5
  },
  {
    id: 111,
    Marke: 'Markenname',
    Name: 'Schmuck 11',
    description: 'Beschreibung',
    price: 44.99,
    imageUrl: '/placeholder3.jpg',
    category: 'Schmuck',
    color: 'Silber',
    stock: 11
  },
  {
    id: 112,
    Marke: 'Markenname',
    Name: 'Schmuck 12',
    description: 'Beschreibung',
    price: 149.99,
    imageUrl: '/placeholder3.jpg',
    category: 'Schmuck',
    color: 'Gold',
    stock: 3
  }
];

// Datenbankverbindungsstatus
let isDatabaseConnected = false;
let connectionError = null;
let pool = null;

// Erstellen des Verbindungspools
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
  connectionError = error.message;
  console.error('\x1b[31m%s\x1b[0m', `✗ Fehler beim Erstellen des Connection Pools: ${error.message}`);
  isDatabaseConnected = false;
}

async function getProducts() {
  if (!pool) {
    console.log('\x1b[33m%s\x1b[0m', '⚠ Kein Datenbankpool verfügbar: Verwende Platzhalter-Produkte');
    return placeholderProducts;
  }

  try {
    // Versuche, eine Verbindung herzustellen (bei Erfolg wird isDatabaseConnected auf true gesetzt)
    if (!isDatabaseConnected) {
      const connection = await pool.getConnection();
      connection.release();
      console.log('\x1b[32m%s\x1b[0m', '✓ Datenbankverbindung erfolgreich hergestellt');
      isDatabaseConnected = true;
      connectionError = null;
    }

    const [rows] = await pool.query('SELECT * FROM products_prd');
    console.log(`Abfrage erfolgreich: ${rows.length} Produkte gefunden`);

    // Debug-Ausgabe der Kategorien in der Datenbank
    const categories = [...new Set(rows.map(p => p.category))];
    console.log('Kategorien in der Datenbank:', categories);

    // Wenn keine Produkte in der Datenbank sind, verwende Platzhalter
    if (rows.length === 0) {
      console.log('\x1b[33m%s\x1b[0m', '⚠ Keine Produkte in der Datenbank gefunden: Verwende Platzhalter-Produkte');
      return placeholderProducts;
    }

    // Standardisiere die Kategorie-Namen für die Frontend-Anwendung
    const processedRows = rows.map(product => {
      // Konvertiere Kategorie-Namen, falls nötig
      if (product.category) {
        if (product.category.toLowerCase() === 'handtaschen') {
          product.category = 'Handtasche';
        } else if (product.category.toLowerCase() === 'schmuck') {
          product.category = 'Schmuck';
        }
      }
      return product;
    });

    return processedRows;
  } catch (error) {
    connectionError = error.message;
    isDatabaseConnected = false;
    console.error('\x1b[31m%s\x1b[0m', `✗ Fehler beim Abrufen der Produkte: ${error.message}`);
    console.log('\x1b[33m%s\x1b[0m', '⚠ Verwende Platzhalter-Produkte als Fallback');
    return placeholderProducts;
  }
}

/**
 * Ruft ein Produkt nach ID aus der Datenbank ab
 * @param {number} id Die ID des Produkts
 * @returns {Promise<Object|null>} Das Produkt oder null
 */
async function getProductById(id) {
  if (!pool || !isDatabaseConnected) {
    console.log('\x1b[33m%s\x1b[0m', '⚠ Keine Datenbankverbindung: Verwende Platzhalter-Produkt');
    return placeholderProducts.find(p => p.id === parseInt(id)) || null;
  }
  try {
    const [rows] = await pool.query('SELECT * FROM products_prd WHERE id = ?', [id]);
    if (rows.length === 0) {
      console.log('\x1b[33m%s\x1b[0m', `⚠ Kein Produkt mit ID ${id} gefunden`);
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `✗ Fehler beim Abrufen des Produkts mit ID ${id}: ${error.message}`);
    return placeholderProducts.find(p => p.id === parseInt(id)) || null;
  }
}

/**
 * Ruft Produkte nach Kategorie aus der Datenbank ab
 * @param {string} category Die Kategorie
 * @returns {Promise<Array>} Array mit Produkten oder Platzhalter-Produkten
 */
async function getProductsByCategory(category) {
  if (!pool || !isDatabaseConnected) {
    console.log('\x1b[33m%s\x1b[0m', '⚠ Keine Datenbankverbindung: Verwende Platzhalter-Produkte nach Kategorie');

    // Standardisiere die Kategorie für die Platzhalter
    let searchCategory = category;
    if (category === 'Handtasche') {
      searchCategory = 'Handtasche';
    } else if (category.toLowerCase() === 'handtaschen') {
      searchCategory = 'Handtasche';
    } else if (category.toLowerCase() === 'schmuck') {
      searchCategory = 'Schmuck';
    }

    return placeholderProducts.filter(p => p.category === searchCategory);
  }
  try {
    console.log(`Suche nach Produkten in Kategorie: "${category}"`);

    // Bestimme den passenden Suchbegriff für die Datenbank
    let dbCategory = category;
    if (category === 'Handtasche' || category.toLowerCase() === 'handtasche') {
      dbCategory = 'handtaschen';
    } else if (category === 'Schmuck') {
      dbCategory = 'schmuck';
    }

    const [rows] = await pool.query('SELECT * FROM products_prd WHERE category = ?', [dbCategory]);
    console.log(`Abfrage erfolgreich: ${rows.length} Produkte in Kategorie "${category}" gefunden`);

    // Wenn keine Produkte in der Kategorie gefunden wurden, verwende passende Platzhalter
    if (rows.length === 0) {
      console.log('\x1b[33m%s\x1b[0m', `⚠ Keine Produkte in der Kategorie '${category}' gefunden: Verwende Platzhalter-Produkte`);

      // Bestimme die passende Kategorie für Platzhalter
      let searchCategory = category;
      if (category === 'Handtasche' || category.toLowerCase() === 'handtaschen') {
        searchCategory = 'Handtasche';
      } else if (category.toLowerCase() === 'schmuck') {
        searchCategory = 'Schmuck';
      }

      return placeholderProducts.filter(p => p.category === searchCategory);
    }

    // Standardisiere die Kategorie-Namen für die Frontend-Anwendung
    const processedRows = rows.map(product => {
      if (product.category) {
        if (product.category.toLowerCase() === 'handtaschen') {
          product.category = 'Handtasche';
        } else if (product.category.toLowerCase() === 'schmuck') {
          product.category = 'Schmuck';
        }
      }
      return product;
    });

    return processedRows;
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `✗ Fehler beim Abrufen der Produkte für Kategorie ${category}: ${error.message}`);
    return placeholderProducts.filter(p => p.category === category);
  }
}

/**
 * Gibt den aktuellen Verbindungsstatus der Datenbank zurück
 * @returns {Object} Objekt mit Status-Informationen
 */
function getDatabaseStatus() {
  return {
    connected: isDatabaseConnected,
    error: connectionError
  };
}

// Exportieren der Funktionen
module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  getDatabaseStatus
};
