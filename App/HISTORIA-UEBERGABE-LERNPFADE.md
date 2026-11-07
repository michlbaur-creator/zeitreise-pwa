# Übergabe: vier Unterrichts-Lernpfade für Historia

Stand: 20. Oktober 2026. Diese Datei bereitet einen eigenen Historia-Chat vor; Historia wurde hierfür nicht verändert. Die vier Themen sind noch nicht festgelegt.

## Startauftrag für den neuen Chat

Wir möchten für historia.mibaso.de zunächst vier eigene Lernpfade nach dem Unterrichtskonzept von Zeitreise vorbereiten. Lies diese Übergabe vollständig und die unten genannten Projektunterlagen. Prüfe die vorhandenen Historia-Szenen und leite daraus vier fachlich zusammenhängende Unterrichtseinheiten ab, chronologisch geordnet und mit Episode 1 beginnend. Stelle die Themen und ihre konkrete Szenenzuordnung zuerst nachvollziehbar vor. Ziel ist anschließend eine vollständige technische Vorschau mit Browserprüfung; eine Veröffentlichung wird gesondert freigegeben.

Bestehende freie Nutzung, Episoden, Challenges, Medien, Sprechertexte und gespeicherte Lernstände müssen erhalten bleiben. Zeitreise und Historia sollen unabhängig und parallel weiterentwickelt werden können. Änderungen für Historia ausschließlich im eigenen Historia-Repository durchführen.

## Verifizierter Projektort und Pflichtlektüre

- Historia-Checkout: `/Users/michaelbaur/.codex/worktrees/eed6/Zeitreise-PWA/App/Historia`
- Eigenes Remote: `https://github.com/michlbaur-creator/historia-pwa.git`
- Am 20. Oktober lokal geprüft: Branch `main`, sauberer Arbeitsbaum, Commit `4c60321`, Service-Worker `historia-v52`.
- Dieser verschachtelte Ordner ist ein **eigenständiges Git-Repository**. Nicht mit Zeitreise zusammen stagen oder veröffentlichen. Den bestehenden Checkout nicht als temporären Rest löschen.
- Der ältere Pfad `/Users/michaelbaur/Documents/Zeitreise-PWA/App/Historia` ist nicht der hier verifizierte Checkout.
- Zuerst anwendbare `AGENTS.md` in den übergeordneten Ordnern prüfen. Im Historia-Repository selbst wurde keine `AGENTS.md` gefunden.
- Lesen: `/Users/michaelbaur/.codex/worktrees/eed6/Zeitreise-PWA/App/Historia/UEBERGABE.md`.
- Lesen: `/Users/michaelbaur/Documents/GitHub/mibaso-wissen/README.md` und `/Users/michaelbaur/Documents/GitHub/mibaso-wissen/apps/historia.md`.
- Als Referenz lesen: `/Users/michaelbaur/Documents/Zeitreise-PWA/App/UEBERGABE.md` und `/Users/michaelbaur/Documents/GitHub/mibaso-wissen/apps/zeitreise.md`.

Wichtig: Historias lokale `UEBERGABE.md` endet inhaltlich bei v48; das gemeinsame Projektgedächtnis beschreibt bereits v52. Bei Widersprüchen neuere Einträge und tatsächlichen Quellcode heranziehen. Die aktuell öffentlich ausgelieferte Historia-Version wurde für diese Übergabe nicht erneut geprüft.

## Inhaltliche Ausgangslage Historia

- Episode 1: „Pharaonen Griechen und Cäsaren“, 16 Szenen.
- Episode 2: „Kaiser Kreuzfahrer und Revolutionäre“, 16 Szenen.
- Episode 3: „Nationen Weltkriege und Gegenwart“, inzwischen 20 Szenen.
- Vorhandene Sprecheraufnahmen, Bilder, Filme, Karten, Entdecken-Texte und Quizfragen nutzen. Aktuelle Szenennummern und Medienzuordnung im Code prüfen; ältere Dokumente nennen für Episode 3 noch 16 oder 19 Szenen.
- Vier Lernpfade insgesamt, nicht vier pro Episode. Verteilung nach fachlicher Eignung und vorhandenen Szenen begründen; noch keine Themen oder Verteilung beschlossen.
- Keine beschlossenen Sprechertexte, Szenenfolgen oder richtigen Quizantworten eigenmächtig ändern. Neue kurze Arbeitsaufträge müssen aus den vorhandenen Inhalten ableitbar sein.

## Übertragbares Unterrichtskonzept

Zwei gleichwertige Einstiege: „Historia entdecken“ und „Historia im Unterricht“. Entdecken erhält sämtliche bisherigen Funktionen. Der Unterrichtsbereich wird hell, schülerfreundlich und farbig gestaltet und behält Historias eigene gestalterische Identität.

Je Lernpfad als Ziel:

1. Kurzer Einstieg, etwa 4 Minuten.
2. Fünf geführte Stationen mit vorhandenen Szenen und zehn Originalquizfragen, etwa 22 Minuten.
3. Eigene Erklär- oder Vergleichsaufgabe auf Papier, etwa 9 Minuten. Kein zusätzlicher Abschnitt „Prüfe deine Erklärung“.
4. Gemeinsame Abschlussbesprechung, etwa 5 Minuten.

Freiwillige Vertiefung für schnelle Schüler zusätzlich. Die insgesamt ungefähr 40 Minuten bleiben bis zur Unterrichtserprobung ein Richtwert. Offene Aufgaben nicht automatisch benoten.

Jeweils eigener lokaler Lernpass und eigene Urkunde. Stationsbestwerte statt mehrfacher Punktevergabe; auch Fehler dürfen die nächste Station nicht blockieren. Fortsetzen, freie Stationswahl, Wiederholen und bestätigtes Zurücksetzen vorsehen. Keine Konten, Ranglisten oder Zeitlimits.

## Bedienung: aktuelle Wünsche von Micha

- Oberer Schalter heißt **„Ton: an/aus“**, auch direkt beim Einstieg. Bestehenden Historia-Schlüssel `historia-quiet` weiterverwenden, keine zweite widersprüchliche Einstellung.
- Stumme Wiedergabe mit vollständigen lesbaren Untertiteln bei normalem Tempo. Die frühere Langsam-Einstellung ist abgeschafft.
- Neue Szenen und Stationen starten unmittelbar aus der Nutzeraktion, auch beim Weitergehen nach dem Check. Quiz und Ergebnis bleiben bis zum Weiterklick ruhig; Feedback nicht automatisch überspringen.
- Dauerhaftes Audioelement und synchroner Start im Klick helfen beim mobilen Autoplay. Gespeicherte Stummschaltung vor dem Start anwenden; manuellen Start als Browser-Fallback erhalten.
- Urkunde mit tatsächlichem Zwischen- oder Endstand, optionalem Namen, Browserdruck und lokal erzeugter A4-PDF. Auf iOS natives Teilen/Drucken ermöglichen und PDF-Öffnen/Sichern als Alternative anbieten.
- Neue Historia-Lernpässe mit eigenen stabilen `historia-…`-Schlüsseln. Bestehende Fortschritte und Challenge-Bestwerte nicht löschen oder umdeuten.

## Zeitreise als technische Referenz

Öffentlich: https://evo.mibaso.de/lernpfade/

Veröffentlichter Stand v155, Commit `958aa8031a31f24c41af79850055d6bb045ce998`. Vier Pfade:

1. „Vom Einzeller zur Vielfalt“ (Episode 1).
2. „Mensch werden: ein verzweigter Weg“ (Episode 2).
3. „Vom Wandern zum Bleiben“ (Episode 3).
4. „Vom Dorf zur Stadt“ (Episode 3).

Referenzdateien unter `/Users/michaelbaur/Documents/Zeitreise-PWA/App/`:

- `app/Welcome.tsx`: zwei Einstiege.
- `app/components/QuietEntry.tsx`: Ton-Schalter.
- `app/data/learningPath.ts`: Pfadkonfiguration und Lernpass.
- `app/data/learningAudio.ts`: Medienauflösung.
- `app/lernpfade/LearningPaths.tsx`: Unterrichtsübersicht.
- `app/lernpfad/LearningPath.tsx`: Stationen, Quiz, Fortschritt und Urkunde.
- `app/lernpfad/LearningPlayer.tsx`: Szenenplayer und bestehende Visuals.
- `app/lernpfad/learning-path.css`: helle Unterrichtsgestaltung und Druckstyles.
- `app/lernpfad/CertificateActions.tsx` und `certificatePdf.ts`: PDF und natives Teilen.
- `tests/learning-path.test.mjs`, `tests/quiet-reading.test.mjs`: relevante Prüfungen.

Diese Dateien als Referenz verwenden und an Historias vorhandenen gemeinsamen Player anpassen. Keine parallele Kopie der Originalmedien oder zweite Szenendatenbank anlegen. Historias Kartenphase und zeitgesteuerte Bild-/Filmfolgen erhalten.

Die Zeitreise-PDF verwendet jsPDF 4.2.1 und eine im Browser gerenderte A4-Canvas, damit Sonderzeichen im Namen erhalten bleiben. Die Datei wird vor dem Teilen-Klick vorbereitet; `navigator.share` muss direkt aus der Nutzeraktion erfolgen. PDF bleibt lokal. Das Verfahren wurde mit tatsächlicher PDF-Erzeugung und Renderprüfung getestet, **noch nicht auf einem echten iPhone/iPad mit AirPrint**.

## Prüfung und Abschluss

- Vollständige Vorschau aller vier Einheiten erstellen und im Browser visuell prüfen: Übersicht, schmale Ansicht, Szenenstart, Ton, Untertitel, Check, Weiter-Autoplay, getrennte Persistenz, Wiederholung, Rücksetzen und Urkunde.
- Bestehende freie Episoden und Challenges auf Regressionen prüfen. Originalfragen, Lösungen und Medienzuordnungen erhalten.
- Projekttests, TypeScript und den tatsächlichen statischen Veröffentlichungsbuild ausführen. Aktuelle Skripte aus Historias `package.json` verwenden.
- Echte iOS-/AirPrint-Prüfung, Unterrichtserprobung und noch offene Medien ehrlich als offen dokumentieren.
- Browserfreigabe liegt grundsätzlich vor; sonstiger Desktop-/Bildschirmzugriff benötigt weiterhin ausdrückliche Zustimmung.
- Zunächst Vorschau. Die frühere Veröffentlichungserlaubnis für Zeitreise gilt nicht automatisch für Historia.
- Nach Freigabe über Historias eigene Pipeline veröffentlichen, Cache-Version erhöhen, Live-Stand prüfen und lokale Übergabe sowie gemeinsamen Historia-Steckbrief aktualisieren.

Für diese Übergabe wurde kein neuer Chat angelegt, keine Historia-Datei verändert und nichts neu veröffentlicht.
