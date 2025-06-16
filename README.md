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
- `data_insert.sql` - SQL-Skript mit Beispieldaten
- `database_backup/` - Ordner für Datenbank-Dumps und Backups
- `DATABASE_SETUP.md` - Detaillierte Anleitung zur Datenbankeinrichtung

## Datenbank-Einrichtung

Das Projekt verwendet eine MySQL-Datenbank. Folge diesen Schritten zur Einrichtung:

### Kurzanleitung

1. MySQL Server installieren und starten
2. Datenbank erstellen mit `schema.sql`
3. Testdaten importieren mit `data_insert.sql`
4. `.env`-Datei basierend auf `.env.example` erstellen und anpassen

Detaillierte Anweisungen findest du in der Datei [DATABASE_SETUP.md](DATABASE_SETUP.md).

### Datenbank-Export/Import

Für dieses Projekt ist bereits ein vollständiger Datenbank-Dump vorhanden:

1. **Fertige Datenbank importieren**:
   ```
   mysql -u root -p ECOMERCE < database_backup/dump1.sql
   ```
   Alternativ kannst du den Dump mit MySQL Workbench importieren:
   - Öffne MySQL Workbench
   - Verbinde dich mit deinem MySQL-Server
   - Wähle "Server" > "Data Import/Restore"
   - Wähle "Import from Self-Contained File" und wähle `database_backup/dump1.sql`
   - Wähle deine Zieldatenbank aus (ECOMERCE) oder erstelle eine neue
   - Klicke auf "Start Import"

2. **Eigenen Export erstellen** (falls notwendig):
   ```
   mysqldump -u root -p ECOMERCE > database_backup/db_backup_DATUM.sql
   ```

Weitere Details zu Datenbank-Exports und -Imports findest du in der README-Datei im `database_backup`-Ordner.

Die Datenbankverbindung wird in der `.env`-Datei konfiguriert. Eine Beispieldatei `.env.example` liegt bei.

## Datenbankeinrichtung (optional)

Das Projekt kann entweder mit einer MySQL-Datenbank oder mit simulierten Daten laufen. Bei weniger als 12 Produkten in der Datenbank werden automatisch simulierte Produkte hinzugefügt.

### Einrichtung der MySQL-Datenbank:

1. **MySQL installieren** (falls noch nicht vorhanden):

   ```
   sudo apt-get update && sudo apt-get install -y mysql-server
   ```

2. **MySQL starten und sichern**:

   ```
   sudo service mysql start
   sudo mysql_secure_installation
   ```

3. **Datenbankschema und Beispieldaten importieren**:

   ```
   sudo mysql < schema.sql
   ```

4. **MySQL-Benutzer für die Anwendung einrichten**:

   ```
   sudo mysql -e "CREATE USER IF NOT EXISTS 'app'@'localhost' IDENTIFIED BY 'app'; GRANT ALL PRIVILEGES ON ECOMERCE.* TO 'app'@'localhost'; FLUSH PRIVILEGES;"
   ```

5. **Datenbankeinstellungen in der `.env`-Datei konfigurieren**:

   ```
   # Datenbank-Konfiguration
   MYSQL_HOST=localhost
   MYSQL_USER=app
   MYSQL_PASSWORD=app
   MYSQL_DATABASE=ECOMERCE
   ```

6. **Überprüfen, ob die Daten importiert wurden**:

   ```
   sudo mysql -e "USE ECOMERCE; SELECT COUNT(*) AS 'Anzahl Produkte' FROM products;"
   ```

   Sollte eine Anzahl größer als 0 zurückgeben.

### Verwendung mit simulierten Daten:

Wenn keine Datenbankverbindung hergestellt werden kann oder die Datenbank weniger als 12 Produkte enthält, verwendet das System automatisch simulierte Daten oder füllt die vorhandenen Daten auf.
