# E-Commerce Abschlussprojekt

Dieses Projekt ist ein E-Commerce-Prototyp mit einer Angular-Frontend-Anwendung und einem Node.js/Express-Backend.

## Einrichtung des Projekts

### Voraussetzungen

- Node.js (v16 oder höher)
- npm (v7 oder höher)

### Installation

1. Repository klonen:

   ```
   git clone https://github.com/LarsEbt/EcomereAbschlussProjekt.git
   cd EcomereAbschlussProjekt
   ```

2. Backend-Abhängigkeiten installieren:

   ```
   npm install
   ```

3. Frontend-Abhängigkeiten installieren:
   ```
   cd arqive
   npm install
   cd ..
   ```

### Starten der Anwendung

Du kannst beide Server (Backend und Frontend) mit einem einzigen Befehl starten:

```
npm run dev:all
```

Oder separat:

- **Backend-Server:** `npm run dev`
- **Frontend-Server:** `npm run frontend`

Die Anwendung ist dann verfügbar unter:

- Frontend: http://localhost:4200
- Backend-API: http://localhost:3000/api/products

## Funktionen

- Produktkatalog mit Handtaschen und Schmuck
- Kategorien-Filterung (Frontend)
- RESTful API für Produkte
- Responsive Design

## Projektstruktur

- `arqive/` - Angular-Frontend
- `server.js` - Express-Backend
- `database.js` - Datenbankverbindung
- `schema.sql` - Datenbankschema

## Datenbankeinrichtung (optional)

Das Projekt läuft standardmäßig mit simulierten Daten. Wenn du eine MySQL-Datenbank einrichten möchtest:

1. MySQL installieren und starten
2. Datenbankschema importieren:
   ```
   mysql -u root -p < schema.sql
   ```
3. `.env`-Datei basierend auf `.env.example` erstellen und Datenbankeinstellungen anpassen
