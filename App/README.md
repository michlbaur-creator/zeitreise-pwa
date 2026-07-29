# Zeitreise – Die Geschichte des Lebens

Lokale technische Vorschau der verbindlichen Muster-Episode 1 mit allen
22 Szenen.

## Lokal starten

Voraussetzung ist Node.js ab Version 22.13.

```bash
npm install
npm run dev
```

Danach die angezeigte lokale Adresse im Browser öffnen. Üblicherweise ist das
`http://localhost:3000`.

## Enthalten

- alle 22 Szenen in der verbindlichen Reihenfolge
- finale Sprechertexte und Zeitangaben
- Hotspots, Quizfragen und Entdeckeraufträge
- verbindliche Regiehinweise und Szenenübergänge
- ruhige Bewegungsplatzhalter für die Einträge der Medien-Produktionsliste
- installierbare PWA mit lokal gespeichertem Bearbeitungsstand
- Offline-Nutzung nach dem ersten vollständigen Laden

Die Ordner `Bilder`, `Audio` und `Animationen` enthalten noch keine fertigen
Medien. Deshalb werden in der Vorschau bewusst neutrale Platzhalter verwendet.
Es wurde nichts im Internet veröffentlicht.

## Prüfung

```bash
npm run build
npm test
```
