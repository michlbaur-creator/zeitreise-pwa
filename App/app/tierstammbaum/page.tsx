import type { Metadata } from "next";
import Link from "next/link";
import { AnimalEvolutionFocus } from "../components/AnimalEvolutionFocus";
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
        <Link className="info-back" href="/?weiter=1">
          <span aria-hidden="true">←</span> Zurück zur Szene
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

        <nav
          className="family-tree-learning-path"
          aria-label="Schulweg durch den Tierstammbaum"
        >
          <p>
            <span>Unser Schulweg</span>
            <strong>Die entscheidenden Stationen</strong>
          </p>
          <div>
            <Link href="#fisch-landgang">
              <i>1</i>
              <span>Fische</span>
            </Link>
            <Link href="#fisch-landgang">
              <i>2</i>
              <span>Landgang &amp; Amphibien</span>
            </Link>
            <Link href="#amnioten">
              <i>3</i>
              <span>Nabeltiere</span>
            </Link>
            <Link href="#reptilien">
              <i>4</i>
              <span>Reptilien &amp; Vögel</span>
            </Link>
            <Link href="#rueckkehr-ins-meer">
              <i>5</i>
              <span>Zurück ins Meer</span>
            </Link>
          </div>
        </nav>

        <div className="family-tree-page-content">
          <AnimalFamilyTree />
          <AnimalEvolutionFocus />
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
