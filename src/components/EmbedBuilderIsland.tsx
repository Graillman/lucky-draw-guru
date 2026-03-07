import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const EMBED_SIZES = [
  { label: "Small (400×500)", width: 400, height: 500 },
  { label: "Medium (600×650)", width: 600, height: 650 },
  { label: "Large (800×700)", width: 800, height: 700 },
  { label: "Full width", width: "100%", height: 700 },
];

const EMBED_PAGES = [
  { label: "Spin the Wheel", path: "/" },
  { label: "Giveaway Picker", path: "/giveaway-picker" },
  { label: "Yes or No Wheel", path: "/yes-or-no-wheel" },
  { label: "Classroom Picker", path: "/classroom-picker" },
  { label: "Team Generator", path: "/team-generator" },
  { label: "Random Number Generator", path: "/random-number-generator" },
];

const EmbedBuilderIsland = () => {
  const [selectedSize, setSelectedSize] = useState(EMBED_SIZES[1]);
  const [selectedPage, setSelectedPage] = useState(EMBED_PAGES[0]);
  const [copied, setCopied] = useState(false);

  const embedUrl = `https://realwheelpicker.com${selectedPage.path}?embed=1`;
  const widthAttr = typeof selectedSize.width === "number" ? `${selectedSize.width}` : selectedSize.width;
  const embedCode = `<iframe
  src="${embedUrl}"
  width="${widthAttr}"
  height="${selectedSize.height}"
  style="border:none;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.15);"
  allow="clipboard-write"
  title="Real Wheel Picker"
  loading="lazy"
></iframe>
<!-- Powered by realwheelpicker.com — Free spin the wheel tool -->`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <section className="bg-card border border-border rounded-2xl p-6 space-y-6">
      <h2 className="text-xl font-bold text-foreground">Customize Your Embed</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Tool selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Select Tool</label>
          <div className="grid grid-cols-1 gap-2">
            {EMBED_PAGES.map((page) => (
              <button
                key={page.path}
                onClick={() => setSelectedPage(page)}
                className={`text-left px-4 py-2.5 rounded-lg border transition-colors text-sm ${
                  selectedPage.path === page.path
                    ? "border-primary bg-primary/10 text-primary font-medium"
                    : "border-border hover:border-primary/50 text-foreground"
                }`}
              >
                {page.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Select Size</label>
          <div className="grid grid-cols-1 gap-2">
            {EMBED_SIZES.map((size) => (
              <button
                key={size.label}
                onClick={() => setSelectedSize(size)}
                className={`text-left px-4 py-2.5 rounded-lg border transition-colors text-sm ${
                  selectedSize.label === size.label
                    ? "border-primary bg-primary/10 text-primary font-medium"
                    : "border-border hover:border-primary/50 text-foreground"
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Code output */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Embed Code</label>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Code</>}
          </Button>
        </div>
        <pre className="bg-secondary text-foreground text-xs md:text-sm p-4 rounded-xl overflow-x-auto border border-border leading-relaxed font-mono">
          {embedCode}
        </pre>
      </div>

      {/* Preview link */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ExternalLink className="w-4 h-4" />
        <span>Preview: </span>
        <a href={embedUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          {embedUrl}
        </a>
      </div>
    </section>
  );
};

export default EmbedBuilderIsland;
