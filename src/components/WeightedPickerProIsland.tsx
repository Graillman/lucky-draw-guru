/* WeightedPickerProIsland.tsx
 *
 * Pro-mode weighted random picker for /weighted-random-picker.
 *
 * Features:
 *  - Up to 100 entries with weights from 1 to 9 999
 *  - 4 presets: Equal, Geometric, Tier (1/3/9), Draft (last-priority)
 *  - Bulk paste from CSV / Excel / line-separated text with auto-detection of weight syntax
 *  - 3 tabs: Wheel | Pie chart | Distribution simulator (10 000-run chi² goodness-of-fit)
 *  - Multi-winner mode without replacement
 *  - Export results to CSV with timestamp
 *  - Share configuration via URL parameter
 */
import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Plus, Trash2, Sparkles, FileText, Download, Share2, Play, PieChart, Hash, Activity } from 'lucide-react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SpinningWheel } from '@/components/SpinningWheel';
import DrawButton from '@/components/DrawButton';
import WinnerResult from '@/components/WinnerResult';

// ───── Types ────────────────────────────────────────────────────────────────
interface Item {
  id: string;
  name: string;
  weight: number;
}

interface SimResult {
  observed: number[];
  expected: number[];
  chi2: number;
  df: number;
  pValue: number;
  ranAt: string;
}

// ───── Constants ────────────────────────────────────────────────────────────
const MAX_ENTRIES = 100;
const MAX_WEIGHT = 9999;
const SIM_RUNS = 10000;
const STORAGE_KEY = 'rwp:weighted-pro:v1';

const COLORS = [
  '#e53e3e', '#f5c518', '#38a169', '#3182ce',
  '#805ad5', '#dd6b20', '#319795', '#d53f8c',
  '#2b6cb0', '#276749', '#744210', '#553c9a',
  '#9b2c2c', '#b7791f', '#22543d', '#2a4365',
];

const DEFAULTS: Item[] = [
  { id: 'a', name: 'Alice',   weight: 30 },
  { id: 'b', name: 'Bob',     weight: 20 },
  { id: 'c', name: 'Carol',   weight: 20 },
  { id: 'd', name: 'David',   weight: 10 },
];

// ───── Helpers ──────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 10);

function clampWeight(w: number): number {
  if (!Number.isFinite(w) || w <= 0) return 1;
  return Math.min(MAX_WEIGHT, Math.max(0.01, w));
}

/** Parse a bulk-paste textarea. Accepts CSV, TSV, line-separated, "name:weight" / "name=weight" / "name (weight)". */
function parseBulk(text: string): Item[] {
  return text
    .split(/[\r\n]+/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      // Try "name<sep>weight" patterns
      const sepMatch = line.match(/^(.+?)\s*[,;:=\t]\s*(\d+(?:\.\d+)?)\s*$/);
      if (sepMatch) {
        return { id: uid(), name: sepMatch[1].trim().slice(0, 60), weight: clampWeight(parseFloat(sepMatch[2])) };
      }
      // Try "name (weight)" pattern
      const parenMatch = line.match(/^(.+?)\s*\(\s*(\d+(?:\.\d+)?)\s*\)\s*$/);
      if (parenMatch) {
        return { id: uid(), name: parenMatch[1].trim().slice(0, 60), weight: clampWeight(parseFloat(parenMatch[2])) };
      }
      return { id: uid(), name: line.slice(0, 60), weight: 1 };
    })
    .filter(item => item.name.length > 0)
    .slice(0, MAX_ENTRIES);
}

/** crypto-secure uniform [0, 1) */
function cryptoRand(): number {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] / 0x100000000;
}

/** Walk-through weighted selection */
function pickWeightedIndex(weights: number[], totalOverride?: number): number {
  const total = totalOverride ?? weights.reduce((s, w) => s + w, 0);
  const t = cryptoRand() * total;
  let cum = 0;
  for (let i = 0; i < weights.length; i++) {
    cum += weights[i];
    if (t < cum) return i;
  }
  return weights.length - 1;
}

/** Wilson-Hilferty approximation of chi² p-value */
function chi2pValue(chi2: number, df: number): number {
  if (df <= 0 || chi2 < 0) return 1;
  const a = 2 / (9 * df);
  const z = (Math.cbrt(chi2 / df) - (1 - a)) / Math.sqrt(a);
  return 1 - normalCdf(z);
}

function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z >= 0 ? 1 - p : p;
}

/** Run N weighted draws and compute chi² goodness-of-fit vs declared weights. */
function runSimulation(items: Item[], n: number): SimResult {
  const weights = items.map(i => i.weight);
  const total = weights.reduce((s, w) => s + w, 0);
  const observed = new Array(items.length).fill(0);
  for (let k = 0; k < n; k++) {
    observed[pickWeightedIndex(weights, total)]++;
  }
  const expected = weights.map(w => (w / total) * n);
  let chi2 = 0;
  for (let i = 0; i < items.length; i++) {
    if (expected[i] > 0) {
      chi2 += Math.pow(observed[i] - expected[i], 2) / expected[i];
    }
  }
  const df = items.length - 1;
  const pValue = chi2pValue(chi2, df);
  return { observed, expected, chi2, df, pValue, ranAt: new Date().toISOString() };
}

/** Encode current items + winnersCount into URL-safe base64 */
function encodeShare(items: Item[], winnersCount: number): string {
  const payload = JSON.stringify({ i: items.map(({ name, weight }) => [name, weight]), w: winnersCount });
  return typeof window === 'undefined' ? '' : btoa(encodeURIComponent(payload)).replace(/=+$/, '');
}

function decodeShare(b64: string): { items: Item[]; winnersCount: number } | null {
  try {
    const json = decodeURIComponent(atob(b64.replace(/-/g, '+').replace(/_/g, '/')));
    const data = JSON.parse(json) as { i: [string, number][]; w: number };
    return {
      items: data.i.slice(0, MAX_ENTRIES).map(([name, weight]) => ({ id: uid(), name: String(name).slice(0, 60), weight: clampWeight(Number(weight)) })),
      winnersCount: Math.max(1, Math.min(MAX_ENTRIES, Number(data.w) || 1)),
    };
  } catch { return null; }
}

// ───── Pie chart canvas ─────────────────────────────────────────────────────
function PieChartCanvas({ items, total }: { items: Item[]; total: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || total <= 0) return;
    const dpr = window.devicePixelRatio || 1;
    const size = 360;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2, cy = size / 2;
    const r = size / 2 - 12;
    let angle = -Math.PI / 2;

    items.forEach((item, i) => {
      const slice = (item.weight / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, angle, angle + slice);
      ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Label inside slice if > 4%
      if (item.weight / total > 0.04) {
        const lblA = angle + slice / 2;
        const lx = cx + Math.cos(lblA) * r * 0.62;
        const ly = cy + Math.sin(lblA) * r * 0.62;
        const pct = ((item.weight / total) * 100).toFixed(1);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 3;
        const truncated = item.name.length > 10 ? item.name.slice(0, 9) + '…' : item.name;
        ctx.fillText(truncated, lx, ly - 7);
        ctx.font = '11px system-ui, -apple-system, sans-serif';
        ctx.fillText(`${pct}%`, lx, ly + 8);
        ctx.shadowBlur = 0;
      }

      angle += slice;
    });

    // Inner circle
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.18, 0, Math.PI * 2);
    ctx.fillStyle = '#0a0f1a';
    ctx.fill();
    ctx.fillStyle = '#f5c518';
    ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Σ = ${total.toFixed(total % 1 === 0 ? 0 : 1)}`, cx, cy);
  }, [items, total]);

  return <canvas ref={canvasRef} className="block mx-auto" aria-label="Probability distribution pie chart" />;
}

// ───── Main component ──────────────────────────────────────────────────────
const WeightedPickerProInner = () => {
  const [items, setItems] = useState<Item[]>(DEFAULTS);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [activeTab, setActiveTab] = useState<'wheel' | 'pie' | 'sim'>('wheel');
  const [winnersCount, setWinnersCount] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winners, setWinners] = useState<string[]>([]);
  const [simResult, setSimResult] = useState<SimResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  // ── Load from URL share param or localStorage on mount ─────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    const shareParam = urlParams.get('s');
    if (shareParam) {
      const decoded = decodeShare(shareParam);
      if (decoded && decoded.items.length > 0) {
        setItems(decoded.items);
        setWinnersCount(decoded.winnersCount);
        return;
      }
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved) as { items: Item[]; winnersCount: number };
        if (Array.isArray(data.items) && data.items.length > 0) {
          setItems(data.items);
          setWinnersCount(data.winnersCount || 1);
        }
      }
    } catch { /* ignore */ }
  }, []);

  // ── Persist to localStorage on change ──────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, winnersCount }));
    } catch { /* quota exceeded — ignore */ }
  }, [items, winnersCount]);

  const totalWeight = useMemo(() => items.reduce((s, i) => s + i.weight, 0), [items]);
  const participants = useMemo(() => items.map(i => ({ pseudo: i.name, weight: i.weight })), [items]);

  const getPct = useCallback((weight: number) => totalWeight > 0 ? ((weight / totalWeight) * 100).toFixed(1) : '0.0', [totalWeight]);

  // ── Item ops ───────────────────────────────────────────────────
  const addItem = useCallback(() => {
    if (items.length >= MAX_ENTRIES) return;
    setItems(prev => [...prev, { id: uid(), name: `Entry ${prev.length + 1}`, weight: 10 }]);
  }, [items.length]);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateName = useCallback((id: string, name: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, name: name.slice(0, 60) } : i));
  }, []);

  const updateWeight = useCallback((id: string, weightInput: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, weight: clampWeight(weightInput) } : i));
  }, []);

  // ── Presets ────────────────────────────────────────────────────
  const applyPreset = useCallback((preset: 'equal' | 'geometric' | 'tier' | 'draft' | 'clear') => {
    if (preset === 'clear') {
      setItems([{ id: uid(), name: 'Entry 1', weight: 1 }, { id: uid(), name: 'Entry 2', weight: 1 }]);
      return;
    }
    setItems(prev => prev.map((item, i) => {
      let weight = 1;
      if (preset === 'equal') weight = 1;
      if (preset === 'geometric') weight = Math.pow(2, Math.min(i, 12)); // 1, 2, 4, 8, 16... capped at 4096
      if (preset === 'tier') {
        const t = i % 3;
        weight = t === 0 ? 9 : t === 1 ? 3 : 1; // gold/silver/bronze cycling
      }
      if (preset === 'draft') weight = Math.max(1, prev.length - i); // last-place gets highest
      return { ...item, weight };
    }));
  }, []);

  // ── Bulk paste ─────────────────────────────────────────────────
  const handleBulkPaste = useCallback(() => {
    const parsed = parseBulk(bulkText);
    if (parsed.length > 0) {
      setItems(parsed);
      setBulkOpen(false);
      setBulkText('');
    }
  }, [bulkText]);

  // ── Simulator ──────────────────────────────────────────────────
  const handleRunSimulation = useCallback(() => {
    if (isSimulating || items.length < 2) return;
    setIsSimulating(true);
    // Yield to the event loop so the spinner renders before the heavy compute
    setTimeout(() => {
      const result = runSimulation(items, SIM_RUNS);
      setSimResult(result);
      setIsSimulating(false);
    }, 16);
  }, [isSimulating, items]);

  // ── Spin ───────────────────────────────────────────────────────
  const handleDraw = useCallback(() => {
    if (isSpinning || items.length < 2) return;
    setActiveTab('wheel');
    setIsSpinning(true);
    setWinners([]);
    setTimeout(() => wheelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
  }, [isSpinning, items.length]);

  const handleComplete = useCallback((w: string[]) => {
    setWinners(w);
    setIsSpinning(false);
  }, []);

  const handleRelaunch = useCallback(() => {
    setWinners([]);
    setTimeout(() => setIsSpinning(true), 100);
  }, []);

  // ── Export / Share ─────────────────────────────────────────────
  const handleExportCSV = useCallback(() => {
    const ts = new Date().toISOString();
    const rows = [
      ['Timestamp', 'Entry', 'Weight', 'Probability (%)', 'Was Winner'].join(','),
      ...items.map(i => [
        ts,
        `"${i.name.replace(/"/g, '""')}"`,
        i.weight.toString(),
        getPct(i.weight),
        winners.includes(i.name) ? 'Yes' : 'No',
      ].join(',')),
    ].join('\n');
    const blob = new Blob([rows], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `weighted-draw-${ts.replace(/[:.]/g, '-').slice(0, 19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [items, winners, getPct]);

  const handleShareConfig = useCallback(async () => {
    const param = encodeShare(items, winnersCount);
    const shareUrl = `${window.location.origin}${window.location.pathname}?s=${param}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareToast('Link copied to clipboard');
    } catch {
      setShareToast(shareUrl);
    }
    setTimeout(() => setShareToast(null), 3500);
  }, [items, winnersCount]);

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="max-w-5xl mx-auto bg-card border border-border rounded-2xl shadow-lg p-4 md:p-6 space-y-5">

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
          <h2 className="text-base md:text-lg font-bold text-foreground">Weighted Picker — Pro mode</h2>
          <span className="text-xs text-muted-foreground hidden md:inline">{items.length}/{MAX_ENTRIES} entries · Σ {totalWeight.toFixed(totalWeight % 1 === 0 ? 0 : 1)}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button onClick={handleShareConfig} className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-muted/60 hover:bg-muted text-foreground transition-colors" aria-label="Share configuration via URL">
            <Share2 className="w-3.5 h-3.5" aria-hidden="true" /> Share
          </button>
          <button onClick={handleExportCSV} className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-muted/60 hover:bg-muted text-foreground transition-colors" aria-label="Export current configuration to CSV">
            <Download className="w-3.5 h-3.5" aria-hidden="true" /> CSV
          </button>
          <button onClick={() => setBulkOpen(b => !b)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-muted/60 hover:bg-muted text-foreground transition-colors" aria-label="Open bulk paste editor">
            <FileText className="w-3.5 h-3.5" aria-hidden="true" /> Bulk paste
          </button>
        </div>
      </div>

      {shareToast && (
        <div className="text-xs text-center py-2 px-3 bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/30 rounded-md break-all">
          {shareToast}
        </div>
      )}

      {/* Bulk paste area */}
      {bulkOpen && (
        <div className="rounded-xl border border-border bg-muted/20 p-3 space-y-2">
          <p className="text-xs text-muted-foreground">
            Paste from Excel / Google Sheets / CSV / one per line. Supported: <code className="bg-muted px-1 rounded">Alice, 3</code>, <code className="bg-muted px-1 rounded">Alice: 3</code>, <code className="bg-muted px-1 rounded">Alice (3)</code>, <code className="bg-muted px-1 rounded">{'Alice'}[TAB]{'3'}</code>, or just <code className="bg-muted px-1 rounded">Alice</code> (defaults weight 1).
          </p>
          <textarea
            value={bulkText}
            onChange={e => setBulkText(e.target.value)}
            placeholder={`Alice: 3\nBob: 1\nCarol: 1\nDavid: 1\nEva (5)`}
            rows={8}
            className="w-full text-sm bg-card border border-border rounded-md p-2 font-mono text-foreground outline-none focus:ring-2 focus:ring-primary"
            aria-label="Bulk paste participant list"
          />
          <div className="flex gap-2 justify-end">
            <button onClick={() => { setBulkOpen(false); setBulkText(''); }} className="px-3 py-1.5 text-xs rounded-md bg-muted hover:bg-muted/70 text-muted-foreground">Cancel</button>
            <button onClick={handleBulkPaste} disabled={!bulkText.trim()} className="px-3 py-1.5 text-xs rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed font-bold">
              Replace list ({parseBulk(bulkText).length} entries)
            </button>
          </div>
        </div>
      )}

      {/* Presets */}
      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="text-xs font-semibold text-muted-foreground mr-1">Presets:</span>
        {([
          { id: 'equal', label: 'Equal', desc: 'All weights = 1' },
          { id: 'geometric', label: 'Geometric ×2', desc: '1, 2, 4, 8, 16…' },
          { id: 'tier', label: 'Tier (Gold/Silver/Bronze)', desc: '9 / 3 / 1 cycling' },
          { id: 'draft', label: 'Draft priority', desc: 'Last-place highest' },
          { id: 'clear', label: 'Reset', desc: '2 entries, weight 1' },
        ] as const).map(p => (
          <button
            key={p.id}
            onClick={() => applyPreset(p.id)}
            title={p.desc}
            className="px-2.5 py-1 rounded-md text-xs font-medium bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] gap-6 items-start">

        {/* LEFT — Items list */}
        <div className="space-y-2 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">Entries &amp; weights</h3>
            <button
              onClick={addItem}
              disabled={items.length >= MAX_ENTRIES}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Add a new entry"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" /> Add
            </button>
          </div>

          <div className="max-h-[420px] overflow-y-auto pr-1 space-y-1.5 rounded-md border border-border bg-muted/10 p-2">
            {items.map((item, idx) => {
              const pct = parseFloat(getPct(item.weight));
              const color = COLORS[idx % COLORS.length];
              return (
                <div key={item.id} className="flex items-center gap-2 p-2 rounded-md bg-card border border-border">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} aria-hidden="true" />
                  <input
                    type="text"
                    value={item.name}
                    onChange={e => updateName(item.id, e.target.value)}
                    className="flex-1 min-w-0 text-sm bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                    placeholder="Entry name"
                    maxLength={60}
                    aria-label={`Name for entry ${idx + 1}`}
                  />
                  <input
                    type="number"
                    min={1}
                    max={MAX_WEIGHT}
                    step={1}
                    value={item.weight}
                    onChange={e => updateWeight(item.id, Number(e.target.value))}
                    className="w-16 text-center text-xs border border-border rounded-md bg-card text-foreground outline-none focus:ring-1 focus:ring-primary py-1 tabular-nums"
                    aria-label={`Weight for ${item.name}`}
                  />
                  <span className="text-xs font-bold text-primary min-w-[44px] text-right tabular-nums">{pct}%</span>
                  {items.length > 2 && (
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground/40 hover:text-destructive transition-colors p-1"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Multi-winner control */}
          <div className="flex items-center gap-3 p-3 rounded-md border border-border bg-muted/10">
            <Hash className="w-4 h-4 text-primary" aria-hidden="true" />
            <label htmlFor="winnersCount" className="text-xs font-medium text-foreground">Winners to draw:</label>
            <input
              id="winnersCount"
              type="number"
              min={1}
              max={Math.max(1, items.length)}
              value={winnersCount}
              onChange={e => setWinnersCount(Math.max(1, Math.min(items.length, Number(e.target.value) || 1)))}
              className="w-16 text-center text-sm border border-border rounded-md bg-card text-foreground outline-none focus:ring-1 focus:ring-primary py-1 tabular-nums"
            />
            <span className="text-xs text-muted-foreground">of {items.length}</span>
            {winnersCount > 1 && <span className="text-xs text-muted-foreground italic ml-auto">Without replacement</span>}
          </div>
        </div>

        {/* RIGHT — Tabbed visualisation */}
        <div className="space-y-3 min-w-0">

          {/* Tabs */}
          <div role="tablist" className="inline-flex rounded-lg border border-border bg-muted/30 p-1 text-xs font-medium">
            {([
              { id: 'wheel', label: 'Wheel', Icon: Play },
              { id: 'pie',   label: 'Pie chart', Icon: PieChart },
              { id: 'sim',   label: 'Simulator', Icon: Activity },
            ] as const).map(({ id, label, Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-all ${activeTab === id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" /> {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div ref={wheelRef} className="rounded-xl border border-border bg-card p-4 min-h-[400px] flex flex-col items-center justify-center">

            {activeTab === 'wheel' && (
              <div className="flex flex-col items-center gap-4 w-full">
                <SpinningWheel
                  participants={participants}
                  isSpinning={isSpinning}
                  onComplete={handleComplete}
                  mode="advanced"
                  winnersCount={winnersCount}
                  onSpin={handleDraw}
                  size={420}
                  idleAnimation={false}
                />
                {!isSpinning && winners.length === 0 && (
                  <DrawButton onDraw={handleDraw} isSpinning={isSpinning} disabled={items.length < 2} participantCount={items.length} mode="advanced" />
                )}
                {winners.length > 0 && !isSpinning && (
                  <WinnerResult winners={winners} onRelaunch={handleRelaunch} mode="advanced" />
                )}
              </div>
            )}

            {activeTab === 'pie' && (
              <div className="space-y-3 w-full">
                <PieChartCanvas items={items} total={totalWeight} />
                <p className="text-xs text-muted-foreground text-center">Live probability distribution. Slice size = entry weight ÷ total weight.</p>
              </div>
            )}

            {activeTab === 'sim' && (
              <div className="space-y-4 w-full">
                <div className="text-center space-y-2">
                  <Activity className="w-8 h-8 text-primary mx-auto" aria-hidden="true" />
                  <h4 className="text-base font-bold text-foreground">Distribution simulator</h4>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto">
                    Run {SIM_RUNS.toLocaleString('en-US')} weighted draws and verify the empirical distribution matches your declared weights with a chi-squared goodness-of-fit test.
                  </p>
                  <button
                    onClick={handleRunSimulation}
                    disabled={isSimulating || items.length < 2}
                    className="px-4 py-2 rounded-md text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {isSimulating ? 'Running…' : `Run ${SIM_RUNS.toLocaleString('en-US')} simulations`}
                  </button>
                </div>

                {simResult && (
                  <div className="space-y-3 pt-2">
                    {/* Histogram */}
                    <div className="space-y-1.5">
                      {items.map((item, i) => {
                        const obs = simResult.observed[i];
                        const exp = simResult.expected[i];
                        const obsPct = (obs / SIM_RUNS) * 100;
                        const expPct = (exp / SIM_RUNS) * 100;
                        const maxPct = Math.max(...simResult.expected.map(e => e / SIM_RUNS * 100));
                        return (
                          <div key={item.id} className="flex items-center gap-2 text-xs">
                            <span className="w-20 truncate text-foreground" title={item.name}>{item.name}</span>
                            <div className="flex-1 h-5 rounded bg-muted/30 overflow-hidden relative">
                              <div className="absolute inset-y-0 left-0 bg-primary/30" style={{ width: `${(expPct / maxPct) * 100}%` }} />
                              <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${(obsPct / maxPct) * 100}%`, opacity: 0.85 }} />
                            </div>
                            <span className="text-muted-foreground tabular-nums w-32 text-right">
                              {obs.toLocaleString('en-US')} / {Math.round(exp).toLocaleString('en-US')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-xs text-muted-foreground flex gap-3 justify-center">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 inline-block bg-primary" /> Observed</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 inline-block bg-primary/30" /> Expected</span>
                    </div>

                    {/* Stat verdict */}
                    <div className={`rounded-lg p-3 border ${simResult.pValue > 0.05 ? 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-700 dark:text-yellow-400'}`}>
                      <div className="font-mono text-xs space-y-0.5">
                        <div>chi-squared = {simResult.chi2.toFixed(3)}</div>
                        <div>degrees of freedom (df) = {simResult.df}</div>
                        <div>p-value ≈ {simResult.pValue.toFixed(4)}</div>
                      </div>
                      <div className="text-sm font-bold mt-2">
                        {simResult.pValue > 0.05
                          ? '✓ Distribution matches declared weights at standard statistical confidence.'
                          : '⚠ Marginal — distribution may deviate slightly. Re-run for confirmation.'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-md bg-muted/20 border border-border p-2">
              <div className="text-muted-foreground">Entries</div>
              <div className="text-base font-bold text-foreground tabular-nums">{items.length}</div>
            </div>
            <div className="rounded-md bg-muted/20 border border-border p-2">
              <div className="text-muted-foreground">Total weight</div>
              <div className="text-base font-bold text-foreground tabular-nums">{totalWeight.toFixed(totalWeight % 1 === 0 ? 0 : 1)}</div>
            </div>
            <div className="rounded-md bg-muted/20 border border-border p-2">
              <div className="text-muted-foreground">Winners</div>
              <div className="text-base font-bold text-foreground tabular-nums">{winnersCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WeightedPickerProIsland = () => (
  <LanguageProvider>
    <WeightedPickerProInner />
  </LanguageProvider>
);

export default WeightedPickerProIsland;
