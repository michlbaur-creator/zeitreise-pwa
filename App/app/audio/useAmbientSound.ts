"use client";

import { useEffect } from "react";
import type { SceneTheme } from "../data/scenes";

type AmbientProfile = {
  filter: BiquadFilterType;
  frequency: number;
  level: number;
  movement: number;
  rumble?: number;
};

const profiles: Record<SceneTheme, AmbientProfile> = {
  volcanic: {
    filter: "lowpass",
    frequency: 220,
    level: 0.13,
    movement: 0.08,
    rumble: 46,
  },
  rain: {
    filter: "bandpass",
    frequency: 2200,
    level: 0.1,
    movement: 0.16,
    rumble: 58,
  },
  ocean: {
    filter: "lowpass",
    frequency: 520,
    level: 0.09,
    movement: 0.07,
  },
  lagoon: {
    filter: "lowpass",
    frequency: 760,
    level: 0.055,
    movement: 0.06,
  },
  micro: {
    filter: "bandpass",
    frequency: 1100,
    level: 0.038,
    movement: 0.13,
  },
  oxygen: {
    filter: "highpass",
    frequency: 1450,
    level: 0.034,
    movement: 0.11,
  },
  atmosphere: {
    filter: "bandpass",
    frequency: 980,
    level: 0.045,
    movement: 0.05,
  },
  ediacara: {
    filter: "lowpass",
    frequency: 620,
    level: 0.048,
    movement: 0.07,
  },
  cambrian: {
    filter: "bandpass",
    frequency: 880,
    level: 0.052,
    movement: 0.09,
  },
  shore: {
    filter: "lowpass",
    frequency: 680,
    level: 0.055,
    movement: 0.06,
  },
  swamp: {
    filter: "lowpass",
    frequency: 500,
    level: 0.05,
    movement: 0.05,
  },
  egg: {
    filter: "lowpass",
    frequency: 440,
    level: 0.042,
    movement: 0.05,
  },
  dinosaurs: {
    filter: "lowpass",
    frequency: 360,
    level: 0.052,
    movement: 0.04,
    rumble: 52,
  },
  impact: {
    filter: "lowpass",
    frequency: 260,
    level: 0.065,
    movement: 0.04,
    rumble: 40,
  },
  ash: {
    filter: "bandpass",
    frequency: 720,
    level: 0.046,
    movement: 0.045,
  },
  forest: {
    filter: "bandpass",
    frequency: 1250,
    level: 0.037,
    movement: 0.08,
  },
  present: {
    filter: "lowpass",
    frequency: 820,
    level: 0.036,
    movement: 0.06,
  },
};

export function useAmbientSound(
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
    const seconds = 4;
    const buffer = context.createBuffer(
      1,
      context.sampleRate * seconds,
      context.sampleRate,
    );
    const channel = buffer.getChannelData(0);

    for (let index = 0; index < channel.length; index += 1) {
      channel[index] = Math.random() * 2 - 1;
    }

    const noise = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const master = context.createGain();
    const movement = context.createOscillator();
    const movementGain = context.createGain();

    noise.buffer = buffer;
    noise.loop = true;
    filter.type = profile.filter;
    filter.frequency.value = profile.frequency;
    filter.Q.value = 0.65;
    master.gain.value = profile.level;
    movement.type = "sine";
    movement.frequency.value = profile.movement;
    movementGain.gain.value = profile.level * 0.22;

    noise.connect(filter);
    filter.connect(master);
    movement.connect(movementGain);
    movementGain.connect(master.gain);
    master.connect(context.destination);

    const activeNodes: AudioScheduledSourceNode[] = [noise, movement];

    if (profile.rumble) {
      const rumble = context.createOscillator();
      const rumbleGain = context.createGain();
      rumble.type = "sine";
      rumble.frequency.value = profile.rumble;
      rumbleGain.gain.value = 0.035;
      rumble.connect(rumbleGain);
      rumbleGain.connect(master);
      activeNodes.push(rumble);
    }

    void context.resume();
    activeNodes.forEach((node) => node.start());

    return () => {
      activeNodes.forEach((node) => {
        try {
          node.stop();
        } catch {
          // Der Knoten kann beim Szenenwechsel bereits beendet sein.
        }
      });
      void context.close();
    };
  }, [enabled, isPlaying, theme]);
}
