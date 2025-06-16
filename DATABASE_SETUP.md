# Datenbank-Einrichtung

Dieses Projekt verwendet eine MySQL-Datenbank. Folge diesen Schritten, um die Datenbank auf deinem System einzurichten:

## Voraussetzungen

- MySQL Server installiert (Version 5.7 oder höher)
- MySQL Workbench oder einen anderen MySQL-Client (optional)

## Einrichtungsschritte

1. **MySQL Server starten**

   Stelle sicher, dass dein MySQL Server läuft.

2. **Datenbank und Tabellen erstellen**

   Führe das folgende Skript aus, um die Datenbank und Tabellen zu erstellen:
   
   ```sql
   -- Inhalt von schema.sql
   ```
   
   Du kannst dies über die MySQL-Kommandozeile oder MySQL Workbench tun.

3. **Testdaten importieren**

   **Option A: Kompletten Datenbank-Dump importieren (empfohlen)**
   
   Im Ordner `database_backup` befindet sich bereits ein vollständiger Datenbank-Dump (`dump1.sql`), der alle notwendigen Tabellen und Daten enthält. Diesen kannst du wie folgt importieren:
   
   ```bash
   mysql -u root -p ECOMERCE < database_backup/dump1.sql
   ```
   
   Oder mit MySQL Workbench:
   - Öffne MySQL Workbench
   - Verbinde dich mit deinem MySQL-Server
   - Wähle "Server" > "Data Import/Restore"
   - Wähle "Import from Self-Contained File" und wähle `database_backup/dump1.sql`
   - Wähle deine Zieldatenbank aus (ECOMERCE) oder erstelle eine neue
   - Klicke auf "Start Import"

   **Option B: Nur Beispieldaten importieren**
   
   Alternativ kannst du auch nur die Beispieldaten importieren (nachdem du das Schema erstellt hast):
   
   ```sql
   -- Inhalt von data_insert.sql
   ```

4. **Umgebungsvariablen konfigurieren**

   Erstelle eine `.env` Datei im Hauptverzeichnis des Projekts mit folgenden Inhalten:
   
   ```
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=deinPasswort
   MYSQL_DATABASE=ECOMERCE
   ```
   
   Ersetze `deinPasswort` mit deinem MySQL-Root-Passwort.

5. **Verbindung testen**

   Starte den Server mit `npm start` und überprüfe, ob die Verbindung zur Datenbank erfolgreich hergestellt wird.

## Problembehandlung

- **Verbindungsfehler**: Überprüfe die Zugangsdaten in der `.env`-Datei und stelle sicher, dass der MySQL-Server läuft.
- **Tabelle nicht gefunden**: Stelle sicher, dass du das Schema-Skript ausgeführt hast und die Datenbank `ECOMERCE` erstellt wurde.
- **Leere Daten**: Wenn keine Produkte angezeigt werden, überprüfe, ob du das Daten-Import-Skript ausgeführt hast.

Wenn die Datenbank nicht verfügbar ist, zeigt die Anwendung automatisch Platzhalter-Produkte an.
