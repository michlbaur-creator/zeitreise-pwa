export type EpisodeOneSceneVideo = {
  sceneId: number;
  src: string;
  poster: string;
  playback: "loop" | "hold";
  soundtrack: string;
};

export const episodeOneSceneVideos: EpisodeOneSceneVideo[] = [
  {
    sceneId: 10,
    src: "/assets/episode1/scene10/bewegung-komplexe-einzeller-veo-v1.mp4",
    poster: "/assets/episode1/scene10/hintergrund-komplexe-einzeller-v1.png",
    playback: "loop",
    soundtrack: "/assets/episode1/scene10/sprecher-und-veo-v1.m4a",
  },
  {
    sceneId: 11,
    src: "/assets/episode1/scene11/bewegung-zellverbaende-veo-v1.mp4",
    poster: "/assets/episode1/scene11/hintergrund-erste-vielzeller-v1.png",
    playback: "loop",
    soundtrack: "/assets/episode1/scene11/sprecher-und-veo-v1.m4a",
  },
  {
    sceneId: 13,
    src: "/assets/episode1/scene13/bewegung-kambrium-veo-v1.mp4",
    poster: "/assets/episode1/scene13/hintergrund-kambrische-explosion-v1.png",
    playback: "loop",
    soundtrack: "/assets/episode1/scene13/sprecher-und-veo-v1.m4a",
  },
  {
    sceneId: 15,
    src: "/assets/episode1/scene15/bewegung-landtiere-veo-v1.mp4",
    poster: "/assets/episode1/scene15/hintergrund-erste-landtiere-v1.png",
    playback: "loop",
    soundtrack: "/assets/episode1/scene15/sprecher-und-veo-v1.m4a",
  },
  {
    sceneId: 16,
    src: "/assets/episode1/scene16/bewegung-tiktaalik-veo-v1.mp4",
    poster: "/assets/episode1/scene16/hintergrund-tiktaalik-v1.png",
    playback: "hold",
    soundtrack: "/assets/episode1/scene16/sprecher-und-veo-v1.m4a",
  },
  {
    sceneId: 18,
    src: "/assets/episode1/scene18/bewegung-dinosaurier-veo-v1.mp4",
    poster: "/assets/episode1/scene18/hintergrund-dinosaurier-v1.png",
    playback: "loop",
    soundtrack: "/assets/episode1/scene18/sprecher-und-veo-v1.m4a",
  },
  {
    sceneId: 21,
    src: "/assets/episode1/scene21/bewegung-saeugetiere-veo-v1.mp4",
    poster: "/assets/episode1/scene21/hintergrund-saeugetiere-v1.png",
    playback: "loop",
    soundtrack: "/assets/episode1/scene21/sprecher-und-veo-v1.m4a",
  },
];

export function episodeOneSceneVideo(sceneId: number) {
  return episodeOneSceneVideos.find((video) => video.sceneId === sceneId);
}

export function episodeOneSceneHasVideo(sceneId: number) {
  return Boolean(episodeOneSceneVideo(sceneId));
}

export function episodeOneSceneSoundtrack(sceneId: number) {
  return episodeOneSceneVideo(sceneId)?.soundtrack;
}
