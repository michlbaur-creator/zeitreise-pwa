import type { Metadata } from "next";
import Link from "next/link";
import { AnimalFamilyTree } from "../components/AnimalFamilyTree";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Tierstammbaum | Zeitreise – Die Geschichte des Lebens",
  description:
    "Ein kompakter, interaktiver Tierstammbaum für Schule und Zeitreise.",
};

export default function AnimalFamilyTreePage() {
  return (
    <main className="info-shell family-tree-page-shell">
      <header className="info-header">
        <Link className="info-back" href="/">
          <span aria-hidden="true">←</span> Zur Zeitreise
        </Link>
        <div className="info-brand" aria-label="Zeitreise">
          <i aria-hidden="true" />
          <span>Episode 1</span>
        </div>
      </header>

      <article className="info-page family-tree-page">
        <header className="family-tree-page-hero">
          <div>
            <p className="eyebrow">Orientierung durch das Tierreich</p>
            <h1>Der Tierstammbaum</h1>
            <p>
              Von frühen Meerestieren über Fische und Amphibien bis zu
              Reptilien, Vögeln und Säugetieren. Diese Schulansicht zeigt die
              großen Verwandtschaftslinien – ohne im Detaildschungel zu
              verschwinden.
            </p>
          </div>
          <aside>
            <span aria-hidden="true">◆</span>
            <strong>Keine Rangliste</strong>
            <p>
              Jede heute lebende Tiergruppe steht an der Spitze ihres eigenen
              langen Astes.
            </p>
          </aside>
        </header>

        <div className="family-tree-page-content">
          <AnimalFamilyTree />
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
