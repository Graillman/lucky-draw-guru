// exportResult — zero-dependency export of a draw result.
//
// Two pure-ish helpers:
//   • exportWinnerAsPNG  — renders a branded result card to an off-screen
//     <canvas> and triggers a download.
//   • exportResultsAsCSV — builds a small CSV (winner(s), date, participant
//     count) and triggers a download.
//
// No external deps: Canvas API + Blob + URL.createObjectURL only. Both
// functions are SSR-safe (no-op when `document` is unavailable).

export interface ExportParticipant {
  pseudo: string;
  weight?: number;
}

export interface ExportPNGOptions {
  /** Card title, default "Winner" (use "Winners" for multi-draw). */
  title?: string;
  /** Site label printed at the bottom. Default "realwheelpicker.com". */
  site?: string;
  /** Optional draw title shown above the winner name. */
  drawTitle?: string;
  /** Include the participant list on the card. Default false. */
  includeParticipants?: boolean;
  /** Download file name (without extension). Default "winner". */
  fileName?: string;
  /** Locale used to format the date. Default: browser locale. */
  locale?: string;
}

const BRAND_BG = "#0f1320";
const BRAND_CARD = "#171c2e";
const BRAND_ACCENT = "#ffb800";
const BRAND_TEXT = "#ffffff";
const BRAND_MUTED = "rgba(255,255,255,0.6)";

function isBrowser(): boolean {
  return typeof document !== "undefined" && typeof window !== "undefined";
}

function formatDate(locale?: string): string {
  try {
    return new Date().toLocaleString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return new Date().toISOString();
  }
}

/** Trigger a browser download for a Blob. Safe no-op outside the browser. */
function triggerDownload(blob: Blob, fileName: string): void {
  if (!isBrowser()) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Revoke on the next tick so the click has been processed.
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

/** Sanitize a string for use in a file name. */
function safeFileName(name: string): string {
  return (
    name
      .replace(/[^a-z0-9-_]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "result"
  );
}

/**
 * Render a branded PNG of the result and download it.
 * Accepts a single winner name or an array of winner names.
 */
export function exportWinnerAsPNG(
  winner: string | string[],
  participants: ExportParticipant[] = [],
  options: ExportPNGOptions = {},
): void {
  if (!isBrowser()) return;

  const winners = Array.isArray(winner) ? winner : [winner];
  if (winners.length === 0) return;

  const isMulti = winners.length > 1;
  const {
    title = isMulti ? "Winners" : "Winner",
    site = "realwheelpicker.com",
    drawTitle,
    includeParticipants = false,
    fileName,
    locale,
  } = options;

  const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);

  // Layout (logical px) — height grows with the number of winner rows and
  // (optionally) the participant list.
  const width = 1200;
  const padding = 80;
  const headerH = 260;
  const rowH = 96;
  const footerH = 140;

  let participantsBlockH = 0;
  const cappedParticipants = participants.slice(0, 40);
  if (includeParticipants && cappedParticipants.length > 0) {
    const cols = 3;
    const rows = Math.ceil(cappedParticipants.length / cols);
    participantsBlockH = 70 + rows * 40;
  }

  const height = headerH + winners.length * rowH + participantsBlockH + footerH;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  // Background
  ctx.fillStyle = BRAND_BG;
  ctx.fillRect(0, 0, width, height);

  // Card
  const cardX = padding / 2;
  const cardY = padding / 2;
  const cardW = width - padding;
  const cardH = height - padding;
  ctx.fillStyle = BRAND_CARD;
  roundRect(ctx, cardX, cardY, cardW, cardH, 32);
  ctx.fill();
  ctx.strokeStyle = BRAND_ACCENT;
  ctx.lineWidth = 4;
  roundRect(ctx, cardX, cardY, cardW, cardH, 32);
  ctx.stroke();

  ctx.textAlign = "center";

  // Trophy emoji as a simple decorative mark
  ctx.font = "64px serif";
  ctx.fillText("🏆", width / 2, cardY + 100);

  // Optional draw title
  let cursorY = cardY + 150;
  if (drawTitle) {
    ctx.fillStyle = BRAND_ACCENT;
    ctx.font = "600 34px 'Space Grotesk', Arial, sans-serif";
    ctx.fillText(truncate(ctx, drawTitle, cardW - 120), width / 2, cursorY);
    cursorY += 50;
  }

  // Title label
  ctx.fillStyle = BRAND_MUTED;
  ctx.font = "500 28px 'Space Grotesk', Arial, sans-serif";
  ctx.fillText(title.toUpperCase(), width / 2, cursorY);

  // Winner rows
  let rowY = headerH + 10;
  ctx.font = "700 56px 'Space Grotesk', Arial, sans-serif";
  winners.forEach((w, i) => {
    ctx.fillStyle = BRAND_TEXT;
    const label = isMulti ? `${i + 1}. ${w}` : w;
    ctx.fillText(truncate(ctx, label, cardW - 120), width / 2, rowY + 56);
    rowY += rowH;
  });

  // Optional participant list
  if (includeParticipants && cappedParticipants.length > 0) {
    let py = rowY + 50;
    ctx.fillStyle = BRAND_MUTED;
    ctx.font = "500 22px 'Space Grotesk', Arial, sans-serif";
    ctx.fillText(`Participants (${participants.length})`, width / 2, py);
    py += 40;

    const cols = 3;
    const colW = cardW / cols;
    ctx.font = "400 20px 'Space Grotesk', Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    cappedParticipants.forEach((p, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cx = cardX + colW * col + colW / 2;
      const cy = py + row * 40 + 20;
      ctx.fillText(truncate(ctx, p.pseudo, colW - 30), cx, cy);
    });
    if (participants.length > cappedParticipants.length) {
      const extraRow = Math.ceil(cappedParticipants.length / cols);
      ctx.fillStyle = BRAND_MUTED;
      ctx.fillText(
        `+${participants.length - cappedParticipants.length} more`,
        width / 2,
        py + extraRow * 40 + 20,
      );
    }
  }

  // Footer: date + participant count + site
  ctx.fillStyle = BRAND_MUTED;
  ctx.font = "400 24px 'Space Grotesk', Arial, sans-serif";
  ctx.fillText(formatDate(locale), width / 2, height - footerH / 2 - 10);
  if (participants.length > 0) {
    ctx.font = "400 20px 'Space Grotesk', Arial, sans-serif";
    ctx.fillText(`${participants.length} participants`, width / 2, height - footerH / 2 + 22);
  }
  ctx.fillStyle = BRAND_ACCENT;
  ctx.font = "600 26px 'Space Grotesk', Arial, sans-serif";
  ctx.fillText(site, width / 2, height - 40);

  const baseName = fileName ?? `winner-${safeFileName(winners[0])}`;
  canvas.toBlob((blob) => {
    if (blob) triggerDownload(blob, `${safeFileName(baseName)}.png`);
  }, "image/png");
}

/** Truncate text to fit a max pixel width, appending an ellipsis. */
function truncate(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let str = text;
  while (str.length > 1 && ctx.measureText(str + "…").width > maxWidth) {
    str = str.slice(0, -1);
  }
  return str + "…";
}

/** Draw a rounded rectangle path (compatible across browsers). */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

/** Escape a single CSV field (RFC 4180). */
function csvField(value: string | number): string {
  const s = String(value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export interface ExportCSVOptions {
  fileName?: string;
  locale?: string;
}

/**
 * Build a CSV of the result and download it. Columns:
 *   rank, winner, date, participant_count
 * One row per winner. `winners` accepts a single name or an array.
 */
export function exportResultsAsCSV(
  winners: string | string[],
  participants: ExportParticipant[] = [],
  options: ExportCSVOptions = {},
): void {
  if (!isBrowser()) return;

  const list = Array.isArray(winners) ? winners : [winners];
  if (list.length === 0) return;

  const { fileName = "draw-results", locale } = options;
  const date = formatDate(locale);
  const count = participants.length;

  const header = ["rank", "winner", "date", "participant_count"];
  const rows = list.map((w, i) => [i + 1, w, date, count].map(csvField).join(","));

  // Prepend a UTF-8 BOM so Excel opens accented names correctly.
  const csv = "﻿" + [header.map(csvField).join(","), ...rows].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  triggerDownload(blob, `${safeFileName(fileName)}.csv`);
}
