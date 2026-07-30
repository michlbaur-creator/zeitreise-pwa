const landSteps = [
  {
    number: "01",
    title: "Frühe Wirbeltiere",
    symbol: "◇",
    text: "Ein Schädel und ein inneres Skelett geben Halt. Die ältesten Vertreter besitzen noch keine Kiefer – aber der Grundbauplan der Wirbeltiere ist da.",
  },
  {
    number: "02",
    title: "Kiefer & paarige Flossen",
    symbol: "≋",
    text: "Mit Kiefern wird das Fressen vielseitiger. Paarige Flossen verbessern Steuerung und Antrieb. Im Meer beginnt eine große Erfolgsgeschichte.",
  },
  {
    number: "03",
    title: "Fleischflosser",
    symbol: "◒",
    text: "In ihren kräftigen Flossen liegen Knochen, die späteren Arm- und Beinknochen entsprechen. Noch sind es Flossen – keine Füße.",
  },
  {
    number: "04",
    title: "Tiktaalik",
    symbol: "↗",
    text: "Vor etwa 375 Millionen Jahren vereint Tiktaalik Fischmerkmale mit beweglichem Hals, stabilen Rippen und kräftigen Flossenknochen. Ideal fürs Flachwasser.",
  },
  {
    number: "05",
    title: "Frühe Landwirbeltiere",
    symbol: "✦",
    text: "Vier Gliedmaßen mit Zehen tragen den Körper. Die Fortpflanzung bleibt zunächst ans Wasser gebunden – hier setzt unsere Schulroute zu den Amphibien an.",
  },
];

const seaReturners = [
  {
    title: "Ichthyosaurier",
    group: "Meeresreptilien",
    symbol: "◇",
    text: "Ihre Vorfahren lebten an Land. Im Meer entsteht erneut eine stromlinienförmige Gestalt mit Flossen – trotzdem bleiben sie luftatmende Reptilien.",
  },
  {
    title: "Meeresschildkröten",
    group: "Reptilien",
    symbol: "⬡",
    text: "Vorderbeine werden zu kräftigen Paddeln. Zum Eierlegen müssen die Weibchen jedoch weiterhin an Land – ein sichtbares Erbe ihrer Abstammung.",
  },
  {
    title: "Wale",
    group: "Säugetiere",
    symbol: "●",
    text: "Vor rund 50 Millionen Jahren beginnt ihr Weg aus vierbeinigen Landsäugern zurück ins Wasser. Sie atmen Luft und säugen ihre Jungen.",
  },
];

export function AnimalEvolutionFocus() {
  return (
    <div className="animal-evolution-focus">
      <section className="evolution-focus-section" id="fisch-landgang">
        <header className="evolution-focus-header">
          <p>
            <span>Vertiefung 1</span>
            <i>Der Weg an Land</i>
          </p>
          <div>
            <h2>Von Flossen zu vier Gliedmaßen</h2>
            <p>
              Kein Fisch fasste plötzlich den Plan: „Heute erfinde ich
              Beine.“ Der Landgang bestand aus vielen kleinen Veränderungen
              über sehr lange Zeit.
            </p>
          </div>
        </header>

        <div className="evolution-step-path" aria-label="Vom Fisch zum Landwirbeltier">
          {landSteps.map((step) => (
            <article key={step.number}>
              <p>
                <span>{step.number}</span>
                <i aria-hidden="true">{step.symbol}</i>
              </p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <aside className="evolution-safety-note">
          <span aria-hidden="true">⌁</span>
          <p>
            <strong>Kein gerader Marsch und kein „fehlendes Glied“</strong>
            Tiktaalik ist ein naher Verwandter früher Landwirbeltiere, nicht
            zwingend ihr direkter Vorfahr. Moderne Fische und Amphibien sind
            heutige Enden verschiedener Äste.
          </p>
        </aside>
      </section>

      <section className="evolution-focus-section sea-return-section" id="rueckkehr-ins-meer">
        <header className="evolution-focus-header">
          <p>
            <span>Vertiefung 2</span>
            <i>Der Weg zurück</i>
          </p>
          <div>
            <h2>Das Meer wird erneut erobert</h2>
            <p>
              Kaum hatten Wirbeltiere das Landleben gemeistert, probierten
              verschiedene Zweige unabhängig voneinander den Rückweg. Das
              Ergebnis sieht manchmal fischähnlich aus – ist aber nicht Fisch.
            </p>
          </div>
        </header>

        <div className="sea-return-grid">
          {seaReturners.map((returner) => (
            <article key={returner.title}>
              <div aria-hidden="true">{returner.symbol}</div>
              <p>{returner.group}</p>
              <h3>{returner.title}</h3>
              <p>{returner.text}</p>
            </article>
          ))}
        </div>

        <div className="convergence-card">
          <div>
            <p className="eyebrow">Gleiche Aufgabe, ähnliche Lösung</p>
            <h3>Das nennt man Konvergenz</h3>
            <p>
              Wasser belohnt eine glatte Körperform und paddelartige
              Gliedmaßen. Deshalb können nicht nahe verwandte Tiere einander
              verblüffend ähnlich sehen.
            </p>
          </div>
          <ul>
            <li>
              <span aria-hidden="true">➝</span>
              <strong>Stromlinienform</strong>
              <small>weniger Widerstand</small>
            </li>
            <li>
              <span aria-hidden="true">◖</span>
              <strong>Flossenartige Gliedmaßen</strong>
              <small>steuern und antreiben</small>
            </li>
            <li>
              <span aria-hidden="true">○</span>
              <strong>Luftatmung bleibt</strong>
              <small>regelmäßig auftauchen</small>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
