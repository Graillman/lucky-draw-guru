import { useState, useEffect } from 'react';
import { getPublicWheels, type SavedWheel } from '@/lib/wheelGallery';

const THEME_COLORS: Record<string, string[]> = {
  default: ['#e74c8a','#f97316','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#3b82f6'],
  neon:    ['#ff00ff','#00ffff','#ff0080','#80ff00','#ff8000','#0080ff','#ff00ff','#00ff80'],
  gold:    ['#FFD700','#FFC200','#FFB300','#FFA500','#FF8C00','#DAA520','#B8860B','#FFD700'],
  pastel:  ['#f9a8d4','#a5f3fc','#bbf7d0','#fde68a','#ddd6fe','#fed7aa','#bfdbfe','#f9a8d4'],
  galaxy:  ['#7c3aed','#4f46e5','#0891b2','#059669','#d97706','#dc2626','#db2777','#7c3aed'],
  mono:    ['#e5e5e5','#a3a3a3','#737373','#525252','#404040','#262626','#e5e5e5','#a3a3a3'],
  ocean:   ['#06b6d4','#0891b2','#0284c7','#0ea5e9','#38bdf8','#7dd3fc','#bae6fd','#06b6d4'],
  sunset:  ['#f97316','#ef4444','#ec4899','#f59e0b','#f97316','#ef4444','#ec4899','#f59e0b'],
  forest:  ['#16a34a','#15803d','#166534','#4ade80','#22c55e','#86efac','#16a34a','#15803d'],
};

function WheelPreview({ items, theme }: { items: string[]; theme: string }) {
  const colors = THEME_COLORS[theme] || THEME_COLORS.default;
  const count = Math.min(items.length, 12);
  const segments = Array.from({ length: count }, (_, i) => {
    const start = (i / count) * 360;
    const end = ((i + 1) / count) * 360;
    return { color: colors[i % colors.length], start, end };
  });

  const polarToCartesian = (deg: number, r: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: 50 + r * Math.cos(rad), y: 50 + r * Math.sin(rad) };
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full aspect-square rounded-full">
      {segments.map((seg, i) => {
        const s = polarToCartesian(seg.start, 48);
        const e = polarToCartesian(seg.end, 48);
        const large = seg.end - seg.start > 180 ? 1 : 0;
        return (
          <path
            key={i}
            d={`M50,50 L${s.x},${s.y} A48,48 0 ${large},1 ${e.x},${e.y} Z`}
            fill={seg.color}
          />
        );
      })}
      <circle cx="50" cy="50" r="8" fill="white" opacity="0.9" />
    </svg>
  );
}

export default function GalleryIsland() {
  const [wheels, setWheels] = useState<SavedWheel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPublicWheels(30)
      .then(w => { setWheels(w); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card animate-pulse">
            <div className="aspect-square bg-muted rounded-t-xl" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-muted rounded w-2/3" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || wheels.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-4xl mb-4">🎡</p>
        <p className="text-lg font-medium">No wheels yet</p>
        <p className="text-sm mt-1">Be the first to save a wheel from the homepage!</p>
        <a href="/" className="mt-4 inline-block px-6 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity">
          Create a wheel
        </a>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {wheels.map(w => (
        <a
          key={w.id}
          href={`/?wheel=${w.id}`}
          className="block rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/40 transition-all overflow-hidden group"
        >
          <div className="p-6 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
            <div className="w-32 h-32 drop-shadow-md">
              <WheelPreview items={w.items} theme={w.theme} />
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {w.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {w.items.length} items · by {w.author_name}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              🎡 {w.spin_count.toLocaleString()} spins
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {w.items.slice(0, 4).map((item, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-muted rounded text-xs text-muted-foreground truncate max-w-[80px]">
                  {item}
                </span>
              ))}
              {w.items.length > 4 && (
                <span className="px-1.5 py-0.5 bg-muted rounded text-xs text-muted-foreground">
                  +{w.items.length - 4}
                </span>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
