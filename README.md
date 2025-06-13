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

Du kannst beide Server (Backend und Frontend) auf verschiedene Arten starten:

1. **Parallel starten** (mit concurrently):

```
npm run dev:all
```

2. **Sequentiell starten** (erst Backend, dann Frontend):

```
npm run start:sequential
```

3. **Separat in verschiedenen Terminals**:
   - **Backend-Server:** `npm run dev`
   - **Frontend-Server:** `npm run frontend`

Die Anwendung ist dann verfügbar unter:

- Frontend: http://localhost:4200
- Backend-API: http://localhost:3000/api/products (oder ein anderer Port, wenn 3000 belegt ist)

### Fehlerbehebung

#### Port bereits in Benutzung

Wenn du eine Fehlermeldung wie `Error: listen EADDRINUSE: address already in use :::3000` siehst, bedeutet das, dass der Port 3000 bereits von einem anderen Prozess verwendet wird.

Das Backend wurde jetzt so konfiguriert, dass es automatisch auf den nächsten freien Port (3001, 3002, usw.) ausweicht, wenn Port 3000 belegt ist. Du musst nichts Besonderes tun - achte einfach auf die Ausgabe im Terminal, um zu sehen, auf welchem Port der Server tatsächlich läuft.

Alternativ kannst du auch alle laufenden Node-Prozesse beenden:

```
pkill -f "node server.js" && pkill -f nodemon
```

1. Beende alle laufenden Node-Prozesse:
   ```
   pkill -f "node server.js" && pkill -f nodemon
   ```
2. Starte dann die Server neu:
   ```
   npm run dev:all
   ```

Alternativ kannst du die Server in separaten Terminals in der richtigen Reihenfolge starten:

1. Zuerst den Backend-Server: `npm run dev`
2. Dann in einem neuen Terminal den Frontend-Server: `npm run frontend`

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
