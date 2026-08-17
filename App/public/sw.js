const CACHE_NAME = "zeitreise-v53";
const APP_SHELL = [
  "/",
  "/tierstammbaum/",
  "/ueber/",
  "/impressum/",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/assets/site/michael-baur-garten.jpg",
  "/assets/episode1/scene01/hintergrund-vulkanische-kueste.png",
  "/assets/episode1/scene01/hintergrund-vulkanische-kueste-neu-v1.png",
  "/assets/episode1/scene01/hintergrund-sternsystem-v1.png",
  "/assets/episode1/scene01/hintergrund-feuerplanet-v1.png",
  "/assets/episode1/scene01/sprecher-micha-v1.m4a",
  "/assets/episode1/scene01/overlay-dampf.png",
  "/assets/episode1/scene01/overlay-rauch.png",
  "/assets/episode1/scene01/overlay-glutspalten.png",
  "/assets/episode1/scene01/overlay-asche-funken.png",
  "/assets/episode1/scene01/overlay-lavafontaene.png",
  "/assets/episode1/scene02/hintergrund-vulkanische-kueste.png",
  "/assets/episode1/scene02/overlay-dampf-rauch.png",
  "/assets/episode1/scene02/overlay-dampf.png",
  "/assets/episode1/scene02/overlay-lavafluss.png",
  "/assets/episode1/scene02/overlay-regen.png",
  "/assets/episode1/scene02/sprecher-micha-v1.m4a",
  "/assets/episode1/scene03/hintergrund-urmeer-v1.png",
  "/assets/episode1/scene03/overlay-regen.png",
  "/assets/episode1/scene03/overlay-dampf.png",
  "/assets/episode1/scene03/sprecher-micha-v1.m4a",
  "/assets/episode1/scene04/hintergrund-ursuppe-lagune-v1.png",
  "/assets/episode1/scene04/overlay-dampf.png",
  "/assets/episode1/scene04/overlay-hitzeflimmern.png",
  "/assets/episode1/scene04/sprecher-micha-v1.m4a",
  "/assets/episode1/scene05/hintergrund-erste-zelle-v1.png",
  "/assets/episode1/scene05/sprecher-micha-v1.m4a",
  "/assets/episode1/scene06/hintergrund-ausbreitung-leben-v1.png",
  "/assets/episode1/scene06/sprecher-micha-v1.m4a",
  "/assets/episode1/scene07/hintergrund-cyanobakterien-v1.png",
  "/assets/episode1/scene07/sprecher-micha-v1.m4a",
  "/assets/episode1/scene08/hintergrund-sauerstoffwende-v1.png",
  "/assets/episode1/scene08/sprecher-micha-v1.m4a",
  "/assets/episode1/scene09/hintergrund-endosymbiose-v1.png",
  "/assets/episode1/scene09/sprecher-micha-v1.m4a",
  "/assets/episode1/scene10/hintergrund-komplexe-einzeller-v1.png",
  "/assets/episode1/scene10/sprecher-micha-v1.m4a",
  "/assets/episode1/scene11/hintergrund-erste-vielzeller-v1.png",
  "/assets/episode1/scene11/sprecher-micha-v1.m4a",
  "/assets/episode1/scene12/hintergrund-ediacara-v1.png",
  "/assets/episode1/scene12/sprecher-micha-v1.m4a",
  "/assets/episode1/scene13/hintergrund-kambrische-explosion-v1.png",
  "/assets/episode1/scene13/sprecher-micha-v1.m4a",
  "/assets/episode1/scene14/hintergrund-erste-landpflanzen-v1.png",
  "/assets/episode1/scene14/overlay-nebel-v1.png",
  "/assets/episode1/scene14/sprecher-micha-v1.m4a",
  "/assets/episode1/scene15/hintergrund-erste-landtiere-v1.png",
  "/assets/episode1/scene15/sprecher-micha-v1.m4a",
  "/assets/episode1/scene16/hintergrund-tiktaalik-v1.png",
  "/assets/episode1/scene16/overlay-wassersplash-v1.png",
  "/assets/episode1/scene16/sprecher-micha-v1.m4a",
  "/assets/episode1/scene17/hintergrund-amniotenei-v1.png",
  "/assets/episode1/scene17/sprecher-micha-v1.m4a",
  "/assets/episode1/scene18/hintergrund-dinosaurier-v1.png",
  "/assets/episode1/scene18/overlay-wolkenschatten-v1.png",
  "/assets/episode1/scene18/sprecher-micha-v1.m4a",
  "/assets/episode1/scene19/hintergrund-asteroid-morgen-v1.png",
  "/assets/episode1/scene19/overlay-meteor-v1.png",
  "/assets/episode1/scene19/sprecher-micha-v1.m4a",
  "/assets/episode1/scene20/hintergrund-nach-einschlag-v1.png",
  "/assets/episode1/scene20/overlay-staubwolke-v1.png",
  "/assets/episode1/scene20/overlay-aschewolke-v1.png",
  "/assets/episode1/scene20/overlay-nebel-lichtet-v1.png",
  "/assets/episode1/scene20/sprecher-micha-v1.m4a",
  "/assets/episode1/scene21/hintergrund-saeugetiere-v1.png",
  "/assets/episode1/scene21/sprecher-micha-v1.m4a",
  "/assets/episode1/scene22/hintergrund-zeitfelsen-heute-v1.png",
  "/assets/episode1/scene22/sprecher-micha-v1.m4a",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

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
