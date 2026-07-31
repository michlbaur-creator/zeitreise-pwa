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
        <div className="family-tree-page-content">
          <AnimalFamilyTree />
          <AnimalEvolutionFocus />
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
