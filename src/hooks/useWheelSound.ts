import { useRef, useCallback } from "react";

// Each tick sound profile: oscillator params + envelope
type SoundProfile = {
  type: OscillatorType;
  freq: number;
  freq2?: number;
  gainPeak: number;
  decay: number;
  noisy?: boolean;
  noiseGain?: number;    // gain of noise burst (default 0.15)
  noiseFilter?: number;  // bandpass filter Hz for noise (makes it plastic/wood)
};

const SOUND_PROFILES: Record<string, SoundProfile> = {
  // Realistic plastic/wood ratchet: mostly bandpass noise, barely any tone
  click:  { type: "triangle", freq: 900, gainPeak: 0.04, decay: 0.022, noisy: true, noiseGain: 0.12, noiseFilter: 2400 },
  tick:   { type: "triangle", freq: 400, gainPeak: 0.06, decay: 0.05, noisy: true, noiseGain: 0.10, noiseFilter: 700 },
  wood:   { type: "sine",     freq: 120, gainPeak: 0.03, decay: 0.07, noisy: true, noiseGain: 0.28, noiseFilter: 350 },
  ping:   { type: "sine",     freq: 900, gainPeak: 0.08, decay: 0.12 },
  casino: { type: "sawtooth", freq: 280, gainPeak: 0.06, decay: 0.06, noisy: true, noiseGain: 0.18, noiseFilter: 500 },
  deep:   { type: "sine",     freq: 70,  gainPeak: 0.12, decay: 0.12, noisy: true, noiseGain: 0.20, noiseFilter: 200 },
  soft:   { type: "sine",     freq: 280, gainPeak: 0.04, decay: 0.09 },
  spring: { type: "triangle", freq: 320, freq2: 450, gainPeak: 0.07, decay: 0.07 },
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
        // Noise burst — bandpass-filtered for plastic/wood texture
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseGain = ctx.createGain();
        const noisePeak = profile.noiseGain ?? 0.15;
        noiseGain.gain.setValueAtTime(noisePeak, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + profile.decay);
        if (profile.noiseFilter) {
          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.value = profile.noiseFilter;
          filter.Q.value = 1.2;
          noise.connect(filter);
          filter.connect(noiseGain);
        } else {
          noise.connect(noiseGain);
        }
        noiseGain.connect(ctx.destination);
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

  // ── Optional victory sound variations ──────────────────────────────────────
  // `playFanfare` (the classic ascending arpeggio) stays the default win sound
  // used by existing callers. These are extra, opt-in flavours so a caller can
  // vary the reward sound without changing the stable API. All are additive —
  // nothing here changes the behaviour of `playTick` / `playFanfare`.
  type WinVariant = "fanfare" | "chime" | "sparkle" | "riser";

  const playWin = useCallback((variant: WinVariant = "fanfare") => {
    if (variant === "fanfare") {
      playFanfare();
      return;
    }
    try {
      const ctx = getCtx();
      const t0 = ctx.currentTime;

      const tone = (freq: number, start: number, dur: number, peak: number, type: OscillatorType = "sine") => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(peak, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
        osc.start(start);
        osc.stop(start + dur + 0.02);
        return osc;
      };

      if (variant === "chime") {
        // Bright two-note bell — major third, shimmering decay.
        tone(987.77, t0, 0.7, 0.16, "sine");          // B5
        tone(1318.51, t0 + 0.08, 0.8, 0.12, "sine");  // E6
      } else if (variant === "sparkle") {
        // Quick descending glitter run — celebratory "ta-da-da-ding".
        const notes = [1567.98, 1318.51, 1046.5, 1567.98];
        notes.forEach((f, i) => tone(f, t0 + i * 0.07, 0.3, 0.12, "triangle"));
      } else if (variant === "riser") {
        // Pitch sweep up into a pop — slot-machine "winner" feel.
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, t0);
        osc.frequency.exponentialRampToValueAtTime(880, t0 + 0.35);
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.linearRampToValueAtTime(0.14, t0 + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.5);
        osc.start(t0);
        osc.stop(t0 + 0.52);
        tone(1046.5, t0 + 0.38, 0.5, 0.16, "sine"); // C6 pop on top
      }
    } catch {
      // Audio API unavailable
    }
  }, [getCtx, playFanfare]);

  return { playTick, playFanfare, playWin };
}
