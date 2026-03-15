import { useRef, useCallback } from "react";

// Each tick sound profile: oscillator params + envelope
type SoundProfile = {
  type: OscillatorType;
  freq: number;
  freq2?: number;
  gainPeak: number;
  decay: number;
  noisy?: boolean;
};

const SOUND_PROFILES: Record<string, SoundProfile> = {
  click:  { type: "square",   freq: 1200, gainPeak: 0.08, decay: 0.03 },
  tick:   { type: "triangle", freq: 900,  gainPeak: 0.12, decay: 0.04 },
  wood:   { type: "sine",     freq: 180,  gainPeak: 0.18, decay: 0.07, noisy: true },
  ping:   { type: "sine",     freq: 1800, gainPeak: 0.10, decay: 0.12 },
  casino: { type: "sawtooth", freq: 600,  gainPeak: 0.09, decay: 0.05 },
  deep:   { type: "sine",     freq: 80,   gainPeak: 0.22, decay: 0.10, noisy: true },
  soft:   { type: "sine",     freq: 440,  gainPeak: 0.06, decay: 0.08 },
  spring: { type: "triangle", freq: 500,  freq2: 700, gainPeak: 0.11, decay: 0.06 },
};

export function useWheelSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playTick = useCallback((soundKey = "click") => {
    try {
      const ctx = getCtx();
      const profile = SOUND_PROFILES[soundKey] ?? SOUND_PROFILES.click;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = profile.type;
      osc.frequency.setValueAtTime(profile.freq, t);
      if (profile.freq2) {
        osc.frequency.linearRampToValueAtTime(profile.freq2, t + profile.decay * 0.5);
      }

      gain.gain.setValueAtTime(profile.gainPeak, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + profile.decay);

      if (profile.noisy) {
        // Add a noise burst for woody/deep sounds
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
        const noise = ctx.createBufferSource();
        const noiseGain = ctx.createGain();
        noise.buffer = buffer;
        noise.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noiseGain.gain.setValueAtTime(0.15, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + profile.decay);
        noise.start(t);
        noise.stop(t + profile.decay);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + profile.decay + 0.01);
    } catch {
      // Audio API unavailable
    }
  }, [getCtx]);

  const playFanfare = useCallback(() => {
    try {
      const ctx = getCtx();
      // C5, E5, G5, C6
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = "sine";
        const t = ctx.currentTime + i * 0.13;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.18, t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.start(t);
        osc.stop(t + 0.35);
      });
    } catch {
      // Audio API unavailable
    }
  }, [getCtx]);

  return { playTick, playFanfare };
}
