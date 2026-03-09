import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a0a2e"/>
      <stop offset="50%" style="stop-color:#2d1b4e"/>
      <stop offset="100%" style="stop-color:#1a0a2e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#e74c8a"/>
      <stop offset="50%" style="stop-color:#f59e0b"/>
      <stop offset="100%" style="stop-color:#8b5cf6"/>
    </linearGradient>
    <linearGradient id="wheel1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#e74c8a"/>
      <stop offset="100%" style="stop-color:#f97316"/>
    </linearGradient>
    <linearGradient id="wheel2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#8b5cf6"/>
      <stop offset="100%" style="stop-color:#ec4899"/>
    </linearGradient>
  </defs>

  <!-- Dark background -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>

  <!-- Accent line top -->
  <rect x="0" y="0" width="${width}" height="4" fill="url(#accent)"/>

  <!-- Wheel illustration (left side) -->
  <circle cx="280" cy="315" r="200" fill="none" stroke="url(#wheel1)" stroke-width="8" opacity="0.6"/>
  <circle cx="280" cy="315" r="200" fill="none" stroke="url(#wheel2)" stroke-width="8" opacity="0.3" stroke-dasharray="157 157"/>

  <!-- Wheel segments -->
  <line x1="280" y1="115" x2="280" y2="240" stroke="rgba(255,255,255,0.15)" stroke-width="3"/>
  <line x1="280" y1="390" x2="280" y2="515" stroke="rgba(255,255,255,0.15)" stroke-width="3"/>
  <line x1="80" y1="315" x2="205" y2="315" stroke="rgba(255,255,255,0.15)" stroke-width="3"/>
  <line x1="355" y1="315" x2="480" y2="315" stroke="rgba(255,255,255,0.15)" stroke-width="3"/>
  <line x1="139" y1="174" x2="216" y2="251" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
  <line x1="344" y1="379" x2="421" y2="456" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
  <line x1="421" y1="174" x2="344" y2="251" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
  <line x1="216" y1="379" x2="139" y2="456" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>

  <!-- Center dot -->
  <circle cx="280" cy="315" r="30" fill="rgba(255,255,255,0.1)"/>
  <circle cx="280" cy="315" r="12" fill="#f59e0b"/>

  <!-- Pointer -->
  <polygon points="280,100 265,135 295,135" fill="#f59e0b"/>

  <!-- Glow behind text -->
  <circle cx="780" cy="280" r="250" fill="rgba(139,92,246,0.06)"/>

  <!-- Title -->
  <text x="550" y="240" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="72" font-weight="800" fill="white" letter-spacing="-2">Real Wheel</text>
  <text x="550" y="330" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="72" font-weight="800" fill="url(#accent)" letter-spacing="-2">Picker</text>

  <!-- Subtitle -->
  <text x="550" y="390" font-family="system-ui, sans-serif" font-size="26" fill="#a78bfa" opacity="0.8">Free Spinner Wheel &amp; Random Name Picker</text>

  <!-- Tags -->
  <rect x="550" y="430" width="130" height="40" rx="20" fill="rgba(236,72,153,0.15)" stroke="rgba(236,72,153,0.3)" stroke-width="1"/>
  <text x="580" y="456" font-family="system-ui, sans-serif" font-size="18" fill="#f472b6">&#x2713; Free</text>

  <rect x="700" y="430" width="175" height="40" rx="20" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.3)" stroke-width="1"/>
  <text x="730" y="456" font-family="system-ui, sans-serif" font-size="18" fill="#a78bfa">&#x2713; No Signup</text>

  <rect x="895" y="430" width="220" height="40" rx="20" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.3)" stroke-width="1"/>
  <text x="925" y="456" font-family="system-ui, sans-serif" font-size="18" fill="#fbbf24">&#x2713; Crypto Random</text>

  <!-- URL -->
  <text x="550" y="550" font-family="system-ui, sans-serif" font-size="22" fill="#6b7280">realwheelpicker.com</text>

  <!-- Bottom accent line -->
  <rect x="0" y="626" width="${width}" height="4" fill="url(#accent)"/>
</svg>`;

try {
  await sharp(Buffer.from(svg))
    .resize(1200, 630)
    .png({ quality: 90 })
    .toFile(path.join(publicDir, 'og-default.png'));
  console.log('✅ OG image generated: public/og-default.png (1200x630)');
} catch (err) {
  console.error('❌ Sharp error:', err.message);
  fs.writeFileSync(path.join(publicDir, 'og-default.svg'), svg);
  console.log('✅ OG SVG saved: public/og-default.svg — convert to PNG manually');
}
