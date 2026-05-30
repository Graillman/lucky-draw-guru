import { useMemo, useState } from "react";
import { Copy, Check, ExternalLink, Link2, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmbedAttribution, { buildAttributionHtml } from "@/components/EmbedAttribution";

const SITE_URL = "https://realwheelpicker.com";

const EMBED_PAGES = [
  { label: "Spin the Wheel", path: "/" },
  { label: "Giveaway Picker", path: "/giveaway-picker" },
  { label: "Yes or No Wheel", path: "/yes-no-wheel" },
  { label: "Classroom Picker", path: "/classroom-picker" },
  { label: "Team Generator", path: "/team-generator" },
  { label: "Random Number Generator", path: "/random-number-picker" },
];

/**
 * Sizes drive the wrapper aspect-ratio (responsive) AND the fallback fixed
 * dimensions. Width is always fluid (max-width); height comes from the ratio so
 * the iframe scales cleanly on mobile.
 */
const EMBED_SIZES = [
  { label: "Compact", maxWidth: 420, ratio: "4 / 5" },
  { label: "Standard", maxWidth: 600, ratio: "10 / 11" },
  { label: "Large", maxWidth: 800, ratio: "8 / 7" },
  { label: "Full width", maxWidth: null, ratio: "10 / 9" }, // null = 100%
];

/** Accent themes applied to the snippet wrapper (border + shadow color). */
const THEMES = [
  { label: "Light", border: "#e5e7eb", bg: "#ffffff", shadow: "rgba(0,0,0,0.08)" },
  { label: "Dark", border: "#1f2937", bg: "#0a0f1a", shadow: "rgba(0,0,0,0.35)" },
  { label: "Gold", border: "#e7c66b", bg: "#fffdf5", shadow: "rgba(184,134,11,0.18)" },
  { label: "None", border: "transparent", bg: "transparent", shadow: "transparent" },
];

const EmbedBuilderIsland = () => {
  const [selectedPage, setSelectedPage] = useState(EMBED_PAGES[0]);
  const [selectedSize, setSelectedSize] = useState(EMBED_SIZES[1]);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[2]);
  const [title, setTitle] = useState("");
  const [tab, setTab] = useState<"iframe" | "link">("iframe");
  const [copied, setCopied] = useState(false);

  const embedUrl = `${SITE_URL}${selectedPage.path}?embed=1`;
  const directUrl = `${SITE_URL}${selectedPage.path}`;

  const maxWidthCss = selectedSize.maxWidth ? `${selectedSize.maxWidth}px` : "100%";
  const iframeTitle = title.trim() || `${selectedPage.label} — Real Wheel Picker`;

  // Responsive snippet: a <figure> wrapper with aspect-ratio so the iframe
  // scales fluidly, plus the visible dofollow attribution (the backlink).
  const embedCode = useMemo(() => {
    const attribution = buildAttributionHtml(title.trim() || undefined);
    const frameStyle =
      selectedTheme.label === "None"
        ? "position:relative;width:100%;height:100%;"
        : `position:relative;width:100%;height:100%;border:1px solid ${selectedTheme.border};border-radius:14px;overflow:hidden;background:${selectedTheme.bg};box-shadow:0 8px 30px ${selectedTheme.shadow};`;

    return `<!-- Real Wheel Picker — free embeddable spin-the-wheel widget. Keep the attribution link below. -->
<figure style="margin:0 auto;max-width:${maxWidthCss};">
  <div style="${frameStyle}aspect-ratio:${selectedSize.ratio};">
    <iframe
      src="${embedUrl}"
      title="${iframeTitle.replace(/"/g, "&quot;")}"
      style="position:absolute;inset:0;width:100%;height:100%;border:0;"
      loading="lazy"
      allow="clipboard-write"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
${attribution}
</figure>`;
  }, [embedUrl, iframeTitle, maxWidthCss, selectedSize.ratio, selectedTheme, title]);

  const linkCode = useMemo(() => {
    const label = title.trim() || selectedPage.label;
    return `<a href="${directUrl}" target="_blank" rel="noopener">${label} — powered by Real Wheel Picker</a>`;
  }, [directUrl, selectedPage.label, title]);

  const activeCode = tab === "iframe" ? embedCode : linkCode;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <section className="bg-card border border-border rounded-2xl p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-foreground">Build Your Embed</h2>
        <p className="text-sm text-muted-foreground">
          Customize it, copy one line of code, and paste it on your site. It stays{" "}
          <span className="font-medium text-foreground">free forever</span> — the only ask is
          you keep the small{" "}
          <span className="font-medium text-foreground">“Powered by Real Wheel Picker”</span>{" "}
          credit link visible.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ---- Controls ---- */}
        <div className="space-y-5">
          {/* Tool selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tool</label>
            <div className="grid grid-cols-2 gap-2">
              {EMBED_PAGES.map((page) => (
                <button
                  key={page.path}
                  onClick={() => setSelectedPage(page)}
                  className={`text-left px-3 py-2 rounded-lg border transition-colors text-sm ${
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
            <label className="text-sm font-medium text-foreground">Size</label>
            <div className="grid grid-cols-4 gap-2">
              {EMBED_SIZES.map((size) => (
                <button
                  key={size.label}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 py-2 rounded-lg border transition-colors text-xs ${
                    selectedSize.label === size.label
                      ? "border-primary bg-primary/10 text-primary font-medium"
                      : "border-border hover:border-primary/50 text-foreground"
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Width: {maxWidthCss === "100%" ? "100% (fluid)" : maxWidthCss} · scales responsively
              via aspect-ratio.
            </p>
          </div>

          {/* Theme selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Frame style</label>
            <div className="grid grid-cols-4 gap-2">
              {THEMES.map((theme) => (
                <button
                  key={theme.label}
                  onClick={() => setSelectedTheme(theme)}
                  className={`px-2 py-2 rounded-lg border transition-colors text-xs ${
                    selectedTheme.label === theme.label
                      ? "border-primary bg-primary/10 text-primary font-medium"
                      : "border-border hover:border-primary/50 text-foreground"
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          {/* Optional title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="embed-title">
              Caption label <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <input
              id="embed-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Our Weekly Giveaway"
              maxLength={60}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <p className="text-xs text-muted-foreground">
              Shown in the credit line, e.g. “{title.trim() || "Powered by"} Real Wheel Picker”.
            </p>
          </div>
        </div>

        {/* ---- Live preview ---- */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Live preview</label>
          <div className="rounded-xl border border-dashed border-border bg-secondary/40 p-4">
            <figure
              className="mx-auto"
              style={{ maxWidth: maxWidthCss, margin: "0 auto" }}
            >
              <div
                className="relative w-full overflow-hidden rounded-xl"
                style={{
                  aspectRatio: selectedSize.ratio,
                  border:
                    selectedTheme.label === "None"
                      ? "none"
                      : `1px solid ${selectedTheme.border}`,
                  background: selectedTheme.label === "None" ? "transparent" : selectedTheme.bg,
                  boxShadow:
                    selectedTheme.label === "None" ? "none" : `0 8px 30px ${selectedTheme.shadow}`,
                }}
              >
                <iframe
                  src={`${selectedPage.path}?embed=1`}
                  title="Embed preview"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                />
              </div>
              <figcaption>
                <EmbedAttribution toolLabel={title.trim() || undefined} />
              </figcaption>
            </figure>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            This is exactly what visitors on the embedding site will see.
          </p>
        </div>
      </div>

      {/* ---- Code output ---- */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-lg border border-border p-1 bg-secondary/40">
            <button
              onClick={() => setTab("iframe")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                tab === "iframe"
                  ? "bg-card text-foreground shadow-sm font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Code2 className="w-4 h-4" /> Embed code
            </button>
            <button
              onClick={() => setTab("link")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                tab === "link"
                  ? "bg-card text-foreground shadow-sm font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Link2 className="w-4 h-4" /> Direct link
            </button>
          </div>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy {tab === "iframe" ? "code" : "link"}
              </>
            )}
          </Button>
        </div>
        <pre className="bg-secondary text-foreground text-xs md:text-sm p-4 rounded-xl overflow-x-auto border border-border leading-relaxed font-mono whitespace-pre-wrap break-words">
          {activeCode}
        </pre>
        <p className="text-xs text-muted-foreground">
          {tab === "iframe"
            ? "Responsive iframe with a built-in “Powered by Real Wheel Picker” credit link."
            : "A simple text link — handy for newsletters, READMEs, or platforms that block iframes."}
        </p>
      </div>

      {/* ---- Preview / open link ---- */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground border-t border-border pt-4">
        <ExternalLink className="w-4 h-4" />
        <span>Open widget:</span>
        <a
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline break-all"
        >
          {embedUrl}
        </a>
      </div>
    </section>
  );
};

export default EmbedBuilderIsland;
