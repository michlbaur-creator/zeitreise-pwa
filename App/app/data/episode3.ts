export type EpisodeThreeScene = {
  id: number;
  title: string;
  timeLabel: string;
  speakerText: readonly string[];
  discoveries: readonly {
    title: string;
    text: string;
  }[];
  quiz: readonly {
    question: string;
    answers: readonly string[];
    correctAnswer: number;
  }[];
  imageStatus: "ready" | "draft" | "open";
};

export const episodeThreeSceneVideos = {
  1: "/assets/episode3/scene01/bewegung-zeitsprung-veo-v1.mp4",
  2: "/assets/episode3/scene02/bewegung-leben-ohne-acker-veo-v1.mp4",
  3: "/assets/episode3/scene03/bewegung-goebekli-tepe-veo-v1.mp4",
  4: "/assets/episode3/scene04/bewegung-jericho-veo-v1.mp4",
  6: "/assets/episode3/scene06/bewegung-ziegenherde-veo-v1.mp4",
  8: "/assets/episode3/scene08/bewegung-catalhoeyuek-veo-v1.mp4",
} as const;

export const episodeThreeSceneAudio = {
  1: "/assets/episode3/audio/sprecher-und-veo-szene-01-v1.m4a",
  2: "/assets/episode3/audio/sprecher-und-veo-szene-02-v1.m4a",
  3: "/assets/episode3/audio/sprecher-und-veo-szene-03-v1.m4a",
  4: "/assets/episode3/audio/sprecher-und-veo-szene-04-v1.m4a",
  5: "/assets/episode3/audio/sprecher-szene-05-v1.m4a",
  6: "/assets/episode3/audio/sprecher-und-veo-szene-06-v1.m4a",
  7: "/assets/episode3/audio/sprecher-szene-07-v1.m4a",
  8: "/assets/episode3/audio/sprecher-und-veo-szene-08-v1.m4a",
  9: "/assets/episode3/audio/sprecher-szene-09-v1.m4a",
  10: "/assets/episode3/audio/vorschau-szene-10-v1.m4a",
  11: "/assets/episode3/audio/vorschau-szene-12-v1.m4a",
  12: "/assets/episode3/audio/vorschau-szene-13-v1.m4a",
  13: "/assets/episode3/audio/vorschau-szene-14-v1.m4a",
  14: "/assets/episode3/audio/vorschau-szene-11-v1.m4a",
  15: "/assets/episode3/audio/vorschau-szene-15-v1.m4a",
} as const;

export const episodeThreeSceneDurations = {
  1: 58,
  2: 62,
  3: 68,
  4: 72,
  5: 53,
  6: 51,
  7: 58,
  8: 51,
  9: 82,
  10: 37,
  11: 40,
  12: 40,
  13: 40,
  14: 38,
  15: 42,
} as const;

export const episodeThreeSceneImages = {
  1: "/assets/episode3/scene01/hintergrund-zeitfelsen-heute-v1.png",
  2: "/assets/episode3/scene02/hintergrund-leben-ohne-acker-entwurf-v1.png",
  3: "/assets/episode3/scene03/hintergrund-goebekli-tepe-entwurf-v1.png",
  4: "/assets/episode3/scene04/hintergrund-jericho-entwurf-v1.png",
  5: "/assets/episode3/scene05/hintergrund-aehre-veraendert-sich-entwurf-v1.png",
  6: "/assets/episode3/scene06/hintergrund-aus-jagd-wird-herde-entwurf-v1.png",
  7: "/assets/episode3/scene07/hintergrund-idee-entsteht-wieder-entwurf-v1.png",
  8: "/assets/episode3/scene08/hintergrund-catalhoeyuek-entwurf-v1.png",
  9: "/assets/episode3/scene09/hintergrund-dorf-waechst-v1.png",
  10: "/assets/episode3/scene10/hintergrund-dorfvorrat-v1.png",
  11: "/assets/episode3/scene12/hintergrund-nahrungsanlieferung-v1.png",
  13: "/assets/episode3/scene14/hintergrund-rationsverwaltung-v1.png",
  14: "/assets/episode3/scene11/hintergrund-uruk-kanalstadt-v1.png",
  15: "/assets/episode3/scene15/hintergrund-gemeinschaftsarbeit-v1.png",
} as const;

export const episodeThreeSceneImageSequences = {
  9: [
    "/assets/episode3/scene09/hintergrund-dorf-waechst-v1.png",
    "/assets/episode3/scene09/hintergrund-dorf-belastungen-v1.png",
  ],
  10: [
    "/assets/episode3/scene10/hintergrund-dorfvorrat-v1.png",
    "/assets/episode3/scene10/hintergrund-stadtspeicher-v1.png",
  ],
  11: [
    "/assets/episode3/scene12/hintergrund-nahrungsanlieferung-v1.png",
    "/assets/episode3/scene12/hintergrund-spezialisierte-werkstaetten-v1.png",
  ],
  15: [
    "/assets/episode3/scene15/hintergrund-gemeinschaftsarbeit-v1.png",
    "/assets/episode3/scene15/hintergrund-macht-buendelt-sich-v1.png",
  ],
} as const;

export const episodeThreeGraphicScenes = [12] as const;
export const episodeThreeMotionPreviewScenes = [13, 14] as const;

const episodeThreeSpeakerTexts = {
  1: [
    "Gerade waren wir noch in der Gegenwart. Eine Menschheit – Milliarden Menschen, überall auf der Erde.",
    "Doch wie wurde aus kleinen, verstreuten Gruppen eine Spezies, die ganze Landschaften verändert?",
    "Dafür müssen wir noch einmal zurück. Nicht Millionen Jahre – diesmal genügen ungefähr vierzehntausend.",
    "Die letzte Eiszeit geht zu Ende. Wälder breiten sich aus, Flüsse verändern ihren Lauf, neue Lebensräume entstehen.",
    "Keine Städte, keine Felder, keine Straßen – und kein WLAN. Letzteres war vermutlich das kleinste Problem.",
    "Die Menschen, denen wir jetzt begegnen, unterscheiden sich körperlich kaum von uns. Aber sie leben in einer völlig anderen Welt.",
  ],
  2: [
    "Diese Menschen bauen kein Getreide an und halten keine Viehherden. Viele Gruppen wechseln im Laufe des Jahres ihren Aufenthaltsort.",
    "Ziellos umherirren müssen sie deshalb nicht. Sie kennen ihre Landschaft vermutlich besser, als wir heute den nächsten Supermarkt.",
    "Sie wissen, wann Früchte reifen, wo essbare Wurzeln wachsen und zu welcher Jahreszeit Tiere vorbeiziehen. Sie fischen, sammeln, jagen und verarbeiten Pflanzen, die wir wahrscheinlich nicht einmal als essbar erkennen würden.",
    "Und sie sind nicht allein: Hunde begleiten Menschen bereits lange vor der Landwirtschaft.",
    "Die Natur ist ihr Vorratsschrank – allerdings ohne Regale, Öffnungszeiten und Rückgaberecht.",
  ],
  3: [
    "Vor ungefähr elftausendfünfhundert Jahren geschieht im heutigen Südosten der Türkei etwas Erstaunliches.",
    "Menschen richten gewaltige Pfeiler aus Kalkstein auf. Manche wiegen mehrere Tonnen und sind mit Bildern von Füchsen, Schlangen, Wildschweinen und Vögeln verziert.",
    "Kräne gibt es nicht. Metallwerkzeuge auch nicht. Und selbst das Rad lässt noch auf sich warten.",
    "Warum die Menschen diese Anlagen errichten, wissen wir nicht genau. Vielleicht treffen sich hier verschiedene Gruppen zu Ritualen, Festen oder gemeinsamen Arbeiten.",
    "Sicher ist nur: Dafür müssen viele Menschen planen und zusammenarbeiten.",
    "Steinzeitlich bedeutet eben, dass die Werkzeuge aus Stein bestehen – nicht die Köpfe.",
  ],
  4: [
    "Im Jordantal spendet eine kräftige Quelle das ganze Jahr über Wasser. Ein guter Platz, um wiederzukommen.",
    "Aus einem häufig besuchten Lager wird mit der Zeit eine dauerhafte Siedlung. Menschen errichten Häuser, legen Vorräte an und bauen schließlich sogar eine Mauer und einen mächtigen Turm.",
    "Ob die Mauer Feinde abhalten oder vor Hochwasser schützen soll, ist bis heute nicht sicher. Vielleicht erfüllt sie auch mehrere Aufgaben.",
    "Entscheidend ist etwas anderes: Die Menschen verlassen diesen Ort nicht mehr nach jeder Jahreszeit.",
    "Wer dauerhaft bleibt, baut stabiler, sammelt mehr Besitz – und bekommt feste Nachbarn.",
    "Damit beginnt eine völlig neue Form des Zusammenlebens. Einschließlich der vermutlich ebenso neuen Frage, wer schon wieder den Eingang zugestellt hat.",
  ],
  5: [
    "Wildgetreide hat aus menschlicher Sicht eine ausgesprochen lästige Eigenschaft: Sobald die Körner reif sind, fallen sie zu Boden.",
    "Für die Pflanze ist das ausgezeichnet. Für jemanden, der die Körner einsammeln möchte, eher weniger.",
    "Manche Ähren halten ihre Körner jedoch länger fest. Genau diese lassen sich leichter ernten – und ihre Samen landen häufiger in der Nähe der Siedlungen oder werden gezielt ausgesät.",
    "Über viele Generationen verändern sich dadurch die Pflanzen. Die Ähren werden größer und verlieren ihre Körner nicht mehr so leicht.",
    "Niemand hat an einem bestimmten Morgen die Landwirtschaft erfunden.",
    "Aus Beobachten, Sammeln, Ausprobieren und Wiederholen wird ganz allmählich Ackerbau.",
  ],
  6: [
    "Auch die ersten Nutztiere werden nicht von einem Tag auf den anderen zu Haustieren.",
    "Menschen beginnen, wilde Schafe und Ziegen zu beobachten, zusammenzuhalten und vor Raubtieren zu schützen. Sie entscheiden zunehmend, welche Tiere geschlachtet werden und welche sich fortpflanzen.",
    "Dadurch verändern sich über viele Generationen Körperbau und Verhalten der Tiere. Aus gejagten Wildtieren werden schließlich Herden.",
    "Das bringt Fleisch, Milch, Felle und später auch Arbeitskraft. Es bedeutet aber ebenso: Tiere müssen gefüttert, bewacht und davon überzeugt werden, ungefähr dort zu bleiben, wo man sie haben möchte.",
    "Bei Ziegen ist schon der letzte Punkt eine beachtliche Kulturleistung.",
  ],
  7: [
    "Ackerbau und Tierhaltung entstehen nicht nur an einem einzigen Ort.",
    "In Vorderasien werden unter anderem Weizen und Gerste angebaut. In Ostasien Reis und Hirse. In Afrika Sorghum und verschiedene Hirsearten. In Mittelamerika verändert sich aus einem unscheinbaren Wildgras allmählich der Mais. Im Andenraum werden Kartoffeln und Quinoa kultiviert.",
    "Diese Entwicklungen beginnen zu unterschiedlichen Zeiten und verlaufen keineswegs überall gleich.",
    "Landwirtschaft ist also kein fertiges Erfindungspaket, das von einem genialen Urbauern verschickt wird.",
    "Menschen in verschiedenen Teilen der Erde beobachten Pflanzen und Tiere – und kommen unabhängig voneinander auf ähnliche Ideen.",
    "Offenbar lag die Landwirtschaft gewissermaßen mehrfach in der Luft. Der passende Ackerboden lag praktischerweise darunter.",
  ],
  8: [
    "In Çatalhöyük stehen die Häuser so dicht beieinander, dass zwischen ihnen kaum Platz für Straßen bleibt.",
    "Die Menschen bewegen sich über die Flachdächer und steigen durch Öffnungen in ihre Häuser. Unten wird gekocht, gearbeitet und geschlafen. Wände sind bemalt, Vorräte werden gelagert und Handwerker stellen Werkzeuge, Gefäße und Schmuck her.",
    "Mehrere Tausend Menschen können hier zeitweise gleichzeitig gelebt haben. Çatalhöyük ist noch keine Stadt im späteren Sinn – aber auch längst kein kleines Dorf mehr.",
    "Das Zusammenleben wird dichter, arbeitsteiliger und komplizierter.",
    "Der Berufsverkehr verläuft über die Dächer. Wenigstens ist die Aussicht gut und die Abgasbelastung überschaubar.",
  ],
  9: [
    "Landwirtschaft kann auf derselben Fläche deutlich mehr Menschen ernähren. Dörfer wachsen, Vorräte werden größer und nicht mehr jeder muss den ganzen Tag Nahrung suchen.",
    "Doch das neue Leben hat Nebenwirkungen.",
    "Die Arbeit auf den Feldern ist anstrengend. Eine Ernährung mit wenigen Hauptpflanzen kann einseitig werden. Wo viele Menschen und Tiere dicht zusammenleben, verbreiten sich Krankheitserreger leichter.",
    "Und sobald Vorräte gelagert werden, entsteht eine neue Frage: Wem gehören sie eigentlich – und wer besitzt den Schlüssel?",
    "Unterschiede zwischen arm und reich werden sichtbarer. Wälder werden gerodet, Böden bearbeitet und Wasserläufe verändert.",
    "Aus kleinen Siedlungen entstehen schließlich größere Zentren.",
    "Dort warten bereits die nächsten Erfindungen: Städte, Schrift, Herrscher und Steuern.",
    "Irgendjemand musste ja auf die Idee kommen.",
  ],
  10: [
    "Teil 1 endete vor einem großen Vorratsspeicher. Sieht erst einmal harmlos aus: jede Menge Getreide, sauber gestapelt. Aber dann kommt die entscheidende Frage: Wer zählt eigentlich das ganze Zeug?",
    "In einem kleinen Dorf weiß man vielleicht noch, wer drei Körbe Gerste gebracht hat. In einer wachsenden Stadt kommen ständig neue Lieferungen an. Ein Teil wird ausgegeben, ein Teil bleibt als Saatgut, und der Rest soll durch den Winter reichen.",
    "Wenn da jeder nur sagt: Wird schon stimmen, wird es schnell spannend.",
    "Also braucht man Maße, Regeln und Menschen, die den Überblick behalten. Aus Vorräten entsteht Verwaltung. Und plötzlich hat jemand einen ziemlich verantwortungsvollen Job – mit sehr vielen Körben.",
  ],
  11: [
    "In einem Dorf stellen viele Familien einen großen Teil von dem selbst her, was sie brauchen. In einer Stadt wird das schwierig. Dafür sind es einfach zu viele Menschen und zu viele Aufgaben.",
    "Also teilen sie die Arbeit auf. Manche töpfern, andere weben Stoffe, bauen Häuser, bearbeiten Metall, steuern Boote oder kümmern sich um die Vorräte. Wer immer wieder dasselbe macht, sammelt Erfahrung und wird meistens ziemlich gut darin.",
    "Das hat allerdings einen Haken: Alle werden voneinander abhängig. Eine Weberin baut nicht nebenbei noch Gerste an. Und ein Töpfer kann seine Gefäße zwar bewundern – aufessen kann er sie nicht.",
    "Nahrung, Rohstoffe und fertige Waren müssen deshalb zuverlässig verteilt werden. Dafür reicht Zurufen bald nicht mehr aus.",
  ],
  12: [
    "Und genau hier kommen kleine Tafeln aus feuchtem Ton ins Spiel. Um etwa 3.300 vor Christus beginnen Menschen im südlichen Mesopotamien, Zahlen und einfache Zeichen hineinzudrücken.",
    "Darauf stehen zunächst keine Heldengeschichten und auch keine Liebesbriefe. Es geht um Getreide, Tiere, Gefäße und Rationen. Wer etwas liefert oder bekommt, hinterlässt nun eine Spur, die länger hält als das Gedächtnis des Verwalters.",
    "Im Laufe der Jahrhunderte werden die Zeichen abstrakter. Ein Griffel drückt keilförmige Spuren in den Ton. Später lassen sich damit auch Namen, Sprache, Verträge und Geschichten festhalten.",
    "Die Schrift beginnt also nicht mit einem Bestseller. Eher mit einer ziemlich gründlichen Bestandsaufnahme.",
  ],
  13: [
    "Eine Liste wirkt erst einmal nicht besonders mächtig. Kein Schwert, keine Krone – nur ein Stück Ton. Trotzdem kann sie darüber entscheiden, wer Getreide bekommt und wer noch etwas liefern muss.",
    "Ein Schreiber hält die Menge fest. Ein Siegel zeigt, wer den Vorgang bestätigt. Auf einer weiteren Tafel steht vielleicht, welche Rationen Arbeiter erhalten.",
    "Das Entscheidende ist: Die Aufzeichnung kann noch geprüft werden, wenn längst nicht mehr alle Beteiligten im Raum sind. Da hilft dann auch kein: Aber ich hatte doch fünf Körbe abgeliefert.",
    "Wer Maße, Speicher und Listen kontrolliert, bekommt deshalb Einfluss. Die Tontafel wird zum Gedächtnis der Verwaltung – und dieses Gedächtnis hat erstaunlich wenig Humor.",
  ],
  14: [
    "Wir sind um 3.200 vor Christus im Süden Mesopotamiens, im Gebiet des heutigen Irak. Mesopotamien bedeutet Land zwischen den Flüssen – gemeint sind Euphrat und Tigris.",
    "Hier wächst Uruk, eine der größten bekannten Städte ihrer Zeit. Und Uruk ist nicht einfach nur ein Dorf mit sehr, sehr vielen Häusern.",
    "Kanäle bringen Wasser zu den Feldern und Waren in die Stadt. Bauern liefern Getreide, Boote transportieren Schilf und Holz, Werkstätten verarbeiten Rohstoffe. Dazwischen stehen große öffentliche und religiöse Bauten aus Lehmziegeln.",
    "Die Stadt braucht ihr Umland – und das Umland braucht Märkte und Handwerker. Uruk ist ein gewaltiges Netzwerk. Nur besteht dieses Netz hauptsächlich aus Wasserwegen, Schlamm und ziemlich vielen Körben.",
  ],
  15: [
    "Hier wird gearbeitet. Kanäle müssen gereinigt, Mauern gebaut und Vorräte geschützt werden. Die Stadt wird größer, und eine Frage wird immer wichtiger: Wer entscheidet denn jetzt eigentlich, wer was zu machen hat? Wer organisiert die ganze Arbeit?",
    "Wer hat das Sagen? Wer gibt die Anweisungen, und wer trägt die Ziegel?",
    "Große Haushalte, Tempel und Amtsträger beginnen, die Arbeit zu organisieren und zu verteilen. Nicht überall geschieht das gleich, und nicht sofort sitzt ein allmächtiger König auf dem Thron. Aber die ersten Chefs treten immer deutlicher hervor.",
    "Diese Herrscher lassen bauen, führen Kriege und präsentieren sich auch als Beschützer ihrer Stadt.",
    "Von nun an verändern Menschen nicht mehr nur Landschaften. Sie halten auch Besitz, Pflichten und Befehle schriftlich fest.",
  ],
} as const;

const episodeThreeDiscoveries = {
  1: [
    {
      title: "Das Holozän",
      text: "Vor rund 11.700 Jahren beginnt unsere heutige Warmzeit.",
    },
    {
      title: "Menschen wie wir",
      text: "Die damaligen Menschen gehören vollständig zu Homo sapiens und unterscheiden sich körperlich kaum von heutigen Menschen.",
    },
  ],
  2: [
    {
      title: "Saisonale Wege",
      text: "Viele Gruppen nutzten unterschiedliche Lagerplätze je nach Jahreszeit und Nahrungsangebot.",
    },
    {
      title: "Der Hund war schon da",
      text: "Hunde lebten bereits lange vor Ackerbau und Viehzucht mit Menschen zusammen.",
    },
  ],
  3: [
    {
      title: "T-förmige Pfeiler",
      text: "Die Pfeiler könnten stark vereinfachte menschliche Gestalten darstellen.",
    },
    {
      title: "Unbekannte Bedeutung",
      text: "Die Anlagen dienten vermutlich gemeinschaftlichen oder rituellen Zwecken. Ihre genaue Funktion kennen wir nicht.",
    },
  ],
  4: [
    {
      title: "Die Quelle",
      text: "Ganzjährig verfügbares Wasser war eine wichtige Voraussetzung für die dauerhafte Besiedlung.",
    },
    {
      title: "Mauer und Turm",
      text: "Ob die Anlage vor Menschen, Hochwasser oder mehreren Gefahren schützen sollte, ist nicht sicher.",
    },
  ],
  5: [
    {
      title: "Feste Ährenspindel",
      text: "Bei Kulturgetreide bleiben die reifen Körner länger an der Pflanze.",
    },
    {
      title: "Unbewusste Auswahl",
      text: "Menschen mussten die Genetik nicht verstehen. Wiederholtes Sammeln und Aussäen genügte.",
    },
  ],
  6: [
    {
      title: "Nicht sofort Haustiere",
      text: "Haltung, Zähmung und genetische Domestikation sind unterschiedliche Schritte.",
    },
    {
      title: "Auswahl verändert Tiere",
      text: "Menschen beeinflussten, welche Tiere sich fortpflanzten.",
    },
  ],
  7: [
    {
      title: "Mehrere Ursprungsregionen",
      text: "Landwirtschaft entstand unabhängig an verschiedenen Orten.",
    },
    {
      title: "Verschiedene Lösungen",
      text: "Menschen nutzten jeweils Pflanzen und Tiere ihrer eigenen Umwelt.",
    },
  ],
  8: [
    {
      title: "Eingang von oben",
      text: "Viele Häuser wurden vermutlich durch Öffnungen im Dach betreten.",
    },
    {
      title: "Leben mit den Verstorbenen",
      text: "Tote wurden teilweise unter den Fußböden der Häuser bestattet.",
    },
  ],
  9: [
    {
      title: "Mehr Menschen",
      text: "Landwirtschaft ermöglichte ein starkes Bevölkerungswachstum.",
    },
    {
      title: "Neue Belastungen",
      text: "Einseitigere Ernährung, schwere Arbeit und dichteres Zusammenleben erhöhten in vielen Populationen gesundheitliche Risiken.",
    },
  ],
  10: [
    {
      title: "Messen vor dem Schreiben",
      text: "Standardisierte Gefäße und Zahlzeichen halfen, Mengen vergleichbar und Lieferungen nachvollziehbar zu machen.",
    },
    {
      title: "Speicher bedeutet nicht König",
      text: "Ein großer Speicher belegt Organisation, aber nicht automatisch das Eigentum eines einzelnen Herrschers.",
    },
  ],
  11: [
    {
      title: "Arbeit gegen Rationen",
      text: "Städtische Arbeitskräfte konnten Getreide, Öl oder andere Güter als Versorgung für ihre Tätigkeit erhalten.",
    },
    {
      title: "Textilien als Großaufgabe",
      text: "Wollverarbeitung wurde zu einer wichtigen spezialisierten Produktion und benötigte zahlreiche Arbeitskräfte.",
    },
  ],
  12: [
    {
      title: "Proto-Keilschrift",
      text: "Die frühesten Tafeln aus Uruk verbinden Zahlzeichen mit vereinfachten Zeichen für Güter; viele Texte bleiben schwer eindeutig zu lesen.",
    },
    {
      title: "Nicht nur ein Ursprung",
      text: "Schriftsysteme entstanden in verschiedenen Weltregionen unabhängig voneinander. Uruk ist ein besonders frühes, gut belegtes Beispiel.",
    },
  ],
  13: [
    {
      title: "Rollsiegel",
      text: "Ein gravierter Steinzylinder hinterließ auf feuchtem Ton ein wiedererkennbares Bild – ähnlich einer Kennzeichnung oder Unterschrift.",
    },
    {
      title: "Was Listen nicht zeigen",
      text: "Verwaltungstexte überliefern besonders die Sicht der Einrichtungen, die Güter erfassten und verteilten.",
    },
  ],
  14: [
    {
      title: "Zwischen Euphrat und Tigris",
      text: "Mesopotamien lag im Gebiet von Euphrat und Tigris, größtenteils im heutigen Irak. Uruk befand sich im Süden dieser Region in einer von Flussarmen, Kanälen und Feuchtgebieten geprägten Landschaft.",
    },
    {
      title: "Stadt und Umland",
      text: "Die Stadt brauchte Nahrung und Rohstoffe aus ihrer Umgebung; das Umland nutzte Handwerk, Märkte und zentrale Einrichtungen.",
    },
  ],
  15: [
    {
      title: "Frühe Stadtstaaten",
      text: "Im frühen 3. Jahrtausend v. Chr. prägten mehrere eigenständige Stadtstaaten das südliche Mesopotamien.",
    },
    {
      title: "Macht wächst schrittweise",
      text: "Große Bauten beweisen Organisation. Wie Tempel, Haushalte, Versammlungen und Herrscher dabei zusammenwirkten, veränderte sich über lange Zeit.",
    },
  ],
} as const;

const episodeThreeQuizzes = {
  1: [
    {
      question: "Welche Aussage beschreibt den Ausgangspunkt von Episode 3 am besten?",
      answers: [
        "Homo sapiens entsteht erst am Ende der Eiszeit.",
        "Körperlich moderne Menschen leben bereits da, aber unter völlig anderen Bedingungen.",
        "Die Menschen unterscheiden sich körperlich stark von heutigen Menschen.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Warum reichen für diesen Zeitsprung ungefähr 14.000 Jahre statt Millionen?",
      answers: [
        "Weil es nun vor allem um Veränderungen der Lebensweise geht.",
        "Weil Klima und Landschaft in dieser Zeit unverändert bleiben.",
        "Weil Menschen erst seit 14.000 Jahren Werkzeuge benutzen.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Welche Entwicklung passt zum Ende der letzten Eiszeit?",
      answers: [
        "Wälder breiten sich aus und Flussläufe verändern sich.",
        "Alle Kontinente werden gleichzeitig vollständig eisfrei.",
        "Neue Lebensräume verschwinden zugunsten einer einzigen Landschaftsform.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Welche Schlussfolgerung wäre trotz fehlender Städte und Felder falsch?",
      answers: [
        "Die Lebensweise unterscheidet sich stark von unserer.",
        "Die Menschen müssen ihre Umwelt sehr genau kennen.",
        "Die Menschen sind weniger intelligent als wir.",
      ],
      correctAnswer: 2,
    },
  ],
  2: [
    {
      question: "Warum bedeutet ein jahreszeitlicher Ortswechsel nicht, ziellos umherzuirren?",
      answers: [
        "Die Gruppen folgen einem festen Straßennetz.",
        "Die Gruppen kennen Zeiten, Wege und Nahrungsangebote ihrer Landschaft.",
        "Die Gruppen wechseln nur dann den Ort, wenn Nahrung vollständig verschwunden ist.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Welche Fähigkeit machte eine vielfältige Ernährung ohne Ackerbau möglich?",
      answers: [
        "genaue Beobachtung und Verarbeitung vieler Pflanzen und Tiere",
        "die Spezialisierung auf wenige besonders ertragreiche Tierarten",
        "die dauerhafte Nutzung eines einzigen, besonders reichen Lagerplatzes",
      ],
      correctAnswer: 0,
    },
    {
      question: "Was zeigt der Hund in dieser Szene über die zeitliche Reihenfolge?",
      answers: [
        "Tierhaltung begann erst nach dem ersten Ackerbau.",
        "Menschen lebten schon vor der Landwirtschaft mit domestizierten Tieren zusammen.",
        "Hunde wurden gleichzeitig mit Schafen und Ziegen domestiziert.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Welche Aussage trifft die Lebensweise dieser Gruppen am genauesten?",
      answers: [
        "Sie waren ständig unterwegs und konnten keine Lagerplätze wiederverwenden.",
        "Sie nutzten ihre Umwelt planvoll, auch ohne Felder und dauerhafte Häuser.",
        "Sie lebten ausschließlich von der Jagd auf große Tiere.",
      ],
      correctAnswer: 1,
    },
  ],
  3: [
    {
      question: "Welche Leistung wird durch die tonnenschweren Pfeiler besonders deutlich?",
      answers: [
        "langfristige Planung und Zusammenarbeit vieler Menschen",
        "vor allem die außergewöhnliche Körperkraft einzelner Steinmetze",
        "eine spontane Bautätigkeit ohne langfristige Organisation",
      ],
      correctAnswer: 0,
    },
    {
      question: "Warum lässt sich die genaue Funktion von Göbekli Tepe nicht sicher angeben?",
      answers: [
        "Die Anlage ist nur aus modernen Erzählungen bekannt.",
        "Die Funde erlauben mehrere Deutungen, aber keine eindeutige Erklärung.",
        "Alle Pfeiler wurden vollständig zerstört.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Was widerlegt der Bau am überzeugendsten?",
      answers: [
        "Dass Menschen ohne Landwirtschaft niemals zusammenarbeiteten.",
        "Dass Kalkstein in der Region vorhanden war.",
        "Dass Bilder von Tieren eine Bedeutung haben konnten.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Welche Aussage trennt gesichertes Wissen und Vermutung korrekt?",
      answers: [
        "Die Pfeiler wurden gemeinsam errichtet; der genaue Zweck bleibt unklar.",
        "Die Anlage war sicher ein Tempel für eine bekannte Gottheit.",
        "Die Anlage war nachweislich der Sitz eines frühen Königreichs.",
      ],
      correctAnswer: 0,
    },
  ],
  4: [
    {
      question: "Welche natürliche Voraussetzung begünstigte die dauerhafte Besiedlung Jerichos?",
      answers: [
        "eine ganzjährig Wasser liefernde Quelle",
        "eine nur während der Regenzeit gefüllte Wasserstelle",
        "die Nähe zu wechselnden Wildherden ohne verlässliche Wasserquelle",
      ],
      correctAnswer: 0,
    },
    {
      question: "Welche Aussage über die Mauer geht über den Forschungsstand hinaus?",
      answers: [
        "Sie könnte vor Hochwasser geschützt haben.",
        "Sie diente mit Sicherheit ausschließlich der Abwehr von Feinden.",
        "Sie könnte mehrere Aufgaben erfüllt haben.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Welche Folge ergibt sich am unmittelbarsten daraus, dauerhaft zu bleiben?",
      answers: [
        "Stabilere Bauten, größere Vorräte und feste Nachbarschaften werden wichtiger.",
        "Besitz verliert jede Bedeutung, weil niemand mehr unterwegs ist.",
        "Jahreszeiten spielen für die Versorgung keine Rolle mehr.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Welche Entwicklungskette passt zur Szene?",
      answers: [
        "Quelle → wiederkehrendes Lager → dauerhafte Siedlung → aufwendigere Bauten",
        "wiederkehrendes Lager → Aufgabe des Ortes → Quelle → dauerhafte Siedlung",
        "dauerhafte Siedlung → Quelle → saisonales Lager → aufwendigere Bauten",
      ],
      correctAnswer: 0,
    },
  ],
  5: [
    {
      question: "Warum wurden Ähren mit länger haftenden Körnern häufiger weitervermehrt?",
      answers: [
        "Sie ließen sich leichter ernten und ihre Samen wurden häufiger gesammelt oder ausgesät.",
        "Ihre Körner fielen früher aus und waren dadurch gleichmäßig am Boden verteilt.",
        "Sie wuchsen nur weit entfernt von menschlich genutzten Lagerplätzen.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Warum kann man hier von unbewusster Auswahl sprechen?",
      answers: [
        "Menschen wählten bewusst bestimmte Gene aus, ohne Pflanzen auszusäen.",
        "Wiederholtes Sammeln und Aussäen genügte, ohne die Genetik zu kennen.",
        "Die Merkmale der Pflanzen veränderten sich ausschließlich durch das wärmere Klima.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Welche Aussage beschreibt den Beginn des Ackerbaus am besten?",
      answers: [
        "Eine einzelne Person erfand ihn an einem genau bekannten Tag.",
        "Er entstand schrittweise aus Beobachten, Sammeln, Ausprobieren und Wiederholen.",
        "Er begann erst, nachdem alle Wildgetreidearten verschwunden waren.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Was ist für die Pflanze nützlich, für erntende Menschen aber ungünstig?",
      answers: [
        "reife Körner schnell zu Boden fallen zu lassen",
        "größere Ähren auszubilden",
        "Körner länger an der Ähre festzuhalten",
      ],
      correctAnswer: 0,
    },
  ],
  6: [
    {
      question: "Wodurch beeinflussten Menschen die Entwicklung früher Herden besonders?",
      answers: [
        "Sie bestimmten zunehmend, welche Tiere sich fortpflanzten.",
        "Sie fingen in jeder Generation neue Wildtiere und ließen alle gleich häufig Nachwuchs bekommen.",
        "Sie schützten die Herden, ohne Auswahl bei Schlachtung oder Fortpflanzung zu treffen.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Warum ist Domestikation kein einzelner kurzer Vorgang?",
      answers: [
        "Körperbau und Verhalten verändern sich über viele Generationen.",
        "Jedes Tier muss dafür dieselbe Fähigkeit neu erlernen.",
        "Domestikation beginnt erst mit der Nutzung von Metallzäunen.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Welche Kombination zeigt Nutzen und Aufwand der Tierhaltung?",
      answers: [
        "Fleisch und Felle – aber auch Füttern, Bewachen und Lenken der Tiere",
        "weniger Nahrung – dafür keinerlei tägliche Arbeit",
        "ausschließlich Arbeitskraft – aber keine weiteren tierischen Produkte",
      ],
      correctAnswer: 0,
    },
    {
      question: "Was unterscheidet Zähmung und Domestikation am besten?",
      answers: [
        "Zähmung betrifft einzelne Tiere, Domestikation verändert Populationen über Generationen.",
        "Zähmung ist genetisch, Domestikation betrifft nur erlerntes Verhalten.",
        "Zwischen beiden Begriffen gibt es keinen Unterschied.",
      ],
      correctAnswer: 0,
    },
  ],
  7: [
    {
      question: "Was bedeutet es, dass Landwirtschaft mehrere Ursprungsregionen hat?",
      answers: [
        "Alle Regionen übernahmen gleichzeitig dasselbe fertige System.",
        "Landwirtschaft entstand unabhängig in mehreren Regionen.",
        "Landwirtschaft entstand einmal und verbreitete sich unverändert über alle Kontinente.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Warum unterschieden sich die angebauten Pflanzen zwischen den Regionen?",
      answers: [
        "Menschen arbeiteten mit den Arten ihrer jeweiligen Umwelt.",
        "Jede Region durfte nur eine einzige Pflanzenart nutzen.",
        "Saatgut konnte damals grundsätzlich nicht weitergegeben werden.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Welche Zuordnung passt zur Szene?",
      answers: [
        "Vorderasien – Weizen und Gerste; Ostasien – Reis und Hirse",
        "Ostasien – Kartoffeln und Quinoa; Andenraum – Reis",
        "Mittelamerika – Weizen; Vorderasien – Mais",
      ],
      correctAnswer: 0,
    },
    {
      question: "Welche Erklärung passt am besten zu den ähnlichen Entwicklungen?",
      answers: [
        "Verschiedene Gruppen beobachteten Pflanzen und Tiere und fanden vergleichbare Lösungen.",
        "Ein genialer Urbauernhof verschickte ein vollständiges Erfindungspaket.",
        "Landwirtschaft entstand überall exakt zur selben Zeit.",
      ],
      correctAnswer: 0,
    },
  ],
  8: [
    {
      question: "Warum wurden viele Häuser in Çatalhöyük vermutlich über das Dach betreten?",
      answers: [
        "Die Häuser standen so dicht, dass zwischen ihnen kaum Straßen verliefen.",
        "Die Dächer dienten ausschließlich als Speicher und durften unten nicht betreten werden.",
        "Die Eingänge am Boden wurden nur während der Erntezeit genutzt.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Welche Beobachtung spricht für ein arbeitsteiligeres Zusammenleben?",
      answers: [
        "Handwerker stellten unterschiedliche Werkzeuge, Gefäße und Schmuck her.",
        "Jedes Haus stellte nachweislich alle benötigten Dinge vollständig selbst her.",
        "Die Bewohner nutzten unterschiedliche Räume, aber immer dieselben Tätigkeiten.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Warum wird Çatalhöyük nicht einfach als Stadt im späteren Sinn bezeichnet?",
      answers: [
        "Die große und dichte Siedlung besitzt nicht automatisch alle Merkmale späterer Städte.",
        "Dort lebten höchstens zwei Familien gleichzeitig.",
        "Die Siedlung wurde nur während der Jagdsaison genutzt.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Welche Aussage verbindet Bauweise und Alltag am besten?",
      answers: [
        "Dichte Bebauung verlagerte Wege auf die Dächer und machte das Zusammenleben komplexer.",
        "Breite Straßen trennten Wohnen, Arbeiten und Lagern vollständig.",
        "Die Dachwege verhinderten jede Form gemeinschaftlicher Arbeit.",
      ],
      correctAnswer: 0,
    },
  ],
  9: [
    {
      question: "Welche Folgen hatte die Sesshaftigkeit?",
      answers: [
        "ausschließlich ein bequemeres und gesünderes Leben",
        "mehr Nahrung und Menschen, aber auch neue Krankheiten und soziale Unterschiede",
        "einen sofortigen Rückgang der Bevölkerung",
      ],
      correctAnswer: 1,
    },
    {
      question: "Warum konnten sich manche Krankheitserreger leichter verbreiten?",
      answers: [
        "Viele Menschen und Tiere lebten dichter beieinander.",
        "Menschen bewegten sich überhaupt nicht mehr außerhalb ihrer Häuser.",
        "Wildpflanzen verschwanden vollständig aus der Ernährung.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Wie konnten größere Vorräte soziale Unterschiede verstärken?",
      answers: [
        "Vorräte machten Fragen nach Besitz und Kontrolle wichtiger.",
        "Vorräte wurden grundsätzlich immer gleich verteilt.",
        "Vorräte verhinderten jede Form von Arbeitsteilung.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Welche Aussage vermeidet eine zu einfache Bewertung?",
      answers: [
        "Landwirtschaft war weder nur Fortschritt noch nur Rückschritt, sondern veränderte Chancen und Risiken.",
        "Landwirtschaft hatte ausschließlich gesundheitliche Nachteile.",
        "Landwirtschaft löste alle Versorgungsprobleme dauerhaft.",
      ],
      correctAnswer: 0,
    },
  ],
  10: [
    {
      question: "Warum reichen Absprachen allein bei sehr großen Vorräten immer weniger aus?",
      answers: [
        "Weil Getreide nur schriftlich haltbar bleibt.",
        "Weil Lieferungen und Verteilungen über viele Personen und Zeiträume nachvollziehbar sein müssen.",
        "Weil in Städten niemand mehr rechnen kann.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Was lässt sich aus einem großen zentralen Speicher allein nicht sicher schließen?",
      answers: [
        "Der Zugang zu den Vorräten musste organisiert werden.",
        "Sämtliches Getreide gehörte einem einzigen König.",
        "Mengen und Ausgaben spielten eine wichtige Rolle.",
      ],
      correctAnswer: 1,
    },
  ],
  11: [
    {
      question: "Welche Folge hat zunehmende Arbeitsteilung?",
      answers: [
        "Jeder Haushalt wird vollständig unabhängig.",
        "Fachwissen wächst, zugleich nimmt die gegenseitige Abhängigkeit zu.",
        "Landwirtschaft wird sofort bedeutungslos.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Welcher Fund wäre der stärkste Hinweis auf organisierte Arbeitsteilung?",
      answers: [
        "Ein einzelnes besonders schönes Gefäß.",
        "Abgegrenzte Werkstattbereiche mit vielen Werkzeugen und Produktionsresten derselben Tätigkeit.",
        "Mehrere gleich große Wohnhäuser.",
      ],
      correctAnswer: 1,
    },
  ],
  12: [
    {
      question: "Wozu dienten viele der frühesten bekannten Tafeln aus Uruk?",
      answers: [
        "Zur Aufzeichnung langer Heldengeschichten.",
        "Zur Erfassung von Mengen, Gütern und Rationen.",
        "Zur Darstellung heutiger Buchstaben.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Warum ist Proto-Keilschrift nicht einfach mit späterer Keilschrift gleichzusetzen?",
      answers: [
        "Sie wurde ausschließlich auf Holz geschrieben.",
        "Ihre frühen Zeichen erfassten Informationen noch begrenzter und waren oft schwer eindeutig zu lesen.",
        "Sie verwendete bereits dasselbe Alphabet wie wir.",
      ],
      correctAnswer: 1,
    },
  ],
  13: [
    {
      question: "Wodurch vergrößert ein schriftlicher Eintrag die Reichweite einer Entscheidung?",
      answers: [
        "Er verhindert jede falsche Angabe.",
        "Er kann später und auch ohne Anwesenheit aller Beteiligten geprüft werden.",
        "Er macht mündliche Kommunikation unmöglich.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Welche Fundkombination spricht besonders für organisierte Kontrolle?",
      answers: [
        "Standardisierte Maße, administrative Tafeln, Siegel und zentrale Speicher.",
        "Einige unterschiedliche Kochtöpfe in Wohnhäusern.",
        "Eine unbeschriftete Stadtmauer.",
      ],
      correctAnswer: 0,
    },
  ],
  14: [
    {
      question: "Wo lag Uruk im südlichen Mesopotamien?",
      answers: [
        "Am Nil im heutigen Ägypten.",
        "Im Gebiet von Euphrat und Tigris, im heutigen Irak.",
        "Am Indus im heutigen Pakistan.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Warum fördern Kanäle zugleich Zusammenarbeit und Verwaltung?",
      answers: [
        "Sie bewässern Felder ohne menschliche Arbeit.",
        "Sie machen Vorräte überflüssig.",
        "Bau, Reinigung und Wasserverteilung müssen über einzelne Haushalte hinaus koordiniert werden.",
      ],
      correctAnswer: 2,
    },
  ],
  15: [
    {
      question: "Warum beweist ein großer Gemeinschaftsbau noch keinen allmächtigen König?",
      answers: [
        "Monumentalbauten können niemals von Herrschern angeordnet werden.",
        "Auch andere Institutionen oder gemeinschaftliche Formen können große Arbeiten organisieren.",
        "Könige lebten grundsätzlich außerhalb der Städte.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Welche Aussage beschreibt das Verhältnis von Schrift und Macht am besten?",
      answers: [
        "Schrift diente ausschließlich dazu, Herrscher zu loben.",
        "Schrift machte Machtunterschiede unmöglich.",
        "Schrift erleichterte Verwaltung und Kontrolle, überliefert aber häufig besonders die Sicht mächtiger Institutionen.",
      ],
      correctAnswer: 2,
    },
  ],
} as const;

export const episodeThreeScenes: EpisodeThreeScene[] = [
  { id: 1, title: "Noch einmal zurück", timeLabel: "Um 12.000 v. Chr.", speakerText: episodeThreeSpeakerTexts[1], discoveries: episodeThreeDiscoveries[1], quiz: [episodeThreeQuizzes[1][1], episodeThreeQuizzes[1][3]], imageStatus: "ready" },
  { id: 2, title: "Leben ohne Acker", timeLabel: "Etwa 12.000 bis 10.000 v. Chr.", speakerText: episodeThreeSpeakerTexts[2], discoveries: episodeThreeDiscoveries[2], quiz: [episodeThreeQuizzes[2][0], episodeThreeQuizzes[2][3]], imageStatus: "ready" },
  { id: 3, title: "Steine für die Ewigkeit", timeLabel: "Göbekli Tepe, etwa 9.600 bis 8.200 v. Chr.", speakerText: episodeThreeSpeakerTexts[3], discoveries: episodeThreeDiscoveries[3], quiz: [episodeThreeQuizzes[3][1], episodeThreeQuizzes[3][3]], imageStatus: "ready" },
  { id: 4, title: "Ein Ort bleibt", timeLabel: "Jericho, 9. bis 8. Jahrtausend v. Chr.", speakerText: episodeThreeSpeakerTexts[4], discoveries: episodeThreeDiscoveries[4], quiz: [episodeThreeQuizzes[4][1], episodeThreeQuizzes[4][3]], imageStatus: "ready" },
  { id: 5, title: "Eine Ähre verändert sich", timeLabel: "Etwa 9.500 bis 8.000 v. Chr.", speakerText: episodeThreeSpeakerTexts[5], discoveries: episodeThreeDiscoveries[5], quiz: [episodeThreeQuizzes[5][0], episodeThreeQuizzes[5][1]], imageStatus: "ready" },
  { id: 6, title: "Aus Jagd wird Herde", timeLabel: "Etwa 9.000 bis 7.000 v. Chr.", speakerText: episodeThreeSpeakerTexts[6], discoveries: episodeThreeDiscoveries[6], quiz: [episodeThreeQuizzes[6][0], episodeThreeQuizzes[6][3]], imageStatus: "ready" },
  { id: 7, title: "Eine Idee entsteht immer wieder", timeLabel: "Über mehrere Jahrtausende", speakerText: episodeThreeSpeakerTexts[7], discoveries: episodeThreeDiscoveries[7], quiz: [episodeThreeQuizzes[7][0], episodeThreeQuizzes[7][3]], imageStatus: "ready" },
  { id: 8, title: "Leben Wand an Wand", timeLabel: "Çatalhöyük, etwa 7.400 bis 6.200 v. Chr.", speakerText: episodeThreeSpeakerTexts[8], discoveries: episodeThreeDiscoveries[8], quiz: [episodeThreeQuizzes[8][2], episodeThreeQuizzes[8][3]], imageStatus: "ready" },
  { id: 9, title: "Der Preis des Bleibens", timeLabel: "Etwa 7.000 bis 3.500 v. Chr.", speakerText: episodeThreeSpeakerTexts[9], discoveries: episodeThreeDiscoveries[9], quiz: [episodeThreeQuizzes[9][0], episodeThreeQuizzes[9][3]], imageStatus: "ready" },
  { id: 10, title: "Wer zählt eigentlich das ganze Getreide?", timeLabel: "Etwa 3.500 bis 3.200 v. Chr.", speakerText: episodeThreeSpeakerTexts[10], discoveries: episodeThreeDiscoveries[10], quiz: [episodeThreeQuizzes[10][0], episodeThreeQuizzes[10][1]], imageStatus: "ready" },
  { id: 11, title: "Nicht alle machen alles", timeLabel: "Spätes 4. Jahrtausend v. Chr.", speakerText: episodeThreeSpeakerTexts[11], discoveries: episodeThreeDiscoveries[11], quiz: [episodeThreeQuizzes[11][0], episodeThreeQuizzes[11][1]], imageStatus: "ready" },
  { id: 12, title: "Wenn Zahlen zu Zeichen werden", timeLabel: "Etwa 3.300 bis 2.600 v. Chr.", speakerText: episodeThreeSpeakerTexts[12], discoveries: episodeThreeDiscoveries[12], quiz: [episodeThreeQuizzes[12][0], episodeThreeQuizzes[12][1]], imageStatus: "ready" },
  { id: 13, title: "Die Macht der Liste", timeLabel: "Etwa 3.200 bis 2.900 v. Chr.", speakerText: episodeThreeSpeakerTexts[13], discoveries: episodeThreeDiscoveries[13], quiz: [episodeThreeQuizzes[13][0], episodeThreeQuizzes[13][1]], imageStatus: "ready" },
  { id: 14, title: "Eine Stadt aus Lehm und Wasser", timeLabel: "Uruk, um 3.200 v. Chr.", speakerText: episodeThreeSpeakerTexts[14], discoveries: episodeThreeDiscoveries[14], quiz: [episodeThreeQuizzes[14][0], episodeThreeQuizzes[14][1]], imageStatus: "ready" },
  { id: 15, title: "Wer entscheidet für die Stadt?", timeLabel: "Etwa 3.000 bis 2.700 v. Chr.", speakerText: episodeThreeSpeakerTexts[15], discoveries: episodeThreeDiscoveries[15], quiz: [episodeThreeQuizzes[15][0], episodeThreeQuizzes[15][1]], imageStatus: "ready" },
];

export const episodeThreeSceneOneImages = {
  present: "/assets/episode3/scene01/hintergrund-zeitfelsen-heute-v1.png",
  past: "/assets/episode3/scene01/hintergrund-zeitfelsen-12000-vchr-v1.png",
} as const;

export const episodeThreeSceneTwoDraft =
  "/assets/episode3/scene02/hintergrund-leben-ohne-acker-entwurf-v1.png";

export const episodeThreeSceneThreeDraft =
  "/assets/episode3/scene03/hintergrund-goebekli-tepe-entwurf-v1.png";

export const episodeThreeSceneFourDraft =
  "/assets/episode3/scene04/hintergrund-jericho-entwurf-v1.png";

export const episodeThreeSceneFiveDraft =
  "/assets/episode3/scene05/hintergrund-aehre-veraendert-sich-entwurf-v1.png";

export const episodeThreeSceneSixDraft =
  "/assets/episode3/scene06/hintergrund-aus-jagd-wird-herde-entwurf-v1.png";

export const episodeThreeSceneSevenDraft =
  "/assets/episode3/scene07/hintergrund-idee-entsteht-wieder-entwurf-v1.png";

export const episodeThreeSceneEightDraft =
  "/assets/episode3/scene08/hintergrund-catalhoeyuek-entwurf-v1.png";

export const episodeThreeSceneNineDraft =
  "/assets/episode3/scene09/hintergrund-preis-des-bleibens-entwurf-v1.png";
