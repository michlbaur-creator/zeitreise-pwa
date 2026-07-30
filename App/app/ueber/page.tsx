import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Über mich | Zeitreise – Die Geschichte des Lebens",
  description:
    "Michael Baur über die Entstehung des Bildungsprojekts Zeitreise.",
};

export default function AboutPage() {
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

      <article className="info-page about-page">
        <div className="about-portrait">
          {/* Das unveränderte Originalfoto wird bewusst direkt ausgeliefert. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/site/michael-baur-garten.jpg"
            width={675}
            height={900}
            alt="Michael Baur im Garten"
          />
        </div>

        <div className="info-copy">
          <p className="eyebrow">Über mich</p>
          <h1>Hallo, ich bin Micha.</h1>
          <p className="info-lead">
            Pensionierter Biologie- und Chemielehrer, neugieriger
            Medienbastler – und immer noch gern auf Entdeckungsreise.
          </p>

          <p>
            Drei Jahrzehnte Biologie, Chemie und Kreidestaub an der
            Gesamtschule Hungen: genug Zeit, um zu erleben, dass Lernen dann am
            besten funktioniert, wenn Neugier, Bilder und eine gute Geschichte
            zusammenkommen.
          </p>
          <p>
            Um 2001 entdeckte ich das Internet als Unterrichtswerkzeug. Später
            arbeitete ich als Fachberater für Medienkompetenz und als Redakteur
            am Hessischen Bildungsserver. Seit dem Ruhestand gebe ich
            ehrenamtliche Medien-Coachings, leite VHS-Kurse und entwickle eigene
            kleine Web-Apps.
          </p>

          <h2>Warum diese Zeitreise?</h2>
          <p>
            Erdgeschichte ist großartig – aber 4,6 Milliarden Jahre klingen
            zunächst wie eine unvorstellbare Zahlenwüste. Deshalb soll diese App
            daraus eine Reise machen: mit Bildern, Geräuschen, kurzen
            Erklärungen und Dingen, die man selbst entdecken kann.
          </p>
          <p>
            Bei der Entwicklung helfen mir moderne KI-Werkzeuge. Die fachliche
            Auswahl, die Texte, viele Sprecheraufnahmen und die redaktionellen
            Entscheidungen bleiben dabei meine Aufgabe. Fehler können trotzdem
            vorkommen; Hinweise und Rückmeldungen sind deshalb willkommen.
          </p>

          <a className="info-contact" href="mailto:mibaur@me.com">
            Schreib mir: mibaur@me.com
          </a>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
