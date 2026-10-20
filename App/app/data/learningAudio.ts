import type { LearningScene } from "./learningPath";
import type { EpisodeTwoScene } from "./episode2";
import { narrationTracks } from "./narration";
import { episodeOneSceneSoundtrack } from "./episode1Videos";
import { episodeTwoSceneSoundtrack } from "./episode2CompactVisuals";
import { episodeThreeSceneAudio } from "./episode3";

export function learningAudioSource(scene: LearningScene, episode: 1 | 2 | 3): string {
  if (episode === 1) return episodeOneSceneSoundtrack(scene.id) ?? narrationTracks[scene.id];
  if (episode === 2) return episodeTwoSceneSoundtrack(scene.id) ?? (scene.original as EpisodeTwoScene).audioPath;
  return episodeThreeSceneAudio[scene.id as keyof typeof episodeThreeSceneAudio];
}
