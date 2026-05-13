export interface SEOPageConfig {
  slug: string;
  h1: string;
  subtitle: string;
  microText: string;
  howItWorksTitle: string;
  howItWorksText: string;
  whenToUseTitle: string;
  useCases: {
    icon: "gift" | "video" | "graduation" | "users" | "chart" | "trophy" | "sparkles";
    title: string;
    description: string;
  }[];
  seoTitle: string;
  seoText: string;
  metaTitle: string;
  metaDescription: string;
  relatedBlogPost?: { slug: string; title: string };
  faqs?: { question: string; answer: string }[];
}

export const seoPages: Record<string, SEOPageConfig> = {
  "random-wheel": {
    slug: "random-wheel",
    h1: "Random Wheel Picker – Spin the Wheel Online",
    subtitle: "Spin a random wheel to pick a winner instantly. Free, fast and fair.",
    microText: "Free • No signup • Instant result",
    howItWorksTitle: "How does this random wheel work?",
    howItWorksText: "Enter any names or options — type them in, paste a list, or load a template. Hit the Spin button and watch the wheel rotate with a smooth, satisfying animation before landing on a cryptographically random result. Each segment of the wheel represents one entry, and all entries have equal-sized segments by default, making the fairness immediately visible. The entire process runs inside your browser using the Web Crypto API — no server, no storage, no tracking. Spin as many times as you want, screen-record the result for your audience, or share a pre-loaded wheel link with your entries already set.",
    whenToUseTitle: "When should you use a random wheel?",
    useCases: [
      { icon: "gift", title: "Social Media Giveaways", description: "Pick winners fairly for Instagram & TikTok contests" },
      { icon: "video", title: "Live Stream Draws", description: "Engage viewers with real-time spinning on Twitch/YouTube" },
      { icon: "graduation", title: "Classroom Activities", description: "Select students randomly for questions or tasks" },
      { icon: "users", title: "Team Decisions", description: "Assign tasks or pick who goes first" },
      { icon: "sparkles", title: "Party Games", description: "Add excitement to any gathering" },
    ],
    seoTitle: "Free Online Random Wheel Picker — Spin to Decide",
    seoText: `Our free random wheel picker is the fastest way to make unbiased decisions online. Add any options you want — names, tasks, prizes, yes/no, colors, anything — and spin the wheel to get an instant random result. No account required, no ads blocking the wheel, no limit on spins.

<strong class="text-foreground">What makes our random wheel different?</strong>
<ul class="list-disc pl-5 mt-2 space-y-1">
<li><strong class="text-foreground">Crypto-grade randomness.</strong> We use <code>crypto.getRandomValues()</code> for every spin. This is not a basic Math.random() — it's the same cryptographic RNG used in TLS, encryption keys, and blockchain. Your result cannot be predicted or manipulated.</li>
<li><strong class="text-foreground">Visual and screen-recordable.</strong> The spinning animation is smooth and clear, making it ideal for recording your draw as proof of fairness. Post the clip to Instagram Stories, TikTok, or your Discord server.</li>
<li><strong class="text-foreground">Shareable pre-loaded wheels.</strong> Click the share icon to copy a URL that opens the wheel with your entries already set. No exporting, no extra steps.</li>
<li><strong class="text-foreground">Multiple winners support.</strong> Need to pick 3 prize winners? Use the winner count selector and spin once — the wheel picks them sequentially, each from the remaining pool.</li>
</ul>

<strong class="text-foreground">Popular uses for a random wheel</strong>
Giveaways and contest draws, classroom random student pickers, team standup order, office lunch deciders, party game starters, Dungeons & Dragons random encounter tables, workout challenge wheels, and anything else where you want a fair, visually engaging random decision.

For weighted draws where some entries have higher odds, see our <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted random picker</a>. For social media giveaways with comment filtering, see our <a href="/social-giveaway" class="text-primary underline hover:no-underline">social giveaway picker</a>.`,
    metaTitle: "Random Wheel — Free Custom Spinner | Decide Anything",
    metaDescription: "Create a custom wheel with any options and spin. Cryptographically random, instant results, no signup. The fastest free spinner wheel online.",
    faqs: [
      { question: "Can I add any type of content to the random wheel?", answer: "Yes. You can add names, words, numbers, emojis, short phrases — anything up to about 30 characters per entry displays well on the wheel. There is no restriction on what the entries represent." },
      { question: "How do I share my random wheel with someone?", answer: "Click the share icon next to the draw title. A unique URL is copied to your clipboard. Anyone who opens that link will see the wheel pre-loaded with your exact entries. No account needed on either end." },
      { question: "Is there a limit on how many options I can add?", answer: "No hard limit. The wheel renders clearly up to about 50 options. For larger lists, segments become smaller but the random selection is not affected. For very large lists, a text list view is often clearer." },
      { question: "Can I use the random wheel offline?", answer: "Yes — once the page is loaded in your browser, spinning works without an internet connection. The randomness runs locally via your browser's crypto API, not a server." },
    ],
  },
  "wheel-of-names": {
    slug: "wheel-of-names",
    h1: "Wheel of Names – Pick a Random Name Instantly",
    subtitle: "Paste your names, hit spin, get a winner in five seconds. Cryptographically random, so even we can't predict where it stops.",
    microText: "Free • No signup • Instant result",
    howItWorksTitle: "How does this wheel of names work?",
    howItWorksText: "Drop a list of names into the box on the right (one per line or comma-separated, both work). The wheel redraws itself with equal segments. Click the centre — or hit space — and the rotation runs for about five seconds before landing on a name. The randomness comes from window.crypto.getRandomValues(), the same RNG browsers use for HTTPS handshakes, so the result can't be predicted in advance or replayed.",
    whenToUseTitle: "When should you use a wheel of names?",
    useCases: [
      { icon: "gift", title: "Contest Winners", description: "Pick a giveaway winner with the entire list visible on screen" },
      { icon: "graduation", title: "Cold Calling Students", description: "Decide who answers next without playing favourites" },
      { icon: "users", title: "Meeting Roles", description: "Assign the day's facilitator, note-taker, or demo lead" },
      { icon: "trophy", title: "Raffles & Draws", description: "Run a club, charity, or office raffle on a projector" },
      { icon: "sparkles", title: "Secret Santa", description: "Match gift-givers without anyone having to know who picked whom" },
    ],
    seoTitle: "Free Wheel of Names Online",
    seoText: `A wheel of names sits somewhere between a coin flip and a lottery: more entries than a coin, more transparency than a hat draw. Add your names, spin, the wheel lands on one. The visible spinning matters more than the maths — your audience watches the result happen rather than trusting a number you read out.

<strong class="text-foreground">Why use this one rather than the obvious competitor</strong>
There are a few well-known wheel-of-names tools out there. Ours differs on three points that matter day to day:
<ul class="list-disc pl-5 mt-2 space-y-1">
<li>The randomness is <code>crypto.getRandomValues()</code> — the same RNG behind TLS encryption, not a basic <code>Math.random()</code>. You can verify it in the page source.</li>
<li>Everything runs locally. Close the tab, your list is gone. We don't sync anything to a server, which means you can run sensitive draws (student rosters, internal HR, NDA-bound contests) without a privacy review.</li>
<li>You can share a wheel by URL — paste the link, the recipient opens it with your entries pre-loaded. Useful for sending a draw to a colleague who'll run it on stream.</li>
</ul>

<strong class="text-foreground">What teachers tell us they use it for</strong>
Cold-calling without bias is the most common case — naming who reads the next paragraph, who solves the next problem at the board. A close second is breaking ties: two students want the same role, the wheel decides, and the loser doesn't feel singled out by the adult in the room. Smartboards in classrooms render the wheel large enough that the back row can read every name. We don't track which schools are using it (no analytics on individual draws), but the project's spike traffic every September lines up with North American back-to-school weeks.

<strong class="text-foreground">When you need more than a basic name wheel</strong>
If some entries should have higher odds — multi-ticket raffles, weighted prize tiers, loyalty-program draws — the <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted random picker</a> handles custom probabilities and shows the exact percentages on each segment. For Instagram or TikTok giveaways where you're pasting raw comments and need keyword filters, see the <a href="/giveaway-picker" class="text-primary underline hover:no-underline">giveaway picker</a>. For yes-no decisions, the <a href="/yes-no-wheel" class="text-primary underline hover:no-underline">yes-no wheel</a> is a single-purpose two-segment version.`,
    metaTitle: "Wheel of Names — Free Random Name Picker | Real Wheel Picker",
    metaDescription: "A free wheel of names with crypto-grade randomness. Classroom-ready, screen-recordable, share by URL. No signup, no tracking.",
    faqs: [
      { question: "How many names can the wheel hold?", answer: "There's no hard cap. The visible segments stay readable up to about 50; past that the labels get tight but the draw still runs fine. For a 500-entry raffle we'd suggest hiding the labels and trusting the result panel — the maths doesn't care about visual density." },
      { question: "Can I remove a winner so they can't win again?", answer: "Yes. After a draw, a 'Remove and re-spin' button shows up. Click it and the winner is dropped from the pool before the next rotation. Handy when you're drawing 1st / 2nd / 3rd prizes back-to-back." },
      { question: "Does the wheel actually pick the segment it lands on, or is the result picked first?", answer: "The result is picked first using crypto.getRandomValues(), and the rotation is calculated to land on that segment. It's the standard approach — the alternative (random rotation, read whatever segment lands under the pointer) would technically work but introduces a tiny bias from rotation discretisation. Either way the visible spin is faithful: the pointer ends on the announced winner, no swap." },
      { question: "Is my list of names sent anywhere?", answer: "No. The whole tool is a static page plus JavaScript that runs in your tab. There's no API call when you spin. You can verify this by opening DevTools → Network and spinning — you'll see zero outgoing requests for the draw itself." },
    ],
  },
  "random-name-picker": {
    slug: "random-name-picker",
    h1: "Random Name Picker – Select Names Fairly",
    subtitle: "Paste your list and pick a random name in seconds. Zero bias guaranteed.",
    microText: "Free • No signup • Instant result",
    howItWorksTitle: "How does this random name picker work?",
    howItWorksText: "Add names to your list by typing them one by one, pasting a comma-separated list, or entering one name per line. Hit the Spin button and watch the colorful wheel rotate until it lands on a randomly chosen name. The selection uses the Web Crypto API — the same cryptographically secure randomness used in online banking — running entirely inside your browser. No data is sent to any server, nothing is stored, and the result is mathematically impossible to predict or manipulate in advance. You can pick multiple winners in a single session, remove names after they win, and re-spin for a second draw. The wheel visually shows every participant with equal-sized segments, making fairness obvious to anyone watching. Perfect for screen-recording or livestreaming your selection to prove the draw was transparent.",
    whenToUseTitle: "When should you use a random name picker?",
    useCases: [
      { icon: "gift", title: "Giveaway Selection", description: "Pick winners from contest entries" },
      { icon: "graduation", title: "Classroom Picker", description: "Call on students randomly" },
      { icon: "users", title: "Team Assignments", description: "Distribute tasks fairly" },
      { icon: "video", title: "Stream Interactions", description: "Select viewers for rewards" },
      { icon: "trophy", title: "Prize Draws", description: "Run transparent prize selections" },
    ],
    seoTitle: "Free Random Name Picker Online — No Signup Required",
    seoText: `Looking for a random name picker that is fast, fair, and completely free? Our online random name picker lets you add any list of names and pick one or more at random with a visual spinning wheel. There is no account, no app to install, and no limit on how many names you can add or how many times you spin.

<strong class="text-foreground">Who uses our random name picker?</strong>
<ul class="list-disc pl-5 mt-2 space-y-1">
<li><strong class="text-foreground">Teachers and educators</strong> use it to call on students fairly, assign classroom roles, or pick who presents next. A random name picker for classroom use removes any perception of favoritism.</li>
<li><strong class="text-foreground">Content creators and streamers</strong> pick random viewers for giveaways, shoutouts, or game invites live on Twitch, YouTube, or TikTok. Spinning the wheel on screen proves the selection is random.</li>
<li><strong class="text-foreground">HR teams and managers</strong> use it to assign tasks, decide meeting order, or run office raffles without bias.</li>
<li><strong class="text-foreground">Party hosts</strong> pick who goes first in games, who answers the dare, or who selects the next song.</li>
</ul>

<strong class="text-foreground">Privacy and fairness</strong>
Every spin uses <code>crypto.getRandomValues()</code> — a cryptographically secure RNG built into every modern browser. The result is not predictable, not reproducible, and not influenced by us. Your list of names never leaves your device. When you close the tab, everything is gone.

<strong class="text-foreground">Need more than a simple picker?</strong>
Try our <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted random picker</a> if some participants deserve higher odds (e.g., for loyalty programs or multi-ticket raffles). For social media giveaways, our <a href="/social-giveaway" class="text-primary underline hover:no-underline">social giveaway picker</a> lets you paste raw Instagram or TikTok comments and filter by keyword, tags, and duplicates before spinning.`,
    metaTitle: "Random Name Picker — Free Wheel Spinner | No Signup",
    metaDescription: "Pick a random name in 2 seconds. Paste your list, spin the wheel, get a fair result. Free, private, cryptographically random. No account needed.",
    faqs: [
      { question: "How many names can I add to the random name picker?", answer: "There is no hard limit. The wheel renders clearly up to about 50 names. Beyond that, names get smaller but the randomness is not affected. For very large lists (500+ names), consider using the textarea bulk-paste mode." },
      { question: "Can I pick multiple winners at once?", answer: "Yes. Use the winners count selector to pick 2, 3, or more winners in a single spin. Each winner is selected from the remaining pool so no name is chosen twice in the same draw." },
      { question: "Is the random name picker truly random?", answer: "Yes. We use crypto.getRandomValues(), the same cryptographically secure API used in encryption and online banking. The result is not predictable before the spin, and we never influence or record any selection." },
      { question: "Can I remove a name after it wins so it can't win again?", answer: "Yes. After a winner is announced, a 'Remove winner & spin again' button appears. Click it and the winner is removed from the wheel before the next draw starts automatically." },
    ],
  },
  "giveaway-picker": {
    slug: "giveaway-picker",
    h1: "Giveaway Picker – Pick Contest Winners Fairly",
    subtitle: "Run transparent giveaways and select winners your audience will trust.",
    microText: "Free • No signup • Instant result",
    howItWorksTitle: "How does this giveaway picker work?",
    howItWorksText: "Paste your list of contest participants — one name per line, or comma-separated — set how many winners you need, and click Spin. The wheel rotates and lands on a cryptographically random winner. Every participant has an equal-sized segment, making the fairness visually clear to anyone watching. Screen-record the spin and post the clip to prove your giveaway was legitimate. Pick one winner or multiple winners in a single session. Remove winners between draws to avoid repeats. No account required and no data is stored or sent to any server.",
    whenToUseTitle: "When should you use a giveaway picker?",
    useCases: [
      { icon: "gift", title: "Instagram Giveaways", description: "Pick winners from comments or followers" },
      { icon: "video", title: "YouTube/Twitch Contests", description: "Select subscribers live on stream" },
      { icon: "sparkles", title: "Brand Promotions", description: "Run marketing giveaways professionally" },
      { icon: "trophy", title: "Multiple Winners", description: "Select 1, 5, or 10+ winners at once" },
      { icon: "users", title: "Community Events", description: "Reward engaged community members" },
    ],
    seoTitle: "Free Giveaway Picker — Pick Winners Transparently",
    seoText: `Audiences trust what they can see. A screen-recorded wheel spin with the full participant list on display ends the "are giveaways rigged?" conversation faster than any disclaimer ever could. That's the whole point of this tool.

<strong class="text-foreground">The five-minute giveaway workflow</strong>
<ol class="list-decimal pl-5 mt-2 space-y-1">
<li>Pull your entries from wherever they live — Instagram comments, a Google Sheet, a Twitch chat log, a Discord message dump.</li>
<li>Paste them into the entries box. Usernames with <code>@</code> in front are fine; we strip them.</li>
<li>Pick how many winners you need (1st / 2nd / 3rd, or one main + ten consolation).</li>
<li>Start screen-recording, then spin. The first ~5 seconds of footage are the actual draw; everything before is your branding.</li>
<li>Post the clip the second the wheel stops. Speed matters — late announcements look suspicious.</li>
</ol>

<strong class="text-foreground">A note on what counts as "proof"</strong>
None of the big platforms — Instagram, TikTok, YouTube, Twitch — actually require any specific proof of fairness for prize draws. What they care about is whether the draw is fraudulent on its face. A visible wheel with everyone's name on it crosses that bar comfortably. We've seen people pair the spin with a notarised list for high-stakes draws (cars, paid trips), but for a $50 gift card the screen-record is plenty.

<strong class="text-foreground">Things people try and how they go</strong>
A few patterns we've watched users develop over time. Round-robin draws — same wheel, remove the winner after each spin, redraw — work great for tier prizes. Multi-account fraud is harder to fight than you'd think; the "exclude suspected bots" toggle on the <a href="/social-giveaway" class="text-primary underline hover:no-underline">social giveaway picker</a> catches accounts that look auto-generated (all digits in the handle, no vowels), but a determined bad actor with five real-looking sockpuppets will get through. If that matters, weight entries by account age via the <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted picker</a>.

For step-by-step walkthroughs of platform-specific giveaways, see the <a href="/how-to-pick-a-random-winner" class="text-primary underline hover:no-underline">picking-winners guide</a>.`,
    metaTitle: "Giveaway Picker Wheel — Free Random Winner Generator",
    metaDescription: "Run transparent giveaways with a screen-recordable spinner wheel. Paste entries from Instagram or TikTok, pick 1-10 winners, post the clip as proof.",
    faqs: [
      { question: "Will Instagram or TikTok accept this as fair?", answer: "Neither platform actually has a formal proof-of-fairness requirement for prize draws — they only intervene if a contest is fraudulent or violates community guidelines. A screen-recorded wheel with the visible participant list is what most large creators use, and it's never been the trigger for a takedown in any case we've seen." },
      { question: "Can I draw multiple winners at once?", answer: "Yes — set the winners count above the wheel before you spin. A draw of three will pick the first, then re-spin twice from the remaining pool, all in one sequence. The result panel shows all three in order with a 'remove and re-draw if disqualified' option per slot." },
      { question: "What do I do if a winner doesn't claim their prize?", answer: "Re-open the wheel, remove the no-show via the result panel, hit re-draw. The new winner is selected from the original pool minus the disqualified entry. If you've already closed the tab, paste the original list back in and use the 'remove' button before spinning." },
      { question: "Is there a way to weight some entries more than others?", answer: "Yes, but not on this page. Use the <a href='/weighted-random-picker'>weighted random picker</a> if some people bought multiple tickets, referred friends, or have loyalty-program bonuses. You set the weight per entry and the wheel shows the exact percentages on each segment." },
    ],
  },
  "weighted-random-picker": {
    slug: "weighted-random-picker",
    h1: "Weighted Random Picker – Custom Probability Draws",
    subtitle: "Some entries should win more often than others. Set the weight, the segment size matches, the maths is visible.",
    microText: "Free • χ² verified • Up to 100 entries",
    howItWorksTitle: "How does this weighted random picker work?",
    howItWorksText: "Each entry gets a weight — a number. Higher weight, bigger slice of the wheel, higher chance of being drawn. The percentages show up next to each name in real time as you edit, so there are no surprises. A built-in 10,000-spin simulator runs the draw against itself and shows how often each entry actually won versus its theoretical odds — useful if you want to confirm fairness before running the live draw.",
    whenToUseTitle: "When should you use a weighted random picker?",
    useCases: [
      { icon: "chart", title: "Multi-Ticket Raffles", description: "Weight equals tickets bought" },
      { icon: "video", title: "Subscriber Tiers", description: "Tier 3 wins 3× as often as Tier 1" },
      { icon: "users", title: "Effort-Based Draws", description: "Hours volunteered, points earned" },
      { icon: "gift", title: "Loyalty Programs", description: "Frequency of purchase × spend" },
      { icon: "sparkles", title: "Game Encounter Tables", description: "Common 60% / rare 30% / epic 10%" },
    ],
    seoTitle: "Free Weighted Random Picker Online",
    seoText: `A weighted draw is what you actually want most of the time — the unweighted "everyone equal" wheel is the exception. Tickets sold, hours volunteered, dollars donated: there's almost always a reason some entries deserve more odds than others. The trick is showing the maths.

<strong class="text-foreground">The arithmetic, in plain text</strong>
Probability = your weight ÷ sum of all weights. Three entries with weights 2/1/1 give you 50%/25%/25%. Five entries at 5/3/2/1/1 give you 41.7%/25%/16.7%/8.3%/8.3%. The wheel segments are drawn to those exact percentages — what you see is the actual probability, not an approximation.

<strong class="text-foreground">The 10,000-spin simulator</strong>
There's a verification mode tucked behind the "Simulate" tab that runs ten thousand spins against the configured weights and reports how often each entry won. A chi-squared test compares the observed frequencies to the theoretical odds and reports a p-value. If you see p < 0.001 across multiple runs, something is wrong with the randomness — but we've never seen it fail in production. The simulator exists because raffle hosts kept asking "how do I know it's actually random?" and saying "trust me" wasn't enough.

<strong class="text-foreground">Things people use weights for</strong>
Charity raffles where donors at the $50 tier get 1 ticket and $500 donors get 12. Twitch subscriber giveaways where Tier 3 subs (the $24.99 ones) get 5× the odds of Tier 1. D&D loot tables with rare/epic/legendary drop rates. Internal company draws where overtime hours convert to weighted entries. Anything where "everyone equal" feels unfair.

For unweighted draws where every entry should have identical odds, see the <a href="/wheel-of-names" class="text-primary underline hover:no-underline">wheel of names</a> instead — it's simpler to share and skip the weights column.`,
    metaTitle: "Weighted Random Picker — Custom Odds Spinner Wheel",
    metaDescription: "Assign per-entry weights, get exact-percentage segments, verify fairness with a 10k-spin chi-squared simulator. Free, no signup.",
    relatedBlogPost: { slug: "/blog/weighted-random-picker", title: "How to Use a Weighted Random Picker for Giveaways" },
  },
  "yes-or-no-wheel": {
    slug: "yes-or-no-wheel",
    h1: "Yes or No Wheel – Let the Wheel Decide",
    subtitle: "Two segments, one spin, decision made. Useful for the moments when you're not actually torn — you just want an excuse to commit.",
    microText: "Free • 50/50 guaranteed • Single click",
    howItWorksTitle: "How does the Yes or No wheel work?",
    howItWorksText: "The wheel ships with two segments: Yes and No. Click the centre, the rotation lasts about five seconds, the pointer lands on one. If you want to bias the outcome (the wheel is for nudging, not actually for high-stakes choices), add a third segment — 'Maybe', 'Ask tomorrow', 'Try the smaller portion' — and the odds rebalance to 33/33/33. Every spin uses crypto.getRandomValues(); past spins don't influence future ones.",
    whenToUseTitle: "When should you use a Yes or No wheel?",
    useCases: [
      { icon: "sparkles", title: "Decision Fatigue", description: "You've been at it for ten minutes. The wheel breaks the tie." },
      { icon: "users", title: "Group Tiebreakers", description: "Two votes each, nobody budges, the wheel settles it." },
      { icon: "gift", title: "Party Truth/Dare", description: "Yes you take the dare, no you don't — no pressure either way." },
      { icon: "graduation", title: "Classroom Polls", description: "Should we extend the break? Vote, but let the wheel decide ties." },
      { icon: "trophy", title: "Workout Stretches", description: "Extra set or move on. Wheel decides." },
    ],
    seoTitle: "Free Yes or No Wheel Online",
    seoText: `A binary choice is the cheapest decision to outsource to a wheel. There's no list to paste, no weights to balance — open the page, spin, move on with your life. It's the digital equivalent of flipping a coin, except a coin is biased (roughly 51/49 toward whichever side started up, per the 2007 Stanford study) and the digital wheel is genuinely 50/50.

The most interesting case isn't actually random decision-making. It's the moment when you already know what you want but won't admit it: you spin, the wheel says No, you feel disappointed, and that's the answer. Pre-commitment bias has a name in the behavioural economics literature; the wheel is a $0 way to surface it. We hear from users who use it for "should I open this app right now" gates — the wheel says no often enough to break the doomscroll without willpower being involved.

For non-binary choices, add segments by typing more lines into the entries box; the wheel rebalances live. For yes-no decisions with one side weighted more (you want the wheel to say "go for it" 70% of the time, say) the <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted picker</a> handles it. For a physical-feeling coin flip rather than a wheel, the <a href="/coin-flip" class="text-primary underline hover:no-underline">coin flipper</a> has the same 50/50 but flips a 3D piece instead.`,
    metaTitle: "Yes or No Wheel - Free Random Decision Maker | Real Wheel Picker",
    metaDescription: "A 50/50 Yes-or-No wheel for tiebreakers, decision fatigue, and pre-commitment checks. Add custom options if 2 isn't enough.",
  },
  "team-generator": {
    slug: "team-generator",
    h1: "Team Generator – Randomly Split into Fair Teams",
    subtitle: "Generate balanced random teams in seconds. Perfect for sports, school, and work.",
    microText: "Free • No signup • Instant result",
    howItWorksTitle: "How does this team generator work?",
    howItWorksText: "Enter your list of participants, choose how many teams to create, and click generate. Our algorithm randomly assigns everyone to a team using cryptographically secure randomness. Every participant has an equal chance of being on any team — no favoritism, no bias.",
    whenToUseTitle: "When should you use a team generator?",
    useCases: [
      { icon: "users", title: "Sports & Games", description: "Create balanced teams for any sport" },
      { icon: "graduation", title: "School Projects", description: "Assign students to project groups fairly" },
      { icon: "sparkles", title: "Team Building", description: "Mix departments for corporate activities" },
      { icon: "trophy", title: "Tournaments", description: "Seed brackets and draw groups randomly" },
      { icon: "gift", title: "Party Games", description: "Split guests into teams for party activities" },
    ],
    seoTitle: "Free Random Team Generator Online",
    seoText: "Need to split people into teams quickly and fairly? Our free team generator randomly divides your list into balanced groups. Whether you're organizing a sports day, school project, or team-building activity, this random team selector ensures no bias and equal distribution. Just paste names, set the number of teams, and generate instantly. No account required.",
    metaTitle: "Team Generator - Free Random Team Maker | Real Wheel Picker",
    metaDescription: "Generate random teams instantly from your list. Free team maker for sports, school, and work. No signup required!",
    relatedBlogPost: { slug: "/blog/spin-wheel-team-generator", title: "How to Use a Wheel to Generate Teams" },
  },
  "random-number-generator": {
    slug: "random-number-generator",
    h1: "Random Number Generator – Pick a Number Instantly",
    subtitle: "Generate truly random numbers between any range. Cryptographically secure.",
    microText: "Free • No signup • Instant result",
    howItWorksTitle: "How does this random number generator work?",
    howItWorksText: "Set your minimum and maximum values, then spin the wheel. Each number on the wheel has an equal chance of being selected. Our generator uses the Web Crypto API for cryptographically secure randomness — the same standard used in encryption and banking.",
    whenToUseTitle: "When should you use a random number generator?",
    useCases: [
      { icon: "trophy", title: "Lottery Draws", description: "Pick winning lottery or raffle numbers" },
      { icon: "sparkles", title: "Game Mechanics", description: "Roll dice, generate random stats" },
      { icon: "graduation", title: "Teaching Math", description: "Create random number exercises" },
      { icon: "users", title: "Order Selection", description: "Who presents first? Pick a number" },
      { icon: "gift", title: "Prize Draws", description: "Assign prizes to random ticket numbers" },
    ],
    seoTitle: "Free Random Number Generator Online",
    seoText: "Need to generate a random number? Our free random number generator creates cryptographically secure numbers between any range you define. Perfect for lottery draws, game mechanics, teaching, or any situation requiring unbiased random numbers. No patterns, no predictability — just pure randomness powered by the Web Crypto API. Free and instant with no signup required.",
    metaTitle: "Random Number Generator - Free Online Number Picker | Real Wheel Picker",
    metaDescription: "Generate random numbers instantly between any range. Cryptographically secure, free, no signup. Perfect for lotteries and games!",
  },
  "party-wheel": {
    slug: "party-wheel",
    h1: "Party Wheel – Fun Random Challenges & Dares",
    subtitle: "Loaded with thirty truth-or-dare prompts by default. Replace any of them with your own, or rebuild from scratch.",
    microText: "Free • Editable • Works on a phone passed around",
    howItWorksTitle: "How does the party wheel work?",
    howItWorksText: "The wheel comes pre-loaded with party prompts (dares, would-you-rather, truth questions, never-have-I-ever). Replace any line with your own by editing the list on the right — changes persist on the device. Spin once per turn. Whoever just won the previous turn does the dare, then passes the phone. The wheel doesn't track turns or scores; that's the host's job.",
    whenToUseTitle: "When should you use a party wheel?",
    useCases: [
      { icon: "sparkles", title: "Pre-Drinking Games", description: "Light prompts that warm a group up without the awkward 'who starts?'" },
      { icon: "users", title: "Birthday Parties", description: "Pass the phone around the table instead of buying a $40 box game" },
      { icon: "gift", title: "Stag/Hen Dos", description: "Load the wheel with custom prompts about the bride/groom" },
      { icon: "trophy", title: "Office Holiday Parties", description: "Keep the prompts SFW; the random element does the work" },
      { icon: "graduation", title: "Icebreakers", description: "First-day-of-class, summer camp, retreat openers" },
    ],
    seoTitle: "Free Party Wheel for Game Nights",
    seoText: `A party wheel is a low-effort substitute for buying a card game. The default prompts are pulled from public-domain truth-or-dare collections and screened for SFW (no nudity dares, no humiliation-style forfeits). Replace any line you don't like — the list edits in place, no separate config screen.

The wheel pairs well with a phone passed around the table. One spin per turn, the wheel takes the "who picks next" decision out of the group, the prompts keep things moving when nobody wants to commit to a card game with rules. Hosts of stag/hen weekends often load the wheel with custom prompts referencing the guest of honour; thirty entries cover an evening comfortably.

For prompt-specific themes, see the <a href="/templates/dare-wheel" class="text-primary underline hover:no-underline">dare wheel</a>, <a href="/templates/never-have-i-ever-wheel" class="text-primary underline hover:no-underline">never-have-I-ever wheel</a>, <a href="/templates/would-you-rather-wheel" class="text-primary underline hover:no-underline">would-you-rather wheel</a>, or the <a href="/templates/drinking-game-wheel" class="text-primary underline hover:no-underline">drinking game wheel</a> for separate pre-built lists.`,
    metaTitle: "Party Wheel — Free Random Challenge Spinner | Real Wheel Picker",
    metaDescription: "Thirty SFW party prompts loaded by default, fully editable. Spin to decide whose turn it is. No app to install, no account.",
  },
  "classroom-picker": {
    slug: "classroom-picker",
    h1: "Classroom Picker – Randomly Select Students",
    subtitle: "Cold-call without the awkwardness. Paste the roster once, spin every time you need a name.",
    microText: "Free • No signup • Works on smartboards",
    howItWorksTitle: "How does this classroom picker work?",
    howItWorksText: "Paste your student roster into the entries box on the right — one name per line, copy-paste from Google Classroom works directly. The wheel rebuilds with every student visible. Tap the centre (or hit space) and it lands on a name in about five seconds. After the draw, a 'remove and spin again' button lets you cycle through the class without repeats. The list saves to the browser between sessions, so you only paste the roster once per device.",
    whenToUseTitle: "When should you use a classroom picker?",
    useCases: [
      { icon: "graduation", title: "Cold Calling", description: "Decide who reads next without playing favourites" },
      { icon: "users", title: "Group Formation", description: "Spin three or four times to seed group leaders" },
      { icon: "sparkles", title: "Presentation Order", description: "Who goes first — anonymously decided" },
      { icon: "trophy", title: "Earned-Prize Draws", description: "Reward effort without picking the same student" },
      { icon: "gift", title: "Daily Roles", description: "Line leader, paper passer, board cleaner — rotated fairly" },
    ],
    seoTitle: "Free Classroom Student Picker",
    seoText: `The hardest part of cold-calling isn't picking a name. It's the moment after, when a kid you've called on three days in a row catches your eye and figures out you're avoiding them. This tool takes that decision out of your hands.

Drop the roster in once. Spin when you need a name. Remove students who've already gone if you don't want repeats — or leave them in if you do. The wheel runs in your browser only, so no roster ever leaves the device, which keeps you on the right side of school data policies without anyone having to ask the IT department.

Smartboards display the wheel at a size the back row can read; we've heard from teachers who use it as a calm-down ritual at the start of literacy circle, with kids predicting where it'll stop. A handful of districts asked us about a "teacher mode" that locks the list against student edits. It's on the roadmap but not built yet — for now, fullscreen the page (top-right arrow icon) before you hand the smartboard remote to anyone.

If you need to split a class of 28 into balanced groups rather than pick one student at a time, the <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted picker</a> handles tier-based group seeding (e.g. one strong reader per group). For class raffles where some students earned multiple tickets, the same tool sets per-student weights.`,
    metaTitle: "Classroom Picker — Free Random Student Selector for Teachers",
    metaDescription: "A classroom name picker built for cold-calling without bias. Paste once, spin every time, roster stays on the device. Smartboard-friendly.",
    relatedBlogPost: { slug: "/blog/classroom-random-picker", title: "How to Use a Random Picker in the Classroom" },
  },
  "secret-santa-picker": {
    slug: "secret-santa-picker",
    h1: "Secret Santa Picker – Random Gift Assignment",
    subtitle: "Randomly assign Secret Santa gift pairs in seconds. Anonymous and fair.",
    microText: "Free • No signup • Instant result",
    howItWorksTitle: "How does this Secret Santa picker work?",
    howItWorksText: "Enter all participant names, click spin, and each person is randomly assigned a gift recipient. The draw is cryptographically random, ensuring no one can predict who gets whom. Perfect for office parties, friend groups, and family gift exchanges.",
    whenToUseTitle: "When should you use a Secret Santa picker?",
    useCases: [
      { icon: "gift", title: "Office Parties", description: "Anonymous gift exchange at work" },
      { icon: "users", title: "Friend Groups", description: "Fair random assignment among friends" },
      { icon: "sparkles", title: "Family Events", description: "Holiday gift exchanges for large families" },
      { icon: "trophy", title: "Online Events", description: "Remote or virtual Secret Santa games" },
      { icon: "graduation", title: "School Events", description: "Classroom gift exchange activities" },
    ],
    seoTitle: "Free Secret Santa Picker Online",
    seoText: "Organize your Secret Santa gift exchange in seconds with our free picker. Enter all participant names, spin the wheel, and randomly assign gift pairs. No account, no email required — everything runs in your browser for complete privacy. Perfect for office parties, friend groups, and family holiday events. Each assignment is cryptographically random, ensuring a truly fair and anonymous Secret Santa draw.",
    metaTitle: "Secret Santa Picker - Free Random Gift Assigner | Real Wheel Picker",
    metaDescription: "Pick Secret Santa pairs instantly with our free random gift assigner. Perfect for offices and families. No signup, no email required!",
    relatedBlogPost: { slug: "/blog/secret-santa-guide", title: "How to Organize the Perfect Secret Santa" },
  },
  "raffle-picker": {
    slug: "raffle-picker",
    h1: "Raffle Picker – Draw Winners Transparently",
    subtitle: "Run fair raffle draws with live spinning animation. Perfect for events and fundraisers.",
    microText: "Free • No signup • Instant result",
    howItWorksTitle: "How does this raffle picker work?",
    howItWorksText: "Enter all raffle ticket holders or participant names, choose how many winners to draw, and spin the wheel. Each spin is cryptographically random, ensuring a completely fair draw. The live animation makes the process transparent and exciting for your audience.",
    whenToUseTitle: "When should you use a raffle picker?",
    useCases: [
      { icon: "trophy", title: "Fundraising Events", description: "Draw raffle winners at charity events" },
      { icon: "gift", title: "Prize Giveaways", description: "Select prize winners from tickets" },
      { icon: "users", title: "Community Raffles", description: "Fair draws for club or association members" },
      { icon: "video", title: "Live Events", description: "Spin on screen for full transparency" },
      { icon: "sparkles", title: "Online Raffles", description: "Digital raffle draws for virtual events" },
    ],
    seoTitle: "Free Online Raffle Picker",
    seoText: `Need a raffle picker for your event or fundraiser? Our free online raffle picker makes drawing winners transparent, fair, and exciting. Add participant names or ticket numbers, set the number of winners, and spin the wheel live. The cryptographically random selection ensures no manipulation is possible. Perfect for charity events, school fundraisers, and community raffles. No account required. Need weighted odds for participants with multiple raffle tickets? Our <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted random picker</a> lets you assign different probabilities to each participant.`,
    metaTitle: "Raffle Picker - Free Online Raffle Draw Tool | Real Wheel Picker",
    metaDescription: "Draw raffle winners fairly with our free online raffle picker. Live animation, multiple winners, no signup required!",
  },
  "instagram-giveaway-picker": {
    slug: "instagram-giveaway-picker",
    h1: "Instagram Giveaway Picker – Choose Winners Fairly",
    subtitle: "Randomly select Instagram giveaway winners. Fair, transparent, and verifiable.",
    microText: "Free • No signup • Instant result",
    howItWorksTitle: "How does this Instagram giveaway picker work?",
    howItWorksText: "Pull the commenter usernames off your post (select all on the comment thread, copy, paste — handles count and replies fine). Drop them in. The wheel renders with every entry visible. Hit space, watch the spin, screen-record the last five seconds. Post the clip the moment it stops. Total time: about a minute from copy to announcement.",
    whenToUseTitle: "When should you use an Instagram giveaway picker?",
    useCases: [
      { icon: "gift", title: "Comment Draws", description: "Paste raw comments, the picker strips @s and dupes" },
      { icon: "users", title: "Story Reshare Draws", description: "Manual list, but the spin part is the same" },
      { icon: "video", title: "Reel Engagement", description: "Tag-2-friends rules become weighted entries" },
      { icon: "trophy", title: "Multi-Prize Draws", description: "Pick 1st, 2nd, 3rd in one sequence" },
      { icon: "sparkles", title: "Collab Giveaways", description: "Combine commenter lists from two accounts" },
    ],
    seoTitle: "Free Instagram Giveaway Picker",
    seoText: `Meta's terms allow giveaways on Instagram but don't endorse specific winner-selection tools. What that means in practice: you're free to use any method, as long as the disclosure to participants is honest. A screen-recorded wheel spin clears that bar and ends the trust conversation faster than any disclaimer would.

<strong class="text-foreground">The Instagram-specific bit</strong>
The mildly annoying part of an IG giveaway is collecting comments. Instagram caps the visible comment count and replies expand inline; copy-paste from the app works but pastes a wall of usernames + reply markers. The picker strips Instagram's comment-thread metadata (timestamps, "@user replied", emoji-only entries) and gives you a clean list. Duplicates are removed by default; toggle that off if your rule is "more comments = more entries."

<strong class="text-foreground">Tag-2-friends rules</strong>
The <a href="/social-giveaway" class="text-primary underline hover:no-underline">social giveaway picker</a> has a "minimum @ tags in comment" filter. Set it to 2 and only entries whose comment contains at least 2 @-mentions stay in. This is the cleanest way to enforce "tag 2 friends to enter" without manually scanning replies.

Once you've got the cleaned list, paste it here or stay on the social giveaway picker and spin from there. Either works.`,
    metaTitle: "Instagram Giveaway Picker — Free Winner Selector | Real Wheel Picker",
    metaDescription: "Paste raw IG comments, the wheel strips dupes and @ symbols, screen-record the spin for proof. Meta-policy friendly, no API, no signup.",
    relatedBlogPost: { slug: "/blog/how-to-run-instagram-giveaway", title: "How to Run a Successful Instagram Giveaway" },
  },
  "tiktok-giveaway-picker": {
    slug: "tiktok-giveaway-picker",
    h1: "TikTok Giveaway Picker – Select Winners Instantly",
    subtitle: "TikTok comments don't paste cleanly. The picker strips the timestamps, replies, and emoji-only entries so you can spin the actual list.",
    microText: "Free • No app • Screen-record ready",
    howItWorksTitle: "How does this TikTok giveaway picker work?",
    howItWorksText: "Open your video, scroll the full comment thread (TikTok lazy-loads, so scroll all the way down), select-all and copy the comments panel. Paste into the entries box. The picker cleans up TikTok's interleaved replies and the @ tags. Set how many winners you need, spin the wheel while screen-recording, post the clip to your account or as a duet.",
    whenToUseTitle: "When should you use a TikTok giveaway picker?",
    useCases: [
      { icon: "video", title: "Comment Draws", description: "Standard 'comment to enter' format" },
      { icon: "gift", title: "Duet/Stitch Entries", description: "Manual list, but the picker handles the draw the same way" },
      { icon: "users", title: "Follower Milestone Draws", description: "100K, 500K, 1M follower celebrations" },
      { icon: "trophy", title: "Live Draws", description: "Spin on stream with the wheel visible to viewers" },
      { icon: "sparkles", title: "Sponsored Giveaways", description: "Brand-paid draws where transparency is contractual" },
    ],
    seoTitle: "Free TikTok Giveaway Picker",
    seoText: `TikTok's comment system is interleaved — every original comment can have a long reply thread directly below it, and "copy all comments" pastes everything in a single block including the @-mention replies. The picker handles this: paste the wall of text, the cleaner extracts unique commenter handles, drops the reply markers, removes emoji-only entries and duplicates.

<strong class="text-foreground">Why screen-record the spin and not just post a screenshot</strong>
Screenshot-based "I picked @user randomly" announcements get accused of being faked roughly as often as they're posted. The same wheel spin recorded and posted as a clip ends the question. TikTok's algorithm tends to surface giveaway-result videos to people who entered the giveaway, so the clip itself often drives engagement on the next post.

<strong class="text-foreground">A note on platform rules</strong>
TikTok Community Guidelines don't restrict prize draws as long as the contest itself is legal in the host's region and the prize delivery isn't a scam. Random-selection method isn't regulated. The clip-as-proof approach is what we see top creators using by default.

For multi-platform draws (TikTok + Instagram + Twitter at the same time), combine the lists into the <a href="/giveaway-picker" class="text-primary underline hover:no-underline">main giveaway picker</a>. For comment filtering by required keywords (e.g. "enter 🎁" must appear), the <a href="/social-giveaway" class="text-primary underline hover:no-underline">social giveaway picker</a> has a keyword filter.`,
    metaTitle: "TikTok Giveaway Picker — Free Winner Selector | Real Wheel Picker",
    metaDescription: "Paste raw TikTok comments, the picker cleans the reply markers and dupes, spin while recording, post the clip. No API key, no signup.",
    relatedBlogPost: { slug: "/blog/tiktok-giveaway-guide", title: "How to Run a TikTok Giveaway That Gets Results" },
  },
  "youtube-giveaway-picker": {
    slug: "youtube-giveaway-picker",
    h1: "YouTube Giveaway Picker – Pick Subscriber Winners",
    subtitle: "Channel members or comment-thread entries — paste either, spin once, show the recording in your next video as proof.",
    microText: "Free • Works without the YouTube API • Stream-ready",
    howItWorksTitle: "How does this YouTube giveaway picker work?",
    howItWorksText: "Open the comment section, sort by 'Newest first' (otherwise YouTube reorders by relevance and you miss late entries). Expand 'Show more replies' a few times to load the full thread, then select-all-and-copy. Paste here. The picker strips reply markers and bumps duplicates. For sub-only draws, paste the membership list from YouTube Studio → Memberships → Active members instead. Spin while screen-recording — the next video's pinned comment is where the clip goes.",
    whenToUseTitle: "When should you use a YouTube giveaway picker?",
    useCases: [
      { icon: "video", title: "Subscriber Milestone", description: "100K / 500K / 1M plaque celebrations" },
      { icon: "gift", title: "Comment-to-Enter", description: "The dominant YouTube giveaway format" },
      { icon: "users", title: "Members-Only Draws", description: "Channel-membership exclusive prizes" },
      { icon: "trophy", title: "Live Stream Draws", description: "Premiere / Live wait-screens" },
      { icon: "sparkles", title: "Brand Deal Activations", description: "Sponsor-mandated transparent draws" },
    ],
    seoTitle: "Free YouTube Giveaway Picker",
    seoText: `YouTube's giveaway policy lives inside the broader Community Guidelines and the YouTube Partner Program rules. The short version: prize draws are allowed, the entry mechanism can't promise views or engagement in exchange for the prize (no "subscribe + comment + 3 friends" Pyramid style), and the prize fulfilment is on the creator. The platform itself doesn't certify draws.

<strong class="text-foreground">The actual workflow that works</strong>
Sort comments by Newest first. YouTube's default "Top comments" sort reorders by engagement, which means late entries silently disappear from the visible list — copy from that view and you've shadow-excluded half your participants. Newest-first also makes it easier to scroll back to a cutoff timestamp if your giveaway has an entry deadline.

<strong class="text-foreground">Sub-only versus all-comment draws</strong>
Members-only draws are easier to verify (YouTube Studio gives you a clean active-members CSV), and they convert better as channel-growth tools because the entry barrier creates the conversion. Open-comment draws cast a wider net but get more bots and the verification work falls on you.

For comment-keyword filtering ("must include #giveaway" or similar) the <a href="/social-giveaway" class="text-primary underline hover:no-underline">social giveaway picker</a> handles it. For weighted draws where channel members count for 3× a non-member's chance, the <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted picker</a> sets that ratio.`,
    metaTitle: "YouTube Giveaway Picker — Free Subscriber Winner Selector",
    metaDescription: "Paste comments or the YouTube Studio members CSV, spin once, screen-record the result. YPP-friendly, no API key, no signup.",
    relatedBlogPost: { slug: "/blog/youtube-giveaway-guide", title: "How to Run a YouTube Giveaway That Grows Your Channel" },
  },
  "discord-giveaway-picker": {
    slug: "discord-giveaway-picker",
    h1: "Discord Giveaway Picker – Select Server Winners",
    subtitle: "Reaction collectors and Giveaway-Bot do the same thing this page does, except this works without adding a bot to your server.",
    microText: "Free • No bot needed • Mod-permission-friendly",
    howItWorksTitle: "How does this Discord giveaway picker work?",
    howItWorksText: "Pull the participant list from wherever your entries live: people who reacted with 🎉, members of a specific role, anyone who replied to the giveaway message. Discord's UI doesn't make this easy without a bot — you typically right-click the reaction count, view all reactors, and copy from the modal. Once you have the usernames, paste them here and spin. The picker handles Discord's discriminator format (Name#1234 or the new @handle) cleanly.",
    whenToUseTitle: "When should you use a Discord giveaway picker?",
    useCases: [
      { icon: "gift", title: "Reaction Giveaways", description: "🎉 reactors, no bot install needed" },
      { icon: "users", title: "Role-Gated Draws", description: "Booster-only, Nitro-only, donator-only" },
      { icon: "trophy", title: "Tournament Slot Draws", description: "Pick 8 / 16 / 32 slots from a sign-up list" },
      { icon: "video", title: "Voice Channel Attendance", description: "Manual list of people who showed up to the event" },
      { icon: "sparkles", title: "Karma/XP Rewards", description: "Mee6/Tatsu top-N user lists" },
    ],
    seoTitle: "Free Discord Giveaway Picker",
    seoText: `Adding a giveaway bot to a Discord server is a permissions decision a lot of admins don't want to make for a one-off draw — bots like Giveaway-Bot or MEE6 need Manage Messages, sometimes Manage Roles, and you've now got a third party reading your server. This page is the no-bot alternative: paste a list, spin, post the screenshot in the announcement channel.

<strong class="text-foreground">Getting the reactor list out of Discord</strong>
Right-click the reaction count below the giveaway message → "View Reactors" → there's no native "copy all" but the user list is selectable. For servers with more than 100 reactors, paginate through the modal. If you've got a bot already, most of them expose a /listreactors-style command that pastes the list into a channel; copy from there instead.

<strong class="text-foreground">Role-restricted draws</strong>
For Booster-only or Nitro-only draws, the cleanest method is asking eligible members to react with a specific emoji to the giveaway message, then filtering the reactor list against your role list. The picker doesn't do the filtering itself — it just runs the spin once you've cleaned the list.

For server-wide draws where you want the giveaway message itself to handle entries automatically, a bot is still easier. For one-off draws where the bot-install friction outweighs the convenience, this page wins.`,
    metaTitle: "Discord Giveaway Picker — Free Server Winner Selector",
    metaDescription: "Run a Discord giveaway without installing a bot. Paste reactors, role-members, or tournament sign-ups, spin once, post the proof.",
    relatedBlogPost: { slug: "/blog/discord-giveaway-guide", title: "How to Run a Discord Giveaway (Complete Guide)" },
  },
  "twitter-giveaway-picker": {
    slug: "twitter-giveaway-picker",
    h1: "Twitter / X Giveaway Picker – Select Winners Fast",
    subtitle: "Since the X API turned paid, third-party 'pick a winner from retweets' tools died. This page is the manual-paste replacement.",
    microText: "Free • Works post-API • Verified-tier weighting optional",
    howItWorksTitle: "How does this Twitter/X giveaway picker work?",
    howItWorksText: "X removed free public-API access in 2023, so the old crop of retweet-roulette tools either shut down or now charge $100/month. The manual workflow is: open the retweets/quotes panel on the giveaway tweet, scroll the full list (X lazy-loads, so scroll all the way), select-all the usernames pane, copy. Paste here. The picker strips @ symbols and dedupes. Spin, screen-record, post the clip as a reply to the original tweet.",
    whenToUseTitle: "When should you use a Twitter/X giveaway picker?",
    useCases: [
      { icon: "gift", title: "Retweet/Repost Draws", description: "Classic 'RT to enter' giveaway format" },
      { icon: "users", title: "Quote-Tweet Contests", description: "More engagement signal than a plain RT" },
      { icon: "video", title: "Reply Draws", description: "Lower entry barrier, more bot risk" },
      { icon: "trophy", title: "Follower Milestones", description: "1K / 10K / 100K celebration giveaways" },
      { icon: "sparkles", title: "Verified/Blue Bias", description: "Weight verified accounts 2× via weighted picker" },
    ],
    seoTitle: "Free Twitter / X Giveaway Picker",
    seoText: `The X giveaway landscape changed sharply in 2023. The free public API closure killed the previous generation of "paste a tweet URL and we'll pick a winner" tools — RandomPicker, TwitterPickerBot, and others either shut down or moved behind a paid X Developer tier that costs $100/month minimum. The remaining options are manual collection (this page) or expensive API access.

<strong class="text-foreground">The manual workflow, end to end</strong>
Open the retweets panel of your giveaway tweet (click the retweet count). X paginates aggressively, so scroll until "End of retweets" appears or until you've covered the entry deadline. Select the username column with click-drag, copy, paste here. The picker drops @-symbols, removes duplicates by default, and gives you a clean list to spin.

<strong class="text-foreground">Bot defence on X</strong>
X giveaways attract a higher proportion of bot entries than other platforms because the entry barrier (RT or reply) is the lowest of any major social network. The <a href="/social-giveaway" class="text-primary underline hover:no-underline">social giveaway picker</a> has an "exclude suspected bots" toggle that catches handles with the all-digit or no-vowel patterns generated en masse. Verified accounts (legacy or paid Blue) typically pass through that filter; if you want to weight them higher to bias toward real engagement, the <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted picker</a> sets per-entry odds.`,
    metaTitle: "Twitter Giveaway Picker — Free X Contest Winner Selector",
    metaDescription: "The post-API-shutdown way to pick X giveaway winners. Paste retweeters or repliers, spin, post the clip. No $100/mo API tier needed.",
    relatedBlogPost: { slug: "/blog/twitter-giveaway-guide", title: "How to Run a Twitter/X Giveaway That Goes Viral" },
  },
  "facebook-giveaway-picker": {
    slug: "facebook-giveaway-picker",
    h1: "Facebook Giveaway Picker – Draw Winners Fairly",
    subtitle: "Meta's Promotions Guidelines have a hard rule: you can't require sharing to enter. Beyond that, anything goes. This page handles the draw itself.",
    microText: "Free • Meta-policy-compliant flow • Group + Page",
    howItWorksTitle: "How does this Facebook giveaway picker work?",
    howItWorksText: "Open your giveaway post. Comments paginate the same as the rest of Facebook — click 'View more comments' until you've loaded the full thread. Select-all and copy the comment column (Facebook's UI mixes timestamps and reactions in the copy buffer; the picker filters that out). Paste here, spin once, screen-record. Post the recording as a follow-up comment or a new post pinned to the page.",
    whenToUseTitle: "When should you use a Facebook giveaway picker?",
    useCases: [
      { icon: "gift", title: "Page Post Giveaways", description: "Comment-to-enter, the standard Page format" },
      { icon: "users", title: "Group Giveaways", description: "Closed/private groups, members-only draws" },
      { icon: "video", title: "Live Stream Draws", description: "Spin during Facebook Live, audience sees it" },
      { icon: "trophy", title: "Local Business Promo", description: "Boost Page reach with a transparent draw" },
      { icon: "sparkles", title: "Event RSVP Draws", description: "Pick winners from event attendees" },
    ],
    seoTitle: "Free Facebook Giveaway Picker",
    seoText: `Meta's Promotions Guidelines (the rulebook for prize draws on Facebook and Instagram) are short and specific: you cannot require participants to share a post, tag friends in the post content, or move the giveaway to a personal timeline. Comment-to-enter and like-to-enter are both allowed. Most violations of these rules don't trigger automated takedowns — they trigger reports from competitors, so the rules matter most when your draw is big enough to attract attention.

<strong class="text-foreground">Page giveaway versus Group giveaway</strong>
On a public Page, the comment thread is your participant list. On a private Group, you're operating inside a closed audience and most Promotions Guidelines don't apply the same way — Group admins set the rules. Group giveaways convert better (audience is pre-segmented and engaged) but reach less new people.

<strong class="text-foreground">The "must share to enter" trap</strong>
Lots of Pages still post "comment + share to enter" giveaways. Sharing is technically prohibited as an entry requirement. Meta enforces this inconsistently — small Pages get away with it, large brands get flagged. Stick to "comment to enter" and you don't have to worry about the policy review email.

For weighted draws where Page fans get higher odds than first-time commenters, the <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted picker</a> handles per-entry weighting. For keyword-filtered draws (e.g., "must mention #brand"), use the <a href="/social-giveaway" class="text-primary underline hover:no-underline">social giveaway picker</a>.`,
    metaTitle: "Facebook Giveaway Picker — Free Contest Winner Selector",
    metaDescription: "Paste FB post comments, spin, screen-record. Meta-Promotions-Guidelines-compliant workflow. Works for Pages, Groups, and Live streams.",
    relatedBlogPost: { slug: "/blog/facebook-giveaway-guide", title: "How to Run a Facebook Giveaway the Right Way" },
  },
  "twitch-giveaway-picker": {
    slug: "twitch-giveaway-picker",
    h1: "Twitch Giveaway Picker – Select Stream Winners Live",
    subtitle: "OBS browser source it, alt-tab to it on stream, hit space. The wheel becomes a five-second segment your viewers actually want to watch.",
    microText: "Free • OBS-friendly • Sub-tier weighting via the weighted picker",
    howItWorksTitle: "How does this Twitch giveaway picker work?",
    howItWorksText: "On stream: add the page as an OBS Browser Source so you can switch to it as a scene. Pull the participant list from chat (FrankerFaceZ's chat-log export or the standard Twitch chat scroll-and-copy), or from Streamlabs/Streamelements if you've been running a !enter command. Paste, spin, the wheel takes about 5 seconds — long enough for hype-build, short enough that you don't lose chat momentum.",
    whenToUseTitle: "When should you use a Twitch giveaway picker?",
    useCases: [
      { icon: "video", title: "Live Stream Reveal", description: "Add as OBS scene, spin between segments" },
      { icon: "users", title: "Sub-Only Draws", description: "Tier 3 weights 3× via the weighted picker" },
      { icon: "gift", title: "Channel Point Redemption", description: "Top redeemers entered automatically" },
      { icon: "trophy", title: "Sub Milestone", description: "100 / 500 / 1K sub celebration" },
      { icon: "sparkles", title: "Charity Streams", description: "Donation-tier weighted draws for raids" },
    ],
    seoTitle: "Free Twitch Giveaway Picker",
    seoText: `On Twitch, the wheel is a piece of show-don't-tell. The five-second spin window fits cleanly into a stream's pacing — long enough to read a sponsor blurb over it, short enough that you don't lose chat. The audience watches the wheel rather than waiting for you to type out a number.

<strong class="text-foreground">OBS integration without a plugin</strong>
Add the giveaway page URL as a Browser Source in OBS at 800×800. Set it as a separate scene; switch to it when it's draw time, switch back to your camera scene when the wheel stops. No StreamElements or Streamlabs plugin install needed — the page is just a webpage. Chat sees the wheel via your stream output the same way they see your gameplay.

<strong class="text-foreground">Sub-tier weighting</strong>
On Twitch, tier 1 / 2 / 3 subs pay $5 / $10 / $25 monthly. Weighting tier 3 subs 5× the odds of tier 1 (matching the dollar ratio) is the most defensible "VIP gets better odds" formula. The <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted picker</a> handles those ratios; you'd paste tier-1 names with weight 1, tier-2 names with weight 2, tier-3 names with weight 5.

For chat-command-based entries (!enter), Streamlabs and Nightbot can export the entry list to a CSV; paste that CSV's username column here. For pure chat-scrolling collection, FrankerFaceZ Chat Logger is the least painful tool.`,
    metaTitle: "Twitch Giveaway Picker — Free Stream Winner Selector",
    metaDescription: "Add as an OBS Browser Source, switch scene to spin during stream. Sub-tier weighting via the weighted picker. No plugin, no bot.",
    relatedBlogPost: { slug: "/blog/twitch-giveaway-guide", title: "How to Run a Twitch Giveaway Your Community Will Love" },
  },
  "reddit-giveaway-picker": {
    slug: "reddit-giveaway-picker",
    h1: "Reddit Giveaway Picker – Draw Comment Winners",
    subtitle: "Most subs require mod-approved draws with a randomizer link in the result thread. This page is one of the links mods accept.",
    microText: "Free • Result-thread linkable • Mod-policy compatible",
    howItWorksTitle: "How does this Reddit giveaway picker work?",
    howItWorksText: "Reddit doesn't have a 'copy all comments' export, so the workflow is: scroll the comment section, manually copy the commenter usernames (or use a browser extension like Reddit Enhancement Suite which has a 'show user list' feature). Filter top-level comments only if your rule says 'top-level to enter'. Paste here, spin, post the result thread linking back to this page so mods can verify your participant list reproduces the same outcome.",
    whenToUseTitle: "When should you use a Reddit giveaway picker?",
    useCases: [
      { icon: "gift", title: "Sub-Specific Giveaways", description: "r/anime / r/mechanicalkeyboards / r/Watches typical format" },
      { icon: "users", title: "AMA Prize Draws", description: "End-of-AMA random commenter prize" },
      { icon: "trophy", title: "Charity Drives", description: "Karma-threshold-gated draws with mod oversight" },
      { icon: "video", title: "r/giveaways Posts", description: "Free-stuff sub with verification chains" },
      { icon: "sparkles", title: "Cake Day Draws", description: "Account anniversary mini-giveaways" },
    ],
    seoTitle: "Free Reddit Giveaway Picker",
    seoText: `Reddit is the platform where giveaway transparency is enforced socially rather than algorithmically. Mod teams on big subs (r/anime, r/mechanicalkeyboards, r/Watches, r/giveaways) require giveaway posts to be flaired, account-age and karma-gated, and concluded with a winner-announcement thread linking to a public randomizer. The community will dig through your post history if a draw seems suspicious; a screenshot isn't enough.

<strong class="text-foreground">What makes a mod-acceptable result thread</strong>
The pattern most subs accept: original giveaway post → snapshot of the participant list at the deadline (RES export, or a Pastebin of the comment usernames) → public randomizer link with the participant list pre-loaded → winner announcement linking to all three. The pre-loaded URL is the key step — anyone can re-run the draw and confirm they get the same winner, which is what mods are actually checking.

<strong class="text-foreground">Karma and account-age gating</strong>
Most giveaway subs require entrants to have 30-day-old accounts and minimum karma (varies, often 100+ comment karma). Reddit doesn't enforce this — you do, manually, by filtering the comment list before pasting. RES makes the filtering tolerable; without it, the work is genuinely tedious for a 500-entry draw.

For weighted draws (e.g., higher-karma entrants get more odds, common in r/charity_giveaways), the <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted picker</a> handles per-entry weights.`,
    metaTitle: "Reddit Giveaway Picker — Free Comment Winner Selector",
    metaDescription: "The randomizer link mod teams on giveaway subs accept. Paste filtered commenters, link the result, audit the draw via the share URL.",
    relatedBlogPost: { slug: "/blog/reddit-giveaway-guide", title: "How to Run a Reddit Giveaway the Right Way" },
  },
  "linkedin-giveaway-picker": {
    slug: "linkedin-giveaway-picker",
    h1: "LinkedIn Giveaway Picker – Professional Winner Selection",
    subtitle: "LinkedIn giveaways have a different audience than IG/TikTok ones. Lower volume, higher quality leads, mandatory professional tone in the result post.",
    microText: "Free • B2B-appropriate output • Engagement-boost workflow",
    howItWorksTitle: "How does this LinkedIn giveaway picker work?",
    howItWorksText: "LinkedIn's UI doesn't paginate the comment thread cleanly — 'See more comments' loads in batches and you have to click it 10+ times for a viral post. Once the full thread is visible, select-all the commenter names column (LinkedIn appends the user's title and company; the picker strips that to just the name). Spin once, take a screenshot of the result, post it as a follow-up update tagging the winner — that follow-up post typically gets 30-50% of the original post's engagement, which is why LinkedIn giveaways are good content even before the prize matters.",
    whenToUseTitle: "When should you use a LinkedIn giveaway picker?",
    useCases: [
      { icon: "users", title: "Book/Course Giveaways", description: "The standard 'follow + comment to win' B2B format" },
      { icon: "gift", title: "Conference Tickets", description: "Pre-event audience-build draws" },
      { icon: "trophy", title: "Product Launch Promos", description: "First-100 sign-ups draw a premium tier" },
      { icon: "sparkles", title: "Webinar Attendance", description: "Live-attendees-only draw to drive showup rates" },
      { icon: "chart", title: "Newsletter Sign-Up", description: "Subscribe-this-week to enter draws" },
    ],
    seoTitle: "Free LinkedIn Giveaway Picker",
    seoText: `LinkedIn giveaways play by different rules than the consumer-platform ones. The audience is smaller, the entry barrier is higher (commenters are putting their professional reputation on a giveaway post), and the prize that converts is usually content-adjacent: books, course seats, conference tickets, software trials. A $50 Amazon card draw on LinkedIn underperforms a free book.

<strong class="text-foreground">The follow-up post is the actual asset</strong>
On LinkedIn, the winner-announcement post often outperforms the original giveaway post in impressions. Tag the winner, congratulate them by name, mention the contest briefly, and add a "I'm running another one in [month] — follow me to catch it" call-to-action. That sequence regularly compounds reach across 2-3 giveaway cycles before audience fatigue sets in.

<strong class="text-foreground">Connection-degree weighting (optional)</strong>
B2B giveaways sometimes weight 1st-degree connections higher than 2nd or 3rd — the rationale being that close-network connections are more likely to become customers. The <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted picker</a> handles this if you manually tag entries by connection degree before pasting (you'd label 1st-degree connections with weight 3, 2nd with 2, 3rd with 1).

For multi-platform B2B campaigns (LinkedIn + Twitter/X simultaneously), combine the lists into the <a href="/giveaway-picker" class="text-primary underline hover:no-underline">main giveaway picker</a> after collecting from each.`,
    metaTitle: "LinkedIn Giveaway Picker — Free Professional Winner Selector",
    metaDescription: "B2B-tuned giveaway picker. Paste LinkedIn commenters (titles auto-stripped), spin, post the follow-up that drives 30-50% of original reach.",
    relatedBlogPost: { slug: "/blog/linkedin-giveaway-guide", title: "How to Run a LinkedIn Giveaway That Builds Your Brand" },
  },
};
