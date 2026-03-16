import React, { useState, useMemo, useCallback, useRef } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SpinningWheel } from '@/components/SpinningWheel';
import DrawButton from '@/components/DrawButton';
import WinnerResult from '@/components/WinnerResult';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface FilterConfig {
  removeDuplicates: boolean;
  requiredKeyword: string;
  minTags: number;
  excludeBots: boolean;
  allowMultipleEntries: boolean;
  maxEntriesPerUser: number;
  storyShareList: string;
  winnersCount: number;
}

interface ParsedEntry {
  username: string;
  comment: string;
}

const PLATFORM_EXPORT_GUIDE: Record<string, { name: string; icon: string; steps: string[] }> = {
  instagram: {
    name: 'Instagram', icon: '📸',
    steps: [
      'Open your post on instagram.com in a desktop browser',
      'Scroll through all comments (click "Load more comments")',
      'Select all visible comments, copy them and paste in the text area above',
      'Recognised format: "@username: comment text" or one username per line',
    ],
  },
  tiktok: {
    name: 'TikTok', icon: '🎵',
    steps: [
      'Open your video on tiktok.com',
      'Scroll through comments and select them',
      'Copy and paste into the text area above',
      'Format: "@username: comment" or one @username per line',
    ],
  },
  youtube: {
    name: 'YouTube', icon: '▶️',
    steps: [
      'Go to YouTube Studio → Content → your video → Comments tab',
      'Copy the visible comments',
      'Paste them above — format: "Display Name\nComment text"',
      'Or export via YouTube Data API for large comment lists',
    ],
  },
  twitter: {
    name: 'Twitter / X', icon: '𝕏',
    steps: [
      'Open your tweet on x.com',
      'Scroll through the replies',
      'Copy the @usernames of participants, one per line, and paste above',
    ],
  },
  facebook: {
    name: 'Facebook', icon: '📘',
    steps: [
      'Open your Facebook post',
      'Scroll through the comments',
      'Copy commenter names and paste above, one per line',
    ],
  },
  twitch: {
    name: 'Twitch', icon: '🟣',
    steps: [
      'Export your chat log using a bot like Streamlabs or Nightbot',
      'Or copy usernames from the VOD replay chat panel',
      'Paste one username per line in the area above',
    ],
  },
  discord: {
    name: 'Discord', icon: '💬',
    steps: [
      'Copy the list of usernames from reactions, roles or messages',
      'Paste one username per line in the area above',
    ],
  },
};

function detectPlatform(url: string): string | null {
  const u = url.toLowerCase();
  if (u.includes('instagram.com')) return 'instagram';
  if (u.includes('tiktok.com')) return 'tiktok';
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('twitter.com') || u.includes('x.com')) return 'twitter';
  if (u.includes('facebook.com') || u.includes('fb.com')) return 'facebook';
  if (u.includes('twitch.tv')) return 'twitch';
  if (u.includes('discord.com') || u.includes('discord.gg')) return 'discord';
  return null;
}

const SocialGiveawayInner = () => {
  const [rawInput, setRawInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterConfig>({
    removeDuplicates: true,
    requiredKeyword: '',
    minTags: 0,
    excludeBots: true,
    allowMultipleEntries: false,
    maxEntriesPerUser: 1,
    storyShareList: '',
    winnersCount: 1,
  });
  const [wheelParticipants, setWheelParticipants] = useState<{ pseudo: string; weight: number }[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [winners, setWinners] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const detectedPlatform = useMemo(() => detectPlatform(linkInput.trim()), [linkInput]);

  const parsedEntries = useMemo((): ParsedEntry[] => {
    if (!rawInput.trim()) return [];
    return rawInput.split('\n')
      .map(l => l.trim())
      .filter(Boolean)
      .map(line => {
        // Tab-separated (Google Sheets / Excel paste) — first column is username
        if (line.includes('\t')) {
          const parts = line.split('\t');
          return { username: parts[0].trim().replace(/^@/, ''), comment: parts.slice(1).join(' ').trim() };
        }
        // "username: comment" format
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0 && colonIndex < 40) {
          return {
            username: line.substring(0, colonIndex).trim().replace(/^@/, ''),
            comment: line.substring(colonIndex + 1).trim(),
          };
        }
        return { username: line.replace(/^@/, '').trim(), comment: '' };
      })
      .filter(e => e.username.length > 0 && e.username.length <= 50);
  }, [rawInput]);

  const filteredEntries = useMemo((): ParsedEntry[] => {
    let entries = [...parsedEntries];

    if (filters.requiredKeyword.trim()) {
      const kw = filters.requiredKeyword.toLowerCase();
      entries = entries.filter(e =>
        e.comment.toLowerCase().includes(kw) || e.username.toLowerCase().includes(kw)
      );
    }

    if (filters.minTags > 0) {
      entries = entries.filter(e => (e.comment.match(/@\w/g) || []).length >= filters.minTags);
    }

    if (filters.excludeBots) {
      entries = entries.filter(e => {
        const name = e.username.toLowerCase();
        const digitRatio = (name.match(/\d/g) || []).length / Math.max(name.length, 1);
        const hasNoVowels = name.length > 4 && !/[aeiou]/i.test(name.replace(/\d/g, ''));
        return digitRatio < 0.5 && !hasNoVowels;
      });
    }

    if (filters.storyShareList.trim()) {
      const storyUsers = new Set(
        filters.storyShareList.split('\n')
          .map(l => l.trim().replace(/^@/, '').toLowerCase())
          .filter(Boolean)
      );
      entries = entries.filter(e => storyUsers.has(e.username.toLowerCase()));
    }

    if (filters.removeDuplicates) {
      if (filters.allowMultipleEntries) {
        const countMap = new Map<string, number>();
        entries = entries.filter(e => {
          const key = e.username.toLowerCase();
          const count = countMap.get(key) || 0;
          if (count < filters.maxEntriesPerUser) { countMap.set(key, count + 1); return true; }
          return false;
        });
      } else {
        const seen = new Set<string>();
        entries = entries.filter(e => {
          const key = e.username.toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key); return true;
        });
      }
    }

    // Sort alphabetically for easy review
    entries.sort((a, b) => a.username.localeCompare(b.username));
    return entries;
  }, [parsedEntries, filters]);

  const activeFiltersCount = useMemo(() => {
    let n = 0;
    if (filters.requiredKeyword.trim()) n++;
    if (filters.minTags > 0) n++;
    if (filters.allowMultipleEntries) n++;
    if (filters.storyShareList.trim()) n++;
    return n;
  }, [filters]);

  const loadIntoWheel = useCallback(() => {
    const names = filteredEntries.map(e => ({ pseudo: e.username, weight: 1 }));
    setWheelParticipants(names);
    setLoaded(true);
    setWinners([]);
    setTimeout(() => {
      wheelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }, [filteredEntries]);

  const handleDraw = useCallback(() => {
    if (isSpinning || wheelParticipants.length < 2) return;
    setIsSpinning(true);
    setWinners([]);
  }, [isSpinning, wheelParticipants.length]);

  const handleComplete = useCallback((w: string[]) => {
    setWinners(w);
    setIsSpinning(false);
  }, []);

  const handleRelaunch = useCallback(() => {
    setWinners([]);
    setTimeout(() => setIsSpinning(true), 100);
  }, []);

  const platformGuide = detectedPlatform ? PLATFORM_EXPORT_GUIDE[detectedPlatform] : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* STEP 1 — Paste participants */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold mb-1 text-foreground">1. Add your participants</h2>
          <p className="text-sm text-muted-foreground">
            Paste directly from <strong className="text-foreground">Google Sheets</strong>, Excel, Word, or copy-paste comments from any social network
          </p>
        </div>

        <textarea
          value={rawInput}
          onChange={e => setRawInput(e.target.value)}
          placeholder={
            'Paste your participant list here...\n\nAccepted formats:\n• Google Sheets / Excel → paste directly (tab-separated, first column = username)\n• @username: comment @friend1 @friend2\n• One username per line\n• Mix of formats — all recognised automatically'
          }
          className="w-full h-48 p-4 rounded-xl border border-border bg-card font-mono text-sm resize-y focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground placeholder:text-muted-foreground/50"
        />

        {rawInput.trim() && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">{parsedEntries.length}</span> participant{parsedEntries.length !== 1 ? 's' : ''} detected
            </span>
            <button onClick={() => setRawInput('')} className="text-xs text-muted-foreground hover:text-destructive transition-colors">
              Clear all
            </button>
          </div>
        )}

        {/* URL input — paste a post link to get platform-specific export instructions */}
        <div className="p-4 rounded-xl border border-dashed border-border bg-secondary/10 space-y-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-0.5">
              Or paste the link to your post / live stream
            </label>
            <p className="text-xs text-muted-foreground mb-2">
              Instagram, TikTok, YouTube, Twitter/X, Facebook, Twitch, Discord…
            </p>
            <input
              type="url"
              value={linkInput}
              onChange={e => setLinkInput(e.target.value)}
              placeholder="https://www.instagram.com/p/... or https://www.tiktok.com/@..."
              className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {platformGuide && (
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm font-semibold text-foreground mb-2">
                {platformGuide.icon} How to export comments from {platformGuide.name}:
              </p>
              <ol className="space-y-1.5">
                {platformGuide.steps.map((step, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                    <span className="text-primary font-bold shrink-0">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="text-xs text-muted-foreground mt-2 italic">
                Note: Automatic comment fetching from social networks requires official API access. Copy-paste is currently the most reliable method.
              </p>
            </div>
          )}

          {linkInput.trim() && !platformGuide && (
            <p className="text-xs text-muted-foreground">
              Platform not recognised. Copy-paste the comments manually into the area above.
            </p>
          )}
        </div>
      </section>

      {/* STEP 2 — Filters (collapsible, always accessible) */}
      <section className="rounded-xl border border-border overflow-hidden">
        <button
          type="button"
          onClick={() => setShowFilters(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-secondary/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="font-bold text-foreground">2. Entry rules &amp; filters</span>
            {activeFiltersCount > 0 ? (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                {activeFiltersCount} active rule{activeFiltersCount > 1 ? 's' : ''}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">Optional</span>
            )}
          </div>
          {showFilters
            ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
            : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          }
        </button>

        {showFilters && (
          <div className="p-4 border-t border-border">
            <div className="grid sm:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Required keyword in comment</label>
                <input
                  type="text"
                  value={filters.requiredKeyword}
                  onChange={e => setFilters(f => ({ ...f, requiredKeyword: e.target.value }))}
                  placeholder='e.g. "entered" or "#giveaway"'
                  className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">Only entries containing this word are kept</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Minimum friends tagged (@mentions)</label>
                <select
                  value={filters.minTags}
                  onChange={e => setFilters(f => ({ ...f, minTags: Number(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value={0}>No minimum</option>
                  <option value={1}>At least 1 friend tagged</option>
                  <option value={2}>At least 2 friends tagged</option>
                  <option value={3}>At least 3 friends tagged</option>
                  <option value={5}>At least 5 friends tagged</option>
                </select>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={filters.removeDuplicates} onChange={e => setFilters(f => ({ ...f, removeDuplicates: e.target.checked }))} className="rounded border-border w-4 h-4 accent-primary" />
                <span className="text-sm text-foreground">Remove duplicate usernames</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={filters.excludeBots} onChange={e => setFilters(f => ({ ...f, excludeBots: e.target.checked }))} className="rounded border-border w-4 h-4 accent-primary" />
                <span className="text-sm text-foreground">Exclude suspected bot accounts</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={filters.allowMultipleEntries} onChange={e => setFilters(f => ({ ...f, allowMultipleEntries: e.target.checked }))} className="rounded border-border w-4 h-4 accent-primary" />
                <span className="text-sm text-foreground">Allow multiple entries per user</span>
              </label>

              {filters.allowMultipleEntries && (
                <div>
                  <label className="block text-sm font-medium mb-1 text-foreground">Max entries per user</label>
                  <select
                    value={filters.maxEntriesPerUser}
                    onChange={e => setFilters(f => ({ ...f, maxEntriesPerUser: Number(e.target.value) }))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground outline-none"
                  >
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={999}>Unlimited</option>
                  </select>
                </div>
              )}

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1 text-foreground">
                  Story share whitelist (optional)
                </label>
                <textarea
                  value={filters.storyShareList}
                  onChange={e => setFilters(f => ({ ...f, storyShareList: e.target.value }))}
                  placeholder={"Paste usernames of people who shared your story here (one per line).\nLeave empty to skip this filter."}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-card font-mono text-sm resize-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">Only participants who also appear in this list will be kept.</p>
              </div>

            </div>
          </div>
        )}
      </section>

      {/* STEP 3 — Load & spin */}
      {parsedEntries.length >= 2 && (
        <section className="p-4 rounded-xl bg-card border border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-2xl font-bold text-primary">{filteredEntries.length}</span>
              <span className="text-sm text-muted-foreground ml-2">
                participant{filteredEntries.length !== 1 ? 's' : ''} after filtering
              </span>
              {parsedEntries.length !== filteredEntries.length && (
                <span className="text-xs text-muted-foreground ml-2">
                  ({parsedEntries.length - filteredEntries.length} removed)
                </span>
              )}
              {filteredEntries.length > 0 && filteredEntries.length <= 15 && (
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  {filteredEntries.map(e => e.username).join(', ')}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground whitespace-nowrap">Winners:</label>
                <select
                  value={filters.winnersCount}
                  onChange={e => setFilters(f => ({ ...f, winnersCount: Number(e.target.value) }))}
                  className="px-2 py-1.5 rounded-lg border border-border bg-card text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
                >
                  {[1, 2, 3, 4, 5, 10].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <button
                onClick={loadIntoWheel}
                disabled={filteredEntries.length < 2}
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                🎰 Load into wheel &amp; spin
              </button>
            </div>
          </div>
        </section>
      )}

      {/* WHEEL */}
      {loaded && wheelParticipants.length >= 2 && (
        <section ref={wheelRef} className="space-y-4">
          <h2 className="text-xl font-bold text-foreground text-center">3. Spin to pick the winner!</h2>
          <p className="text-sm text-muted-foreground text-center">{wheelParticipants.length} participants loaded</p>
          <div className="flex flex-col items-center space-y-4">
            <SpinningWheel
              participants={wheelParticipants}
              isSpinning={isSpinning}
              onComplete={handleComplete}
              mode="simple"
              winnersCount={filters.winnersCount}
              onSpin={handleDraw}
            />
            {!isSpinning && winners.length === 0 && (
              <DrawButton onDraw={handleDraw} isSpinning={isSpinning} disabled={wheelParticipants.length < 2} participantCount={wheelParticipants.length} mode="simple" />
            )}
            {winners.length > 0 && !isSpinning && (
              <WinnerResult winners={winners} onRelaunch={handleRelaunch} mode="simple" />
            )}
          </div>
        </section>
      )}

    </div>
  );
};

const SocialGiveawayIsland = () => (
  <LanguageProvider>
    <SocialGiveawayInner />
  </LanguageProvider>
);

export default SocialGiveawayIsland;
