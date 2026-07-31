"use client";

import { useEffect, useState } from "react";

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
      "So verschieden Tiere heute aussehen: Ihre Stammbäume führen zu gemeinsamen Vorfahren zurück.",
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
    scientific: "Bilateria",
    note: "Links, rechts, vorn und hinten",
    ids: ["weichtiere", "gliederfuesser", "stachelhaeuter", "wirbeltiere"],
  },
  {
    label: "Wirbeltiere an Wasser und Land",
    scientific: "Vertebrata",
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
const tierIndexByNodeId = new Map(
  tiers.flatMap((tier, tierIndex) =>
    tier.ids.map((id) => [id, tierIndex] as const),
  ),
);

const treeQuiz = [
  {
    question: "Fangfrage: Welche Aussage über Schwämme ist falsch?",
    options: [
      "Viele spezialisierte Zellen arbeiten zusammen.",
      "Sie filtrieren Nahrungsteilchen aus dem Wasser.",
      "Sie besitzen echte Organe und ein Nervensystem.",
    ],
    correctIndex: 2,
    explanation:
      "Schwämme sind vielzellig, besitzen aber weder echte Organe noch ein Nervensystem.",
  },
  {
    question:
      "Korallen und Quallen sehen völlig verschieden aus. Welche gemeinsame Neuerung verrät ihre Verwandtschaft?",
    options: [
      "Mantel und muskulöser Fuß",
      "Nervennetz und Nesselzellen",
      "Wirbelsäule und Kiemen",
    ],
    correctIndex: 1,
    explanation:
      "Beide gehören zu den Nesseltieren und besitzen ein Nervennetz sowie charakteristische Nesselzellen.",
  },
  {
    question:
      "Welcher gemeinsame Grundbauplan verbindet Schnecken, Muscheln und Tintenfische?",
    options: [
      "Mantel und muskulöser Fuß",
      "Wassergefäßsystem und Stacheln",
      "Außenskelett und Gelenkbeine",
    ],
    correctIndex: 0,
    explanation:
      "Zum gemeinsamen Grundbauplan der Weichtiere gehören Mantel und muskulöser Fuß – auch wenn beide stark umgebildet sein können.",
  },
  {
    question:
      "Welche Neuerungen erklären den Erfolg der Gliederfüßer besonders gut?",
    options: [
      "Außenskelett und gegliederte Beine",
      "Milchdrüsen und Haare",
      "Nesselzellen und Nervennetz",
    ],
    correctIndex: 0,
    explanation:
      "Das schützende Außenskelett und bewegliche Gelenkbeine ermöglichten sehr unterschiedliche Lebensweisen.",
  },
  {
    question:
      "Fangfrage: Warum stehen Stachelhäuter den Wirbeltieren näher, als ihr Aussehen vermuten lässt?",
    options: [
      "Beide besitzen als Erwachsene fünf Arme.",
      "Beide besitzen ein Außenskelett.",
      "Beide gehören entwicklungsgeschichtlich zu den Neumündern.",
    ],
    correctIndex: 2,
    explanation:
      "Entscheidend ist die frühe Embryonalentwicklung: Stachelhäuter und Wirbeltiere gehören beide zu den Neumündern.",
  },
  {
    question:
      "Warum sind „Fische“ keine sauber abgeschlossene Abstammungsgruppe?",
    options: [
      "Weil alle Fische später zu Amphibien wurden.",
      "Weil aus frühen fischartigen Wirbeltieren auch Landwirbeltiere hervorgingen.",
      "Weil Fische keinen gemeinsamen Vorfahren besitzen.",
    ],
    correctIndex: 1,
    explanation:
      "Nimmt man alle Nachfahren früher fischartiger Wirbeltiere ernst, gehören auch die Landwirbeltiere in diesen Ast.",
  },
  {
    question:
      "Fangfrage: Ein frühes Wirbeltier besitzt bereits vier Gliedmaßen. Was folgt daraus noch nicht?",
    options: [
      "Sein Körper kann an Land abgestützt werden.",
      "Seine Fortpflanzung ist vom Wasser unabhängig.",
      "Es gehört zur Entwicklungslinie der Vierfüßer.",
    ],
    correctIndex: 1,
    explanation:
      "Vier Gliedmaßen erleichtern den Landgang, doch Eier und Larven früher Amphibien blieben weiterhin ans Wasser gebunden.",
  },
  {
    question:
      "Welche Neuerung machte Amnioten bei der Fortpflanzung unabhängiger vom Wasser?",
    options: [
      "Ein geschütztes Ei mit Embryonalhüllen",
      "Ein Außenskelett",
      "Ein Wassergefäßsystem",
    ],
    correctIndex: 0,
    explanation:
      "Embryonalhüllen und später eine schützende Eischale ermöglichten die Entwicklung fern von offenen Gewässern.",
  },
  {
    question:
      "Letzte Fangfrage: Wo sitzen die Vögel im vereinfachten Tierstammbaum?",
    options: [
      "Vögel stehen außerhalb des Tierstammbaums.",
      "Vögel bilden einen Ast neben allen Reptilien.",
      "Vögel sind lebende Nachfahren einer Dinosaurierlinie.",
    ],
    correctIndex: 2,
    explanation:
      "Vögel entstanden innerhalb der Dinosaurier und gehören damit mitten in den Reptilienast.",
  },
];

export function AnimalFamilyTree() {
  const [selectedId, setSelectedId] = useState("schwaemme");
  const [revealedTierCount, setRevealedTierCount] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(
    () => treeQuiz.map(() => null),
  );
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const selected = nodeById.get(selectedId) ?? nodes[0];
  const selectedTierIndex = tierIndexByNodeId.get(selectedId);
  const allTiersRevealed = revealedTierCount === tiers.length;
  const correctAnswerCount = quizAnswers.filter(
    (answer, index) => answer === treeQuiz[index].correctIndex,
  ).length;
  const quizWon = correctAnswerCount === treeQuiz.length;
  const activeQuiz = treeQuiz[quizQuestionIndex];
  const activeQuizAnswer = quizAnswers[quizQuestionIndex];
  const activeQuizIsCorrect = activeQuizAnswer === activeQuiz.correctIndex;

  const revealTier = (tierIndex: number) => {
    if (tierIndex > revealedTierCount) return;
    setRevealedTierCount((current) => Math.max(current, tierIndex + 1));
    const firstNodeId = tiers[tierIndex]?.ids[0];
    if (firstNodeId) setSelectedId(firstNodeId);
  };

  useEffect(() => {
    const selectFromHash = () => {
      const id = window.location.hash.slice(1);
      if (nodeById.has(id)) {
        setSelectedId(id);
        const tierIndex = tierIndexByNodeId.get(id);
        if (tierIndex !== undefined) {
          setRevealedTierCount((current) =>
            Math.max(current, tierIndex + 1),
          );
        }
        window.requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        });
      }
    };

    const selectFromStationLink = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = anchor?.getAttribute("href")?.slice(1) ?? "";
      if (nodeById.has(id)) {
        setSelectedId(id);
        const tierIndex = tierIndexByNodeId.get(id);
        if (tierIndex !== undefined) {
          setRevealedTierCount((current) =>
            Math.max(current, tierIndex + 1),
          );
        }
      }
    };

    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    document.addEventListener("click", selectFromStationLink);
    return () => {
      window.removeEventListener("hashchange", selectFromHash);
      document.removeEventListener("click", selectFromStationLink);
    };
  }, []);

  return (
    <div className="interaction-block animal-family-tree">
      <div className="family-tree-intro">
        <div>
          <h1>Der Stammbaum der Tiere</h1>
        </div>
        <button
          type="button"
          id="tierreich"
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
          <section
            className={`family-tree-tier ${
              tierIndex < revealedTierCount ? "is-revealed" : "is-locked"
            }`}
            key={tier.label}
          >
            <header>
              <span>{twoDigits(tierIndex + 1)}</span>
              <div>
                <strong>{tier.label}</strong>
                {"scientific" in tier && tier.scientific ? (
                  <em>{tier.scientific}</em>
                ) : null}
                <small>{tier.note}</small>
              </div>
            </header>
            {tierIndex < revealedTierCount ? (
              <div className="family-tree-tier-content">
                <div
                  className={`family-tree-nodes family-tree-nodes-${tier.ids.length}`}
                >
                  {tier.ids.map((id) => {
                    const node = nodeById.get(id);
                    if (!node) return null;

                    return (
                      <button
                        type="button"
                        id={id}
                        className={selectedId === id ? "is-selected" : ""}
                        onClick={() => setSelectedId(id)}
                        aria-pressed={selectedId === id}
                        key={id}
                      >
                        <span
                          className={`family-tree-node-symbol family-tree-node-symbol-${node.id}`}
                          aria-hidden="true"
                        >
                          {node.symbol}
                        </span>
                        <strong>{node.name}</strong>
                        {node.scientific ? (
                          <small>{node.scientific}</small>
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                {selectedTierIndex === tierIndex ? (
                  <article className="family-tree-detail" aria-live="polite">
                    <div
                      className={`family-tree-detail-symbol family-tree-node-symbol-${selected.id}`}
                      aria-hidden="true"
                    >
                      {selected.symbol}
                    </div>
                    <div>
                      <p>
                        {selected.scientific ??
                          "Gemeinsamer Ursprung aller Tiere"}
                      </p>
                      <h4>{selected.name}</h4>
                      <strong>{selected.innovation}</strong>
                      <span>{selected.description}</span>
                    </div>
                  </article>
                ) : null}
              </div>
            ) : (
              <button
                type="button"
                className="family-tree-reveal"
                disabled={tierIndex > revealedTierCount}
                onClick={() => revealTier(tierIndex)}
              >
                <span aria-hidden="true">
                  {tierIndex === revealedTierCount ? "＋" : "· · ·"}
                </span>
                <strong>
                  {tierIndex === revealedTierCount
                    ? "Diesen Ast aufdecken"
                    : "Noch verborgen"}
                </strong>
              </button>
            )}
          </section>
        ))}
      </div>

      {selectedId === "tierreich" ? (
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
      ) : null}

      {allTiersRevealed ? (
        <section className="family-tree-quiz" aria-labelledby="tree-quiz-title">
          <div className="family-tree-quiz-heading">
            <div>
              <p>Dein Abschlussquiz</p>
              <h3 id="tree-quiz-title">Neun Fragen bis zur Auszeichnung</h3>
            </div>
            <strong>
              Frage <span>{quizQuestionIndex + 1}/{treeQuiz.length}</span>
            </strong>
          </div>

          <div
            className="family-tree-quiz-progress"
            aria-label={`${correctAnswerCount} von ${treeQuiz.length} Fragen richtig beantwortet`}
          >
            {treeQuiz.map((item, index) => (
              <span
                className={`${
                  quizAnswers[index] === item.correctIndex ? "is-correct" : ""
                } ${index === quizQuestionIndex ? "is-active" : ""}`}
                key={item.question}
              />
            ))}
          </div>

          <fieldset>
            <legend>
              <span>{quizQuestionIndex + 1}</span>
              {activeQuiz.question}
            </legend>
            <div>
              {activeQuiz.options.map((option, optionIndex) => {
                const isSelected = activeQuizAnswer === optionIndex;
                const isCorrect =
                  isSelected && optionIndex === activeQuiz.correctIndex;
                const isWrong =
                  isSelected && optionIndex !== activeQuiz.correctIndex;

                return (
                  <button
                    type="button"
                    className={`${isCorrect ? "is-correct" : ""} ${
                      isWrong ? "is-wrong" : ""
                    }`}
                    aria-pressed={isSelected}
                    onClick={() =>
                      setQuizAnswers((current) =>
                        current.map((value, index) =>
                          index === quizQuestionIndex ? optionIndex : value,
                        ),
                      )
                    }
                    key={option}
                  >
                    <span aria-hidden="true">
                      {isCorrect ? "✓" : isWrong ? "×" : optionIndex + 1}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
            {activeQuizAnswer !== null ? (
              <p className={activeQuizIsCorrect ? "is-correct" : "is-wrong"}>
                <strong>
                  {activeQuizIsCorrect
                    ? "Richtig."
                    : "Noch nicht – schau noch einmal genau hin."}
                </strong>
                {activeQuizIsCorrect ? (
                  <span>{activeQuiz.explanation}</span>
                ) : null}
              </p>
            ) : null}
          </fieldset>

          {activeQuizIsCorrect && !quizWon ? (
            <button
              type="button"
              className="family-tree-quiz-next"
              onClick={() =>
                setQuizQuestionIndex((current) =>
                  Math.min(current + 1, treeQuiz.length - 1),
                )
              }
            >
              Nächste Frage <span aria-hidden="true">→</span>
            </button>
          ) : null}

          {quizWon ? (
            <div className="family-tree-reward" role="status">
              <div className="family-tree-fireworks" aria-hidden="true">
                {Array.from({ length: 18 }, (_, index) => (
                  <i key={index} />
                ))}
              </div>
              <span aria-hidden="true">★</span>
              <div>
                <p>Taraaa! Auszeichnung freigeschaltet</p>
                <strong>Stammbaum-Entdecker</strong>
                <small>
                  Du hast alle vier Äste geöffnet und neun anspruchsvolle Fragen
                  richtig beantwortet.
                </small>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

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
        <i className="external-link-icon" aria-hidden="true" />
      </a>
    </div>
  );
}

function twoDigits(value: number) {
  return String(value).padStart(2, "0");
}
