import type { Metadata } from "next";
import { HistoryBackLink } from "../components/HistoryBackLink";

export const metadata: Metadata = {
  title: "Impressum & Datenschutz | Zeitreise",
  description:
    "Impressum und Datenschutzhinweise für Zeitreise – Die Geschichte des Lebens.",
};

export default function ImprintPage() {
  return (
    <main className="info-shell">
      <header className="info-header">
        <HistoryBackLink />
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
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:
              <br />
              Michael Baur, Anschrift wie oben.
            </p>
            <p>Dies ist eine private, nicht-kommerzielle Website.</p>
          </section>

          <section>
            <h2>Datenschutz</h2>
            <p>
              Zeitreise Mibaso ist eine reine Web-App ohne Nutzerkonto. Es
              werden keine personenbezogenen Daten erhoben, gespeichert oder an
              Dritte weitergegeben. Es gibt kein Tracking und keine Werbung.
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
              Die Seite wird über GitHub Pages bereitgestellt (GitHub Inc., 88
              Colin P. Kelly Jr. St, San Francisco, CA 94107, USA). Beim Aufruf
              werden technisch bedingt Server-Logdaten (z. B. IP-Adresse,
              Zeitpunkt des Abrufs) durch GitHub verarbeitet; Näheres in der{" "}
              <a
                href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement"
                rel="noreferrer"
                target="_blank"
              >
                Datenschutzerklärung von GitHub
              </a>
              . Darauf habe ich keinen Einfluss.
            </p>
          </section>

          <section>
            <h2>Transparenzhinweis zu KI-Inhalten</h2>
            <p>
              Teile der Texte, Grafiken und Illustrationen dieser App wurden mit
              Unterstützung generativer KI erstellt und anschließend
              redaktionell geprüft.
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

          <p className="legal-copy">© 2026 Michael Baur · Zeitreise Mibaso</p>
        </div>
      </article>

    </main>
  );
}
