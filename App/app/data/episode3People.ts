export type EpisodeThreePerson = {
  id: string;
  initials: string;
  name: string;
  years: string;
  text: string;
};

export const episodeThreePeopleByScene: Partial<
  Record<number, EpisodeThreePerson[]>
> = {
  18: [
    {
      id: "cai-lun",
      initials: "CL",
      name: "Cai Lun",
      years: "um 50–121",
      text: "Papier gab es in China schon vor Cai Lun. Um 105 verbesserte und beschrieb er die Herstellung so erfolgreich, dass sein Name bis heute damit verbunden ist.",
    },
    {
      id: "al-chwarizmi",
      initials: "AC",
      name: "Al-Chwarizmi",
      years: "um 780–850",
      text: "Seine Rechenverfahren und die indischen Ziffern verbreiteten sich weit. Von seinem Namen stammt sogar unser Wort „Algorithmus“.",
    },
    {
      id: "johannes-gutenberg",
      initials: "JG",
      name: "Johannes Gutenberg",
      years: "um 1400–1468",
      text: "Drucken mit beweglichen Lettern gab es in Ostasien schon früher. Gutenberg entwickelte in Europa ein leistungsfähiges System aus Metalllettern, Presse und Tinte – Bücher wurden zur Massenware.",
    },
  ],
  20: [
    {
      id: "christoph-kolumbus",
      initials: "CK",
      name: "Christoph Kolumbus",
      years: "1451–1506",
      text: "1492 erreichte Kolumbus im Auftrag Spaniens die Karibik. Seine Fahrten verbanden zwei Welten – und öffneten zugleich den Weg für Eroberung, Ausbeutung und Gewalt.",
    },
  ],
  22: [
    {
      id: "james-watt",
      initials: "JW",
      name: "James Watt",
      years: "1736–1819",
      text: "Watt erfand die Dampfmaschine nicht, machte sie aber deutlich leistungsfähiger. Damit wurde sie zum Motor von Bergbau, Fabriken und Industrialisierung.",
    },
  ],
  23: [
    {
      id: "george-stephenson",
      initials: "GS",
      name: "George Stephenson",
      years: "1781–1848",
      text: "Stephenson baute erfolgreiche Dampflokomotiven und half, die Eisenbahn alltagstauglich zu machen. Das Schienennetz war allerdings die Arbeit vieler Menschen.",
    },
  ],
  24: [
    {
      id: "michael-faraday",
      initials: "MF",
      name: "Michael Faraday",
      years: "1791–1867",
      text: "Faraday zeigte, wie Magnetismus elektrischen Strom erzeugen kann. Ohne diese Entdeckung sähe es beim Lichtschalter ziemlich finster aus.",
    },
    {
      id: "werner-von-siemens",
      initials: "WS",
      name: "Werner von Siemens",
      years: "1816–1892",
      text: "Werner von Siemens machte Generatoren praktisch nutzbar. Aus einem Experiment wurde eine neue Industrie.",
    },
  ],
  25: [
    {
      id: "haber-bosch",
      initials: "HB",
      name: "Fritz Haber & Carl Bosch",
      years: "1868–1934 · 1874–1940",
      text: "Haber entwickelte das Verfahren, Bosch und sein Team machten es fabrikreif. So entstand Kunstdünger in großen Mengen – aber auch ein Ausgangsstoff für Sprengstoff.",
    },
  ],
  26: [
    {
      id: "daimler-maybach",
      initials: "DM",
      name: "Gottlieb Daimler & Wilhelm Maybach",
      years: "1834–1900 · 1846–1929",
      text: "Daimler und Maybach entwickelten leichte, schnell laufende Benzinmotoren. Damit konnte der Motor vom Werkstatttisch in Fahrzeuge umziehen.",
    },
    {
      id: "carl-bertha-benz",
      initials: "BB",
      name: "Carl & Bertha Benz",
      years: "1844–1929 · 1849–1944",
      text: "Carl Benz baute ein frühes Automobil, Bertha bewies mit ihrer Fernfahrt, dass es tatsächlich alltagstauglich war. Eine ziemlich überzeugende Probefahrt.",
    },
  ],
};
