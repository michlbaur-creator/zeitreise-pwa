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
    duration: 25,
    durationLabel: "25 s",
    timeLabel: "Vor mehr als 4 Milliarden Jahren",
    speaker:
      "Stell dir vor, du landest auf der Erde kurz nach ihrer Entstehung. Für einen Spaziergang ist das ein ziemlich ungünstiger Zeitpunkt: Unter dir glüht Gestein, Vulkane schleudern heiße Gase und Asche in die Luft. Wasser, Pflanzen oder Tiere suchst du vergeblich. Unsere Geschichte beginnt auf einem jungen Planeten, der mit der heutigen Erde noch wenig gemeinsam hat.",
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
      question: "Wie sah die Erde unmittelbar nach ihrer Entstehung aus?",
      options: [
        "Von Wäldern bedeckt",
        "Von einem riesigen Ozean bedeckt",
        "Glühend heiß mit vielen Vulkanen",
        "Voller Dinosaurier",
      ],
      correctIndex: 2,
    },
    transition:
      "Der Kamerazoom läuft weiter. Der Bildschirm verdunkelt sich langsam. Leichter Dampfschleier zieht auf. Überblendung in EP01_S02.",
    directorNote:
      "Die Episode beginnt mit der Kinderhand am Zeitfelsen. Ein warmes, goldenes Schimmern führt ohne sichtbare Person in die junge Erde.",
  },
  {
    id: 2,
    title: "Die Erde kühlt langsam ab",
    duration: 22,
    durationLabel: "ca. 22 Sekunden",
    timeLabel: "Vor etwa 4,4 Milliarden Jahren",
    speaker:
      "Zum Glück bleibt die Erde nicht ewig so heiß. Ihre Oberfläche kühlt ab, in der dichten Atmosphäre sammelt sich Wasserdampf, und gewaltige Wolken entstehen. Dann beginnt es zu regnen – nicht nur bis morgen, sondern über sehr lange Zeiträume immer wieder. Das Wasser prasselt auf Gestein und Lava. Deine Regenjacke dürfte dabei trotzdem ziemlich schnell aufgeben.",
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
      question: "Warum konnte es überhaupt regnen?",
      options: [
        "Weil Pflanzen Wasser verdunsteten.",
        "Weil es bereits Meere gab.",
        "Weil Wasserdampf in der Atmosphäre abkühlte und kondensierte.",
        "Weil der Mond Wasser auf die Erde zog.",
      ],
      correctIndex: 2,
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
    duration: 24,
    durationLabel: "ca. 24 Sekunden",
    timeLabel: "Vor etwa 4,4 Milliarden Jahren",
    speaker:
      "Vor dir sammelt sich das Regenwasser in Senken. Aus Seen werden Meere, und schließlich bedecken gewaltige Ozeane einen großen Teil der Erde. Noch schwimmt kein Fisch darin; nicht einmal eine Alge ist zu sehen. Doch jetzt besitzt die Erde etwas Entscheidendes: flüssiges Wasser. Darin können sich Stoffe lösen und miteinander reagieren. Die Bühne ist bereit – nur die Hauptdarsteller fehlen noch.",
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
      question: "Was war die wichtigste Bedeutung der ersten Ozeane?",
      options: [
        "Sie entstanden erst nach den Dinosauriern.",
        "Sie bestanden ausschließlich aus Süßwasser.",
        "Sie schufen die Voraussetzung für die Entstehung des Lebens.",
        "Sie bedeckten nur kleine Gebirgsseen.",
      ],
      correctIndex: 2,
    },
    transition:
      "Die Kamera folgt der Wasseroberfläche langsam in Richtung Horizont. Das Bild wird heller. Eine sanfte Überblendung führt in Szene 4 - Die Ursuppe, wo im warmen Flachwasser die ersten komplexen chemischen Verbindungen entstehen.",
    mediaNote:
      "Während der letzten acht Sekunden reißt die Wolkendecke leicht auf. Ein warmer Sonnenstrahl fällt auf die Wasseroberfläche. Die Wellen reflektieren das Licht. Der Zuschauer soll spüren: Jetzt beginnt ein neues Kapitel der Erdgeschichte.",
  },
  {
    id: 4,
    title: "Die Ursuppe - Wo alles begann",
    duration: 28,
    durationLabel: "ca. 28 Sekunden",
    timeLabel: "Vor etwa 4 Milliarden Jahren",
    speaker:
      "Schau genau hin: Noch lebt hier nichts. Im warmen Wasser treiben Mineralstoffe und einfache Moleküle. Blitze, Vulkanwärme und Sonnenlicht liefern Energie, sodass immer komplexere Verbindungen entstehen können. Eine fertige Zelle hüpft natürlich nicht plötzlich aus der Ursuppe. Wie aus Chemie der erste Schritt zum Leben wurde, ist bis heute eine der großen offenen Fragen.",
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
      question: "Welche Stoffe brauchten die ersten chemischen Reaktionen?",
      options: [
        "Dinosaurier und Pflanzen",
        "Nur Sauerstoff",
        "Wasser, gelöste Stoffe und Energie",
        "Fische und Algen",
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
    duration: 30,
    durationLabel: "ca. 30 Sekunden",
    timeLabel: "Vor mindestens 3,5 Milliarden Jahren",
    speaker:
      "Jetzt wird es winzig – so winzig, dass du ohne Mikroskop keine Chance hättest. Zwischen Mineralien können sich membranähnliche Bläschen bilden. Solche Hüllen grenzen ein Inneres von der Umgebung ab und erleichtern chemische Reaktionen. Wie daraus erste echte Zellen entstanden, wissen wir nicht genau. Doch irgendwann gibt es etwas, das sich erhalten und vermehren kann: Leben.",
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
      question: "Was unterschied die ersten Zellen von den Molekülen davor?",
      options: [
        "Sie waren bereits Tiere.",
        "Sie konnten fliegen.",
        "Sie waren durch eine Membran von ihrer Umgebung abgegrenzt.",
        "Sie bestanden aus Stein.",
      ],
      correctIndex: 2,
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
    duration: 26,
    durationLabel: "ca. 26 Sekunden",
    timeLabel: "Vor etwa 3,5 Milliarden Jahren",
    speaker:
      "Du siehst eine einzelne Zelle. Nicht gerade spektakulär – bis sie ihren entscheidenden Trick zeigt: Sie wächst und teilt sich. Aus einer werden zwei, aus zwei vier, und bald wird es im Urmeer erstaunlich voll. Manche Zellen haften an Felsen, andere treiben frei im Wasser. Das Leben ist noch einfach, aber es breitet sich aus.",
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
      question: "Wie vermehrten sich die ersten Einzeller?",
      options: ["Durch Samen", "Durch Eier", "Durch Zellteilung", "Gar nicht"],
      correctIndex: 2,
    },
    mediaNote:
      "Zum ersten Mal entstehen kleine Zellkolonien. Einige Zellen haften an einem Felsen. Andere treiben frei im Wasser. Langsame Zellteilungen sorgen für Bewegung, ohne hektisch zu wirken.",
  },
  {
    id: 7,
    title: "Die Erfinder des Sauerstoffs",
    duration: 30,
    durationLabel: "ca. 30 Sekunden",
    timeLabel: "Vor mindestens 2,4 Milliarden Jahren",
    speaker:
      "Vor dir arbeiten winzige Sonnenkraftwerke: Cyanobakterien. Sie nutzen Licht, Wasser und Kohlendioxid, um energiereiche Stoffe aufzubauen. Dabei entsteht Sauerstoff, zunächst nur in kleinen Bläschen. Du atmest dieses Gas gerade ganz selbstverständlich ein. Für die damalige Erde ist es jedoch eine völlig neue Zutat – und sie wird fast alles verändern.",
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
        "Welches Gas entstand bei der Photosynthese der Cyanobakterien?",
      options: ["Stickstoff", "Kohlendioxid", "Sauerstoff", "Methan"],
      correctIndex: 2,
    },
    transition:
      "Die Kamera folgt einer Sauerstoffblase bis an die Wasseroberfläche. Beim Platzen der Blase wechselt die Perspektive. Wir verlassen erstmals das Meer und blicken in den Himmel.",
    mediaNote:
      "An einer Cyanobakterienmatte entstehen winzige Bläschen. Zunächst vereinzelt. Dann immer mehr. Sie steigen langsam nach oben. Die Kamera folgt einer einzelnen Blase bis zur Wasseroberfläche.",
  },
  {
    id: 8,
    title: "Die Sauerstoff-Revolution",
    duration: 30,
    durationLabel: "ca. 30 Sekunden",
    timeLabel: "Vor etwa 2,4 Milliarden Jahren",
    speaker:
      "Was du hier siehst, verändert die ganze Erde. Der Sauerstoff gelangt nicht sofort in die Luft, sondern reagiert zunächst mit gelösten Stoffen und Gesteinen im Meer. Erst nach sehr langer Zeit sammelt er sich in der Atmosphäre. Für viele Mikroorganismen ist er giftig, andere nutzen ihn zur Energiegewinnung. Später entsteht die schützende Ozonschicht. Die Erde bekommt buchstäblich neue Luft.",
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
      question: "Warum war der Anstieg des Sauerstoffs so bedeutsam?",
      options: [
        "Er machte die Ozeane salzig.",
        "Er ließ den Mond entstehen.",
        "Er veränderte die Atmosphäre und ermöglichte später komplexes Leben.",
        "Er kühlte die Sonne ab.",
      ],
      correctIndex: 2,
    },
    directorNote:
      "Szene 8 beendet den ersten großen Akt. Der Übergang zur mikroskopischen Zellwelt von Szene 9 erfolgt langsam und ohne neue Erklärungsebene.",
    mediaNote:
      "Der Himmel verändert sich fast unmerklich: gelblich-grau, heller, zunehmend blau. Gleichzeitig wird das Sonnenlicht klarer und intensiver. Der Zuschauer erlebt den Wandel, statt nur davon zu hören.",
  },
  {
    id: 9,
    title: "Die Revolution in der Zelle",
    duration: 32,
    durationLabel: "ca. 32 Sekunden",
    timeLabel: "Vor etwa 1,8 Milliarden Jahren",
    speaker:
      "Pass auf: Jetzt beginnt eine der folgenreichsten Wohngemeinschaften der Erdgeschichte. Eine größere Zelle nimmt ein Bakterium auf, verdaut es aber nicht. Beide profitieren voneinander und bleiben zusammen. Aus den Nachfahren solcher Bakterien werden im Lauf der Evolution die Mitochondrien – die Kraftwerke fast aller Zellen in deinem Körper. Eine Zweck-WG, die seit mehr als einer Milliarde Jahren bestens läuft.",
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
      question: "Was entstand aus der aufgenommenen Bakterienzelle?",
      options: [
        "Der Zellkern",
        "Die Zellwand",
        "Das Mitochondrium",
        "Der Zellsaft",
      ],
      correctIndex: 2,
    },
    transition:
      "Die Kamera zoomt langsam aus der Zelle heraus. Immer mehr ähnliche Zellen erscheinen. Die Welt wirkt plötzlich vielfältiger.",
    mediaNote:
      "Die kleinere Zelle wird langsam umschlossen. Im Inneren bewegt sie sich weiter. Nach kurzer Zeit beginnen beide synchron zu arbeiten. Keine Effekte - nur natürliche Bewegungen.",
  },
  {
    id: 10,
    title: "Die ersten komplexen Lebewesen",
    duration: 30,
    durationLabel: "ca. 30 Sekunden",
    timeLabel: "Vor etwa 1,5 Milliarden Jahren",
    speaker:
      "Mit solchen komplexeren Zellen wird das Leben vielseitiger. Du siehst Formen, die sich bewegen, Nahrung aufnehmen oder Kolonien bilden. Die Evolution folgt dabei keinem Bauplan und probiert nicht bewusst herum. Zufällige erbliche Veränderungen und natürliche Auslese genügen. Über viele Generationen entstehen daraus immer neue Fähigkeiten und Lebensweisen – ganz ohne Projektleitung.",
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
        "Was unterscheidet Eukaryoten von den ersten einfachen Zellen?",
      options: [
        "Sie bestehen aus Stein.",
        "Sie leben nur an Land.",
        "Sie besitzen einen Zellkern und weitere Zellorganellen.",
        "Sie können nicht wachsen.",
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
    duration: 30,
    durationLabel: "ca. 30 Sekunden",
    timeLabel: "Vor mehr als 1 Milliarde Jahren",
    speaker:
      "Manche Zellen trennen sich nach der Teilung nicht mehr vollständig. Sie bleiben zusammen, verständigen sich und teilen Aufgaben untereinander auf. Du kannst dir das wie ein Team vorstellen, in dem nicht jede Zelle alles können muss. So entstehen vielzellige Lebewesen. Teamarbeit ist also keine moderne Erfindung – die Evolution kennt sie schon seit sehr langer Zeit.",
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
      question: "Warum war Vielzelligkeit ein Vorteil?",
      options: [
        "Mehr Beine",
        "Mehr Augen",
        "Arbeitsteilung zwischen den Zellen",
        "Schnellere Fortbewegung",
      ],
      correctIndex: 2,
    },
    transition:
      "Die Zellverbände werden größer. Aus den kleinen Kolonien entstehen die ersten einfachen Tiere.",
  },
  {
    id: 12,
    title: "Die ersten Tiere",
    duration: 32,
    durationLabel: "ca. 32 Sekunden",
    timeLabel: "Vor rund 570 Millionen Jahren",
    speaker:
      "Wenn du hier schnorcheln könntest, würdest du vermutlich fragen: Sind das wirklich Tiere? Einige wahrscheinlich ja, andere lassen sich bis heute schwer einordnen. Sie haben weder Zähne noch Augen noch Beine und erinnern an Kissen, Blätter oder gerippte Matten. Willkommen in der Ediacara-Welt – einem Meer voller großer, weicher und ziemlich rätselhafter Lebewesen.",
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
      question: "Wodurch unterschieden sich diese Tiere von späteren?",
      options: [
        "Sie konnten fliegen.",
        "Sie lebten an Land.",
        "Sie waren sehr einfach gebaut und meist weich.",
      ],
      correctIndex: 2,
    },
    transition:
      "Der Meeresboden wird plötzlich lebendiger. Immer mehr unterschiedliche Tiere erscheinen.",
  },
  {
    id: 13,
    title: "Die Kambrische Explosion",
    duration: 35,
    durationLabel: "ca. 35 Sekunden",
    timeLabel: "Vor rund 540 Millionen Jahren",
    speaker:
      "Und plötzlich … nein, eigentlich nicht plötzlich. Evolution braucht Zeit. Geologisch gesehen nimmt die Vielfalt der Tiere nun jedoch erstaunlich schnell zu. Im Meer erscheinen Augen, Panzer, Greifarme und viele neue Körperformen. Räuber verfolgen Beute, andere Tiere graben im Boden oder schützen sich mit harten Schalen. Du erlebst die sogenannte Kambrische Explosion – ohne dass dabei etwas explodiert.",
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
      question: "Was geschah während der Kambrischen Explosion?",
      options: [
        "Die Dinosaurier entstanden.",
        "Die Erde kühlte sich ab.",
        "Die Vielfalt der Tierformen nahm stark zu.",
        "Die ersten Wälder entstanden.",
      ],
      correctIndex: 2,
    },
    transition:
      "Die Kamera folgt einem Trilobiten. Er verschwindet hinter einem Felsen. Beim Auftauchen hat sich die Welt erneut verändert.",
  },
  {
    id: 14,
    title: "Der Sprung an Land",
    duration: 40,
    durationLabel: "ca. 40 Sekunden",
    timeLabel: "Vor etwa 470 Millionen Jahren",
    speaker:
      "Irgendwann schaut sich eine kleine Pflanze das Festland an und denkt sich: „Sieht eigentlich ganz gemütlich aus.“ Mutig! Denn hier oben gibt’s weder Bademeister noch Nachschub aus dem Meer. Aber der Plan geht auf. Immer mehr Pflanzen ziehen an Land und machen aus grauen Felsen langsam eine grüne Welt. Ganz nebenbei bereiten sie das größte Buffet der Erdgeschichte vor.",
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
      question: "Warum war die Besiedlung des Landes so wichtig?",
      options: [
        "Weil dort bereits Dinosaurier lebten.",
        "Weil das Meer verschwand.",
        "Weil dadurch völlig neue Lebensräume entstanden.",
        "Weil Pflanzen dort schneller schwimmen konnten.",
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
    duration: 45,
    durationLabel: "ca. 45 Sekunden",
    timeLabel: "Vor etwa 430 Millionen Jahren",
    speaker:
      "Wo’s etwas zu futtern gibt, dauert’s bekanntlich nicht lange … Kaum haben die Pflanzen das Land begrünt, stehen auch schon die ersten Gäste vor der Tür. Zugegeben – besonders elegant sieht das noch nicht aus. Eher wie: „Laufen? Muss ich das erst üben?“ Aber genau mit diesen wackeligen ersten Schritten beginnt eine völlig neue Erfolgsgeschichte.",
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
      question: "Warum konnten Tiere jetzt an Land leben?",
      options: [
        "Weil dort schon Wälder standen.",
        "Weil Dinosaurier sie beschützten.",
        "Weil Pflanzen bereits Lebensraum und Nahrung boten.",
        "Weil das Meer verschwunden war.",
      ],
      correctIndex: 2,
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
    duration: 40,
    durationLabel: "ca. 40 Sekunden",
    timeLabel: "Devon, vor etwa 375 Millionen Jahren",
    speaker:
      "Jetzt wird es spannend. Dieser Fisch wirkt, als hätte er für das Flachwasser eine Sonderausstattung bekommen: einen beweglichen Hals, kräftige Flossen und stabile Rippen. Tiktaalik kann sich im seichten Wasser abstützen und möglicherweise über schlammigen Grund bewegen. Er ist nicht das erste Tier an Land. Aber an ihm erkennst du, wie sich aus Fischmerkmalen schrittweise die Bauweise früher Landwirbeltiere entwickelt.",
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
      question: "Warum ist Tiktaalik so berühmt?",
      options: [
        "Er war der erste Dinosaurier.",
        "Er konnte bereits fliegen.",
        "Er zeigt Merkmale von Fischen und frühen Landwirbeltieren.",
        "Er lebte schon zusammen mit dem Menschen.",
      ],
      correctIndex: 2,
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
    duration: 40,
    durationLabel: "ca. 40 Sekunden",
    timeLabel: "Vor etwa 320 Millionen Jahren",
    speaker:
      "Der erste Ausflug an Land hat offenbar Spaß gemacht. Jetzt wollen manche Tiere gleich ganz umziehen. Die Amphibien sind schon ziemlich mutig … fürs Kinderzimmer brauchen sie aber immer noch Wasser. Die Reptilien lösen das Problem ziemlich clever: Sie bringen ihr eigenes „Kinderzimmer“ einfach mit – das Ei. Nicht schlecht, Natur. Wirklich nicht schlecht.",
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
      question: "Warum war das Amniotenei so revolutionär?",
      options: [
        "Es war größer als frühere Eier.",
        "Es konnte schwimmen.",
        "Es ermöglichte die Fortpflanzung unabhängig vom Wasser.",
        "Es schlüpfte schneller.",
      ],
      correctIndex: 2,
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
    duration: 60,
    durationLabel: "ca. 60 Sekunden",
    timeLabel: "Vor etwa 230 Millionen Jahren",
    speaker:
      "Tadaaa! Jetzt betreten die absoluten Superstars der Urzeit die Bühne. Willkommen im Zeitalter der Giganten! Hier läuft alles herum – von winzigen Jägern bis zu Pflanzenfressern, die locker aus dem dritten Stock die Dachrinne putzen könnten. Und weißt du was? Die Dinosaurier bleiben nicht ein paar Jahre … nicht ein paar Millionen Jahre … sondern fast 170 Millionen Jahre. Dagegen ist die Menschheit gerade erst eingezogen.",
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
    ],
    quiz: {
      question: "Wie lange beherrschten Dinosaurier ungefähr die Erde?",
      options: [
        "etwa 10 Millionen Jahre",
        "etwa 50 Millionen Jahre",
        "rund 170 Millionen Jahre",
        "bis heute",
      ],
      correctIndex: 2,
    },
    discovery: {
      label: "Forscherblick",
      prompt: "Wer entdeckt zuerst?",
      items: [
        "einen kleinen Pflanzenfresser",
        "einen Fleischfresser im Hintergrund",
        "einen Ginkgo-Baum",
        "eine Libelle",
        "einen Flugsaurier am Himmel (Zusatz: Flugsaurier waren keine Dinosaurier, sondern eine eigene Reptiliengruppe.)",
      ],
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
    duration: 50,
    durationLabel: "ca. 50 Sekunden",
    timeLabel: "Vor etwa 66 Millionen Jahren",
    speaker:
      "Es beginnt wie ein gewöhnlicher Morgen. Du siehst Tiere am Wasser und einen winzigen Lichtpunkt am Himmel. Doch dieser Punkt ist ein mehrere Kilometer großer Asteroid. Er schlägt im Gebiet des heutigen Mexiko ein. Staub und Ruß verdunkeln die Atmosphäre, Pflanzen sterben, Nahrungsketten brechen zusammen. Viele Tiergruppen verschwinden. Nicht alle Dinosaurier: Die Vögel überleben – für die übrigen endet hier ihre Zeit.",
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
      question: "Warum war der Asteroid so folgenschwer?",
      options: [
        "Er ließ alle Ozeane verdampfen.",
        "Er zerstörte nur den Einschlagsort.",
        "Er veränderte das Klima weltweit und brachte viele Nahrungsketten zum Zusammenbruch.",
        "Er spaltete die Erde in zwei Hälften.",
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
    duration: 35,
    durationLabel: "ca. 35 Sekunden",
    timeLabel: "Vor etwa 65 Millionen Jahren",
    speaker:
      "Nach der Katastrophe wirkt die Erde beinahe leer. Doch wenn du genau hinsiehst, raschelt es unter einem Baumstamm. Kleine Säugetiere haben überlebt. Sie brauchen wenig Nahrung, können sich verstecken und kommen mit wechselnden Bedingungen zurecht. Nun werden viele Lebensräume frei. Aus diesen unscheinbaren Überlebenden entwickeln sich im Lauf der Zeit unzählige neue Formen. Manchmal beginnt etwas Großes tatsächlich sehr klein.",
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
    directorNote:
      "Nach der Schwarzblende erscheint der aschebedeckte Zeitfelsen als stiller Zeuge. Erst danach entdeckt die Kamera das kleine Säugetier.",
  },
  {
    id: 21,
    title: "Ein kleiner Schritt für ein Säugetier ...",
    duration: 40,
    durationLabel: "ca. 40 Sekunden",
    timeLabel: "Vor etwa 60 Millionen Jahren",
    speaker:
      "Dieses kleine Säugetier hättest du bisher wahrscheinlich kaum beachtet. Es ist winzig und unscheinbar – aber seine Verwandtschaft steht vor einer großen Zukunft. Manche Säugetiere leben später in Bäumen, andere im Wasser oder in offenen Landschaften. Und unter ihren fernen Nachkommen entsteht schließlich eine Art, die Werkzeuge baut, Feuer nutzt und Fragen über ihre eigene Geschichte stellt. Kommt dir das bekannt vor?",
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
      question: "Warum konnten sich Säugetiere jetzt stark ausbreiten?",
      options: [
        "Weil sie plötzlich fliegen konnten.",
        "Weil alle anderen Tiere verschwanden.",
        "Weil viele ökologische Nischen frei wurden.",
        "Weil die Erde kleiner wurde.",
      ],
      correctIndex: 2,
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
    duration: 50,
    durationLabel: "ca. 50 Sekunden",
    timeLabel: "Heute",
    speaker:
      "Viereinhalb Milliarden Jahre – kaum vorstellbar, oder? Aus glühendem Gestein wurden Ozeane; aus einfachen Zellen entstand eine überwältigende Vielfalt. Dinosaurier kamen und gingen, Säugetiere nutzten neue Chancen, und irgendwann wurdest auch du Teil dieser Geschichte. Nicht als Endpunkt der Evolution, sondern als Teil eines ihrer vielen Zweige. Deine Hand liegt wieder auf dem Zeitfelsen. Die Reise endet hier. Der nächste Zeitsprung wartet.",
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
    directorNote:
      "Im Abschluss wird kein Mensch gezeigt. Sichtbar ist nur die Kinderhand am Zeitfelsen. Damit schließt sich der Kreis zum Beginn der Episode.",
    mediaNote:
      "Die Hand liegt auf dem Zeitfelsen. Der Felsen beginnt ganz leicht zu leuchten. Keine große Animation. Nur ein warmes, goldenes Schimmern. Langsam erscheint der Schriftzug „Zeitreise - Die Geschichte des Lebens“. Darunter: Episode 2 „Das Zeitalter der Giganten“.",
  },
];

export const totalDuration = scenes.reduce(
  (sum, scene) => sum + scene.duration,
  0,
);
