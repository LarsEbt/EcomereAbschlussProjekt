const express = require('express');
const cors = require('cors');
const path = require('path');
let db;

// Versuche, die Datenbankverbindung zu laden
try {
  db = require('./database');
  console.log('Datenbankverbindung erfolgreich hergestellt');
} catch (error) {
  console.warn('Konnte keine Verbindung zur Datenbank herstellen:', error.message);
  console.log('Server wird im Demo-Modus gestartet mit simulierten Daten');
  
  // Erstelle simulierte Daten für die Entwicklung
  db = {
    getProducts: async () => {
      return simulatedProducts;
    },
    getProductById: async (id) => {
      return simulatedProducts.find(p => p.id === parseInt(id)) || null;
    },
    getProductsByCategory: async (category) => {
      return simulatedProducts.filter(p => p.category === category);
    },
    addProduct: async (product) => {
      const newId = Math.max(...simulatedProducts.map(p => p.id)) + 1;
      const newProduct = { ...product, id: newId };
      simulatedProducts.push(newProduct);
      return newId;
    },
    updateProduct: async (id, product) => {
      const index = simulatedProducts.findIndex(p => p.id === parseInt(id));
      if (index === -1) return false;
      simulatedProducts[index] = { ...product, id: parseInt(id) };
      return true;
    },
    deleteProduct: async (id) => {
      const index = simulatedProducts.findIndex(p => p.id === parseInt(id));
      if (index === -1) return false;
      simulatedProducts.splice(index, 1);
      return true;
    }
  };
}

const app = express();
const PORT = process.env.PORT || 3000;

// Simulierte Produktdaten
const simulatedProducts = [
  {
    id: 1,
    name: 'Elegante Handtasche',
    description: 'Eine elegante schwarze Handtasche für jeden Anlass.',
    price: 149.99,
    imageUrl: 'placeholder1.jpg',
    category: 'handtaschen',
    size: 'Mittel',
    color: 'Schwarz',
    stock: 10
  },
  {
    id: 2,
    name: 'Kleine Clutch',
    description: 'Perfekte kleine Clutch für besondere Anlässe.',
    price: 79.99,
    imageUrl: 'placeholder2.png',
    category: 'handtaschen',
    size: 'Klein',
    color: 'Weiß',
    stock: 15
  },
  {
    id: 3,
    name: 'Business Tasche',
    description: 'Geräumige Tasche für Business-Anlässe.',
    price: 199.99,
    imageUrl: 'placeholder1.jpg',
    category: 'handtaschen',
    size: 'Groß',
    color: 'Braun',
    stock: 8
  },
  {
    id: 4,
    name: 'Gold-Armband',
    description: 'Elegantes Armband in Gold-Optik.',
    price: 59.99,
    imageUrl: 'placeholder3.jpg',
    category: 'schmuck',
    size: null,
    color: 'Gelb',
    stock: 20
  },
  {
    id: 5,
    name: 'Silber-Kette',
    description: 'Filigrane Silberkette mit Anhänger.',
    price: 49.99,
    imageUrl: 'placeholder3.jpg',
    category: 'schmuck',
    size: null,
    color: 'Weiß',
    stock: 25
  },
  {
    id: 6,
    name: 'Designer-Uhr',
    description: 'Hochwertige Designer-Uhr im modernen Look.',
    price: 299.99,
    imageUrl: 'placeholder3.jpg',
    category: 'accessoires',
    size: null,
    color: 'Schwarz',
    stock: 5
  },
  {
    id: 7,
    name: 'Shopper Tasche',
    description: 'Große Shopper Tasche für den Alltag.',
    price: 129.99,
    imageUrl: 'placeholder1.jpg',
    category: 'handtaschen',
    size: 'Groß',
    color: 'Blau',
    stock: 12
  },
  {
    id: 8,
    name: 'Mini-Rucksack',
    description: 'Stylischer Mini-Rucksack für Damen.',
    price: 89.99,
    imageUrl: 'placeholder1.jpg',
    category: 'handtaschen',
    size: 'Klein',
    color: 'Rot',
    stock: 18
  },
  {
    id: 9,
    name: 'Leder-Umhängetasche',
    description: 'Hochwertige Umhängetasche aus echtem Leder.',
    price: 179.99,
    imageUrl: 'placeholder1.jpg',
    category: 'handtaschen',
    size: 'Mittel',
    color: 'Braun',
    stock: 7
  },
  {
    id: 10,
    name: 'Vintage-Handtasche',
    description: 'Handtasche im Vintage-Look mit goldenen Details.',
    price: 139.99,
    imageUrl: 'placeholder1.jpg',
    category: 'handtaschen',
    size: 'Mittel',
    color: 'Schwarz',
    stock: 9
  },
  {
    id: 11,
    name: 'Sommer-Strandtasche',
    description: 'Große Strandtasche für den Sommerurlaub.',
    price: 69.99,
    imageUrl: 'placeholder1.jpg',
    category: 'handtaschen',
    size: 'Groß',
    color: 'Blau',
    stock: 22
  },
  {
    id: 12,
    name: 'Party-Clutch',
    description: 'Glitzernde Clutch für Partys und Events.',
    price: 59.99,
    imageUrl: 'placeholder1.jpg',
    category: 'handtaschen',
    size: 'Klein',
    color: 'Schwarz',
    stock: 15
  },
  // Neue Produkte
  {
    id: 13,
    name: 'Luxus-Armband Gold',
    description: 'Edles Armband aus echtem Gold mit Diamantbesatz.',
    price: 499.99,
    imageUrl: 'placeholder3.jpg',
    category: 'schmuck',
    size: null,
    color: 'Gelb',
    stock: 5
  },
  {
    id: 14,
    name: 'Premium Crossbody Bag',
    description: 'Moderne Crossbody-Tasche aus veganem Leder.',
    price: 129.99,
    imageUrl: 'placeholder1.jpg',
    category: 'handtaschen',
    size: 'Klein',
    color: 'Blau',
    stock: 12
  }
];

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'arqive/dist')));

// API-Routen für Produkte
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.getProducts();
    res.json(products);
  } catch (error) {
    console.error('Fehler beim Abrufen der Produkte:', error);
    res.status(500).json({ error: 'Serverfehler beim Abrufen der Produkte' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produkt nicht gefunden' });
    }
    res.json(product);
  } catch (error) {
    console.error('Fehler beim Abrufen des Produkts:', error);
    res.status(500).json({ error: 'Serverfehler beim Abrufen des Produkts' });
  }
});

// Nach Kategorie
app.get('/api/category/:category', async (req, res) => {
  try {
    const products = await db.getProductsByCategory(req.params.category);
    res.json(products);
  } catch (error) {
    console.error('Fehler beim Abrufen der Produkte nach Kategorie:', error);
    res.status(500).json({ error: 'Serverfehler beim Abrufen der Produkte nach Kategorie' });
  }
});

// Neues Produkt hinzufügen
app.post('/api/products', async (req, res) => {
  try {
    const newProductId = await db.addProduct(req.body);
    const newProduct = await db.getProductById(newProductId);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Fehler beim Hinzufügen des Produkts:', error);
    res.status(500).json({ error: 'Serverfehler beim Hinzufügen des Produkts' });
  }
});

// Produkt aktualisieren
app.put('/api/products/:id', async (req, res) => {
  try {
    const success = await db.updateProduct(req.params.id, req.body);
    if (!success) {
      return res.status(404).json({ error: 'Produkt nicht gefunden' });
    }
    const updatedProduct = await db.getProductById(req.params.id);
    res.json(updatedProduct);
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Produkts:', error);
    res.status(500).json({ error: 'Serverfehler beim Aktualisieren des Produkts' });
  }
});

// Produkt löschen
app.delete('/api/products/:id', async (req, res) => {
  try {
    const success = await db.deleteProduct(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Produkt nicht gefunden' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Fehler beim Löschen des Produkts:', error);
    res.status(500).json({ error: 'Serverfehler beim Löschen des Produkts' });
  }
});

// Catchall route für Angular-App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'arqive/dist/index.html'));
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
  console.log(`API verfügbar unter: http://localhost:${PORT}/api/products`);
});
