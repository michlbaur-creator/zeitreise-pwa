export const SCENE_TWO_RAIN_START = 0.5;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function smoothstep(value: number) {
  const clamped = clamp(value, 0, 1);
  return clamped * clamped * (3 - 2 * clamped);
}

export function rainIntensityForScene(sceneId: number, progress: number) {
  const safeProgress = clamp(progress, 0, 1);

  if (sceneId === 2) {
    if (safeProgress <= SCENE_TWO_RAIN_START) return 0;

    const rainProgress =
      (safeProgress - SCENE_TWO_RAIN_START) / (1 - SCENE_TWO_RAIN_START);
    const onset = smoothstep(rainProgress / 0.12);
    const buildUp = smoothstep(rainProgress);
    const gust = Math.sin(rainProgress * Math.PI * 5) * 0.04 * onset;

    return clamp(onset * (0.36 + buildUp * 0.34 + gust), 0, 0.72);
  }

  if (sceneId === 3) {
    const longGust = Math.sin(safeProgress * Math.PI * 4.2) * 0.055;
    const shortGust = Math.sin(safeProgress * Math.PI * 10.6) * 0.025;
    return clamp(0.52 + longGust + shortGust, 0.42, 0.62);
  }

  return 0;
}
