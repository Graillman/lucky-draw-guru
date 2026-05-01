# Tester realwheelpicker.com en local

## Méthode rapide (double-clic)

1. Ouvre le dossier du projet : `C:\Users\Shadow\Desktop\realwheelpicker-work`
2. **Double-clique sur `dev.bat`**
3. Une fenêtre noire s'ouvre, attends ~5 secondes
4. Ton navigateur ouvre automatiquement [http://localhost:4321](http://localhost:4321)
5. Pour arrêter le serveur : ferme la fenêtre noire

## Pages clés à tester

| URL | Ce qu'il faut vérifier |
|---|---|
| [/](http://localhost:4321/) | Homepage — étoiles SERP préparées (aggregateRating dans le JSON-LD) |
| [/weighted-random-picker](http://localhost:4321/weighted-random-picker) | **Le pilier** — onglets Wheel / Pie chart / Simulator. Lance "Run 10 000 simulations" pour voir le test chi². Teste les presets (Equal / Geometric / Tier / Draft). |
| [/instagram-giveaway-picker](http://localhost:4321/instagram-giveaway-picker) | Le diamant — title plus dense, comparison table, cross-link weighted picker |
| [/tirage-au-sort-pondere](http://localhost:4321/tirage-au-sort-pondere) | Version FR du pilier (nouveau) |
| [/mentions-legales](http://localhost:4321/mentions-legales) | Mentions légales conformes RGPD (sans SIRET) |

## Problèmes courants

**Erreur "npm n'est pas reconnu"** : installe Node.js depuis [nodejs.org](https://nodejs.org/) (version LTS).

**Le navigateur n'ouvre pas tout seul** : ouvre manuellement [http://localhost:4321](http://localhost:4321) dans Chrome.

**Port 4321 déjà utilisé** : Astro va automatiquement basculer sur 4322, 4323, etc. Regarde la fenêtre noire pour le bon port.

**Page blanche** : ouvre la console du navigateur (F12 → Console) et envoie-moi les erreurs.

## Tester le simulator chi² (fonctionnalité USP)

1. Ouvre [/weighted-random-picker](http://localhost:4321/weighted-random-picker)
2. Clique sur le preset **"Tier (Gold/Silver/Bronze)"** — les poids deviennent 9 / 3 / 1 / 9 / 3 / 1...
3. Clique sur l'onglet **"Simulator"**
4. Clique sur **"Run 10 000 simulations"**
5. Tu devrais voir :
   - Un histogramme observed/expected pour chaque entrée
   - `chi-squared = 0.x`, `df = 3`, `p-value ≈ 0.x`
   - Le verdict vert "✓ Distribution matches declared weights"

Si la p-value est > 0,05 → l'algorithme est mathématiquement validé. C'est ce que zéro concurrent gratuit propose.

## Build de production (avant déploiement)

```bash
npm run build
```

Génère le dossier `dist/` que Cloudflare Pages servira.

## Déploiement

Le push vers `main` sur GitHub déclenche automatiquement un build Cloudflare Pages :

```bash
git push origin main
```

(à faire seulement quand tu as tout validé visuellement en local)
