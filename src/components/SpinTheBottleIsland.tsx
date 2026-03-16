import React, { useState, useRef, useCallback } from 'react';

interface SpinTheBottleProps {
  lang?: 'en' | 'fr';
}

const DEFAULTS = ['Alex', 'Jordan', 'Sam', 'Taylor', 'Morgan', 'Riley'];

export default function SpinTheBottleIsland({ lang = 'en' }: SpinTheBottleProps) {
  const [players, setPlayers] = useState<string[]>(DEFAULTS);
  const [newPlayer, setNewPlayer] = useState('');
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const addPlayer = useCallback(() => {
    const name = newPlayer.trim();
    if (name && players.length < 20 && !players.includes(name)) {
      setPlayers(prev => [...prev, name]);
      setNewPlayer('');
    }
  }, [newPlayer, players]);

  const removePlayer = useCallback((index: number) => {
    setPlayers(prev => prev.filter((_, i) => i !== index));
    setSelectedPlayer(null);
  }, []);

  const spin = useCallback(() => {
    if (isSpinning || players.length < 2) return;
    setIsSpinning(true);
    setSelectedPlayer(null);

    const rng = new Uint32Array(2);
    crypto.getRandomValues(rng);
    const extraTurns = 4 + (rng[0] % 5); // 4–8 full rotations
    const finalSlice = rng[1] % players.length;
    const sliceAngle = 360 / players.length;
    const finalAngle = finalSlice * sliceAngle + sliceAngle / 2;
    const totalRotation = rotation + extraTurns * 360 + finalAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setSelectedPlayer(players[finalSlice]);
      setHistory(prev => [players[finalSlice], ...prev].slice(0, 15));
      setIsSpinning(false);
    }, 4200);
  }, [isSpinning, players, rotation]);

  const ui = {
    title: lang === 'fr' ? 'Jeu de la Bouteille en Ligne' : 'Spin the Bottle',
    addPlaceholder: lang === 'fr' ? 'Ajouter un joueur...' : 'Add a player...',
    spinBtn: isSpinning
      ? (lang === 'fr' ? '🍾 En cours...' : '🍾 Spinning...')
      : (lang === 'fr' ? '🍾 Tourner la Bouteille' : '🍾 Spin the Bottle'),
    players: lang === 'fr' ? 'Joueurs' : 'Players',
    history: lang === 'fr' ? 'Historique' : 'History',
    result: lang === 'fr' ? 'La bouteille désigne :' : 'The bottle chose:',
    minPlayers: lang === 'fr' ? 'Ajoutez au moins 2 joueurs' : 'Add at least 2 players',
  };

  const RADIUS = 38; // % from center

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">

        {/* Game area */}
        <div className="flex flex-col items-center flex-1">
          {/* Circle with players + bottle */}
          <div className="relative w-[380px] h-[380px] sm:w-[560px] sm:h-[560px] select-none">

            {/* Dashed circle */}
            <div className="absolute inset-6 rounded-full border-2 border-dashed border-border" />

            {/* Players around the circle */}
            {players.map((player, i) => {
              const angleDeg = (i * 360) / players.length - 90;
              const angleRad = (angleDeg * Math.PI) / 180;
              const x = 50 + RADIUS * Math.cos(angleRad);
              const y = 50 + RADIUS * Math.sin(angleRad);
              const isSelected = selectedPlayer === player && !isSpinning;

              return (
                <div
                  key={`${player}-${i}`}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-500 ${
                    isSelected
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white scale-125 shadow-lg z-10'
                      : 'bg-card text-foreground shadow border border-border'
                  }`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {player}
                </div>
              );
            })}

            {/* Bottle */}
            <div
              className="absolute top-1/2 left-1/2 cursor-pointer"
              style={{
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 4.2s cubic-bezier(0.17, 0.67, 0.08, 0.99)' : 'none',
                transformOrigin: 'center center',
              }}
              onClick={spin}
              title={isSpinning ? '' : ui.spinBtn}
            >
              <svg width="260" height="260" viewBox="0 0 100 100" style={{ display: 'block' }}>
                {/* Bottle pointer dot */}
                <circle cx="50" cy="10" r="7" fill="#f59e0b" />
                {/* Bottle neck */}
                <rect x="44" y="16" width="12" height="22" rx="3" fill="url(#bottleGrad)" />
                {/* Bottle body */}
                <ellipse cx="50" cy="62" rx="16" ry="24" fill="url(#bottleGrad)" />
                {/* Highlight */}
                <ellipse cx="43" cy="58" rx="3.5" ry="12" fill="rgba(255,255,255,0.28)" transform="rotate(-8, 43, 58)" />
                {/* Bottom oval */}
                <ellipse cx="50" cy="84" rx="14" ry="4" fill="rgba(0,0,0,0.12)" />
                <defs>
                  <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#065f46" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Spin button */}
          <button
            onClick={spin}
            disabled={isSpinning || players.length < 2}
            className="mt-6 px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-base hover:shadow-xl hover:scale-105 transition-all disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {players.length < 2 ? ui.minPlayers : ui.spinBtn}
          </button>

          {/* Result */}
          {selectedPlayer && !isSpinning && (
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">{ui.result}</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mt-1">
                {selectedPlayer}
              </p>
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="w-full md:w-64 space-y-4">

          <div>
            <h3 className="font-semibold mb-2 text-foreground">{ui.players} ({players.length}/20)</h3>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newPlayer}
                onChange={e => setNewPlayer(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addPlayer()}
                placeholder={ui.addPlaceholder}
                maxLength={20}
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={addPlayer}
                className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
              >
                +
              </button>
            </div>
            <div className="space-y-1 max-h-52 overflow-y-auto">
              {players.map((player, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg group transition-colors ${
                    selectedPlayer === player && !isSpinning
                      ? 'bg-primary/10 border border-primary/30'
                      : 'bg-secondary/30 hover:bg-secondary/50'
                  }`}
                >
                  <span className="text-sm text-foreground">{player}</span>
                  <button
                    onClick={() => removePlayer(i)}
                    className="text-xs text-muted-foreground/40 opacity-0 group-hover:opacity-100 hover:text-destructive transition-all"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {history.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm text-foreground">{ui.history}</h3>
                <button onClick={() => setHistory([])} className="text-xs text-muted-foreground/50 hover:text-destructive transition-colors">Clear</button>
              </div>
              <div className="space-y-1">
                {history.map((name, i) => (
                  <div key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="text-muted-foreground/50 w-4 text-right shrink-0">{history.length - i}.</span>
                    <span className="font-medium text-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
