"use client";

import { useEffect } from "react";
import type { SceneTheme } from "../data/scenes";

type SoundEvent =
  | "bubbles"
  | "birds"
  | "eruption"
  | "footsteps"
  | "impact"
  | "insects"
  | "rain"
  | "roar"
  | "rustle"
  | "steam"
  | "waves";

type AmbientProfile = {
  filter: BiquadFilterType;
  frequency: number;
  level: number;
  movement: number;
  noise: "white" | "brown";
  rumble?: number;
};

const profiles: Record<SceneTheme, AmbientProfile> = {
  volcanic: {
    filter: "lowpass",
    frequency: 260,
    level: 0.058,
    movement: 0.07,
    noise: "brown",
    rumble: 46,
  },
  rain: {
    filter: "bandpass",
    frequency: 2450,
    level: 0.047,
    movement: 0.15,
    noise: "white",
    rumble: 56,
  },
  ocean: {
    filter: "lowpass",
    frequency: 650,
    level: 0.044,
    movement: 0.1,
    noise: "brown",
  },
  lagoon: {
    filter: "lowpass",
    frequency: 820,
    level: 0.034,
    movement: 0.07,
    noise: "brown",
  },
  micro: {
    filter: "bandpass",
    frequency: 1050,
    level: 0.027,
    movement: 0.13,
    noise: "brown",
  },
  oxygen: {
    filter: "highpass",
    frequency: 1450,
    level: 0.024,
    movement: 0.11,
    noise: "white",
  },
  atmosphere: {
    filter: "bandpass",
    frequency: 980,
    level: 0.03,
    movement: 0.06,
    noise: "brown",
  },
  ediacara: {
    filter: "lowpass",
    frequency: 650,
    level: 0.033,
    movement: 0.08,
    noise: "brown",
  },
  cambrian: {
    filter: "bandpass",
    frequency: 880,
    level: 0.035,
    movement: 0.09,
    noise: "brown",
  },
  shore: {
    filter: "lowpass",
    frequency: 720,
    level: 0.038,
    movement: 0.1,
    noise: "brown",
  },
  swamp: {
    filter: "lowpass",
    frequency: 570,
    level: 0.032,
    movement: 0.06,
    noise: "brown",
  },
  egg: {
    filter: "lowpass",
    frequency: 500,
    level: 0.03,
    movement: 0.055,
    noise: "brown",
  },
  dinosaurs: {
    filter: "lowpass",
    frequency: 410,
    level: 0.036,
    movement: 0.045,
    noise: "brown",
    rumble: 48,
  },
  impact: {
    filter: "lowpass",
    frequency: 300,
    level: 0.04,
    movement: 0.04,
    noise: "brown",
    rumble: 38,
  },
  ash: {
    filter: "bandpass",
    frequency: 760,
    level: 0.035,
    movement: 0.05,
    noise: "brown",
  },
  forest: {
    filter: "bandpass",
    frequency: 1300,
    level: 0.026,
    movement: 0.08,
    noise: "brown",
  },
  present: {
    filter: "lowpass",
    frequency: 900,
    level: 0.025,
    movement: 0.07,
    noise: "brown",
  },
};

const sceneEvents: Record<number, SoundEvent[]> = {
  1: ["eruption", "steam"],
  2: ["rain", "steam"],
  3: ["rain", "waves"],
  4: ["bubbles", "steam", "waves"],
  5: ["bubbles"],
  6: ["bubbles"],
  7: ["bubbles"],
  8: ["bubbles"],
  9: ["bubbles"],
  10: ["bubbles"],
  11: ["bubbles"],
  12: ["bubbles"],
  13: ["bubbles"],
  14: ["waves"],
  15: ["waves", "rustle"],
  16: ["bubbles", "insects", "rustle"],
  17: ["insects", "rustle", "roar"],
  18: ["footsteps", "insects", "roar"],
  19: ["impact", "insects", "roar"],
  20: ["rustle"],
  21: ["birds", "insects", "rustle"],
  22: ["birds", "waves"],
};

function createNoiseBuffer(
  context: AudioContext,
  seconds: number,
  color: "white" | "brown",
) {
  const buffer = context.createBuffer(
    1,
    Math.round(context.sampleRate * seconds),
    context.sampleRate,
  );
  const channel = buffer.getChannelData(0);
  let last = 0;

  for (let index = 0; index < channel.length; index += 1) {
    const white = Math.random() * 2 - 1;
    if (color === "brown") {
      last = (last + 0.02 * white) / 1.02;
      channel[index] = last * 3.2;
    } else {
      channel[index] = white;
    }
  }

  return buffer;
}

function randomBetween(minimum: number, maximum: number) {
  return minimum + Math.random() * (maximum - minimum);
}

function connectWithPan(
  context: AudioContext,
  source: AudioNode,
  destination: AudioNode,
) {
  if (!context.createStereoPanner) {
    source.connect(destination);
    return;
  }
  const panner = context.createStereoPanner();
  panner.pan.value = randomBetween(-0.65, 0.65);
  source.connect(panner);
  panner.connect(destination);
}

function playTone(
  context: AudioContext,
  destination: AudioNode,
  {
    from,
    to,
    duration,
    level,
    type = "sine",
    delay = 0,
  }: {
    from: number;
    to: number;
    duration: number;
    level: number;
    type?: OscillatorType;
    delay?: number;
  },
) {
  const now = context.currentTime + delay;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(Math.max(1, from), now);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, to), now + duration);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(level, now + Math.min(0.06, duration / 3));
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain);
  connectWithPan(context, gain, destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.03);
}

function playNoiseBurst(
  context: AudioContext,
  destination: AudioNode,
  noiseBuffer: AudioBuffer,
  {
    frequency,
    duration,
    level,
    filterType = "bandpass",
  }: {
    frequency: number;
    duration: number;
    level: number;
    filterType?: BiquadFilterType;
  },
) {
  const now = context.currentTime;
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  source.buffer = noiseBuffer;
  filter.type = filterType;
  filter.frequency.value = frequency;
  filter.Q.value = 0.8;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(level, now + Math.min(0.08, duration / 3));
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  source.connect(filter);
  filter.connect(gain);
  connectWithPan(context, gain, destination);
  source.start(now);
  source.stop(now + duration + 0.03);
}

function playSoundEvent(
  event: SoundEvent,
  context: AudioContext,
  destination: AudioNode,
  whiteNoise: AudioBuffer,
  brownNoise: AudioBuffer,
) {
  switch (event) {
    case "bubbles":
      playTone(context, destination, {
        from: randomBetween(220, 380),
        to: randomBetween(600, 950),
        duration: randomBetween(0.12, 0.24),
        level: 0.018,
      });
      break;
    case "birds":
      playTone(context, destination, {
        from: randomBetween(1500, 2100),
        to: randomBetween(2300, 3200),
        duration: 0.16,
        level: 0.012,
      });
      playTone(context, destination, {
        from: randomBetween(1900, 2600),
        to: randomBetween(1500, 2200),
        duration: 0.12,
        level: 0.009,
        delay: 0.2,
      });
      break;
    case "eruption":
      playNoiseBurst(context, destination, brownNoise, {
        frequency: 170,
        duration: randomBetween(1.2, 2),
        level: 0.055,
        filterType: "lowpass",
      });
      playTone(context, destination, {
        from: 52,
        to: 32,
        duration: 1.5,
        level: 0.026,
        type: "sine",
      });
      break;
    case "footsteps":
      playTone(context, destination, {
        from: 48,
        to: 30,
        duration: 0.42,
        level: 0.04,
      });
      playNoiseBurst(context, destination, brownNoise, {
        frequency: 120,
        duration: 0.38,
        level: 0.025,
        filterType: "lowpass",
      });
      break;
    case "impact":
      playNoiseBurst(context, destination, brownNoise, {
        frequency: 130,
        duration: 2.8,
        level: 0.075,
        filterType: "lowpass",
      });
      playTone(context, destination, {
        from: 76,
        to: 24,
        duration: 3,
        level: 0.055,
        type: "sawtooth",
      });
      break;
    case "insects":
      playTone(context, destination, {
        from: randomBetween(2600, 3300),
        to: randomBetween(3100, 3900),
        duration: 0.07,
        level: 0.008,
        type: "triangle",
      });
      playTone(context, destination, {
        from: randomBetween(2700, 3500),
        to: randomBetween(3200, 4100),
        duration: 0.06,
        level: 0.006,
        type: "triangle",
        delay: 0.11,
      });
      break;
    case "rain":
      playNoiseBurst(context, destination, whiteNoise, {
        frequency: randomBetween(1800, 3600),
        duration: randomBetween(0.05, 0.12),
        level: 0.012,
        filterType: "highpass",
      });
      break;
    case "roar":
      playTone(context, destination, {
        from: randomBetween(82, 105),
        to: randomBetween(38, 52),
        duration: randomBetween(1.15, 1.8),
        level: 0.024,
        type: "sawtooth",
      });
      playNoiseBurst(context, destination, brownNoise, {
        frequency: 240,
        duration: 1.4,
        level: 0.02,
        filterType: "lowpass",
      });
      break;
    case "rustle":
      playNoiseBurst(context, destination, brownNoise, {
        frequency: randomBetween(850, 1500),
        duration: randomBetween(0.3, 0.75),
        level: 0.016,
        filterType: "bandpass",
      });
      break;
    case "steam":
      playNoiseBurst(context, destination, whiteNoise, {
        frequency: randomBetween(1600, 2600),
        duration: randomBetween(0.55, 1.2),
        level: 0.02,
        filterType: "highpass",
      });
      break;
    case "waves":
      playNoiseBurst(context, destination, brownNoise, {
        frequency: randomBetween(420, 720),
        duration: randomBetween(1, 1.8),
        level: 0.025,
        filterType: "lowpass",
      });
      break;
  }
}

const eventTiming: Record<SoundEvent, [number, number, number]> = {
  bubbles: [0.45, 1.4, 0.4],
  birds: [2.1, 4.8, 1.1],
  eruption: [6.5, 10.5, 2.2],
  footsteps: [3.2, 5.4, 1.2],
  impact: [30, 30, 2.8],
  insects: [1.5, 3.7, 0.8],
  rain: [0.18, 0.48, 0.15],
  roar: [8, 13, 3.2],
  rustle: [3, 6.5, 1.5],
  steam: [4.5, 8, 2],
  waves: [3, 5.5, 0.8],
};

export function useAmbientSound(
  sceneId: number,
  theme: SceneTheme,
  isPlaying: boolean,
  enabled: boolean,
) {
  useEffect(() => {
    if (!isPlaying || !enabled) return;

    const AudioContextClass =
      window.AudioContext ??
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const profile = profiles[theme];
    const whiteNoise = createNoiseBuffer(context, 4, "white");
    const brownNoise = createNoiseBuffer(context, 4, "brown");
    const noise = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const bed = context.createGain();
    const master = context.createGain();
    const movement = context.createOscillator();
    const movementGain = context.createGain();
    const timers = new Set<number>();
    let disposed = false;

    noise.buffer = profile.noise === "brown" ? brownNoise : whiteNoise;
    noise.loop = true;
    filter.type = profile.filter;
    filter.frequency.value = profile.frequency;
    filter.Q.value = 0.65;
    bed.gain.value = profile.level;
    master.gain.value = 0.82;
    movement.type = "sine";
    movement.frequency.value = profile.movement;
    movementGain.gain.value = profile.level * 0.26;

    noise.connect(filter);
    filter.connect(bed);
    bed.connect(master);
    movement.connect(movementGain);
    movementGain.connect(bed.gain);
    master.connect(context.destination);

    const persistentNodes: AudioScheduledSourceNode[] = [noise, movement];

    if (profile.rumble) {
      const rumble = context.createOscillator();
      const rumbleGain = context.createGain();
      rumble.type = "sine";
      rumble.frequency.value = profile.rumble;
      rumbleGain.gain.value = 0.018;
      rumble.connect(rumbleGain);
      rumbleGain.connect(master);
      persistentNodes.push(rumble);
    }

    const scheduleEvent = (event: SoundEvent) => {
      const [minimum, maximum, initial] = eventTiming[event];
      const run = () => {
        if (disposed) return;
        playSoundEvent(event, context, master, whiteNoise, brownNoise);
        const timer = window.setTimeout(
          run,
          randomBetween(minimum, maximum) * 1000,
        );
        timers.add(timer);
      };
      const timer = window.setTimeout(run, initial * 1000);
      timers.add(timer);
    };

    void context.resume();
    persistentNodes.forEach((node) => node.start());
    (sceneEvents[sceneId] ?? []).forEach(scheduleEvent);

    return () => {
      disposed = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      persistentNodes.forEach((node) => {
        try {
          node.stop();
        } catch {
          // Der Knoten kann beim Szenenwechsel bereits beendet sein.
        }
      });
      void context.close();
    };
  }, [enabled, isPlaying, sceneId, theme]);
}
