interface Participant {
  pseudo: string;
  weight: number;
}

export const buildShareURL = (participants: Participant[], drawTitle?: string): string => {
  try {
    const params = new URLSearchParams();
    params.set("entries", participants.map((p) => p.pseudo).join(","));
    if (drawTitle) params.set("title", drawTitle);
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  } catch {
    return window.location.href;
  }
};

export const readShareURLConfig = (): { participants: Participant[]; drawTitle?: string } | null => {
  try {
    const params = new URLSearchParams(window.location.search);
    const entries = params.get("entries");
    if (!entries) return null;
    const participants = entries
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((pseudo) => ({ pseudo, weight: 1 }));
    const drawTitle = params.get("title") || undefined;
    return { participants, drawTitle };
  } catch {
    return null;
  }
};
