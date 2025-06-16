# Datenbank-Backups

Dieser Ordner enthält Datenbank-Dumps und Backups der MySQL-Datenbank.

## Verwendung

### Export der Datenbank

#### Methode 1: Mit MySQL Workbench (Empfohlen)

1. Öffne MySQL Workbench
2. Verbinde dich mit deiner Datenbank
3. Wähle im Menü "Server" > "Data Export"
4. Wähle deine Datenbank aus
5. Wähle alle Tabellen aus
6. Wähle "Export to Self-Contained File"
7. Speichere die Datei als `database_export_DATUM.sql` in diesem Ordner
8. Klicke auf "Start Export"

#### Methode 2: Mit Kommandozeile

Um ein Backup der aktuellen Datenbank zu erstellen:

```bash
mysqldump -u root -p ECOMERCE > db_backup_DATUM.sql
```

Ersetze DATUM mit dem aktuellen Datum (z.B. db_backup_2025-06-17.sql).

### Import eines Backups

#### Methode 1: Mit MySQL Workbench (Empfohlen)

1. Öffne MySQL Workbench
2. Verbinde dich mit deiner Datenbank
3. Wähle im Menü "Server" > "Data Import/Restore"
4. Wähle "Import from Self-Contained File"
5. Wähle die Backup-Datei aus
6. Wähle deine Zieldatenbank aus (oder erstelle eine neue)
7. Klicke auf "Start Import"

#### Methode 2: Mit Kommandozeile

Um ein Backup wiederherzustellen:

```bash
mysql -u root -p ECOMERCE < db_backup_DATUM.sql
```

## Inhalte

- Vollständige Datenbank-Dumps (Schema + Daten)
- Backup-Dateien mit Zeitstempel

## Hinweis für Uni-Projekt

Diese Backups sind besonders wichtig für dein Uni-Projekt, da sie:

1. Die vollständige Datenbank mit allen Produktdaten enthalten
2. Die Reproduzierbarkeit deines Projekts für Dozenten und Teammitglieder sicherstellen
3. Als Sicherung dienen, falls die lokale Datenbank beschädigt wird

Stelle sicher, dass du vor der Abgabe ein vollständiges und aktuelles Backup in diesem Ordner speicherst!
