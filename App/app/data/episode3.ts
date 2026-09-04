export type EpisodeThreeScene = {
  id: number;
  title: string;
  timeLabel: string;
  focusLabel: string;
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
  10: "/assets/episode3/scene10/bewegung-getreidespeicher-veo-v1.mp4",
  14: "/assets/episode3/scene14/bewegung-uruk-kanalstadt-veo-v1.mp4",
  16: "/assets/episode3/scene16/bewegung-segelhandel-veo-v1.mp4",
  22: "/assets/episode3/scene22/bewegung-kohle-dampfmaschine-veo-v1.mp4",
  26: "/assets/episode3/scene26/bewegung-oel-mobilitaet-veo-v1.mp4",
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
  10: "/assets/episode3/audio/sprecher-und-veo-szene-10-v1.m4a",
  11: "/assets/episode3/audio/sprecher-szene-11-v1.m4a",
  12: "/assets/episode3/audio/sprecher-szene-12-v1.m4a",
  13: "/assets/episode3/audio/sprecher-szene-13-v1.m4a",
  14: "/assets/episode3/audio/sprecher-und-veo-szene-14-v1.m4a",
  15: "/assets/episode3/audio/sprecher-szene-15-v1.m4a",
  16: "/assets/episode3/audio/sprecher-und-veo-szene-16-v1.m4a",
  17: "/assets/episode3/audio/sprecher-szene-17-v1.m4a",
  18: "/assets/episode3/audio/sprecher-szene-18-v1.m4a",
  19: "/assets/episode3/audio/sprecher-szene-19-v1.m4a",
  20: "/assets/episode3/audio/sprecher-szene-20-v1.m4a",
  21: "/assets/episode3/audio/sprecher-szene-21-v1.m4a",
  22: "/assets/episode3/audio/sprecher-und-veo-szene-22-v1.m4a",
  23: "/assets/episode3/audio/sprecher-szene-23-v1.m4a",
  24: "/assets/episode3/audio/sprecher-szene-24-v1.m4a",
  25: "/assets/episode3/audio/sprecher-szene-25-v1.m4a",
  26: "/assets/episode3/audio/sprecher-und-veo-szene-26-v1.m4a",
  27: "/assets/episode3/audio/sprecher-szene-27-v1.m4a",
  28: "/assets/episode3/audio/sprecher-szene-28-v1.m4a",
} as const;

export const episodeThreeSceneDurations = {
  1: 46,
  2: 36,
  3: 48,
  4: 47,
  5: 55,
  6: 49,
  7: 36,
  8: 49,
  9: 70,
  10: 58,
  11: 67,
  12: 65,
  13: 55,
  14: 74,
  15: 66,
  16: 46.336,
  17: 40.683,
  18: 48.619,
  19: 65.941,
  20: 62.784,
  21: 80.277,
  22: 62.379,
  23: 29.184,
  24: 31.573,
  25: 57.088,
  26: 70.827,
  27: 56.917,
  28: 68.949,
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
  16: "/assets/episode3/scene16/hintergrund-segelhandel-v1.png",
  17: "/assets/episode3/scene17/hintergrund-seidenstrassen-karawane-v1.png",
  19: "/assets/episode3/scene19/hintergrund-hafen-vor-pest-v1.png",
  20: "/assets/episode3/scene20/hintergrund-atlantische-begegnung-v1.png",
  21: "/assets/episode3/scene21/hintergrund-versklavung-register-v1.png",
  22: "/assets/episode3/scene22/hintergrund-kohle-dampfmaschine-v1.png",
  23: "/assets/episode3/scene23/hintergrund-vor-eisenbahn-v1.png",
  24: "/assets/episode3/scene24/hintergrund-gaslicht-v1.png",
  26: "/assets/episode3/scene26/hintergrund-oel-mobilitaet-v1.png",
  27: "/assets/episode3/scene27/hintergrund-computerraum-v1.png",
  28: "/assets/episode3/scene28/hintergrund-zeitfelsen-gegenwart-v1.png",
} as const;

export const episodeThreeSceneImageSequences = {
  5: [
    "/assets/episode3/scene05/hintergrund-aehre-veraendert-sich-entwurf-v1.png",
    "/assets/episode3/scene05/hintergrund-kulturaehren-v1.png",
  ],
  7: [
    "/assets/episode3/scene07/hintergrund-idee-entsteht-wieder-entwurf-v1.png",
    "/assets/episode3/scene07/hintergrund-kulturpflanzen-auswahl-v1.png",
  ],
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
  13: [
    "/assets/episode3/scene14/hintergrund-rationsverwaltung-v1.png",
    "/assets/episode3/scene13/hintergrund-listenmacht-v1.png",
  ],
  15: [
    "/assets/episode3/scene15/hintergrund-gemeinschaftsarbeit-v1.png",
    "/assets/episode3/scene15/hintergrund-macht-buendelt-sich-v1.png",
  ],
  17: [
    "/assets/episode3/scene17/hintergrund-seidenstrassen-karawane-v1.png",
    "/assets/episode3/scene17/hintergrund-seidenstrassen-handelsstadt-v1.png",
  ],
  19: [
    "/assets/episode3/scene19/hintergrund-hafen-vor-pest-v1.png",
    "/assets/episode3/scene19/hintergrund-hafen-nach-pest-v1.png",
  ],
  20: [
    "/assets/episode3/scene20/hintergrund-atlantische-begegnung-v1.png",
    "/assets/episode3/scene20/hintergrund-atlantik-folgen-v1.png",
  ],
  21: [
    "/assets/episode3/scene21/hintergrund-versklavung-register-v1.png",
    "/assets/episode3/scene21/hintergrund-widerstand-gemeinschaft-v1.png",
  ],
  23: [
    "/assets/episode3/scene23/hintergrund-vor-eisenbahn-v1.png",
    "/assets/episode3/scene23/hintergrund-mit-eisenbahn-v1.png",
  ],
  24: [
    "/assets/episode3/scene24/hintergrund-gaslicht-v1.png",
    "/assets/episode3/scene24/hintergrund-elektrisches-licht-v1.png",
  ],
  27: [
    "/assets/episode3/scene27/hintergrund-computerraum-v1.png",
    "/assets/episode3/scene27/hintergrund-smartphone-v1.png",
  ],
} as const;

export const episodeThreeGraphicScenes = [12, 18, 25] as const;

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
  16: [
    "Die Stadt hat jetzt Vorräte, Werkstätten – und ziemlich schnell auch eine Wunschliste. Holz, Metalle, Gewürze und schöne Stoffe gibt es nämlich selten direkt vor der Haustür.",
    "Also werden Flüsse und Meere zu Verkehrswegen. Ein Segelschiff ist dabei so etwas wie ein Lastwagen mit sehr viel Wasser unter den Reifen: Es kann schwere Ladung viel weiter transportieren als ein Träger.",
    "Häfen wachsen, Händler knüpfen Kontakte, und ein Gegenstand kann durch viele Hände wandern, bevor er ankommt. Entfernung verschwindet nicht. Aber sie wird handelbar – wenn Wind, Wetter und Vertrauen mitspielen.",
  ],
  17: [
    "Auf der Karte sieht sie gern wie eine dicke Linie aus: die Seidenstraße. Tatsächlich war sie ein ganzes Netz aus Land- und Seewegen.",
    "Fast niemand reiste vom Mittelmeer bis nach China. Waren wurden weiterverkauft, umgeladen und manchmal so oft weitergereicht, dass sie unterwegs vermutlich mehr Besitzer hatten als ein heutiges Schulbuch.",
    "Mit Seide, Gewürzen oder Glas reisten auch Sprachen, Religionen und technische Ideen. Die Seidenstraße war also ungefähr so sehr eine einzelne Straße wie das Internet ein einzelnes Kabel.",
    "Entscheidend war das Netz – und die vielen Menschen dazwischen.",
  ],
  18: [
    "Eine Rolle Seide wirkt kostbar. Ein Blatt Papier eher nicht. Trotzdem verändert gerade dieses unscheinbare Blatt die Welt.",
    "Die Papierherstellung entwickelt sich in China und verbreitet sich über Jahrhunderte durch Asien, die arabischsprachige Welt und schließlich nach Europa. Auf Papier lassen sich Verträge, Rechenwege und Geschichten leichter speichern und transportieren.",
    "Dabei wird Wissen nicht einfach kopiert wie eine Datei. Menschen übersetzen, prüfen, ergänzen und bauen es um. Auch unsere Ziffern machen so eine Reise: Sie entstehen in Südasien und gelangen über arabischsprachige Gelehrte nach Europa.",
    "Ideen brauchen eben keinen Pass – aber Menschen, die sie verstehen.",
  ],
  19: [
    "Handelswege transportieren nicht nur das, was ordentlich in Säcken, Kisten oder Körben steckt. Mit Menschen, Tieren und Vorräten reisen auch Krankheitserreger – unsichtbar und ohne Zollkontrolle.",
    "Im 14. Jahrhundert breitet sich die Pest über viele Land- und Seewege aus. Der Erreger heißt Yersinia pestis. Hafenstädte und Handelsplätze werden zu Knotenpunkten einer Katastrophe, die große Teile Asiens, Nordafrikas und Europas trifft.",
    "Die Menschen kennen weder das Bakterium noch seine Übertragungswege. Sie erleben nur, wie schnell aus einer fernen Nachricht eine Gefahr vor der eigenen Tür wird.",
    "Vernetzung bringt Waren und Wissen. Sie teilt aber auch Risiken. Krankheitserreger brauchen eben keine Einladung – eine Reisemöglichkeit genügt.",
  ],
  20: [
    "1492 erreicht Christoph Kolumbus Inseln der Karibik. Entdeckt wird dabei allerdings nur aus europäischer Sicht: In Amerika leben seit Jahrtausenden Menschen mit eigenen Städten, Reichen und Handelsnetzen.",
    "Von nun an überqueren Schiffe regelmäßig den Atlantik. Mais, Kartoffeln und Tomaten reisen nach Osten. Pferde, Weizen und Zuckerrohr nach Westen. Mit ihnen wechseln auch Krankheitserreger die Kontinente.",
    "Das ist kein freundlicher Tausch unter Gleichberechtigten. Eroberung, Landraub, Zwangsarbeit und eingeschleppte Krankheiten zerstören viele indigene Gesellschaften und kosten unzählige Menschen das Leben.",
    "Die Welt rückt enger zusammen. Doch wer von dieser Verbindung profitiert, entscheidet immer häufiger die Macht.",
  ],
  21: [
    "Auf den neuen Atlantikrouten werden nun auch Menschen gegen ihren Willen transportiert. Europäische Händler und Kolonialmächte versklaven Afrikanerinnen und Afrikaner, verkaufen sie und verschleppen sie über den Ozean.",
    "Zwischen dem 16. und 19. Jahrhundert werden schätzungsweise rund 12,5 Millionen Menschen an Afrikas Küsten auf Schiffe gezwungen. Etwa 10,7 Millionen erreichen die andere Seite. Schon diese Differenz lässt die Gewalt der Überfahrt erahnen – und die Gewalt beginnt lange vor dem Hafen.",
    "Versklavte Menschen produzieren Zucker, Baumwolle und Tabak. Die Gewinne verbinden Plantagen, Häfen, Werkstätten, Banken und Käufer. In den Listen erscheinen Menschen dabei oft nur noch als Zahlen.",
    "Aber sie sind niemals bloß Fracht. Sie leisten Widerstand, fliehen, bewahren Wissen und Kultur und kämpfen für ihre Freiheit. Hinter jeder Zahl steht ein Mensch.",
  ],
  22: [
    "Jahrtausendelang arbeiten Menschen vor allem mit Muskelkraft, Holz, Wind und Wasser. Dann bekommt ein schwarzer Stein einen erstaunlichen Job: Kohle.",
    "In ihr steckt Energie aus Pflanzen, die vor Millionen Jahren gewachsen sind. Dampfmaschinen verwandeln diese gespeicherte Energie nun in Bewegung. Pumpen, Webstühle und später ganze Fabriken laufen kräftiger und länger als menschliche Muskeln.",
    "Das ermöglicht mehr Waren, neue Berufe und gewaltige technische Sprünge. Gleichzeitig wachsen Bergwerke und Industriestädte. Viele Menschen arbeiten unter harten und gefährlichen Bedingungen.",
    "Die Maschine kennt schließlich keinen Feierabend. Sie braucht nur Brennstoff – und jemanden, der sie bedient.",
  ],
  23: [
    "Die Dampfmaschine bleibt nicht lange in der Fabrik. Sie bekommt Räder.",
    "Eisenbahnen transportieren Menschen, Kohle und Waren schneller und in größeren Mengen. Fabriken erhalten Rohstoffe aus immer größerer Entfernung. Städte wachsen entlang der Strecken, und Lebensmittel erreichen Märkte, bevor sie unterwegs selbst Geschichte werden.",
    "Doch die Eisenbahn verändert mehr als Entfernungen. Fahrpläne verlangen gemeinsame Uhrzeiten. Aus „irgendwann am Vormittag“ wird plötzlich „Abfahrt 9 Uhr 17“.",
    "Die Landschaft bekommt Schienen, Bahnhöfe und einen neuen Takt. Entfernung verschwindet noch immer nicht. Aber sie bekommt jetzt ordentlich Termindruck.",
  ],
  24: [
    "Dann lernt Energie einen neuen Trick: Sie reist als elektrischer Strom.",
    "Kraftwerke erzeugen Elektrizität, Leitungen verteilen sie, und am anderen Ende genügt ein Schalter. Lampen erhellen Straßen und Wohnungen. Elektromotoren treiben Maschinen an. Später kommen Kühlschränke, Radios und eine beeindruckende Sammlung von Ladekabeln hinzu.",
    "Elektrizität ist allerdings keine Energiequelle. Sie transportiert Energie, die vorher irgendwo erzeugt werden muss – aus Kohle, Wasser, Wind, Sonne oder anderen Quellen.",
    "Die Steckdose verrät davon erstaunlich wenig. Sie macht Energie bequem verfügbar und versteckt gleichzeitig den größten Teil des Systems hinter der Wand.",
  ],
  25: [
    "Zu Beginn des 20. Jahrhunderts wird ausgerechnet die Luft zum Rohstoff. Sie besteht größtenteils aus Stickstoff – nur können Pflanzen diesen Stickstoff nicht direkt nutzen. Die Speisekammer ist also voll, aber abgeschlossen.",
    "Das Haber-Bosch-Verfahren knackt das Schloss. Unter hohem Druck und hoher Temperatur verbindet es Stickstoff mit Wasserstoff zu Ammoniak. Daraus lässt sich Dünger herstellen.",
    "Die Ernten steigen, und viel mehr Menschen können ernährt werden. Gleichzeitig braucht die Herstellung reichlich Energie. Gelangt zu viel Dünger auf Felder, können überschüssige Nährstoffe Böden, Grundwasser und Gewässer belasten.",
    "Mehr Nahrung ist eine gewaltige Möglichkeit. Aber auch dieser Fortschritt kommt nicht allein – er bringt Energiebedarf und neue Abhängigkeiten gleich mit.",
  ],
  26: [
    "Die Kohle bekommt einen flüssigen Kollegen: Erdöl. Benzin und Diesel speichern viel Energie in wenig Gewicht – und der Brennstoff fährt praktischerweise im eigenen Tank mit.",
    "Verbrennungsmotoren bewegen Autos, Lastwagen, Schiffe und Flugzeuge. Menschen und Waren reisen schneller und weiter. Straßen, Vororte, Tankstellen und Lieferketten wachsen gleich mit.",
    "Das schafft neue Freiheit und verbindet Märkte. Gleichzeitig werden Städte und Wirtschaft vom Öl abhängig. Förderung, Raffinerien und Verkehr verändern Landschaften, und beim Verbrennen entsteht Kohlendioxid.",
    "Mobilität wird zum Alltag. Nur die Rechnung fährt nicht immer sichtbar auf dem Beifahrersitz mit.",
  ],
  27: [
    "Die ersten elektronischen Computer füllen ganze Räume. Sie rechnen beeindruckend schnell – jedenfalls für ihre Zeit – und benötigen Schränke voller Bauteile.",
    "Dann werden Transistoren und Mikrochips immer kleiner. Rechenleistung wandert in Büros, Wohnungen und schließlich in die Hosentasche. Ein Smartphone ist Kamera, Karte, Bibliothek, Briefkasten und gelegentlich sogar Telefon.",
    "Klein bedeutet allerdings nicht unabhängig. Hinter dem Gerät stehen Bergwerke, Fabriken, Unterseekabel, Funkmasten und Rechenzentren. Die digitale Welt wirkt schwerelos, hat aber ein ziemlich handfestes Hinterzimmer.",
    "Information reist nun beinahe sofort. Und menschliche Möglichkeiten beschleunigen noch einmal kräftig.",
  ],
  28: [
    "Wir sind wieder am Zeitfelsen. Die rund vierzehntausend Jahre dieser Episode passen auf der großen Erdzeituhr in ungefähr 0,13 Sekunden.",
    "Und fast die gesamte industrielle Beschleunigung drängt sich in den allerletzten winzigen Bruchteil. Mit Kohle, Erdöl und Erdgas bewegen Menschen heute gewaltige Mengen an Energie, Waren und Informationen.",
    "Dabei verändern wir auch Stoffkreisläufe und Klima – allerdings nicht alle Menschen und Länder im gleichen Maß. Technik schafft Folgen, aber sie bleibt veränderbar. Energie kann anders erzeugt, verteilt und genutzt werden.",
    "Der Zeitfelsen verteilt deshalb keine Noten. Er stellt nur eine ziemlich große Frage: Wenn wir so viel verändern können – was wollen wir als Nächstes verändern?",
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
  16: [
    {
      title: "Fremde Materialien als Spuren",
      text: "Holz, Edelsteine oder Metalle aus weit entfernten Regionen zeigen Archäologen, dass schon frühe Städte über mehrstufige Handelsnetze verbunden waren.",
    },
    {
      title: "Der Wind als Fahrplan",
      text: "Im Indischen Ozean nutzten Seeleute wiederkehrende Monsunwinde. Wer zur falschen Zeit losfuhr, bekam keinen verspäteten Zug – sondern möglicherweise monatelangen Gegenwind.",
    },
  ],
  17: [
    {
      title: "Eigentlich: Seidenstraßen",
      text: "Händler nutzten unterschiedliche Land- und Seewege und legten meistens nur einzelne Abschnitte zurück.",
    },
    {
      title: "Städte als Knotenpunkte",
      text: "In Handelsstädten trafen Kaufleute, Handwerker, Gelehrte und Reisende aufeinander. Dort wurden nicht nur Waren, sondern auch Sprachen, Religionen und Techniken weitergegeben.",
    },
  ],
  18: [
    {
      title: "Papier reist doppelt",
      text: "Zunächst wurde fertiges Papier gehandelt. Später verbreitete sich auch das Wissen, wie man es herstellt.",
    },
    {
      title: "Warum heißen sie „arabische Zahlen“?",
      text: "Unser Zahlensystem entwickelte sich in Südasien. Arabischsprachige Gelehrte übernahmen und erweiterten es; über ihre Schriften gelangte es nach Europa.",
    },
  ],
  19: [
    {
      title: "Der Erreger im Zahn",
      text: "Erbgut aus Zähnen mittelalterlicher Pesttoter belegt, dass das Bakterium Yersinia pestis die Pandemie verursachte.",
    },
    {
      title: "Nicht die eine Route",
      text: "Pestwellen folgten See-, Land- und Flusswegen. Die genaue Übertragungskette war regional verschieden und lässt sich nicht auf ein einziges Schiff oder Tier reduzieren.",
    },
  ],
  20: [
    {
      title: "Keine leere Welt",
      text: "In Amerika lebten 1492 zahlreiche unterschiedliche Gesellschaften mit eigenen politischen Ordnungen, Sprachen und weitreichenden Handelsnetzen.",
    },
    {
      title: "Pflanzen verändern Speisepläne",
      text: "Kartoffeln, Mais und Maniok verbreiteten sich weit über Amerika hinaus und wurden später in vielen Weltregionen zu wichtigen Grundnahrungsmitteln.",
    },
  ],
  21: [
    {
      title: "Zahlen mit Lücken",
      text: "Die Angaben von rund 12,5 Millionen Verschleppten und etwa 10,7 Millionen Ankünften sind wissenschaftliche Schätzungen aus unvollständigen Schiffs- und Handelsunterlagen.",
    },
    {
      title: "Widerstand gehört zur Geschichte",
      text: "Versklavte Menschen widersetzten sich auf Schiffen und Plantagen, flohen, gründeten freie Gemeinschaften und bewahrten kulturelles Wissen.",
    },
  ],
  22: [
    {
      title: "Gespeichertes Sonnenlicht",
      text: "Die Energie der Kohle stammt ursprünglich aus Pflanzen, die Sonnenenergie chemisch gespeichert haben.",
    },
    {
      title: "Dampf gegen Wasser",
      text: "Frühe Dampfmaschinen wurden unter anderem eingesetzt, um Wasser aus Bergwerken zu pumpen.",
    },
  ],
  23: [
    {
      title: "Warum eine gemeinsame Uhrzeit?",
      text: "Unterschiedliche Ortszeiten wurden für Fahrpläne und Anschlüsse zunehmend unpraktisch.",
    },
    {
      title: "Städte an den Schienen",
      text: "Bahnhöfe wurden zu neuen Knotenpunkten für Handel, Arbeit und Bevölkerungswachstum.",
    },
  ],
  24: [
    {
      title: "Energieträger statt Quelle",
      text: "Elektrizität wird aus anderen Energiequellen erzeugt und anschließend transportiert.",
    },
    {
      title: "Ein Netz im Gleichgewicht",
      text: "In einem Stromnetz müssen Erzeugung und Verbrauch ständig aufeinander abgestimmt werden.",
    },
  ],
  25: [
    {
      title: "Stickstoff überall",
      text: "Rund 78 Prozent der Luft bestehen aus Stickstoff. Pflanzen benötigen ihn jedoch in chemisch gebundener Form.",
    },
    {
      title: "Dünger mit Energiebedarf",
      text: "Für die Ammoniakherstellung sind hoher Druck, hohe Temperaturen und viel Energie nötig.",
    },
  ],
  26: [
    {
      title: "Aus Rohöl werden viele Stoffe",
      text: "In Raffinerien wird Rohöl unter anderem zu Benzin, Diesel, Kerosin und Ausgangsstoffen für Kunststoffe verarbeitet.",
    },
    {
      title: "Die Stadt passt sich dem Auto an",
      text: "Straßen, Parkplätze und Vororte prägen seit dem 20. Jahrhundert zunehmend die Form vieler Städte.",
    },
  ],
  27: [
    {
      title: "Der winzige Schalter",
      text: "Transistoren schalten elektrische Signale. Milliarden davon können heute auf einem einzigen Chip arbeiten.",
    },
    {
      title: "Das Internet liegt nicht in der Luft",
      text: "Der größte Teil des weltweiten Datenverkehrs läuft durch Glasfaserkabel, darunter viele Kabel auf dem Meeresboden.",
    },
  ],
  28: [
    {
      title: "Ein unsichtbarer Wärmespeicher",
      text: "Treibhausgase halten einen Teil der Wärmestrahlung in der Atmosphäre zurück. Zusätzliche Gase verstärken diesen Effekt.",
    },
    {
      title: "Verantwortung ist ungleich verteilt",
      text: "Historische Emissionen, heutiger Ausstoß und Möglichkeiten zur Veränderung unterscheiden sich stark zwischen Ländern und Menschen.",
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
  16: [
    {
      question: "Was kann ein weit entfernt abgebauter Stein in einer alten Stadt belegen?",
      answers: [
        "Der Stein wurde sicher direkt neben der Stadt gefunden.",
        "Der Stein kann über mehrere Handelsstationen weitergereicht worden sein.",
        "Ein einzelner Händler muss die gesamte Strecke gereist sein.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Warum veränderten Schiffe den Handel besonders stark?",
      answers: [
        "Sie konnten schwere Waren vergleichsweise weit transportieren.",
        "Sie machten Händler unabhängig von Wind und Wetter.",
        "Durch sie wurden Häfen und Zwischenstationen überflüssig.",
      ],
      correctAnswer: 0,
    },
  ],
  17: [
    {
      question: "Warum ist der Begriff „Seidenstraße“ etwas irreführend?",
      answers: [
        "Auf den Wegen wurde überhaupt keine Seide transportiert.",
        "Es handelte sich um ein Netz vieler Land- und Seewege.",
        "Die Straße verband lediglich zwei benachbarte Städte.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Welche Folge hatten solche Handelsnetze?",
      answers: [
        "Es reisten ausschließlich Luxuswaren.",
        "Ideen und Religionen blieben auf ihre Herkunftsorte beschränkt.",
        "Waren, Wissen und Vorstellungen veränderten sich unterwegs und beeinflussten neue Regionen.",
      ],
      correctAnswer: 2,
    },
  ],
  18: [
    {
      question: "Was geschieht normalerweise, wenn Wissen durch verschiedene Kulturen reist?",
      answers: [
        "Es bleibt vollkommen unverändert.",
        "Es wird übersetzt, geprüft und häufig weiterentwickelt.",
        "Es verschwindet, sobald der ursprüngliche Erfinder stirbt.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Welche Beschreibung unserer heutigen Ziffern ist richtig?",
      answers: [
        "Sie entstanden in Südasien und gelangten über arabischsprachige Gelehrte nach Europa.",
        "Sie wurden vollständig im mittelalterlichen Europa erfunden.",
        "Sie wurden zuerst von Seefahrern als Geheimschrift benutzt.",
      ],
      correctAnswer: 0,
    },
  ],
  19: [
    {
      question: "Warum konnten weitreichende Handelsnetze die Ausbreitung der Pest beschleunigen?",
      answers: [
        "Weil Menschen, Tiere und Waren viele miteinander verbundene Stationen erreichten.",
        "Weil Krankheitserreger ausschließlich auf Handelsschiffen entstehen.",
        "Weil mittelalterliche Städte grundsätzlich keine Krankheiten kannten.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Was kann alte Erreger-DNA belegen – und was nicht?",
      answers: [
        "Sie kann den Erreger nachweisen, aber nicht jede einzelne Übertragungsroute rekonstruieren.",
        "Sie nennt den Namen der ersten erkrankten Person.",
        "Sie beweist, dass nur eine einzige Tierart die Pest verbreitete.",
      ],
      correctAnswer: 0,
    },
  ],
  20: [
    {
      question: "Warum kann der Begriff „Austausch“ für die Zeit nach 1492 irreführen?",
      answers: [
        "Weil überhaupt keine Pflanzen oder Tiere die Kontinente wechselten.",
        "Weil er leicht nach einem freiwilligen Tausch klingt, obwohl Eroberung und Zwang entscheidend waren.",
        "Weil ausschließlich europäische Gesellschaften Folgen des Kontakts erlebten.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Welche Aussage beschreibt die neue Verbindung über den Atlantik am besten?",
      answers: [
        "Pflanzen, Tiere, Menschen und Erreger bewegten sich in verschiedene Richtungen – mit sehr ungleichen Folgen.",
        "Nur Edelmetalle gelangten über den Atlantik.",
        "Alle beteiligten Gesellschaften gewannen gleich viel Macht und Wohlstand.",
      ],
      correctAnswer: 0,
    },
  ],
  21: [
    {
      question: "Was zeigen Handels- und Schiffslisten zur Versklavung – und was zeigen sie nur unzureichend?",
      answers: [
        "Sie zeigen Größenordnungen und Handelswege, aber nur begrenzt die Erfahrungen einzelner Menschen.",
        "Sie erzählen vollständig das Leben jeder verschleppten Person.",
        "Sie belegen, dass die Verschleppten keinen Widerstand leisteten.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Warum war die transatlantische Versklavung Teil einer vernetzten Wirtschaft?",
      answers: [
        "Weil erzwungene Arbeit Plantagen, Häfen, Handel, Verarbeitung und Konsum miteinander verband.",
        "Weil sie ausschließlich auf einzelnen, abgeschlossenen Inseln stattfand.",
        "Weil europäische Händler und Käufer daran nicht beteiligt waren.",
      ],
      correctAnswer: 0,
    },
  ],
  22: [
    {
      question: "Warum war Kohle für Fabriken besonders bedeutsam?",
      answers: [
        "Sie konnte nur bei Sonnenschein genutzt werden.",
        "Sie stellte viel gespeicherte Energie unabhängig von Wind und Muskelkraft bereit.",
        "Sie machte Maschinen überflüssig.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Was zeigt die Dampfmaschine besonders deutlich?",
      answers: [
        "Neue Technik beseitigt automatisch schlechte Arbeitsbedingungen.",
        "Mehr verfügbare Energie kann Produktion und Arbeitsorganisation verändern.",
        "Maschinen benötigen keine Rohstoffe.",
      ],
      correctAnswer: 1,
    },
  ],
  23: [
    {
      question: "Warum förderte die Eisenbahn das Wachstum von Industriestädten?",
      answers: [
        "Sie verband Fabriken schneller mit Rohstoffen, Arbeitskräften und Märkten.",
        "Sie machte den Transport von Gütern unnötig.",
        "Sie durfte ausschließlich Kohle befördern.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Weshalb unterstützten Eisenbahnen die Einführung gemeinsamer Uhrzeiten?",
      answers: [
        "Dampfmaschinen konnten nur zu bestimmten Minuten arbeiten.",
        "Fahrpläne und Anschlüsse mussten über verschiedene Orte hinweg zusammenpassen.",
        "Menschen hatten zuvor keine Vorstellung von Zeit.",
      ],
      correctAnswer: 1,
    },
  ],
  24: [
    {
      question: "Warum ist Elektrizität keine ursprüngliche Energiequelle?",
      answers: [
        "Sie muss zunächst aus einer anderen Energieform erzeugt werden.",
        "Sie kommt ausschließlich in Batterien vor.",
        "Sie kann keine Maschinen antreiben.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Was verändert ein Stromnetz gegenüber einer einzelnen Dampfmaschine?",
      answers: [
        "Energie kann an vielen weit entfernten Orten genutzt werden.",
        "Jede Wohnung benötigt ein eigenes Kohlebergwerk.",
        "Energie geht niemals verloren.",
      ],
      correctAnswer: 0,
    },
  ],
  25: [
    {
      question: "Warum genügt der Stickstoff in der Luft Pflanzen nicht unmittelbar?",
      answers: [
        "Pflanzen benötigen Stickstoff in chemisch gebundener, aufnehmbarer Form.",
        "Stickstoff kommt ausschließlich nachts in der Luft vor.",
        "Pflanzen können grundsätzlich keinen Stickstoff verwenden.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Welches Tauschgeschäft steckt im künstlichen Dünger?",
      answers: [
        "Höhere Erträge sind möglich, aber Herstellung und Überdüngung können Energie und Umwelt belasten.",
        "Dünger erhöht Erträge ganz ohne Rohstoffe oder Energie.",
        "Seit seiner Erfindung benötigen Felder weder Wasser noch Böden.",
      ],
      correctAnswer: 0,
    },
  ],
  26: [
    {
      question: "Warum eigneten sich Erdölprodukte besonders für Motorfahrzeuge?",
      answers: [
        "Sie speichern viel Energie und lassen sich im Fahrzeug mitführen.",
        "Sie entstehen während der Fahrt von selbst neu.",
        "Sie können ausschließlich in stationären Maschinen genutzt werden.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Wie veränderte Massenmobilität Städte und Wirtschaft?",
      answers: [
        "Sie machte Straßen und Lieferketten überflüssig.",
        "Sie ermöglichte weitere Wege, schuf aber neue Infrastruktur und Abhängigkeit vom Öl.",
        "Sie verringerte automatisch jeden Rohstoffverbrauch.",
      ],
      correctAnswer: 1,
    },
  ],
  27: [
    {
      question: "Was ermöglichte den Weg vom Computerraum zum Smartphone besonders?",
      answers: [
        "Immer kleinere Transistoren und Mikrochips bündelten mehr Rechenleistung.",
        "Computer benötigten nach 1960 keine elektrische Energie mehr.",
        "Lochkarten wurden einfach immer kleiner gefaltet.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Warum ist ein Smartphone trotz seiner Größe Teil eines großen Systems?",
      answers: [
        "Es funktioniert ohne Rohstoffe und Verbindungen.",
        "Es ist mit Fabriken, Kabeln, Funkmasten und Rechenzentren verbunden.",
        "Alle Daten werden ausschließlich im Gerät selbst erzeugt.",
      ],
      correctAnswer: 1,
    },
  ],
  28: [
    {
      question: "Warum können menschliche Aktivitäten heute das Erdsystem beeinflussen?",
      answers: [
        "Weil Milliarden Menschen mit großen Energiemengen Stoffe und Landschaften verändern.",
        "Weil einzelne Smartphones die Erdachse verschieben.",
        "Weil natürliche Prozesse vollständig aufgehört haben.",
      ],
      correctAnswer: 0,
    },
    {
      question: "Welche Schlussfolgerung passt zum offenen Ende am Zeitfelsen?",
      answers: [
        "Technische Entwicklung hat nur Folgen und bietet keine Wahlmöglichkeiten.",
        "Alle Menschen tragen exakt gleich viel Verantwortung.",
        "Große Veränderungsmacht schafft Folgen, kann aber auch für neue Lösungen genutzt werden.",
      ],
      correctAnswer: 2,
    },
  ],
} as const;

export const episodeThreeScenes: EpisodeThreeScene[] = [
  { id: 1, title: "Noch einmal zurück", timeLabel: "Um 12.000 v. Chr.", focusLabel: "Zeitfelsen", speakerText: episodeThreeSpeakerTexts[1], discoveries: episodeThreeDiscoveries[1], quiz: [episodeThreeQuizzes[1][1], episodeThreeQuizzes[1][3]], imageStatus: "ready" },
  { id: 2, title: "Leben ohne Acker", timeLabel: "Etwa 12.000 bis 10.000 v. Chr.", focusLabel: "Wildbeuter", speakerText: episodeThreeSpeakerTexts[2], discoveries: episodeThreeDiscoveries[2], quiz: [episodeThreeQuizzes[2][0], episodeThreeQuizzes[2][3]], imageStatus: "ready" },
  { id: 3, title: "Steine für die Ewigkeit", timeLabel: "Göbekli Tepe, etwa 9.600 bis 8.200 v. Chr.", focusLabel: "Steinpfeiler", speakerText: episodeThreeSpeakerTexts[3], discoveries: episodeThreeDiscoveries[3], quiz: [episodeThreeQuizzes[3][1], episodeThreeQuizzes[3][3]], imageStatus: "ready" },
  { id: 4, title: "Ein Ort bleibt", timeLabel: "Jericho, 9. bis 8. Jahrtausend v. Chr.", focusLabel: "Siedlung", speakerText: episodeThreeSpeakerTexts[4], discoveries: episodeThreeDiscoveries[4], quiz: [episodeThreeQuizzes[4][1], episodeThreeQuizzes[4][3]], imageStatus: "ready" },
  { id: 5, title: "Eine Ähre verändert sich", timeLabel: "Etwa 9.500 bis 8.000 v. Chr.", focusLabel: "Getreide", speakerText: episodeThreeSpeakerTexts[5], discoveries: episodeThreeDiscoveries[5], quiz: [episodeThreeQuizzes[5][0], episodeThreeQuizzes[5][1]], imageStatus: "ready" },
  { id: 6, title: "Aus Jagd wird Herde", timeLabel: "Etwa 9.000 bis 7.000 v. Chr.", focusLabel: "Ziegenherde", speakerText: episodeThreeSpeakerTexts[6], discoveries: episodeThreeDiscoveries[6], quiz: [episodeThreeQuizzes[6][0], episodeThreeQuizzes[6][3]], imageStatus: "ready" },
  { id: 7, title: "Eine Idee entsteht immer wieder", timeLabel: "Über mehrere Jahrtausende", focusLabel: "Landwirtschaft", speakerText: episodeThreeSpeakerTexts[7], discoveries: episodeThreeDiscoveries[7], quiz: [episodeThreeQuizzes[7][0], episodeThreeQuizzes[7][3]], imageStatus: "ready" },
  { id: 8, title: "Leben Wand an Wand", timeLabel: "Çatalhöyük, etwa 7.400 bis 6.200 v. Chr.", focusLabel: "Çatalhöyük", speakerText: episodeThreeSpeakerTexts[8], discoveries: episodeThreeDiscoveries[8], quiz: [episodeThreeQuizzes[8][2], episodeThreeQuizzes[8][3]], imageStatus: "ready" },
  { id: 9, title: "Der Preis des Bleibens", timeLabel: "Etwa 7.000 bis 3.500 v. Chr.", focusLabel: "Dorfleben", speakerText: episodeThreeSpeakerTexts[9], discoveries: episodeThreeDiscoveries[9], quiz: [episodeThreeQuizzes[9][0], episodeThreeQuizzes[9][3]], imageStatus: "ready" },
  { id: 10, title: "Wer zählt eigentlich das ganze Getreide?", timeLabel: "Etwa 3.500 bis 3.200 v. Chr.", focusLabel: "Getreidespeicher", speakerText: episodeThreeSpeakerTexts[10], discoveries: episodeThreeDiscoveries[10], quiz: [episodeThreeQuizzes[10][0], episodeThreeQuizzes[10][1]], imageStatus: "ready" },
  { id: 11, title: "Nicht alle machen alles", timeLabel: "Spätes 4. Jahrtausend v. Chr.", focusLabel: "Arbeitsteilung", speakerText: episodeThreeSpeakerTexts[11], discoveries: episodeThreeDiscoveries[11], quiz: [episodeThreeQuizzes[11][0], episodeThreeQuizzes[11][1]], imageStatus: "ready" },
  { id: 12, title: "Wenn Zahlen zu Zeichen werden", timeLabel: "Etwa 3.300 bis 2.600 v. Chr.", focusLabel: "Tontafel", speakerText: episodeThreeSpeakerTexts[12], discoveries: episodeThreeDiscoveries[12], quiz: [episodeThreeQuizzes[12][0], episodeThreeQuizzes[12][1]], imageStatus: "ready" },
  { id: 13, title: "Die Macht der Liste", timeLabel: "Etwa 3.200 bis 2.900 v. Chr.", focusLabel: "Listen", speakerText: episodeThreeSpeakerTexts[13], discoveries: episodeThreeDiscoveries[13], quiz: [episodeThreeQuizzes[13][0], episodeThreeQuizzes[13][1]], imageStatus: "ready" },
  { id: 14, title: "Eine Stadt aus Lehm und Wasser", timeLabel: "Uruk, um 3.200 v. Chr.", focusLabel: "Uruk", speakerText: episodeThreeSpeakerTexts[14], discoveries: episodeThreeDiscoveries[14], quiz: [episodeThreeQuizzes[14][0], episodeThreeQuizzes[14][1]], imageStatus: "ready" },
  { id: 15, title: "Wer entscheidet für die Stadt?", timeLabel: "Etwa 3.000 bis 2.700 v. Chr.", focusLabel: "Macht", speakerText: episodeThreeSpeakerTexts[15], discoveries: episodeThreeDiscoveries[15], quiz: [episodeThreeQuizzes[15][0], episodeThreeQuizzes[15][1]], imageStatus: "ready" },
  { id: 16, title: "Ein Segel macht die Welt kleiner", timeLabel: "Seit dem 3. Jahrtausend v. Chr.", focusLabel: "Segel", speakerText: episodeThreeSpeakerTexts[16], discoveries: episodeThreeDiscoveries[16], quiz: [episodeThreeQuizzes[16][0], episodeThreeQuizzes[16][1]], imageStatus: "draft" },
  { id: 17, title: "Keine Straße, sondern ein Netz", timeLabel: "Etwa 2. Jahrhundert v. Chr. bis 15. Jahrhundert n. Chr.", focusLabel: "Handelsnetz", speakerText: episodeThreeSpeakerTexts[17], discoveries: episodeThreeDiscoveries[17], quiz: [episodeThreeQuizzes[17][0], episodeThreeQuizzes[17][1]], imageStatus: "draft" },
  { id: 18, title: "Ein Blatt macht Karriere", timeLabel: "Über viele Jahrhunderte bis ins späte Mittelalter", focusLabel: "Papier", speakerText: episodeThreeSpeakerTexts[18], discoveries: episodeThreeDiscoveries[18], quiz: [episodeThreeQuizzes[18][0], episodeThreeQuizzes[18][1]], imageStatus: "ready" },
  { id: 19, title: "Unsichtbare Passagiere", timeLabel: "14. Jahrhundert n. Chr.", focusLabel: "Pest", speakerText: episodeThreeSpeakerTexts[19], discoveries: episodeThreeDiscoveries[19], quiz: [episodeThreeQuizzes[19][0], episodeThreeQuizzes[19][1]], imageStatus: "draft" },
  { id: 20, title: "Ein Ozean wird zur Kreuzung", timeLabel: "Seit 1492", focusLabel: "Atlantik", speakerText: episodeThreeSpeakerTexts[20], discoveries: episodeThreeDiscoveries[20], quiz: [episodeThreeQuizzes[20][0], episodeThreeQuizzes[20][1]], imageStatus: "draft" },
  { id: 21, title: "Menschen werden zur Ware gemacht", timeLabel: "16. bis 19. Jahrhundert", focusLabel: "Versklavung", speakerText: episodeThreeSpeakerTexts[21], discoveries: episodeThreeDiscoveries[21], quiz: [episodeThreeQuizzes[21][0], episodeThreeQuizzes[21][1]], imageStatus: "draft" },
  { id: 22, title: "Ein schwarzer Stein übernimmt die Schicht", timeLabel: "Seit dem späten 18. Jahrhundert", focusLabel: "Kohle", speakerText: episodeThreeSpeakerTexts[22], discoveries: episodeThreeDiscoveries[22], quiz: [episodeThreeQuizzes[22][0], episodeThreeQuizzes[22][1]], imageStatus: "ready" },
  { id: 23, title: "Die Landschaft bekommt einen Fahrplan", timeLabel: "19. Jahrhundert", focusLabel: "Eisenbahn", speakerText: episodeThreeSpeakerTexts[23], discoveries: episodeThreeDiscoveries[23], quiz: [episodeThreeQuizzes[23][0], episodeThreeQuizzes[23][1]], imageStatus: "ready" },
  { id: 24, title: "Die Nacht bekommt einen Schalter", timeLabel: "Seit dem späten 19. Jahrhundert", focusLabel: "Elektrizität", speakerText: episodeThreeSpeakerTexts[24], discoveries: episodeThreeDiscoveries[24], quiz: [episodeThreeQuizzes[24][0], episodeThreeQuizzes[24][1]], imageStatus: "ready" },
  { id: 25, title: "Brot aus Luft?", timeLabel: "Seit dem frühen 20. Jahrhundert", focusLabel: "Kunstdünger", speakerText: episodeThreeSpeakerTexts[25], discoveries: episodeThreeDiscoveries[25], quiz: [episodeThreeQuizzes[25][0], episodeThreeQuizzes[25][1]], imageStatus: "ready" },
  { id: 26, title: "Der Brennstoff fährt mit", timeLabel: "20. Jahrhundert", focusLabel: "Erdöl", speakerText: episodeThreeSpeakerTexts[26], discoveries: episodeThreeDiscoveries[26], quiz: [episodeThreeQuizzes[26][0], episodeThreeQuizzes[26][1]], imageStatus: "ready" },
  { id: 27, title: "Ein Zimmer schrumpft in die Hosentasche", timeLabel: "Seit der Mitte des 20. Jahrhunderts", focusLabel: "Smartphone", speakerText: episodeThreeSpeakerTexts[27], discoveries: episodeThreeDiscoveries[27], quiz: [episodeThreeQuizzes[27][0], episodeThreeQuizzes[27][1]], imageStatus: "ready" },
  { id: 28, title: "Der Zeitfelsen fragt zurück", timeLabel: "Gegenwart", focusLabel: "Zeitfelsen", speakerText: episodeThreeSpeakerTexts[28], discoveries: episodeThreeDiscoveries[28], quiz: [episodeThreeQuizzes[28][0], episodeThreeQuizzes[28][1]], imageStatus: "ready" },
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
