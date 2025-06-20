# ARQIVE E-Commerce Projekt

Dieses Projekt ist ein vollständig funktionsfähiger E-Commerce-Prototyp mit einem Angular-Frontend, der Produkte aus einer Supabase-Datenbank anzeigt und einen kompletten Kaufprozess simuliert.

## Voraussetzungen

Für die Ausführung dieses Projekts benötigen Sie:

- **Node.js** (Version 16 oder höher)
  - Download: [https://nodejs.org/](https://nodejs.org/)
  - Überprüfen mit: `node -v`

- **npm** (Version 7 oder höher, wird mit Node.js installiert)
  - Überprüfen mit: `npm -v`

- **Angular CLI** (Version 19.x)
  - Installation: `npm install -g @angular/cli`
  - Überprüfen mit: `ng version`

## Installation und Einrichtung

1. **Projekt herunterladen**

   ```
   git clone https://github.com/LarsEbt/EcomereAbschlussProjekt.git
   cd EcomereAbschlussProjekt
   ```

   Alternativ können Sie auch den ZIP-Download verwenden und entpacken.

2. **Abhängigkeiten installieren**
   ```
   cd arqive
   npm install
   ```

## Starten der Anwendung

```
cd arqive
ng serve
```

Das Frontend ist dann unter [http://localhost:4200](http://localhost:4200) erreichbar.

## Datenbank-Informationen

Dieses Projekt verwendet **Supabase** als Datenbank-Backend. Die Produkte werden aus einer Supabase-Tabelle geladen, die bereits konfiguriert und mit Testdaten gefüllt ist.

Die notwendigen API-Schlüssel sind bereits im Code eingebettet, sodass keine zusätzliche Konfiguration erforderlich ist.

### Zugriff auf die Datenbank

Die Supabase-Zugangsdaten sind aus Sicherheitsgründen nicht in diesem Repository enthalten. Falls Sie Zugriff auf die Datenbank-Administration benötigen (z.B. um eigene Produkte hinzuzufügen oder die Struktur zu ändern), kontaktieren Sie bitte:

- **E-Mail:** larsebert01@gmail.com ODER l.ebert@uni-jena.de

## Funktionalitäten

- **Produktanzeige**: Browsing durch verschiedene Produktkategorien
- **Produktdetails**: Anzeige detaillierter Produktinformationen
- **Warenkorb**: Hinzufügen, Entfernen und Anpassen von Produktmengen
- **Checkout-Prozess**: Simulierter Bezahlvorgang mit Formularvalidierung

## Technologien

- **Frontend**: Angular 19
- **Datenbank**: Supabase (PostgreSQL)
- **Styling**: SCSS
- **Formulare**: Reactive Forms mit Validierung
- **Routing**: Angular Router mit parametrisierten Routen

## Bekannte Einschränkungen

- Das Projekt ist ein Prototyp und kein vollständiges Produktionssystem
- Die Zahlungsabwicklung ist simuliert und verarbeitet keine echten Transaktionen
- Die Benutzerauthentifizierung ist nicht implementiert

## Feedback und Kontakt

Bei Fragen, Problemen oder Feedback wenden Sie sich bitte an:
- **E-Mail:** larsebert01@gmail.com ODER l.ebert@uni-jena.de

## Projektstruktur

- `arqive/` - Angular-Frontend mit allen Komponenten, Services und Assets
