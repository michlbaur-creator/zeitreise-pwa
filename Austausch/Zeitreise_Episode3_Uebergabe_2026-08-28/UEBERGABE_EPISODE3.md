# Übergabe – Zeitreise-PWA, Episode 3

Stand: 28. August 2026

## Zweck dieses Pakets

Die Planung von Episode 3 begann in einem lokalen Codex-Chat. Nach einem
vorübergehenden Anmeldefehler wurde die Arbeit in einem getrennten Cloud-Chat
fortgesetzt. Dieses Paket führt den dort entstandenen Arbeitsstand wieder in
das lokale Projekt `Zeitreise-PWA` zurück.

Es soll kein neues Projekt angelegt werden. Der lokale Projektordner bleibt die
verbindliche Fassung.

## Verbindliche Entscheidungen

- Episode 3, Teil 1 trägt den Titel **„Vom Wandern zum Bleiben“**.
- Der Teil besteht aus neun Szenen:
  1. Noch einmal zurück
  2. Leben ohne Acker
  3. Steine für die Ewigkeit
  4. Ein Ort bleibt
  5. Eine Ähre verändert sich
  6. Aus Jagd wird Herde
  7. Eine Idee entsteht immer wieder
  8. Leben Wand an Wand
  9. Der Preis des Bleibens
- Die früher entfernten unteren Szenenbuttons bleiben entfernt.
- Zuerst entsteht eine vollständige technische Vorschau.
- Episode 3 darf noch nicht veröffentlicht oder für Suchmaschinen freigegeben
  werden.
- Freigegebene Sprechertexte, Hotspots und Quizfragen dürfen nicht
  eigenmächtig umgeschrieben werden.

## Aktueller Medienstand

### Szene 1 – Noch einmal zurück

Zwei Bilder sind vorhanden:

- heutige Landschaft mit dem verbindlichen Zeitfelsen,
- derselbe Übergang in die Landschaft um etwa 12.000 v. Chr.

In der Vorschau kann zwischen „Heute“ und „Um 12.000 v. Chr.“ weich
überblendet werden. Der Zeitfelsen ist visuell sehr ähnlich, aber nicht
pixelgenau identisch.

Status: **Bildpaar fertig**.

### Szene 2 – Leben ohne Acker

Das Bild zeigt eine kenntnisreiche Jäger-und-Sammler-Gruppe beim Sammeln und
Verarbeiten wilder Gräser. Es zeigt bewusst kein Feld, keine Herde und kein
festes Dorf.

Micha bewertete das Bild als „richtig gut“. Es gilt damit als bestätigter
Arbeitsentwurf; die formale Endfreigabe kann bei der vollständigen
Szenenprüfung erfolgen.

### Szene 3 – Steine für die Ewigkeit

Das Bild rekonstruiert Göbekli Tepe während der Errichtung um etwa 9.600 v.
Chr. Zu sehen sind T-förmige Kalksteinpfeiler, ein Tierrelief,
Steinbearbeitung und gemeinschaftlicher Transport mit Seilen und Holz.

Micha bewertete auch dieses Bild als „richtig gut“. Es bleibt zunächst als
Arbeitsentwurf gekennzeichnet, weil der rechts gezogene Stein eher als
unbearbeiteter Rohling denn als fertiger T-Pfeiler lesbar ist. Das ist kein
Grund für eine sofortige Neugenerierung.

## Technische Vorschau

Die beigefügte Arbeitsfassung enthält:

- die geschützte Route `/episode-3/`,
- den interaktiven Zeitsprung in Szene 1,
- Szene 2 und Szene 3 als große Bildflächen untereinander,
- keine Szenenkacheln und keine unteren Szenenbuttons,
- einen Hinweis, dass die verbindlichen Sprechertexte unangetastet bleiben,
- PWA-Cache-Einträge für die Medien der drei Szenen,
- einen Link von der Arbeitsfassung der Episode 2 zur Episode-3-Vorschau.

Der Build und alle **32 Tests** liefen erfolgreich durch.

## Inhalt des Ordners „Projektstand“

Der Ordner bildet die betroffenen Pfade der Arbeitsfassung nach. Er enthält:

- `App/app/data/episode3.ts`
- `App/app/episode-3/EpisodeThreePreview.tsx`
- `App/app/episode-3/page.tsx`
- die vier Bilder unter `App/public/assets/episode3/`
- die mitbetroffenen vorhandenen Dateien für Navigation, Gestaltung,
  Offline-Cache, Tests und Vorschau-Konfiguration.

Die Datei `AENDERUNGEN_TRACKED.patch` dokumentiert zusätzlich die Änderungen
an bereits vorhandenen Dateien. Sie dient dem lokalen Codex zum Vergleich und
darf nicht blind angewendet werden, wenn der lokale Bestand inzwischen
abweicht.

## Auftrag an den lokalen Codex

1. Zuerst `AGENTS.md` und die dort genannten verbindlichen Projektdokumente
   lesen.
2. Den lokalen Änderungsstand prüfen und sämtliche vorhandenen Arbeiten des
   Benutzers erhalten.
3. Den beigefügten Projektstand dateiweise mit dem lokalen `App`-Ordner
   vergleichen.
4. Nur die Episode-3-Ergänzungen übernehmen; keine vollständige Projektkopie
   über den lokalen Bestand stülpen.
5. Die vier Bilder in die vorgesehenen Medienordner übernehmen.
6. Build und Tests ausführen.
7. Eine echte lokale Browser-Vorschau von `/episode-3/` öffnen.
8. Erst nach Michas Sichtprüfung mit Szene 4 „Ein Ort bleibt“ – Jericho –
   fortfahren.
9. Nichts veröffentlichen, bevor Micha ausdrücklich zustimmt.

## Bildprompt für Szene 3 – Kurzfassung

Fotorealistische naturhistorische Rekonstruktion von Göbekli Tepe während der
Errichtung um 9.600 v. Chr.; trockene Hügellandschaft Südostanatoliens;
T-förmige monolithische Kalksteinpfeiler, flaches Tierrelief, Steinwerkzeuge,
Pflanzenfaserseile und Holzunterlage; moderne Homo-sapiens-Anatomie,
funktionale Kleidung aus Leder, Fell und Pflanzenfasern; ruhiges 16:9-Panorama;
keine Metallwerkzeuge, Räder, Zugtiere, Keramik, Landwirtschaft, modernen
Ruinen, Priesterkostüme, Opferdarstellung oder Fantasy-Elemente.

## Nächster inhaltlicher Schritt

Nach erfolgreicher lokaler Übernahme und Sichtprüfung folgt Szene 4:
**„Ein Ort bleibt“ – frühes Jericho an der Quelle, mit runden
Lehmziegelhäusern, Mauer und Turm.**
