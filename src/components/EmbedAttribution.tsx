/**
 * EmbedAttribution
 * ----------------
 * Shared attribution / backlink used by the embed widget.
 *
 * SEO RATIONALE
 * A link placed *inside* an iframe lives on realwheelpicker.com's own page and
 * therefore passes no link equity to the host site — and, conversely, gives us
 * no backlink from the host. The link that actually generates a backlink is the
 * one that ends up in the *host page's* HTML, i.e. the markup we hand the blogger
 * in the copy-paste snippet. That is why `buildAttributionHtml()` (used by the
 * generated snippet) is the canonical backlink: a visible, crawlable, dofollow
 * anchor to realwheelpicker.com that sits next to the iframe on the embedding site.
 *
 * The React component below renders the exact same attribution inside the live
 * preview so the user sees what their visitors will see.
 */

const SITE_URL = "https://realwheelpicker.com";
const ANCHOR_TEXT = "Real Wheel Picker";

/**
 * Returns the attribution HTML that ships inside the copy-paste snippet.
 * Indented to line up nicely inside the surrounding <figure>.
 * NOTE: intentionally a dofollow link (no rel="nofollow") — this anchor is the
 * backlink the embed strategy is built around.
 */
export function buildAttributionHtml(toolLabel?: string): string {
  const label = toolLabel ? `${toolLabel} by` : "Powered by";
  return `  <figcaption style="margin-top:8px;font:400 13px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;text-align:center;color:#6b7280;">
    ${label} <a href="${SITE_URL}/?utm_source=embed&utm_medium=widget&utm_campaign=attribution" target="_blank" style="color:#b8860b;font-weight:600;text-decoration:none;">${ANCHOR_TEXT}</a> — free spin the wheel tool
  </figcaption>`;
}

interface EmbedAttributionProps {
  /** Optional label of the embedded tool, e.g. "Yes or No Wheel". */
  toolLabel?: string;
}

/** Live-preview version of the attribution bar (mirrors buildAttributionHtml). */
const EmbedAttribution = ({ toolLabel }: EmbedAttributionProps) => {
  const label = toolLabel ? `${toolLabel} by` : "Powered by";
  return (
    <p className="mt-2 text-center text-[13px] leading-snug text-muted-foreground">
      {label}{" "}
      <a
        href={`${SITE_URL}/?utm_source=embed&utm_medium=widget&utm_campaign=attribution`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-primary no-underline hover:underline"
      >
        {ANCHOR_TEXT}
      </a>{" "}
      — free spin the wheel tool
    </p>
  );
};

export default EmbedAttribution;
