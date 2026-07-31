import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum & Datenschutz | Zeitreise",
  description:
    "Impressum und Datenschutzhinweise für Zeitreise – Die Geschichte des Lebens.",
};

export default function ImprintPage() {
  return (
    <main className="info-shell">
      <header className="info-header">
        <Link className="info-back" href="/">
          <span aria-hidden="true">←</span> Zur Zeitreise
        </Link>
        <div className="info-brand" aria-label="Zeitreise">
          <i aria-hidden="true" />
          <span>Episode 1</span>
        </div>
      </header>

      <article className="info-page legal-page">
        <div className="info-copy">
          <p className="eyebrow">Rechtliches</p>
          <h1>Impressum &amp; Datenschutz</h1>

          <section>
            <h2>Angaben gemäß § 5 DDG</h2>
            <address>
              Michael Baur
              <br />
              Nordeckerweg 22E
              <br />
              35085 Ebsdorfergrund
              <br />
              Deutschland
            </address>
            <p>
              E-Mail: <a href="mailto:mibaur@me.com">mibaur@me.com</a>
            </p>
          </section>

          <section>
            <h2>Verantwortlich für den Inhalt</h2>
            <p>
              Verantwortlich gemäß § 18 Abs. 2 MStV:
              <br />
              Michael Baur, Anschrift wie oben.
            </p>
          </section>

          <section>
            <h2>Datenschutz</h2>
            <p>
              Diese App verwendet keine Benutzerkonten, keine Werbung und kein
              eigenes Besucher-Tracking. Ich setze keine Analyse- oder
              Werbe-Cookies ein.
            </p>
            <p>
              Dein aktueller Szenenstand, Quiz-Ergebnisse und entdeckte
              Bilddetails werden ausschließlich in deinem Browser gespeichert.
              Für die Offline-Nutzung legt die installierbare Web-App außerdem
              Bilder, Tondateien und Programmdateien im Gerätespeicher ab. Diese
              Daten werden nicht an mich übertragen und können durch Löschen der
              Browser- oder App-Daten entfernt werden.
            </p>
            <p>
              Die Website wird über GitHub Pages bereitgestellt. Beim Abruf
              können technisch notwendige Verbindungsdaten durch GitHub
              verarbeitet werden. Weitere Informationen findest du in der{" "}
              <a
                href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement"
                rel="noreferrer"
                target="_blank"
              >
                Datenschutzerklärung von GitHub
              </a>
              .
            </p>
            <p>
              Wenn du per E-Mail Kontakt aufnimmst, werden deine Angaben nur zur
              Bearbeitung deiner Nachricht verwendet.
            </p>
          </section>

          <section>
            <h2>Transparenz zu KI-Inhalten</h2>
            <p>
              Bei Texten, Illustrationen, Audiodateien und Programmierung kamen
              unterstützend KI-Werkzeuge zum Einsatz. Die Inhalte wurden
              redaktionell ausgewählt, geprüft und für dieses Bildungsprojekt
              bearbeitet.
            </p>
          </section>

          <section>
            <h2>Haftung für Inhalte und Links</h2>
            <p>
              Die Inhalte wurden mit großer Sorgfalt erstellt. Eine Gewähr für
              Vollständigkeit, Richtigkeit und Aktualität kann dennoch nicht
              übernommen werden. Für Inhalte verlinkter externer Seiten sind
              ausschließlich deren Betreiber verantwortlich.
            </p>
          </section>
        </div>
      </article>

      <footer className="info-simple-footer">
        <Link href="/">
          <span aria-hidden="true">←</span> Zurück zur Zeitreise
        </Link>
      </footer>
    </main>
  );
}
