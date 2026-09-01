const CACHE_NAME = "zeitreise-v120";
const APP_SHELL = [
  "/",
  "/episode-2/",
  "/episode-3/",
  "/tierstammbaum/",
  "/ueber/",
  "/impressum/",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
];

const SCENE_ASSETS = {
  1: [
    "/assets/episode1/scene01/hintergrund-vulkanische-kueste-neu-v1.png",
    "/assets/episode1/scene01/hintergrund-sternsystem-v1.png",
    "/assets/episode1/scene01/hintergrund-feuerplanet-v1.png",
    "/assets/episode1/scene01/sprecher-micha-v1.m4a",
    "/assets/episode1/scene01/overlay-dampf.png",
    "/assets/episode1/scene01/overlay-rauch.png",
    "/assets/episode1/scene01/overlay-glutspalten.png",
    "/assets/episode1/scene01/overlay-asche-funken.png",
    "/assets/episode1/scene01/overlay-lavafontaene.png",
  ],
  2: [
    "/assets/episode1/scene02/hintergrund-vulkanische-kueste.png",
    "/assets/episode1/scene02/overlay-dampf-rauch.png",
    "/assets/episode1/scene02/overlay-dampf.png",
    "/assets/episode1/scene02/overlay-lavafluss.png",
    "/assets/episode1/scene02/overlay-regen.png",
    "/assets/episode1/scene02/sprecher-micha-v1.m4a",
  ],
  3: [
    "/assets/episode1/scene03/hintergrund-urmeer-v1.png",
    "/assets/episode1/scene03/overlay-regen.png",
    "/assets/episode1/scene03/overlay-dampf.png",
    "/assets/episode1/scene03/sprecher-micha-v1.m4a",
  ],
  4: [
    "/assets/episode1/scene04/hintergrund-ursuppe-lagune-v1.png",
    "/assets/episode1/scene04/overlay-dampf.png",
    "/assets/episode1/scene04/overlay-hitzeflimmern.png",
    "/assets/episode1/scene04/sprecher-micha-v1.m4a",
  ],
  5: [
    "/assets/episode1/scene05/hintergrund-erste-zelle-v1.png",
    "/assets/episode1/scene05/sprecher-micha-v1.m4a",
  ],
  6: [
    "/assets/episode1/scene06/hintergrund-ausbreitung-leben-v1.png",
    "/assets/episode1/scene06/sprecher-micha-v1.m4a",
  ],
  7: [
    "/assets/episode1/scene07/hintergrund-cyanobakterien-v1.png",
    "/assets/episode1/scene07/sprecher-micha-v1.m4a",
  ],
  8: [
    "/assets/episode1/scene08/hintergrund-sauerstoffwende-v1.png",
    "/assets/episode1/scene08/sprecher-micha-v1.m4a",
  ],
  9: [
    "/assets/episode1/scene09/hintergrund-endosymbiose-v1.png",
    "/assets/episode1/scene09/sprecher-micha-v1.m4a",
  ],
  10: [
    "/assets/episode1/scene10/hintergrund-komplexe-einzeller-v1.png",
    "/assets/episode1/scene10/sprecher-und-veo-v1.m4a",
  ],
  11: [
    "/assets/episode1/scene11/hintergrund-erste-vielzeller-v1.png",
    "/assets/episode1/scene11/sprecher-und-veo-v1.m4a",
  ],
  12: [
    "/assets/episode1/scene12/hintergrund-ediacara-v1.png",
    "/assets/episode1/scene12/sprecher-micha-v1.m4a",
  ],
  13: [
    "/assets/episode1/scene13/hintergrund-kambrische-explosion-v1.png",
    "/assets/episode1/scene13/sprecher-und-veo-v1.m4a",
  ],
  14: [
    "/assets/episode1/scene14/hintergrund-erste-landpflanzen-v1.png",
    "/assets/episode1/scene14/overlay-nebel-v1.png",
    "/assets/episode1/scene14/sprecher-micha-v1.m4a",
  ],
  15: [
    "/assets/episode1/scene15/hintergrund-erste-landtiere-v1.png",
    "/assets/episode1/scene15/sprecher-und-veo-v1.m4a",
  ],
  16: [
    "/assets/episode1/scene16/hintergrund-tiktaalik-v1.png",
    "/assets/episode1/scene16/overlay-wassersplash-v1.png",
    "/assets/episode1/scene16/sprecher-und-veo-v1.m4a",
  ],
  17: [
    "/assets/episode1/scene17/hintergrund-amniotenei-v1.png",
    "/assets/episode1/scene17/sprecher-micha-v1.m4a",
  ],
  18: [
    "/assets/episode1/scene18/hintergrund-dinosaurier-v1.png",
    "/assets/episode1/scene18/overlay-wolkenschatten-v1.png",
    "/assets/episode1/scene18/sprecher-und-veo-v1.m4a",
  ],
  19: [
    "/assets/episode1/scene19/hintergrund-asteroid-morgen-v1.png",
    "/assets/episode1/scene19/overlay-meteor-v1.png",
    "/assets/episode1/scene19/sprecher-micha-v1.m4a",
  ],
  20: [
    "/assets/episode1/scene20/hintergrund-nach-einschlag-v1.png",
    "/assets/episode1/scene20/overlay-staubwolke-v1.png",
    "/assets/episode1/scene20/overlay-aschewolke-v1.png",
    "/assets/episode1/scene20/overlay-nebel-lichtet-v1.png",
    "/assets/episode1/scene20/sprecher-micha-v1.m4a",
  ],
  21: [
    "/assets/episode1/scene21/hintergrund-saeugetiere-v1.png",
    "/assets/episode1/scene21/sprecher-und-veo-v1.m4a",
  ],
  22: [
    "/assets/episode1/scene22/hintergrund-zeitfelsen-heute-v1.png",
    "/assets/episode1/scene22/sprecher-micha-v1.m4a",
  ],
};

const EPISODE_TWO_ASSETS = {
  1: [
    "/assets/episode2/scene01/hintergrund-naechster-zeitsprung-v1.png",
    "/assets/episode2/scene02/hintergrund-leben-in-den-baeumen-v1.png",
    "/assets/episode2/audio/sprecher-und-veo-szene-01-v2.m4a",
  ],
  2: [
    "/assets/episode2/scene02/hintergrund-leben-in-den-baeumen-v1.png",
    "/assets/episode2/scene03/hintergrund-welt-der-menschenaffen-v1.png",
    "/assets/episode2/audio/sprecher-und-veo-szene-02-v2.m4a",
  ],
  3: [
    "/assets/episode2/scene04/hintergrund-afrika-im-wandel-v1.png",
    "/assets/episode2/scene05/hintergrund-getrennte-wege-v1.png",
    "/assets/episode2/audio/sprecher-und-veo-szene-03-v2.m4a",
  ],
  4: [
    "/assets/episode2/scene06/hintergrund-auf-zwei-beinen-v2.png",
    "/assets/episode2/scene07/hintergrund-ardi-v1.png",
    "/assets/episode2/audio/sprecher-szene-04-v1.m4a",
  ],
  5: [
    "/assets/episode2/scene08/hintergrund-spuren-in-der-asche-v1.png",
    "/assets/episode2/scene09/hintergrund-lucy-v2.png",
    "/assets/episode2/audio/sprecher-szene-05-v1.m4a",
  ],
  6: [
    "/assets/episode2/scene10/hintergrund-stein-wird-werkzeug-v1.png",
    "/assets/episode2/audio/sprecher-szene-06-v1.m4a",
  ],
  7: [
    "/assets/episode2/scene11/hintergrund-gattung-homo-v1.png",
    "/assets/episode2/scene12/hintergrund-homo-erectus-v1.png",
    "/assets/episode2/audio/sprecher-szene-07-v1.m4a",
  ],
  8: [
    "/assets/episode2/scene13/hintergrund-erste-grosse-reise-v1.png",
    "/assets/episode2/audio/sprecher-und-veo-szene-08-v2.m4a",
  ],
  9: [
    "/assets/episode2/scene14/hintergrund-feuer-veraendert-alltag-v1.png",
    "/assets/episode2/audio/sprecher-und-veo-szene-09-v2.m4a",
  ],
  10: [
    "/assets/episode2/scene15/hintergrund-viele-arten-von-menschen-v1.png",
    "/assets/episode2/audio/sprecher-szene-10-v1.m4a",
  ],
  11: [
    "/assets/episode2/scene16/hintergrund-neandertaler-v1.png",
    "/assets/episode2/audio/sprecher-und-veo-szene-11-v2.m4a",
  ],
  12: [
    "/assets/episode2/scene17/hintergrund-denisova-v1.png",
    "/assets/episode2/audio/sprecher-szene-12-v1.m4a",
  ],
  13: [
    "/assets/episode2/scene18/hintergrund-homo-sapiens-entsteht-v2.png",
    "/assets/episode2/scene19/hintergrund-begegnungen-v1.png",
    "/assets/episode2/audio/sprecher-szene-13-v1.m4a",
  ],
  14: [
    "/assets/episode2/scene20/hintergrund-eine-menschheit-v1.png",
    "/assets/episode2/audio/sprecher-szene-14-v1.m4a",
  ],
};

const EPISODE_THREE_ASSETS = {
  1: [
    "/assets/episode3/scene01/hintergrund-zeitfelsen-heute-v1.png",
    "/assets/episode3/scene01/hintergrund-zeitfelsen-12000-vchr-v1.png",
    "/assets/episode3/audio/sprecher-und-veo-szene-01-v1.m4a",
  ],
  2: [
    "/assets/episode3/scene02/hintergrund-leben-ohne-acker-entwurf-v1.png",
    "/assets/episode3/audio/sprecher-und-veo-szene-02-v1.m4a",
  ],
  3: [
    "/assets/episode3/scene03/hintergrund-goebekli-tepe-entwurf-v1.png",
    "/assets/episode3/audio/sprecher-und-veo-szene-03-v1.m4a",
  ],
  4: [
    "/assets/episode3/scene04/hintergrund-jericho-entwurf-v1.png",
    "/assets/episode3/audio/sprecher-und-veo-szene-04-v1.m4a",
  ],
  5: [
    "/assets/episode3/scene05/hintergrund-aehre-veraendert-sich-entwurf-v1.png",
    "/assets/episode3/audio/sprecher-szene-05-v1.m4a",
  ],
  6: [
    "/assets/episode3/scene06/hintergrund-aus-jagd-wird-herde-entwurf-v1.png",
    "/assets/episode3/audio/sprecher-und-veo-szene-06-v1.m4a",
  ],
  7: [
    "/assets/episode3/scene07/hintergrund-idee-entsteht-wieder-entwurf-v1.png",
    "/assets/episode3/audio/sprecher-szene-07-v1.m4a",
  ],
  8: [
    "/assets/episode3/scene08/hintergrund-catalhoeyuek-entwurf-v1.png",
    "/assets/episode3/audio/sprecher-und-veo-szene-08-v1.m4a",
  ],
  9: [
    "/assets/episode3/scene09/hintergrund-preis-des-bleibens-entwurf-v1.png",
    "/assets/episode3/audio/sprecher-szene-09-v1.m4a",
  ],
  10: [
    "/assets/episode3/scene10/hintergrund-dorfvorrat-v1.png",
    "/assets/episode3/scene10/hintergrund-stadtspeicher-v1.png",
    "/assets/episode3/audio/sprecher-szene-10-v1.m4a",
  ],
  11: [
    "/assets/episode3/scene12/hintergrund-nahrungsanlieferung-v1.png",
    "/assets/episode3/scene12/hintergrund-spezialisierte-werkstaetten-v1.png",
    "/assets/episode3/audio/sprecher-szene-11-v1.m4a",
  ],
  12: [
    "/assets/episode3/audio/sprecher-szene-12-v1.m4a",
  ],
  13: [
    "/assets/episode3/scene14/hintergrund-rationsverwaltung-v1.png",
    "/assets/episode3/scene13/hintergrund-listenmacht-v1.png",
    "/assets/episode3/audio/sprecher-szene-13-v1.m4a",
  ],
  14: [
    "/assets/episode3/scene11/hintergrund-uruk-kanalstadt-v1.png",
    "/assets/episode3/audio/sprecher-und-veo-szene-14-v1.m4a",
  ],
  15: [
    "/assets/episode3/scene15/hintergrund-gemeinschaftsarbeit-v1.png",
    "/assets/episode3/scene15/hintergrund-macht-buendelt-sich-v1.png",
    "/assets/episode3/audio/sprecher-szene-15-v1.m4a",
  ],
};

self.addEventListener("message", (event) => {
  if (event.data?.type !== "CACHE_SCENES") return;

  const source = event.data.episode === 3
    ? EPISODE_THREE_ASSETS
    : event.data.episode === 2
      ? EPISODE_TWO_ASSETS
      : SCENE_ASSETS;
  const assets = (event.data.sceneIds ?? []).flatMap(
    (sceneId) => source[sceneId] ?? [],
  );

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([...new Set(assets)])),
  );
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();

      if (CACHE_NAME === "zeitreise-v117") {
        const windows = await self.clients.matchAll({
          type: "window",
          includeUncontrolled: true,
        });
        await Promise.all(
          windows.map((client) => {
            const url = new URL(client.url);
            url.searchParams.set("zeitreise-update", CACHE_NAME);
            return client.navigate(url.href).catch(() => undefined);
          }),
        );
      }
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  const isStreamingVideo =
    requestUrl.pathname.startsWith("/assets/") &&
    /\.(?:mp4|mov|m4v)$/i.test(requestUrl.pathname);
  if (isStreamingVideo) {
    event.respondWith(fetch(event.request));
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(requestUrl.pathname, copy));
          return response;
        })
        .catch(
          async () =>
            (await caches.match(requestUrl.pathname)) ??
            (await caches.match("/")),
        ),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200) return response;
        const copy = response.clone();
        caches
          .open(CACHE_NAME)
          .then((cache) => cache.put(event.request, copy));
        return response;
      });
    }),
  );
});
