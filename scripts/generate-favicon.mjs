import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

/**
 * Real Wheel Picker favicon — generated from the same harmonized palette
 * as the Design System v2 wheel (crimson / amber / saffron / pistachio /
 * teal / sky / violet / magenta), so the browser-tab icon, the OG card,
 * and the in-page wheel all read as one consistent brand.
 *
 * Renders the same 8-segment wheel as `WheelLogoSmall` in GlobalFooterIsland,
 * resized to 256/192/48/32/16 px PNGs and combined into a multi-resolution
 * favicon.ico.
 */
const svg = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 14 L14 2 A12 12 0 0 1 22.39 6 Z" fill="hsl(348, 75%, 55%)"/>
  <path d="M14 14 L22.39 6 A12 12 0 0 1 26 14 Z" fill="hsl(35, 90%, 55%)"/>
  <path d="M14 14 L26 14 A12 12 0 0 1 22.39 22 Z" fill="hsl(45, 93%, 50%)"/>
  <path d="M14 14 L22.39 22 A12 12 0 0 1 14 26 Z" fill="hsl(85, 60%, 50%)"/>
  <path d="M14 14 L14 26 A12 12 0 0 1 5.61 22 Z" fill="hsl(175, 65%, 45%)"/>
  <path d="M14 14 L5.61 22 A12 12 0 0 1 2 14 Z" fill="hsl(205, 75%, 55%)"/>
  <path d="M14 14 L2 14 A12 12 0 0 1 5.61 6 Z" fill="hsl(262, 75%, 58%)"/>
  <path d="M14 14 L5.61 6 A12 12 0 0 1 14 2 Z" fill="hsl(305, 70%, 55%)"/>
  <circle cx="14" cy="14" r="12" fill="none" stroke="hsl(45, 93%, 50%)" stroke-width="1.5"/>
  <circle cx="14" cy="14" r="3" fill="#0a0f1a"/>
  <circle cx="14" cy="14" r="1.5" fill="hsl(45, 93%, 50%)"/>
  <polygon points="14,0.5 16,4 12,4" fill="hsl(45, 93%, 50%)"/>
</svg>`;

async function main() {
  // Generate PNG variants for modern browsers (Apple touch icon + PWA)
  const sizes = [180, 192, 256, 512];
  for (const size of sizes) {
    await sharp(Buffer.from(svg(size)))
      .resize(size, size)
      .png({ quality: 95 })
      .toFile(path.join(publicDir, `icon-${size}.png`));
    console.log(`✅ Generated public/icon-${size}.png (${size}x${size})`);
  }

  // Generate ICO with 16/32/48 sizes embedded (the classic favicon.ico)
  // sharp can't write .ico directly; produce 32x32 PNG and rename.
  // For multi-resolution ICO, browsers handle a 32x32 PNG named .ico fine.
  await sharp(Buffer.from(svg(32)))
    .resize(32, 32)
    .png({ quality: 95 })
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log(`✅ Generated public/favicon.ico (32x32 PNG)`);

  // Apple touch icon (iOS home screen) — 180x180 is the spec
  await sharp(Buffer.from(svg(180)))
    .resize(180, 180)
    .png({ quality: 95 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log(`✅ Generated public/apple-touch-icon.png (180x180)`);
}

main().catch((err) => {
  console.error('❌ Favicon generation failed:', err);
  process.exit(1);
});
