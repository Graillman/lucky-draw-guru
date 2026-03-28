import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const siteUrl = 'https://realwheelpicker.com';

// Recursively find all index.html files in dist/
function findPages(dir, base = '') {
  const pages = [];
  if (!fs.existsSync(dir)) {
    console.error(`❌ dist/ folder not found. Run 'npm run build' first.`);
    process.exit(1);
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      pages.push(...findPages(fullPath, relativePath));
    } else if (entry.name === 'index.html') {
      pages.push(base || '/');
    }
  }
  return pages;
}

function getPriority(urlPath) {
  if (urlPath === '/' || urlPath === '') return '1.0';
  if (urlPath === '404') return null; // exclude 404
  if (urlPath === 'embed') return null; // no SEO value
  if (urlPath === 'instagram-giveaway-picker') return null; // redirect
  if (urlPath === 'social-giveaway') return null; // redirect
  if (urlPath === 'probability-picker') return null; // redirect
  if (urlPath === 'teacher-picker') return null; // redirect
  if (/^(wheel-of-names|random-name-picker|random-wheel|giveaway-picker)$/.test(urlPath)) return '0.9';
  if (/^(tiktok|youtube|discord|twitter|facebook|twitch|reddit|linkedin|snapchat)-giveaway-picker$/.test(urlPath)) return '0.8';
  if (urlPath === 'yes-or-no-wheel') return null; // duplicate of yes-no-wheel
  if (/^(yes-no-wheel|decision-wheel|truth-or-dare-wheel|random-number-picker|wheel-of-names-alternative|team-generator|random-number-generator|party-wheel|classroom-picker|weighted-random-picker|secret-santa-picker|raffle-picker|random-picker-no-repeat|snapchat-giveaway-picker|random-wheel|sweepstakes-picker)$/.test(urlPath)) return '0.8';
  if (/^(roue-des-noms|tirage-au-sort|tirage-aleatoire|pile-ou-face)$/.test(urlPath)) return '0.8';
  if (/^(generador-de-nombres|roleta-de-nomes|rueda-de-la-suerte|ruota-dei-nomi|sorteo-online|sorteio-online|sorteggio-online|losowanie-online|namenrad|rad-van-fortuin|sans-carki|zhuanpan|zufallsgenerator)$/.test(urlPath)) return '0.7';
  if (urlPath === 'how-to-pick-a-random-winner') return '0.8';
  if (urlPath.startsWith('templates/')) return '0.7';
  if (urlPath.startsWith('blog/')) return '0.7';
  if (urlPath === 'blog') return '0.8';
  if (urlPath === 'templates') return '0.8';
  if (/^(faq|about|contact)$/.test(urlPath)) return '0.4';
  if (/^(privacy-policy|terms-of-service)$/.test(urlPath)) return '0.2';
  if (urlPath === 'random-team-selector') return null; // redirect, skip
  if (/^(spin-the-bottle|jeu-de-la-bouteille|gallery)$/.test(urlPath)) return '0.7';
  return '0.6';
}

function getChangefreq(priority) {
  if (!priority) return 'monthly';
  const p = parseFloat(priority);
  if (p >= 0.9) return 'weekly';
  if (p >= 0.7) return 'monthly';
  return 'yearly';
}

const today = new Date().toISOString().split('T')[0];
const pages = findPages(distDir).sort();

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

let count = 0;
for (const page of pages) {
  const priority = getPriority(page);
  if (!priority) continue;

  const loc = page === '/' ? siteUrl : `${siteUrl}/${page}`;
  xml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${getChangefreq(priority)}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
  count++;
}

xml += `</urlset>`;

const outputPath = path.join(__dirname, '..', 'dist', 'sitemap.xml');
fs.writeFileSync(outputPath, xml);
console.log(`✅ Sitemap generated: ${count} URLs → dist/sitemap.xml`);
