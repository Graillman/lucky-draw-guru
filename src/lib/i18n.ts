export type Language = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it';

export interface SEOPageTranslations {
  h1: string;
  subtitle: string;
}

export interface Translations {
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  fairDraw: string;
  customDraw: string;
  microText: string;
  
  // SEO Pages translations
  seoPages: {
    'random-wheel': SEOPageTranslations;
    'wheel-of-names': SEOPageTranslations;
    'random-name-picker': SEOPageTranslations;
    'giveaway-picker': SEOPageTranslations;
    'weighted-random-picker': SEOPageTranslations;
  };
  stepPaste: string;
  stepSpin: string;
  stepWin: string;
  
  // How it works
  howItWorksTitle: string;
  howItWorksText: string;
  
  // Micro trust indicators
  trustIndicator1: string;
  trustIndicator2: string;
  trustIndicator3: string;
  
  // Use cases section
  useCasesTitle: string;
  useCaseGiveaways: string;
  useCaseGiveawaysDesc: string;
  useCaseStreaming: string;
  useCaseStreamingDesc: string;
  useCaseClassrooms: string;
  useCaseClassroomsDesc: string;
  useCaseTeams: string;
  useCaseTeamsDesc: string;
  useCaseWeighted: string;
  useCaseWeightedDesc: string;
  
  // Advanced mode explainer
  advancedModeExplainer: string;
  totalWeight: string;
  totalProbability: string;
  
  // SEO bottom section
  seoBottomTitle: string;
  seoBottomText: string;
  
  // Draw Modes
  drawModes: string;
  simpleMode: string;
  equalProbabilities: string;
  uniformRandom: string;
  simpleModeDesc: string;
  customMode: string;
  adjustableProbabilities: string;
  advancedMode: string;
  customModeDesc: string;
  customWarning: string;
  or: string;
  
  // Participant Input
  participantList: string;
  pastePseudos: string;
  participant: string;
  participants: string;
  clearAll: string;
  adjustProbabilities: string;
  addParticipantsLeft: string;
  addParticipantPlaceholder: string;
  bulkAddPlaceholder: string;
  weight: string;
  probability: string;
  adSpace: string;
  actions: string;
  sortAZ: string;
  sortZA: string;
  shuffle: string;
  onePerLine: string;
  commaSeparated: string;
  removeDuplicates: string;
  largeList: string;
  preview: string;
  moreParticipants: string;
  
  // Draw Title
  drawTitle: string;
  drawTitleLabel: string;
  drawTitlePlaceholder: string;
  optional: string;
  
  // Winners Count
  numberOfWinners: string;
  maxWinners: string;
  
  // Draw Button
  launchDraw: string;
  drawing: string;
  addAtLeast2: string;
  
  // Winner Result
  drawWinner: string;
  drawWinners: string;
  copy: string;
  copied: string;
  relaunch: string;
  share: string;
  copySuccess: string;
  copySuccessDesc: string;
  copyError: string;
  copyErrorDesc: string;
  spinAgain: string;
  removeWinnerAndRespin: string;
  removeWinnersAndRespin: string;
  
  // Spinning Wheel
  spinningText: string;
  
  // Trust Section
  whyChoose: string;
  usedByCreators: string;
  usedByCreatorsDesc: string;
  statisticalTool: string;
  statisticalToolDesc: string;
  noAccountRequired: string;
  noAccountRequiredDesc: string;
  worksEverywhere: string;
  worksEverywhereDesc: string;
  
  // SEO Section
  seoTitle: string;
  fairDrawTitle: string;
  fairDrawText1: string;
  fairDrawText2: string;
  customDrawTitle: string;
  customDrawText1: string;
  customDrawText2: string;
  popularUseCases: string;
  useCase1: string;
  useCase2: string;
  useCase3: string;
  useCase4: string;
  useCase5: string;
  useCase6: string;
  
  // Footer
  footerDisclaimer: string;
  legalNotice: string;
  privacy: string;
  contact: string;
  mobileBanner: string;
  
  // FAQ Page
  faqTitle: string;
  faqSubtitle: string;
  faqMicroText: string;
  faqQ1: string;
  faqA1: string;
  faqQ2: string;
  faqA2: string;
  faqQ3: string;
  faqA3: string;
  faqQ4: string;
  faqA4: string;
  faqQ5: string;
  faqA5: string;
  faqQ6: string;
  faqA6: string;
  faqQ7: string;
  faqA7: string;
  faqQ8: string;
  faqA8: string;
  faqCta: string;
  faqCtaButton: string;
  
  // About Page
  aboutTitle: string;
  aboutSubtitle: string;
  aboutMicroText: string;
  aboutMissionTitle: string;
  aboutMissionText1: string;
  aboutMissionText2: string;
  aboutValuesTitle: string;
  aboutPrivacyTitle: string;
  aboutPrivacyText: string;
  aboutRandomnessTitle: string;
  aboutRandomnessText: string;
  aboutAccessibilityTitle: string;
  aboutAccessibilityText: string;
  aboutFreeTitle: string;
  aboutFreeText: string;
  aboutTrustedTitle: string;
  aboutCountries: string;
  aboutDrawsMonthly: string;
  aboutDataStored: string;
  aboutClientSide: string;
  aboutWhoUsesTitle: string;
  aboutCreators: string;
  aboutCreatorsDesc: string;
  aboutEducators: string;
  aboutEducatorsDesc: string;
  aboutBusinesses: string;
  aboutBusinessesDesc: string;
  aboutCta: string;
  aboutCtaButton: string;
  
  // Navigation
  navExploreTools: string;
  navHome: string;
  navRandomWheel: string;
  navWheelOfNames: string;
  navNamePicker: string;
  navGiveaway: string;
  navWeighted: string;
  navInstagram: string;
  navTeams: string;
  navGuide: string;
  navFaq: string;
  navAbout: string;
  
  // Instagram Giveaway Page
  igTitle: string;
  igSubtitle: string;
  igMicroText: string;
  igStepCopy: string;
  igStepPaste: string;
  igStepPick: string;
  igHowToCollect: string;
  igStep1Title: string;
  igStep1Desc: string;
  igStep2Title: string;
  igStep2Desc: string;
  igStep3Title: string;
  igStep3Desc: string;
  igWinnerCongrats: string;
  igWhyUse: string;
  igTransparent: string;
  igTransparentDesc: string;
  igUsernameFriendly: string;
  igUsernameFriendlyDesc: string;
  igMultiWinner: string;
  igMultiWinnerDesc: string;
  igBuildTrust: string;
  igBuildTrustDesc: string;
  igSeoTitle: string;
  igSeoText1: string;
  igSeoText2: string;
  
  // Random Team Selector Page
  teamTitle: string;
  teamSubtitle: string;
  teamMicroText: string;
  teamStepAdd: string;
  teamStepSpin: string;
  teamStepGet: string;
  teamScenarios: string;
  teamCaptains: string;
  teamCaptainsDesc: string;
  teamProjects: string;
  teamProjectsDesc: string;
  teamPresenters: string;
  teamPresentersDesc: string;
  teamTasks: string;
  teamTasksDesc: string;
  teamSelectionComplete: string;
  teamWhyRandom: string;
  teamEliminatesBias: string;
  teamEliminatesBiasDesc: string;
  teamQuickEasy: string;
  teamQuickEasyDesc: string;
  teamMixesUp: string;
  teamMixesUpDesc: string;
  teamSeoTitle: string;
  teamSeoText1: string;
  teamSeoText2: string;
  
  // How to Pick Winner Page
  howTitle: string;
  howSubtitle: string;
  howReadTime: string;
  howWhyMatters: string;
  howWhyMattersText1: string;
  howWhyMattersText2: string;
  howStepByStep: string;
  howStep1Title: string;
  howStep1Text: string;
  howStep1Tip: string;
  howStep2Title: string;
  howStep2Text: string;
  howStep2Tip: string;
  howStep3Title: string;
  howStep3Text: string;
  howStep3Tip: string;
  howStep4Title: string;
  howStep4Text: string;
  howBestPractices: string;
  howBestPractice1: string;
  howBestPractice2: string;
  howBestPractice3: string;
  howBestPractice4: string;
  howBestPractice5: string;
  howBestPractice6: string;
  howWhyOnline: string;
  howWhyOnlineText1: string;
  howWhyOnlineText2: string;
  howReady: string;
  howStartFree: string;
  howGiveawayPicker: string;
  
  // Common
  loading: string;

  // Homepage Island
  indexPageTitle: string;
  indexSpinsText: string;
  tapToSpin: string;
  indexEntriesTab: string;
  indexResultsTab: string;
  indexNoResults: string;
  indexClearResults: string;
  indexWhatIsTitle: string;
  indexWhatIsText: string;
  indexHowToTitle: string;
  indexHowToStep1Title: string;
  indexHowToStep1Text: string;
  indexHowToStep2Title: string;
  indexHowToStep2Text: string;
  indexHowToStep3Title: string;
  indexHowToStep3Text: string;
  indexWhyTitle: string;
  indexWhyFair: string;
  indexWhyFairText: string;
  indexWhyFree: string;
  indexWhyFreeText: string;
  indexWhyNoSignup: string;
  indexWhyNoSignupText: string;
  indexWhyPrivate: string;
  indexWhyPrivateText: string;
  indexOurTools: string;
  indexUseCaseGiveaway: string;
  indexUseCaseClassroom: string;
  indexUseCaseStandup: string;
  indexUseCaseParty: string;
  indexUseCaseDinner: string;
  indexUseCaseTodo: string;
  indexUseCasePresentation: string;

  // Value proposition cards (replaces static Astro HTML)
  indexValueTitle: string;
  indexValue1Title: string;
  indexValue1Text: string;
  indexValue2Title: string;
  indexValue2Text: string;
  indexValue3Title: string;
  indexValue3Text: string;
  indexAllToolsTitle: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    heroTitle: 'Random Draw',
    heroSubtitle: 'Pick a winner instantly with equal chances or custom probabilities.',
    heroCta: 'Fair or Custom Draw',
    fairDraw: 'Fair Random Draw',
    customDraw: 'Custom / Weighted Draw',
    microText: 'Free • No signup • Instant result',
    stepPaste: 'Paste names',
    stepSpin: 'Spin',
    stepWin: 'Winner!',
    
    // How it works
    howItWorksTitle: 'How does this random draw work?',
    howItWorksText: 'Enter your list of names, spin the wheel, and get a truly random result. You can use a fair draw or customize probabilities in advanced mode. No signup. No tricks. Instant result.',
    
    // Micro trust indicators
    trustIndicator1: '100% browser-based randomness',
    trustIndicator2: 'No data stored',
    trustIndicator3: 'Used worldwide for giveaways & draws',
    
    // Use cases
    useCasesTitle: 'What can you use this wheel for?',
    useCaseGiveaways: 'Giveaways & contests',
    useCaseGiveawaysDesc: 'Perfect for social media',
    useCaseStreaming: 'Streaming & live draws',
    useCaseStreamingDesc: 'Engage your audience',
    useCaseClassrooms: 'Classrooms & training',
    useCaseClassroomsDesc: 'Pick students randomly',
    useCaseTeams: 'Team decisions',
    useCaseTeamsDesc: 'Fair task assignment',
    useCaseWeighted: 'Weighted selection',
    useCaseWeightedDesc: 'Custom probabilities',
    
    // Advanced mode explainer
    advancedModeExplainer: 'Advanced mode allows you to adjust each participant\'s chance. Probabilities are automatically recalculated.',
    totalWeight: 'Total weight',
    totalProbability: 'Total probability',
    
    // SEO bottom
    seoBottomTitle: 'Free Random Wheel Picker Online',
    seoBottomText: 'Looking for a random wheel to pick a winner? Our free random picker lets you spin and get instant results. Perfect as a wheel of names for giveaways, classrooms, or any free random draw. Use our random wheel picker online without signup - it\'s the simplest way to pick a winner fairly.',
    
    drawModes: 'Draw Modes',
    simpleMode: 'Fair Draw',
    equalProbabilities: 'Equal probabilities',
    uniformRandom: 'Uniform random',
    simpleModeDesc: 'Ideal for giveaways, contests and fair drawings.',
    customMode: 'Custom Draw',
    adjustableProbabilities: 'Adjustable probabilities',
    advancedMode: 'Advanced mode',
    customModeDesc: 'Customize each participant\'s chances according to your criteria.',
    customWarning: '⚠️ In custom mode, probabilities are not equal.',
    or: 'or',
    
    participantList: 'Participant List',
    pastePseudos: 'Paste your names here, one per line...',
    participant: 'participant',
    participants: 'participants',
    clearAll: 'Clear all',
    adjustProbabilities: 'Adjust probabilities',
    addParticipantsLeft: 'Add participants on the left',
    addParticipantPlaceholder: 'Type a name and press Enter...',
    bulkAddPlaceholder: 'Paste your list here...\nOne name per line\nor separated by commas',
    weight: 'Weight',
    probability: 'Probability',
    adSpace: 'Ad space',
    actions: 'Actions',
    sortAZ: 'Sort A → Z',
    sortZA: 'Sort Z → A',
    shuffle: 'Shuffle',
    onePerLine: 'One per line',
    commaSeparated: 'Comma separated',
    removeDuplicates: 'Remove duplicates',
    largeList: 'Large list',
    preview: 'Preview',
    moreParticipants: 'more participants',
    
    drawTitle: 'Draw Title',
    drawTitleLabel: 'Choose your draw title',
    drawTitlePlaceholder: 'e.g., Instagram Giveaway, Team Selection...',
    optional: 'optional',
    
    numberOfWinners: 'Number of winners',
    maxWinners: 'Max',
    
    launchDraw: 'Spin the Wheel',
    drawing: 'Spinning...',
    addAtLeast2: 'Add at least 2 participants to spin the wheel',
    
    drawWinner: 'Winner',
    drawWinners: 'Winners',
    copy: 'Copy',
    copied: 'Copied!',
    relaunch: 'Spin Again',
    share: 'Share',
    copySuccess: 'Copied!',
    copySuccessDesc: 'Result copied to clipboard.',
    copyError: 'Error',
    copyErrorDesc: 'Unable to copy the result.',
    spinAgain: 'Spin Again',
    removeWinnerAndRespin: 'Remove Winner & Re-spin',
    removeWinnersAndRespin: 'Remove Winners & Re-spin',
    
    spinningText: 'Drawing in progress...',
    
    whyChoose: 'Why choose randompicker.com?',
    usedByCreators: 'Used by creators & organizers',
    usedByCreatorsDesc: 'Streamers, influencers and businesses trust our tool.',
    statisticalTool: 'Statistical simulation tool',
    statisticalToolDesc: 'Transparent and verifiable weighted draw algorithm.',
    noAccountRequired: 'No account required',
    noAccountRequiredDesc: 'Use the tool immediately, no signup or personal data.',
    worksEverywhere: 'Works on mobile & desktop',
    worksEverywhereDesc: 'Responsive interface optimized for all devices.',
    
    seoTitle: 'Free online random picker: how does it work?',
    fairDrawTitle: 'Fair random draw',
    fairDrawText1: 'Our free online random picker uses a certified random generation algorithm to guarantee fair results. Perfect for your giveaways, social media contests, or any selection requiring a reliable random picker.',
    fairDrawText2: 'Each participant has exactly the same chances of winning in simple mode. It\'s the ideal tool to pick a winner transparently and verifiably.',
    customDrawTitle: 'Custom & weighted draw',
    customDrawText1: 'Need a custom draw with different probabilities? Our advanced mode allows you to create a weighted draw where each participant can have adjusted chances according to your criteria.',
    customDrawText2: 'This unique feature is perfect for loyalty programs, engagement-based reward systems, or any scenario requiring transparent statistical weighting.',
    popularUseCases: 'Popular use cases',
    useCase1: 'Instagram & TikTok giveaways',
    useCase2: 'Twitch & YouTube draws',
    useCase3: 'Professional contests',
    useCase4: 'Random group selection',
    useCase5: 'Fair task assignment',
    useCase6: 'Private lotteries & raffles',
    
    footerDisclaimer: 'This website is a simulation tool. Users are responsible for how results are used or shared. Draws are generated locally and no data is collected or stored.',
    legalNotice: 'Legal notice',
    privacy: 'Privacy',
    contact: 'Contact',
    mobileBanner: 'Mobile banner',
    
    // FAQ Page
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about our random picker tool',
    faqMicroText: 'Fairness • Privacy • Transparency',
    faqQ1: 'Is this random picker truly fair and unbiased?',
    faqA1: 'Yes, absolutely. Our random picker uses the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure random numbers. This is the same technology used by banks and security applications. Every participant has exactly equal chances in fair mode - no manipulation is possible.',
    faqQ2: 'How does the randomness algorithm work?',
    faqA2: 'We use your browser\'s built-in cryptographic random number generator (CSPRNG). Unlike simple Math.random(), this provides true randomness based on hardware entropy sources. The algorithm is deterministic once seeded, ensuring consistent and verifiable results. All calculations happen locally - nothing is sent to servers.',
    faqQ3: 'Is my data safe? What do you store?',
    faqA3: 'We store absolutely nothing on our servers. Your participant list is saved only in your browser\'s local storage for convenience - you can clear it anytime. No cookies track you, no analytics collect personal data, and no information leaves your device. The draw runs 100% client-side.',
    faqQ4: 'Can I use this for Instagram or YouTube giveaways?',
    faqA4: 'Yes! Our giveaway picker is perfect for social media contests. You can paste comments, usernames, or any list of participants. The visual wheel spin adds transparency - show your audience the live draw. Many influencers and streamers use our tool for fair, public winner selection.',
    faqQ5: 'What\'s the difference between Fair and Custom draw modes?',
    faqA5: 'Fair mode gives everyone equal chances - perfect for giveaways where fairness is essential. Custom mode lets you assign different weights/probabilities to participants - useful for loyalty programs, engagement rewards, or scenarios where some entries should have better odds. Both modes show transparent probability calculations.',
    faqQ6: 'Can I pick multiple winners at once?',
    faqA6: 'Yes! Set the number of winners before spinning. For multiple winners, we use our casino roulette visualization with numbered balls - each landing in a unique slot. Winners are selected without replacement, ensuring the same person can\'t win twice in a single draw.',
    faqQ7: 'Does it work on mobile devices?',
    faqA7: 'Absolutely. Our tool is fully responsive and optimized for all devices - phones, tablets, and desktops. The wheel animations are smooth, touch-friendly, and work identically across all platforms. No app download required - just open the website.',
    faqQ8: 'Is this free? Are there hidden costs?',
    faqA8: '100% free with no hidden costs, no premium tiers, no signup required. We\'re supported by non-intrusive ads that never interrupt your draws. Use it unlimited times with unlimited participants.',
    faqCta: 'Ready to pick a winner?',
    faqCtaButton: 'Start Your Free Draw',
    
    // About Page
    aboutTitle: 'About RealWheelPicker',
    aboutSubtitle: 'The most trusted random picker for fair, transparent draws worldwide',
    aboutMicroText: 'Free • Privacy-First • Used Globally',
    aboutMissionTitle: 'Our Mission',
    aboutMissionText1: 'We believe everyone deserves access to fair, unbiased random selection. Whether you\'re a teacher picking students, a streamer running giveaways, or a team making decisions - randomness should be transparent, accessible, and free.',
    aboutMissionText2: 'RealWheelPicker was created to be the gold standard in online random draws: no accounts, no tracking, no manipulation - just pure, cryptographically secure randomness.',
    aboutValuesTitle: 'Our Core Values',
    aboutPrivacyTitle: 'Complete Privacy',
    aboutPrivacyText: 'Zero data collection. No cookies. No tracking. Your participant lists never leave your browser. We can\'t see who\'s in your draws - and that\'s by design.',
    aboutRandomnessTitle: 'True Randomness',
    aboutRandomnessText: 'We use the Web Crypto API for cryptographically secure random numbers - the same standard used by financial institutions. No pseudo-random shortcuts.',
    aboutAccessibilityTitle: 'Global Accessibility',
    aboutAccessibilityText: 'Available in multiple languages, works on any device, no registration required. From classrooms in Tokyo to streamers in São Paulo - everyone gets the same fair tool.',
    aboutFreeTitle: 'Forever Free',
    aboutFreeText: 'No premium tiers, no feature locks, no "free trial" gimmicks. We\'re supported by non-intrusive ads that never interrupt your experience.',
    aboutTrustedTitle: 'Trusted Worldwide',
    aboutCountries: 'Countries',
    aboutDrawsMonthly: 'Draws Monthly',
    aboutDataStored: 'Data Stored',
    aboutClientSide: 'Client-Side',
    aboutWhoUsesTitle: 'Who Uses RealWheelPicker?',
    aboutCreators: 'Content Creators',
    aboutCreatorsDesc: 'Streamers, YouTubers, and influencers running transparent giveaways',
    aboutEducators: 'Educators',
    aboutEducatorsDesc: 'Teachers and trainers picking students fairly for activities',
    aboutBusinesses: 'Businesses',
    aboutBusinessesDesc: 'Teams making unbiased decisions and running internal contests',
    aboutCta: 'Ready to run a fair draw?',
    aboutCtaButton: 'Start Your Free Draw',
    
    // Navigation
    navExploreTools: 'Explore More Tools',
    navHome: 'Home',
    navRandomWheel: 'Random Wheel',
    navWheelOfNames: 'Wheel of Names',
    navNamePicker: 'Name Picker',
    navGiveaway: 'Giveaway',
    navWeighted: 'Weighted',
    navInstagram: 'Instagram',
    navTeams: 'Teams',
    navGuide: 'Guide',
    navFaq: 'FAQ',
    navAbout: 'About Us',
    
    // Instagram Giveaway Page
    igTitle: 'Instagram Giveaway Picker',
    igSubtitle: 'Pick giveaway winners from Instagram comments fairly. Show your followers the transparent spin.',
    igMicroText: 'Free • No signup • Trusted by influencers',
    igStepCopy: 'Copy comments',
    igStepPaste: 'Paste usernames',
    igStepPick: 'Pick winner!',
    igHowToCollect: 'How to collect Instagram usernames',
    igStep1Title: 'Open your post',
    igStep1Desc: 'Go to the giveaway post on Instagram',
    igStep2Title: 'Copy usernames',
    igStep2Desc: 'Select and copy @usernames from comments',
    igStep3Title: 'Paste below',
    igStep3Desc: 'We\'ll clean and deduplicate automatically',
    igWinnerCongrats: '🎉 Congratulations to the winner! Ready for another round? Perfect for backup winners.',
    igWhyUse: 'Why use RealWheelPicker for Instagram giveaways?',
    igTransparent: '100% Transparent',
    igTransparentDesc: 'Show followers the live spin',
    igUsernameFriendly: 'Username Friendly',
    igUsernameFriendlyDesc: 'Handles @mentions automatically',
    igMultiWinner: 'Multi-Winner',
    igMultiWinnerDesc: 'Pick 1, 3, or 10+ winners',
    igBuildTrust: 'Build Trust',
    igBuildTrustDesc: 'Prove your draws are fair',
    igSeoTitle: 'Free Instagram Giveaway Winner Picker',
    igSeoText1: 'Running an Instagram giveaway and need to pick a winner fairly? Our free Instagram giveaway picker makes selecting random winners transparent and trustworthy. Simply copy usernames from your post\'s comments, paste them here, and spin the wheel. Your followers can watch the live selection - building trust and engagement for your brand.',
    igSeoText2: 'Perfect for Instagram contest winner selection, influencer giveaways, brand promotions, and community rewards. No account needed, no data stored - just fair, instant results. Works for all social platforms: Instagram, TikTok, Twitter, YouTube, and more.',
    
    // Random Team Selector Page
    teamTitle: 'Random Team Selector',
    teamSubtitle: 'Build random teams, assign tasks fairly, or pick group leaders. Perfect for classrooms, offices, and games.',
    teamMicroText: 'Free • Fair selection • Works offline',
    teamStepAdd: 'Add names',
    teamStepSpin: 'Spin',
    teamStepGet: 'Get team!',
    teamScenarios: 'Common team selection scenarios',
    teamCaptains: 'Pick Team Captains',
    teamCaptainsDesc: 'Fair captain selection',
    teamProjects: 'Assign Project Groups',
    teamProjectsDesc: 'Random team formation',
    teamPresenters: 'Choose Presenters',
    teamPresentersDesc: 'Who goes first?',
    teamTasks: 'Delegate Tasks',
    teamTasksDesc: 'Unbiased assignment',
    teamSelectionComplete: '✅ Selection complete! Need to pick more team members? Remove and spin again.',
    teamWhyRandom: 'Why random selection works best',
    teamEliminatesBias: 'Eliminates Bias',
    teamEliminatesBiasDesc: 'No favoritism, no complaints',
    teamQuickEasy: 'Quick & Easy',
    teamQuickEasyDesc: 'Done in seconds, not minutes',
    teamMixesUp: 'Mixes Things Up',
    teamMixesUpDesc: 'New combinations every time',
    teamSeoTitle: 'Free Random Team Generator & Selector',
    teamSeoText1: 'Need to randomly select team members, pick group leaders, or assign tasks fairly? Our free random team selector makes group formation quick and unbiased. Teachers use it for classroom activities, managers for project assignments, and coaches for team drafts.',
    teamSeoText2: 'Simply add names, set how many to pick, and spin. The random team picker uses cryptographically secure selection to guarantee fairness. Everyone sees the same transparent process - no accusations of favoritism. Perfect as a random group generator, team picker wheel, or fair assignment tool.',
    
    // How to Pick Winner Page
    howTitle: 'How to Pick a Random Winner Online',
    howSubtitle: 'Complete guide to running fair, transparent giveaways and random draws',
    howReadTime: '5-minute read • Step-by-step tutorial',
    howWhyMatters: 'Why Random Selection Matters',
    howWhyMattersText1: 'Running a giveaway or contest? The way you pick winners directly impacts your credibility. Manual selection looks biased, friends-only draws destroy trust, and complicated methods confuse your audience.',
    howWhyMattersText2: 'A truly random, visually transparent picker solves all these problems. Here\'s exactly how to do it right.',
    howStepByStep: 'Step-by-Step: Pick a Winner in 60 Seconds',
    howStep1Title: 'Collect Your Participants',
    howStep1Text: 'Gather usernames, emails, or names. For Instagram giveaways, copy comments directly. For email lists, export from your spreadsheet. Our tool accepts one name per line or comma-separated.',
    howStep1Tip: 'Use our "Remove duplicates" feature to ensure each participant appears only once.',
    howStep2Title: 'Paste Names & Configure',
    howStep2Text: 'Paste your list into the participant field. Choose "Fair Draw" for equal chances or "Custom Draw" to weight certain entries. Set how many winners you need (1, 3, 10, or more).',
    howStep2Tip: 'Give your draw a title like "Summer Giveaway 2024" for cleaner sharing and screenshots.',
    howStep3Title: 'Spin & Get Your Winner',
    howStep3Text: 'Click "Spin the Wheel" and watch the animated selection. The wheel uses cryptographically secure random numbers - impossible to predict or manipulate. For multiple winners, numbered balls land in unique slots.',
    howStep3Tip: 'For live streams, screen-share the spin to prove transparency to your audience.',
    howStep4Title: 'Share & Document',
    howStep4Text: 'Copy the result or use the Share button. Screenshot the winner display for your records. Need a backup winner? Use "Remove Winner & Re-spin" to draw again from remaining participants.',
    howBestPractices: 'Best Practices for Fair Giveaways',
    howBestPractice1: 'Always announce the selection method before the draw',
    howBestPractice2: 'Record or screenshot the spin for proof',
    howBestPractice3: 'Remove duplicate entries before drawing',
    howBestPractice4: 'Set clear eligibility rules upfront',
    howBestPractice5: 'Have backup winners ready for non-responders',
    howBestPractice6: 'Announce winners publicly when possible',
    howWhyOnline: 'Why Use an Online Random Winner Picker?',
    howWhyOnlineText1: 'Manual selection is time-consuming and appears biased. Spreadsheet formulas are confusing and lack visual appeal. A dedicated random picker provides transparency your audience can see and trust.',
    howWhyOnlineText2: 'RealWheelPicker runs entirely in your browser - no data goes to servers, no account required, no tracking. The cryptographically secure algorithm guarantees true randomness that can\'t be predicted or manipulated. Whether you need a random name picker for classrooms, a giveaway picker for Instagram, or a wheel of names for team activities, you get fair results instantly.',
    howReady: 'Ready to pick your winner?',
    howStartFree: 'Start Free Draw',
    howGiveawayPicker: 'Giveaway Picker',
    
    // SEO Pages
    seoPages: {
      'random-wheel': {
        h1: 'Random Wheel Picker – Spin the Wheel Online',
        subtitle: 'Spin a random wheel to pick a winner instantly. Free, fast and fair.',
      },
      'wheel-of-names': {
        h1: 'Wheel of Names – Pick a Random Name Instantly',
        subtitle: 'Enter names, spin the wheel, and let fate decide. Fair and transparent.',
      },
      'random-name-picker': {
        h1: 'Random Name Picker – Select Names Fairly',
        subtitle: 'Paste your list and pick a random name in seconds. Zero bias guaranteed.',
      },
      'giveaway-picker': {
        h1: 'Giveaway Picker – Pick Contest Winners Fairly',
        subtitle: 'Run transparent giveaways and select winners your audience will trust.',
      },
      'weighted-random-picker': {
        h1: 'Weighted Random Picker – Custom Probability Draws',
        subtitle: 'Assign different chances to each participant for advanced selection scenarios.',
      },
    },
    
    // Common
    loading: 'Loading...',

    // Homepage Island
    indexPageTitle: 'Spin the Wheel — Free Random Picker',
    indexSpinsText: 'spins completed',
    tapToSpin: 'Click to spin',
    indexEntriesTab: 'Entries',
    indexResultsTab: 'Results',
    indexNoResults: 'Spin the wheel to see results here',
    indexClearResults: 'Clear results',
    indexWhatIsTitle: 'When to use the spinning wheel?',
    indexWhatIsText: 'From Instagram giveaways to classroom activities — the spinning wheel is the fairest way to make a random decision.',
    indexHowToTitle: 'How to use the wheel',
    indexHowToStep1Title: 'Add your entries',
    indexHowToStep1Text: 'Type names one by one, paste a list, or use one of our pre-made templates.',
    indexHowToStep2Title: 'Click Spin',
    indexHowToStep2Text: 'Hit the "Spin the Wheel" button and watch the colorful wheel rotate with smooth animation.',
    indexHowToStep3Title: 'Get your result',
    indexHowToStep3Text: 'The wheel lands on a random winner. Copy the result, share it, or spin again.',
    indexWhyTitle: 'Why use our random wheel?',
    indexWhyFair: '100% Fair',
    indexWhyFairText: 'Web Crypto API — same tech as online banking.',
    indexWhyFree: 'Completely Free',
    indexWhyFreeText: 'No premium tiers, no fees, no limits on spins.',
    indexWhyNoSignup: 'No Signup',
    indexWhyNoSignupText: 'Start instantly — no account, no email.',
    indexWhyPrivate: 'Privacy First',
    indexWhyPrivateText: 'Everything runs in your browser. Zero data sent.',
    indexOurTools: 'Our Tools',
    indexUseCaseGiveaway: '🎁 Giveaways & contests — Pick winners from Instagram, TikTok, or Discord comments fairly and transparently. Show your audience the live spin.',
    indexUseCaseClassroom: '🎓 Classrooms & training — Select students randomly for questions, presentations, or team assignments. Fair for everyone.',
    indexUseCaseStandup: '🏢 Standup meetings — Randomize who speaks first in daily standups. Keeps meetings fresh and fair.',
    indexUseCaseParty: '🎉 Party games — Truth or Dare, Never Have I Ever, random challenges. Add any options and spin.',
    indexUseCaseDinner: '🤔 Dinner decisions — Can\'t decide where to eat? Add restaurant names and let the wheel decide.',
    indexUseCaseTodo: '📋 Task delegation — Assign chores, tasks, or project responsibilities randomly. No arguments.',
    indexUseCasePresentation: '🎮 Presentations — Call on students, pick speakers, or decide the order of presentations.',
    indexValueTitle: 'The Fairest Way to Pick a Random Winner',
    indexValue1Title: 'Cryptographically Random',
    indexValue1Text: 'Every spin uses crypto.getRandomValues() — the same security standard behind banking apps. Not pseudo-random. Genuinely unpredictable.',
    indexValue2Title: '100% Private',
    indexValue2Text: 'Everything runs in your browser. No data is sent to any server. Your list stays on your device and disappears when you close the tab.',
    indexValue3Title: 'Instant & Free',
    indexValue3Text: 'No account needed. No download. Works on any device — phones, tablets, laptops, and smartboards.',
    indexAllToolsTitle: 'All Free Tools — No Signup Required',
  },

  es: {
    heroTitle: 'Sorteo Aleatorio',
    heroSubtitle: 'Elige un ganador al instante con probabilidades iguales o personalizadas.',
    heroCta: 'Sorteo Justo o Personalizado',
    fairDraw: 'Sorteo Aleatorio Justo',
    customDraw: 'Sorteo Personalizado',
    microText: 'Gratis • Sin registro • Resultado instantáneo',
    stepPaste: 'Pega nombres',
    stepSpin: 'Girar',
    stepWin: '¡Ganador!',
    
    howItWorksTitle: '¿Cómo funciona este sorteo aleatorio?',
    howItWorksText: 'Ingresa tu lista de nombres, gira la rueda y obtén un resultado verdaderamente aleatorio. Puedes usar un sorteo justo o personalizar las probabilidades en el modo avanzado. Sin registro. Sin trucos. Resultado instantáneo.',
    
    trustIndicator1: '100% aleatorio en el navegador',
    trustIndicator2: 'Sin almacenamiento de datos',
    trustIndicator3: 'Usado mundialmente para sorteos',
    
    useCasesTitle: '¿Para qué puedes usar esta rueda?',
    useCaseGiveaways: 'Sorteos y concursos',
    useCaseGiveawaysDesc: 'Perfecto para redes sociales',
    useCaseStreaming: 'Streaming y en vivo',
    useCaseStreamingDesc: 'Involucra a tu audiencia',
    useCaseClassrooms: 'Aulas y formación',
    useCaseClassroomsDesc: 'Elige estudiantes al azar',
    useCaseTeams: 'Decisiones de equipo',
    useCaseTeamsDesc: 'Asignación justa de tareas',
    useCaseWeighted: 'Selección ponderada',
    useCaseWeightedDesc: 'Probabilidades personalizadas',
    
    advancedModeExplainer: 'El modo avanzado te permite ajustar las probabilidades de cada participante. Las probabilidades se recalculan automáticamente.',
    totalWeight: 'Peso total',
    totalProbability: 'Probabilidad total',
    
    seoBottomTitle: 'Rueda Aleatoria Gratis Online',
    seoBottomText: '¿Buscas una rueda aleatoria para elegir un ganador? Nuestro selector aleatorio gratuito te permite girar y obtener resultados instantáneos. Perfecto como rueda de nombres para sorteos, aulas o cualquier sorteo aleatorio gratuito. Usa nuestra rueda aleatoria online sin registro.',
    
    drawModes: 'Modos de Sorteo',
    simpleMode: 'Sorteo Justo',
    equalProbabilities: 'Probabilidades iguales',
    uniformRandom: 'Aleatorio uniforme',
    simpleModeDesc: 'Ideal para sorteos, concursos y selecciones justas.',
    customMode: 'Sorteo Personalizado',
    adjustableProbabilities: 'Probabilidades ajustables',
    advancedMode: 'Modo avanzado',
    customModeDesc: 'Personaliza las probabilidades de cada participante según tus criterios.',
    customWarning: '⚠️ En modo personalizado, las probabilidades no son iguales.',
    or: 'o',
    
    participantList: 'Lista de Participantes',
    pastePseudos: 'Pega los nombres aquí, uno por línea...',
    participant: 'participante',
    participants: 'participantes',
    clearAll: 'Borrar todo',
    adjustProbabilities: 'Ajustar probabilidades',
    addParticipantsLeft: 'Añade participantes a la izquierda',
    addParticipantPlaceholder: 'Escribe un nombre y presiona Enter...',
    bulkAddPlaceholder: 'Pega tu lista aquí...\nUn nombre por línea\no separados por comas',
    weight: 'Peso',
    probability: 'Probabilidad',
    adSpace: 'Espacio publicitario',
    actions: 'Acciones',
    sortAZ: 'Ordenar A → Z',
    sortZA: 'Ordenar Z → A',
    shuffle: 'Mezclar',
    onePerLine: 'Uno por línea',
    commaSeparated: 'Separados por comas',
    removeDuplicates: 'Eliminar duplicados',
    largeList: 'Lista grande',
    preview: 'Vista previa',
    moreParticipants: 'más participantes',
    
    drawTitle: 'Título del Sorteo',
    drawTitleLabel: 'Elige el título de tu sorteo',
    drawTitlePlaceholder: 'ej., Sorteo de Instagram, Selección de Equipo...',
    optional: 'opcional',
    
    numberOfWinners: 'Número de ganadores',
    maxWinners: 'Máx',
    
    launchDraw: 'Girar la Rueda',
    drawing: 'Girando...',
    addAtLeast2: 'Añade al menos 2 participantes para girar la rueda',
    
    drawWinner: 'Ganador',
    drawWinners: 'Ganadores',
    copy: 'Copiar',
    copied: '¡Copiado!',
    relaunch: 'Girar de Nuevo',
    share: 'Compartir',
    copySuccess: '¡Copiado!',
    copySuccessDesc: 'Resultado copiado al portapapeles.',
    copyError: 'Error',
    copyErrorDesc: 'No se pudo copiar el resultado.',
    spinAgain: 'Girar de Nuevo',
    removeWinnerAndRespin: 'Eliminar Ganador y Volver a Girar',
    removeWinnersAndRespin: 'Eliminar Ganadores y Volver a Girar',
    
    spinningText: 'Sorteo en progreso...',
    
    whyChoose: '¿Por qué elegir randompicker.com?',
    usedByCreators: 'Usado por creadores y organizadores',
    usedByCreatorsDesc: 'Streamers, influencers y empresas confían en nuestra herramienta.',
    statisticalTool: 'Herramienta de simulación estadística',
    statisticalToolDesc: 'Algoritmo de sorteo ponderado transparente y verificable.',
    noAccountRequired: 'Sin cuenta requerida',
    noAccountRequiredDesc: 'Usa la herramienta inmediatamente, sin registro ni datos personales.',
    worksEverywhere: 'Funciona en móvil y PC',
    worksEverywhereDesc: 'Interfaz responsive optimizada para todos los dispositivos.',
    
    seoTitle: 'Selector aleatorio gratis online: ¿cómo funciona?',
    fairDrawTitle: 'Sorteo aleatorio justo',
    fairDrawText1: 'Nuestro selector aleatorio gratis online utiliza un algoritmo de generación aleatoria certificado para garantizar resultados justos. Perfecto para tus sorteos, concursos en redes sociales o cualquier selección que requiera un selector aleatorio fiable.',
    fairDrawText2: 'Cada participante tiene exactamente las mismas probabilidades de ganar en el modo simple. Es la herramienta ideal para elegir un ganador de forma transparente y verificable.',
    customDrawTitle: 'Sorteo personalizado y ponderado',
    customDrawText1: '¿Necesitas un sorteo personalizado con diferentes probabilidades? Nuestro modo avanzado te permite crear un sorteo ponderado donde cada participante puede tener probabilidades ajustadas según tus criterios.',
    customDrawText2: 'Esta función única es perfecta para programas de fidelidad, sistemas de recompensas basados en engagement, o cualquier escenario que requiera una ponderación estadística transparente.',
    popularUseCases: 'Casos de uso populares',
    useCase1: 'Sorteos de Instagram y TikTok',
    useCase2: 'Sorteos de Twitch y YouTube',
    useCase3: 'Concursos profesionales',
    useCase4: 'Selección aleatoria de grupos',
    useCase5: 'Asignación justa de tareas',
    useCase6: 'Loterías y rifas privadas',
    
    footerDisclaimer: 'Este sitio web es una herramienta de simulación. Los usuarios son responsables del uso y compartición de los resultados. Los sorteos se generan localmente y no se recopilan ni almacenan datos.',
    legalNotice: 'Aviso legal',
    privacy: 'Privacidad',
    contact: 'Contacto',
    mobileBanner: 'Banner móvil',
    
    // FAQ Page
    faqTitle: 'Preguntas Frecuentes',
    faqSubtitle: 'Todo lo que necesitas saber sobre nuestro selector aleatorio',
    faqMicroText: 'Equidad • Privacidad • Transparencia',
    faqQ1: '¿Este selector aleatorio es realmente justo e imparcial?',
    faqA1: 'Sí, absolutamente. Nuestro selector aleatorio utiliza la API Web Crypto (crypto.getRandomValues), que proporciona números aleatorios criptográficamente seguros. Es la misma tecnología utilizada por bancos y aplicaciones de seguridad. Cada participante tiene exactamente las mismas probabilidades en modo justo.',
    faqQ2: '¿Cómo funciona el algoritmo de aleatoriedad?',
    faqA2: 'Utilizamos el generador de números aleatorios criptográficos (CSPRNG) integrado en tu navegador. A diferencia del simple Math.random(), esto proporciona verdadera aleatoriedad basada en fuentes de entropía de hardware. Todos los cálculos se realizan localmente.',
    faqQ3: '¿Mis datos están seguros? ¿Qué almacenan?',
    faqA3: 'No almacenamos absolutamente nada en nuestros servidores. Tu lista de participantes se guarda solo en el almacenamiento local de tu navegador por conveniencia. Sin cookies de rastreo, sin recopilación de datos personales.',
    faqQ4: '¿Puedo usar esto para sorteos de Instagram o YouTube?',
    faqA4: '¡Sí! Nuestro selector de sorteos es perfecto para concursos en redes sociales. Puedes pegar comentarios, nombres de usuario o cualquier lista de participantes. La ruleta visual añade transparencia.',
    faqQ5: '¿Cuál es la diferencia entre los modos Justo y Personalizado?',
    faqA5: 'El modo Justo da a todos las mismas probabilidades. El modo Personalizado te permite asignar diferentes pesos/probabilidades a los participantes, útil para programas de fidelidad o recompensas.',
    faqQ6: '¿Puedo elegir múltiples ganadores a la vez?',
    faqA6: '¡Sí! Establece el número de ganadores antes de girar. Para múltiples ganadores, usamos nuestra visualización de ruleta de casino con bolas numeradas.',
    faqQ7: '¿Funciona en dispositivos móviles?',
    faqA7: 'Absolutamente. Nuestra herramienta es totalmente responsiva y optimizada para todos los dispositivos. Las animaciones de la rueda son suaves y funcionan en todas las plataformas.',
    faqQ8: '¿Es gratis? ¿Hay costos ocultos?',
    faqA8: '100% gratis sin costos ocultos, sin niveles premium, sin registro requerido. Estamos respaldados por anuncios no intrusivos.',
    faqCta: '¿Listo para elegir un ganador?',
    faqCtaButton: 'Comenzar Tu Sorteo Gratis',
    
    // About Page
    aboutTitle: 'Sobre RealWheelPicker',
    aboutSubtitle: 'El selector aleatorio más confiable para sorteos justos y transparentes en todo el mundo',
    aboutMicroText: 'Gratis • Privacidad Primero • Usado Globalmente',
    aboutMissionTitle: 'Nuestra Misión',
    aboutMissionText1: 'Creemos que todos merecen acceso a una selección aleatoria justa e imparcial. Ya seas profesor, streamer o un equipo tomando decisiones, la aleatoriedad debe ser transparente, accesible y gratuita.',
    aboutMissionText2: 'RealWheelPicker fue creado para ser el estándar de oro en sorteos aleatorios en línea: sin cuentas, sin seguimiento, sin manipulación.',
    aboutValuesTitle: 'Nuestros Valores',
    aboutPrivacyTitle: 'Privacidad Completa',
    aboutPrivacyText: 'Cero recopilación de datos. Sin cookies. Sin seguimiento. Tus listas nunca salen de tu navegador.',
    aboutRandomnessTitle: 'Verdadera Aleatoriedad',
    aboutRandomnessText: 'Usamos la API Web Crypto para números aleatorios criptográficamente seguros.',
    aboutAccessibilityTitle: 'Accesibilidad Global',
    aboutAccessibilityText: 'Disponible en múltiples idiomas, funciona en cualquier dispositivo, sin registro requerido.',
    aboutFreeTitle: 'Siempre Gratis',
    aboutFreeText: 'Sin niveles premium, sin bloqueos de funciones, sin trucos de "prueba gratuita".',
    aboutTrustedTitle: 'Confianza Mundial',
    aboutCountries: 'Países',
    aboutDrawsMonthly: 'Sorteos Mensuales',
    aboutDataStored: 'Datos Almacenados',
    aboutClientSide: 'Del Lado del Cliente',
    aboutWhoUsesTitle: '¿Quién Usa RealWheelPicker?',
    aboutCreators: 'Creadores de Contenido',
    aboutCreatorsDesc: 'Streamers, YouTubers e influencers que hacen sorteos transparentes',
    aboutEducators: 'Educadores',
    aboutEducatorsDesc: 'Profesores que eligen estudiantes de manera justa',
    aboutBusinesses: 'Empresas',
    aboutBusinessesDesc: 'Equipos que toman decisiones imparciales',
    aboutCta: '¿Listo para un sorteo justo?',
    aboutCtaButton: 'Comenzar Tu Sorteo Gratis',
    
    // Navigation
    navExploreTools: 'Explorar Más Herramientas',
    navHome: 'Inicio',
    navRandomWheel: 'Rueda Aleatoria',
    navWheelOfNames: 'Rueda de Nombres',
    navNamePicker: 'Selector de Nombres',
    navGiveaway: 'Sorteo',
    navWeighted: 'Ponderado',
    navInstagram: 'Instagram',
    navTeams: 'Equipos',
    navGuide: 'Guía',
    navFaq: 'FAQ',
    navAbout: 'Sobre Nosotros',
    
    // Instagram Giveaway Page
    igTitle: 'Selector de Sorteos de Instagram',
    igSubtitle: 'Elige ganadores de sorteos de los comentarios de Instagram de forma justa. Muestra a tus seguidores el giro transparente.',
    igMicroText: 'Gratis • Sin registro • Confiable por influencers',
    igStepCopy: 'Copiar comentarios',
    igStepPaste: 'Pegar usuarios',
    igStepPick: '¡Elegir ganador!',
    igHowToCollect: 'Cómo recopilar nombres de usuario de Instagram',
    igStep1Title: 'Abre tu publicación',
    igStep1Desc: 'Ve a la publicación del sorteo en Instagram',
    igStep2Title: 'Copia los usuarios',
    igStep2Desc: 'Selecciona y copia @usuarios de los comentarios',
    igStep3Title: 'Pega aquí',
    igStep3Desc: 'Limpiaremos y eliminaremos duplicados automáticamente',
    igWinnerCongrats: '🎉 ¡Felicidades al ganador! ¿Listo para otra ronda? Perfecto para ganadores de respaldo.',
    igWhyUse: '¿Por qué usar RealWheelPicker para sorteos de Instagram?',
    igTransparent: '100% Transparente',
    igTransparentDesc: 'Muestra el giro en vivo',
    igUsernameFriendly: 'Compatible con usuarios',
    igUsernameFriendlyDesc: 'Maneja @menciones automáticamente',
    igMultiWinner: 'Múltiples ganadores',
    igMultiWinnerDesc: 'Elige 1, 3 o más de 10 ganadores',
    igBuildTrust: 'Genera confianza',
    igBuildTrustDesc: 'Demuestra que tus sorteos son justos',
    igSeoTitle: 'Selector de Ganadores de Sorteos de Instagram Gratis',
    igSeoText1: '¿Organizas un sorteo en Instagram y necesitas elegir un ganador de forma justa? Nuestro selector de sorteos de Instagram gratuito hace que la selección de ganadores aleatorios sea transparente y confiable.',
    igSeoText2: 'Perfecto para selección de ganadores de concursos de Instagram, sorteos de influencers, promociones de marca y recompensas comunitarias. Sin cuenta requerida, sin datos almacenados.',
    
    // Random Team Selector Page
    teamTitle: 'Selector de Equipos Aleatorio',
    teamSubtitle: 'Crea equipos aleatorios, asigna tareas de forma justa o elige líderes de grupo. Perfecto para aulas, oficinas y juegos.',
    teamMicroText: 'Gratis • Selección justa • Funciona sin conexión',
    teamStepAdd: 'Añadir nombres',
    teamStepSpin: 'Girar',
    teamStepGet: '¡Obtén equipo!',
    teamScenarios: 'Escenarios comunes de selección de equipos',
    teamCaptains: 'Elegir Capitanes',
    teamCaptainsDesc: 'Selección justa de capitán',
    teamProjects: 'Asignar Grupos de Proyecto',
    teamProjectsDesc: 'Formación aleatoria de equipos',
    teamPresenters: 'Elegir Presentadores',
    teamPresentersDesc: '¿Quién va primero?',
    teamTasks: 'Delegar Tareas',
    teamTasksDesc: 'Asignación imparcial',
    teamSelectionComplete: '✅ ¡Selección completa! ¿Necesitas elegir más miembros? Elimina y vuelve a girar.',
    teamWhyRandom: 'Por qué la selección aleatoria funciona mejor',
    teamEliminatesBias: 'Elimina sesgos',
    teamEliminatesBiasDesc: 'Sin favoritismos, sin quejas',
    teamQuickEasy: 'Rápido y fácil',
    teamQuickEasyDesc: 'Listo en segundos',
    teamMixesUp: 'Mezcla las cosas',
    teamMixesUpDesc: 'Nuevas combinaciones cada vez',
    teamSeoTitle: 'Generador y Selector de Equipos Aleatorios Gratis',
    teamSeoText1: '¿Necesitas seleccionar miembros del equipo al azar, elegir líderes de grupo o asignar tareas de forma justa? Nuestro selector de equipos aleatorio gratuito hace que la formación de grupos sea rápida e imparcial.',
    teamSeoText2: 'Simplemente añade nombres, establece cuántos elegir y gira. El selector usa generación aleatoria criptográficamente segura para garantizar la equidad.',
    
    // How to Pick Winner Page
    howTitle: 'Cómo Elegir un Ganador Aleatorio en Línea',
    howSubtitle: 'Guía completa para realizar sorteos justos y transparentes',
    howReadTime: 'Lectura de 5 minutos • Tutorial paso a paso',
    howWhyMatters: 'Por qué importa la selección aleatoria',
    howWhyMattersText1: '¿Organizas un sorteo o concurso? La forma en que eliges a los ganadores afecta directamente tu credibilidad.',
    howWhyMattersText2: 'Un selector verdaderamente aleatorio y visualmente transparente resuelve todos estos problemas.',
    howStepByStep: 'Paso a paso: Elige un ganador en 60 segundos',
    howStep1Title: 'Recopila tus participantes',
    howStep1Text: 'Reúne nombres de usuario, correos o nombres. Para sorteos de Instagram, copia los comentarios directamente.',
    howStep1Tip: 'Usa nuestra función "Eliminar duplicados" para asegurar que cada participante aparezca solo una vez.',
    howStep2Title: 'Pega nombres y configura',
    howStep2Text: 'Pega tu lista en el campo de participantes. Elige "Sorteo Justo" para probabilidades iguales o "Sorteo Personalizado" para ponderar.',
    howStep2Tip: 'Dale un título a tu sorteo como "Sorteo de Verano 2024" para capturas más limpias.',
    howStep3Title: 'Gira y obtén tu ganador',
    howStep3Text: 'Haz clic en "Girar la Rueda" y mira la selección animada. La rueda usa números aleatorios criptográficamente seguros.',
    howStep3Tip: 'Para transmisiones en vivo, comparte la pantalla del giro para demostrar transparencia.',
    howStep4Title: 'Comparte y documenta',
    howStep4Text: 'Copia el resultado o usa el botón Compartir. Haz una captura del ganador para tus registros.',
    howBestPractices: 'Mejores prácticas para sorteos justos',
    howBestPractice1: 'Siempre anuncia el método de selección antes del sorteo',
    howBestPractice2: 'Graba o captura el giro como prueba',
    howBestPractice3: 'Elimina entradas duplicadas antes de sortear',
    howBestPractice4: 'Establece reglas claras de elegibilidad',
    howBestPractice5: 'Ten ganadores de respaldo listos',
    howBestPractice6: 'Anuncia los ganadores públicamente cuando sea posible',
    howWhyOnline: '¿Por qué usar un selector de ganadores en línea?',
    howWhyOnlineText1: 'La selección manual consume tiempo y parece sesgada. Las fórmulas de hoja de cálculo son confusas.',
    howWhyOnlineText2: 'RealWheelPicker funciona completamente en tu navegador - sin datos enviados a servidores, sin cuenta requerida.',
    howReady: '¿Listo para elegir tu ganador?',
    howStartFree: 'Comenzar Sorteo Gratis',
    howGiveawayPicker: 'Selector de Sorteos',
    
    // SEO Pages
    seoPages: {
      'random-wheel': {
        h1: 'Selector de Rueda Aleatoria – Gira la Rueda Online',
        subtitle: 'Gira una rueda aleatoria para elegir un ganador al instante. Gratis, rápido y justo.',
      },
      'wheel-of-names': {
        h1: 'Rueda de Nombres – Elige un Nombre al Azar',
        subtitle: 'Ingresa nombres, gira la rueda y deja que el destino decida. Justo y transparente.',
      },
      'random-name-picker': {
        h1: 'Selector de Nombres Aleatorio – Selecciona Nombres Justamente',
        subtitle: 'Pega tu lista y elige un nombre al azar en segundos. Sin sesgo garantizado.',
      },
      'giveaway-picker': {
        h1: 'Selector de Sorteos – Elige Ganadores de Concursos',
        subtitle: 'Realiza sorteos transparentes y selecciona ganadores en los que tu audiencia confiará.',
      },
      'weighted-random-picker': {
        h1: 'Selector Aleatorio Ponderado – Sorteos con Probabilidad Personalizada',
        subtitle: 'Asigna diferentes probabilidades a cada participante para escenarios avanzados.',
      },
    },
    
    // Common
    loading: 'Cargando...',

    // Homepage Island
    indexPageTitle: 'Ruleta Aleatoria — Sorteo Gratuito',
    indexSpinsText: 'giros completados',
    tapToSpin: 'Clic para girar',
    indexEntriesTab: 'Participantes',
    indexResultsTab: 'Resultados',
    indexNoResults: 'Gira la ruleta para ver resultados',
    indexClearResults: 'Borrar resultados',
    indexWhatIsTitle: '¿Cuándo usar la ruleta aleatoria?',
    indexWhatIsText: 'Desde sorteos de Instagram hasta actividades en clase — la ruleta es la forma más justa de tomar una decisión aleatoria.',
    indexHowToTitle: 'Cómo usar la ruleta',
    indexHowToStep1Title: 'Agrega tus entradas',
    indexHowToStep1Text: 'Escribe nombres uno a uno, pega una lista o usa una de nuestras plantillas.',
    indexHowToStep2Title: 'Haz clic en Girar',
    indexHowToStep2Text: 'Pulsa el botón "Girar la Ruleta" y observa la animación del giro.',
    indexHowToStep3Title: 'Obtén tu resultado',
    indexHowToStep3Text: 'La ruleta se detiene en un ganador aleatorio. Copia el resultado, compártelo o gira de nuevo.',
    indexWhyTitle: '¿Por qué usar nuestra ruleta?',
    indexWhyFair: '100% Justo',
    indexWhyFairText: 'API Web Crypto — misma tecnología que la banca online.',
    indexWhyFree: 'Completamente Gratis',
    indexWhyFreeText: 'Sin niveles premium, sin tarifas, sin límites en los giros.',
    indexWhyNoSignup: 'Sin Registro',
    indexWhyNoSignupText: 'Empieza instantáneamente — sin cuenta, sin email.',
    indexWhyPrivate: 'Privacidad Primero',
    indexWhyPrivateText: 'Todo funciona en tu navegador. Cero datos enviados.',
    indexOurTools: 'Nuestras Herramientas',
    indexUseCaseGiveaway: '🎁 Sorteos y concursos — Selecciona ganadores de comentarios de Instagram, TikTok o Discord de forma transparente.',
    indexUseCaseClassroom: '🎓 Aulas y formación — Selecciona estudiantes aleatoriamente para preguntas, presentaciones o trabajos en grupo.',
    indexUseCaseStandup: '🏢 Reuniones de equipo — Aleatoriza quién habla primero en los standup diarios.',
    indexUseCaseParty: '🎉 Juegos de fiesta — Verdad o reto, desafíos. Agrega cualquier opción.',
    indexUseCaseDinner: '🤔 Decisión de cena — ¿No puedes decidir dónde comer? Agrega restaurantes y deja que la ruleta decida.',
    indexUseCaseTodo: '📋 Delegación de tareas — Asigna tareas o responsabilidades al azar. Sin discusiones.',
    indexUseCasePresentation: '🎮 Presentaciones — Llama a estudiantes, elige ponentes o decide el orden de presentaciones.',
    indexValueTitle: 'La forma más justa de elegir un ganador aleatorio',
    indexValue1Title: 'Aleatoriedad criptográfica',
    indexValue1Text: 'Cada giro usa crypto.getRandomValues() — el mismo estándar de seguridad que las apps bancarias.',
    indexValue2Title: '100% Privado',
    indexValue2Text: 'Todo funciona en tu navegador. No se envían datos a ningún servidor.',
    indexValue3Title: 'Instantáneo y Gratuito',
    indexValue3Text: 'Sin cuenta. Sin descarga. Funciona en cualquier dispositivo.',
    indexAllToolsTitle: 'Todas las herramientas gratuitas — Sin registro',
  },
  fr: {
    heroTitle: "Tirage au sort",
    heroSubtitle: 'Choisissez un gagnant instantanément avec des chances égales ou des probabilités personnalisées.',
    heroCta: 'Tirage Équitable ou Personnalisé',
    fairDraw: 'Tirage Équitable',
    customDraw: 'Tirage Personnalisé',
    microText: 'Gratuit • Sans inscription • Résultat immédiat',
    stepPaste: 'Coller les noms',
    stepSpin: 'Lancer',
    stepWin: 'Gagnant !',
    
    howItWorksTitle: 'Comment fonctionne ce tirage au sort ?',
    howItWorksText: 'Entrez votre liste de noms, faites tourner la roue et obtenez un résultat vraiment aléatoire. Vous pouvez utiliser un tirage équitable ou personnaliser les probabilités en mode avancé. Sans inscription. Sans trucage. Résultat instantané.',
    
    trustIndicator1: 'Aléatoire 100% dans le navigateur',
    trustIndicator2: 'Aucune donnée stockée',
    trustIndicator3: 'Utilisé mondialement pour les tirages',
    
    useCasesTitle: 'À quoi peut servir cette roue ?',
    useCaseGiveaways: 'Giveaways & concours',
    useCaseGiveawaysDesc: 'Parfait pour les réseaux sociaux',
    useCaseStreaming: 'Streaming & live',
    useCaseStreamingDesc: 'Engagez votre audience',
    useCaseClassrooms: 'Classes & formations',
    useCaseClassroomsDesc: 'Choisissez des élèves au hasard',
    useCaseTeams: 'Décisions d\'équipe',
    useCaseTeamsDesc: 'Attribution équitable des tâches',
    useCaseWeighted: 'Sélection pondérée',
    useCaseWeightedDesc: 'Probabilités personnalisées',
    
    advancedModeExplainer: 'Le mode avancé vous permet d\'ajuster les chances de chaque participant. Les probabilités sont automatiquement recalculées.',
    totalWeight: 'Poids total',
    totalProbability: 'Probabilité totale',
    
    seoBottomTitle: 'Roue Aléatoire Gratuite en Ligne',
    seoBottomText: 'Vous cherchez une roue aléatoire pour choisir un gagnant ? Notre random picker gratuit vous permet de faire tourner la roue et d\'obtenir des résultats instantanés. Parfait comme roue de noms pour les giveaways, les classes ou tout tirage au sort gratuit. Utilisez notre wheel of names en ligne sans inscription.',
    
    drawModes: 'Modes de Tirage',
    simpleMode: 'Tirage Équitable',
    equalProbabilities: 'Probabilités égales',
    uniformRandom: 'Aléatoire uniforme',
    simpleModeDesc: 'Idéal pour giveaways, jeux concours et tirages équitables.',
    customMode: 'Tirage Personnalisé',
    adjustableProbabilities: 'Probabilités ajustables',
    advancedMode: 'Mode avancé',
    customModeDesc: 'Personnalisez les chances de chaque participant selon vos critères.',
    customWarning: '⚠️ Dans le mode personnalisé, les probabilités ne sont pas égales.',
    or: 'ou',
    
    participantList: 'Liste des Participants',
    pastePseudos: 'Collez vos pseudos ici, un par ligne...',
    participant: 'participant',
    participants: 'participants',
    clearAll: 'Effacer tout',
    adjustProbabilities: 'Ajuster les probabilités',
    addParticipantsLeft: 'Ajoutez des participants à gauche',
    addParticipantPlaceholder: 'Tapez un nom et appuyez sur Entrée...',
    bulkAddPlaceholder: 'Collez votre liste ici...\nUn nom par ligne\nou séparés par des virgules',
    weight: 'Poids',
    probability: 'Probabilité',
    adSpace: 'Espace publicitaire',
    actions: 'Actions',
    sortAZ: 'Trier A → Z',
    sortZA: 'Trier Z → A',
    shuffle: 'Mélanger',
    onePerLine: 'Mettre un par ligne',
    commaSeparated: 'Séparer par virgules',
    removeDuplicates: 'Supprimer doublons',
    largeList: 'Grande liste',
    preview: 'Aperçu',
    moreParticipants: 'autres participants',
    
    drawTitle: 'Titre du Tirage',
    drawTitleLabel: 'Choisissez votre titre de tirage',
    drawTitlePlaceholder: 'ex., Giveaway Instagram, Sélection d\'équipe...',
    optional: 'optionnel',
    
    numberOfWinners: 'Nombre de gagnants',
    maxWinners: 'Max',
    
    launchDraw: 'Lancer la Roue',
    drawing: 'Tirage en cours...',
    addAtLeast2: 'Ajoutez au moins 2 participants pour lancer la roue',
    
    drawWinner: 'Gagnant',
    drawWinners: 'Gagnants',
    copy: 'Copier',
    copied: 'Copié !',
    relaunch: 'Relancer',
    share: 'Partager',
    copySuccess: 'Copié !',
    copySuccessDesc: 'Le résultat a été copié dans le presse-papier.',
    copyError: 'Erreur',
    copyErrorDesc: 'Impossible de copier le résultat.',
    spinAgain: 'Relancer la Roue',
    removeWinnerAndRespin: 'Retirer le Gagnant et Relancer',
    removeWinnersAndRespin: 'Retirer les Gagnants et Relancer',
    
    spinningText: 'Tirage en cours...',
    
    whyChoose: 'Pourquoi choisir randompicker.com ?',
    usedByCreators: 'Utilisé par créateurs et organisateurs',
    usedByCreatorsDesc: 'Streamers, influenceurs et entreprises font confiance à notre outil.',
    statisticalTool: 'Outil de simulation statistique',
    statisticalToolDesc: 'Algorithme de tirage pondéré transparent et vérifiable.',
    noAccountRequired: 'Aucun compte requis',
    noAccountRequiredDesc: 'Utilisez l\'outil immédiatement, sans inscription ni données personnelles.',
    worksEverywhere: 'Fonctionne sur mobile et PC',
    worksEverywhereDesc: 'Interface responsive optimisée pour tous les appareils.',
    
    seoTitle: 'Tirage au sort en ligne gratuit : comment ça marche ?',
    fairDrawTitle: 'Tirage au sort équitable',
    fairDrawText1: 'Notre tirage au sort en ligne gratuit utilise un algorithme de génération aléatoire certifié pour garantir des résultats équitables. Parfait pour vos jeux concours, giveaways sur les réseaux sociaux, ou toute sélection nécessitant un random picker fiable.',
    fairDrawText2: 'Chaque participant a exactement les mêmes chances de gagner dans le mode simple. C\'est l\'outil idéal pour choisir un gagnant de manière transparente et vérifiable.',
    customDrawTitle: 'Tirage personnalisé et pondéré',
    customDrawText1: 'Besoin d\'un tirage personnalisé avec des probabilités différentes ? Notre mode avancé permet de créer un tirage pondéré où chaque participant peut avoir des chances ajustées selon vos critères.',
    customDrawText2: 'Cette fonctionnalité unique est parfaite pour les programmes de fidélité, les systèmes de récompenses basés sur l\'engagement, ou tout scénario nécessitant une pondération statistique transparente.',
    popularUseCases: 'Cas d\'utilisation populaires',
    useCase1: 'Giveaways Instagram et TikTok',
    useCase2: 'Tirages au sort Twitch et YouTube',
    useCase3: 'Jeux concours professionnels',
    useCase4: 'Sélection de groupes aléatoires',
    useCase5: 'Attribution de tâches équitable',
    useCase6: 'Tombolas et loteries privées',
    
    footerDisclaimer: 'Ce site est un outil de simulation de tirage au sort. L\'utilisateur est responsable de l\'usage et de la communication des résultats. Les tirages sont générés localement et aucune donnée n\'est collectée ou stockée.',
    legalNotice: 'Mentions légales',
    privacy: 'Confidentialité',
    contact: 'Contact',
    mobileBanner: 'Bannière mobile',
    
    // FAQ Page
    faqTitle: 'Questions Fréquentes',
    faqSubtitle: 'Tout ce que vous devez savoir sur notre outil de tirage au sort',
    faqMicroText: 'Équité • Confidentialité • Transparence',
    faqQ1: 'Ce tirage au sort est-il vraiment équitable et impartial ?',
    faqA1: 'Oui, absolument. Notre sélecteur aléatoire utilise l\'API Web Crypto (crypto.getRandomValues), qui fournit des nombres aléatoires cryptographiquement sécurisés. C\'est la même technologie utilisée par les banques. Chaque participant a exactement les mêmes chances en mode équitable.',
    faqQ2: 'Comment fonctionne l\'algorithme d\'aléatoire ?',
    faqA2: 'Nous utilisons le générateur de nombres aléatoires cryptographiques (CSPRNG) intégré à votre navigateur. Contrairement à Math.random(), cela fournit une véritable aléatoire basée sur des sources d\'entropie matérielle. Tous les calculs sont locaux.',
    faqQ3: 'Mes données sont-elles sécurisées ? Que stockez-vous ?',
    faqA3: 'Nous ne stockons absolument rien sur nos serveurs. Votre liste de participants est sauvegardée uniquement dans le stockage local de votre navigateur. Pas de cookies de suivi, pas de collecte de données personnelles.',
    faqQ4: 'Puis-je l\'utiliser pour des giveaways Instagram ou YouTube ?',
    faqA4: 'Oui ! Notre sélecteur de giveaway est parfait pour les concours sur les réseaux sociaux. Vous pouvez coller des commentaires, des noms d\'utilisateur ou toute liste de participants. La roue visuelle ajoute de la transparence.',
    faqQ5: 'Quelle est la différence entre les modes Équitable et Personnalisé ?',
    faqA5: 'Le mode Équitable donne à tous les mêmes chances. Le mode Personnalisé vous permet d\'attribuer différents poids/probabilités aux participants, utile pour les programmes de fidélité ou les récompenses.',
    faqQ6: 'Puis-je choisir plusieurs gagnants à la fois ?',
    faqA6: 'Oui ! Définissez le nombre de gagnants avant de tourner. Pour plusieurs gagnants, nous utilisons notre visualisation de roulette de casino avec des boules numérotées.',
    faqQ7: 'Ça fonctionne sur mobile ?',
    faqA7: 'Absolument. Notre outil est entièrement responsive et optimisé pour tous les appareils. Les animations de la roue sont fluides et fonctionnent sur toutes les plateformes.',
    faqQ8: 'C\'est gratuit ? Y a-t-il des coûts cachés ?',
    faqA8: '100% gratuit sans coûts cachés, sans niveaux premium, sans inscription requise. Nous sommes soutenus par des publicités non intrusives.',
    faqCta: 'Prêt à choisir un gagnant ?',
    faqCtaButton: 'Commencer Votre Tirage Gratuit',
    
    // About Page
    aboutTitle: 'À Propos de RealWheelPicker',
    aboutSubtitle: 'Le sélecteur aléatoire le plus fiable pour des tirages justes et transparents dans le monde',
    aboutMicroText: 'Gratuit • Confidentialité d\'abord • Utilisé Mondialement',
    aboutMissionTitle: 'Notre Mission',
    aboutMissionText1: 'Nous croyons que tout le monde mérite un accès à une sélection aléatoire juste et impartiale. Que vous soyez enseignant, streamer ou une équipe prenant des décisions, l\'aléatoire doit être transparent, accessible et gratuit.',
    aboutMissionText2: 'RealWheelPicker a été créé pour être la référence des tirages au sort en ligne : sans comptes, sans suivi, sans manipulation.',
    aboutValuesTitle: 'Nos Valeurs',
    aboutPrivacyTitle: 'Confidentialité Totale',
    aboutPrivacyText: 'Zéro collecte de données. Pas de cookies. Pas de suivi. Vos listes ne quittent jamais votre navigateur.',
    aboutRandomnessTitle: 'Véritable Aléatoire',
    aboutRandomnessText: 'Nous utilisons l\'API Web Crypto pour des nombres aléatoires cryptographiquement sécurisés.',
    aboutAccessibilityTitle: 'Accessibilité Mondiale',
    aboutAccessibilityText: 'Disponible en plusieurs langues, fonctionne sur tous les appareils, sans inscription requise.',
    aboutFreeTitle: 'Toujours Gratuit',
    aboutFreeText: 'Pas de niveaux premium, pas de fonctionnalités bloquées, pas de pièges "essai gratuit".',
    aboutTrustedTitle: 'Confiance Mondiale',
    aboutCountries: 'Pays',
    aboutDrawsMonthly: 'Tirages Mensuels',
    aboutDataStored: 'Données Stockées',
    aboutClientSide: 'Côté Client',
    aboutWhoUsesTitle: 'Qui Utilise RealWheelPicker ?',
    aboutCreators: 'Créateurs de Contenu',
    aboutCreatorsDesc: 'Streamers, YouTubers et influenceurs pour des giveaways transparents',
    aboutEducators: 'Éducateurs',
    aboutEducatorsDesc: 'Enseignants qui choisissent équitablement les élèves',
    aboutBusinesses: 'Entreprises',
    aboutBusinessesDesc: 'Équipes prenant des décisions impartiales',
    aboutCta: 'Prêt pour un tirage équitable ?',
    aboutCtaButton: 'Commencer Votre Tirage Gratuit',
    
    // Navigation
    navExploreTools: 'Explorer Plus d\'Outils',
    navHome: 'Accueil',
    navRandomWheel: 'Roue Aléatoire',
    navWheelOfNames: 'Roue de Noms',
    navNamePicker: 'Sélecteur de Noms',
    navGiveaway: 'Giveaway',
    navWeighted: 'Pondéré',
    navInstagram: 'Instagram',
    navTeams: 'Équipes',
    navGuide: 'Guide',
    navFaq: 'FAQ',
    navAbout: 'À Propos de Nous',
    
    // Instagram Giveaway Page
    igTitle: 'Sélecteur de Giveaway Instagram',
    igSubtitle: 'Choisissez les gagnants de vos giveaways Instagram équitablement. Montrez le tirage transparent à vos abonnés.',
    igMicroText: 'Gratuit • Sans inscription • Utilisé par les influenceurs',
    igStepCopy: 'Copier les commentaires',
    igStepPaste: 'Coller les pseudos',
    igStepPick: 'Choisir le gagnant !',
    igHowToCollect: 'Comment collecter les pseudos Instagram',
    igStep1Title: 'Ouvrez votre publication',
    igStep1Desc: 'Allez sur la publication du giveaway sur Instagram',
    igStep2Title: 'Copiez les pseudos',
    igStep2Desc: 'Sélectionnez et copiez les @pseudos des commentaires',
    igStep3Title: 'Collez ci-dessous',
    igStep3Desc: 'Nous nettoierons et dédoublonnerons automatiquement',
    igWinnerCongrats: '🎉 Félicitations au gagnant ! Prêt pour un autre tour ? Parfait pour les gagnants de secours.',
    igWhyUse: 'Pourquoi utiliser RealWheelPicker pour les giveaways Instagram ?',
    igTransparent: '100% Transparent',
    igTransparentDesc: 'Montrez le tirage en direct',
    igUsernameFriendly: 'Compatible pseudos',
    igUsernameFriendlyDesc: 'Gère les @mentions automatiquement',
    igMultiWinner: 'Multi-gagnants',
    igMultiWinnerDesc: 'Choisissez 1, 3 ou 10+ gagnants',
    igBuildTrust: 'Bâtissez la confiance',
    igBuildTrustDesc: 'Prouvez que vos tirages sont équitables',
    igSeoTitle: 'Sélecteur de Gagnants de Giveaway Instagram Gratuit',
    igSeoText1: 'Vous organisez un giveaway Instagram et devez choisir un gagnant équitablement ? Notre sélecteur de giveaway Instagram gratuit rend la sélection des gagnants aléatoires transparente et digne de confiance.',
    igSeoText2: 'Parfait pour la sélection de gagnants de concours Instagram, giveaways d\'influenceurs, promotions de marque et récompenses communautaires. Aucun compte requis, aucune donnée stockée.',
    
    // Random Team Selector Page
    teamTitle: 'Sélecteur d\'Équipe Aléatoire',
    teamSubtitle: 'Formez des équipes aléatoires, assignez des tâches équitablement ou choisissez des chefs de groupe. Parfait pour les classes, bureaux et jeux.',
    teamMicroText: 'Gratuit • Sélection équitable • Fonctionne hors ligne',
    teamStepAdd: 'Ajouter des noms',
    teamStepSpin: 'Lancer',
    teamStepGet: 'Obtenir l\'équipe !',
    teamScenarios: 'Scénarios courants de sélection d\'équipe',
    teamCaptains: 'Choisir les Capitaines',
    teamCaptainsDesc: 'Sélection équitable du capitaine',
    teamProjects: 'Assigner des Groupes de Projet',
    teamProjectsDesc: 'Formation d\'équipe aléatoire',
    teamPresenters: 'Choisir les Présentateurs',
    teamPresentersDesc: 'Qui passe en premier ?',
    teamTasks: 'Déléguer les Tâches',
    teamTasksDesc: 'Attribution impartiale',
    teamSelectionComplete: '✅ Sélection terminée ! Besoin de choisir plus de membres ? Supprimez et relancez.',
    teamWhyRandom: 'Pourquoi la sélection aléatoire fonctionne le mieux',
    teamEliminatesBias: 'Élimine les biais',
    teamEliminatesBiasDesc: 'Pas de favoritisme, pas de plaintes',
    teamQuickEasy: 'Rapide et facile',
    teamQuickEasyDesc: 'Fait en secondes',
    teamMixesUp: 'Mélange les choses',
    teamMixesUpDesc: 'Nouvelles combinaisons à chaque fois',
    teamSeoTitle: 'Générateur et Sélecteur d\'Équipe Aléatoire Gratuit',
    teamSeoText1: 'Besoin de sélectionner des membres d\'équipe au hasard, choisir des chefs de groupe ou assigner des tâches équitablement ? Notre sélecteur d\'équipe aléatoire gratuit rend la formation de groupes rapide et impartiale.',
    teamSeoText2: 'Ajoutez simplement des noms, définissez combien choisir et lancez. Le sélecteur utilise une génération aléatoire cryptographiquement sécurisée pour garantir l\'équité.',
    
    // How to Pick Winner Page
    howTitle: 'Comment Choisir un Gagnant Aléatoire en Ligne',
    howSubtitle: 'Guide complet pour organiser des tirages au sort justes et transparents',
    howReadTime: 'Lecture de 5 minutes • Tutoriel étape par étape',
    howWhyMatters: 'Pourquoi la sélection aléatoire est importante',
    howWhyMattersText1: 'Vous organisez un giveaway ou un concours ? La façon dont vous choisissez les gagnants affecte directement votre crédibilité.',
    howWhyMattersText2: 'Un sélecteur vraiment aléatoire et visuellement transparent résout tous ces problèmes.',
    howStepByStep: 'Étape par étape : Choisissez un gagnant en 60 secondes',
    howStep1Title: 'Collectez vos participants',
    howStep1Text: 'Rassemblez les pseudos, emails ou noms. Pour les giveaways Instagram, copiez les commentaires directement.',
    howStep1Tip: 'Utilisez notre fonction "Supprimer les doublons" pour vous assurer que chaque participant n\'apparaît qu\'une fois.',
    howStep2Title: 'Collez les noms et configurez',
    howStep2Text: 'Collez votre liste dans le champ des participants. Choisissez "Tirage Équitable" pour des chances égales ou "Tirage Personnalisé" pour pondérer.',
    howStep2Tip: 'Donnez un titre à votre tirage comme "Giveaway d\'Été 2024" pour des captures plus propres.',
    howStep3Title: 'Lancez et obtenez votre gagnant',
    howStep3Text: 'Cliquez sur "Lancer la Roue" et regardez la sélection animée. La roue utilise des nombres aléatoires cryptographiquement sécurisés.',
    howStep3Tip: 'Pour les live, partagez votre écran pendant le tirage pour prouver la transparence.',
    howStep4Title: 'Partagez et documentez',
    howStep4Text: 'Copiez le résultat ou utilisez le bouton Partager. Faites une capture du gagnant pour vos archives.',
    howBestPractices: 'Meilleures pratiques pour des tirages équitables',
    howBestPractice1: 'Annoncez toujours la méthode de sélection avant le tirage',
    howBestPractice2: 'Enregistrez ou capturez le tirage comme preuve',
    howBestPractice3: 'Supprimez les entrées en double avant de tirer',
    howBestPractice4: 'Établissez des règles d\'éligibilité claires',
    howBestPractice5: 'Ayez des gagnants de secours prêts',
    howBestPractice6: 'Annoncez les gagnants publiquement quand c\'est possible',
    howWhyOnline: 'Pourquoi utiliser un sélecteur de gagnants en ligne ?',
    howWhyOnlineText1: 'La sélection manuelle prend du temps et semble biaisée. Les formules de tableur sont confuses.',
    howWhyOnlineText2: 'RealWheelPicker fonctionne entièrement dans votre navigateur - aucune donnée envoyée aux serveurs, aucun compte requis.',
    howReady: 'Prêt à choisir votre gagnant ?',
    howStartFree: 'Commencer un Tirage Gratuit',
    howGiveawayPicker: 'Sélecteur de Giveaway',
    
    // SEO Pages
    seoPages: {
      'random-wheel': {
        h1: 'Roue Aléatoire – Faites Tourner la Roue en Ligne',
        subtitle: 'Faites tourner une roue aléatoire pour choisir un gagnant instantanément. Gratuit, rapide et équitable.',
      },
      'wheel-of-names': {
        h1: 'Roue des Noms – Choisissez un Nom au Hasard',
        subtitle: 'Entrez des noms, faites tourner la roue et laissez le destin décider. Équitable et transparent.',
      },
      'random-name-picker': {
        h1: 'Sélecteur de Noms Aléatoire – Sélectionnez des Noms Équitablement',
        subtitle: 'Collez votre liste et choisissez un nom au hasard en quelques secondes. Zéro biais garanti.',
      },
      'giveaway-picker': {
        h1: 'Sélecteur de Giveaway – Choisissez les Gagnants Équitablement',
        subtitle: 'Organisez des tirages transparents et sélectionnez des gagnants en qui votre audience aura confiance.',
      },
      'weighted-random-picker': {
        h1: 'Sélecteur Aléatoire Pondéré – Tirages à Probabilités Personnalisées',
        subtitle: 'Attribuez des probabilités différentes à chaque participant pour des scénarios avancés.',
      },
    },
    
    // Common
    loading: 'Chargement...',

    // Homepage Island
    indexPageTitle: 'Roue aléatoire — Tirage au sort gratuit',
    indexSpinsText: 'tirages effectués',
    tapToSpin: 'Cliquer pour tourner',
    indexEntriesTab: 'Participants',
    indexResultsTab: 'Résultats',
    indexNoResults: 'Tournez la roue pour voir les résultats',
    indexClearResults: 'Effacer les résultats',
    indexWhatIsTitle: 'Quand utiliser la roue aléatoire ?',
    indexWhatIsText: 'Des giveaways Instagram aux activités en classe — la roue est la façon la plus équitable de prendre une décision au hasard.',
    indexHowToTitle: 'Comment utiliser la roue',
    indexHowToStep1Title: 'Ajoutez vos participants',
    indexHowToStep1Text: 'Tapez des noms un par un, collez une liste ou utilisez un de nos modèles prédéfinis.',
    indexHowToStep2Title: 'Cliquez sur Tourner',
    indexHowToStep2Text: 'Appuyez sur le bouton "Lancer le tirage" et regardez la roue tourner avec une animation fluide.',
    indexHowToStep3Title: 'Obtenez votre résultat',
    indexHowToStep3Text: 'La roue s\'arrête sur un gagnant aléatoire. Copiez le résultat, partagez-le, ou relancez.',
    indexWhyTitle: 'Pourquoi utiliser notre roue aléatoire ?',
    indexWhyFair: '100% Équitable',
    indexWhyFairText: 'API Web Crypto — même technologie que les banques.',
    indexWhyFree: 'Entièrement gratuit',
    indexWhyFreeText: 'Pas d\'abonnement, pas de frais, tirages illimités.',
    indexWhyNoSignup: 'Sans inscription',
    indexWhyNoSignupText: 'Commencez instantanément — pas de compte, pas d\'email.',
    indexWhyPrivate: 'Vie privée d\'abord',
    indexWhyPrivateText: 'Tout fonctionne dans votre navigateur. Aucune donnée envoyée.',
    indexOurTools: 'Nos Outils',
    indexUseCaseGiveaway: '🎁 Giveaways & concours — Sélectionnez des gagnants depuis les commentaires Instagram, TikTok ou Discord de façon transparente.',
    indexUseCaseClassroom: '🎓 Salles de classe — Sélectionnez des élèves aléatoirement pour des questions, exposés ou travaux de groupe.',
    indexUseCaseStandup: '🏢 Réunions d\'équipe — Randomisez qui parle en premier dans les réunions quotidiennes.',
    indexUseCaseParty: '🎉 Jeux de soirée — Action ou Vérité, jeux de défis. Ajoutez n\'importe quelle option.',
    indexUseCaseDinner: '🤔 Décision du dîner — Impossible de choisir où manger ? Ajoutez des restaurants et laissez la roue décider.',
    indexUseCaseTodo: '📋 Délégation de tâches — Attribuez les tâches ou responsabilités au hasard. Pas de disputes.',
    indexUseCasePresentation: '🎮 Présentations — Désignez des étudiants, choisissez des orateurs ou décidez l\'ordre des présentations.',
    indexValueTitle: 'La façon la plus équitable de choisir un gagnant',
    indexValue1Title: 'Crypto-aléatoire',
    indexValue1Text: 'Chaque tirage utilise crypto.getRandomValues() — le même standard de sécurité que les applis bancaires. Vraiment imprévisible.',
    indexValue2Title: '100% Privé',
    indexValue2Text: 'Tout s\'exécute dans votre navigateur. Aucune donnée n\'est envoyée à un serveur. Votre liste reste sur votre appareil.',
    indexValue3Title: 'Instantané & Gratuit',
    indexValue3Text: 'Sans compte. Sans téléchargement. Fonctionne sur tous les appareils — téléphones, tablettes, ordinateurs.',
    indexAllToolsTitle: 'Tous les outils gratuits — Sans inscription',
  },
  de: {
    heroTitle: 'Zufallsauslosung',
    heroSubtitle: 'Wählen Sie sofort einen Gewinner mit gleichen Chancen oder benutzerdefinierten Wahrscheinlichkeiten.',
    heroCta: 'Faire oder Benutzerdefinierte Auslosung',
    fairDraw: 'Faire Zufallsauslosung',
    customDraw: 'Benutzerdefinierte Auslosung',
    microText: 'Kostenlos • Ohne Anmeldung • Sofortiges Ergebnis',
    stepPaste: 'Namen einfügen',
    stepSpin: 'Drehen',
    stepWin: 'Gewinner!',
    
    howItWorksTitle: 'Wie funktioniert diese Zufallsauslosung?',
    howItWorksText: 'Geben Sie Ihre Namensliste ein, drehen Sie das Rad und erhalten Sie ein wirklich zufälliges Ergebnis. Sie können eine faire Auslosung verwenden oder die Wahrscheinlichkeiten im erweiterten Modus anpassen. Keine Anmeldung. Keine Tricks. Sofortiges Ergebnis.',
    
    trustIndicator1: '100% Browser-basierte Zufälligkeit',
    trustIndicator2: 'Keine Daten gespeichert',
    trustIndicator3: 'Weltweit für Verlosungen verwendet',
    
    useCasesTitle: 'Wofür können Sie dieses Rad verwenden?',
    useCaseGiveaways: 'Verlosungen & Wettbewerbe',
    useCaseGiveawaysDesc: 'Perfekt für Social Media',
    useCaseStreaming: 'Streaming & Live',
    useCaseStreamingDesc: 'Begeistern Sie Ihr Publikum',
    useCaseClassrooms: 'Unterricht & Schulungen',
    useCaseClassroomsDesc: 'Schüler zufällig auswählen',
    useCaseTeams: 'Team-Entscheidungen',
    useCaseTeamsDesc: 'Faire Aufgabenverteilung',
    useCaseWeighted: 'Gewichtete Auswahl',
    useCaseWeightedDesc: 'Angepasste Wahrscheinlichkeiten',
    
    advancedModeExplainer: 'Im erweiterten Modus können Sie die Chancen jedes Teilnehmers anpassen. Die Wahrscheinlichkeiten werden automatisch neu berechnet.',
    totalWeight: 'Gesamtgewicht',
    totalProbability: 'Gesamtwahrscheinlichkeit',
    
    seoBottomTitle: 'Kostenloses Online-Zufallsrad',
    seoBottomText: 'Suchen Sie ein Zufallsrad, um einen Gewinner auszuwählen? Unser kostenloser Random Picker lässt Sie drehen und sofortige Ergebnisse erhalten. Perfekt als Namensrad für Verlosungen, Klassenzimmer oder jede kostenlose Zufallsauslosung. Nutzen Sie unser Random Wheel online ohne Anmeldung.',
    
    drawModes: 'Auslosungsmodi',
    simpleMode: 'Faire Auslosung',
    equalProbabilities: 'Gleiche Wahrscheinlichkeiten',
    uniformRandom: 'Gleichmäßig zufällig',
    simpleModeDesc: 'Ideal für Gewinnspiele, Wettbewerbe und faire Auslosungen.',
    customMode: 'Benutzerdefinierte Auslosung',
    adjustableProbabilities: 'Anpassbare Wahrscheinlichkeiten',
    advancedMode: 'Erweiterter Modus',
    customModeDesc: 'Passen Sie die Chancen jedes Teilnehmers nach Ihren Kriterien an.',
    customWarning: '⚠️ Im benutzerdefinierten Modus sind die Wahrscheinlichkeiten nicht gleich.',
    or: 'oder',
    
    participantList: 'Teilnehmerliste',
    pastePseudos: 'Namen hier einfügen, einen pro Zeile...',
    participant: 'Teilnehmer',
    participants: 'Teilnehmer',
    clearAll: 'Alle löschen',
    adjustProbabilities: 'Wahrscheinlichkeiten anpassen',
    addParticipantsLeft: 'Teilnehmer links hinzufügen',
    addParticipantPlaceholder: 'Namen eingeben und Enter drücken...',
    bulkAddPlaceholder: 'Liste hier einfügen...\nEin Name pro Zeile\noder durch Kommas getrennt',
    weight: 'Gewicht',
    probability: 'Wahrscheinlichkeit',
    adSpace: 'Werbefläche',
    actions: 'Aktionen',
    sortAZ: 'Sortieren A → Z',
    sortZA: 'Sortieren Z → A',
    shuffle: 'Mischen',
    onePerLine: 'Einer pro Zeile',
    commaSeparated: 'Kommagetrennt',
    removeDuplicates: 'Duplikate entfernen',
    largeList: 'Große Liste',
    preview: 'Vorschau',
    moreParticipants: 'weitere Teilnehmer',
    
    drawTitle: 'Titel der Auslosung',
    drawTitleLabel: 'Wählen Sie Ihren Auslosungstitel',
    drawTitlePlaceholder: 'z.B., Instagram Gewinnspiel, Teamauswahl...',
    optional: 'optional',
    
    numberOfWinners: 'Anzahl der Gewinner',
    maxWinners: 'Max',
    
    launchDraw: 'Rad Drehen',
    drawing: 'Dreht sich...',
    addAtLeast2: 'Fügen Sie mindestens 2 Teilnehmer hinzu, um das Rad zu drehen',
    
    drawWinner: 'Gewinner',
    drawWinners: 'Gewinner',
    copy: 'Kopieren',
    copied: 'Kopiert!',
    relaunch: 'Erneut Drehen',
    share: 'Teilen',
    copySuccess: 'Kopiert!',
    copySuccessDesc: 'Ergebnis in die Zwischenablage kopiert.',
    copyError: 'Fehler',
    copyErrorDesc: 'Ergebnis konnte nicht kopiert werden.',
    spinAgain: 'Erneut Drehen',
    removeWinnerAndRespin: 'Gewinner Entfernen & Neu Drehen',
    removeWinnersAndRespin: 'Gewinner Entfernen & Neu Drehen',
    
    spinningText: 'Auslosung läuft...',
    
    whyChoose: 'Warum randompicker.com wählen?',
    usedByCreators: 'Von Erstellern & Organisatoren genutzt',
    usedByCreatorsDesc: 'Streamer, Influencer und Unternehmen vertrauen unserem Tool.',
    statisticalTool: 'Statistisches Simulationstool',
    statisticalToolDesc: 'Transparenter und überprüfbarer gewichteter Auslosungsalgorithmus.',
    noAccountRequired: 'Kein Konto erforderlich',
    noAccountRequiredDesc: 'Sofort nutzen, ohne Anmeldung oder persönliche Daten.',
    worksEverywhere: 'Funktioniert auf Mobil & Desktop',
    worksEverywhereDesc: 'Responsive Oberfläche optimiert für alle Geräte.',
    
    seoTitle: 'Kostenloser Online-Zufallsauswähler: Wie funktioniert es?',
    fairDrawTitle: 'Faire Zufallsauslosung',
    fairDrawText1: 'Unser kostenloser Online-Zufallsauswähler verwendet einen zertifizierten Zufallsgenerierungsalgorithmus, um faire Ergebnisse zu garantieren. Perfekt für Ihre Gewinnspiele, Social-Media-Wettbewerbe oder jede Auswahl, die einen zuverlässigen Zufallsauswähler erfordert.',
    fairDrawText2: 'Jeder Teilnehmer hat im einfachen Modus genau die gleichen Gewinnchancen. Es ist das ideale Werkzeug, um einen Gewinner transparent und überprüfbar auszuwählen.',
    customDrawTitle: 'Benutzerdefinierte & gewichtete Auslosung',
    customDrawText1: 'Benötigen Sie eine benutzerdefinierte Auslosung mit unterschiedlichen Wahrscheinlichkeiten? Unser erweiterter Modus ermöglicht es Ihnen, eine gewichtete Auslosung zu erstellen, bei der jeder Teilnehmer angepasste Chancen nach Ihren Kriterien haben kann.',
    customDrawText2: 'Diese einzigartige Funktion ist perfekt für Treueprogramme, Engagement-basierte Belohnungssysteme oder jedes Szenario, das eine transparente statistische Gewichtung erfordert.',
    popularUseCases: 'Beliebte Anwendungsfälle',
    useCase1: 'Instagram & TikTok Gewinnspiele',
    useCase2: 'Twitch & YouTube Auslosungen',
    useCase3: 'Professionelle Wettbewerbe',
    useCase4: 'Zufällige Gruppenauswahl',
    useCase5: 'Faire Aufgabenverteilung',
    useCase6: 'Private Lotterien & Verlosungen',
    
    footerDisclaimer: 'Diese Website ist ein Simulationstool. Benutzer sind für die Verwendung und Weitergabe der Ergebnisse verantwortlich. Auslosungen werden lokal generiert und es werden keine Daten gesammelt oder gespeichert.',
    legalNotice: 'Impressum',
    privacy: 'Datenschutz',
    contact: 'Kontakt',
    mobileBanner: 'Mobile Banner',
    
    // FAQ Page
    faqTitle: 'Häufig Gestellte Fragen',
    faqSubtitle: 'Alles, was Sie über unser Zufallsauswahl-Tool wissen müssen',
    faqMicroText: 'Fairness • Datenschutz • Transparenz',
    faqQ1: 'Ist diese Zufallsauswahl wirklich fair und unvoreingenommen?',
    faqA1: 'Ja, absolut. Unsere Zufallsauswahl verwendet die Web Crypto API (crypto.getRandomValues), die kryptografisch sichere Zufallszahlen liefert. Dies ist dieselbe Technologie, die von Banken verwendet wird. Jeder Teilnehmer hat im fairen Modus genau die gleichen Chancen.',
    faqQ2: 'Wie funktioniert der Zufallsalgorithmus?',
    faqA2: 'Wir verwenden den in Ihrem Browser integrierten kryptografischen Zufallszahlengenerator (CSPRNG). Im Gegensatz zu Math.random() bietet dies echte Zufälligkeit basierend auf Hardware-Entropiequellen. Alle Berechnungen erfolgen lokal.',
    faqQ3: 'Sind meine Daten sicher? Was speichern Sie?',
    faqA3: 'Wir speichern absolut nichts auf unseren Servern. Ihre Teilnehmerliste wird nur im lokalen Speicher Ihres Browsers gespeichert. Keine Tracking-Cookies, keine Sammlung persönlicher Daten.',
    faqQ4: 'Kann ich dies für Instagram- oder YouTube-Gewinnspiele verwenden?',
    faqA4: 'Ja! Unser Gewinnspiel-Picker ist perfekt für Social-Media-Wettbewerbe. Sie können Kommentare, Benutzernamen oder jede Liste von Teilnehmern einfügen. Das visuelle Rad fügt Transparenz hinzu.',
    faqQ5: 'Was ist der Unterschied zwischen Fair- und Benutzerdefiniertem Modus?',
    faqA5: 'Der Faire Modus gibt allen die gleichen Chancen. Der Benutzerdefinierte Modus ermöglicht es Ihnen, verschiedene Gewichtungen/Wahrscheinlichkeiten zuzuweisen, nützlich für Treueprogramme oder Belohnungen.',
    faqQ6: 'Kann ich mehrere Gewinner auf einmal auswählen?',
    faqA6: 'Ja! Legen Sie die Anzahl der Gewinner vor dem Drehen fest. Für mehrere Gewinner verwenden wir unsere Casino-Roulette-Visualisierung mit nummerierten Kugeln.',
    faqQ7: 'Funktioniert es auf mobilen Geräten?',
    faqA7: 'Absolut. Unser Tool ist vollständig responsiv und für alle Geräte optimiert. Die Radanimationen sind flüssig und funktionieren auf allen Plattformen.',
    faqQ8: 'Ist es kostenlos? Gibt es versteckte Kosten?',
    faqA8: '100% kostenlos ohne versteckte Kosten, ohne Premium-Stufen, ohne Registrierung erforderlich. Wir werden durch nicht-aufdringliche Werbung unterstützt.',
    faqCta: 'Bereit, einen Gewinner zu wählen?',
    faqCtaButton: 'Starten Sie Ihre Kostenlose Auslosung',
    
    // About Page
    aboutTitle: 'Über RealWheelPicker',
    aboutSubtitle: 'Die vertrauenswürdigste Zufallsauswahl für faire, transparente Auslosungen weltweit',
    aboutMicroText: 'Kostenlos • Datenschutz Zuerst • Weltweit Genutzt',
    aboutMissionTitle: 'Unsere Mission',
    aboutMissionText1: 'Wir glauben, dass jeder Zugang zu fairer, unvoreingenommener Zufallsauswahl verdient. Ob Sie Lehrer, Streamer oder ein Team sind - Zufälligkeit sollte transparent, zugänglich und kostenlos sein.',
    aboutMissionText2: 'RealWheelPicker wurde geschaffen, um der Goldstandard bei Online-Zufallsauslosungen zu sein: keine Konten, kein Tracking, keine Manipulation.',
    aboutValuesTitle: 'Unsere Werte',
    aboutPrivacyTitle: 'Vollständiger Datenschutz',
    aboutPrivacyText: 'Keine Datensammlung. Keine Cookies. Kein Tracking. Ihre Listen verlassen nie Ihren Browser.',
    aboutRandomnessTitle: 'Echte Zufälligkeit',
    aboutRandomnessText: 'Wir verwenden die Web Crypto API für kryptografisch sichere Zufallszahlen.',
    aboutAccessibilityTitle: 'Globale Zugänglichkeit',
    aboutAccessibilityText: 'In mehreren Sprachen verfügbar, funktioniert auf jedem Gerät, keine Registrierung erforderlich.',
    aboutFreeTitle: 'Für Immer Kostenlos',
    aboutFreeText: 'Keine Premium-Stufen, keine Funktionssperren, keine "kostenlose Testversion"-Tricks.',
    aboutTrustedTitle: 'Weltweit Vertraut',
    aboutCountries: 'Länder',
    aboutDrawsMonthly: 'Monatliche Auslosungen',
    aboutDataStored: 'Gespeicherte Daten',
    aboutClientSide: 'Clientseitig',
    aboutWhoUsesTitle: 'Wer Nutzt RealWheelPicker?',
    aboutCreators: 'Content Creator',
    aboutCreatorsDesc: 'Streamer, YouTuber und Influencer für transparente Gewinnspiele',
    aboutEducators: 'Pädagogen',
    aboutEducatorsDesc: 'Lehrer, die Schüler fair auswählen',
    aboutBusinesses: 'Unternehmen',
    aboutBusinessesDesc: 'Teams, die unvoreingenommene Entscheidungen treffen',
    aboutCta: 'Bereit für eine faire Auslosung?',
    aboutCtaButton: 'Starten Sie Ihre Kostenlose Auslosung',
    
    // Navigation
    navExploreTools: 'Mehr Tools Entdecken',
    navHome: 'Startseite',
    navRandomWheel: 'Zufallsrad',
    navWheelOfNames: 'Namensrad',
    navNamePicker: 'Namenswähler',
    navGiveaway: 'Gewinnspiel',
    navWeighted: 'Gewichtet',
    navInstagram: 'Instagram',
    navTeams: 'Teams',
    navGuide: 'Anleitung',
    navFaq: 'FAQ',
    navAbout: 'Über Uns',
    
    // Instagram Giveaway Page
    igTitle: 'Instagram Gewinnspiel-Picker',
    igSubtitle: 'Wähle Gewinner aus Instagram-Kommentaren fair aus. Zeige deinen Followern die transparente Ziehung.',
    igMicroText: 'Kostenlos • Ohne Anmeldung • Von Influencern vertraut',
    igStepCopy: 'Kommentare kopieren',
    igStepPaste: 'Benutzernamen einfügen',
    igStepPick: 'Gewinner wählen!',
    igHowToCollect: 'So sammelst du Instagram-Benutzernamen',
    igStep1Title: 'Öffne deinen Beitrag',
    igStep1Desc: 'Gehe zum Gewinnspiel-Beitrag auf Instagram',
    igStep2Title: 'Benutzernamen kopieren',
    igStep2Desc: 'Wähle und kopiere @Benutzernamen aus Kommentaren',
    igStep3Title: 'Hier einfügen',
    igStep3Desc: 'Wir bereinigen und entfernen Duplikate automatisch',
    igWinnerCongrats: '🎉 Herzlichen Glückwunsch an den Gewinner! Bereit für eine weitere Runde? Perfekt für Ersatzgewinner.',
    igWhyUse: 'Warum RealWheelPicker für Instagram-Gewinnspiele nutzen?',
    igTransparent: '100% Transparent',
    igTransparentDesc: 'Zeige die Live-Ziehung',
    igUsernameFriendly: 'Benutzernamen-freundlich',
    igUsernameFriendlyDesc: 'Verarbeitet @Erwähnungen automatisch',
    igMultiWinner: 'Mehrere Gewinner',
    igMultiWinnerDesc: 'Wähle 1, 3 oder 10+ Gewinner',
    igBuildTrust: 'Vertrauen aufbauen',
    igBuildTrustDesc: 'Beweise, dass deine Ziehungen fair sind',
    igSeoTitle: 'Kostenloser Instagram Gewinnspiel-Picker',
    igSeoText1: 'Du veranstaltest ein Instagram-Gewinnspiel und musst einen Gewinner fair auswählen? Unser kostenloser Instagram-Gewinnspiel-Picker macht die Auswahl zufälliger Gewinner transparent und vertrauenswürdig.',
    igSeoText2: 'Perfekt für Instagram-Wettbewerbe, Influencer-Gewinnspiele, Markenpromotionen und Community-Belohnungen. Kein Konto erforderlich, keine Daten gespeichert.',
    
    // Random Team Selector Page
    teamTitle: 'Zufälliger Team-Selektor',
    teamSubtitle: 'Erstelle zufällige Teams, weise Aufgaben fair zu oder wähle Gruppenleiter. Perfekt für Klassenzimmer, Büros und Spiele.',
    teamMicroText: 'Kostenlos • Faire Auswahl • Funktioniert offline',
    teamStepAdd: 'Namen hinzufügen',
    teamStepSpin: 'Drehen',
    teamStepGet: 'Team erhalten!',
    teamScenarios: 'Häufige Team-Auswahlszenarien',
    teamCaptains: 'Teamkapitäne wählen',
    teamCaptainsDesc: 'Faire Kapitänswahl',
    teamProjects: 'Projektgruppen zuweisen',
    teamProjectsDesc: 'Zufällige Teambildung',
    teamPresenters: 'Präsentatoren wählen',
    teamPresentersDesc: 'Wer ist zuerst dran?',
    teamTasks: 'Aufgaben delegieren',
    teamTasksDesc: 'Unvoreingenommene Zuweisung',
    teamSelectionComplete: '✅ Auswahl abgeschlossen! Mehr Mitglieder auswählen? Entfernen und erneut drehen.',
    teamWhyRandom: 'Warum zufällige Auswahl am besten funktioniert',
    teamEliminatesBias: 'Eliminiert Voreingenommenheit',
    teamEliminatesBiasDesc: 'Keine Bevorzugung, keine Beschwerden',
    teamQuickEasy: 'Schnell & Einfach',
    teamQuickEasyDesc: 'In Sekunden erledigt',
    teamMixesUp: 'Mischt die Dinge',
    teamMixesUpDesc: 'Jedes Mal neue Kombinationen',
    teamSeoTitle: 'Kostenloser Zufälliger Team-Generator',
    teamSeoText1: 'Musst du Teammitglieder zufällig auswählen, Gruppenleiter wählen oder Aufgaben fair zuweisen? Unser kostenloser zufälliger Team-Selektor macht die Gruppenbildung schnell und unvoreingenommen.',
    teamSeoText2: 'Füge einfach Namen hinzu, lege fest, wie viele ausgewählt werden sollen, und drehe. Der Selektor verwendet kryptografisch sichere Zufallsgenerierung, um Fairness zu garantieren.',
    
    // How to Pick Winner Page
    howTitle: 'Wie man online einen zufälligen Gewinner auswählt',
    howSubtitle: 'Vollständiger Leitfaden für faire, transparente Gewinnspiele und Ziehungen',
    howReadTime: '5 Minuten Lesezeit • Schritt-für-Schritt-Anleitung',
    howWhyMatters: 'Warum zufällige Auswahl wichtig ist',
    howWhyMattersText1: 'Du veranstaltest ein Gewinnspiel oder einen Wettbewerb? Die Art, wie du Gewinner auswählst, beeinflusst direkt deine Glaubwürdigkeit.',
    howWhyMattersText2: 'Ein wirklich zufälliger, visuell transparenter Picker löst all diese Probleme.',
    howStepByStep: 'Schritt für Schritt: Wähle einen Gewinner in 60 Sekunden',
    howStep1Title: 'Sammle deine Teilnehmer',
    howStep1Text: 'Sammle Benutzernamen, E-Mails oder Namen. Für Instagram-Gewinnspiele kopiere die Kommentare direkt.',
    howStep1Tip: 'Nutze unsere "Duplikate entfernen"-Funktion, um sicherzustellen, dass jeder Teilnehmer nur einmal erscheint.',
    howStep2Title: 'Namen einfügen und konfigurieren',
    howStep2Text: 'Füge deine Liste in das Teilnehmerfeld ein. Wähle "Faire Ziehung" für gleiche Chancen oder "Benutzerdefinierte Ziehung" zum Gewichten.',
    howStep2Tip: 'Gib deiner Ziehung einen Titel wie "Sommer-Gewinnspiel 2024" für saubere Screenshots.',
    howStep3Title: 'Drehen und Gewinner erhalten',
    howStep3Text: 'Klicke auf "Rad drehen" und beobachte die animierte Auswahl. Das Rad verwendet kryptografisch sichere Zufallszahlen.',
    howStep3Tip: 'Für Livestreams, teile deinen Bildschirm während der Drehung, um Transparenz zu beweisen.',
    howStep4Title: 'Teilen und dokumentieren',
    howStep4Text: 'Kopiere das Ergebnis oder nutze den Teilen-Button. Mache einen Screenshot des Gewinners für deine Unterlagen.',
    howBestPractices: 'Best Practices für faire Gewinnspiele',
    howBestPractice1: 'Kündige immer die Auswahlmethode vor der Ziehung an',
    howBestPractice2: 'Nimm die Drehung auf oder mache einen Screenshot als Beweis',
    howBestPractice3: 'Entferne doppelte Einträge vor der Ziehung',
    howBestPractice4: 'Lege klare Teilnahmeregeln fest',
    howBestPractice5: 'Habe Ersatzgewinner bereit',
    howBestPractice6: 'Gib Gewinner öffentlich bekannt, wenn möglich',
    howWhyOnline: 'Warum einen Online-Gewinner-Picker verwenden?',
    howWhyOnlineText1: 'Manuelle Auswahl ist zeitaufwändig und wirkt voreingenommen. Tabellenformeln sind verwirrend.',
    howWhyOnlineText2: 'RealWheelPicker läuft vollständig in deinem Browser - keine Daten an Server, kein Konto erforderlich.',
    howReady: 'Bereit, deinen Gewinner auszuwählen?',
    howStartFree: 'Kostenlose Ziehung starten',
    howGiveawayPicker: 'Gewinnspiel-Picker',
    
    // SEO Pages
    seoPages: {
      'random-wheel': {
        h1: 'Zufallsrad – Drehen Sie das Rad Online',
        subtitle: 'Drehen Sie ein Zufallsrad, um sofort einen Gewinner zu wählen. Kostenlos, schnell und fair.',
      },
      'wheel-of-names': {
        h1: 'Namensrad – Wählen Sie einen Namen zufällig',
        subtitle: 'Geben Sie Namen ein, drehen Sie das Rad und lassen Sie das Schicksal entscheiden. Fair und transparent.',
      },
      'random-name-picker': {
        h1: 'Zufälliger Namenswähler – Namen fair auswählen',
        subtitle: 'Fügen Sie Ihre Liste ein und wählen Sie in Sekunden einen zufälligen Namen. Garantiert unvoreingenommen.',
      },
      'giveaway-picker': {
        h1: 'Gewinnspiel-Picker – Wählen Sie Gewinner fair',
        subtitle: 'Führen Sie transparente Gewinnspiele durch und wählen Sie Gewinner, denen Ihr Publikum vertrauen wird.',
      },
      'weighted-random-picker': {
        h1: 'Gewichteter Zufallswähler – Benutzerdefinierte Wahrscheinlichkeiten',
        subtitle: 'Weisen Sie jedem Teilnehmer unterschiedliche Chancen für fortgeschrittene Auswahlszenarien zu.',
      },
    },
    
    // Common
    loading: 'Laden...',

    // Homepage Island
    indexPageTitle: 'Glücksrad — Kostenloser Zufallsgenerator',
    indexSpinsText: 'Drehungen abgeschlossen',
    tapToSpin: 'Zum Drehen klicken',
    indexEntriesTab: 'Teilnehmer',
    indexResultsTab: 'Ergebnisse',
    indexNoResults: 'Dreht das Rad um Ergebnisse zu sehen',
    indexClearResults: 'Ergebnisse löschen',
    indexWhatIsTitle: 'Wann benutzt man das Glücksrad?',
    indexWhatIsText: 'Von Instagram-Gewinnspielen bis zu Schulaktivitäten — das Rad ist die fairste Methode, eine zufällige Entscheidung zu treffen.',
    indexHowToTitle: 'So benutzt du das Rad',
    indexHowToStep1Title: 'Einträge hinzufügen',
    indexHowToStep1Text: 'Namen einzeln eingeben, eine Liste einfügen oder eine unserer Vorlagen verwenden.',
    indexHowToStep2Title: 'Drehen klicken',
    indexHowToStep2Text: 'Drücke den "Rad drehen" Knopf und schau der farbigen Radanimation zu.',
    indexHowToStep3Title: 'Ergebnis erhalten',
    indexHowToStep3Text: 'Das Rad stoppt bei einem zufälligen Gewinner. Kopiere das Ergebnis, teile es oder drehe erneut.',
    indexWhyTitle: 'Warum unser Zufallsrad?',
    indexWhyFair: '100% Fair',
    indexWhyFairText: 'Web Crypto API — gleiche Technologie wie Online-Banking.',
    indexWhyFree: 'Völlig kostenlos',
    indexWhyFreeText: 'Keine Premiumstufen, keine Gebühren, unbegrenzte Drehungen.',
    indexWhyNoSignup: 'Keine Anmeldung',
    indexWhyNoSignupText: 'Sofort starten — kein Konto, keine E-Mail.',
    indexWhyPrivate: 'Privatsphäre zuerst',
    indexWhyPrivateText: 'Alles läuft in deinem Browser. Keine Daten gesendet.',
    indexOurTools: 'Unsere Werkzeuge',
    indexUseCaseGiveaway: '🎁 Gewinnspiele & Wettbewerbe — Wähle Gewinner aus Instagram-, TikTok- oder Discord-Kommentaren fair und transparent.',
    indexUseCaseClassroom: '🎓 Klassenzimmer & Training — Schüler zufällig für Fragen, Präsentationen oder Gruppenarbeiten auswählen.',
    indexUseCaseStandup: '🏢 Team-Meetings — Wer spricht zuerst beim täglichen Standup? Immer fair.',
    indexUseCaseParty: '🎉 Partyspiele — Wahrheit oder Pflicht, Challenges. Beliebige Optionen hinzufügen.',
    indexUseCaseDinner: '🤔 Abendessen-Entscheidung — Kann nicht entscheiden wo essen? Restaurants hinzufügen und Rad entscheiden lassen.',
    indexUseCaseTodo: '📋 Aufgabenverteilung — Haushaltsaufgaben oder Projektverantwortlichkeiten zufällig zuweisen.',
    indexUseCasePresentation: '🎮 Präsentationen — Schüler aufrufen, Redner wählen oder Reihenfolge der Präsentationen bestimmen.',
    indexValueTitle: 'Die fairste Art, einen zufälligen Gewinner zu wählen',
    indexValue1Title: 'Kryptografisch zufällig',
    indexValue1Text: 'Jede Drehung verwendet crypto.getRandomValues() — denselben Sicherheitsstandard wie Banking-Apps.',
    indexValue2Title: '100% Privat',
    indexValue2Text: 'Alles läuft in Ihrem Browser. Keine Daten werden an einen Server gesendet.',
    indexValue3Title: 'Sofort & Kostenlos',
    indexValue3Text: 'Kein Konto erforderlich. Kein Download. Funktioniert auf allen Geräten.',
    indexAllToolsTitle: 'Alle kostenlosen Tools — Keine Anmeldung erforderlich',
  },
  pt: {
    heroTitle: 'Sorteio Aleatório',
    heroSubtitle: 'Escolha um vencedor instantaneamente com chances iguais ou probabilidades personalizadas.',
    heroCta: 'Sorteio Justo ou Personalizado',
    fairDraw: 'Sorteio Aleatório Justo',
    customDraw: 'Sorteio Personalizado',
    microText: 'Grátis • Sem cadastro • Resultado instantâneo',
    stepPaste: 'Colar nomes',
    stepSpin: 'Girar',
    stepWin: 'Vencedor!',
    
    howItWorksTitle: 'Como funciona este sorteio aleatório?',
    howItWorksText: 'Digite sua lista de nomes, gire a roda e obtenha um resultado verdadeiramente aleatório. Você pode usar um sorteio justo ou personalizar as probabilidades no modo avançado. Sem cadastro. Sem truques. Resultado instantâneo.',
    
    trustIndicator1: '100% aleatoriedade no navegador',
    trustIndicator2: 'Nenhum dado armazenado',
    trustIndicator3: 'Usado mundialmente para sorteios',
    
    useCasesTitle: 'Para que você pode usar esta roda?',
    useCaseGiveaways: 'Sorteios e concursos',
    useCaseGiveawaysDesc: 'Perfeito para redes sociais',
    useCaseStreaming: 'Streaming e ao vivo',
    useCaseStreamingDesc: 'Engaje seu público',
    useCaseClassrooms: 'Salas de aula e treinamento',
    useCaseClassroomsDesc: 'Escolha alunos aleatoriamente',
    useCaseTeams: 'Decisões de equipe',
    useCaseTeamsDesc: 'Atribuição justa de tarefas',
    useCaseWeighted: 'Seleção ponderada',
    useCaseWeightedDesc: 'Probabilidades personalizadas',
    
    advancedModeExplainer: 'O modo avançado permite ajustar as chances de cada participante. As probabilidades são recalculadas automaticamente.',
    totalWeight: 'Peso total',
    totalProbability: 'Probabilidade total',
    
    seoBottomTitle: 'Roda Aleatória Grátis Online',
    seoBottomText: 'Procurando uma roda aleatória para escolher um vencedor? Nosso seletor aleatório gratuito permite girar e obter resultados instantâneos. Perfeito como roda de nomes para sorteios, salas de aula ou qualquer sorteio aleatório gratuito. Use nossa roda aleatória online sem cadastro.',
    
    drawModes: 'Modos de Sorteio',
    simpleMode: 'Sorteio Justo',
    equalProbabilities: 'Probabilidades iguais',
    uniformRandom: 'Aleatório uniforme',
    simpleModeDesc: 'Ideal para sorteios, concursos e seleções justas.',
    customMode: 'Sorteio Personalizado',
    adjustableProbabilities: 'Probabilidades ajustáveis',
    advancedMode: 'Modo avançado',
    customModeDesc: 'Personalize as chances de cada participante de acordo com seus critérios.',
    customWarning: '⚠️ No modo personalizado, as probabilidades não são iguais.',
    or: 'ou',
    
    participantList: 'Lista de Participantes',
    pastePseudos: 'Cole os nomes aqui, um por linha...',
    participant: 'participante',
    participants: 'participantes',
    clearAll: 'Limpar tudo',
    adjustProbabilities: 'Ajustar probabilidades',
    addParticipantsLeft: 'Adicione participantes à esquerda',
    addParticipantPlaceholder: 'Digite um nome e pressione Enter...',
    bulkAddPlaceholder: 'Cole sua lista aqui...\nUm nome por linha\nou separados por vírgulas',
    weight: 'Peso',
    probability: 'Probabilidade',
    adSpace: 'Espaço publicitário',
    actions: 'Ações',
    sortAZ: 'Ordenar A → Z',
    sortZA: 'Ordenar Z → A',
    shuffle: 'Embaralhar',
    onePerLine: 'Um por linha',
    commaSeparated: 'Separados por vírgulas',
    removeDuplicates: 'Remover duplicados',
    largeList: 'Lista grande',
    preview: 'Prévia',
    moreParticipants: 'mais participantes',
    
    drawTitle: 'Título do Sorteio',
    drawTitleLabel: 'Escolha o título do seu sorteio',
    drawTitlePlaceholder: 'ex., Sorteio do Instagram, Seleção de Equipe...',
    optional: 'opcional',
    
    numberOfWinners: 'Número de vencedores',
    maxWinners: 'Máx',
    
    launchDraw: 'Girar a Roda',
    drawing: 'Girando...',
    addAtLeast2: 'Adicione pelo menos 2 participantes para girar a roda',
    
    drawWinner: 'Vencedor',
    drawWinners: 'Vencedores',
    copy: 'Copiar',
    copied: 'Copiado!',
    relaunch: 'Girar Novamente',
    share: 'Compartilhar',
    copySuccess: 'Copiado!',
    copySuccessDesc: 'Resultado copiado para a área de transferência.',
    copyError: 'Erro',
    copyErrorDesc: 'Não foi possível copiar o resultado.',
    spinAgain: 'Girar Novamente',
    removeWinnerAndRespin: 'Remover Vencedor e Girar Novamente',
    removeWinnersAndRespin: 'Remover Vencedores e Girar Novamente',
    
    spinningText: 'Sorteio em andamento...',
    
    whyChoose: 'Por que escolher randompicker.com?',
    usedByCreators: 'Usado por criadores e organizadores',
    usedByCreatorsDesc: 'Streamers, influenciadores e empresas confiam em nossa ferramenta.',
    statisticalTool: 'Ferramenta de simulação estatística',
    statisticalToolDesc: 'Algoritmo de sorteio ponderado transparente e verificável.',
    noAccountRequired: 'Sem conta necessária',
    noAccountRequiredDesc: 'Use a ferramenta imediatamente, sem cadastro ou dados pessoais.',
    worksEverywhere: 'Funciona em celular e PC',
    worksEverywhereDesc: 'Interface responsiva otimizada para todos os dispositivos.',
    
    seoTitle: 'Seletor aleatório grátis online: como funciona?',
    fairDrawTitle: 'Sorteio aleatório justo',
    fairDrawText1: 'Nosso seletor aleatório grátis online utiliza um algoritmo de geração aleatória certificado para garantir resultados justos. Perfeito para seus sorteios, concursos em redes sociais ou qualquer seleção que exija um seletor aleatório confiável.',
    fairDrawText2: 'Cada participante tem exatamente as mesmas chances de ganhar no modo simples. É a ferramenta ideal para escolher um vencedor de forma transparente e verificável.',
    customDrawTitle: 'Sorteio personalizado e ponderado',
    customDrawText1: 'Precisa de um sorteio personalizado com diferentes probabilidades? Nosso modo avançado permite criar um sorteio ponderado onde cada participante pode ter chances ajustadas de acordo com seus critérios.',
    customDrawText2: 'Este recurso único é perfeito para programas de fidelidade, sistemas de recompensas baseados em engajamento ou qualquer cenário que exija ponderação estatística transparente.',
    popularUseCases: 'Casos de uso populares',
    useCase1: 'Sorteios do Instagram e TikTok',
    useCase2: 'Sorteios do Twitch e YouTube',
    useCase3: 'Concursos profissionais',
    useCase4: 'Seleção aleatória de grupos',
    useCase5: 'Atribuição justa de tarefas',
    useCase6: 'Loterias e rifas privadas',
    
    footerDisclaimer: 'Este site é uma ferramenta de simulação. Os usuários são responsáveis pelo uso e compartilhamento dos resultados. Os sorteios são gerados localmente e nenhum dado é coletado ou armazenado.',
    legalNotice: 'Aviso legal',
    privacy: 'Privacidade',
    contact: 'Contato',
    mobileBanner: 'Banner móvel',
    
    // FAQ Page
    faqTitle: 'Perguntas Frequentes',
    faqSubtitle: 'Tudo o que você precisa saber sobre nossa ferramenta de sorteio',
    faqMicroText: 'Equidade • Privacidade • Transparência',
    faqQ1: 'Este seletor aleatório é realmente justo e imparcial?',
    faqA1: 'Sim, absolutamente. Nosso seletor aleatório usa a API Web Crypto (crypto.getRandomValues), que fornece números aleatórios criptograficamente seguros. É a mesma tecnologia usada por bancos. Cada participante tem exatamente as mesmas chances no modo justo.',
    faqQ2: 'Como funciona o algoritmo de aleatoriedade?',
    faqA2: 'Usamos o gerador de números aleatórios criptográficos (CSPRNG) integrado ao seu navegador. Diferente do simples Math.random(), isso fornece verdadeira aleatoriedade baseada em fontes de entropia de hardware. Todos os cálculos são locais.',
    faqQ3: 'Meus dados estão seguros? O que vocês armazenam?',
    faqA3: 'Não armazenamos absolutamente nada em nossos servidores. Sua lista de participantes é salva apenas no armazenamento local do seu navegador. Sem cookies de rastreamento, sem coleta de dados pessoais.',
    faqQ4: 'Posso usar isso para sorteios do Instagram ou YouTube?',
    faqA4: 'Sim! Nosso seletor de sorteios é perfeito para concursos em redes sociais. Você pode colar comentários, nomes de usuário ou qualquer lista de participantes. A roda visual adiciona transparência.',
    faqQ5: 'Qual é a diferença entre os modos Justo e Personalizado?',
    faqA5: 'O modo Justo dá a todos as mesmas chances. O modo Personalizado permite atribuir diferentes pesos/probabilidades aos participantes, útil para programas de fidelidade ou recompensas.',
    faqQ6: 'Posso escolher múltiplos vencedores de uma vez?',
    faqA6: 'Sim! Defina o número de vencedores antes de girar. Para múltiplos vencedores, usamos nossa visualização de roleta de cassino com bolas numeradas.',
    faqQ7: 'Funciona em dispositivos móveis?',
    faqA7: 'Absolutamente. Nossa ferramenta é totalmente responsiva e otimizada para todos os dispositivos. As animações da roda são suaves e funcionam em todas as plataformas.',
    faqQ8: 'É grátis? Há custos ocultos?',
    faqA8: '100% grátis sem custos ocultos, sem níveis premium, sem registro necessário. Somos apoiados por anúncios não intrusivos.',
    faqCta: 'Pronto para escolher um vencedor?',
    faqCtaButton: 'Começar Seu Sorteio Grátis',
    
    // About Page
    aboutTitle: 'Sobre o RealWheelPicker',
    aboutSubtitle: 'O seletor aleatório mais confiável para sorteios justos e transparentes no mundo',
    aboutMicroText: 'Grátis • Privacidade Primeiro • Usado Globalmente',
    aboutMissionTitle: 'Nossa Missão',
    aboutMissionText1: 'Acreditamos que todos merecem acesso a uma seleção aleatória justa e imparcial. Seja você professor, streamer ou uma equipe tomando decisões, a aleatoriedade deve ser transparente, acessível e gratuita.',
    aboutMissionText2: 'O RealWheelPicker foi criado para ser o padrão ouro em sorteios online: sem contas, sem rastreamento, sem manipulação.',
    aboutValuesTitle: 'Nossos Valores',
    aboutPrivacyTitle: 'Privacidade Completa',
    aboutPrivacyText: 'Zero coleta de dados. Sem cookies. Sem rastreamento. Suas listas nunca saem do seu navegador.',
    aboutRandomnessTitle: 'Verdadeira Aleatoriedade',
    aboutRandomnessText: 'Usamos a API Web Crypto para números aleatórios criptograficamente seguros.',
    aboutAccessibilityTitle: 'Acessibilidade Global',
    aboutAccessibilityText: 'Disponível em vários idiomas, funciona em qualquer dispositivo, sem registro necessário.',
    aboutFreeTitle: 'Sempre Grátis',
    aboutFreeText: 'Sem níveis premium, sem bloqueios de recursos, sem truques de "teste grátis".',
    aboutTrustedTitle: 'Confiança Mundial',
    aboutCountries: 'Países',
    aboutDrawsMonthly: 'Sorteios Mensais',
    aboutDataStored: 'Dados Armazenados',
    aboutClientSide: 'Lado do Cliente',
    aboutWhoUsesTitle: 'Quem Usa o RealWheelPicker?',
    aboutCreators: 'Criadores de Conteúdo',
    aboutCreatorsDesc: 'Streamers, YouTubers e influenciadores fazendo sorteios transparentes',
    aboutEducators: 'Educadores',
    aboutEducatorsDesc: 'Professores que escolhem alunos de forma justa',
    aboutBusinesses: 'Empresas',
    aboutBusinessesDesc: 'Equipes tomando decisões imparciais',
    aboutCta: 'Pronto para um sorteio justo?',
    aboutCtaButton: 'Começar Seu Sorteio Grátis',
    
    // Navigation
    navExploreTools: 'Explorar Mais Ferramentas',
    navHome: 'Início',
    navRandomWheel: 'Roda Aleatória',
    navWheelOfNames: 'Roda de Nomes',
    navNamePicker: 'Seletor de Nomes',
    navGiveaway: 'Sorteio',
    navWeighted: 'Ponderado',
    navInstagram: 'Instagram',
    navTeams: 'Equipes',
    navGuide: 'Guia',
    navFaq: 'FAQ',
    navAbout: 'Sobre Nós',
    
    // Instagram Giveaway Page
    igTitle: 'Seletor de Sorteios do Instagram',
    igSubtitle: 'Escolha vencedores de sorteios dos comentários do Instagram de forma justa. Mostre aos seus seguidores o sorteio transparente.',
    igMicroText: 'Grátis • Sem cadastro • Confiável por influenciadores',
    igStepCopy: 'Copiar comentários',
    igStepPaste: 'Colar usuários',
    igStepPick: 'Escolher vencedor!',
    igHowToCollect: 'Como coletar nomes de usuário do Instagram',
    igStep1Title: 'Abra sua publicação',
    igStep1Desc: 'Vá para a publicação do sorteio no Instagram',
    igStep2Title: 'Copie os usuários',
    igStep2Desc: 'Selecione e copie @usuários dos comentários',
    igStep3Title: 'Cole aqui',
    igStep3Desc: 'Limparemos e removeremos duplicatas automaticamente',
    igWinnerCongrats: '🎉 Parabéns ao vencedor! Pronto para outra rodada? Perfeito para vencedores reserva.',
    igWhyUse: 'Por que usar RealWheelPicker para sorteios do Instagram?',
    igTransparent: '100% Transparente',
    igTransparentDesc: 'Mostre o sorteio ao vivo',
    igUsernameFriendly: 'Compatível com usuários',
    igUsernameFriendlyDesc: 'Processa @menções automaticamente',
    igMultiWinner: 'Múltiplos vencedores',
    igMultiWinnerDesc: 'Escolha 1, 3 ou mais de 10 vencedores',
    igBuildTrust: 'Construa confiança',
    igBuildTrustDesc: 'Prove que seus sorteios são justos',
    igSeoTitle: 'Seletor de Vencedores de Sorteios do Instagram Grátis',
    igSeoText1: 'Fazendo um sorteio no Instagram e precisa escolher um vencedor de forma justa? Nosso seletor de sorteios do Instagram gratuito torna a seleção de vencedores aleatórios transparente e confiável.',
    igSeoText2: 'Perfeito para seleção de vencedores de concursos do Instagram, sorteios de influenciadores, promoções de marca e recompensas da comunidade. Sem conta necessária, sem dados armazenados.',
    
    // Random Team Selector Page
    teamTitle: 'Seletor de Equipes Aleatório',
    teamSubtitle: 'Crie equipes aleatórias, atribua tarefas de forma justa ou escolha líderes de grupo. Perfeito para salas de aula, escritórios e jogos.',
    teamMicroText: 'Grátis • Seleção justa • Funciona offline',
    teamStepAdd: 'Adicionar nomes',
    teamStepSpin: 'Girar',
    teamStepGet: 'Obter equipe!',
    teamScenarios: 'Cenários comuns de seleção de equipe',
    teamCaptains: 'Escolher Capitães',
    teamCaptainsDesc: 'Seleção justa de capitão',
    teamProjects: 'Atribuir Grupos de Projeto',
    teamProjectsDesc: 'Formação aleatória de equipe',
    teamPresenters: 'Escolher Apresentadores',
    teamPresentersDesc: 'Quem vai primeiro?',
    teamTasks: 'Delegar Tarefas',
    teamTasksDesc: 'Atribuição imparcial',
    teamSelectionComplete: '✅ Seleção concluída! Precisa escolher mais membros? Remova e gire novamente.',
    teamWhyRandom: 'Por que a seleção aleatória funciona melhor',
    teamEliminatesBias: 'Elimina viés',
    teamEliminatesBiasDesc: 'Sem favoritismo, sem reclamações',
    teamQuickEasy: 'Rápido e fácil',
    teamQuickEasyDesc: 'Feito em segundos',
    teamMixesUp: 'Mistura as coisas',
    teamMixesUpDesc: 'Novas combinações toda vez',
    teamSeoTitle: 'Gerador e Seletor de Equipes Aleatórias Grátis',
    teamSeoText1: 'Precisa selecionar membros da equipe aleatoriamente, escolher líderes de grupo ou atribuir tarefas de forma justa? Nosso seletor de equipes aleatório gratuito torna a formação de grupos rápida e imparcial.',
    teamSeoText2: 'Simplesmente adicione nomes, defina quantos escolher e gire. O seletor usa geração aleatória criptograficamente segura para garantir justiça.',
    
    // How to Pick Winner Page
    howTitle: 'Como Escolher um Vencedor Aleatório Online',
    howSubtitle: 'Guia completo para realizar sorteios justos e transparentes',
    howReadTime: 'Leitura de 5 minutos • Tutorial passo a passo',
    howWhyMatters: 'Por que a seleção aleatória importa',
    howWhyMattersText1: 'Fazendo um sorteio ou concurso? A forma como você escolhe os vencedores afeta diretamente sua credibilidade.',
    howWhyMattersText2: 'Um seletor verdadeiramente aleatório e visualmente transparente resolve todos esses problemas.',
    howStepByStep: 'Passo a passo: Escolha um vencedor em 60 segundos',
    howStep1Title: 'Colete seus participantes',
    howStep1Text: 'Reúna nomes de usuário, emails ou nomes. Para sorteios do Instagram, copie os comentários diretamente.',
    howStep1Tip: 'Use nossa função "Remover duplicatas" para garantir que cada participante apareça apenas uma vez.',
    howStep2Title: 'Cole nomes e configure',
    howStep2Text: 'Cole sua lista no campo de participantes. Escolha "Sorteio Justo" para chances iguais ou "Sorteio Personalizado" para ponderar.',
    howStep2Tip: 'Dê um título ao seu sorteio como "Sorteio de Verão 2024" para capturas mais limpas.',
    howStep3Title: 'Gire e obtenha seu vencedor',
    howStep3Text: 'Clique em "Girar a Roda" e assista à seleção animada. A roda usa números aleatórios criptograficamente seguros.',
    howStep3Tip: 'Para transmissões ao vivo, compartilhe a tela do sorteio para provar transparência.',
    howStep4Title: 'Compartilhe e documente',
    howStep4Text: 'Copie o resultado ou use o botão Compartilhar. Faça uma captura do vencedor para seus registros.',
    howBestPractices: 'Melhores práticas para sorteios justos',
    howBestPractice1: 'Sempre anuncie o método de seleção antes do sorteio',
    howBestPractice2: 'Grave ou capture o sorteio como prova',
    howBestPractice3: 'Remova entradas duplicadas antes de sortear',
    howBestPractice4: 'Estabeleça regras claras de elegibilidade',
    howBestPractice5: 'Tenha vencedores reserva prontos',
    howBestPractice6: 'Anuncie os vencedores publicamente quando possível',
    howWhyOnline: 'Por que usar um seletor de vencedores online?',
    howWhyOnlineText1: 'A seleção manual é demorada e parece tendenciosa. Fórmulas de planilha são confusas.',
    howWhyOnlineText2: 'RealWheelPicker funciona inteiramente no seu navegador - sem dados enviados a servidores, sem conta necessária.',
    howReady: 'Pronto para escolher seu vencedor?',
    howStartFree: 'Começar Sorteio Grátis',
    howGiveawayPicker: 'Seletor de Sorteios',
    
    // SEO Pages
    seoPages: {
      'random-wheel': {
        h1: 'Roda Aleatória – Gire a Roda Online',
        subtitle: 'Gire uma roda aleatória para escolher um vencedor instantaneamente. Grátis, rápido e justo.',
      },
      'wheel-of-names': {
        h1: 'Roda de Nomes – Escolha um Nome Aleatório',
        subtitle: 'Insira nomes, gire a roda e deixe o destino decidir. Justo e transparente.',
      },
      'random-name-picker': {
        h1: 'Seletor de Nomes Aleatório – Selecione Nomes Justamente',
        subtitle: 'Cole sua lista e escolha um nome aleatório em segundos. Zero viés garantido.',
      },
      'giveaway-picker': {
        h1: 'Seletor de Sorteios – Escolha Vencedores Justamente',
        subtitle: 'Realize sorteios transparentes e selecione vencedores em quem seu público confiará.',
      },
      'weighted-random-picker': {
        h1: 'Seletor Aleatório Ponderado – Sorteios com Probabilidade Personalizada',
        subtitle: 'Atribua probabilidades diferentes a cada participante para cenários avançados.',
      },
    },
    
    // Common
    loading: 'Carregando...',

    // Homepage Island
    indexPageTitle: 'Roleta Aleatória — Sorteio Gratuito',
    indexSpinsText: 'sorteios concluídos',
    tapToSpin: 'Clique para girar',
    indexEntriesTab: 'Participantes',
    indexResultsTab: 'Resultados',
    indexNoResults: 'Gire a roleta para ver os resultados',
    indexClearResults: 'Limpar resultados',
    indexWhatIsTitle: 'Quando usar a roleta aleatória?',
    indexWhatIsText: 'De sorteios no Instagram a atividades em sala de aula — a roleta é a maneira mais justa de tomar uma decisão aleatória.',
    indexHowToTitle: 'Como usar a roleta',
    indexHowToStep1Title: 'Adicione suas entradas',
    indexHowToStep1Text: 'Digite nomes um a um, cole uma lista ou use um dos nossos modelos.',
    indexHowToStep2Title: 'Clique em Girar',
    indexHowToStep2Text: 'Pressione o botão "Girar a Roleta" e assista à animação colorida.',
    indexHowToStep3Title: 'Obtenha seu resultado',
    indexHowToStep3Text: 'A roleta para em um vencedor aleatório. Copie o resultado, compartilhe ou gire novamente.',
    indexWhyTitle: 'Por que usar nossa roleta aleatória?',
    indexWhyFair: '100% Justo',
    indexWhyFairText: 'API Web Crypto — mesma tecnologia do banco online.',
    indexWhyFree: 'Completamente Grátis',
    indexWhyFreeText: 'Sem níveis premium, sem taxas, sem limites de giros.',
    indexWhyNoSignup: 'Sem Cadastro',
    indexWhyNoSignupText: 'Comece instantaneamente — sem conta, sem email.',
    indexWhyPrivate: 'Privacidade em Primeiro',
    indexWhyPrivateText: 'Tudo funciona no seu navegador. Zero dados enviados.',
    indexOurTools: 'Nossas Ferramentas',
    indexUseCaseGiveaway: '🎁 Sorteios e concursos — Selecione vencedores dos comentários do Instagram, TikTok ou Discord de forma transparente.',
    indexUseCaseClassroom: '🎓 Salas de aula e treinamento — Selecione alunos aleatoriamente para perguntas, apresentações ou trabalhos em grupo.',
    indexUseCaseStandup: '🏢 Reuniões de equipe — Aleatorize quem fala primeiro nos standups diários.',
    indexUseCaseParty: '🎉 Jogos de festa — Verdade ou desafio, missões. Adicione qualquer opção.',
    indexUseCaseDinner: '🤔 Decisão do jantar — Não consegue decidir onde comer? Adicione restaurantes e deixe a roleta decidir.',
    indexUseCaseTodo: '📋 Delegação de tarefas — Atribua tarefas ou responsabilidades aleatoriamente. Sem discussões.',
    indexUseCasePresentation: '🎮 Apresentações — Chame alunos, escolha apresentadores ou decida a ordem das apresentações.',
    indexValueTitle: 'A forma mais justa de escolher um vencedor aleatório',
    indexValue1Title: 'Criptograficamente aleatório',
    indexValue1Text: 'Cada giro usa crypto.getRandomValues() — o mesmo padrão de segurança dos apps bancários.',
    indexValue2Title: '100% Privado',
    indexValue2Text: 'Tudo funciona no seu navegador. Nenhum dado é enviado a um servidor.',
    indexValue3Title: 'Instantâneo & Gratuito',
    indexValue3Text: 'Sem conta. Sem download. Funciona em qualquer dispositivo.',
    indexAllToolsTitle: 'Todas as ferramentas gratuitas — Sem cadastro',
  },
  it: {
    heroTitle: 'Estrazione Casuale',
    heroSubtitle: 'Scegli un vincitore istantaneamente con probabilità uguali o personalizzate.',
    heroCta: 'Estrazione Equa o Personalizzata',
    fairDraw: 'Estrazione Casuale Equa',
    customDraw: 'Estrazione Personalizzata',
    microText: 'Gratis • Senza registrazione • Risultato immediato',
    stepPaste: 'Incolla nomi',
    stepSpin: 'Gira',
    stepWin: 'Vincitore!',
    
    howItWorksTitle: 'Come funziona questa estrazione casuale?',
    howItWorksText: 'Inserisci la tua lista di nomi, gira la ruota e ottieni un risultato veramente casuale. Puoi usare un\'estrazione equa o personalizzare le probabilità in modalità avanzata. Senza registrazione. Senza trucchi. Risultato immediato.',
    
    trustIndicator1: '100% casualità nel browser',
    trustIndicator2: 'Nessun dato memorizzato',
    trustIndicator3: 'Usato in tutto il mondo per estrazioni',
    
    useCasesTitle: 'Per cosa puoi usare questa ruota?',
    useCaseGiveaways: 'Giveaway e concorsi',
    useCaseGiveawaysDesc: 'Perfetto per i social media',
    useCaseStreaming: 'Streaming e live',
    useCaseStreamingDesc: 'Coinvolgi il tuo pubblico',
    useCaseClassrooms: 'Classi e formazione',
    useCaseClassroomsDesc: 'Scegli studenti a caso',
    useCaseTeams: 'Decisioni di team',
    useCaseTeamsDesc: 'Assegnazione equa dei compiti',
    useCaseWeighted: 'Selezione ponderata',
    useCaseWeightedDesc: 'Probabilità personalizzate',
    
    advancedModeExplainer: 'La modalità avanzata ti permette di regolare le probabilità di ogni partecipante. Le probabilità vengono ricalcolate automaticamente.',
    totalWeight: 'Peso totale',
    totalProbability: 'Probabilità totale',
    
    seoBottomTitle: 'Ruota Casuale Gratuita Online',
    seoBottomText: 'Cerchi una ruota casuale per scegliere un vincitore? Il nostro selettore casuale gratuito ti permette di girare e ottenere risultati immediati. Perfetto come ruota dei nomi per giveaway, classi o qualsiasi estrazione casuale gratuita. Usa la nostra ruota casuale online senza registrazione.',
    
    drawModes: 'Modalità di Estrazione',
    simpleMode: 'Estrazione Equa',
    equalProbabilities: 'Probabilità uguali',
    uniformRandom: 'Casuale uniforme',
    simpleModeDesc: 'Ideale per giveaway, concorsi ed estrazioni eque.',
    customMode: 'Estrazione Personalizzata',
    adjustableProbabilities: 'Probabilità regolabili',
    advancedMode: 'Modalità avanzata',
    customModeDesc: 'Personalizza le probabilità di ogni partecipante secondo i tuoi criteri.',
    customWarning: '⚠️ In modalità personalizzata, le probabilità non sono uguali.',
    or: 'o',
    
    participantList: 'Lista Partecipanti',
    pastePseudos: 'Incolla i nomi qui, uno per riga...',
    participant: 'partecipante',
    participants: 'partecipanti',
    clearAll: 'Cancella tutto',
    adjustProbabilities: 'Regola probabilità',
    addParticipantsLeft: 'Aggiungi partecipanti a sinistra',
    addParticipantPlaceholder: 'Digita un nome e premi Invio...',
    bulkAddPlaceholder: 'Incolla la tua lista qui...\nUn nome per riga\no separati da virgole',
    weight: 'Peso',
    probability: 'Probabilità',
    adSpace: 'Spazio pubblicitario',
    actions: 'Azioni',
    sortAZ: 'Ordina A → Z',
    sortZA: 'Ordina Z → A',
    shuffle: 'Mescola',
    onePerLine: 'Uno per riga',
    commaSeparated: 'Separati da virgole',
    removeDuplicates: 'Rimuovi duplicati',
    largeList: 'Lista grande',
    preview: 'Anteprima',
    moreParticipants: 'altri partecipanti',
    
    drawTitle: 'Titolo dell\'Estrazione',
    drawTitleLabel: 'Scegli il titolo della tua estrazione',
    drawTitlePlaceholder: 'es., Giveaway Instagram, Selezione del Team...',
    optional: 'opzionale',
    
    numberOfWinners: 'Numero di vincitori',
    maxWinners: 'Max',
    
    launchDraw: 'Gira la Ruota',
    drawing: 'Estrazione in corso...',
    addAtLeast2: 'Aggiungi almeno 2 partecipanti per girare la ruota',
    
    drawWinner: 'Vincitore',
    drawWinners: 'Vincitori',
    copy: 'Copia',
    copied: 'Copiato!',
    relaunch: 'Gira di Nuovo',
    share: 'Condividi',
    copySuccess: 'Copiato!',
    copySuccessDesc: 'Risultato copiato negli appunti.',
    copyError: 'Errore',
    copyErrorDesc: 'Impossibile copiare il risultato.',
    spinAgain: 'Gira di Nuovo',
    removeWinnerAndRespin: 'Rimuovi Vincitore e Rigira',
    removeWinnersAndRespin: 'Rimuovi Vincitori e Rigira',
    
    spinningText: 'Estrazione in corso...',
    
    whyChoose: 'Perché scegliere randompicker.com?',
    usedByCreators: 'Usato da creatori e organizzatori',
    usedByCreatorsDesc: 'Streamer, influencer e aziende si fidano del nostro strumento.',
    statisticalTool: 'Strumento di simulazione statistica',
    statisticalToolDesc: 'Algoritmo di estrazione ponderata trasparente e verificabile.',
    noAccountRequired: 'Nessun account richiesto',
    noAccountRequiredDesc: 'Usa lo strumento immediatamente, senza registrazione o dati personali.',
    worksEverywhere: 'Funziona su mobile e PC',
    worksEverywhereDesc: 'Interfaccia responsive ottimizzata per tutti i dispositivi.',
    
    seoTitle: 'Selettore casuale gratuito online: come funziona?',
    fairDrawTitle: 'Estrazione casuale equa',
    fairDrawText1: 'Il nostro selettore casuale gratuito online utilizza un algoritmo di generazione casuale certificato per garantire risultati equi. Perfetto per i tuoi giveaway, concorsi sui social media o qualsiasi selezione che richieda un selettore casuale affidabile.',
    fairDrawText2: 'Ogni partecipante ha esattamente le stesse probabilità di vincere in modalità semplice. È lo strumento ideale per scegliere un vincitore in modo trasparente e verificabile.',
    customDrawTitle: 'Estrazione personalizzata e ponderata',
    customDrawText1: 'Hai bisogno di un\'estrazione personalizzata con probabilità diverse? La nostra modalità avanzata ti permette di creare un\'estrazione ponderata dove ogni partecipante può avere probabilità regolate secondo i tuoi criteri.',
    customDrawText2: 'Questa funzione unica è perfetta per programmi fedeltà, sistemi di ricompense basati sull\'engagement o qualsiasi scenario che richieda una ponderazione statistica trasparente.',
    popularUseCases: 'Casi d\'uso popolari',
    useCase1: 'Giveaway Instagram e TikTok',
    useCase2: 'Estrazioni Twitch e YouTube',
    useCase3: 'Concorsi professionali',
    useCase4: 'Selezione casuale di gruppi',
    useCase5: 'Assegnazione equa di compiti',
    useCase6: 'Lotterie e tombole private',
    
    footerDisclaimer: 'Questo sito web è uno strumento di simulazione. Gli utenti sono responsabili dell\'uso e della condivisione dei risultati. Le estrazioni sono generate localmente e nessun dato viene raccolto o memorizzato.',
    legalNotice: 'Note legali',
    privacy: 'Privacy',
    contact: 'Contatto',
    mobileBanner: 'Banner mobile',
    
    // FAQ Page
    faqTitle: 'Domande Frequenti',
    faqSubtitle: 'Tutto quello che devi sapere sul nostro strumento di estrazione casuale',
    faqMicroText: 'Equità • Privacy • Trasparenza',
    faqQ1: 'Questo selettore casuale è veramente equo e imparziale?',
    faqA1: 'Sì, assolutamente. Il nostro selettore casuale utilizza l\'API Web Crypto (crypto.getRandomValues), che fornisce numeri casuali crittograficamente sicuri. È la stessa tecnologia usata dalle banche. Ogni partecipante ha esattamente le stesse probabilità in modalità equa.',
    faqQ2: 'Come funziona l\'algoritmo di casualità?',
    faqA2: 'Utilizziamo il generatore di numeri casuali crittografici (CSPRNG) integrato nel tuo browser. A differenza del semplice Math.random(), questo fornisce vera casualità basata su fonti di entropia hardware. Tutti i calcoli sono locali.',
    faqQ3: 'I miei dati sono sicuri? Cosa memorizzate?',
    faqA3: 'Non memorizziamo assolutamente nulla sui nostri server. La tua lista di partecipanti viene salvata solo nella memoria locale del tuo browser. Nessun cookie di tracciamento, nessuna raccolta di dati personali.',
    faqQ4: 'Posso usarlo per giveaway di Instagram o YouTube?',
    faqA4: 'Sì! Il nostro selettore di giveaway è perfetto per i concorsi sui social media. Puoi incollare commenti, nomi utente o qualsiasi lista di partecipanti. La ruota visiva aggiunge trasparenza.',
    faqQ5: 'Qual è la differenza tra le modalità Equa e Personalizzata?',
    faqA5: 'La modalità Equa dà a tutti le stesse probabilità. La modalità Personalizzata ti permette di assegnare pesi/probabilità diverse ai partecipanti, utile per programmi fedeltà o ricompense.',
    faqQ6: 'Posso scegliere più vincitori contemporaneamente?',
    faqA6: 'Sì! Imposta il numero di vincitori prima di girare. Per più vincitori, utilizziamo la nostra visualizzazione della roulette del casinò con palline numerate.',
    faqQ7: 'Funziona su dispositivi mobili?',
    faqA7: 'Assolutamente. Il nostro strumento è completamente responsivo e ottimizzato per tutti i dispositivi. Le animazioni della ruota sono fluide e funzionano su tutte le piattaforme.',
    faqQ8: 'È gratis? Ci sono costi nascosti?',
    faqA8: '100% gratuito senza costi nascosti, senza livelli premium, senza registrazione richiesta. Siamo supportati da pubblicità non invasive.',
    faqCta: 'Pronto a scegliere un vincitore?',
    faqCtaButton: 'Inizia la Tua Estrazione Gratuita',
    
    // About Page
    aboutTitle: 'Informazioni su RealWheelPicker',
    aboutSubtitle: 'Il selettore casuale più affidabile per estrazioni eque e trasparenti nel mondo',
    aboutMicroText: 'Gratis • Privacy Prima • Usato Globalmente',
    aboutMissionTitle: 'La Nostra Missione',
    aboutMissionText1: 'Crediamo che tutti meritino accesso a una selezione casuale equa e imparziale. Che tu sia insegnante, streamer o un team che prende decisioni, la casualità dovrebbe essere trasparente, accessibile e gratuita.',
    aboutMissionText2: 'RealWheelPicker è stato creato per essere lo standard d\'oro nelle estrazioni online: senza account, senza tracciamento, senza manipolazione.',
    aboutValuesTitle: 'I Nostri Valori',
    aboutPrivacyTitle: 'Privacy Completa',
    aboutPrivacyText: 'Zero raccolta dati. Nessun cookie. Nessun tracciamento. Le tue liste non lasciano mai il tuo browser.',
    aboutRandomnessTitle: 'Vera Casualità',
    aboutRandomnessText: 'Utilizziamo l\'API Web Crypto per numeri casuali crittograficamente sicuri.',
    aboutAccessibilityTitle: 'Accessibilità Globale',
    aboutAccessibilityText: 'Disponibile in più lingue, funziona su qualsiasi dispositivo, nessuna registrazione richiesta.',
    aboutFreeTitle: 'Sempre Gratuito',
    aboutFreeText: 'Nessun livello premium, nessun blocco di funzionalità, nessun trucco "prova gratuita".',
    aboutTrustedTitle: 'Fiducia Mondiale',
    aboutCountries: 'Paesi',
    aboutDrawsMonthly: 'Estrazioni Mensili',
    aboutDataStored: 'Dati Memorizzati',
    aboutClientSide: 'Lato Client',
    aboutWhoUsesTitle: 'Chi Usa RealWheelPicker?',
    aboutCreators: 'Creatori di Contenuti',
    aboutCreatorsDesc: 'Streamer, YouTuber e influencer che fanno giveaway trasparenti',
    aboutEducators: 'Educatori',
    aboutEducatorsDesc: 'Insegnanti che scelgono studenti in modo equo',
    aboutBusinesses: 'Aziende',
    aboutBusinessesDesc: 'Team che prendono decisioni imparziali',
    aboutCta: 'Pronto per un\'estrazione equa?',
    aboutCtaButton: 'Inizia la Tua Estrazione Gratuita',
    
    // Navigation
    navExploreTools: 'Esplora Altri Strumenti',
    navHome: 'Home',
    navRandomWheel: 'Ruota Casuale',
    navWheelOfNames: 'Ruota dei Nomi',
    navNamePicker: 'Selettore di Nomi',
    navGiveaway: 'Giveaway',
    navWeighted: 'Ponderato',
    navInstagram: 'Instagram',
    navTeams: 'Team',
    navGuide: 'Guida',
    navFaq: 'FAQ',
    navAbout: 'Chi Siamo',
    
    // Instagram Giveaway Page
    igTitle: 'Selettore di Giveaway Instagram',
    igSubtitle: 'Scegli i vincitori dei giveaway dai commenti Instagram in modo equo. Mostra ai tuoi follower l\'estrazione trasparente.',
    igMicroText: 'Gratuito • Senza registrazione • Affidato dagli influencer',
    igStepCopy: 'Copia i commenti',
    igStepPaste: 'Incolla gli username',
    igStepPick: 'Scegli il vincitore!',
    igHowToCollect: 'Come raccogliere gli username Instagram',
    igStep1Title: 'Apri il tuo post',
    igStep1Desc: 'Vai al post del giveaway su Instagram',
    igStep2Title: 'Copia gli username',
    igStep2Desc: 'Seleziona e copia gli @username dai commenti',
    igStep3Title: 'Incolla qui',
    igStep3Desc: 'Puliremo e rimuoveremo i duplicati automaticamente',
    igWinnerCongrats: '🎉 Congratulazioni al vincitore! Pronto per un altro giro? Perfetto per vincitori di riserva.',
    igWhyUse: 'Perché usare RealWheelPicker per i giveaway Instagram?',
    igTransparent: '100% Trasparente',
    igTransparentDesc: 'Mostra l\'estrazione dal vivo',
    igUsernameFriendly: 'Compatibile con username',
    igUsernameFriendlyDesc: 'Gestisce le @menzioni automaticamente',
    igMultiWinner: 'Multi-vincitore',
    igMultiWinnerDesc: 'Scegli 1, 3 o 10+ vincitori',
    igBuildTrust: 'Costruisci fiducia',
    igBuildTrustDesc: 'Dimostra che le tue estrazioni sono eque',
    igSeoTitle: 'Selettore di Vincitori Giveaway Instagram Gratuito',
    igSeoText1: 'Stai organizzando un giveaway Instagram e devi scegliere un vincitore in modo equo? Il nostro selettore di giveaway Instagram gratuito rende la selezione dei vincitori casuali trasparente e affidabile.',
    igSeoText2: 'Perfetto per la selezione dei vincitori di concorsi Instagram, giveaway di influencer, promozioni del marchio e premi della community. Nessun account richiesto, nessun dato memorizzato.',
    
    // Random Team Selector Page
    teamTitle: 'Selettore di Team Casuale',
    teamSubtitle: 'Crea team casuali, assegna compiti equamente o scegli i capigruppo. Perfetto per aule, uffici e giochi.',
    teamMicroText: 'Gratuito • Selezione equa • Funziona offline',
    teamStepAdd: 'Aggiungi nomi',
    teamStepSpin: 'Gira',
    teamStepGet: 'Ottieni il team!',
    teamScenarios: 'Scenari comuni di selezione del team',
    teamCaptains: 'Scegli i Capitani',
    teamCaptainsDesc: 'Selezione equa del capitano',
    teamProjects: 'Assegna Gruppi di Progetto',
    teamProjectsDesc: 'Formazione casuale del team',
    teamPresenters: 'Scegli i Presentatori',
    teamPresentersDesc: 'Chi va per primo?',
    teamTasks: 'Delega Compiti',
    teamTasksDesc: 'Assegnazione imparziale',
    teamSelectionComplete: '✅ Selezione completata! Devi scegliere altri membri? Rimuovi e gira di nuovo.',
    teamWhyRandom: 'Perché la selezione casuale funziona meglio',
    teamEliminatesBias: 'Elimina i pregiudizi',
    teamEliminatesBiasDesc: 'Nessun favoritismo, nessuna lamentela',
    teamQuickEasy: 'Veloce e facile',
    teamQuickEasyDesc: 'Fatto in pochi secondi',
    teamMixesUp: 'Mescola le cose',
    teamMixesUpDesc: 'Nuove combinazioni ogni volta',
    teamSeoTitle: 'Generatore e Selettore di Team Casuale Gratuito',
    teamSeoText1: 'Devi selezionare membri del team casualmente, scegliere capigruppo o assegnare compiti equamente? Il nostro selettore di team casuale gratuito rende la formazione dei gruppi rapida e imparziale.',
    teamSeoText2: 'Aggiungi semplicemente i nomi, imposta quanti sceglierne e gira. Il selettore utilizza la generazione casuale crittograficamente sicura per garantire l\'equità.',
    
    // How to Pick Winner Page
    howTitle: 'Come Scegliere un Vincitore Casuale Online',
    howSubtitle: 'Guida completa per organizzare estrazioni eque e trasparenti',
    howReadTime: 'Lettura di 5 minuti • Tutorial passo passo',
    howWhyMatters: 'Perché la selezione casuale è importante',
    howWhyMattersText1: 'Stai organizzando un giveaway o un concorso? Il modo in cui scegli i vincitori influisce direttamente sulla tua credibilità.',
    howWhyMattersText2: 'Un selettore veramente casuale e visivamente trasparente risolve tutti questi problemi.',
    howStepByStep: 'Passo dopo passo: Scegli un vincitore in 60 secondi',
    howStep1Title: 'Raccogli i tuoi partecipanti',
    howStep1Text: 'Raccogli username, email o nomi. Per i giveaway Instagram, copia direttamente i commenti.',
    howStep1Tip: 'Usa la nostra funzione "Rimuovi duplicati" per assicurarti che ogni partecipante appaia solo una volta.',
    howStep2Title: 'Incolla nomi e configura',
    howStep2Text: 'Incolla la tua lista nel campo partecipanti. Scegli "Estrazione Equa" per probabilità uguali o "Estrazione Personalizzata" per ponderare.',
    howStep2Tip: 'Dai un titolo alla tua estrazione come "Giveaway Estate 2024" per screenshot più puliti.',
    howStep3Title: 'Gira e ottieni il vincitore',
    howStep3Text: 'Clicca su "Gira la Ruota" e guarda la selezione animata. La ruota usa numeri casuali crittograficamente sicuri.',
    howStep3Tip: 'Per le dirette, condividi lo schermo durante la girata per dimostrare la trasparenza.',
    howStep4Title: 'Condividi e documenta',
    howStep4Text: 'Copia il risultato o usa il pulsante Condividi. Fai uno screenshot del vincitore per i tuoi archivi.',
    howBestPractices: 'Migliori pratiche per estrazioni eque',
    howBestPractice1: 'Annuncia sempre il metodo di selezione prima dell\'estrazione',
    howBestPractice2: 'Registra o cattura l\'estrazione come prova',
    howBestPractice3: 'Rimuovi le voci duplicate prima dell\'estrazione',
    howBestPractice4: 'Stabilisci regole di idoneità chiare',
    howBestPractice5: 'Tieni pronti vincitori di riserva',
    howBestPractice6: 'Annuncia i vincitori pubblicamente quando possibile',
    howWhyOnline: 'Perché usare un selettore di vincitori online?',
    howWhyOnlineText1: 'La selezione manuale richiede tempo e sembra parziale. Le formule del foglio di calcolo sono confuse.',
    howWhyOnlineText2: 'RealWheelPicker funziona interamente nel tuo browser - nessun dato inviato ai server, nessun account richiesto.',
    howReady: 'Pronto a scegliere il tuo vincitore?',
    howStartFree: 'Inizia Estrazione Gratuita',
    howGiveawayPicker: 'Selettore di Giveaway',
    
    // SEO Pages
    seoPages: {
      'random-wheel': {
        h1: 'Ruota Casuale – Gira la Ruota Online',
        subtitle: 'Gira una ruota casuale per scegliere un vincitore istantaneamente. Gratis, veloce e equo.',
      },
      'wheel-of-names': {
        h1: 'Ruota dei Nomi – Scegli un Nome a Caso',
        subtitle: 'Inserisci nomi, gira la ruota e lascia che il destino decida. Equo e trasparente.',
      },
      'random-name-picker': {
        h1: 'Selettore di Nomi Casuale – Seleziona Nomi Equamente',
        subtitle: 'Incolla la tua lista e scegli un nome casuale in pochi secondi. Zero pregiudizi garantiti.',
      },
      'giveaway-picker': {
        h1: 'Selettore di Giveaway – Scegli i Vincitori Equamente',
        subtitle: 'Organizza giveaway trasparenti e seleziona vincitori di cui il tuo pubblico si fiderà.',
      },
      'weighted-random-picker': {
        h1: 'Selettore Casuale Ponderato – Estrazioni a Probabilità Personalizzata',
        subtitle: 'Assegna probabilità diverse a ogni partecipante per scenari di selezione avanzati.',
      },
    },
    
    // Common
    loading: 'Caricamento...',

    // Homepage Island
    indexPageTitle: 'Ruota della Fortuna — Sorteggio Gratuito',
    indexSpinsText: 'giri completati',
    tapToSpin: 'Clicca per girare',
    indexEntriesTab: 'Partecipanti',
    indexResultsTab: 'Risultati',
    indexNoResults: 'Gira la ruota per vedere i risultati',
    indexClearResults: 'Cancella risultati',
    indexWhatIsTitle: 'Quando usare la ruota della fortuna?',
    indexWhatIsText: 'Dai giveaway su Instagram alle attività in classe — la ruota è il modo più equo per prendere una decisione casuale.',
    indexHowToTitle: 'Come usare la ruota',
    indexHowToStep1Title: 'Aggiungi le tue voci',
    indexHowToStep1Text: 'Digita i nomi uno per uno, incolla una lista o usa uno dei nostri modelli.',
    indexHowToStep2Title: 'Clicca su Gira',
    indexHowToStep2Text: 'Premi il pulsante "Gira la Ruota" e guarda l\'animazione colorata.',
    indexHowToStep3Title: 'Ottieni il tuo risultato',
    indexHowToStep3Text: 'La ruota si ferma su un vincitore casuale. Copia il risultato, condividilo o gira di nuovo.',
    indexWhyTitle: 'Perché usare la nostra ruota casuale?',
    indexWhyFair: '100% Equo',
    indexWhyFairText: 'API Web Crypto — stessa tecnologia del banking online.',
    indexWhyFree: 'Completamente Gratuito',
    indexWhyFreeText: 'Nessun livello premium, nessuna tariffa, giri illimitati.',
    indexWhyNoSignup: 'Nessuna Registrazione',
    indexWhyNoSignupText: 'Inizia immediatamente — nessun account, nessuna email.',
    indexWhyPrivate: 'Privacy Prima di Tutto',
    indexWhyPrivateText: 'Tutto funziona nel tuo browser. Zero dati inviati.',
    indexOurTools: 'I Nostri Strumenti',
    indexUseCaseGiveaway: '🎁 Giveaway e concorsi — Seleziona i vincitori dai commenti Instagram, TikTok o Discord in modo trasparente.',
    indexUseCaseClassroom: '🎓 Aule e formazione — Seleziona gli studenti casualmente per domande, presentazioni o lavori di gruppo.',
    indexUseCaseStandup: '🏢 Riunioni di team — Randomizza chi parla per primo nei daily standup.',
    indexUseCaseParty: '🎉 Giochi di festa — Verità o sfida, missioni. Aggiungi qualsiasi opzione.',
    indexUseCaseDinner: '🤔 Decisione cena — Non riesci a decidere dove mangiare? Aggiungi ristoranti e lascia che la ruota decida.',
    indexUseCaseTodo: '📋 Delegazione compiti — Assegna compiti o responsabilità casualmente. Senza discussioni.',
    indexUseCasePresentation: '🎮 Presentazioni — Chiama studenti, scegli oratori o decidi l\'ordine delle presentazioni.',
    indexValueTitle: 'Il modo più equo per scegliere un vincitore casuale',
    indexValue1Title: 'Casuale crittograficamente',
    indexValue1Text: 'Ogni giro usa crypto.getRandomValues() — lo stesso standard di sicurezza delle app bancarie.',
    indexValue2Title: '100% Privato',
    indexValue2Text: 'Tutto funziona nel tuo browser. Nessun dato viene inviato a un server.',
    indexValue3Title: 'Istantaneo & Gratuito',
    indexValue3Text: 'Nessun account. Nessun download. Funziona su qualsiasi dispositivo.',
    indexAllToolsTitle: 'Tutti gli strumenti gratuiti — Nessuna registrazione',
  },
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  it: 'Italiano',
};

export const languageFlags: Record<Language, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  pt: '🇵🇹',
  it: '🇮🇹',
};
