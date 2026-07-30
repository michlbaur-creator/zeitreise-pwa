"use client";

import { useState } from "react";

type FamilyTreeNode = {
  id: string;
  name: string;
  scientific?: string;
  symbol: string;
  innovation: string;
  description: string;
};

const nodes: FamilyTreeNode[] = [
  {
    id: "tierreich",
    name: "Tierreich",
    symbol: "◎",
    innovation: "Ein gemeinsamer Ursprung",
    description:
      "So verschieden Tiere heute aussehen: Ihre Stammbäume führen zu gemeinsamen Vorfahren zurück. Der Stammbaum zeigt Verwandtschaft – keine Rangliste.",
  },
  {
    id: "schwaemme",
    name: "Schwämme",
    scientific: "Porifera",
    symbol: "◌",
    innovation: "Viele Zellen arbeiten zusammen",
    description:
      "Schwämme besitzen noch keine echten Organe und kein Nervensystem. Als festsitzende Filtrierer zeigen sie einen sehr frühen Bauplan der Tiere.",
  },
  {
    id: "nesseltiere",
    name: "Nesseltiere",
    scientific: "Cnidaria · früher oft „Hohltiere“",
    symbol: "✺",
    innovation: "Gewebe, Nervennetz und Nesselzellen",
    description:
      "Quallen, Korallen und Seeanemonen besitzen echte Gewebe und ein einfaches Nervennetz. Ihre Nesselzellen dienen Beutefang und Verteidigung.",
  },
  {
    id: "weichtiere",
    name: "Weichtiere",
    scientific: "Mollusca",
    symbol: "◔",
    innovation: "Muskulöser Fuß und Mantel",
    description:
      "Schnecken, Muscheln und Tintenfische wirken sehr verschieden. Ihr gemeinsamer Grundbauplan umfasst unter anderem Mantel und muskulösen Fuß.",
  },
  {
    id: "gliederfuesser",
    name: "Gliederfüßer",
    scientific: "Arthropoda",
    symbol: "✣",
    innovation: "Außenskelett und Gelenkbeine",
    description:
      "Krebse, Spinnen und Insekten tragen ein Außenskelett. Bewegliche, gegliederte Beine machten diese Gruppe besonders vielseitig.",
  },
  {
    id: "stachelhaeuter",
    name: "Stachelhäuter",
    scientific: "Echinodermata",
    symbol: "★",
    innovation: "Wassergefäßsystem",
    description:
      "Seesterne und Seeigel sehen ganz anders aus als Wirbeltiere. Trotzdem gehören beide zu den Neumündern und teilen einen älteren gemeinsamen Vorfahren.",
  },
  {
    id: "wirbeltiere",
    name: "Wirbeltiere",
    scientific: "Vertebrata",
    symbol: "◆",
    innovation: "Schädel und Wirbelsäule",
    description:
      "Bei den Wirbeltieren schützt ein inneres Skelett wichtige Organe und stützt den Körper. Von hier führt unsere Schulroute weiter zu Fischen und Landwirbeltieren.",
  },
  {
    id: "fische",
    name: "Fische",
    scientific: "Sammelgruppe wasserlebender Wirbeltiere",
    symbol: "≋",
    innovation: "Kiemen, Flossen und ein Leben im Wasser",
    description:
      "Aus frühen fischartigen Wirbeltieren gingen später die ersten Landwirbeltiere hervor. Fische sind deshalb keine einzelne, sauber abgeschlossene Abstammungsgruppe.",
  },
  {
    id: "amphibien",
    name: "Amphibien",
    scientific: "Amphibia",
    symbol: "↗",
    innovation: "Vier Gliedmaßen – der Sprung an Land",
    description:
      "Amphibien eroberten das Land, blieben bei Fortpflanzung und Entwicklung aber eng an Wasser gebunden. Sie leben buchstäblich zwischen zwei Welten.",
  },
  {
    id: "amnioten",
    name: "Nabeltiere",
    scientific: "Amniota",
    symbol: "◉",
    innovation: "Das geschützte Ei macht vom Wasser unabhängig",
    description:
      "Embryonalhüllen und später die feste Eischale ermöglichten Fortpflanzung fern vom Wasser. Zu den Amnioten gehören Säugetiere sowie Reptilien einschließlich der Vögel.",
  },
  {
    id: "saeugetiere",
    name: "Säugetiere",
    scientific: "Mammalia",
    symbol: "●",
    innovation: "Haare und Milchdrüsen",
    description:
      "Säugetiere ernähren ihre Jungen mit Milch. Manche ihrer Nachfahren – etwa Wale – kehrten später unabhängig voneinander ins Meer zurück.",
  },
  {
    id: "reptilien",
    name: "Reptilien",
    scientific: "Sauropsida",
    symbol: "◇",
    innovation: "Trockene Haut und Ei an Land",
    description:
      "Zu dieser großen Entwicklungslinie gehören Schildkröten, Echsen, Krokodile und Dinosaurier. Auch Vögel sitzen mitten in diesem Ast.",
  },
  {
    id: "voegel",
    name: "Vögel",
    scientific: "Aves",
    symbol: "⌁",
    innovation: "Federn und ein leichter Körperbau",
    description:
      "Vögel sind die heute lebenden Nachfahren einer Dinosaurierlinie. Sie sind also keine Nachbarn der Reptilien, sondern ein besonderer Reptilienzweig.",
  },
];

const tiers = [
  {
    label: "Frühe Tierlinien",
    note: "Erste Abzweigungen",
    ids: ["schwaemme", "nesseltiere"],
  },
  {
    label: "Zweiseitentiere",
    note: "Links, rechts, vorn und hinten",
    ids: ["weichtiere", "gliederfuesser", "stachelhaeuter", "wirbeltiere"],
  },
  {
    label: "Wirbeltiere an Wasser und Land",
    note: "Der große Landgang",
    ids: ["fische", "amphibien", "amnioten"],
  },
  {
    label: "Die Amnioten verzweigen sich",
    note: "Vom Landei bis zum Federkleid",
    ids: ["saeugetiere", "reptilien", "voegel"],
  },
];

const nodeById = new Map(nodes.map((node) => [node.id, node]));

export function AnimalFamilyTree() {
  const [selectedId, setSelectedId] = useState("tierreich");
  const selected = nodeById.get(selectedId) ?? nodes[0];

  return (
    <div className="interaction-block animal-family-tree">
      <div className="section-label">
        <span>Tierstammbaum</span>
        <i>Schulansicht</i>
      </div>

      <div className="family-tree-intro">
        <div>
          <p className="family-tree-kicker">Wer ist mit wem verwandt?</p>
          <h3>Der Stammbaum der Tiere</h3>
          <p>
            Tippe eine Tiergruppe an. Lies den Baum von oben nach unten:
            Jede Verzweigung steht für gemeinsame Vorfahren – nicht für
            „höher“ oder „besser“.
          </p>
        </div>
        <button
          type="button"
          className={selectedId === "tierreich" ? "is-selected" : ""}
          onClick={() => setSelectedId("tierreich")}
          aria-pressed={selectedId === "tierreich"}
        >
          <span aria-hidden="true">◎</span>
          <strong>Tierreich</strong>
          <small>gemeinsamer Ursprung</small>
        </button>
      </div>

      <div className="family-tree-map">
        {tiers.map((tier, tierIndex) => (
          <section className="family-tree-tier" key={tier.label}>
            <header>
              <span>{twoDigits(tierIndex + 1)}</span>
              <div>
                <strong>{tier.label}</strong>
                <small>{tier.note}</small>
              </div>
            </header>
            <div
              className={`family-tree-nodes family-tree-nodes-${tier.ids.length}`}
            >
              {tier.ids.map((id) => {
                const node = nodeById.get(id);
                if (!node) return null;

                return (
                  <button
                    type="button"
                    className={selectedId === id ? "is-selected" : ""}
                    onClick={() => setSelectedId(id)}
                    aria-pressed={selectedId === id}
                    key={id}
                  >
                    <span aria-hidden="true">{node.symbol}</span>
                    <strong>{node.name}</strong>
                    {node.scientific ? <small>{node.scientific}</small> : null}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <article className="family-tree-detail" aria-live="polite">
        <div className="family-tree-detail-symbol" aria-hidden="true">
          {selected.symbol}
        </div>
        <div>
          <p>{selected.scientific ?? "Gemeinsamer Ursprung aller Tiere"}</p>
          <h4>{selected.name}</h4>
          <strong>{selected.innovation}</strong>
          <span>{selected.description}</span>
        </div>
      </article>

      <aside className="family-tree-return">
        <span aria-hidden="true">↩</span>
        <p>
          <strong>Übrigens: Manche gingen zurück ins Meer.</strong>
          Ichthyosaurier, Meeresschildkröten und Wale stammen jeweils von
          Landwirbeltieren ab. Evolution kennt also auch den Rückweg.
        </p>
      </aside>

      <a
        className="family-tree-fauna-link"
        href="https://fauna.mibaso.de/interaktiv/stammbaum.html"
        target="_blank"
        rel="noreferrer"
      >
        <span>
          <strong>Den vollständigen Tierstammbaum öffnen</strong>
          <small>Mehr Gruppen, Bilder und ausführliche Erklärungen auf Fauna Mibaso</small>
        </span>
        <i aria-hidden="true">↗</i>
      </a>
    </div>
  );
}

function twoDigits(value: number) {
  return String(value).padStart(2, "0");
}
