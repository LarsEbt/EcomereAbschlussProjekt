const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

// Express-App initialisieren
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Statische Dateien aus dem Angular-Build-Verzeichnis bereitstellen
app.use(express.static(path.join(__dirname, 'arqive/dist/arqive/browser')));

// Datenbankverbindung initialisieren
db.getProducts().then(() => {
  console.log('\x1b[36m%s\x1b[0m', 'ℹ Datenbank bereit für Abfragen');
}).catch(error => {
  console.error('\x1b[31m%s\x1b[0m', `✗ Fehler bei der Datenbankinitialisierung: ${error.message}`);
  console.log('\x1b[33m%s\x1b[0m', '⚠ Server wird mit eingeschränkter Funktionalität gestartet');
});

// API-Routen für Produkte
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.getProducts();
    res.json(products);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `✗ API-Fehler: ${error.message}`);
    res.status(500).json({
      error: 'Serverfehler beim Abrufen der Produkte',
      message: error.message
    });
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
    console.error('\x1b[31m%s\x1b[0m', `✗ API-Fehler: ${error.message}`);
    res.status(500).json({
      error: 'Serverfehler beim Abrufen des Produkts',
      message: error.message
    });
  }
});

// API-Route für Produkte nach Kategorie
app.get('/api/category/:category', async (req, res) => {
  try {
    const products = await db.getProductsByCategory(req.params.category);
    res.json(products);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `✗ API-Fehler: ${error.message}`);
    res.status(500).json({
      error: 'Serverfehler beim Abrufen der Produkte nach Kategorie',
      message: error.message
    });
  }
});

// API-Route für Datenbankstatus (für Diagnose)
app.get('/api/status', (req, res) => {
  try {
    const status = db.getDatabaseStatus();
    res.json(status);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `✗ API-Fehler: ${error.message}`);
    res.status(500).json({
      error: 'Serverfehler beim Abrufen des Datenbankstatus',
      message: error.message
    });
  }
});

// Catchall-Route für die Angular-App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'arqive/dist/arqive/browser/index.html'));
});

// Server starten mit Fallback auf alternative Ports
const startServer = (port) => {
  // Stelle sicher, dass der Port im gültigen Bereich liegt (0-65535)
  if (port >= 65536) {
    port = 8080;
    console.log('\x1b[33m%s\x1b[0m', `⚠ Port außerhalb des gültigen Bereichs, versuche alternativen Port ${port}...`);
  }

  const server = app.listen(port)
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        const nextPort = port + 1;
        console.log('\x1b[33m%s\x1b[0m', `⚠ Port ${port} ist bereits belegt, versuche Port ${nextPort}...`);
        startServer(nextPort);
      } else {
        console.error('\x1b[31m%s\x1b[0m', `✗ Server-Fehler: ${err.message}`);
      }
    })
    .on('listening', () => {
      const actualPort = server.address().port;
      console.log('\x1b[32m%s\x1b[0m', `✓ Server läuft auf Port ${actualPort}`);
      console.log('\x1b[36m%s\x1b[0m', `ℹ API verfügbar unter: http://localhost:${actualPort}/api/products`);
      console.log('\x1b[36m%s\x1b[0m', `ℹ Statusseite verfügbar unter: http://localhost:${actualPort}/api/status`);
    });
};

startServer(PORT);
