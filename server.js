const express = require('express');
const cors = require('cors');
const path = require('path');
let db;
let databaseConnected = false;

// Versuche, die Datenbankverbindung zu laden
try {
  db = require('./database');
  databaseConnected = true;
  console.log('Datenbankverbindung erfolgreich hergestellt');
} catch (error) {
  console.error('Konnte keine Verbindung zur Datenbank herstellen:', error.message);
  console.log('Server kann nicht gestartet werden ohne Datenbankverbindung');
  process.exit(1); // Beende den Prozess, da die Datenbank erforderlich ist
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
