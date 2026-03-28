# Guide Backlinks & Mentions — realwheelpicker.com
> Objectif : passer de DA ~5 à DA 30+ en 6 mois. Chaque action ci-dessous est classée par impact SEO.
> Temps estimé total : ~4-5 heures réparties sur 2 semaines.

---

## ACTION 1 — AlternativeTo.net
**Impact** : ⭐⭐⭐⭐⭐ (backlink DA 87, trafic ciblé, mentions dans les IA)
**Temps** : 10 minutes
**Lien** : https://alternativeto.net/software/wheel-of-names/about/

### Étapes
1. Va sur https://alternativeto.net
2. Crée un compte gratuit
3. Va sur la page de Wheel of Names : https://alternativeto.net/software/wheel-of-names/about/
4. Clique "Suggest Alternative"
5. Entre l'URL : `https://realwheelpicker.com`
6. Ensuite va sur https://alternativeto.net/software/add/ et ajoute ton site comme logiciel indépendant

### Texte pour la description du logiciel (copier-coller)
```
Real Wheel Picker is a free online spinning wheel and random name picker.
Unlike most wheel tools, it uses cryptographic randomness (Web Crypto API)
instead of Math.random() — making draws genuinely unpredictable and
suitable for public giveaways where fairness matters.

Features:
- Weighted draws (bonus entries, raffle tickets)
- No-repeat mode (every name picked once before any repeats)
- Platform-specific giveaway pickers: Instagram, TikTok, Discord, YouTube,
  Twitch, Reddit, Twitter/X, Facebook, Snapchat, LinkedIn
- Classroom student picker with no-repeat mode
- Random team generator, Secret Santa picker
- Yes/No wheel, Decision wheel, Truth or Dare wheel
- 100% free, no account required, all data stays in browser
```

---

## ACTION 2 — Product Hunt
**Impact** : ⭐⭐⭐⭐⭐ (backlink DA 91, ~500-2000 visites le jour du lancement)
**Temps** : 30 minutes de préparation + choisir un bon jour (mardi ou mercredi matin)
**Lien** : https://www.producthunt.com/posts/new

### Étapes
1. Crée un compte sur producthunt.com
2. Va sur https://www.producthunt.com/posts/new
3. Remplis les champs avec les textes ci-dessous
4. Lance le mardi ou mercredi entre 0h01 et 6h du matin (heure San Francisco = PST) pour maximiser les upvotes de la journée

### Champs à remplir

**Name :** `Real Wheel Picker`

**Tagline (max 60 caractères) :**
```
Cryptographically fair spinning wheel — free, no signup
```

**Description (copier-coller) :**
```
Most spinning wheel tools use Math.random() — a predictable algorithm.
Real Wheel Picker uses crypto.getRandomValues(), the same cryptographic
standard as online banking.

Why does it matter? For giveaways with real prizes, "I used a random
wheel" isn't enough. "I used cryptographic randomness" is defensible.

What's included:
→ Spinning name wheel with crypto randomness
→ Weighted picker (bonus entries, raffle tickets, tiered odds)
→ No-repeat mode (every name drawn once before any repeat)
→ Giveaway pickers for Instagram, TikTok, Discord, YouTube, Twitch,
  Reddit, Twitter/X, Facebook, Snapchat, LinkedIn
→ Classroom student picker (no-repeat mode for teachers)
→ Team generator, Secret Santa picker
→ Yes/No wheel, Decision wheel, Truth or Dare wheel
→ Random number picker (dice rolls, custom ranges)

100% free. No account. No data sent to server. Works on any device.
```

**First Comment (à poster juste après le lancement) :**
```
Hey Product Hunt! 👋

I built Real Wheel Picker because I kept seeing giveaway streamers get
accused of rigging their wheel spins. The accusation usually can't be
disproved because Math.random() is technically predictable.

Crypto.getRandomValues() isn't. That's the core difference.

Everything else followed: weighted draws for bonus-entry giveaways,
no-repeat mode for classroom teachers, platform-specific tools for
every major social network.

Would love your feedback — especially if you run giveaways or teach!
```

**Topics à sélectionner :** Developer Tools, Productivity, Education, Social Media

**Website :** `https://realwheelpicker.com`

---

## ACTION 3 — Reddit
**Impact** : ⭐⭐⭐⭐⭐ (Perplexity cite Reddit dans 46.7% de ses réponses)
**Temps** : 15 minutes par post
**Règle d'or** : ne jamais poster le même jour dans plusieurs subreddits. Espacer de 2-3 jours.

---

### Reddit Post 1 — r/Teachers
**Subreddit** : https://www.reddit.com/r/Teachers/
**Titre** :
```
I made a free classroom random picker that uses no-repeat mode — every student gets called before anyone is called twice
```

**Corps du post** :
```
I've been using wheel spinners to call on students randomly for a while,
but I kept running into the same problem: the wheel would pick the same
student twice before others had been called once.

So I added a no-repeat mode to a wheel tool I built. Once a student is
picked, they're removed from the active pool. When everyone has been
called, the pool resets automatically.

It also works on projectors/smartboards, saves your class list between
sessions (local storage, nothing sent to a server), and uses cryptographic
randomness instead of Math.random() — so the selection is genuinely
unpredictable.

Free, no login required: https://realwheelpicker.com/classroom-picker

Would love feedback from teachers who use this kind of tool regularly.
What features would make it more useful in your classroom?
```

---

### Reddit Post 2 — r/Twitch
**Subreddit** : https://www.reddit.com/r/Twitch/
**Titre** :
```
Free giveaway wheel that uses crypto randomness instead of Math.random() — for streamers who get accused of rigging
```

**Corps du post** :
```
After seeing yet another streamer get accused of rigging their wheel
spin, I wanted to build something where the randomness is actually
defensible.

Most wheel tools (including Wheel of Names) use Math.random() —
a pseudorandom algorithm that's technically deterministic. If someone
really wanted to, they could argue it's predictable.

crypto.getRandomValues() uses hardware entropy from your CPU. It's the
same standard as SSL certificates and password managers. Not predictable,
not reproducible.

I built Real Wheel Picker around this: https://realwheelpicker.com/twitch-giveaway-picker

Also has a no-repeat mode (every entry drawn once before repeats) and
weighted draws (subscribers 2x odds, etc.).

Free, no login, nothing stored server-side. Feedback welcome.
```

---

### Reddit Post 3 — r/Instagram (ou r/socialmedia)
**Subreddit** : https://www.reddit.com/r/Instagram/ ou https://www.reddit.com/r/socialmedia/
**Titre** :
```
How I pick random winners from Instagram comments without third-party apps having access to my account
```

**Corps du post** :
```
Every Instagram giveaway picker I've found either requires you to log in
with Instagram (giving it account permissions) or costs money.

The approach I use: manually copy the comment list from Instagram, paste
it into a browser-based wheel tool, spin to pick a winner. No Instagram
login, no permissions, no risk of the tool posting on your behalf.

I built this workflow into a dedicated tool:
https://realwheelpicker.com/instagram-giveaway-picker

It uses crypto.getRandomValues() for the randomness (same standard as
online banking — genuinely unpredictable, not Math.random()).

The whole thing runs in your browser. Nothing is sent to any server.

Happy to answer questions about running fair Instagram giveaways.
```

---

### Reddit Post 4 — r/webdev ou r/SideProject
**Subreddit** : https://www.reddit.com/r/SideProject/
**Titre** :
```
I built a spinning wheel picker that uses the Web Crypto API instead of Math.random() — here's why it matters for giveaways
```

**Corps du post** :
```
Side project I've been building: https://realwheelpicker.com

The core differentiator is randomness quality. Most spinning wheel tools
use Math.random() — a PRNG seeded by system time. Technically
deterministic, theoretically predictable.

Real Wheel Picker uses crypto.getRandomValues() (Web Crypto API). Same
standard as generating cryptographic keys. Not predictable.

For most casual uses, this doesn't matter. For giveaways with real
prizes where someone might accuse you of rigging — it matters.

Tech stack: Astro 5 (SSG) + React 18 islands + Tailwind + shadcn/ui.
Static site on Cloudflare, ~100ms TTFB globally.

Also implemented:
- Weighted random selection (for bonus-entry giveaways)
- No-repeat sampling without replacement
- Platform-specific giveaway tools (Instagram, TikTok, Discord, etc.)
- Full i18n in 10 languages

Would appreciate any feedback from devs on the implementation.
```

---

### Reddit Post 5 — r/Giveaways
**Subreddit** : https://www.reddit.com/r/giveaways/
**Titre** :
```
For anyone who runs giveaways: here's why the randomness method of your picker actually matters
```

**Corps du post** :
```
Short explanation for giveaway runners:

Most free wheel tools use Math.random() — JavaScript's built-in random
number generator. It works by taking a seed (often the system clock) and
running it through a formula. This makes it:
- Fast
- Statistically "random-looking"
- Technically deterministic and reproducible

The Web Crypto API (crypto.getRandomValues()) works differently. It pulls
entropy from hardware sources in your CPU. This makes it:
- Genuinely unpredictable
- Not reproducible
- The same standard used in SSL certificates and password managers

For giveaways where someone might accuse you of rigging the wheel, the
second option gives you a defensible answer: "I used hardware-sourced
cryptographic randomness."

I built a free tool that uses this approach:
https://realwheelpicker.com

It also has weighted draws (for bonus entries), no-repeat mode, and
dedicated pickers for every major social platform. All free, no login.
```

---

## ACTION 4 — YouTube
**Impact** : ⭐⭐⭐⭐⭐ (corrélation la plus forte avec les citations IA : ~0.737)
**Temps** : 1-2 heures (filmer + monter)
**Note** : Pas besoin de montrer ton visage. Juste l'écran + voix ou sous-titres.

### Vidéo 1 (priorité absolue)
**Titre YouTube** :
```
How to Pick a Random Winner for Instagram Giveaway (Free Tool, No Login)
```

**Description YouTube** :
```
In this video, I show how to pick a random winner from Instagram comments
without giving any app access to your Instagram account.

Tool used: https://realwheelpicker.com/instagram-giveaway-picker (free, no login)

Steps shown:
0:00 - The problem with most Instagram giveaway pickers
0:30 - How to copy Instagram comment participants
1:00 - How to paste and spin the wheel
1:30 - Why this tool uses crypto randomness instead of Math.random()
2:00 - How to record and share the winner selection

This method works by copying names manually from Instagram comments and
pasting them into a browser-based wheel tool. No Instagram login required.
No app permissions. Nothing stored on any server.

The tool uses crypto.getRandomValues() — the same cryptographic standard
as online banking — instead of Math.random() used by most wheel tools.

#InstagramGiveaway #GiveawayPicker #RandomPicker
```

**Script de la vidéo (à lire pendant que tu enregistres l'écran) :**
```
[0:00] La plupart des outils de tirage au sort Instagram te demandent
de connecter ton compte. Ça leur donne accès à tes données. On va
éviter ça complètement.

[0:30] Voilà comment ça marche. Tu vas sur ton post Instagram, tu ouvres
les commentaires, et tu copies les noms des participants. Juste les noms,
une ligne par personne.

[1:00] Tu colles ça dans Real Wheel Picker — l'outil que j'ai mis en lien
dans la description. Tu cliques sur Spin, et la roue choisit un gagnant.

[1:30] Ce qui différencie cet outil : il utilise crypto.getRandomValues
au lieu de Math.random. En gros, c'est le même niveau de hasard que les
mots de passe et les certificats SSL. Pas prédictible. Pas reproductible.

[2:00] Pour prouver que c'est fair, tu peux enregistrer ton écran pendant
le tirage et partager la vidéo avec tes abonnés. C'est ce que font la
plupart des streamers professionnels.

Lien dans la description. C'est gratuit, pas de compte nécessaire.
```

---

### Vidéo 2 (optionnelle)
**Titre YouTube** :
```
Wheel of Names vs Real Wheel Picker — Is the randomness actually different?
```

**Script court** :
```
Wheel of Names utilise Math.random — une formule mathématique qui
ressemble à du hasard mais qui est techniquement prévisible si tu
connais la graine de départ.

Real Wheel Picker utilise crypto.getRandomValues — du hasard matériel
venant du CPU. Imprévisible. Même standard que les mots de passe.

Pour un usage quotidien, la différence est philosophique. Pour un
giveaway avec un vrai prix, c'est la différence entre "il a triché"
et "impossible de tricher".

Lien : realwheelpicker.com
```

---

## ACTION 5 — Annuaires d'outils
**Impact** : ⭐⭐⭐ (backlinks faciles, DA 40-70)
**Temps** : 5 minutes par soumission

### Sites à soumettre (copier-coller l'URL de ton site)

| Site | Lien de soumission | DA estimé |
|---|---|---|
| AlternativeTo.net | https://alternativeto.net/software/add/ | 87 |
| ToolPilot.ai | https://www.toolpilot.ai/submit | 55 |
| Futurepedia.io | https://www.futurepedia.io/submit-tool | 62 |
| There's An AI For That | https://theresanaiforthat.com/submit/ | 71 |
| Toolify.ai | https://www.toolify.ai/submit | 48 |
| SaaSHub | https://www.saashub.com/add-product | 72 |
| G2.com | https://sell.g2.com/get-listed | 91 |
| Capterra | https://vendors.capterra.com/add-products | 92 |

### Texte court réutilisable pour tous les annuaires
```
Real Wheel Picker is a free spinning wheel and random name picker that
uses cryptographic randomness (Web Crypto API) instead of Math.random().
Features include: weighted draws, no-repeat mode, giveaway pickers for
Instagram/TikTok/Discord/YouTube/Twitch, classroom student picker, team
generator, and more. Free, no account required.

URL: https://realwheelpicker.com
Category: Productivity / Random Tools / Education
```

---

## ACTION 6 — Forums enseignants
**Impact** : ⭐⭐⭐⭐ (forte autorité + audience ciblée)
**Temps** : 20 minutes

### TES Community (UK teachers forum, DA 72)
**Lien** : https://www.tes.com/teaching-resources/blog/community
Cherche un thread sur "random name picker" ou "classroom tools" et réponds avec ton outil.

### Teachers Pay Teachers Community
**Lien** : https://www.teacherspayteachers.com/Browse/Free/classroom-management
Crée une ressource gratuite (PDF d'1 page expliquant comment utiliser le classroom picker) qui pointe vers ton site.

### Reddit r/Teachers — répondre aux questions existantes
Cherche sur Reddit : `site:reddit.com/r/Teachers "random name picker"` ou `"random student"` et réponds aux posts existants en recommandant ton outil.

---

## Planning recommandé sur 2 semaines

| Jour | Action | Temps |
|---|---|---|
| Jour 1 | AlternativeTo.net | 10 min |
| Jour 2 | SaaSHub + ToolPilot + Futurepedia | 15 min |
| Jour 3 | Reddit r/SideProject | 15 min |
| Jour 5 | Reddit r/Teachers | 15 min |
| Jour 7 | Product Hunt (mardi/mercredi matin) | 30 min |
| Jour 8 | Reddit r/Twitch | 15 min |
| Jour 10 | Reddit r/socialmedia | 15 min |
| Jour 12 | Filmer + publier vidéo YouTube #1 | 90 min |
| Jour 14 | Reddit r/Giveaways | 15 min |

---

## Ce que tu peux attendre

Après ces actions :
- **DA** : de ~5 à ~25-35 (dans 2-3 mois)
- **Trafic** : +200-500% sur les pages instagram/tiktok/discord
- **Citations IA** : Perplexity et ChatGPT commenceront à citer le site pour des requêtes comme "best instagram giveaway picker" ou "random wheel cryptographic"
- **Classement** : les pages déjà à position 15-19 (weighted, discord) passeront en top 10

---

---

## ACTION 7 — Quora
**Impact** : ⭐⭐⭐⭐ (DA 93, cité fréquemment par Google et les IA)
**Temps** : 10 minutes par réponse
**Règle** : Réponds à des questions qui existent déjà. Apporte une vraie valeur, mentionne le site en fin de réponse naturellement.

### Questions à chercher sur Quora (copier-coller dans la barre de recherche Quora)
```
"how to pick a random winner"
"best random name picker for classroom"
"how to do instagram giveaway fairly"
"random wheel spinner online"
```

### Template de réponse (à adapter selon la question)
```
The key thing most people miss when picking a random winner is the
randomness quality. Most tools use Math.random() — technically
pseudo-random and reproducible. For public giveaways, that's a liability.

The approach I use (and built a tool around): crypto.getRandomValues(),
which draws from hardware entropy in your CPU. Same standard as SSL
certificates. Not reproducible, not predictable.

Workflow:
1. Export/copy your participant list
2. Paste into a wheel picker
3. Spin and screen-record the result
4. Share the recording publicly

Tool I use (free, no login): realwheelpicker.com
It also handles weighted entries (bonus for shares/follows), no-repeat
mode for classrooms, and dedicated pickers for each social platform.
```

---

## ACTION 8 — Hacker News "Show HN"
**Impact** : ⭐⭐⭐⭐ (DA 92, audience tech = backlinks naturels depuis blogs, articles, etc.)
**Temps** : 5 minutes
**Lien** : https://news.ycombinator.com/submit
**Timing optimal** : Lundi ou mardi matin (9h-12h heure New York)

### Post à soumettre
**Title :**
```
Show HN: A spinning wheel picker that uses crypto.getRandomValues() instead of Math.random()
```

**Text (optionnel, mais recommandé) :**
```
Most spinning wheel tools (Wheel of Names, PickerWheel, etc.) use
Math.random() — a PRNG seeded by system time. For casual use, that's
fine. For giveaways with real prizes, the "technically predictable"
argument is a real problem for streamers and brands.

I built Real Wheel Picker (realwheelpicker.com) using the Web Crypto API
(crypto.getRandomValues()) — hardware entropy, same standard as key
generation. Also has weighted selection, no-repeat sampling, and
platform-specific giveaway pickers.

Stack: Astro 5 + React 18 islands + Tailwind. Cloudflare static hosting,
~80ms TTFB globally. All processing client-side, nothing server-side.

Would appreciate feedback from anyone who's implemented similar tools or
has thoughts on randomness quality for public draws.
```

---

## ACTION 9 — Teachers Pay Teachers (ressource gratuite)
**Impact** : ⭐⭐⭐⭐ (DA 73, audience ultra-ciblée enseignants, backlink + trafic)
**Temps** : 30 minutes
**Lien** : https://www.teacherspayteachers.com/sell

### Crée une ressource PDF gratuite
Crée un PDF d'1 page (avec Canva par exemple) intitulé :
**"How to Use a Random Name Picker in Your Classroom — Free Tool Guide"**

Contenu :
```
Page 1 :
- Screenshot de realwheelpicker.com/classroom-picker
- 3 étapes illustrées : "Add your class", "Spin", "Remove winner"
- Astuce : "Use no-repeat mode — every student is called before anyone is called twice"
- URL en bas : realwheelpicker.com/classroom-picker
```

Upload comme ressource GRATUITE. Les enseignants qui téléchargent → visitent le site.
Catégorie : Classroom Management > Tools & Resources

---

## ACTION 10 — Directories spécialisés éducation
**Impact** : ⭐⭐⭐ (backlinks ciblés, audience enseignants)
**Temps** : 5 minutes par soumission

| Site | Lien | Catégorie |
|---|---|---|
| Common Sense Media | https://www.commonsense.org/education/submit | EdTech Tools |
| EdSurge | https://www.edsurge.com/products | EdTech |
| Edutopia Tools | https://www.edutopia.org | Mention dans commentaires |
| ClassroomScreen | https://classroomscreen.com/tools (commentaires) | Tools |

### Texte pour les directories éducation
```
Real Wheel Picker — Free Classroom Random Name Picker
URL: realwheelpicker.com/classroom-picker
Category: Classroom Management / Student Engagement
Description: Free online random student picker with no-repeat mode.
Spin the wheel to call on students fairly. Works on smartboards,
saves class roster locally, cryptographically random. No login required.
```

---

## Planning mis à jour (3 semaines)

| Jour | Action | Temps |
|---|---|---|
| Jour 1 | AlternativeTo.net | 10 min |
| Jour 2 | SaaSHub + ToolPilot + Futurepedia | 15 min |
| Jour 3 | Reddit r/SideProject | 15 min |
| Jour 4 | **Show HN (Hacker News)** — lundi matin | 5 min |
| Jour 5 | Reddit r/Teachers | 15 min |
| Jour 6 | **Quora — 3 réponses** | 30 min |
| Jour 7 | Product Hunt (mardi/mercredi matin) | 30 min |
| Jour 8 | Reddit r/Twitch | 15 min |
| Jour 9 | **Teachers Pay Teachers PDF** | 30 min |
| Jour 10 | Reddit r/socialmedia | 15 min |
| Jour 11 | **Common Sense Media + EdSurge** | 15 min |
| Jour 12 | Filmer + publier vidéo YouTube #1 | 90 min |
| Jour 14 | Reddit r/Giveaways | 15 min |

---

*Guide mis à jour le 2026-03-28 — realwheelpicker.com*
