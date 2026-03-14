import React, { useState, useMemo, useCallback, useRef } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SpinningWheel } from '@/components/SpinningWheel';
import DrawButton from '@/components/DrawButton';
import WinnerResult from '@/components/WinnerResult';

interface Item {
  id: string;
  name: string;
  weight: number;
}

const DEFAULTS: Item[] = [
  { id: '1', name: 'Option A', weight: 40 },
  { id: '2', name: 'Option B', weight: 30 },
  { id: '3', name: 'Option C', weight: 20 },
  { id: '4', name: 'Option D', weight: 10 },
];

const COLORS = [
  '#e53e3e', '#f5c518', '#38a169', '#3182ce',
  '#805ad5', '#dd6b20', '#319795', '#d53f8c',
  '#2b6cb0', '#276749', '#744210', '#553c9a',
];

const uid = () => Math.random().toString(36).slice(2, 9);

const ProbabilityPickerInner = () => {
  const [items, setItems] = useState<Item[]>(DEFAULTS);
  const [newName, setNewName] = useState('');
  const [winners, setWinners] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const totalWeight = useMemo(() => items.reduce((s, i) => s + i.weight, 0), [items]);

  const participants = useMemo(
    () => items.map(i => ({ pseudo: i.name, weight: i.weight })),
    [items]
  );

  const getPct = (weight: number) =>
    totalWeight > 0 ? ((weight / totalWeight) * 100).toFixed(1) : '0.0';

  const addItem = useCallback(() => {
    const name = newName.trim();
    if (!name || items.length >= 20) return;
    setItems(prev => [...prev, { id: uid(), name, weight: 10 }]);
    setNewName('');
  }, [newName, items.length]);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateWeight = useCallback((id: string, weight: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, weight: Math.max(1, Math.min(100, weight)) } : i));
  }, []);

  const updateName = useCallback((id: string, name: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, name } : i));
  }, []);

  const handleDraw = useCallback(() => {
    if (isSpinning || items.length < 2) return;
    setIsSpinning(true);
    setWinners([]);
    wheelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [isSpinning, items.length]);

  const handleComplete = useCallback((w: string[]) => {
    setWinners(w);
    setIsSpinning(false);
  }, []);

  const handleRelaunch = useCallback(() => {
    setWinners([]);
    setTimeout(() => setIsSpinning(true), 100);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Formula banner */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border">
        <span className="text-2xl">📊</span>
        <div>
          <p className="text-sm font-semibold text-foreground">Probability formula</p>
          <p className="text-xs text-muted-foreground font-mono">P(X) = weight(X) ÷ Σ(all weights) × 100%</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-muted-foreground">Total weight</p>
          <p className="text-lg font-bold text-primary">{totalWeight}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr,auto] gap-8 items-start">

        {/* Items table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Options & Weights</h2>
            <span className="text-xs text-muted-foreground">{items.length}/20 items</span>
          </div>

          {items.map((item, idx) => {
            const pct = parseFloat(getPct(item.weight));
            const color = COLORS[idx % COLORS.length];
            return (
              <div key={item.id} className="p-3 rounded-xl border border-border bg-card space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <input
                    type="text"
                    value={item.name}
                    onChange={e => updateName(item.id, e.target.value)}
                    className="flex-1 text-sm font-medium bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                    placeholder="Option name"
                    maxLength={40}
                  />
                  <span className="text-xs font-bold text-primary min-w-[42px] text-right">
                    {pct}%
                  </span>
                  {items.length > 2 && (
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground/40 hover:text-destructive transition-colors text-xs ml-1">✕</button>
                  )}
                </div>

                {/* Slider + weight input */}
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={item.weight}
                    onChange={e => updateWeight(item.id, Number(e.target.value))}
                    className="flex-1 accent-primary"
                    style={{ accentColor: color }}
                  />
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={item.weight}
                    onChange={e => updateWeight(item.id, Number(e.target.value))}
                    className="w-14 text-center text-sm border border-border rounded-lg bg-card text-foreground outline-none focus:ring-1 focus:ring-primary py-0.5"
                  />
                </div>

                {/* Probability bar */}
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}

          {/* Add item */}
          {items.length < 20 && (
            <div className="flex gap-2">
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addItem()}
                placeholder="Add a new option..."
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={addItem}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
              >
                + Add
              </button>
            </div>
          )}

          {/* Probability summary table */}
          <div className="mt-2 rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-3 text-xs font-semibold text-muted-foreground bg-secondary/30 px-3 py-2 uppercase tracking-wide">
              <span>Option</span>
              <span className="text-center">Weight</span>
              <span className="text-right">Probability</span>
            </div>
            {items.map((item, idx) => (
              <div key={item.id} className="grid grid-cols-3 text-sm px-3 py-2 border-t border-border hover:bg-secondary/20">
                <span className="flex items-center gap-2 text-foreground truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  {item.name}
                </span>
                <span className="text-center text-muted-foreground">{item.weight}</span>
                <span className="text-right font-semibold text-primary">{getPct(item.weight)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Wheel */}
        <div ref={wheelRef} className="flex flex-col items-center space-y-4">
          <SpinningWheel
            participants={participants}
            isSpinning={isSpinning}
            onComplete={handleComplete}
            mode="advanced"
            winnersCount={1}
            onSpin={handleDraw}
          />
          {!isSpinning && winners.length === 0 && (
            <DrawButton onDraw={handleDraw} isSpinning={isSpinning} disabled={items.length < 2} participantCount={items.length} mode="advanced" />
          )}
          {winners.length > 0 && !isSpinning && (
            <WinnerResult winners={winners} onRelaunch={handleRelaunch} mode="advanced" />
          )}
        </div>
      </div>
    </div>
  );
};

const ProbabilityPickerIsland = () => (
  <LanguageProvider>
    <ProbabilityPickerInner />
  </LanguageProvider>
);

export default ProbabilityPickerIsland;
