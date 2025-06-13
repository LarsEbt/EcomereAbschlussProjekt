# Anleitung zum Bereinigen des Git-Repositories

Dein Repository enthält aktuell über 42.000 Dateien, von denen die meisten in `node_modules`-Verzeichnissen liegen. Diese sollten nicht im Repository gespeichert werden, da sie:

1. Das Repository unnötig aufblähen
2. Probleme bei Updates verursachen können
3. Leicht mit `npm install` wiederhergestellt werden können

## So bereinigst du das Repository:

1. Füge die `.gitignore`-Datei zum Repository hinzu:

   ```
   git add .gitignore
   ```

2. Entferne alle `node_modules`-Verzeichnisse aus dem Repository (aber nicht vom Dateisystem):

   ```
   git rm --cached -r */node_modules/
   ```

3. Führe einen Commit durch:

   ```
   git commit -m "Entferne node_modules aus dem Repository und füge .gitignore hinzu"
   ```

4. Push deine Änderungen:
   ```
   git push
   ```

Nach diesen Schritten sollte dein Repository eine normale Größe haben und nur die tatsächlich benötigten Projektdateien enthalten.

## Für andere Teammitglieder:

Nach dem Klonen des bereinigten Repositories müssen alle nur `npm install` im Hauptverzeichnis und im Angular-Verzeichnis ausführen, um die Abhängigkeiten zu installieren:

```
# Im Hauptverzeichnis
npm install

# Im Angular-Verzeichnis
cd arqive
npm install
```
