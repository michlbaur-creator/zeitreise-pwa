export const narrationVoice = {
  provider: "OpenAI",
  model: "gpt-4o-mini-tts",
  voice: "cedar",
  displayName: "Cedar",
  character: "Männlich · warm und natürlich",
  language: "Deutsch",
  disclosure: "KI-generierte Stimme",
  direction:
    "Warm, klar und natürlich. Neugierig, freundlich und leicht humorvoll, niemals belehrend. Direkte Du-Ansprache, ruhiges mittleres Tempo, deutliche Aussprache und kurze natürliche Pausen.",
} as const;

export const michaNarrationVoice = {
  provider: "Originalaufnahme",
  model: "persönlich eingesprochen",
  voice: "micha",
  displayName: "Micha",
  displayLabel: "Micha",
  character: "Persönlich · warm und natürlich",
  language: "Deutsch",
  disclosure: "persönlich eingesprochen",
  direction:
    "Natürlich, freundlich und humorvoll. Direkte Du-Ansprache mit persönlichen Betonungen und Sprechpausen.",
} as const;

export function narrationVoiceForScene(sceneId: number) {
  void sceneId;
  return michaNarrationVoice;
}

export const narrationTracks: Record<number, string> = {
  1: "/assets/episode1/scene01/sprecher-micha-v1.m4a",
  2: "/assets/episode1/scene02/sprecher-micha-v1.m4a",
  3: "/assets/episode1/scene03/sprecher-micha-v1.m4a",
  4: "/assets/episode1/scene04/sprecher-micha-v1.m4a",
  5: "/assets/episode1/scene05/sprecher-micha-v1.m4a",
  6: "/assets/episode1/scene06/sprecher-micha-v1.m4a",
  7: "/assets/episode1/scene07/sprecher-micha-v1.m4a",
  8: "/assets/episode1/scene08/sprecher-micha-v1.m4a",
  9: "/assets/episode1/scene09/sprecher-micha-v1.m4a",
  10: "/assets/episode1/scene10/sprecher-micha-v1.m4a",
  11: "/assets/episode1/scene11/sprecher-micha-v1.m4a",
  12: "/assets/episode1/scene12/sprecher-micha-v1.m4a",
  13: "/assets/episode1/scene13/sprecher-micha-v1.m4a",
  14: "/assets/episode1/scene14/sprecher-micha-v1.m4a",
  15: "/assets/episode1/scene15/sprecher-micha-v1.m4a",
  16: "/assets/episode1/scene16/sprecher-micha-v1.m4a",
  17: "/assets/episode1/scene17/sprecher-micha-v1.m4a",
  18: "/assets/episode1/scene18/sprecher-micha-v1.m4a",
  19: "/assets/episode1/scene19/sprecher-micha-v1.m4a",
  20: "/assets/episode1/scene20/sprecher-micha-v1.m4a",
  21: "/assets/episode1/scene21/sprecher-micha-v1.m4a",
  22: "/assets/episode1/scene22/sprecher-micha-v1.m4a",
};

export const humanNarrationSamples = {
  micha: "/assets/episode1/scene14/sprecher-micha-test-v1.m4a",
  rosi: "/assets/episode1/scene14/sprecher-rosi-test-v1.m4a",
} as const;
