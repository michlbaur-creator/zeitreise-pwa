export type Hotspot = {
  label: string;
  title?: string;
  text: string;
};

export type Quiz = {
  question: string;
  options: string[];
  correctIndex: number;
};

export type Discovery = {
  label: string;
  prompt: string;
  items: string[];
  explanations?: string[];
  note?: string;
};

export type SceneTheme =
  | "volcanic"
  | "rain"
  | "ocean"
  | "lagoon"
  | "micro"
  | "oxygen"
  | "atmosphere"
  | "ediacara"
  | "cambrian"
  | "shore"
  | "swamp"
  | "egg"
  | "dinosaurs"
  | "impact"
  | "ash"
  | "forest"
  | "present";

export type Scene = {
  id: number;
  title: string;
  duration: number;
  durationLabel: string;
  timeLabel?: string;
  speaker: string;
  theme: SceneTheme;
  setting: string;
  camera: string;
  media: string[];
  motions: string[];
  sounds: string[];
  music: string;
  hotspots: Hotspot[];
  quiz?: Quiz;
  discovery?: Discovery;
  transition?: string;
  directorNote?: string;
  mediaNote?: string;
};

export const scenes: Scene[] = [
  {
    id: 1,
    title: "Die junge Erde",
    duration: 33,
    durationLabel: "ca. 33 Sekunden",
    timeLabel: "Vor mehr als 4 Milliarden Jahren",
    speaker:
      "Tadaa! Du landest auf der jungen Erde. Was ist das? Der Boden glüht, Vulkane husten Asche, und aus allen Ritzen dampft es. Meer? Wald? Kiosk? Fehlanzeige. Hier gibt es nur Feuer, Gestein und eine ziemlich ungemütliche Atmosphäre. Kaum zu glauben: Aus diesem chaotischen Glutball wird einmal dein Zuhause.",
    theme: "volcanic",
    setting:
      "Hintergrund: bg_ep01_s01.jpg. Bildinhalt: Langsame Kamerafahrt (Zoom-In 8 %).",
    camera: "Langsame Kamerafahrt mit Zoom-In 8 %.",
    media: [
      "hintergrund_zeitfelsen_kueste_heute.jpg",
      "objekt_zeitfelsen.png",
      "objekt_kinderhand.png",
      "overlay_goldenes_schimmern.png",
      "hintergrund_junge_erde_gluehend.jpg",
      "overlay_dampf_aufsteigend.png",
      "overlay_rauch_klein.png",
      "overlay_glutspalten.png",
    ],
    motions: [
      "animation_kinderhand_auf_zeitfelsen",
      "animation_zeitfelsen_goldenes_glimmen",
      "animation_uebergang_zeitfelsen_junge_erde",
      "animation_kamera_zoom_hinein_langsam",
      "animation_dampf_steigt_langsam",
      "animation_rauch_treibt_langsam",
      "animation_glut_pulsiert_leicht",
    ],
    sounds: [
      "atmo_vulkanrumpeln_loop.wav",
      "atmo_wind_heiss_loop.wav",
      "geraeusch_lavablasen.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Vulkan",
        text: "Gewaltige Vulkane setzten Wasserdampf, Kohlendioxid und Schwefelgase frei. Diese Gase bildeten später die erste Atmosphäre.",
      },
      {
        label: "Glutspalte",
        text: "Durch tiefe Risse trat ständig neues Magma an die Oberfläche.",
      },
    ],
    quiz: {
      question:
        "Welche Beschreibung passt am besten zur Erde kurz nach ihrer Entstehung?",
      options: [
        "Eine ruhige Welt mit stabilen Kontinenten und Sauerstoff",
        "Eine heiße Welt mit dünner Kruste, Einschlägen und starkem Vulkanismus",
        "Ein vollständig vereister Planet unter einer dichten Ozonschicht",
        "Eine wasserreiche Welt mit ersten Algenmatten",
      ],
      correctIndex: 1,
    },
    transition:
      "Der Kamerazoom läuft weiter. Der Bildschirm verdunkelt sich langsam. Leichter Dampfschleier zieht auf. Überblendung in EP01_S02.",
    directorNote:
      "Die Episode beginnt mit der Kinderhand am Zeitfelsen. Ein warmes, goldenes Schimmern führt ohne sichtbare Person in die junge Erde.",
  },
  {
    id: 2,
    title: "Die Erde kühlt langsam ab",
    duration: 30,
    durationLabel: "ca. 30 Sekunden",
    timeLabel: "Vor etwa 4,4 Milliarden Jahren",
    speaker:
      "Aber zum Glück hat selbst ein Glutball irgendwann genug vom Dauerkochen. Die Erde kühlt ab, Wasserdampf sammelt sich in dicken, dicken Wolken – und dann öffnet der Himmel sämtliche Schleusen. Es regnet immer wieder, immer wieder über einen gewaltigen Zeitraum. Auf heißem Stein zischt das Wasser sofort los.",
    theme: "rain",
    setting:
      "Derselbe Küstenabschnitt wie Szene 1. Die Vulkanlandschaft wirkt bereits etwas ruhiger. Weniger Eruptionen, dafür dichter Wasserdampf. Im Vordergrund glühen noch einzelne Lavafelder, am Horizont steigen Dampfsäulen auf. Die ersten dunklen Wolken bilden sich.",
    camera:
      "Langsamer Zoom (6 %) und minimale Kamerafahrt nach links.",
    media: [
      "hintergrund_junge_erde_abkuehlung.jpg",
      "overlay_dampf_aufsteigend.png",
      "overlay_rauch_klein.png",
      "overlay_lavafluss.png",
      "overlay_regen.png",
    ],
    motions: [
      "animation_kamera_zoom_hinein_langsam",
      "animation_kamera_schwenk_links_langsam",
      "animation_dampf_steigt_langsam",
      "animation_rauch_treibt_langsam",
      "animation_lava_fliesst_langsam",
      "animation_regen_setzt_ein",
      "animation_uebergang_zeitraffer_regen",
    ],
    sounds: [
      "atmo_vulkanrumpeln_loop.wav",
      "atmo_wind_heiss_loop.wav",
      "geraeusch_wasserdampf_zischen_loop.wav",
      "atmo_regen_leicht_loop.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Wolken",
        title: "Die erste Atmosphäre",
        text: "Die frühe Atmosphäre bestand vor allem aus Wasserdampf, Kohlendioxid und Stickstoff. Sauerstoff gab es damals praktisch noch nicht.",
      },
      {
        label: "Wasserdampf",
        title: "Woher kam das Wasser?",
        text: "Ein großer Teil des Wassers stammte aus dem Inneren der Erde und wurde von Vulkanen freigesetzt. Zusätzlich brachten wahrscheinlich wasserreiche Asteroiden weiteres Wasser auf unseren Planeten.",
      },
    ],
    quiz: {
      question:
        "Welcher Vorgang verwandelte den Wasserdampf der frühen Atmosphäre in Regen?",
      options: [
        "Vulkanische Gase spalteten den Wasserdampf in Tropfen.",
        "Die Schwerkraft des Mondes zog Wasser aus dem Erdinneren.",
        "Salzkristalle pressten Wasser aus den Wolken.",
        "Beim Abkühlen kondensierte Wasserdampf zu flüssigem Wasser.",
      ],
      correctIndex: 3,
    },
    transition:
      "Die Regentropfen werden dichter. Die Kamera blickt weiter in Richtung Horizont. Das Bild blendet langsam in Szene 3 - Der erste Ozean über, in der aus dem langen Regen allmählich eine wasserbedeckte Erde entsteht.",
    directorNote:
      "Szene 2 und 3 bilden einen durchgehenden Zeitraffer. Identischer Kamerawinkel, dichter werdender Regen und weiche Überblendung verbergen den Bildwechsel.",
    mediaNote:
      "Am Ende der Szene erscheinen die ersten deutlich sichtbaren Regentropfen. Zunächst nur wenige. Der Zuschauer soll neugierig werden: „Jetzt beginnt etwas völlig Neues ...“",
  },
  {
    id: 3,
    title: "Die ersten Ozeane entstehen",
    duration: 38,
    durationLabel: "ca. 38 Sekunden",
    timeLabel: "Vor etwa 4,4 Milliarden Jahren",
    speaker:
      "Jetzt wird es richtig nass. Der Regen findet jede Mulde. Aus Pfützen werden Seen, aus Seen Meere und schließlich riesige Ozeane. Noch kein Fisch, kein Seetang, nicht einmal eine freche Qualle. Trotzdem: Das ist ein Volltreffer. Stoffe können sich darin lösen, begegnen und später miteinander reagieren. Die Bühne ist bereitet. Jetzt fehlt nur noch eine Kleinigkeit: das Leben.",
    theme: "ocean",
    setting:
      "Derselbe Küstenabschnitt wie in den beiden vorherigen Szenen. Der Dauerregen hält an. Große Bereiche der erkalteten Lava stehen bereits unter Wasser. Im Vordergrund bilden sich kleine Seen, im Hintergrund vereinigen sie sich zu einem gewaltigen Urmeer. Über dem Wasser ziehen dichte Wolken, einzelne Sonnenstrahlen brechen erstmals durch.",
    camera:
      "Langsamer Zoom (5 %) und leichte Kamerafahrt nach oben, sodass am Ende mehr Wasser als Land sichtbar ist.",
    media: [
      "hintergrund_urmeer_entstehung.jpg",
      "overlay_regen.png",
      "overlay_dampf_aufsteigend.png",
      "overlay_wasserwellen.png",
      "overlay_sonnenstrahl.png",
    ],
    motions: [
      "animation_kamera_zoom_hinein_langsam",
      "animation_kamera_fahrt_nach_oben_langsam",
      "animation_regen_stark",
      "animation_dampf_steigt_langsam",
      "animation_wasserwellen_sanft",
      "animation_wolken_oeffnen_sich",
      "animation_sonnenstrahl_erscheint",
      "animation_uebergang_weich",
    ],
    sounds: [
      "atmo_regen_stark_loop.wav",
      "geraeusch_donner_fern.wav",
      "atmo_vulkanrumpeln_loop.wav",
      "geraeusch_wasser_plaetschern_loop.wav",
      "atmo_wind_leicht_loop.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Das Urmeer",
        title: "Warum war Wasser so wichtig?",
        text: "Flüssiges Wasser löst viele Stoffe und ermöglicht chemische Reaktionen. Deshalb gilt Wasser bis heute als wichtigste Voraussetzung für Leben.",
      },
      {
        label: "Sonnenstrahlen",
        title: "Die Erde wird ruhiger",
        text: "Mit der Zeit kühlte sich die Erdoberfläche weiter ab. Gewaltige Vulkanausbrüche wurden seltener und das Klima stabilisierte sich langsam.",
      },
    ],
    quiz: {
      question:
        "Warum waren die ersten Ozeane für die Entstehung des Lebens chemisch so wichtig?",
      options: [
        "Wasser löste viele Stoffe und bot Raum für zahlreiche Reaktionen.",
        "Das Meer erzeugte sofort freien Sauerstoff.",
        "Salzwasser verhinderte jede schädliche Strahlung.",
        "Die Ozeane bestanden bereits aus organischen Zellen.",
      ],
      correctIndex: 0,
    },
    transition:
      "Die Kamera folgt der Wasseroberfläche langsam in Richtung Horizont. Das Bild wird heller. Eine sanfte Überblendung führt in Szene 4 - Die Ursuppe, wo im warmen Flachwasser die ersten komplexen chemischen Verbindungen entstehen.",
    mediaNote:
      "Während der letzten acht Sekunden reißt die Wolkendecke leicht auf. Ein warmer Sonnenstrahl fällt auf die Wasseroberfläche. Die Wellen reflektieren das Licht. Der Zuschauer soll spüren: Jetzt beginnt ein neues Kapitel der Erdgeschichte.",
  },
  {
    id: 4,
    title: "Die Ursuppe - Wo alles begann",
    duration: 34,
    durationLabel: "ca. 34 Sekunden",
    timeLabel: "Vor etwa 4 Milliarden Jahren",
    speaker:
      "Willkommen in der berühmten Ursuppe. Klingt nach Mittagessen, schmeckt aber vermutlich nicht ganz so gut. Im warmen Wasser treiben Mineralstoffe und einfache Moleküle. Blitze, Vulkanwärme und Sonnenlicht liefern Energie für immer neue Verbindungen. Eine fertige Zelle springt dabei nicht plötzlich aus dem Topf. Wie Chemie tatsächlich zu Leben wurde, bleibt eines der spannendsten Rätsel der Forschung.",
    theme: "lagoon",
    setting:
      "Derselbe Küstenabschnitt - Millionen Jahre später. Die Vulkane sind nur noch vereinzelt aktiv. Im Vordergrund befindet sich eine flache, warme Lagune. Das Wasser wirkt leicht grünlich bis bräunlich durch gelöste Mineralien. Kleine Felsen ragen aus dem Wasser. Im Hintergrund steigt vereinzelt Dampf auf. Die Sonne steht tief und taucht die Szene in warmes, goldenes Licht.",
    camera:
      "Sehr langsamer Vorwärtsflug (ca. 4 %), knapp über der Wasseroberfläche; ruhige, dokumentarische Bewegung.",
    media: [
      "hintergrund_ursuppe_lagune.jpg",
      "overlay_wasserwellen.png",
      "overlay_dampf_aufsteigend.png",
      "overlay_luftflimmern.png",
      "overlay_gasblasen_klein.png",
      "overlay_organisches_schimmern.png",
    ],
    motions: [
      "animation_kamera_vorwaertsfahrt_langsam",
      "animation_wasserwellen_sanft",
      "animation_dampf_steigt_langsam",
      "animation_luftflimmern_leicht",
      "animation_gasblasen_steigen_auf",
      "animation_organisches_schimmern_kurz",
      "animation_uebergang_spiegelung_fuellt_bild",
    ],
    sounds: [
      "atmo_wellen_sanft_loop.wav",
      "atmo_wind_leicht_loop.wav",
      "atmo_vulkanrumpeln_loop.wav",
      "geraeusch_wasserdampf_zischen_loop.wav",
      "geraeusch_wasserblasen_loop.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Die Ursuppe",
        title: `Was bedeutet „Ursuppe"?`,
        text: `Mit „Ursuppe" bezeichnen Forschende die Mischung aus Wasser und gelösten Stoffen, in der sich die ersten organischen Moleküle gebildet haben könnten. Wie genau das geschah, wird bis heute erforscht.`,
      },
      {
        label: "Energiequellen",
        title: "Woher kam die Energie?",
        text: "Blitze, UV-Strahlung der Sonne und Wärme aus Vulkanen lieferten die Energie, damit chemische Reaktionen ablaufen konnten.",
      },
    ],
    quiz: {
      question:
        "Welche Kombination konnte die chemische Entwicklung in der „Ursuppe“ antreiben?",
      options: [
        "Nur reines Wasser ohne weitere Stoffe",
        "Fertige Zellen und reichlich Sauerstoff",
        "Wasser, einfache gelöste Stoffe und Energiequellen",
        "Mineralien, aber weder Wärme noch Strahlung",
      ],
      correctIndex: 2,
    },
    transition:
      "Die Kamera fährt langsam näher an die Wasseroberfläche. Das Sonnenlicht spiegelt sich auf den kleinen Wellen. Die Spiegelung füllt den Bildschirm. Langsame Überblendung.",
    mediaNote:
      "Unter der Wasseroberfläche steigen langsam kleine Gasblasen auf. An einer Stelle schimmert das Wasser kurz in Regenbogenfarben - als Hinweis auf organische Moleküle, ohne übertrieben oder künstlich zu wirken.",
  },
  {
    id: 5,
    title: "Die erste Zelle",
    duration: 52,
    durationLabel: "ca. 52 Sekunden",
    timeLabel: "Vor mindestens 3,5 Milliarden Jahren",
    speaker:
      "Und jetzt musst du sehr, sehr klein denken. Zwischen Mineralien bilden sich winzige Bläschen mit membranähnlichen Hüllen – sozusagen Einzimmerwohnungen für chemische Reaktionen. Darin können Stoffe zusammenbleiben, obwohl draußen das übliche Urmeerchaos tobt. Wie daraus die erste echte Zelle entstand, wissen wir leider nicht so ganz genau. Aber wir wissen: Irgendwann konnte sich etwas erhalten und vermehren. Glückwunsch, liebe Erde! Du hast Leben!",
    theme: "micro",
    setting:
      "Unter der Wasseroberfläche einer flachen, warmen Lagune dringt Sonnenlicht in weichen Strahlen durch das Wasser. Kleine Mineralpartikel schweben langsam umher. Im Vordergrund liegen poröse Lavagesteine und Mineralkristalle. Die Szene wirkt ruhig und geheimnisvoll.",
    camera:
      "Langsame, nahezu schwebende Makrofahrt. Der Fokus wandert langsam auf eine winzige Blase zwischen den Mineralien.",
    media: [
      "hintergrund_lagune_unterwasser_mikro.jpg",
      "objekt_lavagestein_mineralien.png",
      "objekt_zellblase_mit_membran.png",
      "overlay_mineralpartikel.png",
      "overlay_gasblasen_klein.png",
      "overlay_lichtstrahlen_unterwasser.png",
    ],
    motions: [
      "animation_kamera_schwebeflug_makro",
      "animation_kamera_fokuswechsel_langsam",
      "animation_mineralpartikel_schweben",
      "animation_gasblasen_steigen_auf",
      "animation_lichtstrahlen_sanft",
      "animation_zellblase_entsteht_und_teilt_sich",
      "animation_kamera_zelle_folgen",
    ],
    sounds: [
      "atmo_unterwasser_ruhen_loop.wav",
      "geraeusch_wasserblasen_loop.wav",
      "atmo_vulkanrumpeln_loop.wav",
      "atmo_stroemung_sanft_loop.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Zellmembran",
        title: "Die schützende Hülle",
        text: "Eine Zellmembran trennt das Innere einer Zelle von ihrer Umgebung. Sie schützt die Zelle und regelt, welche Stoffe hinein- oder hinausgelangen.",
      },
      {
        label: "Warum war das so bedeutend?",
        text: "Mit den ersten Zellen begann die biologische Evolution. Von nun an konnten sich Lebewesen verändern, vermehren und über Milliarden Jahre weiterentwickeln.",
      },
    ],
    quiz: {
      question:
        "Welcher Schritt machte aus frei treibenden Molekülen eine frühe, eigenständige Zelle?",
      options: [
        "Sie entwickelte sofort einen Zellkern.",
        "Sie begann, sichtbares Licht auszusenden.",
        "Sie baute eine harte Schale aus Kalk.",
        "Eine Membran grenzte einen eigenen Reaktionsraum von der Umgebung ab.",
      ],
      correctIndex: 3,
    },
    transition:
      "Die Kamera verfolgt eine einzelne Zelle. Langsamer Zoom. Die Zelle treibt in dunkleres Wasser. Plötzlich erscheinen mehrere ähnliche Zellen.",
    directorNote:
      "Der Maßstabssprung vom Meer in den Mikrokosmos erfolgt ruhig und ohne Science-Fiction-Effekt. Die Entstehung der ersten Zellen wird ausdrücklich als wissenschaftlich noch nicht vollständig geklärt dargestellt.",
    mediaNote:
      "Zwischen den Mineralien bildet sich langsam ein winziges, transparentes Bläschen. Eine dünne Membran wird sichtbar. Im Inneren bewegen sich kleine Partikel. Die Kugel teilt sich langsam in zwei gleich große Kugeln. Keine Science-Fiction-Effekte. Nur natürliche Bewegungen.",
  },
  {
    id: 6,
    title: "Das Leben breitet sich aus",
    duration: 32,
    durationLabel: "ca. 32 Sekunden",
    timeLabel: "Vor etwa 3,5 Milliarden Jahren",
    speaker:
      "Die erste Zelle ist kaum da, schon entdeckt sie den ältesten Wachstumstrick der Welt: Teilen, vermehren. Aus einer werden zwei, aus zwei vier und so weiter und so weiter – und niemand muss dafür einen Bauantrag stellen. Manche Zellen kleben an Felsen, andere treiben durchs Wasser. Noch ist alles mikroskopisch klein, aber das Leben hat offenbar nicht vor, eine seltene Erscheinung zu bleiben.",
    theme: "micro",
    setting:
      "Die Kamera bleibt unter Wasser. Zahlreiche einfache Einzeller schweben durch das Bild. Einige teilen sich, andere treiben mit der Strömung. Im Hintergrund erkennt man poröse Gesteine, an denen sich erste Biofilme bilden. Die Szene wirkt lebendiger, ohne überladen zu sein.",
    camera: "Ruhige, langsame Bewegung durch die Unterwasser-Mikrowelt.",
    media: [
      "hintergrund_lagune_unterwasser_mikro.jpg",
      "objekt_lavagestein_mineralien.png",
      "objekt_einzelle_einfach.png",
      "objekt_biofilm.png",
      "objekt_zellkolonie.png",
      "overlay_mineralpartikel.png",
    ],
    motions: [
      "animation_kamera_schwebeflug_makro",
      "animation_einzeller_treiben",
      "animation_zellen_teilen_sich",
      "animation_zellkolonie_entsteht",
      "animation_biofilm_waechst",
    ],
    sounds: [
      "atmo_unterwasser_ruhen_loop.wav",
      "atmo_stroemung_sanft_loop.wav",
      "geraeusch_wasserblasen_loop.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Zellteilung",
        text: "Eine Zelle wächst und teilt sich in zwei Tochterzellen. So konnten sich die ersten Lebewesen vermehren.",
      },
      {
        label: "Biofilm",
        text: "Viele Mikroorganismen leben nicht allein, sondern bilden Gemeinschaften auf festen Oberflächen. Solche Biofilme gibt es bis heute.",
      },
    ],
    quiz: {
      question:
        "Was musste ein früher Einzeller vor der Teilung zuerst zuverlässig erledigen?",
      options: [
        "Seine Erbinformation kopieren und anschließend die Zelle teilen",
        "Pollen und Samen bilden",
        "Einen zweiten Zellkern von außen aufnehmen",
        "Seine Membran vollständig auflösen",
      ],
      correctIndex: 0,
    },
    mediaNote:
      "Zum ersten Mal entstehen kleine Zellkolonien. Einige Zellen haften an einem Felsen. Andere treiben frei im Wasser. Langsame Zellteilungen sorgen für Bewegung, ohne hektisch zu wirken.",
  },
  {
    id: 7,
    title: "Die Erfinder des Sauerstoffs",
    duration: 37,
    durationLabel: "ca. 37 Sekunden",
    timeLabel: "Vor mindestens 2,4 Milliarden Jahren",
    speaker:
      "Die unscheinbaren Teppiche, die du hier siehst, sind echte Erfinder: Cyanobakterien. Sie nutzen Licht, Wasser und Kohlendioxid, bauen daraus energiereiche Stoffe und geben Sauerstoff ab. Anfangs Bläschen für Bläschen. Für dich und für uns ist Sauerstoff eine Selbstverständlichkeit. Damals ist er eine völlig neue Zutat im planetarischen Kochstudio. Und wie bei neuen Zutaten üblich, verträgt sie längst nicht jeder.",
    theme: "oxygen",
    setting:
      "Flaches Urmeer mit grünlich-bläulichen Cyanobakterienmatten und niedrigen Stromatolithen. Das Wasser ist klarer als zuvor. Winzige Sauerstoffbläschen steigen langsam zur Oberfläche. Die Szene soll Zuversicht ausstrahlen.",
    camera:
      "Langsamer Schwebeflug parallel zum Meeresboden; gelegentlich leichte Fokusverlagerung auf aufsteigende Bläschen.",
    media: [
      "hintergrund_flaches_urmeer_unterwasser.jpg",
      "objekt_cyanobakterienmatte.png",
      "objekt_stromatolith.png",
      "overlay_gasblasen_klein.png",
      "overlay_mineralpartikel.png",
      "overlay_lichtstrahlen_unterwasser.png",
    ],
    motions: [
      "animation_kamera_schwebeflug_langsam",
      "animation_kamera_fokuswechsel_langsam",
      "animation_sauerstoffblasen_entstehen",
      "animation_gasblasen_steigen_auf",
      "animation_kamera_blase_folgen",
      "animation_uebergang_blase_perspektivwechsel",
    ],
    sounds: [
      "atmo_unterwasser_ruhen_loop.wav",
      "geraeusch_wasserblasen_loop.wav",
      "atmo_stroemung_sanft_loop.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Cyanobakterien",
        title: "Die unsichtbaren Helden",
        text: "Cyanobakterien gehören zu den ältesten heute noch existierenden Lebewesen. Obwohl sie mikroskopisch klein sind, veränderten sie den gesamten Planeten.",
      },
      {
        label: "Stromatolith",
        title: "Versteinerte Lebensspuren",
        text: "Viele Cyanobakterien bildeten Schichten übereinander. Daraus entstanden Stromatolithen - einige der ältesten Fossilien der Erde. Ähnliche Gebilde wachsen heute noch an wenigen Orten, zum Beispiel in Australien.",
      },
    ],
    quiz: {
      question:
        "Welches zunächst unscheinbare „Abfallprodukt“ der Cyanobakterien veränderte später den ganzen Planeten?",
      options: ["Methan", "Sauerstoff", "Stickstoff", "Schwefeldioxid"],
      correctIndex: 1,
    },
    transition:
      "Die Kamera folgt einer Sauerstoffblase bis an die Wasseroberfläche. Beim Platzen der Blase wechselt die Perspektive. Wir verlassen erstmals das Meer und blicken in den Himmel.",
    mediaNote:
      "An einer Cyanobakterienmatte entstehen winzige Bläschen. Zunächst vereinzelt. Dann immer mehr. Sie steigen langsam nach oben. Die Kamera folgt einer einzelnen Blase bis zur Wasseroberfläche.",
  },
  {
    id: 8,
    title: "Die Sauerstoff-Revolution",
    duration: 34,
    durationLabel: "ca. 34 Sekunden",
    timeLabel: "Vor etwa 2,4 Milliarden Jahren",
    speaker:
      "Der neu gebackene Sauerstoff hat jetzt erst einmal alle Hände voll zu tun. Im Meer reagiert er mit gelöstem Eisen und anderen Stoffen. Erst viel, viel später sammelt er sich in der Luft. Für viele damalige Mikroben ist er das pure Gift. Viele sterben. Andere lernen, mit ihm besonders viel Energie zu gewinnen. Die Erde wechselt ihre Atmosphäre – ohne Rücksicht auf die bisherigen Mieter.",
    theme: "atmosphere",
    setting:
      "Zum ersten Mal sehen wir die Erde aus größerer Entfernung. Über Millionen von Jahren verändert sich die Atmosphäre. Der Himmel wirkt zunächst diesig und gelblich. Mit fortschreitender Zeit wird er heller und schließlich tiefblau. Die Ozeane spiegeln das Licht, während die Vulkanaktivität weiter zurückgeht.",
    camera:
      "Ruhige große Perspektive; der atmosphärische Wandel geschieht fast unmerklich.",
    media: [
      "hintergrund_erde_sauerstoffwende.jpg",
      "overlay_atmosphaere_gelblich.png",
      "overlay_atmosphaere_blau.png",
    ],
    motions: [
      "animation_atmosphaere_gelblich_zu_blau",
      "animation_sonnenlicht_wird_klarer",
      "animation_ozeane_spiegeln_licht",
      "animation_uebergang_zur_mikrowelt_langsam",
    ],
    sounds: ["keine zusätzlich festgelegt"],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Die Sauerstoffwende",
        text: `Für viele frühe Mikroorganismen war Sauerstoff ein gefährliches Gift. Zahlreiche Arten verschwanden, andere passten sich an. Dieser Einschnitt wird heute als „Die Sauerstoffwende" bezeichnet.`,
      },
      {
        label: "Die Ozonschicht",
        text: "Ein Teil des Sauerstoffs bildete hoch oben in der Atmosphäre Ozon. Diese Schicht schirmte die gefährliche UV-Strahlung der Sonne ab und machte das Leben an der Erdoberfläche später überhaupt erst möglich.",
      },
    ],
    quiz: {
      question:
        "Welche Folge der Sauerstoffanreicherung trifft am ehesten zu?",
      options: [
        "Sie machte alle damaligen Lebewesen sofort größer.",
        "Sie verwandelte Meerwasser in Süßwasser.",
        "Sie beendete jede Form von Vulkanismus.",
        "Sie setzte viele anaerobe Organismen unter Druck und ermöglichte später energiereicheres Leben.",
      ],
      correctIndex: 3,
    },
    directorNote:
      "Szene 8 beendet den ersten großen Akt. Der Übergang zur mikroskopischen Zellwelt von Szene 9 erfolgt langsam und ohne neue Erklärungsebene.",
    mediaNote:
      "Der Himmel verändert sich fast unmerklich: gelblich-grau, heller, zunehmend blau. Gleichzeitig wird das Sonnenlicht klarer und intensiver. Der Zuschauer erlebt den Wandel, statt nur davon zu hören.",
  },
  {
    id: 9,
    title: "Die Revolution in der Zelle",
    duration: 47,
    durationLabel: "ca. 47 Sekunden",
    timeLabel: "Vor etwa 1,8 Milliarden Jahren",
    speaker:
      "Und jetzt passiert etwas völlig Verrücktes. Eine größere Zelle nimmt ein Bakterium auf und verdaut es ausnahmsweise nicht. Das Bakterium liefert reichlich Energie, die große Zelle bietet Schutz und Verpflegung. Also bleiben sie zusammen. Aus den Nachfahren der kleinen Mitbewohner werden später die Mitochondrien – die Kraftwerke auch deiner Zellen. Die haben wir immer noch in uns. Denn diese Zweck-WG läuft tatsächlich bis heute. Und zwar: Sie läuft super.",
    theme: "micro",
    setting:
      "Mikroskopische Unterwasserwelt mit einfachen Bakterien und einer größeren Zelle im Mittelpunkt. Eine kleinere Bakterienzelle wird aufgenommen, aber nicht verdaut. Die Farben bleiben natürlich: leicht grünlich, warmes Sonnenlicht, ruhiges Wasser.",
    camera:
      "Langsame Makrofahrt mit Fokus auf die größere Zelle; keine hektischen Bewegungen.",
    media: [
      "hintergrund_mikrowelt_komplexe_zellen.jpg",
      "objekt_zelle_gross.png",
      "objekt_bakterium_klein.png",
      "objekt_mitochondrium.png",
      "overlay_mineralpartikel.png",
      "overlay_gasblasen_klein.png",
      "overlay_lichtstrahlen_unterwasser.png",
    ],
    motions: [
      "animation_kamera_schwebeflug_makro",
      "animation_kamera_fokuswechsel_langsam",
      "animation_endosymbiose_aufnahme",
      "animation_endosymbiose_zusammenarbeit",
      "animation_kamera_zoom_heraus_langsam",
    ],
    sounds: [
      "atmo_unterwasser_ruhen_loop.wav",
      "geraeusch_wasserblasen_loop.wav",
      "atmo_stroemung_sanft_loop.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Endosymbiose",
        text: "Heute gehen Forschende davon aus, dass Mitochondrien ursprünglich eigenständige Bakterien waren. Sie besitzen sogar noch eigene DNA - ein starkes Indiz für diese Theorie.",
      },
      {
        label: "Mitochondrien",
        text: `Mitochondrien gewinnen Energie aus Nahrung. Fast jede Zelle deines Körpers enthält Hunderte bis Tausende dieser winzigen „Kraftwerke".`,
      },
    ],
    quiz: {
      question:
        "Welches heutige Zellorganell geht wahrscheinlich auf ein aufgenommenes Bakterium zurück?",
      options: [
        "Das Mitochondrium",
        "Die Zellwand",
        "Der Zellkern",
        "Die Vakuole",
      ],
      correctIndex: 0,
    },
    transition:
      "Die Kamera zoomt langsam aus der Zelle heraus. Immer mehr ähnliche Zellen erscheinen. Die Welt wirkt plötzlich vielfältiger.",
    mediaNote:
      "Die kleinere Zelle wird langsam umschlossen. Im Inneren bewegt sie sich weiter. Nach kurzer Zeit beginnen beide synchron zu arbeiten. Keine Effekte - nur natürliche Bewegungen.",
  },
  {
    id: 10,
    title: "Die ersten komplexen Lebewesen",
    duration: 41,
    durationLabel: "ca. 41 Sekunden",
    timeLabel: "Vor etwa 1,5 Milliarden Jahren",
    speaker:
      "Mit dieser neuen Energie werden Zellen zu kleinen Wunderpaketen. Manche jagen, andere betreiben Fotosynthese, wieder andere bauen ganze Kolonien. Einen Chef oder Bauplan gibt es nicht. Zufällige erbliche Veränderungen liefern Varianten. Ganz wichtig: Die natürliche Auslese sortiert das Ganze. Das dauert viele, viele Generationen. Aber Evolution hat eben keinen Feierabend. So füllt sich das Meer mit immer neuen Formen und Fähigkeiten.",
    theme: "micro",
    setting:
      "Ein flaches Meer voller mikroskopischer Vielfalt. Unterschiedliche Einzeller sind kugelförmig, länglich, mit Geißeln oder feinen Fortsätzen. Einige schweben frei, andere gleiten über den Meeresboden. Die Welt wirkt lebendig und abwechslungsreich.",
    camera:
      "Langsamer Schwebeflug durch die mikroskopische Landschaft; der Fokus wandert auf unterschiedliche Organismen.",
    media: [
      "hintergrund_mikrowelt_komplexe_zellen.jpg",
      "objekt_eukaryot_kugelig.png",
      "objekt_eukaryot_laenglich.png",
      "objekt_eukaryot_mit_geissel.png",
      "objekt_eukaryot_mit_fortsaetzen.png",
      "objekt_einzelle_einfach.png",
      "objekt_zellkolonie.png",
      "overlay_mineralpartikel.png",
      "overlay_lichtstrahlen_unterwasser.png",
    ],
    motions: [
      "animation_kamera_schwebeflug_makro",
      "animation_kamera_fokuswechsel_langsam",
      "animation_eukaryoten_bewegen_sich",
      "animation_einzeller_teilt_sich",
      "animation_einzeller_verschlingt_beute",
      "animation_zellkolonie_entsteht",
      "animation_kamera_zoom_heraus_langsam",
    ],
    sounds: [
      "atmo_unterwasser_ruhen_loop.wav",
      "atmo_stroemung_sanft_loop.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Eukaryoten",
        text: "Komplexe Zellen mit Zellkern werden Eukaryoten genannt. Zu ihnen gehören heute Tiere, Pflanzen, Pilze und der Mensch.",
      },
      {
        label: "Vielfalt entsteht",
        text: "Evolution hat kein festes Ziel. Zufällige Veränderungen und natürliche Auslese führen über sehr lange Zeiträume zu immer neuen Lebensformen.",
      },
    ],
    quiz: {
      question:
        "Welche Zellorganisation ist typisch für Eukaryoten, aber nicht für Bakterien?",
      options: [
        "Eine Zellmembran und Erbmaterial",
        "Die Fähigkeit, Stoffe aus der Umgebung aufzunehmen",
        "Ein Zellkern und weitere membranumhüllte Organellen",
        "Die Vermehrung durch Zellteilung",
      ],
      correctIndex: 2,
    },
    transition:
      "Die Kamera fährt immer weiter zurück. Aus den mikroskopischen Organismen wird langsam eine weite Unterwasserlandschaft. Im Hintergrund zeichnen sich erste größere, vielzellige Organismen ab.",
    directorNote:
      "Mit Szene 10 endet der mikroskopische Teil. Der Zoom führt direkt in die größere Unterwasserwelt der Vielzeller.",
    mediaNote:
      "Mehrere Einzeller bewegen sich unabhängig voneinander. Eine Zelle teilt sich. Eine andere verschlingt eine kleinere. Eine Kolonie bildet sich. Der Zuschauer soll erkennen: Leben ist jetzt dynamisch geworden.",
  },
  {
    id: 11,
    title: "Zusammen geht mehr - Die ersten Vielzeller",
    duration: 38,
    durationLabel: "ca. 38 Sekunden",
    timeLabel: "Vor mehr als 1 Milliarde Jahren",
    speaker:
      "Und bei der nächsten Teilung sagen manche Zellen anscheinend: „Ach, bleibt doch noch.“ Sie hängen tatsächlich zusammen, tauschen Signale aus und verteilen Aufgaben. Eine Zelle kümmert sich ums Bewegen, eine andere um Nahrung oder Schutz. Plötzlich muss nicht mehr jede Zelle alles alleine schaffen. So entstehen Vielzeller. Teamarbeit, lange bevor irgendjemand das erste Sitzungsprotokoll erfand.",
    theme: "oxygen",
    setting:
      "Flaches Urmeer. Verschiedene Einzeller schweben im Vordergrund. Einige bleiben nach der Zellteilung miteinander verbunden und bilden kleine Zellverbände. Erste einfache fadenförmige Algen bewegen sich sanft in der Strömung. Das Wasser wirkt klar und lichtdurchflutet.",
    camera:
      "Ruhiger Schwebeflug, Fokus auf einen Zellverband, langsamer Zoom.",
    media: [
      "hintergrund_flaches_urmeer_unterwasser.jpg",
      "objekt_einzelle_einfach.png",
      "objekt_zellkolonie.png",
      "objekt_zellverband.png",
      "objekt_fadenalge.png",
      "overlay_gasblasen_klein.png",
      "overlay_lichtstrahlen_unterwasser.png",
    ],
    motions: [
      "animation_kamera_schwebeflug_langsam",
      "animation_kamera_fokuswechsel_langsam",
      "animation_zellverband_waechst",
      "animation_fadenalgen_in_stroemung",
      "animation_uebergang_zellverbaende_werden_groesser",
    ],
    sounds: [
      "atmo_unterwasser_ruhen_loop.wav",
      "geraeusch_wasserblasen_loop.wav",
      "atmo_stroemung_sanft_loop.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Warum Vielzeller?",
        text: "Mehrere Zellen konnten unterschiedliche Aufgaben übernehmen. Dadurch entstanden immer größere und leistungsfähigere Lebewesen.",
      },
    ],
    quiz: {
      question:
        "Welcher Vorteil entsteht, wenn Zellen eines Vielzellers unterschiedliche Aufgaben übernehmen?",
      options: [
        "Jede Zelle kann nun unabhängig vom Rest leben.",
        "Spezialisierung ermöglicht eine wirksame Arbeitsteilung.",
        "Der Organismus braucht keine Energie mehr.",
        "Alle Zellen werden automatisch gleich groß.",
      ],
      correctIndex: 1,
    },
    transition:
      "Die Zellverbände werden größer. Aus den kleinen Kolonien entstehen die ersten einfachen Tiere.",
  },
  {
    id: 12,
    title: "Die ersten Tiere",
    duration: 35,
    durationLabel: "ca. 35 Sekunden",
    timeLabel: "Vor rund 570 Millionen Jahren",
    speaker:
      "Schau dir das Bild an. Wenn du jetzt ins Meer tauchst, wirkt es wie eine Ausstellung sehr weicher Sofakissen. Manche Wesen sehen aus wie Blätter, andere wie Matten oder gerippte Scheiben. Augen, Beine und Zähne? Noch nicht im Sortiment. Einige sind wahrscheinlich Tiere, andere geben Forschenden bis heute Rätsel auf. Willkommen in der Ediacara-Welt – fremdartig, weich und bis heute ziemlich rätselhaft.",
    theme: "ediacara",
    setting:
      "Flacher Meeresboden mit Schwämmen, einfachen Nesseltieren und weichen, ungewöhnlich geformten Organismen der Ediacara-Fauna. Alles wirkt fremdartig, aber friedlich.",
    camera: "Langsame Kamerafahrt dicht über den Meeresboden.",
    media: [
      "hintergrund_meeresboden_ediacara_kambrium.jpg",
      "objekt_schwamm_einfach.png",
      "objekt_nesseltier_einfach.png",
      "objekt_ediacara_organismen_set.png",
      "overlay_lichtstrahlen_unterwasser.png",
    ],
    motions: [
      "animation_kamera_fahrt_ueber_meeresboden",
      "animation_weichkoerper_in_stroemung",
      "animation_nesseltiere_in_stroemung",
      "animation_uebergang_meeresboden_wird_lebhafter",
    ],
    sounds: [
      "atmo_unterwasser_ruhen_loop.wav",
      "atmo_stroemung_sanft_loop.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Ediacara",
        text: "Die Ediacara-Lebewesen lebten vor rund 570 Millionen Jahren. Viele von ihnen haben heute keine direkten Nachfahren mehr.",
      },
    ],
    quiz: {
      question:
        "Warum hinterließen viele Ediacara-Lebewesen nur schwer deutbare Fossilien?",
      options: [
        "Sie waren meist weich und besaßen kaum harte, gut erhaltungsfähige Teile.",
        "Sie lebten ausschließlich in der Luft.",
        "Ihre Körper bestanden nur aus flüssigem Wasser.",
        "Sie entstanden erst nach den ersten Dinosauriern.",
      ],
      correctIndex: 0,
    },
    transition:
      "Der Meeresboden wird plötzlich lebendiger. Immer mehr unterschiedliche Tiere erscheinen.",
  },
  {
    id: 13,
    title: "Die Kambrische Explosion",
    duration: 41,
    durationLabel: "ca. 41 Sekunden",
    timeLabel: "Vor rund 540 Millionen Jahren",
    speaker:
      "Und jetzt wird das Meer zur großen Erfinderwerkstatt. In geologisch relativ kurzer Zeit erscheinen viele neue Körperformen. Es gibt plötzlich so etwas wie Augen, Panzer, Greifarme und harte Schalen. Wer fressen will, muss Beute finden. Wer nicht gefressen werden will, braucht wirksamen Schutz. Dieses evolutionäre Wettrüsten heißt Kambrische Explosion. Keine Sorge, es knallt nichts – aber es ging einfach alles verdammt schnell.",
    theme: "cambrian",
    setting:
      "Trilobiten laufen über den Meeresboden. Anomalocaris gleitet durchs Wasser. Würmer graben sich ein. Stachelhäuter, frühe Gliederfüßer und zahlreiche unbekannte Arten bevölkern das Meer. Die Szene soll Ehrfurcht auslösen.",
    camera:
      "Weiter Schwebeflug. Immer wieder entdeckt die Kamera neue Tiere.",
    media: [
      "hintergrund_meeresboden_ediacara_kambrium.jpg",
      "objekt_trilobit.png",
      "objekt_anomalocaris.png",
      "objekt_wurm_meeresboden.png",
      "objekt_stachelhaeuter_frueh.png",
      "objekt_gliederfuesser_frueh_meer.png",
      "overlay_lichtstrahlen_unterwasser.png",
    ],
    motions: [
      "animation_kamera_schwebeflug_langsam",
      "animation_trilobit_laeuft",
      "animation_anomalocaris_schwimmt",
      "animation_wurm_graebt_sich_ein",
      "animation_meerestiere_bewegen_sich",
      "animation_kamera_trilobit_folgen",
      "animation_uebergang_hinter_felsen",
    ],
    sounds: [
      "atmo_unterwasser_ruhen_loop.wav",
      "atmo_stroemung_sanft_loop.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Kambrische Explosion",
        text: "Vor rund 540 Millionen Jahren nahm die Vielfalt der Tierformen im Fossilbericht stark zu. Viele große Tiergruppen erscheinen dort erstmals deutlich.",
      },
    ],
    quiz: {
      question:
        "Warum ist der Ausdruck „Kambrische Explosion“ ein wenig irreführend?",
      options: [
        "Damals explodierten besonders viele Vulkane.",
        "Das Ereignis betraf nur Pflanzen an Land.",
        "Alle heutigen Tierarten entstanden an einem einzigen Tag.",
        "Viele Tierbaupläne wurden über Millionen Jahre vielfältiger – nicht in einem Augenblick.",
      ],
      correctIndex: 3,
    },
    transition:
      "Die Kamera folgt einem Trilobiten. Er verschwindet hinter einem Felsen. Beim Auftauchen hat sich die Welt erneut verändert.",
  },
  {
    id: 14,
    title: "Der Sprung an Land",
    duration: 35,
    durationLabel: "ca. 35 Sekunden",
    timeLabel: "Vor etwa 470 Millionen Jahren",
    speaker:
      "Und irgendwann schaut sich eine kleine Pflanze das Festland an und denkt sich: „Puh, sieht eigentlich ganz gemütlich aus.“ Ganz schön mutig, denn hier oben gibt es weder Bademeister noch Nachschub aus dem Meer. Aber der Plan geht auf: Immer mehr Pflanzen ziehen an Land und machen aus grauen Felsen langsam eine grüne Welt. Ganz nebenbei bereiten sie das größte Buffet der Erdgeschichte vor.",
    theme: "shore",
    setting:
      "Flache Meeresküste mit nackten, feuchten Felsen, kleinen Wassermulden, grünlichen Algenmatten und niedrigen, moosähnlichen Pflanzen. Es gibt keine Bäume, Blumen oder Gräser. Das Land wirkt weit, ruhig und fast leer.",
    camera:
      "Beginn knapp über der Wasseroberfläche, langsamer Flug auf das Ufer zu, anschließend leichter Schwenk entlang der Küste.",
    media: [
      "hintergrund_fruehe_landkueste.jpg",
      "objekt_landpflanzen_frueh.png",
      "objekt_algenmatte_landkueste.png",
      "objekt_pilzfaeden.png",
      "objekt_ur_gliederfuesser.png",
    ],
    motions: [
      "animation_kamera_flug_zum_ufer",
      "animation_kamera_schwenk_entlang_kueste",
      "animation_landpflanzen_im_wind",
      "animation_wassertropfen_rinnt_ueber_stein",
      "animation_brandung_ueberspuelt_bildrand",
      "animation_ur_gliederfuesser_huscht_kurz",
    ],
    sounds: [
      "atmo_brandung_sanft_loop.wav",
      "atmo_wind_leicht_loop.wav",
      "geraeusch_wasser_plaetschern_loop.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Warum zuerst Pflanzen?",
        text: "Pflanzen konnten mit Sonnenlicht ihre eigene Nahrung herstellen. Bevor Tiere an Land leben konnten, musste zunächst eine grüne Lebensgrundlage entstehen.",
      },
      {
        label: "Die ersten Landpflanzen",
        text: "Die ersten Landpflanzen waren nur wenige Zentimeter hoch. Sie besaßen weder Blüten noch Samen. Trotzdem veränderten sie den Planeten Schritt für Schritt.",
      },
    ],
    quiz: {
      question:
        "Welche Veränderung lösten die ersten Landpflanzen besonders langfristig aus?",
      options: [
        "Sie ließen die Ozeane verschwinden.",
        "Sie machten Tiere sofort unabhängig vom Wasser.",
        "Sie schufen Böden, Nahrung und neue Lebensräume an Land.",
        "Sie stoppten die Bewegung der Kontinente.",
      ],
      correctIndex: 2,
    },
    discovery: {
      label: "Entdecken",
      prompt: "Wer genau hinsieht, entdeckt",
      items: [
        "erste moosähnliche Pflänzchen",
        "Algenmatten",
        "Pilzfäden zwischen den Steinen",
      ],
      note: "Lupe aktivieren",
    },
    transition:
      "Die Kamera bleibt auf einer kleinen grünen Pflanze stehen. Plötzlich krabbelt zwischen den Stängeln eine winzige Bewegung vorbei. Nur ganz kurz. Fast unbemerkt. Die Kamera folgt ihr. Langsame Überblendung.",
    directorNote:
      "Die erste Tierbewegung bleibt zunächst fast unbemerkt. Der Zuschauer entdeckt sie gemeinsam mit der Kamera.",
    mediaNote:
      "Während die Kamera langsam über den Felsen gleitet, bewegen sich die kleinen Pflänzchen leicht im Wind. Ein Wassertropfen rinnt über den Stein. Die Brandung überspült kurz den unteren Bildrand. Alles wirkt ruhig und natürlich. Kein Möwen- oder anderer Vogelton.",
  },
  {
    id: 15,
    title: "Die ersten Tiere an Land",
    duration: 34,
    durationLabel: "ca. 34 Sekunden",
    timeLabel: "Vor etwa 430 Millionen Jahren",
    speaker:
      "Und wo es etwas zu futtern gibt, da dauert es bekanntlich nicht lange. Kaum haben die Pflanzen das Land begrünt, stehen auch schon die ersten Gäste vor der Tür. Zugegeben, besonders elegant sieht das jetzt noch nicht aus. Eher so wie: „Laufen? Muss ich das erst üben?“ Aber genau mit diesen wackeligen allerersten Schritten beginnt eine völlig neue Erfolgsgeschichte.",
    theme: "shore",
    setting:
      "Dieselbe Küste wie in Szene 14, etwa 30 bis 40 Millionen Jahre später. Die grünen Pflanzenteppiche sind dichter. Zwischen den feuchten Steinen wachsen einfache Moose und niedrige Farnverwandte. Kleine frühe Gliederfüßer bewegen sich zwischen den Pflanzen.",
    camera:
      "Ruhige Bodenfahrt. Die Kamera bleibt bei einer kleinen Bewegung stehen und zoomt langsam. Der Zuschauer entdeckt gemeinsam mit der Kamera das erste Landtier.",
    media: [
      "hintergrund_fruehe_landkueste.jpg",
      "objekt_landpflanzen_dichter.png",
      "objekt_farn_vordergrund.png",
      "objekt_tausendfuesser_frueh.png",
      "objekt_spinnentier_frueh.png",
      "objekt_ur_gliederfuesser.png",
    ],
    motions: [
      "animation_kamera_bodenfahrt_langsam",
      "animation_kamera_zoom_hinein_langsam",
      "animation_tausendfuesser_krabbelt_und_tastet",
      "animation_spinnentier_huscht",
      "animation_ur_gliederfuesser_huscht",
      "animation_kamera_tausendfuesser_folgen",
      "animation_uebergang_hinter_farn",
    ],
    sounds: [
      "atmo_wind_leicht_loop.wav",
      "atmo_brandung_sanft_loop.wav",
      "atmo_blaetterrauschen_loop.wav",
      "geraeusch_krabbeln_stein_leise.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Warum waren zuerst kleine Tiere an Land?",
        text: "Kleine Gliederfüßer verloren weniger Wasser als große Tiere. Außerdem fanden sie zwischen den ersten Pflanzen Schutz und Nahrung.",
      },
      {
        label: "Wer war zuerst?",
        text: "Zu den ersten Landbewohnern gehörten vermutlich frühe Tausendfüßer, Spinnentiere und andere Gliederfüßer. Insekten entwickelten sich erst später.",
      },
    ],
    quiz: {
      question:
        "Warum folgten die ersten kleinen Tiere den Pflanzen an Land?",
      options: [
        "Pflanzen boten Nahrung, Schutz und strukturierte Lebensräume.",
        "An Land gab es keine Fressfeinde und keine Trockenheit.",
        "Das Meer hatte seinen gesamten Sauerstoff verloren.",
        "Die Tiere besaßen bereits wasserdichte Eier.",
      ],
      correctIndex: 0,
    },
    discovery: {
      label: "Forscherauftrag",
      prompt: "Kannst du alle drei Tiere entdecken?",
      items: [
        "Tausendfüßer",
        "frühes Spinnentier",
        "kleiner Ur-Gliederfüßer",
      ],
      note: "Erst nach dem Finden erscheinen die Namen.",
    },
    transition:
      "Die Kamera folgt dem Tausendfüßer. Er verschwindet hinter einem dichten Farn. Als die Kamera den Farn umrundet, ist die Landschaft deutlich grüner geworden.",
    directorNote:
      "Ab hier bleiben die vorhandenen Entdeckermomente verbindlich: Die Kamera zeigt Schatten und Bewegungen vor der vollständigen Auflösung.",
    mediaNote:
      "Der kleine Tausendfüßer bleibt kurz stehen. Er tastet mit seinen Fühlern. Dann verschwindet er zwischen den Pflanzen. Fast gleichzeitig huscht ein zweites Tier durchs Bild. Nicht jeder Zuschauer wird es sofort entdecken. Genau das macht die Szene spannend.",
  },
  {
    id: 16,
    title: "Der große Schritt - Wirbeltiere erobern das Land",
    duration: 37,
    durationLabel: "ca. 37 Sekunden",
    timeLabel: "Devon, vor etwa 375 Millionen Jahren",
    speaker:
      "Okay, aber jetzt wird es richtig spannend. Dieser Fisch hat offenbar eine ziemlich verrückte Idee. Er möchte das Wasser verlassen. Stell dir vor, deine Vorfahren hätten ihr ganzes Leben im Meer verbracht und plötzlich kommt einer auf die Idee: „Da drüben auf dem Land schaue ich mich mal um.“ Verrückt? Vielleicht. Aber genau solche mutigen Experimente haben die Evolution vorangebracht. Aus solchen Pionieren entwickeln sich später Amphibien, Reptilien, Dinosaurier, Säugetiere und irgendwann sogar wir Menschen.",
    theme: "swamp",
    setting:
      "Flaches Sumpfufer mit meterhohen Schachtelhalmen, Bärlappgewächsen, großen Farnen, kleinen Tümpeln und schlammigen Inseln. Ein Tiktaalik hebt im Flachwasser vorsichtig den Kopf und stemmt sich über den schlammigen Grund.",
    camera:
      "Beginn dicht über der Wasseroberfläche. Langsame Fahrt nach links. Tiktaalik wird ohne Hektik beobachtet; der Zuschauer soll den Kraftaufwand spüren.",
    media: [
      "hintergrund_sumpfufer_devon.jpg",
      "objekt_farn_vordergrund.png",
      "objekt_tiktaalik.png",
      "objekt_libelle_urzeit.png",
      "objekt_amphibium_frueh.png",
    ],
    motions: [
      "animation_kamera_ueber_wasseroberflaeche",
      "animation_kamera_schwenk_links_langsam",
      "animation_tiktaalik_hebt_kopf",
      "animation_tiktaalik_stuetzt_sich_im_flachwasser",
      "animation_libellen_schwirren",
      "animation_kamera_schwenk_zum_amphibium",
    ],
    sounds: [
      "atmo_wind_leicht_loop.wav",
      "atmo_insekten_loop.wav",
      "geraeusch_insektenfluegel.wav",
      "geraeusch_wasser_plaetschern_loop.wav",
      "geraeusch_wassertropfen.wav",
      "geraeusch_schlamm_schmatzen.wav",
      "geraeusch_amphibium_quaken_fern.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Tiktaalik",
        text: "Tiktaalik lebte vor rund 375 Millionen Jahren. Er besaß noch Kiemen wie ein Fisch, aber auch kräftige Flossen mit knochenähnlichen Strukturen, die ihn im flachen Wasser und möglicherweise auf schlammigen Uferflächen stützen konnten. Er gilt als eine wichtige Übergangsform zwischen Fischen und den ersten Landwirbeltieren.",
      },
      {
        label: "Warum überhaupt an Land?",
        text: "Möglicherweise boten flache Uferbereiche neue Nahrungsquellen und weniger Konkurrenz. Vermutlich gab es nicht nur einen einzigen Grund - verschiedene Vorteile spielten zusammen.",
      },
    ],
    quiz: {
      question:
        "Welche Merkmalskombination macht Tiktaalik zu einem wichtigen Übergangsfossil?",
      options: [
        "Federn und ein zahnloser Schnabel",
        "Fischmerkmale sowie kräftige, stützfähige Flossen und ein beweglicher Hals",
        "Ein Amniotenei und vollständig trockene Haut",
        "Säugetierzähne und ein Fell",
      ],
      correctIndex: 1,
    },
    discovery: {
      label: "Forscherblick",
      prompt:
        "Kannst du fünf Unterschiede zwischen Tiktaalik und einem heutigen Fisch entdecken?",
      items: [
        "beweglicher Hals",
        "kräftige Brustflossen",
        "flacher Schädel",
        "Augen oben auf dem Kopf",
        "Rippen zur besseren Körperstütze",
      ],
      note: "Der Nutzer kann nacheinander markieren.",
    },
    transition:
      "Der Tiktaalik verschwindet zwischen den Farnen. Die Kamera bleibt zurück. Im Hintergrund ertönt plötzlich ein neues Geräusch. Ein tiefes, kehliges Quaken. Die Kamera schwenkt langsam zur Seite. Dort sitzt ein frühes Amphibium.",
    directorNote:
      "Tiktaalik wird als Tier des Flachwassers gezeigt. Er darf sich abstützen und über schlammigen Untergrund bewegen, aber nicht wie ein fertiges Landtier über trockenen Boden laufen.",
    mediaNote:
      "Der Tiktaalik stemmt sich im Flachwasser langsam auf den Vorderflossen hoch. Er verharrt einen Moment. Atmet. Rutscht wieder ein kleines Stück. Dann gelingt ihm eine weitere Bewegung über den schlammigen Grund. Nicht elegant. Nicht heldenhaft. Einfach unglaublich anstrengend. Gerade das macht die Szene glaubwürdig.",
  },
  {
    id: 17,
    title: "Das Ei, das die Welt veränderte",
    duration: 30,
    durationLabel: "ca. 30 Sekunden",
    timeLabel: "Vor etwa 320 Millionen Jahren",
    speaker:
      "Und der erste Ausflug an Land hat offenbar richtig Spaß gemacht. Jetzt wollen manche Tiere gleich ganz umziehen. Die Amphibien sind schon ziemlich mutig. Für das Kinderzimmer brauchen sie aber immer noch Wasser. Die Reptilien lösen das Problem ziemlich clever. Sie bringen ihr eigenes Kinderzimmer einfach mit: das Ei! Nicht schlecht, Natur. Wirklich nicht schlecht!",
    theme: "egg",
    setting:
      "Üppiger Sumpfwald mit riesigen Schachtelhalmen und Farnen. Große Libellen ziehen vorbei. Ein kleines, echsenähnliches Tier sucht am Waldboden vorsichtig einen geeigneten Platz und beginnt zu graben.",
    camera:
      "Langsamer Sinkflug. Die Kamera folgt dem Tier, bis es an einer sonnigen Stelle stehen bleibt und gräbt.",
    media: [
      "hintergrund_sumpfwald_karbon.jpg",
      "objekt_farn_vordergrund.png",
      "objekt_libelle_urzeit.png",
      "objekt_amniot_frueh.png",
      "objekt_amnioteneier.png",
    ],
    motions: [
      "animation_kamera_schwebeflug_langsam",
      "animation_kamera_sinkflug_langsam",
      "animation_libellen_flug",
      "animation_amniot_graebt_mulde",
      "animation_amniot_legt_eier",
      "animation_amniot_bedeckt_eier",
      "animation_embryo_bewegt_sich_kurz",
      "animation_ei_schluepft_im_zeitraffer",
      "animation_vegetation_veraendert_sich_im_zeitraffer",
    ],
    sounds: [
      "atmo_wind_leicht_loop.wav",
      "atmo_blaetterrauschen_loop.wav",
      "atmo_insekten_loop.wav",
      "geraeusch_insektenfluegel.wav",
      "geraeusch_wassertropfen.wav",
      "geraeusch_dinosaurier_ruf_fern.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Das Amniotenei",
        text: "Das sogenannte Amniotenei schützt den Embryo vor dem Austrocknen. Es enthält Wasser- und Nährstoffvorräte und machte die Fortpflanzung unabhängig von Gewässern. Diese Entwicklung war ein Meilenstein der Evolution.",
      },
      {
        label: "Riesige Libellen?",
        text: "Der Sauerstoffgehalt der Luft war damals deutlich höher als heute. Davon profitierten viele Gliederfüßer - einige Libellen erreichten Flügelspannweiten von über 60 Zentimetern.",
      },
    ],
    quiz: {
      question:
        "Welche Leistung des Amnioteneis war für das dauerhafte Leben an Land entscheidend?",
      options: [
        "Es machte den Embryo völlig unabhängig von Sauerstoff.",
        "Es enthielt bereits fertige Nahrung für das erwachsene Tier.",
        "Es konnte jahrelang ohne Entwicklung liegen bleiben.",
        "Es schützte und versorgte den Embryo in einer eigenen wässrigen Umgebung.",
      ],
      correctIndex: 3,
    },
    discovery: {
      label: "Forscherblick",
      prompt: "Finde die drei Anpassungen, die das Leben an Land erleichtern.",
      items: [
        "das schützende Ei",
        "trockene, schuppige Haut",
        "kräftige Beine",
      ],
      note:
        "Nach jedem Fund erscheint eine kurze Erklärung. Diese Erklärtexte sind in der verbindlichen Fassung noch nicht ausformuliert.",
    },
    transition:
      "Die Kamera bleibt auf einem Ei liegen. Die Zeit vergeht im Zeitraffer. Die Vegetation verändert sich. Das Ei öffnet sich. Ein Jungtier schlüpft. Die Kamera fährt langsam nach oben. Die Landschaft wirkt plötzlich trockener. Ein fernes, tiefes Brüllen ist zu hören. Der Zuschauer sieht noch nichts.\nAber er ahnt\nJetzt beginnt das Zeitalter der Giganten.",
    mediaNote:
      "Das Tier legt vorsichtig mehrere Eier in eine kleine Mulde. Es bedeckt sie langsam mit Pflanzenresten. Die Kamera fährt ganz nah an eines der Eier heran. Im Inneren erkennt man für einen kurzen Moment eine winzige Bewegung. Keine Effekte. Nur Leben.",
  },
  {
    id: 18,
    title: "Die Herrscher der Erde",
    duration: 43,
    durationLabel: "ca. 43 Sekunden",
    timeLabel: "Vor etwa 230 Millionen Jahren",
    speaker:
      "Tada! Jetzt betreten die absoluten Superstars der Urzeit die Bühne. Willkommen im Zeitalter der Giganten. Hier läuft nun alles herum: von winzigen Jägern bis zu Pflanzenfressern, die locker aus dem dritten Stock die Dachrinne putzen könnten. Alles Mögliche ist vertreten. Und weißt du was? Die Dinosaurier bleiben nicht ein paar Jahre, nicht ein paar Millionen Jahre, sondern fast 170 Millionen Jahre. Dagegen ist die Menschheit gerade erst mal eingezogen.",
    theme: "dinosaurs",
    setting:
      "Sonnenaufgang über einer weiten Flusslandschaft mit Nadelbäumen, Ginkgos und Baumfarnen. Leichter Morgennebel liegt über dem Wasser. Ein ruhiger Pflanzenfresser tritt zwischen den Bäumen hervor; weitere Tiere folgen. Die Szene wirkt wie eine Naturdokumentation, nicht wie ein Monsterfilm.",
    camera:
      "Zunächst auf Augenhöhe. Ein Dinosaurier läuft am Betrachter vorbei und setzt den Fuß neben der Kamera auf. Danach fährt die Kamera langsam nach oben und öffnet die Landschaft.",
    media: [
      "hintergrund_flusslandschaft_dinosaurierzeit.jpg",
      "overlay_morgennebel.png",
      "objekt_dinosaurier_pflanzenfresser.png",
      "objekt_dinosaurier_jungtier.png",
      "objekt_dinosaurier_herde.png",
      "objekt_dinosaurier_fleischfresser_fern.png",
      "objekt_flugsaurier.png",
      "objekt_ginkgo.png",
      "objekt_libelle_urzeit.png",
      "overlay_schatten_vorueberziehend.png",
    ],
    motions: [
      "animation_kamera_schwebeflug_langsam",
      "animation_nebel_zieht_langsam",
      "animation_dinosaurier_pflanzenfresser_laeuft",
      "animation_dinosaurier_fuss_nahe_kamera",
      "animation_jungtier_folgt_mutter",
      "animation_dinosaurier_friss_blaetter",
      "animation_herde_zieht_durch_nebel",
      "animation_kamera_fahrt_nach_oben_langsam",
      "animation_schatten_symbolisch_zieht_vorueber",
    ],
    sounds: [
      "atmo_wind_leicht_loop.wav",
      "atmo_blaetterrauschen_loop.wav",
      "atmo_insekten_loop.wav",
      "geraeusch_dinosaurier_schritte_schwer.wav",
      "geraeusch_dinosaurier_ruf_fern.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Dinosaurier",
        text: "Dinosaurier waren keine einzige Tierart, sondern eine riesige Gruppe mit weit über tausend bekannten Arten. Sie besiedelten nahezu alle Lebensräume ihrer Zeit.",
      },
      {
        label: "Die Erde verändert sich",
        text: "Während der Dinosaurierzeit verschoben sich die Kontinente weiter. Aus dem Superkontinent Pangäa entstanden nach und nach die Kontinente, die wir heute kennen.",
      },
      {
        label: "Wer hat überlebt?",
        text: "Vögel gingen aus einer Linie gefiederter Raubsaurier hervor. Sie sind die einzigen Dinosaurier, die bis heute überlebt haben.",
      },
    ],
    quiz: {
      question:
        "Welche Aussage über Dinosaurier ist fachlich richtig?",
      options: [
        "Flugsaurier waren fliegende Dinosaurier.",
        "Fast alle Dinosaurier waren riesige Pflanzenfresser.",
        "Vögel sind die heute lebenden Nachfahren einer Dinosaurierlinie.",
        "Die letzten Dinosaurier begegneten bereits frühen Menschen.",
      ],
      correctIndex: 2,
    },
    discovery: {
      label: "Forscherblick",
      prompt: "Entdecke fünf Bewohner dieser Welt.",
      items: [
        "Kleiner Pflanzenfresser",
        "Fleischfresser im Hintergrund",
        "Ginkgo-Baum",
        "Libelle",
        "Flugsaurier am Himmel",
      ],
      explanations: [
        "Dinosaurier gab es in sehr unterschiedlichen Größen. Nicht jeder war ein Gigant.",
        "Raubsaurier waren wichtige Teile des Ökosystems – aber keineswegs überall die Hauptdarsteller.",
        "Ginkgos existierten schon lange vor vielen bekannten Dinosauriergruppen und wachsen noch heute.",
        "Insekten lebten bereits lange vor den Dinosauriern. Die riesigen Urzeitlibellen gehören allerdings in eine viel frühere Epoche.",
        "Flugsaurier waren keine Dinosaurier, sondern eine eigene Gruppe fliegender Reptilien.",
      ],
      note:
        "Tippe die Suchpunkte im Bild an. Nach jedem Fund erscheint hier die Erklärung.",
    },
    transition:
      "Die Kamera steigt immer höher. Aus der friedlichen Landschaft wird eine riesige Panoramaaufnahme. Langsam zieht ein Schatten über den Boden. Zunächst kaum bemerkbar. Die Tiere schauen nach oben. Der Schatten verschwindet wieder. Niemand weiß, was er bedeutet. Der Zuschauer schon.",
    directorNote:
      "Der Schatten am Szenenende ist ausschließlich eine symbolische Überblendung. Er darf nicht wie ein von den Dinosauriern bemerkter Asteroid wirken.",
    mediaNote:
      "Ein Jungtier läuft seiner Mutter hinterher. Ein anderes Tier streckt vorsichtig den Hals nach Blättern. Im Hintergrund zieht eine kleine Herde durch den Morgennebel. Alles wirkt wie eine Naturdokumentation - nicht wie ein Monsterfilm. Kein Vogelton und kein Hollywood-Brüllen.",
  },
  {
    id: 19,
    title: "Der Tag, an dem sich alles änderte",
    duration: 44,
    durationLabel: "ca. 44 Sekunden",
    timeLabel: "Vor etwa 66 Millionen Jahren",
    speaker:
      "Es ist ein ganz gewöhnlicher Morgen. Keines dieser Tiere ahnt, dass sich heute alles – aber auch wirklich alles – verändern wird. Hoch oben am Himmel erscheint ein winziger Lichtpunkt. Zunächst wirkt er harmlos, doch dieser Brocken ist mehrere Kilometer groß. Er rast schneller und schneller auf die Erde zu – schneller als eine Gewehrkugel fliegt. Wenige Minuten später schlägt er im Gebiet des heutigen Mexiko ein. In diesem Moment endet das Zeitalter der Dinosaurier. Gleichzeitig beginnt ein völlig neues Kapitel der Erdgeschichte.",
    theme: "impact",
    setting:
      "Dieselbe Flusslandschaft wie zuvor an einem friedlichen frühen Morgen. Eine kleine Herde frisst am Waldrand, ein Jungtier spielt im flachen Wasser, Flugsaurier gleiten lautlos. Ganz weit oben erscheint ein winziger heller Punkt.",
    camera:
      "Zunächst unbewegt wie ein Naturfilmer. Nach einigen Sekunden hebt ein Tier den Kopf; die Kamera folgt seinem Blick in den Himmel.",
    media: [
      "hintergrund_flusslandschaft_dinosaurierzeit.jpg",
      "overlay_morgennebel.png",
      "objekt_dinosaurier_pflanzenfresser.png",
      "objekt_dinosaurier_jungtier.png",
      "objekt_dinosaurier_herde.png",
      "objekt_flugsaurier.png",
      "overlay_asteroid_lichtpunkt.png",
      "overlay_schatten_vorueberziehend.png",
      "overlay_einschlag_lichtblitz.png",
      "overlay_staub_und_asche.png",
    ],
    motions: [
      "animation_tiere_natuerlich_bewegen",
      "animation_tier_hebt_kopf",
      "animation_kamera_blick_zum_himmel",
      "animation_asteroid_lichtpunkt_wird_heller",
      "animation_schatten_kurz_vor_einschlag",
      "animation_einschlag_lichtblitz",
      "animation_schwarzblende_zwei_sekunden",
      "animation_staubpartikel_erscheinen",
    ],
    sounds: [
      "atmo_wind_leicht_loop.wav",
      "atmo_insekten_loop.wav",
      "geraeusch_wasser_plaetschern_loop.wav",
      "geraeusch_dinosaurier_ruf_fern.wav",
      "geraeusch_asteroid_grollen_anschwellend.wav",
      "Die zweisekündige Stille benötigt keine eigene Datei.",
    ],
    music: "keine – ausdrücklich verbindlich",
    hotspots: [
      {
        label: "Chicxulub",
        text: "Der Asteroid schlug auf der Halbinsel Yucatán ein und hinterließ einen Krater von rund 180 Kilometern Durchmesser. Sein Einschlag zählt zu den folgenreichsten Ereignissen der Erdgeschichte.",
      },
      {
        label: "Warum starben die Dinosaurier?",
        text: "Nicht der Einschlag allein war entscheidend. Staub und Ruß verdunkelten den Himmel über Monate bis Jahre. Pflanzen starben ab, Nahrungsketten brachen zusammen und viele Tierarten verschwanden.",
      },
    ],
    quiz: {
      question:
        "Warum wirkte der Asteroideneinschlag weit über den Einschlagsort hinaus?",
      options: [
        "Er schob die Erde dauerhaft näher an die Sonne.",
        "Er verwandelte alle Ozeane gleichzeitig in Lava.",
        "Staub und Aerosole veränderten weltweit Licht, Klima und Nahrungsketten.",
        "Er beseitigte nur große Tiere, ohne Pflanzen zu beeinflussen.",
      ],
      correctIndex: 2,
    },
    discovery: {
      label: "Forscherblick",
      prompt: "Entdecke die Hinweise auf den Einschlag.",
      items: [
        "den Lichtpunkt am Himmel",
        "die erschrockene Herde",
        "einen Flugsaurier",
        "den Schatten des herannahenden Asteroiden (erst kurz vor der Schwarzblende sichtbar)",
      ],
    },
    transition:
      "Schwarz. Man hört nur den Wind. Langsam erscheinen einzelne Staubpartikel. Die Dunkelheit lichtet sich.",
    directorNote:
      "Die Szene bleibt ernst und zurückhaltend. Kein Katastrophenspektakel, keine fliegenden Dinosaurier, keine Feuerwand. Nach dem Lichtblitz folgt eine kurze Schwarzblende.",
    mediaNote:
      "Der Lichtpunkt wird langsam heller. Nicht explosionsartig. Dann ... ein gleißender Lichtblitz. Keine Feuerwand. Keine fliegenden Dinosaurier. Nur weißes Licht. Danach ... Schwarzblende. Für etwa zwei Sekunden.",
  },
  {
    id: 20,
    title: "Eine neue Chance",
    duration: 42,
    durationLabel: "ca. 42 Sekunden",
    timeLabel: "Vor etwa 65 Millionen Jahren",
    speaker:
      "Nach der Katastrophe wirkt die Erde gähnend leer. Aber nicht ganz leer. Denn wenn du genau hinguckst, dann siehst du irgendwo ein kleines Tierchen. Es ist ein Säugetier. Denn jetzt kommt die Stunde der Säugetiere. Ganz klein, ganz unscheinbar. Während die Dinos Millionen Jahre die Erde beherrschten, führten sie eher ein Schattendasein. Aber jetzt beginnt ihre große Zeit.",
    theme: "ash",
    setting:
      "Dieselbe Landschaft nach der Katastrophe. Viele Bäume sind abgestorben, der Himmel ist grau, umgestürzte Stämme liegen herum. Unter einem Baumstamm kommt ein kleines, mausgroßes Säugetier vorsichtig hervor, schnuppert und verschwindet wieder.",
    camera:
      "Ruhige Beobachtung des aschebedeckten Zeitfelsens und anschließend des kleinen Säugetiers.",
    media: [
      "hintergrund_flusslandschaft_nach_einschlag.jpg",
      "objekt_zeitfelsen.png",
      "overlay_asche_auf_zeitfelsen.png",
      "overlay_staub_und_asche.png",
      "objekt_saeugetier_klein.png",
    ],
    motions: [
      "animation_staub_lichtet_sich",
      "animation_aschewolken_ziehen",
      "animation_kamera_kreisfahrt_langsam",
      "animation_saeugetier_kommt_hervor",
      "animation_saeugetier_schnuppert_und_verschwindet",
    ],
    sounds: [
      "atmo_wind_leicht_loop.wav",
      "geraeusch_rascheln_kleines_tier.wav",
    ],
    music: "keine festgelegt",
    hotspots: [],
    quiz: {
      question:
        "Warum hatten kleine Säugetiere nach dem Massenaussterben einen Vorteil?",
      options: [
        "Sie konnten ohne Nahrung mehrere Jahrtausende überleben.",
        "Kleine Körper, Verstecke und eine vielseitige Lebensweise halfen manchen Arten zu überleben.",
        "Sie waren gegen jede Klimaveränderung vollständig geschützt.",
        "Der Asteroid hatte ausschließlich große Tiere getroffen.",
      ],
      correctIndex: 1,
    },
    directorNote:
      "Nach der Schwarzblende erscheint der aschebedeckte Zeitfelsen als stiller Zeuge. Erst danach entdeckt die Kamera das kleine Säugetier.",
  },
  {
    id: 21,
    title: "Ein kleiner Schritt für ein Säugetier ...",
    duration: 33,
    durationLabel: "ca. 33 Sekunden",
    timeLabel: "Vor etwa 60 Millionen Jahren",
    speaker:
      "Diese Säugetiere sind zunächst winzig und unscheinbar, aber sie stehen vor einer riesengroßen Zukunft. Manche Säuger leben später in Bäumen, andere im Wasser oder in offenen Landschaften. Sie sind extrem anpassungsfähig. Und unter ihren fernen Nachkommen entsteht schließlich eine Art, die Werkzeuge baut, Feuer nutzt und Fragen über ihre eigene Geschichte stellt. Kommt dir das irgendwie bekannt vor?",
    theme: "forest",
    setting:
      "Beginn auf dem unveränderten Zeitfelsen. Die Umgebung ist wieder lebendig: blauer Himmel, junge Wälder, Blütenpflanzen und Vogelstimmen. Unter den Wurzeln kommt ein kleines, neugieriges Säugetier hervor, nicht größer als ein Eichhörnchen.",
    camera:
      "Beginn am Zeitfelsen. Langsame Kreisfahrt. Erst dann entdeckt die Kamera das kleine Säugetier.",
    media: [
      "hintergrund_junger_wald_saeugetiere.jpg",
      "objekt_zeitfelsen.png",
      "objekt_saeugetier_klein.png",
      "objekt_saeugetier_jungtier.png",
      "objekt_bluetenpflanzen.png",
      "objekt_singvogel.png",
      "objekt_insekt_auf_bluete.png",
    ],
    motions: [
      "animation_kamera_kreisfahrt_langsam",
      "animation_saeugetier_richtet_sich_auf",
      "animation_saeugetier_schnuppert",
      "animation_jungtier_folgt",
      "animation_singvogel_bewegt_sich",
      "animation_insekt_auf_bluete",
      "animation_kamera_fahrt_nach_oben_langsam",
      "animation_zeitraffer_jahreszeiten_gebirge_eis",
    ],
    sounds: [
      "atmo_vogelstimmen_loop.wav",
      "atmo_wind_leicht_loop.wav",
      "atmo_blaetterrauschen_loop.wav",
      "atmo_insekten_loop.wav",
      "geraeusch_rascheln_kleines_tier.wav",
    ],
    music: "keine festgelegt",
    hotspots: [
      {
        label: "Warum wurden Säugetiere erfolgreich?",
        text: "Viele Säugetiere waren klein, anpassungsfähig und konnten unterschiedliche Nahrung nutzen. Nach dem Aussterben der großen Dinosaurier entstanden zahlreiche neue Lebensräume.",
      },
    ],
    quiz: {
      question:
        "Welche ökologische Chance nutzten Säugetiere nach dem Massenaussterben?",
      options: [
        "Sie brauchten plötzlich weder Nahrung noch Wärme.",
        "Viele frei gewordene ökologische Nischen konnten neu besetzt werden.",
        "Alle Säugetiere wurden gleichzeitig zu großen Pflanzenfressern.",
        "Sie verdrängten die noch lebenden Dinosaurier innerhalb weniger Tage.",
      ],
      correctIndex: 1,
    },
    discovery: {
      label: "Forscherblick",
      prompt: "Finde die Veränderungen zur Dinosaurierwelt",
      items: [
        "Blütenpflanzen",
        "Singvogel",
        "Säugetier",
        "Insekt auf einer Blüte",
        "Zeitfelsen",
      ],
    },
    transition:
      "Die Kamera steigt langsam auf. Die Jahreszeiten wechseln im Zeitraffer. Wälder verändern sich. Gebirge wachsen. Eis kommt und verschwindet wieder. Die Kontinente nehmen ihre heutige Form an. Der Zeitfelsen bleibt.",
    mediaNote:
      "Das Tier richtet sich auf. Schnuppert. Ein Jungtier folgt ihm. Beide verschwinden zwischen den Pflanzen. Ganz ohne Dramatik.",
  },
  {
    id: 22,
    title: "Ein Wimpernschlag",
    duration: 54,
    durationLabel: "ca. 54 Sekunden",
    timeLabel: "Heute",
    speaker:
      "Viereinhalb Milliarden Jahre. Kaum vorstellbar, oder? Aus glühendem Gestein wurden Ozeane. Aus winzigen Zellen entstand die unglaubliche Vielfalt des Lebens. Dinosaurier kamen und gingen, Säugetiere übernahmen die Bühne. Und irgendwann erschien ein Wesen, das begann, Fragen zu stellen: Warum gibt es Berge? Warum singen Vögel? Warum blühen Blumen? Warum bin ich überhaupt hier? Vielleicht ist genau das die erstaunlichste Entwicklung der ganzen Erdgeschichte: dass die Natur ein Lebewesen hervorgebracht hat, das neugierig genug ist, ihre Geschichte zu entdecken. Und genau diese Reise beginnt für uns jetzt erst richtig.",
    theme: "present",
    setting:
      "Gegenwart am Zeitfelsen. Gras wächst zwischen den Steinen, Blumen blühen, Schmetterlinge fliegen, ein Buntspecht klopft an einem Baum und im Hintergrund glitzert das Meer. Nur eine Kinderhand legt sich auf den Zeitfelsen. Der Kreis schließt sich.",
    camera:
      "Langsame Rückwärtsfahrt. Der Zeitfelsen wird kleiner, die Landschaft größer. Am Ende ist die gesamte Küste sichtbar.",
    media: [
      "hintergrund_zeitfelsen_kueste_heute.jpg",
      "objekt_zeitfelsen.png",
      "objekt_kinderhand.png",
      "overlay_goldenes_schimmern.png",
      "objekt_gras_und_blumen_heute.png",
      "objekt_schmetterlinge.png",
      "objekt_buntspecht.png",
      "objekt_hummeln.png",
    ],
    motions: [
      "animation_schmetterlinge_fliegen",
      "animation_buntspecht_klopft",
      "animation_hummeln_fliegen",
      "animation_kinderhand_auf_zeitfelsen",
      "animation_zeitfelsen_goldenes_glimmen",
      "animation_kamera_zoom_heraus_langsam",
      "animation_schlussschrift_langsam_einblenden",
    ],
    sounds: [
      "atmo_wind_leicht_loop.wav",
      "atmo_vogelstimmen_loop.wav",
      "atmo_brandung_sanft_loop.wav",
      "atmo_hummeln_loop.wav",
      "geraeusch_buntspecht_klopfen.wav",
      "Die völlige Ruhe am Schluss benötigt keine Datei.",
    ],
    music: "keine festgelegt",
    hotspots: [],
    quiz: {
      question:
        "Warum wirkt die Geschichte des Menschen auf der Zeitskala der Erde wie ein Wimpernschlag?",
      options: [
        "Weil Menschen schon vor den ersten Zellen lebten.",
        "Weil die Erdgeschichte erst mit dem Menschen begann.",
        "Weil Menschen nur einen winzigen Teil der 4,6 Milliarden Jahre langen Erdgeschichte ausmachen.",
        "Weil sich seit dem Auftreten des Menschen keine Arten mehr verändern.",
      ],
      correctIndex: 2,
    },
    directorNote:
      "Im Abschluss wird kein Mensch gezeigt. Sichtbar ist nur die Kinderhand am Zeitfelsen. Damit schließt sich der Kreis zum Beginn der Episode.",
    mediaNote:
      "Die Hand liegt auf dem Zeitfelsen. Der Felsen beginnt ganz leicht zu leuchten. Keine große Animation. Nur ein warmes, goldenes Schimmern. Langsam erscheint der Schriftzug „Zeitreise - Die Geschichte des Lebens“. Darunter: Episode 2 „Die Entwicklung des Menschen“.",
  },
];

export const totalDuration = scenes.reduce(
  (sum, scene) => sum + scene.duration,
  0,
);

export const followUpQuizzes: Record<number, Quiz> = {
  1: {
    question: "Woher stammte ein großer Teil der Gase der frühen Erdatmosphäre?",
    options: [
      "Aus den ersten Wäldern",
      "Aus den Ozeanen fertiger Lebewesen",
      "Aus vulkanischen Ausgasungen",
      "Aus einer bereits vorhandenen Ozonschicht",
    ],
    correctIndex: 2,
  },
  2: {
    question: "Was musste geschehen, bevor aus Wasserdampf dauerhafter Regen werden konnte?",
    options: [
      "Die Sonne musste vollständig erlöschen.",
      "Erste Pflanzen mussten Wolken erzeugen.",
      "Das Meer musste bereits voller Sauerstoff sein.",
      "Die Erdoberfläche musste sich ausreichend abkühlen.",
    ],
    correctIndex: 3,
  },
  3: {
    question: "Wo sammelte sich das kondensierte Wasser zu den ersten Ozeanen?",
    options: [
      "Nur in Vulkanen",
      "Ausschließlich in der Atmosphäre",
      "In Senken und Becken der Erdoberfläche",
      "Im Inneren fertiger Zellen",
    ],
    correctIndex: 2,
  },
  4: {
    question: "Was war die sogenannte „Ursuppe“ ausdrücklich noch nicht?",
    options: [
      "Wasser mit gelösten einfachen Stoffen",
      "Ein Ort chemischer Reaktionen",
      "Eine Umgebung mit verschiedenen Energiequellen",
      "Eine Brühe voller fertiger Tiere und Pflanzen",
    ],
    correctIndex: 3,
  },
  5: {
    question: "Warum war eine Membran für eine frühe Zelle so entscheidend?",
    options: [
      "Sie ersetzte die Erbinformation.",
      "Sie machte die Zelle sofort vielzellig.",
      "Sie erzeugte ohne Energie neue Moleküle.",
      "Sie grenzte einen eigenen Reaktionsraum ab und regelte den Stoffaustausch.",
    ],
    correctIndex: 3,
  },
  6: {
    question: "Was entsteht bei einer gelungenen einfachen Zellteilung?",
    options: [
      "Zwei Tochterzellen mit kopierter Erbinformation",
      "Ein vielzelliger Organismus mit Organen",
      "Eine Zelle ohne Membran",
      "Sofort eine neue Tierart",
    ],
    correctIndex: 0,
  },
  7: {
    question: "Wie gewannen Cyanobakterien Energie und setzten dabei Sauerstoff frei?",
    options: [
      "Durch das Fressen erster Fische",
      "Durch Vulkanismus",
      "Durch Photosynthese",
      "Durch die Aufnahme fertiger Mitochondrien",
    ],
    correctIndex: 2,
  },
  8: {
    question: "Welche spätere Schutzwirkung hing mit dem Sauerstoff in der Atmosphäre zusammen?",
    options: [
      "Eine Ozonschicht schwächte einen Teil der schädlichen UV-Strahlung ab.",
      "Sauerstoff stoppte sämtliche Meteoriteneinschläge.",
      "Eine Sauerstoffdecke verhinderte jede Abkühlung.",
      "Sauerstoff machte Wasser vollkommen keimfrei.",
    ],
    correctIndex: 0,
  },
  9: {
    question: "Welcher Befund passt zur Endosymbiontentheorie?",
    options: [
      "Mitochondrien besitzen eigenes Erbmaterial.",
      "Mitochondrien liegen außerhalb jeder Zelle.",
      "Alle Bakterien besitzen einen Zellkern.",
      "Tierische Zellen kommen ohne Energie aus.",
    ],
    correctIndex: 0,
  },
  10: {
    question: "Welche Lebewesen bestehen aus eukaryotischen Zellen?",
    options: [
      "Nur Bakterien",
      "Tiere, Pflanzen und Pilze",
      "Ausschließlich Viren",
      "Nur Cyanobakterien",
    ],
    correctIndex: 1,
  },
  11: {
    question: "Was bedeutet Arbeitsteilung in einem Vielzeller?",
    options: [
      "Alle Zellen erledigen immer genau dieselbe Aufgabe.",
      "Jede Zelle verlässt den Organismus nach der Teilung.",
      "Spezialisierte Zellen übernehmen unterschiedliche Aufgaben für den Organismus.",
      "Der Organismus benötigt keine Kommunikation zwischen Zellen.",
    ],
    correctIndex: 2,
  },
  12: {
    question: "Welche Aussage über die Ediacara-Lebewesen ist am vorsichtigsten formuliert?",
    options: [
      "Jede Ediacara-Form war sicher ein direkter Vorfahr heutiger Tiere.",
      "Viele waren weichkörperig; ihre genaue Verwandtschaft ist teilweise noch unklar.",
      "Sie lebten ausschließlich an Land.",
      "Sie besaßen bereits Knochen und Zähne.",
    ],
    correctIndex: 1,
  },
  13: {
    question: "Was wurde im Kambrium besonders vielfältig?",
    options: [
      "Nur die Farben der Ozeane",
      "Ausschließlich Landpflanzen",
      "Bereits alle heutigen Tierarten in unveränderter Form",
      "Viele unterschiedliche Körperbaupläne und Lebensweisen von Tieren",
    ],
    correctIndex: 3,
  },
  14: {
    question: "Warum bereiteten Landpflanzen den späteren Tieren gewissermaßen ein „Buffet“?",
    options: [
      "Sie schufen Nahrung und Lebensräume an Land.",
      "Sie beseitigten jedes Wasser vom Festland.",
      "Sie verwandelten Tiere in Pflanzenfresser.",
      "Sie verhinderten die Bildung von Böden.",
    ],
    correctIndex: 0,
  },
  15: {
    question: "Welche Tiere gehörten zu den frühen kleinen Eroberern des Festlands?",
    options: [
      "Wale und Delfine",
      "Gliederfüßer wie frühe Tausendfüßer und Verwandte",
      "Dinosaurier und Vögel",
      "Große Säugetiere",
    ],
    correctIndex: 1,
  },
  16: {
    question: "Welche Aussage über Tiktaalik vermeidet eine typische Falle?",
    options: [
      "Tiktaalik war bereits ein heutiger Frosch.",
      "Tiktaalik war der erste Dinosaurier.",
      "Tiktaalik lebte vollständig unabhängig vom Wasser.",
      "Tiktaalik zeigt ein Merkmalsmosaik zwischen wasserlebenden Fischen und frühen Landwirbeltieren.",
    ],
    correctIndex: 3,
  },
  17: {
    question: "Welche Struktur des Amnioteneis verhinderte vor allem das Austrocknen des Embryos?",
    options: [
      "Eine schützende Hülle mit inneren Eihäuten",
      "Kiemen außerhalb des Eis",
      "Ein Fell im Ei",
      "Eine Verbindung zum offenen Meer",
    ],
    correctIndex: 0,
  },
  18: {
    question: "Welche Gruppe gehört nicht zu den Dinosauriern, obwohl sie zur gleichen Zeit lebte?",
    options: [
      "Vögel",
      "Theropoden",
      "Sauropoden",
      "Flugsaurier",
    ],
    correctIndex: 3,
  },
  19: {
    question: "Was geschah nach der Verdunkelung zuerst mit vielen Nahrungsketten?",
    options: [
      "Weniger Sonnenlicht schwächte Pflanzen und damit zahlreiche weitere Glieder der Nahrungskette.",
      "Alle Pflanzen wuchsen durch den Staub schneller.",
      "Nur Tiere am Einschlagsort waren betroffen.",
      "Die Ozeane verwandelten sich dauerhaft in Süßwasser.",
    ],
    correctIndex: 0,
  },
  20: {
    question: "Was bedeutet in dieser Szene die „Stunde der Säugetiere“?",
    options: [
      "Alle Säugetiere wurden innerhalb einer Stunde riesig.",
      "Nach dem Aussterben vieler Gruppen eröffneten sich langfristig neue Entwicklungsmöglichkeiten.",
      "Säugetiere entstanden erst nach dem Asteroideneinschlag.",
      "Von nun an gab es keine anderen Wirbeltiere mehr.",
    ],
    correctIndex: 1,
  },
  21: {
    question: "Warum entstanden nach dem Massenaussterben so unterschiedliche Säugetierformen?",
    options: [
      "Alle Lebensräume waren identisch geworden.",
      "Freie ökologische Nischen boten Chancen für verschiedene Lebensweisen.",
      "Jede Art erhielt gleichzeitig dieselben Merkmale.",
      "Säugetiere lebten fortan nur noch in Bäumen.",
    ],
    correctIndex: 1,
  },
  22: {
    question: "Welche Botschaft fasst das Ende der Episode am besten zusammen?",
    options: [
      "Evolution verfolgt seit Beginn einen festen Plan zum Menschen.",
      "Die Geschichte des Lebens ist abgeschlossen.",
      "Aus langen Veränderungen entstand Vielfalt – und unsere neugierige Spur ist sehr jung.",
      "Nur große Katastrophen verändern das Leben.",
    ],
    correctIndex: 2,
  },
};
