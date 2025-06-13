const express = require('express');
const cors = require('cors');
const path = require('path');
let db;
let databaseConnected = false;

// Simulierte Produktdaten - werden als Fallback oder Ergänzung verwendet
const simulatedProducts = [
  {
    id: 1001, // Hohe IDs verwenden, um Konflikte mit DB-IDs zu vermeiden
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
    id: 1002,
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
    id: 1003,
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
    id: 1004,
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
    id: 1005,
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
    id: 1006,
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
    id: 1007,
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
    id: 1008,
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
    id: 1009,
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
    id: 1010,
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
    id: 1011,
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
    id: 1012,
    name: 'Party-Clutch',
    description: 'Glitzernde Clutch für Partys und Events.',
    price: 59.99,
    imageUrl: 'placeholder1.jpg',
    category: 'handtaschen',
    size: 'Klein',
    color: 'Schwarz',
    stock: 15
  }
];

// Versuche, die Datenbankverbindung zu laden
try {
  db = require('./database');
  databaseConnected = true;
  console.log('Datenbankverbindung erfolgreich hergestellt');
} catch (error) {
  console.warn('Konnte keine Verbindung zur Datenbank herstellen:', error.message);
  console.log('Server wird im Demo-Modus gestartet mit simulierten Daten');
  
  // Erstelle simulierte Daten für die Entwicklung, wenn keine DB vorhanden
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

// Wenn wir eine Datenbankverbindung haben, erweitern wir die Methoden um simulierte Daten aufzufüllen
if (databaseConnected) {
  // Original-Methoden speichern
  const originalGetProducts = db.getProducts;
  const originalGetProductsByCategory = db.getProductsByCategory;
  
  // Überschreiben der getProducts-Methode, um ggf. simulierte Daten hinzuzufügen
  db.getProducts = async () => {
    const dbProducts = await originalGetProducts();
    console.log(`${dbProducts.length} Produkte aus der Datenbank geladen`);
    
    // Wenn weniger als 12 Produkte, fülle mit simulierten Daten auf
    if (dbProducts.length < 12) {
      console.log(`Füge ${12 - dbProducts.length} simulierte Produkte hinzu`);
      
      // Simulierte Produkte hinzufügen, aber nur so viele wie nötig
      const productsToAdd = simulatedProducts.slice(0, 12 - dbProducts.length);
      
      // IDs der DB-Produkte extrahieren, um Konflikte zu vermeiden
      const dbIds = dbProducts.map(p => p.id);
      
      // Simulierte Produkte mit garantiert eindeutigen IDs hinzufügen
      const combinedProducts = [
        ...dbProducts,
        ...productsToAdd.map(p => {
          // Stelle sicher, dass die simulierte ID nicht mit einer DB-ID kollidiert
          if (dbIds.includes(p.id)) {
            return { ...p, id: p.id + 10000 }; // Füge 10000 hinzu, um Konflikte zu vermeiden
          }
          return p;
        })
      ];
      
      return combinedProducts;
    }
    
    return dbProducts;
  };
  
  // Überschreiben der getProductsByCategory-Methode, um ggf. simulierte Daten hinzuzufügen
  db.getProductsByCategory = async (category) => {
    const dbProducts = await originalGetProductsByCategory(category);
    console.log(`${dbProducts.length} Produkte der Kategorie '${category}' aus der Datenbank geladen`);
    
    // Wenn weniger als 4 Produkte in dieser Kategorie, fülle mit simulierten Daten auf
    if (dbProducts.length < 4) {
      console.log(`Füge simulierte Produkte zur Kategorie '${category}' hinzu`);
      
      // Simulierte Produkte der passenden Kategorie finden
      const categorySimProducts = simulatedProducts.filter(p => p.category === category);
      
      // Füge bis zu 4 Produkte hinzu (oder weniger, wenn nicht genug simulierte Produkte vorhanden sind)
      const productsToAdd = categorySimProducts.slice(0, 4 - dbProducts.length);
      
      // IDs der DB-Produkte extrahieren, um Konflikte zu vermeiden
      const dbIds = dbProducts.map(p => p.id);
      
      // Simulierte Produkte mit garantiert eindeutigen IDs hinzufügen
      const combinedProducts = [
        ...dbProducts,
        ...productsToAdd.map(p => {
          // Stelle sicher, dass die simulierte ID nicht mit einer DB-ID kollidiert
          if (dbIds.includes(p.id)) {
            return { ...p, id: p.id + 10000 }; // Füge 10000 hinzu, um Konflikte zu vermeiden
          }
          return p;
        })
      ];
      
      return combinedProducts;
    }
    
    return dbProducts;
  };
}

const app = express();
const PORT = process.env.PORT || 3000;

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

// Server starten mit Fallback auf alternative Ports
const startServer = (port) => {
  const server = app.listen(port)
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} ist bereits belegt, versuche Port ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error('Server-Fehler:', err);
      }
    })
    .on('listening', () => {
      const actualPort = server.address().port;
      console.log(`Server läuft auf Port ${actualPort}`);
      console.log(`API verfügbar unter: http://localhost:${actualPort}/api/products`);
    });
};

startServer(PORT);
