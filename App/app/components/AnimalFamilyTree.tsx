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
const tierIndexByNodeId = new Map(
  tiers.flatMap((tier, tierIndex) =>
    tier.ids.map((id) => [id, tierIndex] as const),
  ),
);

const treeQuiz = [
  {
    question: "Welche Tiergruppe besitzt die namensgebenden Nesselzellen?",
    options: ["Schwämme", "Nesseltiere", "Weichtiere"],
    correctIndex: 1,
  },
  {
    question:
      "Welche Neuerung machte Amnioten bei der Fortpflanzung unabhängiger vom Wasser?",
    options: [
      "Ein geschütztes Ei mit Embryonalhüllen",
      "Ein Außenskelett",
      "Kiemen und Flossen",
    ],
    correctIndex: 0,
  },
  {
    question: "Welche Aussage über Vögel ist richtig?",
    options: [
      "Vögel stehen außerhalb des Tierstammbaums.",
      "Vögel bilden einen Ast neben allen Reptilien.",
      "Vögel sind lebende Nachfahren einer Dinosaurierlinie.",
    ],
    correctIndex: 2,
  },
];

export function AnimalFamilyTree() {
  const [selectedId, setSelectedId] = useState("tierreich");
  const [revealedTierCount, setRevealedTierCount] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(
    () => treeQuiz.map(() => null),
  );
  const selected = nodeById.get(selectedId) ?? nodes[0];
  const allTiersRevealed = revealedTierCount === tiers.length;
  const correctAnswerCount = quizAnswers.filter(
    (answer, index) => answer === treeQuiz[index].correctIndex,
  ).length;
  const quizComplete = quizAnswers.every((answer) => answer !== null);
  const quizWon = quizComplete && correctAnswerCount === treeQuiz.length;

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
      <section
        className={`family-tree-quest ${
          allTiersRevealed ? "is-complete" : ""
        }`}
        aria-labelledby="family-tree-quest-title"
      >
        <div className="family-tree-quest-heading">
          <div>
            <p>Entdeckungsaufgabe</p>
            <h2 id="family-tree-quest-title">
              {allTiersRevealed
                ? "Alle vier Äste sind sichtbar"
                : "Öffne den Stammbaum Ast für Ast"}
            </h2>
          </div>
          <strong aria-label={`${revealedTierCount} von 4 Ästen entdeckt`}>
            {revealedTierCount}<span>/4</span>
          </strong>
        </div>

        <div
          className="family-tree-quest-progress"
          aria-label="Fortschritt der Entdeckungsaufgabe"
        >
          {tiers.map((tier, tierIndex) => (
            <span
              className={tierIndex < revealedTierCount ? "is-found" : ""}
              key={tier.label}
            >
              <i aria-hidden="true">
                {tierIndex < revealedTierCount ? "✓" : tierIndex + 1}
              </i>
              {tier.label}
            </span>
          ))}
        </div>

        {revealedTierCount === 0 ? (
          <button
            type="button"
            className="family-tree-quest-start"
            onClick={() => revealTier(0)}
          >
            Entdeckungsreise starten <span aria-hidden="true">→</span>
          </button>
        ) : (
          <p className="family-tree-quest-hint">
            {allTiersRevealed
              ? "Sehr gut. Jetzt wartet unter dem Stammbaum das Abschlussquiz."
              : "Tippe die Tiergruppen an und öffne danach den nächsten Ast."}
          </p>
        )}
      </section>

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
                <small>{tier.note}</small>
              </div>
            </header>
            {tierIndex < revealedTierCount ? (
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
                      <span aria-hidden="true">{node.symbol}</span>
                      <strong>{node.name}</strong>
                      {node.scientific ? <small>{node.scientific}</small> : null}
                    </button>
                  );
                })}
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

      {revealedTierCount > 0 ? (
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
              <h3 id="tree-quiz-title">Drei Fragen bis zur Auszeichnung</h3>
            </div>
            <strong>
              {correctAnswerCount}<span>/3 richtig</span>
            </strong>
          </div>

          <div className="family-tree-quiz-questions">
            {treeQuiz.map((item, questionIndex) => {
              const answer = quizAnswers[questionIndex];

              return (
                <fieldset key={item.question}>
                  <legend>
                    <span>{questionIndex + 1}</span>
                    {item.question}
                  </legend>
                  <div>
                    {item.options.map((option, optionIndex) => {
                      const isSelected = answer === optionIndex;
                      const isCorrect =
                        isSelected && optionIndex === item.correctIndex;
                      const isWrong =
                        isSelected && optionIndex !== item.correctIndex;

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
                                index === questionIndex ? optionIndex : value,
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
                  {answer !== null ? (
                    <p
                      className={
                        answer === item.correctIndex
                          ? "is-correct"
                          : "is-wrong"
                      }
                    >
                      {answer === item.correctIndex
                        ? "Richtig!"
                        : "Noch nicht – probiere eine andere Antwort."}
                    </p>
                  ) : null}
                </fieldset>
              );
            })}
          </div>

          {quizWon ? (
            <div className="family-tree-reward" role="status">
              <span aria-hidden="true">★</span>
              <div>
                <p>Auszeichnung freigeschaltet</p>
                <strong>Stammbaum-Entdecker</strong>
                <small>
                  Du hast alle vier Äste geöffnet und das Abschlussquiz gelöst.
                </small>
              </div>
            </div>
          ) : quizComplete ? (
            <p className="family-tree-quiz-again">
              {correctAnswerCount} von 3 richtig – korrigiere noch die markierte
              Antwort.
            </p>
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
        <i aria-hidden="true">↗</i>
      </a>
    </div>
  );
}

function twoDigits(value: number) {
  return String(value).padStart(2, "0");
}
