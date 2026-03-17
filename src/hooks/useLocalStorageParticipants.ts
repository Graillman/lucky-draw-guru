import { useState, useEffect, useCallback } from "react";
import { ParticipantEntry } from "@/components/ParticipantInput";

const STORAGE_KEY = "realwheelpicker_participants_v3";

export const useLocalStorageParticipants = () => {
  const [participants, setParticipants] = useState<ParticipantEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setParticipants(parsed);
        }
      }
    } catch (error) {
      console.error("Error loading participants from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever participants change (after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
      } catch (error) {
        console.error("Error saving participants to localStorage:", error);
      }
    }
  }, [participants, isLoaded]);

  const updateParticipants = useCallback((newParticipants: ParticipantEntry[]) => {
    setParticipants(newParticipants);
  }, []);

  const clearParticipants = useCallback(() => {
    setParticipants([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }, []);

  return {
    participants,
    setParticipants: updateParticipants,
    clearParticipants,
    isLoaded,
  };
};
