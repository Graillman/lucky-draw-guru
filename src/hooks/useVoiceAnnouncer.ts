import { useRef, useCallback, useEffect, useState } from "react";

/**
 * useVoiceAnnouncer — spoken winner announcement via the Web Speech API
 * (SpeechSynthesis).
 *
 * This is a SECOND, opt-in channel that COMPLEMENTS the silent `role="status"
 * aria-live` region already rendered by WinnerResult / WinnerDisplay. The two
 * are independent: the aria-live region serves assistive tech regardless of
 * this hook, while this hook adds an audible "house announcer" voice for
 * sighted users who turn it on — the goal being a satisfying sensory reward
 * loop (boosts dwell time).
 *
 * Design choices:
 *  - OFF by default. We never speak unless the user explicitly enabled it.
 *    The preference is persisted in localStorage under `rwp:voice-on`.
 *  - Voice selection follows the current UI language (passed in), falling back
 *    gracefully to any available voice / the platform default.
 *  - Fully feature-detected: on browsers without SpeechSynthesis, `supported`
 *    is false and `speak` is a no-op, so callers never crash.
 *  - We cancel any in-flight utterance before speaking a new one, so re-spins
 *    don't stack overlapping voices (only ONE SpeechSynthesis stream at a time).
 */

const VOICE_PREF_KEY = "rwp:voice-on";

// UI language code → BCP-47 language tag prefix used to match a SpeechSynthesis
// voice. The app's language codes already line up with the prefixes, but we map
// explicitly so the intent is clear and a future divergence is easy to spot.
const LANG_TO_BCP47: Record<string, string> = {
  en: "en",
  es: "es",
  fr: "fr",
  de: "de",
  pt: "pt",
  it: "it",
};

type SpeakOptions = {
  /** Override the BCP-47 lang prefix for this utterance (e.g. "en"). */
  lang?: string;
  /** Speech rate (0.1–10, default 1). */
  rate?: number;
  /** Speech pitch (0–2, default 1). */
  pitch?: number;
};

function isSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function readStoredPref(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(VOICE_PREF_KEY) === "1";
  } catch {
    return false;
  }
}

export function useVoiceAnnouncer(uiLanguage?: string) {
  const supported = isSupported();

  // Persisted on/off toggle — OFF by default so we never surprise the user.
  const [enabled, setEnabledState] = useState<boolean>(false);
  useEffect(() => {
    setEnabledState(readStoredPref());
  }, []);

  // Cache of available voices. Voices load asynchronously in most browsers, so
  // we listen for `voiceschanged` and keep a fresh ref for synchronous lookups.
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  useEffect(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    const load = () => {
      voicesRef.current = synth.getVoices();
    };
    load();
    synth.addEventListener?.("voiceschanged", load);
    return () => {
      synth.removeEventListener?.("voiceschanged", load);
    };
  }, [supported]);

  const setEnabled = useCallback((next: boolean) => {
    setEnabledState(next);
    try {
      localStorage.setItem(VOICE_PREF_KEY, next ? "1" : "0");
    } catch {
      /* localStorage unavailable (private mode, etc.) — toggle still works in-session */
    }
    // Turning voice off mid-utterance should immediately silence it.
    if (!next && isSupported()) {
      try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabled(!readStoredPref());
  }, [setEnabled]);

  const pickVoice = useCallback((langPrefix: string): SpeechSynthesisVoice | undefined => {
    const voices = voicesRef.current.length
      ? voicesRef.current
      : (isSupported() ? window.speechSynthesis.getVoices() : []);
    if (!voices.length) return undefined;
    const prefix = langPrefix.toLowerCase();
    // Prefer an exact-ish language match (e.g. "fr", "fr-FR"), else a local
    // (non-remote) voice, else the first voice available.
    const matches = voices.filter(v => v.lang?.toLowerCase().startsWith(prefix));
    if (matches.length) {
      return matches.find(v => v.localService) ?? matches[0];
    }
    return undefined; // let the platform pick its default for the utterance lang
  }, []);

  /**
   * Speak `text` aloud. No-ops if unsupported or if voice is disabled, unless
   * `force` is true (used for the toggle's preview chirp so the user hears
   * confirmation the instant they enable it).
   */
  const speak = useCallback((text: string, opts: SpeakOptions = {}, force = false) => {
    if (!isSupported()) return;
    if (!text) return;
    if (!force && !readStoredPref()) return;

    try {
      const synth = window.speechSynthesis;
      // Only ever one announcer voice at a time — cancel anything queued/active.
      synth.cancel();

      const utter = new SpeechSynthesisUtterance(text);
      const langPrefix = opts.lang ?? LANG_TO_BCP47[uiLanguage ?? "en"] ?? "en";
      const voice = pickVoice(langPrefix);
      if (voice) {
        utter.voice = voice;
        utter.lang = voice.lang;
      } else {
        // No matching voice object — still set lang so the engine localises.
        utter.lang = langPrefix;
      }
      utter.rate = opts.rate ?? 1;
      utter.pitch = opts.pitch ?? 1;
      synth.speak(utter);
    } catch {
      /* SpeechSynthesis threw (rare) — fail silent, the aria-live region still informs SR users */
    }
  }, [pickVoice, uiLanguage]);

  const cancel = useCallback(() => {
    if (!isSupported()) return;
    try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
  }, []);

  return { supported, enabled, setEnabled, toggle, speak, cancel };
}
