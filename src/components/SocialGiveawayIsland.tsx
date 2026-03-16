import React, { useState, useMemo, useCallback, useRef } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SpinningWheel } from '@/components/SpinningWheel';
import DrawButton from '@/components/DrawButton';
import WinnerResult from '@/components/WinnerResult';

type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'facebook' | 'twitch' | 'discord' | 'whatnot';

interface FilterConfig {
  removeDuplicates: boolean;
  requiredKeyword: string;
  minTags: number;
  excludeBots: boolean;
  allowMultipleEntries: boolean;
  maxEntriesPerUser: number;
  storyShareList: string; // whitelist of usernames who shared to story
  winnersCount: number;
}

const PLATFORMS: { id: Platform; name: string; icon: string; hint: string }[] = [
  { id: 'instagram', name: 'Instagram', icon: '📸', hint: 'Copy comments from your Instagram post. Format: "@username: comment" or just usernames, one per line.' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', hint: 'Copy comments from your TikTok video. One username or comment per line.' },
  { id: 'youtube', name: 'YouTube', icon: '▶️', hint: 'Copy comments from your YouTube video. One per line.' },
  { id: 'twitter', name: 'Twitter / X', icon: '𝕏', hint: 'Copy reply handles or retweet usernames. One per line.' },
  { id: 'facebook', name: 'Facebook', icon: '📘', hint: 'Copy commenter names from your Facebook post. One per line.' },
  { id: 'twitch', name: 'Twitch', icon: '🟣', hint: 'Export chat usernames from your Twitch stream. One per line.' },
  { id: 'discord', name: 'Discord', icon: '💬', hint: 'Copy usernames from reactions, roles, or messages. One per line.' },
  { id: 'whatnot', name: 'Whatnot', icon: '🛍️', hint: 'Copy buyer or commenter names from your Whatnot stream. One per line.' },
];

interface ParsedEntry {
  username: string;
  comment: string;
}

const SocialGiveawayInner = () => {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [rawInput, setRawInput] = useState('');
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

  const parsedEntries = useMemo((): ParsedEntry[] => {
    if (!rawInput.trim()) return [];
    return rawInput.split('\n').map(l => l.trim()).filter(Boolean).map(line => {
      // Tab-separated (Google Sheets / Excel paste) — use first column as username
      if (line.includes('\t')) {
        const parts = line.split('\t');
        return { username: parts[0].trim().replace(/^@/, ''), comment: parts.slice(1).join(' ').trim() };
      }
      // "username: comment" format (Instagram, YouTube, TikTok exports)
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0 && colonIndex < 40) {
        return {
          username: line.substring(0, colonIndex).trim().replace(/^@/, ''),
          comment: line.substring(colonIndex + 1).trim(),
        };
      }
      // Plain username or @username
      return { username: line.replace(/^@/, '').trim(), comment: '' };
    }).filter(e => e.username.length > 0 && e.username.length <= 50);
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

    // Story share whitelist — only keep participants who also shared to story
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

    return entries;
  }, [parsedEntries, filters]);

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

  const platformHint = PLATFORMS.find(p => p.id === platform)?.hint ?? '';

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* STEP 1 — Platform selection */}
      <section>
        <h2 className="text-xl font-bold mb-1 text-foreground">1. Choose your platform</h2>
        <p className="text-sm text-muted-foreground mb-4">Select where your giveaway is running</p>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {PLATFORMS.map(p => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                platform === p.id
                  ? 'border-primary bg-primary/10 shadow-md scale-105'
                  : 'border-border hover:border-primary/40 hover:shadow-sm bg-card'
              }`}
            >
              <span className="text-2xl">{p.icon}</span>
              <span className="text-[10px] font-medium text-muted-foreground leading-tight text-center">{p.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* STEP 2 — Paste comments */}
      {platform && (
        <section>
          <h2 className="text-xl font-bold mb-1 text-foreground">2. Paste your comments or usernames</h2>
          <p className="text-sm text-muted-foreground mb-3">{platformHint}</p>
          <textarea
            value={rawInput}
            onChange={e => setRawInput(e.target.value)}
            placeholder={`@user1: I love this! @friend1 @friend2\n@user2: Count me in! @bestie\nuser3\nuser4`}
            className="w-full h-44 p-4 rounded-xl border border-border bg-card font-mono text-sm resize-y focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-muted-foreground">{parsedEntries.length} entries detected</span>
            <button onClick={() => setRawInput('')} className="text-xs text-muted-foreground hover:text-destructive transition-colors">Clear all</button>
          </div>
        </section>
      )}

      {/* STEP 3 — Filters */}
      {parsedEntries.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-1 text-foreground">3. Filter participants</h2>
          <p className="text-sm text-muted-foreground mb-4">Set rules to ensure only valid entries are included</p>

          <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-xl bg-secondary/30 border border-border">

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Required keyword</label>
              <input
                type="text"
                value={filters.requiredKeyword}
                onChange={e => setFilters(f => ({ ...f, requiredKeyword: e.target.value }))}
                placeholder='e.g. "entered" or "#giveaway"'
                className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">Only include entries containing this word</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Minimum @ tags in comment</label>
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
              <input type="checkbox" checked={filters.removeDuplicates} onChange={e => setFilters(f => ({ ...f, removeDuplicates: e.target.checked }))} className="rounded border-border w-4 h-4" />
              <span className="text-sm text-foreground">Remove duplicate usernames</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={filters.excludeBots} onChange={e => setFilters(f => ({ ...f, excludeBots: e.target.checked }))} className="rounded border-border w-4 h-4" />
              <span className="text-sm text-foreground">Exclude suspected bot accounts</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={filters.allowMultipleEntries} onChange={e => setFilters(f => ({ ...f, allowMultipleEntries: e.target.checked }))} className="rounded border-border w-4 h-4" />
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

            {/* Story share whitelist */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1 text-foreground">
                Shared in story (optional whitelist)
              </label>
              <textarea
                value={filters.storyShareList}
                onChange={e => setFilters(f => ({ ...f, storyShareList: e.target.value }))}
                placeholder={"If required, paste usernames of people who shared your story here (one per line).\nLeave empty to skip this filter."}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-border bg-card font-mono text-sm resize-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground"
              />
              <p className="text-xs text-muted-foreground mt-1">Only participants who also appear here will be kept.</p>
            </div>
          </div>

          {/* Filter result + load button */}
          <div className="mt-4 p-4 rounded-xl bg-card border border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-2xl font-bold text-primary">{filteredEntries.length}</span>
                <span className="text-sm text-muted-foreground ml-2">participants after filtering</span>
                {parsedEntries.length !== filteredEntries.length && (
                  <span className="text-xs text-muted-foreground ml-2">({parsedEntries.length - filteredEntries.length} removed)</span>
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
                    {[1,2,3,4,5,10].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <button
                  onClick={loadIntoWheel}
                  disabled={filteredEntries.length < 2}
                  className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  🎰 Load into wheel & spin
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WHEEL SECTION */}
      {loaded && wheelParticipants.length >= 2 && (
        <section ref={wheelRef} className="space-y-4">
          <h2 className="text-xl font-bold text-foreground text-center">4. Spin to pick the winner</h2>
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
