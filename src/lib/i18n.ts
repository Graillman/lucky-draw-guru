export type Language = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it';

export interface SEOPageTranslations {
  h1: string;
  subtitle: string;
  microText?: string;
  howItWorksTitle?: string;
  howItWorksText?: string;
  whenToUseTitle?: string;
  useCases?: Array<{ title: string; description: string }>;
  seoTitle?: string;
  seoText?: string;
  faqs?: Array<{ question: string; answer: string }>;
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
  seoPages: Record<string, SEOPageTranslations>;
  preparingWheel: string;
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
  localStorageSaved: string;
  footerTools: string;
  footerGiveaways: string;
  footerResources: string;
  footerTagline: string;
  footerAllRights: string;

  // Spin the Bottle
  bottleAddPlayer: string;
  bottleSpin: string;
  bottleSpinning: string;
  bottlePlayers: string;
  bottleHistory: string;
  bottleResult: string;
  bottleMinPlayers: string;
  bottleClearHistory: string;
  
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
  navBlog: string;
  navGallery: string;
  navFullscreen: string;

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

  // Toolbar buttons
  toolbarCustomize: string;
  toolbarSave: string;
  toolbarSaving: string;
  toolbarAddImage: string;
  toolbarChangeImage: string;

  // Customize Panel
  customizeTitle: string;
  customizeTabAppearance: string;
  customizeTabDuringSpin: string;
  customizeTabAfterSpin: string;
  customizeColorTheme: string;
  customizeBorder: string;
  customizeTickSound: string;
  customizeTickSoundDesc: string;
  customizeTickVolume: string;
  customizeTickStyle: string;
  customizeSilent: string;
  customizeLoud: string;
  customizeSpinDuration: string;
  customizeVictorySound: string;
  customizeVictorySoundDesc: string;
  customizeVictoryVolume: string;
  customizeConfetti: string;
  customizeConfettiDesc: string;
  customizeShowRemove: string;
  customizeShowRemoveDesc: string;
  customizeReset: string;
  customizeDone: string;
  // Winner Modal
  winnerModalTitle: string;
  winnerModalClose: string;
  winnerModalRemove: string;
  // Multi-wheel
  clickToSpin: string;
  clickToSpinSub: string;
  addWheel: string;
  removeWheel: string;
  wheelPrefix: string;

  // Next Tool Suggestion
  nextToolTryAlso: string;
  nextToolYesNo: string;
  nextToolTeam: string;
  nextToolNumber: string;
  nextToolGiveaway: string;
  nextToolClassroom: string;

  // Toast messages
  toastLinkCopied: string;
  toastLinkCopiedDesc: string;
  toastCopyFailed: string;
  toastWheelSaved: string;
  toastGalleryCopied: string;
  toastSaveFailed: string;

  // Trust signals below wheel
  indexTrustFree: string;
  indexTrustNoSignup: string;
  indexTrustCrypto: string;

  // Tool page section labels
  faqsTitle: string;
  relatedBlogPostLabel: string;

  // Blog page
  blogSubtitle: string;
  blogFeatured: string;
  blogReadGuide: string;
  blogRead: string;
  blogTryTools: string;
  blogTagGiveaways: string;
  blogTagEducation: string;
  blogTagTeams: string;
  blogTagTools: string;
  blogTagIdeas: string;
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
    localStorageSaved: 'Your list is saved locally in your browser.',
    footerTools: 'Tools',
    footerGiveaways: 'Giveaways',
    footerResources: 'Resources',
    footerTagline: '— Free Spin the Wheel Tool',
    footerAllRights: 'All rights reserved.',
    bottleAddPlayer: 'Add a player...',
    bottleSpin: '🍾 Spin the Bottle',
    bottleSpinning: '🍾 Spinning...',
    bottlePlayers: 'Players',
    bottleHistory: 'History',
    bottleResult: 'The bottle chose:',
    bottleMinPlayers: 'Add at least 2 players',
    bottleClearHistory: 'Clear',

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
    navBlog: 'Blog',
    navGallery: 'Gallery',
    navFullscreen: 'Fullscreen',

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
      'random-wheel': { h1: 'Random Wheel Picker – Spin the Wheel Online', subtitle: 'Spin a random wheel to pick a winner instantly. Free, fast and fair.', microText: 'Free • No signup • Instant result', howItWorksTitle: 'How does this random wheel work?', howItWorksText: 'Enter any names or options — type them in, paste a list, or load a template. Hit the Spin button and watch the wheel rotate with a smooth animation.', whenToUseTitle: 'When should you use a random wheel?', useCases: [{title:'Social Media Giveaways',description:"Pick winners fairly for Instagram & TikTok contests"},{title:'Live Stream Draws',description:"Engage viewers with real-time spinning on Twitch/YouTube"},{title:'Classroom Activities',description:"Select students randomly for questions or tasks"},{title:'Team Decisions',description:"Assign tasks or pick who goes first"},{title:'Party Games',description:"Add excitement to any gathering"}], seoTitle: 'Free Online Random Wheel Picker — Spin to Decide', seoText: `Our free random wheel picker is the fastest way to make unbiased decisions online. Add any options you want — names, tasks, prizes, yes/no, colors, anything — and spin the wheel to get an instant random result. No account required, no ads blocking the wheel, no limit on spins.\n\n<strong class="text-foreground">What makes our random wheel different?</strong>\n<ul class="list-disc pl-5 mt-2 space-y-1">\n<li><strong class="text-foreground">Crypto-grade randomness.</strong> We use <code>crypto.getRandomValues()</code> for every spin. This is not a basic Math.random() — it's the same cryptographic RNG used in TLS, encryption keys, and blockchain. Your result cannot be predicted or manipulated.</li>\n<li><strong class="text-foreground">Visual and screen-recordable.</strong> The spinning animation is smooth and clear, making it ideal for recording your draw as proof of fairness. Post the clip to Instagram Stories, TikTok, or your Discord server.</li>\n<li><strong class="text-foreground">Shareable pre-loaded wheels.</strong> Click the share icon to copy a URL that opens the wheel with your entries already set. No exporting, no extra steps.</li>\n<li><strong class="text-foreground">Multiple winners support.</strong> Need to pick 3 prize winners? Use the winner count selector and spin once — the wheel picks them sequentially, each from the remaining pool.</li>\n</ul>\n\n<strong class="text-foreground">Popular uses for a random wheel</strong>\nGiveaways and contest draws, classroom random student pickers, team standup order, office lunch deciders, party game starters, Dungeons & Dragons random encounter tables, workout challenge wheels, and anything else where you want a fair, visually engaging random decision.\n\nFor weighted draws where some entries have higher odds, see our <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted random picker</a>. For social media giveaways with comment filtering, see our <a href="/social-giveaway" class="text-primary underline hover:no-underline">social giveaway picker</a>.`, faqs: [{question:"Can I add any type of content to the random wheel?",answer:"Yes. You can add names, words, numbers, emojis, short phrases — anything up to about 30 characters per entry displays well on the wheel. There is no restriction on what the entries represent."},{question:"How do I share my random wheel with someone?",answer:"Click the share icon next to the draw title. A unique URL is copied to your clipboard. Anyone who opens that link will see the wheel pre-loaded with your exact entries. No account needed on either end."},{question:"Is there a limit on how many options I can add?",answer:"No hard limit. The wheel renders clearly up to about 50 options. For larger lists, segments become smaller but the random selection is not affected. For very large lists, a text list view is often clearer."},{question:"Can I use the random wheel offline?",answer:"Yes — once the page is loaded in your browser, spinning works without an internet connection. The randomness runs locally via your browser's crypto API, not a server."}] },
      'wheel-of-names': { h1: 'Wheel of Names – Pick a Random Name Instantly', subtitle: 'Enter names, spin the wheel, and let fate decide. Fair and transparent.', microText: 'Free • No signup • Instant result', howItWorksTitle: 'How does this wheel of names work?', howItWorksText: 'Simply paste your list of names, click spin, and watch the wheel rotate until it lands on a randomly selected name.', whenToUseTitle: 'When should you use a wheel of names?', useCases: [{title:'Contest Winners',description:"Select giveaway winners transparently"},{title:'Student Selection',description:"Pick students for presentations or activities"},{title:'Meeting Facilitator',description:"Choose who leads the next meeting"},{title:'Raffle Draws',description:"Run fair raffles and lotteries"},{title:'Secret Santa',description:"Randomly assign gift recipients"}], seoTitle: 'Free Wheel of Names Online', seoText: "Need a wheel of names to pick someone randomly? Our free online wheel of names makes it easy to select a random name from your list. Perfect as a random name picker for classrooms, offices, or giveaways. Just enter names, spin the colorful wheel, and get an instant random result. This free wheel of names tool requires no account - it's the fastest way to pick a winner fairly and transparently." },
      'random-name-picker': { h1: 'Random Name Picker – Select Names Fairly', subtitle: 'Paste your list and pick a random name in seconds. Zero bias guaranteed.', microText: 'Free • No signup • Instant result', howItWorksTitle: 'How does this random name picker work?', howItWorksText: 'Add names to your list, hit the Spin button and watch the wheel rotate until it lands on a randomly chosen name.', whenToUseTitle: 'When should you use a random name picker?', useCases: [{title:'Giveaway Selection',description:"Pick winners from contest entries"},{title:'Classroom Picker',description:"Call on students randomly"},{title:'Team Assignments',description:"Distribute tasks fairly"},{title:'Stream Interactions',description:"Select viewers for rewards"},{title:'Prize Draws',description:"Run transparent prize selections"}], seoTitle: 'Free Random Name Picker Online — No Signup Required', seoText: `Looking for a random name picker that is fast, fair, and completely free? Our online random name picker lets you add any list of names and pick one or more at random with a visual spinning wheel. There is no account, no app to install, and no limit on how many names you can add or how many times you spin.\n\n<strong class="text-foreground">Who uses our random name picker?</strong>\n<ul class="list-disc pl-5 mt-2 space-y-1">\n<li><strong class="text-foreground">Teachers and educators</strong> use it to call on students fairly, assign classroom roles, or pick who presents next. A random name picker for classroom use removes any perception of favoritism.</li>\n<li><strong class="text-foreground">Content creators and streamers</strong> pick random viewers for giveaways, shoutouts, or game invites live on Twitch, YouTube, or TikTok. Spinning the wheel on screen proves the selection is random.</li>\n<li><strong class="text-foreground">HR teams and managers</strong> use it to assign tasks, decide meeting order, or run office raffles without bias.</li>\n<li><strong class="text-foreground">Party hosts</strong> pick who goes first in games, who answers the dare, or who selects the next song.</li>\n</ul>\n\n<strong class="text-foreground">Privacy and fairness</strong>\nEvery spin uses <code>crypto.getRandomValues()</code> — a cryptographically secure RNG built into every modern browser. The result is not predictable, not reproducible, and not influenced by us. Your list of names never leaves your device. When you close the tab, everything is gone.\n\n<strong class="text-foreground">Need more than a simple picker?</strong>\nTry our <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted random picker</a> if some participants deserve higher odds (e.g., for loyalty programs or multi-ticket raffles). For social media giveaways, our <a href="/social-giveaway" class="text-primary underline hover:no-underline">social giveaway picker</a> lets you paste raw Instagram or TikTok comments and filter by keyword, tags, and duplicates before spinning.`, faqs: [{question:"How many names can I add to the random name picker?",answer:"There is no hard limit. The wheel renders clearly up to about 50 names. Beyond that, names get smaller but the randomness is not affected. For very large lists (500+ names), consider using the textarea bulk-paste mode."},{question:"Can I pick multiple winners at once?",answer:"Yes. Use the winners count selector to pick 2, 3, or more winners in a single spin. Each winner is selected from the remaining pool so no name is chosen twice in the same draw."},{question:"Is the random name picker truly random?",answer:"Yes. We use crypto.getRandomValues(), the same cryptographically secure API used in encryption and online banking. The result is not predictable before the spin, and we never influence or record any selection."},{question:"Can I remove a name after it wins so it can't win again?",answer:"Yes. After a winner is announced, a 'Remove winner & spin again' button appears. Click it and the winner is removed from the wheel before the next draw starts automatically."}] },
      'giveaway-picker': { h1: 'Giveaway Picker – Pick Contest Winners Fairly', subtitle: 'Run transparent giveaways and select winners your audience will trust.', microText: 'Free • No signup • Instant result', howItWorksTitle: 'How does this giveaway picker work?', howItWorksText: 'Paste your list of participants or usernames, spin the wheel, and let the random selection pick your winner. Screen-record the spin for proof of transparency.', whenToUseTitle: 'When should you use a giveaway picker?', useCases: [{title:'Instagram Giveaways',description:"Pick winners from comments or followers"},{title:'YouTube/Twitch Contests',description:"Select subscribers live on stream"},{title:'Brand Promotions',description:"Run marketing giveaways professionally"},{title:'Multiple Winners',description:"Select 1, 5, or 10+ winners at once"},{title:'Community Events',description:"Reward engaged community members"}], seoTitle: 'Free Giveaway Picker — Pick Winners Transparently', seoText: `Need a giveaway picker your audience will trust? Our free visual giveaway picker lets you paste a list of entries, spin a colorful wheel, and select one or more random winners in seconds. Screen-recording the spin is the fastest way to prove your contest was fair.\n\n<strong class="text-foreground">How to run a giveaway with our picker</strong>\n<ol class="list-decimal pl-5 mt-2 space-y-1">\n<li>Collect your entries: copy comments from Instagram, TikTok, or YouTube, or paste usernames from your spreadsheet.</li>\n<li>Paste them into the wheel — one per line.</li>\n<li>Set the number of winners (1 to 10+).</li>\n<li>Click Spin, screen-record the result.</li>\n<li>Post the clip and announce the winner.</li>\n</ol>\n\n<strong class="text-foreground">Why transparent giveaways matter</strong>\nAudiences are increasingly skeptical of "random" winner selections. A visual, screen-recorded wheel spin is the gold standard for proving fairness. Unlike screenshot-based picks or private tools, our spinning wheel shows the entire participant list and the live animation — there is nothing to hide and nothing can be faked after the fact.\n\n<strong class="text-foreground">Advanced giveaway scenarios</strong>\nFor Instagram or TikTok giveaways where you need to filter comments by keyword (e.g., "ENTER"), remove duplicate usernames, or exclude suspicious bot accounts, use our <a href="/social-giveaway" class="text-primary underline hover:no-underline">social giveaway picker</a> — it parses raw copied comments automatically. For raffles where some participants have multiple tickets, our <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted random picker</a> lets you assign custom odds per person. Need a step-by-step walkthrough? Read our <a href="/how-to-pick-a-random-winner" class="text-primary underline hover:no-underline">guide on picking random winners fairly</a>.`, faqs: [{question:"Can I use this for Instagram giveaway winner selection?",answer:"Yes. Paste your Instagram comment usernames into the wheel and spin. For automatic comment parsing with keyword and tag filters, use our dedicated Social Giveaway Picker which handles raw Instagram comment formats."},{question:"How do I pick multiple winners?",answer:"Use the winners count selector above the wheel. Set it to 2, 3, or more and a single spin will select that many winners in sequence, each from the remaining pool so no one wins twice."},{question:"Can I screen-record the giveaway spin as proof?",answer:"Yes — that's one of the main use cases. The wheel animation is designed to be clear and visually engaging on recordings. Use your platform's built-in screen recorder or tools like OBS to capture the spin and post it as proof."},{question:"Is this giveaway picker accepted as proof of fairness on social media?",answer:"Most platforms do not have official requirements for how winners are selected, as long as the process is not fraudulent. A screen-recorded visual wheel spin is widely accepted by audiences as proof of a fair draw."}] },
      'weighted-random-picker': { h1: 'Weighted Random Picker – Custom Probability Draws', subtitle: 'Assign different chances to each participant for advanced selection scenarios.', microText: 'Free • No signup • Instant result', howItWorksTitle: 'How does the weighted random picker work?', howItWorksText: 'Add participants and assign each a weight (higher = more chances). The wheel sizes are proportional to the weights, making it visually clear who has more chances.', whenToUseTitle: 'When should you use a weighted random picker?', useCases: [{title:'Loyalty Programs',description:"Reward frequent customers with better odds"},{title:'Subscriber Tiers',description:"Higher chances for loyal supporters"},{title:'Team Contributions',description:"Weight selection by effort or seniority"},{title:'Engagement Rewards',description:"More entries for more engagement"},{title:'Game Mechanics',description:"Create balanced random encounters"}], seoTitle: 'Free Weighted Random Picker Online', seoText: "Need a weighted random picker where some participants have better chances? Our free weighted draw tool lets you assign custom probabilities to each entry. Perfect for loyalty programs, tiered giveaways, and engagement-based rewards. Unlike regular random pickers, this weighted picker calculates and displays exact odds - maintaining transparency while allowing customization. Advanced random selection with no signup required. How Weighted Probability Works: The formula is simple — Probability = (Your Weight ÷ Total Weight) × 100. Example: with weights of 2, 1, 1, the probabilities are 50%, 25%, 25%. With 5, 3, 2 the probabilities are 50%, 30%, 20%. The wheel segment sizes match these percentages exactly — what you see is the actual probability. No hidden weighting, no algorithmic surprises. For raffles where one person bought multiple tickets, just assign them a weight equal to their ticket count. For loyalty programs, weight by purchase frequency. The math is transparent and verifiable." },
      'yes-or-no-wheel': { h1: 'Yes or No Wheel – Let the Wheel Decide', subtitle: "Can't make up your mind? Spin the yes or no wheel for an instant answer.", microText: 'Free • No account • Instant answer', howItWorksTitle: 'How does the yes or no wheel work?', howItWorksText: "Just click Spin and let the wheel decide between Yes and No. It uses cryptographically secure randomness — neither option is favored. You can add more options like 'Maybe' if needed.", whenToUseTitle: 'When should you use a Yes or No wheel?', useCases: [{title:'Daily Decisions',description:"Break the indecision loop instantly"},{title:'Group Debates',description:"Let the wheel settle arguments"},{title:'Party Games',description:"Add a random element to game nights"},{title:'Classroom Fun',description:"Make random yes/no choices engaging"},{title:'Challenges',description:"Accept or skip challenges randomly"}], seoTitle: 'Free Yes or No Wheel Online', seoText: "Can't make up your mind? Spin our free Yes or No wheel and let fate decide. This simple random decision maker is perfect for breaking indecision loops, settling debates, or adding fun to game nights. Unlike a coin flip, you can customize the wheel with more options like 'Maybe' or 'Later'. Free, instant, no signup required — just spin and go." },
      'team-generator': { h1: 'Random Team Generator – Fair Team Splits', subtitle: 'Divide your group into balanced, random teams instantly.', microText: 'Free • No signup • Instant result', howItWorksTitle: 'How does the team generator work?', howItWorksText: 'Add participant names, set the number of teams or team size, and spin. The tool randomly assigns participants to teams using cryptographic randomness for fair splits.', whenToUseTitle: 'When should you use a team generator?', useCases: [{title:'Sports & Games',description:"Create balanced teams for any sport"},{title:'School Projects',description:"Assign students to project groups fairly"},{title:'Team Building',description:"Mix departments for corporate activities"},{title:'Tournaments',description:"Seed brackets and draw groups randomly"},{title:'Party Games',description:"Split guests into teams for party activities"}], seoTitle: 'Free Random Team Generator Online', seoText: "Need to split people into teams quickly and fairly? Our free team generator randomly divides your list into balanced groups. Whether you're organizing a sports day, school project, or team-building activity, this random team selector ensures no bias and equal distribution. Just paste names, set the number of teams, and generate instantly. No account required." },
      'random-number-generator': { h1: 'Random Number Generator – Pick a Number Instantly', subtitle: 'Generate truly random numbers in any range. No patterns, no bias.', microText: 'Free • No account • Instant result', howItWorksTitle: 'How does this random number generator work?', howItWorksText: "Set your range (min and max), click spin, and get a cryptographically random number. Uses the Web Crypto API for true randomness — not predictable Math.random().", whenToUseTitle: 'When should you use a random number generator?', useCases: [{title:'Lottery Draws',description:"Pick winning lottery or raffle numbers"},{title:'Game Mechanics',description:"Roll dice, generate random stats"},{title:'Teaching Math',description:"Create random number exercises"},{title:'Order Selection',description:"Who presents first? Pick a number"},{title:'Prize Draws',description:"Assign prizes to random ticket numbers"}], seoTitle: 'Free Random Number Generator Online', seoText: "Need to generate a random number? Our free random number generator creates cryptographically secure numbers between any range you define. Perfect for lottery draws, game mechanics, teaching, or any situation requiring unbiased random numbers. No patterns, no predictability — just pure randomness powered by the Web Crypto API. Free and instant with no signup required." },
      'party-wheel': { h1: 'Party Wheel – Fun Random Challenges & Dares', subtitle: 'Spin the party wheel for random challenges, tasks, and dares. Perfect for game nights.', microText: 'Free • No signup • Instant fun', howItWorksTitle: 'How does the party wheel work?', howItWorksText: 'Load the wheel with party challenges, dares, or tasks, then spin to randomly assign them. You can use the pre-loaded party options or customize with your own challenges.', whenToUseTitle: 'When should you use a party wheel?', useCases: [{title:'Game Nights',description:"Add random challenges to board games"},{title:'Group Activities',description:"Assign random tasks to party guests"},{title:'Party Forfeits',description:"Spin for dares and forfeits"},{title:'Competitions',description:"Random prizes or challenge assignments"},{title:'Icebreakers',description:"Fun random prompts to start conversations"}], seoTitle: 'Free Party Wheel for Game Nights', seoText: "Make any party or game night more exciting with our free party wheel. Spin to randomly assign challenges, dares, tasks, or prizes. Customize it with your own party ideas or use our pre-loaded options. Whether you're hosting a house party, office event, or birthday celebration, the party wheel adds an unpredictable element that keeps everyone engaged. Free, instant, no account required." },
      'classroom-picker': { h1: 'Classroom Picker – Randomly Select Students', subtitle: 'Pick students randomly for questions, tasks, and activities. Fair and stress-free.', microText: 'Free • No signup • Instant result', howItWorksTitle: 'How does this classroom picker work?', howItWorksText: "Add your students' names to the list and click spin. The wheel randomly selects a student, ensuring every student has a fair and equal chance of being chosen.", whenToUseTitle: 'When should you use a classroom picker?', useCases: [{title:'Q&A Sessions',description:"Randomly pick students to answer questions"},{title:'Group Projects',description:"Assign students to project groups fairly"},{title:'Presentations',description:"Random presentation order selection"},{title:'Class Rewards',description:"Pick random students for prizes or recognition"},{title:'Role Assignment',description:"Assign roles and tasks randomly"}], seoTitle: 'Free Classroom Student Picker', seoText: "Our free classroom picker helps teachers randomly select students without bias or repetition. Just enter your class list and spin the wheel — perfect for cold-calling, presentation order, group formation, or any classroom activity. Students appreciate the fairness of random selection, and teachers love how quick and easy it is. No account, no setup — just paste names and spin." },
      'secret-santa-picker': { h1: 'Secret Santa Picker – Assign Gift-Givers Randomly', subtitle: 'Organize your Secret Santa gift exchange in seconds. Fair, anonymous, and fun.', microText: 'Free • No signup • Instant result', howItWorksTitle: 'How does the Secret Santa picker work?', howItWorksText: "Add participants' names, click spin, and the wheel assigns each person a random gift recipient. Everyone gets assigned someone to buy for, completely at random.", whenToUseTitle: 'When should you use a Secret Santa picker?', useCases: [{title:'Office Parties',description:"Anonymous gift exchange at work"},{title:'Friend Groups',description:"Fair random assignment among friends"},{title:'Family Events',description:"Holiday gift exchanges for large families"},{title:'Online Events',description:"Remote or virtual Secret Santa games"},{title:'School Events',description:"Classroom gift exchange activities"}], seoTitle: 'Free Secret Santa Picker Online', seoText: "Organize your Secret Santa gift exchange in seconds with our free picker. Enter all participant names, spin the wheel, and randomly assign gift pairs. No account, no email required — everything runs in your browser for complete privacy. Perfect for office parties, friend groups, and family holiday events. Each assignment is cryptographically random, ensuring a truly fair and anonymous Secret Santa draw." },
      'raffle-picker': { h1: 'Raffle Picker – Pick Random Raffle Winners', subtitle: 'Run fair raffle draws and pick winners at random. Transparent and trustworthy.', microText: 'Free • No signup • Instant result', howItWorksTitle: 'How does this raffle picker work?', howItWorksText: 'Enter your raffle tickets or participant names, spin the wheel, and the random selection picks your winner. You can pick multiple winners for multiple prizes.', whenToUseTitle: 'When should you use a raffle picker?', useCases: [{title:'Fundraising Events',description:"Draw raffle winners at charity events"},{title:'Prize Giveaways',description:"Select prize winners from tickets"},{title:'Community Raffles',description:"Fair draws for club or association members"},{title:'Live Events',description:"Spin on screen for full transparency"},{title:'Online Raffles',description:"Digital raffle draws for virtual events"}], seoTitle: 'Free Online Raffle Picker', seoText: `Need a raffle picker for your event or fundraiser? Our free online raffle picker makes drawing winners transparent, fair, and exciting. Add participant names or ticket numbers, set the number of winners, and spin the wheel live. The cryptographically random selection ensures no manipulation is possible. Perfect for charity events, school fundraisers, and community raffles. No account required. Need weighted odds for participants with multiple raffle tickets? Our <a href="/weighted-random-picker" class="text-primary underline hover:no-underline">weighted random picker</a> lets you assign different probabilities to each participant.` },
    },
    preparingWheel: 'Preparing wheel...',

    // Common
    loading: 'Loading...',

    // Homepage Island
    indexPageTitle: 'Spin the Wheel — Free Random Picker',
    indexSpinsText: 'spins since the start of the year',
    tapToSpin: 'PRESS to spin the wheel!',
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
    toolbarCustomize: 'Customize',
    toolbarSave: 'Save',
    toolbarSaving: 'Saving…',
    toolbarAddImage: 'Add image',
    toolbarChangeImage: 'Change image',
    customizeTitle: 'Customize Wheel',
    customizeTabAppearance: 'Appearance',
    customizeTabDuringSpin: 'During Spin',
    customizeTabAfterSpin: 'After Spin',
    customizeColorTheme: 'Color theme',
    customizeBorder: 'Wheel border',
    customizeTickSound: 'Tick sound',
    customizeTickSoundDesc: 'Play a click sound as the wheel passes each segment',
    customizeTickVolume: 'Tick volume',
    customizeTickStyle: 'Tick sound style',
    customizeSilent: 'Silent',
    customizeLoud: 'Loud',
    customizeSpinDuration: 'Spin duration',
    customizeVictorySound: 'Victory sound',
    customizeVictorySoundDesc: 'Play a fanfare when the winner is revealed',
    customizeVictoryVolume: 'Victory volume',
    customizeConfetti: 'Confetti',
    customizeConfettiDesc: 'Launch a confetti burst when the winner is revealed',
    customizeShowRemove: 'Show Remove button',
    customizeShowRemoveDesc: 'Display a button to remove the winner and spin again',
    customizeReset: 'Reset to defaults',
    customizeDone: 'Done',
    winnerModalTitle: 'We have a winner!',
    winnerModalClose: 'Close',
    winnerModalRemove: 'Remove',
    clickToSpin: 'Click to spin',
    clickToSpinSub: 'or press Ctrl+Enter',
    addWheel: 'Add wheel',
    removeWheel: 'Remove',
    wheelPrefix: 'Wheel',
    nextToolTryAlso: 'Try also:',
    nextToolYesNo: 'Yes or No Wheel',
    nextToolTeam: 'Team Generator',
    nextToolNumber: 'Number Picker',
    nextToolGiveaway: 'Giveaway Picker',
    nextToolClassroom: 'Classroom Picker',
    toastLinkCopied: 'Link copied!',
    toastLinkCopiedDesc: 'Share it to pre-load your wheel.',
    toastCopyFailed: 'Could not copy — please copy the URL from your browser bar.',
    toastWheelSaved: 'Wheel saved to the gallery! 🎡',
    toastGalleryCopied: 'Link to gallery copied.',
    toastSaveFailed: 'Could not save wheel. Try again.',
    indexTrustFree: '100% free',
    indexTrustNoSignup: 'No signup',
    indexTrustCrypto: 'Crypto fair',
    faqsTitle: 'Frequently Asked Questions',
    relatedBlogPostLabel: 'Want a step-by-step guide?',
    blogSubtitle: 'Guides on running giveaways, using random pickers in classrooms, splitting teams fairly, and more.',
    blogFeatured: 'Featured',
    blogReadGuide: 'Read guide',
    blogRead: 'Read',
    blogTryTools: 'Try the tools for free',
    blogTagGiveaways: 'Giveaways',
    blogTagEducation: 'Education',
    blogTagTeams: 'Teams',
    blogTagTools: 'Tools',
    blogTagIdeas: 'Ideas',
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
    localStorageSaved: 'Tu lista está guardada localmente en tu navegador.',
    footerTools: 'Herramientas',
    footerGiveaways: 'Sorteos',
    footerResources: 'Recursos',
    footerTagline: '— Herramienta Gratuita de Ruleta',
    footerAllRights: 'Todos los derechos reservados.',
    bottleAddPlayer: 'Añadir jugador...',
    bottleSpin: '🍾 Girar la Botella',
    bottleSpinning: '🍾 Girando...',
    bottlePlayers: 'Jugadores',
    bottleHistory: 'Historial',
    bottleResult: 'La botella elige:',
    bottleMinPlayers: 'Añade al menos 2 jugadores',
    bottleClearHistory: 'Borrar',

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
    navBlog: 'Blog',
    navGallery: 'Galería',
    navFullscreen: 'Pantalla completa',

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
      'random-wheel': { h1: 'Ruleta Aleatoria – Gira la Rueda Online', subtitle: 'Gira una ruleta aleatoria para elegir un ganador al instante. Gratis, rápido y justo.', microText: 'Gratis • Sin registro • Resultado instantáneo', howItWorksTitle: '¿Cómo funciona esta ruleta aleatoria?', howItWorksText: 'Escribe nombres u opciones, pega una lista o carga una plantilla. Pulsa Girar y observa cómo la rueda gira con una animación fluida.', whenToUseTitle: '¿Cuándo usar una rueda aleatoria?', useCases: [{title:'Sorteos en redes sociales',description:"Elige ganadores justos para concursos de Instagram y TikTok"},{title:'Streams en vivo',description:"Anima tus directos de Twitch/YouTube con sorteos en tiempo real"},{title:'Actividades en clase',description:"Selecciona alumnos aleatoriamente para preguntas"},{title:'Decisiones de equipo',description:"Asigna tareas o elige quién va primero"},{title:'Juegos de fiesta',description:"Añade emoción a cualquier reunión"}], seoTitle: 'Rueda aleatoria gratuita en línea — Gira para decidir', seoText: 'Nuestra rueda aleatoria gratuita es la forma más rápida de tomar decisiones imparciales en línea. Añade opciones, gira la rueda y obtén un resultado instantáneo. Sin cuenta, sin anuncios, sin límite de giros. Usa la API Web Crypto para una aleatorización criptográficamente segura.', faqs: [{question:'¿Puedo añadir cualquier tipo de contenido a la rueda?',answer:'Sí. Puedes añadir nombres, palabras, números, emojis o frases cortas — todo lo que cabe en unos 30 caracteres se muestra bien en la rueda.'},{question:'¿Cómo comparto mi rueda con alguien?',answer:'Haz clic en el icono de compartir junto al título del sorteo. Se copia una URL única en tu portapapeles. Quien abra ese enlace verá la rueda precargada con tus entradas exactas.'},{question:'¿Hay un límite en el número de opciones?',answer:'Sin límite estricto. La rueda se muestra claramente hasta unas 50 opciones. Más allá, los segmentos se hacen más pequeños pero la selección aleatoria no se ve afectada.'},{question:'¿Puedo usar la rueda sin conexión?',answer:'Sí — una vez cargada la página en tu navegador, los giros funcionan sin conexión a internet.'}] },
      'wheel-of-names': { h1: 'Ruleta de Nombres – Elige un Nombre al Azar', subtitle: 'Escribe los nombres, gira la rueda y deja que el azar decida. Justo y transparente.', microText: 'Gratis • Sin registro • Resultado instantáneo', howItWorksTitle: '¿Cómo funciona esta ruleta de nombres?', howItWorksText: 'Pega tu lista de nombres, haz clic en girar y observa la rueda hasta que se detenga en un nombre elegido al azar.', whenToUseTitle: '¿Cuándo usar una rueda de nombres?', useCases: [{title:'Ganadores de concursos',description:"Selecciona ganadores de sorteos de forma transparente"},{title:'Selección de alumnos',description:"Elige alumnos para presentaciones"},{title:'Facilitador de reuniones',description:"Elige quién lidera la próxima reunión"},{title:'Sorteos y rifas',description:"Organiza rifas y loterías justas"},{title:'Secret Santa',description:"Asigna destinatarios de regalos aleatoriamente"}], seoTitle: 'Rueda de nombres gratuita en línea', seoText: 'La rueda de nombres gratuita es la forma más sencilla de seleccionar un nombre al azar de tu lista. Perfecta para aulas, oficinas o sorteos. Introduce nombres, gira la rueda de colores y obtén un resultado aleatorio instantáneo. Sin cuenta requerida.' },
      'random-name-picker': { h1: 'Selector de Nombres Aleatorio – Elige con Equidad', subtitle: 'Pega tu lista y elige un nombre al azar en segundos. Sin sesgos, garantizado.', microText: 'Gratis • Sin registro • Resultado instantáneo', howItWorksTitle: '¿Cómo funciona este selector de nombres?', howItWorksText: 'Añade nombres a tu lista, pulsa Girar y observa la rueda hasta que se detenga en un nombre elegido aleatoriamente.', whenToUseTitle: '¿Cuándo usar un selector de nombres aleatorio?', useCases: [{title:'Selección de ganadores',description:"Elige ganadores entre los participantes del concurso"},{title:'Selector en clase',description:"Llama a alumnos aleatoriamente"},{title:'Asignación de equipos',description:"Distribuye tareas de forma justa"},{title:'Interacciones en stream',description:"Selecciona espectadores para premios"},{title:'Sorteos de premios',description:"Organiza selecciones de premios transparentes"}], seoTitle: 'Selector de nombres aleatorio gratuito — Sin registro', seoText: 'Nuestro selector de nombres aleatorio te permite añadir una lista de nombres y elegir uno o más al azar con una rueda visual. Sin cuenta, sin app. Usa la API Web Crypto — criptográficamente segura. Tus nombres nunca salen de tu dispositivo.', faqs: [{question:'¿Cuántos nombres puedo añadir?',answer:'Sin límite estricto. La rueda se muestra claramente hasta unos 50 nombres.'},{question:'¿Puedo elegir varios ganadores a la vez?',answer:'Sí. Usa el selector de número de ganadores para elegir 2, 3 o más en un solo giro.'},{question:'¿El selector es realmente aleatorio?',answer:'Sí. Usamos crypto.getRandomValues(), la misma API criptográficamente segura que se usa en cifrado y banca online.'},{question:'¿Puedo eliminar un nombre después de ganar?',answer:'Sí. Después de anunciar un ganador, aparece un botón para eliminarlo de la rueda antes del siguiente sorteo.'}] },
      'giveaway-picker': { h1: 'Selector de Sorteos – Elige Ganadores de Forma Justa', subtitle: 'Realiza sorteos transparentes y elige ganadores en los que tu audiencia confíe.', microText: 'Gratis • Sin registro • Resultado instantáneo', howItWorksTitle: '¿Cómo funciona este selector de sorteos?', howItWorksText: 'Pega la lista de participantes o nombres de usuario, gira la rueda y deja que la selección aleatoria elija al ganador. Graba la pantalla como prueba de transparencia.', whenToUseTitle: '¿Cuándo usar un selector de sorteos?', useCases: [{title:'Sorteos de Instagram',description:"Elige ganadores de comentarios o seguidores"},{title:'Concursos YouTube/Twitch',description:"Selecciona suscriptores en directo"},{title:'Promociones de marca',description:"Organiza sorteos de marketing profesionalmente"},{title:'Varios ganadores',description:"Selecciona 1, 5 o 10+ ganadores a la vez"},{title:'Eventos comunitarios',description:"Recompensa a los miembros más activos"}], seoTitle: 'Selector de sorteos gratuito — Elige ganadores con transparencia', seoText: 'Nuestro selector de sorteos gratuito te permite pegar una lista de participantes, girar una rueda de colores y seleccionar ganadores aleatorios en segundos. Graba el sorteo como prueba de transparencia. Sin cuenta, sin datos almacenados.', faqs: [{question:'¿Puedo usarlo para sorteos de Instagram?',answer:'Sí. Pega los nombres de usuario de Instagram en la rueda y gira.'},{question:'¿Cómo elegir varios ganadores?',answer:'Usa el selector de número de ganadores. Un solo giro seleccionará tantos ganadores en secuencia.'},{question:'¿Puedo grabar el sorteo como prueba?',answer:'Sí — es uno de los principales casos de uso. La animación está diseñada para ser clara en grabaciones.'},{question:'¿Es aceptado como prueba de imparcialidad?',answer:'Un sorteo visual grabado es ampliamente aceptado por las audiencias como prueba de un sorteo justo.'}] },
      'weighted-random-picker': { h1: 'Ruleta con Probabilidades – Sorteos Personalizados', subtitle: 'Asigna diferentes probabilidades a cada participante para selecciones avanzadas.', microText: 'Gratis • Sin registro • Resultado instantáneo', howItWorksTitle: '¿Cómo funciona la ruleta con probabilidades?', howItWorksText: 'Añade participantes y asigna a cada uno un peso (más alto = más probabilidades). Los segmentos de la rueda son proporcionales a los pesos.', whenToUseTitle: '¿Cuándo usar un selector aleatorio ponderado?', useCases: [{title:'Programas de fidelidad',description:"Recompensa a clientes frecuentes con mejores probabilidades"},{title:'Niveles de suscriptores',description:"Mejores probabilidades para seguidores leales"},{title:'Contribuciones del equipo',description:"Pondera la selección por esfuerzo o antigüedad"},{title:'Recompensas por participación',description:"Más entradas por más participación"},{title:'Mecánicas de juego',description:"Crea encuentros aleatorios equilibrados"}], seoTitle: 'Selector aleatorio ponderado gratuito en línea', seoText: 'Nuestro selector aleatorio ponderado gratuito te permite asignar probabilidades personalizadas a cada participante. Perfecto para programas de fidelidad, sorteos por niveles y recompensas basadas en el compromiso. La fórmula es simple: Probabilidad = (Tu peso ÷ Peso total) × 100.' },
      'yes-or-no-wheel': { h1: 'Ruleta Sí o No – Deja que la Rueda Decida', subtitle: '¿No puedes decidirte? Gira la ruleta sí o no para obtener una respuesta al instante.', microText: 'Gratis • Sin cuenta • Respuesta instantánea', howItWorksTitle: '¿Cómo funciona la ruleta sí o no?', howItWorksText: "Haz clic en Girar y deja que la rueda elija entre Sí y No. Usa aleatoriedad criptográfica, ninguna opción tiene ventaja. Puedes añadir opciones como 'Tal vez' si lo necesitas.", whenToUseTitle: '¿Cuándo usar una rueda Sí o No?', useCases: [{title:'Decisiones diarias',description:"Rompe el bucle de indecisión al instante"},{title:'Debates de grupo',description:"Deja que la rueda resuelva los argumentos"},{title:'Juegos de fiesta',description:"Añade un elemento aleatorio a las noches de juegos"},{title:'Diversión en clase',description:"Haz las elecciones aleatorias sí/no más atractivas"},{title:'Retos',description:"Acepta o rechaza retos aleatoriamente"}], seoTitle: 'Rueda de Sí o No gratuita en línea', seoText: "¿No puedes decidirte? Gira nuestra rueda de Sí o No gratuita y deja que el destino elija. Este sencillo decisor aleatorio es perfecto para romper bucles de indecisión o añadir diversión a las noches de juegos. Personalizable con más opciones como 'Quizás' o 'Más tarde'." },
      'team-generator': { h1: 'Generador de Equipos – División Justa y Aleatoria', subtitle: 'Divide tu grupo en equipos equilibrados y aleatorios al instante.', microText: 'Gratis • Sin registro • Resultado instantáneo', howItWorksTitle: '¿Cómo funciona el generador de equipos?', howItWorksText: 'Añade nombres, define el número de equipos o el tamaño y gira. La herramienta asigna participantes a equipos usando aleatoriedad criptográfica para una división justa.', whenToUseTitle: '¿Cuándo usar un generador de equipos?', useCases: [{title:'Deportes y juegos',description:"Crea equipos equilibrados para cualquier deporte"},{title:'Proyectos escolares',description:"Asigna alumnos a grupos de forma justa"},{title:'Team Building',description:"Mezcla departamentos para actividades corporativas"},{title:'Torneos',description:"Crea grupos y brackets aleatoriamente"},{title:'Juegos de fiesta',description:"Divide a los invitados en equipos"}], seoTitle: 'Generador de equipos aleatorio gratuito en línea', seoText: 'Divide a personas en equipos rápida y justamente con nuestro generador de equipos gratuito. Perfecto para jornadas deportivas, proyectos escolares o actividades de team building. Pega nombres, define el número de equipos y genera al instante.' },
      'random-number-generator': { h1: 'Generador de Números Aleatorios – Obtén un Número al Instante', subtitle: 'Genera números verdaderamente aleatorios en cualquier rango. Sin patrones ni sesgos.', microText: 'Gratis • Sin cuenta • Resultado instantáneo', howItWorksTitle: '¿Cómo funciona este generador de números aleatorios?', howItWorksText: 'Define tu rango (mínimo y máximo), haz clic en girar y obtén un número aleatorio criptográfico. Usa la Web Crypto API para verdadera aleatoriedad.', whenToUseTitle: '¿Cuándo usar un generador de números aleatorios?', useCases: [{title:'Sorteos de lotería',description:"Elige números ganadores de lotería o rifa"},{title:'Mecánicas de juego',description:"Tira dados, genera estadísticas aleatorias"},{title:'Enseñanza de matemáticas',description:"Crea ejercicios con números aleatorios"},{title:'Selección de orden',description:"¿Quién presenta primero? Elige un número"},{title:'Sorteos de premios',description:"Asigna premios a números de ticket aleatorios"}], seoTitle: 'Generador de números aleatorios gratuito en línea', seoText: 'Nuestro generador de números aleatorios gratuito crea números criptográficamente seguros en cualquier rango que definas. Perfecto para loterías, mecánicas de juego o cualquier situación que requiera números aleatorios imparciales.' },
      'party-wheel': { h1: 'Ruleta de Fiestas – Retos y Desafíos Aleatorios', subtitle: 'Gira la ruleta de fiestas para retos, tareas y desafíos aleatorios. Perfecta para noches de juegos.', microText: 'Gratis • Sin registro • Diversión instantánea', howItWorksTitle: '¿Cómo funciona la ruleta de fiestas?', howItWorksText: 'Carga la rueda con retos, desafíos o tareas y gira para asignarlos al azar. Puedes usar las opciones predefinidas o personalizarlas con tus propios desafíos.', whenToUseTitle: '¿Cuándo usar una rueda de fiesta?', useCases: [{title:'Noches de juegos',description:"Añade retos aleatorios a los juegos de mesa"},{title:'Actividades de grupo',description:"Asigna tareas aleatorias a los invitados"},{title:'Forfaits de fiesta',description:"Gira para retos y castigos"},{title:'Competiciones',description:"Premios aleatorios o asignación de retos"},{title:'Rompehielos',description:"Preguntas divertidas para iniciar conversaciones"}], seoTitle: 'Rueda de fiesta gratuita para noches de juegos', seoText: 'Haz cualquier fiesta o noche de juegos más emocionante con nuestra rueda de fiesta gratuita. Gira para asignar aleatoriamente retos, castigos, tareas o premios. Personalízala con tus propias ideas. Gratis, instantáneo, sin cuenta requerida.' },
      'classroom-picker': { h1: 'Selector para el Aula – Elige Estudiantes al Azar', subtitle: 'Selecciona estudiantes aleatoriamente para preguntas, tareas y actividades. Justo y sin estrés.', microText: 'Gratis • Sin registro • Resultado instantáneo', howItWorksTitle: '¿Cómo funciona este selector para el aula?', howItWorksText: 'Añade los nombres de tus alumnos y haz clic en girar. La rueda selecciona un estudiante al azar, garantizando que todos tengan las mismas posibilidades.', whenToUseTitle: '¿Cuándo usar un selector de clase?', useCases: [{title:'Sesiones de preguntas',description:"Elige alumnos aleatoriamente para responder"},{title:'Proyectos de grupo',description:"Asigna alumnos a grupos de forma justa"},{title:'Presentaciones',description:"Selección aleatoria del orden de presentación"},{title:'Recompensas de clase',description:"Elige alumnos aleatoriamente para premios"},{title:'Asignación de roles',description:"Asigna roles y tareas aleatoriamente"}], seoTitle: 'Selector de alumnos gratuito para la clase', seoText: 'Nuestro selector de clase gratuito ayuda a los profesores a seleccionar alumnos aleatoriamente sin sesgo ni repetición. Introduce tu lista de clase y gira la rueda — perfecto para preguntas orales, orden de presentación o formación de grupos. Sin cuenta, sin configuración.' },
      'secret-santa-picker': { h1: 'Sorteo de Amigo Invisible – Asigna Regalos al Azar', subtitle: 'Organiza tu intercambio de regalos en segundos. Justo, anónimo y divertido.', microText: 'Gratis • Sin registro • Resultado instantáneo', howItWorksTitle: '¿Cómo funciona el sorteo de amigo invisible?', howItWorksText: 'Añade los nombres de los participantes, haz clic en girar y la rueda asigna a cada persona un destinatario de regalo al azar.', whenToUseTitle: '¿Cuándo usar un selector de Secret Santa?', useCases: [{title:'Fiestas de oficina',description:"Intercambio de regalos anónimo en el trabajo"},{title:'Grupos de amigos',description:"Asignación aleatoria justa entre amigos"},{title:'Eventos familiares',description:"Intercambios de regalos para familias grandes"},{title:'Eventos en línea',description:"Secret Santa remoto o virtual"},{title:'Eventos escolares',description:"Actividades de intercambio de regalos en clase"}], seoTitle: 'Selector de Secret Santa gratuito en línea', seoText: 'Organiza tu intercambio de Secret Santa en segundos con nuestro selector gratuito. Introduce todos los nombres, gira la rueda y asigna aleatoriamente pares de regalos. Sin cuenta, sin email — todo en tu navegador para total privacidad.' },
      'raffle-picker': { h1: 'Selector de Rifa – Elige Ganadores al Azar', subtitle: 'Realiza rifas justas y elige ganadores aleatoriamente. Transparente y confiable.', microText: 'Gratis • Sin registro • Resultado instantáneo', howItWorksTitle: '¿Cómo funciona este selector de rifa?', howItWorksText: 'Escribe los boletos o nombres de participantes, gira la rueda y la selección aleatoria elige al ganador. Puedes seleccionar varios ganadores para varios premios.', whenToUseTitle: '¿Cuándo usar un selector de rifa?', useCases: [{title:'Eventos benéficos',description:"Sortea ganadores de rifa en eventos de caridad"},{title:'Sorteos de premios',description:"Selecciona ganadores entre los tickets"},{title:'Rifas comunitarias',description:"Sorteos justos para miembros de asociaciones"},{title:'Eventos en directo',description:"Gira en pantalla para total transparencia"},{title:'Rifas en línea',description:"Sorteos digitales para eventos virtuales"}], seoTitle: 'Selector de rifa gratuito en línea', seoText: 'Nuestro selector de rifa gratuito hace que los sorteos sean transparentes, justos y emocionantes. Añade nombres o números de ticket, define el número de ganadores y gira la rueda en vivo. La selección criptográficamente aleatoria garantiza que no sea posible ninguna manipulación.' },
    },
    preparingWheel: 'Preparando la rueda...',

    // Common
    loading: 'Cargando...',

    // Homepage Island
    indexPageTitle: 'Ruleta Aleatoria — Sorteo Gratuito',
    indexSpinsText: 'sorteos desde inicio de año',
    tapToSpin: '¡PULSA para girar la ruleta!',
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
    toolbarCustomize: 'Personalizar',
    toolbarSave: 'Guardar',
    toolbarSaving: 'Guardando…',
    toolbarAddImage: 'Añadir imagen',
    toolbarChangeImage: 'Cambiar imagen',
    customizeTitle: 'Personalizar rueda',
    customizeTabAppearance: 'Apariencia',
    customizeTabDuringSpin: 'Durante el giro',
    customizeTabAfterSpin: 'Después del giro',
    customizeColorTheme: 'Tema de color',
    customizeBorder: 'Borde de la rueda',
    customizeTickSound: 'Sonido de clic',
    customizeTickSoundDesc: 'Reproduce un sonido al pasar cada segmento',
    customizeTickVolume: 'Volumen del clic',
    customizeTickStyle: 'Estilo de sonido',
    customizeSilent: 'Silencio',
    customizeLoud: 'Alto',
    customizeSpinDuration: 'Duración del giro',
    customizeVictorySound: 'Sonido de victoria',
    customizeVictorySoundDesc: 'Reproduce una fanfarria cuando se revela el ganador',
    customizeVictoryVolume: 'Volumen de victoria',
    customizeConfetti: 'Confeti',
    customizeConfettiDesc: 'Lanza confeti cuando se revela el ganador',
    customizeShowRemove: 'Mostrar botón Eliminar',
    customizeShowRemoveDesc: 'Muestra un botón para eliminar al ganador y girar de nuevo',
    customizeReset: 'Restablecer',
    customizeDone: 'Hecho',
    winnerModalTitle: '¡Tenemos un ganador!',
    winnerModalClose: 'Cerrar',
    winnerModalRemove: 'Eliminar',
    clickToSpin: 'Clic para girar',
    clickToSpinSub: 'o pulsa Ctrl+Enter',
    addWheel: 'Añadir rueda',
    removeWheel: 'Eliminar',
    wheelPrefix: 'Rueda',
    nextToolTryAlso: 'Prueba también:',
    nextToolYesNo: 'Rueda Sí o No',
    nextToolTeam: 'Generador de equipos',
    nextToolNumber: 'Generador de números',
    nextToolGiveaway: 'Sorteo online',
    nextToolClassroom: 'Sorteo escolar',
    toastLinkCopied: '¡Enlace copiado!',
    toastLinkCopiedDesc: 'Compártelo para precargar tu rueda.',
    toastCopyFailed: 'No se pudo copiar — copia la URL desde la barra del navegador.',
    toastWheelSaved: '¡Rueda guardada en la galería! 🎡',
    toastGalleryCopied: 'Enlace a la galería copiado.',
    toastSaveFailed: 'No se pudo guardar. Inténtalo de nuevo.',
    indexTrustFree: '100% gratis',
    indexTrustNoSignup: 'Sin registro',
    indexTrustCrypto: 'Cripto justo',
    faqsTitle: 'Preguntas frecuentes',
    relatedBlogPostLabel: '¿Quieres una guía paso a paso?',
    blogSubtitle: 'Guías sobre sorteos, selección aleatoria en clases, división de equipos y más.',
    blogFeatured: 'Destacado',
    blogReadGuide: 'Leer guía',
    blogRead: 'Leer',
    blogTryTools: 'Prueba las herramientas gratis',
    blogTagGiveaways: 'Sorteos',
    blogTagEducation: 'Educación',
    blogTagTeams: 'Equipos',
    blogTagTools: 'Herramientas',
    blogTagIdeas: 'Ideas',
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
    localStorageSaved: 'Votre liste est sauvegardée localement dans votre navigateur.',
    footerTools: 'Outils',
    footerGiveaways: 'Giveaways',
    footerResources: 'Ressources',
    footerTagline: '— Outil Gratuit de Roue',
    footerAllRights: 'Tous droits réservés.',
    bottleAddPlayer: 'Ajouter un joueur...',
    bottleSpin: '🍾 Tourner la Bouteille',
    bottleSpinning: '🍾 En cours...',
    bottlePlayers: 'Joueurs',
    bottleHistory: 'Historique',
    bottleResult: 'La bouteille désigne :',
    bottleMinPlayers: 'Ajoutez au moins 2 joueurs',
    bottleClearHistory: 'Effacer',

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
    navBlog: 'Blog',
    navGallery: 'Galerie',
    navFullscreen: 'Plein écran',

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
      'random-wheel': { h1: 'Roue Aléatoire – Faites Tourner la Roue en Ligne', subtitle: 'Faites tourner une roue aléatoire pour désigner un gagnant instantanément. Gratuit, rapide et équitable.', microText: 'Gratuit • Sans inscription • Résultat immédiat', howItWorksTitle: 'Comment fonctionne cette roue aléatoire ?', howItWorksText: "Saisissez des noms ou des options — tapez-les, collez une liste ou chargez un modèle. Cliquez sur Tourner et regardez la roue s'animer en douceur.", whenToUseTitle: 'Quand utiliser une roue aléatoire ?', useCases: [{title:'Tirages réseaux sociaux',description:"Choisissez les gagnants pour vos concours Instagram & TikTok"},{title:'Lives & streams',description:"Animez vos lives Twitch/YouTube avec un tirage en direct"},{title:'Activités en classe',description:"Sélectionnez des élèves aléatoirement pour des questions"},{title:'Décisions d\'équipe',description:"Assignez des tâches ou choisissez qui commence"},{title:'Jeux de soirée',description:"Ajoutez de l'excitation à n'importe quel rassemblement"}], seoTitle: 'Roue aléatoire gratuite en ligne — Tournez pour décider', seoText: "Notre roue aléatoire gratuite est le moyen le plus rapide de prendre des décisions impartiales en ligne. Ajoutez vos options, tournez la roue et obtenez un résultat instantané. Aucun compte requis, pas de publicités, aucune limite de tirages. Utilise l'API Web Crypto pour une randomisation cryptographiquement sécurisée.", faqs: [{question:"Puis-je ajouter n'importe quel type de contenu à la roue ?",answer:"Oui. Vous pouvez ajouter des noms, des mots, des nombres, des emojis ou de courtes phrases — tout ce qui tient en environ 30 caractères s'affiche bien sur la roue."},{question:"Comment partager ma roue avec quelqu'un ?",answer:"Cliquez sur l'icône de partage à côté du titre du tirage. Une URL unique est copiée dans votre presse-papiers. Quiconque ouvre ce lien verra la roue pré-chargée avec vos entrées exactes."},{question:"Y a-t-il une limite au nombre d'options ?",answer:"Aucune limite stricte. La roue s'affiche clairement jusqu'à environ 50 options. Au-delà, les segments deviennent plus petits mais la sélection aléatoire n'est pas affectée."},{question:"Puis-je utiliser la roue hors ligne ?",answer:"Oui — une fois la page chargée dans votre navigateur, les tirages fonctionnent sans connexion internet. La randomisation s'exécute localement via l'API crypto de votre navigateur."}] },
      'wheel-of-names': { h1: 'Roue des Noms – Tirez un Nom au Sort Instantanément', subtitle: 'Entrez des noms, faites tourner la roue et laissez le destin décider. Équitable et transparent.', microText: 'Gratuit • Sans inscription • Résultat immédiat', howItWorksTitle: 'Comment fonctionne cette roue des noms ?', howItWorksText: "Collez votre liste de noms, cliquez sur Tourner et regardez la roue s'arrêter sur un nom sélectionné aléatoirement.", whenToUseTitle: 'Quand utiliser une roue des noms ?', useCases: [{title:'Gagnants de concours',description:"Sélectionnez des gagnants de giveaway en toute transparence"},{title:'Sélection d\'élèves',description:"Choisissez des élèves pour des présentations"},{title:'Animateur de réunion',description:"Désignez qui anime la prochaine réunion"},{title:'Tirages au sort',description:"Organisez des tombolas et loteries équitables"},{title:'Secret Santa',description:"Attribuez aléatoirement des destinataires de cadeaux"}], seoTitle: 'Roue des noms gratuite en ligne', seoText: "La roue des noms gratuite est le moyen le plus simple de sélectionner un nom au hasard parmi votre liste. Parfaite pour les salles de classe, les bureaux ou les concours. Entrez des noms, tournez la roue colorée et obtenez un résultat aléatoire instantané. Aucun compte requis — la façon la plus rapide de choisir un gagnant équitablement." },
      'random-name-picker': { h1: 'Tirage au Sort de Noms – Sélectionnez Équitablement', subtitle: 'Collez votre liste et tirez un nom au sort en quelques secondes. Zéro biais, garanti.', microText: 'Gratuit • Sans inscription • Résultat immédiat', howItWorksTitle: 'Comment fonctionne ce tirage au sort de noms ?', howItWorksText: "Ajoutez des noms à votre liste, cliquez sur Tourner et regardez la roue s'arrêter sur un nom choisi aléatoirement.", whenToUseTitle: 'Quand utiliser un sélecteur de noms aléatoire ?', useCases: [{title:'Sélection de gagnants',description:"Choisissez les gagnants parmi les participants"},{title:'Sélecteur en classe',description:"Interrogez des élèves aléatoirement"},{title:'Attribution d\'équipes',description:"Distribuez les tâches équitablement"},{title:'Interactions stream',description:"Sélectionnez des spectateurs pour des récompenses"},{title:'Tirages de prix',description:"Organisez des sélections de prix transparentes"}], seoTitle: 'Sélecteur de noms aléatoire gratuit — Sans inscription', seoText: "Notre sélecteur de noms aléatoire vous permet d'ajouter une liste de noms et d'en choisir un ou plusieurs au hasard avec une roue visuelle. Aucun compte, aucune application à installer. Utilise l'API Web Crypto pour une randomisation cryptographiquement sécurisée — impossible à prédire ou manipuler. Vos noms ne quittent jamais votre appareil.", faqs: [{question:"Combien de noms puis-je ajouter ?",answer:"Aucune limite stricte. La roue s'affiche clairement jusqu'à environ 50 noms. Au-delà, les noms deviennent plus petits mais la randomisation n'est pas affectée."},{question:"Puis-je choisir plusieurs gagnants à la fois ?",answer:"Oui. Utilisez le sélecteur de nombre de gagnants pour choisir 2, 3 ou plus en un seul tirage. Chaque gagnant est sélectionné parmi les noms restants, donc aucun nom n'est choisi deux fois."},{question:"Le sélecteur est-il vraiment aléatoire ?",answer:"Oui. Nous utilisons crypto.getRandomValues(), la même API cryptographiquement sécurisée utilisée dans le chiffrement et la banque en ligne. Le résultat est imprévisible et nous n'enregistrons jamais aucune sélection."},{question:"Puis-je retirer un nom après qu'il ait gagné ?",answer:"Oui. Après l'annonce d'un gagnant, un bouton 'Retirer le gagnant et retourner' apparaît. Cliquez dessus et le gagnant est retiré de la roue avant que le prochain tirage commence automatiquement."}] },
      'giveaway-picker': { h1: 'Tirage de Concours – Désignez des Gagnants Équitablement', subtitle: 'Organisez des concours transparents et choisissez des gagnants en qui votre audience aura confiance.', microText: 'Gratuit • Sans inscription • Résultat immédiat', howItWorksTitle: 'Comment fonctionne ce tirage de concours ?', howItWorksText: "Collez votre liste de participants ou de noms d'utilisateur, faites tourner la roue et laissez la sélection aléatoire désigner votre gagnant.", whenToUseTitle: 'Quand utiliser un sélecteur de giveaway ?', useCases: [{title:'Giveaways Instagram',description:"Choisissez les gagnants parmi les commentaires"},{title:'Concours YouTube/Twitch',description:"Sélectionnez des abonnés en direct"},{title:'Promotions de marque',description:"Organisez des giveaways marketing professionnels"},{title:'Plusieurs gagnants',description:"Sélectionnez 1, 5 ou 10+ gagnants en une fois"},{title:'Événements communautaires',description:"Récompensez les membres engagés"}], seoTitle: 'Sélecteur de giveaway gratuit — Choisissez les gagnants en toute transparence', seoText: "Notre sélecteur de giveaway gratuit vous permet de coller une liste de participants, de tourner une roue colorée et de sélectionner un ou plusieurs gagnants aléatoires en quelques secondes. Enregistrez le tirage comme preuve de transparence. Aucun compte requis, aucune donnée stockée.", faqs: [{question:"Puis-je utiliser ceci pour choisir les gagnants de giveaways Instagram ?",answer:"Oui. Collez les noms d'utilisateur Instagram dans la roue et tournez. Pour l'analyse automatique des commentaires avec filtres de mots-clés, utilisez notre Sélecteur de giveaway social dédié."},{question:"Comment choisir plusieurs gagnants ?",answer:"Utilisez le sélecteur de nombre de gagnants. Définissez-le sur 2, 3 ou plus et un seul tirage sélectionnera autant de gagnants en séquence, chacun parmi les participants restants."},{question:"Puis-je enregistrer l'écran du tirage comme preuve ?",answer:"Oui — c'est l'un des principaux cas d'utilisation. L'animation de la roue est conçue pour être claire et visuellement engageante sur les enregistrements."},{question:"Ce sélecteur est-il accepté comme preuve d'équité sur les réseaux sociaux ?",answer:"La plupart des plateformes n'ont pas d'exigences officielles sur la façon dont les gagnants sont sélectionnés. Un tirage visuel enregistré est largement accepté par les audiences comme preuve d'un tirage équitable."}] },
      'weighted-random-picker': { h1: 'Roue Pondérée – Tirages avec Probabilités Personnalisées', subtitle: 'Attribuez des chances différentes à chaque participant pour des scénarios de sélection avancés.', microText: 'Gratuit • Sans inscription • Résultat immédiat', howItWorksTitle: 'Comment fonctionne la roue pondérée ?', howItWorksText: 'Ajoutez des participants et attribuez à chacun un poids (plus élevé = plus de chances). Les segments de la roue sont proportionnels aux poids.', whenToUseTitle: 'Quand utiliser un sélecteur aléatoire pondéré ?', useCases: [{title:'Programmes de fidélité',description:"Récompensez les clients fréquents avec de meilleures chances"},{title:'Paliers d\'abonnés',description:"Meilleures chances pour les supporters fidèles"},{title:'Contributions d\'équipe',description:"Pondérez la sélection par effort ou ancienneté"},{title:'Récompenses d\'engagement',description:"Plus d'entrées pour plus d'engagement"},{title:'Mécaniques de jeu',description:"Créez des rencontres aléatoires équilibrées"}], seoTitle: 'Sélecteur aléatoire pondéré gratuit en ligne', seoText: "Notre sélecteur aléatoire pondéré gratuit vous permet d'attribuer des probabilités personnalisées à chaque participant. Parfait pour les programmes de fidélité, les giveaways à niveaux et les récompenses basées sur l'engagement. La formule est simple : Probabilité = (Votre poids ÷ Poids total) × 100. Les tailles des segments de la roue correspondent exactement à ces pourcentages." },
      'yes-or-no-wheel': { h1: 'Roue Oui ou Non – Laissez la Roue Décider', subtitle: "Vous n'arrivez pas à vous décider ? Faites tourner la roue oui ou non pour une réponse immédiate.", microText: 'Gratuit • Sans compte • Réponse immédiate', howItWorksTitle: 'Comment fonctionne la roue oui ou non ?', howItWorksText: "Cliquez simplement sur Tourner et laissez la roue choisir entre Oui et Non. Elle utilise un aléatoire cryptographique — aucune option n'est favorisée.", whenToUseTitle: 'Quand utiliser une roue Oui ou Non ?', useCases: [{title:'Décisions quotidiennes',description:"Brisez immédiatement la boucle d'indécision"},{title:'Débats de groupe',description:"Laissez la roue régler les arguments"},{title:'Jeux de soirée',description:"Ajoutez un élément aléatoire aux soirées jeux"},{title:'Fun en classe',description:"Rendez les choix aléatoires oui/non engageants"},{title:'Défis',description:"Acceptez ou passez des défis aléatoirement"}], seoTitle: 'Roue Oui ou Non gratuite en ligne', seoText: "Vous n'arrivez pas à vous décider ? Tournez notre roue Oui ou Non gratuite et laissez le destin choisir. Ce décideur aléatoire simple est parfait pour briser les boucles d'indécision, régler des débats ou ajouter du fun aux soirées jeux. Contrairement à un pile ou face, vous pouvez personnaliser la roue avec plus d'options comme 'Peut-être' ou 'Plus tard'." },
      'team-generator': { h1: "Générateur d'Équipes – Répartition Équitable et Aléatoire", subtitle: 'Divisez votre groupe en équipes équilibrées et aléatoires en un instant.', microText: 'Gratuit • Sans inscription • Résultat immédiat', howItWorksTitle: "Comment fonctionne le générateur d'équipes ?", howItWorksText: "Ajoutez les noms des participants, définissez le nombre d'équipes ou la taille souhaitée, puis faites tourner. L'outil répartit les participants grâce à un aléatoire cryptographique.", whenToUseTitle: "Quand utiliser un générateur d'équipes ?", useCases: [{title:'Sports & Jeux',description:"Créez des équipes équilibrées pour n'importe quel sport"},{title:'Projets scolaires',description:"Assignez des élèves à des groupes équitablement"},{title:'Team Building',description:"Mélangez les départements pour des activités"},{title:'Tournois',description:"Composez des groupes et brackets aléatoirement"},{title:'Jeux de soirée',description:"Divisez les invités en équipes pour les activités"}], seoTitle: 'Générateur d\'équipes aléatoire gratuit en ligne', seoText: "Divisez rapidement et équitablement des personnes en équipes avec notre générateur d'équipes gratuit. Que vous organisiez une journée sportive, un projet scolaire ou une activité team building, ce sélecteur d'équipes aléatoire garantit aucun biais et une distribution égale. Collez des noms, définissez le nombre d'équipes et générez instantanément." },
      'random-number-generator': { h1: 'Générateur de Nombres Aléatoires – Obtenez un Nombre Instantanément', subtitle: "Générez des nombres vraiment aléatoires dans n'importe quelle plage. Sans motifs ni biais.", microText: 'Gratuit • Sans compte • Résultat immédiat', howItWorksTitle: 'Comment fonctionne ce générateur de nombres aléatoires ?', howItWorksText: "Définissez votre plage (min et max), cliquez sur Tourner et obtenez un nombre cryptographiquement aléatoire. Utilise la Web Crypto API pour un vrai aléatoire.", whenToUseTitle: 'Quand utiliser un générateur de nombres aléatoires ?', useCases: [{title:'Tirages de loterie',description:"Choisissez des numéros gagnants de loterie ou tombola"},{title:'Mécaniques de jeu',description:"Lancez des dés, générez des statistiques aléatoires"},{title:'Enseignement des maths',description:"Créez des exercices de nombres aléatoires"},{title:'Sélection d\'ordre',description:"Qui présente en premier ? Choisissez un nombre"},{title:'Tirages de prix',description:"Attribuez des prix à des numéros de ticket aléatoires"}], seoTitle: 'Générateur de nombres aléatoires gratuit en ligne', seoText: "Notre générateur de nombres aléatoires gratuit crée des nombres cryptographiquement sécurisés dans n'importe quelle plage que vous définissez. Parfait pour les tirages de loterie, les mécaniques de jeu, l'enseignement ou toute situation nécessitant des nombres aléatoires impartiaux. Aucune prédictibilité, aucun modèle — juste de l'aléatoire pur." },
      'party-wheel': { h1: 'Roue de Soirée – Défis et Gages Aléatoires', subtitle: 'Faites tourner la roue de soirée pour des défis, tâches et gages aléatoires. Parfait pour les soirées de jeux.', microText: 'Gratuit • Sans inscription • Fun immédiat', howItWorksTitle: 'Comment fonctionne la roue de soirée ?', howItWorksText: 'Chargez la roue avec des défis, gages ou tâches, puis faites-la tourner pour les attribuer aléatoirement. Utilisez les options prédéfinies ou personnalisez-les avec vos propres défis.', whenToUseTitle: 'Quand utiliser une roue de soirée ?', useCases: [{title:'Soirées jeux',description:"Ajoutez des défis aléatoires aux jeux de société"},{title:'Activités de groupe',description:"Assignez des tâches aléatoires aux invités"},{title:'Gages de soirée',description:"Tournez pour des défis et gages"},{title:'Compétitions',description:"Prix aléatoires ou attribution de défis"},{title:'Brise-glace',description:"Questions amusantes pour lancer les conversations"}], seoTitle: 'Roue de soirée gratuite pour les soirées jeux', seoText: "Rendez n'importe quelle soirée ou soirée jeux plus excitante avec notre roue de soirée gratuite. Tournez pour assigner aléatoirement des défis, gages, tâches ou prix. Personnalisez avec vos propres idées ou utilisez nos options pré-chargées. Gratuit, instantané, aucun compte requis." },
      'classroom-picker': { h1: 'Tirage en Classe – Sélectionnez des Élèves au Hasard', subtitle: 'Choisissez des élèves aléatoirement pour des questions, tâches et activités. Équitable et sans stress.', microText: 'Gratuit • Sans inscription • Résultat immédiat', howItWorksTitle: 'Comment fonctionne ce tirage en classe ?', howItWorksText: "Ajoutez les noms de vos élèves et cliquez sur Tourner. La roue sélectionne un élève au hasard, garantissant que chacun a une chance égale et équitable d'être choisi.", whenToUseTitle: 'Quand utiliser un sélecteur de classe ?', useCases: [{title:'Sessions Q&R',description:"Choisissez aléatoirement des élèves pour répondre"},{title:'Projets de groupe',description:"Assignez les élèves à des groupes équitablement"},{title:'Présentations',description:"Sélection aléatoire de l'ordre de passage"},{title:'Récompenses de classe',description:"Choisissez des élèves aléatoirement pour des prix"},{title:'Attribution de rôles',description:"Assignez des rôles et tâches aléatoirement"}], seoTitle: "Sélecteur d'élèves gratuit pour la classe", seoText: "Notre sélecteur de classe gratuit aide les enseignants à sélectionner des élèves aléatoirement sans biais ni répétition. Entrez votre liste de classe et tournez la roue — parfait pour les interrogations, l'ordre de passage, la formation de groupes ou toute activité de classe. Aucun compte, aucune configuration — collez des noms et tournez." },
      'secret-santa-picker': { h1: 'Tirage Père Noël Secret – Attribuez les Cadeaux au Hasard', subtitle: 'Organisez votre échange de cadeaux en quelques secondes. Équitable, anonyme et amusant.', microText: 'Gratuit • Sans inscription • Résultat immédiat', howItWorksTitle: 'Comment fonctionne le tirage Père Noël secret ?', howItWorksText: 'Ajoutez les noms des participants, cliquez sur Tourner et la roue attribue à chacun un destinataire de cadeau au hasard.', whenToUseTitle: 'Quand utiliser un sélecteur Secret Santa ?', useCases: [{title:'Fêtes de bureau',description:"Échange de cadeaux anonyme au travail"},{title:'Groupes d\'amis',description:"Attribution équitable aléatoire entre amis"},{title:'Événements familiaux',description:"Échanges de cadeaux pour les grandes familles"},{title:'Événements en ligne',description:"Secret Santa à distance ou virtuel"},{title:'Événements scolaires',description:"Activités d'échange de cadeaux en classe"}], seoTitle: 'Sélecteur Secret Santa gratuit en ligne', seoText: "Organisez votre échange Secret Santa en quelques secondes avec notre sélecteur gratuit. Entrez tous les noms, tournez la roue et attribuez aléatoirement des paires de cadeaux. Aucun compte, aucun email requis — tout s'exécute dans votre navigateur pour une confidentialité totale. Chaque attribution est cryptographiquement aléatoire." },
      'raffle-picker': { h1: 'Tirage au Sort – Désignez des Gagnants Aléatoirement', subtitle: 'Organisez des tirages équitables et choisissez des gagnants au hasard. Transparent et fiable.', microText: 'Gratuit • Sans inscription • Résultat immédiat', howItWorksTitle: 'Comment fonctionne ce tirage au sort ?', howItWorksText: "Entrez vos numéros de billets ou noms de participants, faites tourner la roue et la sélection aléatoire désigne votre gagnant. Vous pouvez tirer plusieurs gagnants pour plusieurs lots.", whenToUseTitle: 'Quand utiliser un sélecteur de tombola ?', useCases: [{title:'Événements caritatifs',description:"Tirez les gagnants de tombola lors d'événements"},{title:'Tirages de prix',description:"Sélectionnez des gagnants de prix parmi les tickets"},{title:'Tombolas communautaires',description:"Tirages équitables pour les membres d'associations"},{title:'Événements en direct',description:"Tournez en direct pour une transparence totale"},{title:'Tombolas en ligne',description:"Tirages de tombola numériques pour événements virtuels"}], seoTitle: 'Sélecteur de tombola gratuit en ligne', seoText: "Notre sélecteur de tombola gratuit rend les tirages de gagnants transparents, équitables et excitants. Ajoutez des noms ou numéros de tickets, définissez le nombre de gagnants et tournez la roue en direct. La sélection cryptographiquement aléatoire garantit qu'aucune manipulation n'est possible. Aucun compte requis." },
    },
    preparingWheel: 'Préparation de la roue...',

    // Common
    loading: 'Chargement...',

    // Homepage Island
    indexPageTitle: 'Roue aléatoire — Tirage au sort gratuit',
    indexSpinsText: 'tirages effectués depuis le début de l\'année',
    tapToSpin: 'APPUYEZ pour faire tourner la roue !',
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
    toolbarCustomize: 'Personnaliser',
    toolbarSave: 'Sauvegarder',
    toolbarSaving: 'Sauvegarde…',
    toolbarAddImage: 'Ajouter image',
    toolbarChangeImage: 'Changer image',
    customizeTitle: 'Personnaliser la roue',
    customizeTabAppearance: 'Apparence',
    customizeTabDuringSpin: 'Pendant la rotation',
    customizeTabAfterSpin: 'Après la rotation',
    customizeColorTheme: 'Thème de couleurs',
    customizeBorder: 'Bordure de la roue',
    customizeTickSound: 'Son de clic',
    customizeTickSoundDesc: 'Joue un son à chaque passage de segment',
    customizeTickVolume: 'Volume du clic',
    customizeTickStyle: 'Style de son',
    customizeSilent: 'Silence',
    customizeLoud: 'Fort',
    customizeSpinDuration: 'Durée de rotation',
    customizeVictorySound: 'Son de victoire',
    customizeVictorySoundDesc: 'Joue une fanfare quand le gagnant est révélé',
    customizeVictoryVolume: 'Volume de victoire',
    customizeConfetti: 'Confettis',
    customizeConfettiDesc: 'Lance des confettis quand le gagnant est révélé',
    customizeShowRemove: 'Afficher le bouton Supprimer',
    customizeShowRemoveDesc: 'Affiche un bouton pour retirer le gagnant et relancer',
    customizeReset: 'Réinitialiser',
    customizeDone: 'Terminé',
    winnerModalTitle: 'Nous avons un gagnant !',
    winnerModalClose: 'Fermer',
    winnerModalRemove: 'Retirer',
    clickToSpin: 'Cliquez pour tourner',
    clickToSpinSub: 'ou Ctrl+Entrée',
    addWheel: 'Ajouter une roue',
    removeWheel: 'Supprimer',
    wheelPrefix: 'Roue',
    nextToolTryAlso: 'Essayez aussi :',
    nextToolYesNo: 'Roue Oui ou Non',
    nextToolTeam: "Générateur d'équipes",
    nextToolNumber: 'Générateur de nombres',
    nextToolGiveaway: 'Tirage au sort',
    nextToolClassroom: 'Tirage scolaire',
    toastLinkCopied: 'Lien copié !',
    toastLinkCopiedDesc: 'Partagez-le pour pré-charger votre roue.',
    toastCopyFailed: "Impossible de copier — copiez l'URL depuis la barre du navigateur.",
    toastWheelSaved: 'Roue sauvegardée dans la galerie ! 🎡',
    toastGalleryCopied: 'Lien vers la galerie copié.',
    toastSaveFailed: 'Impossible de sauvegarder. Réessayez.',
    indexTrustFree: '100% gratuit',
    indexTrustNoSignup: 'Sans inscription',
    indexTrustCrypto: 'Crypto équitable',
    faqsTitle: 'Questions fréquentes',
    relatedBlogPostLabel: 'Vous voulez un guide étape par étape ?',
    blogSubtitle: 'Guides sur les tirages au sort, les sélections aléatoires en classe, la formation d\'équipes et plus encore.',
    blogFeatured: 'À la une',
    blogReadGuide: 'Lire le guide',
    blogRead: 'Lire',
    blogTryTools: 'Essayez les outils gratuitement',
    blogTagGiveaways: 'Concours',
    blogTagEducation: 'Éducation',
    blogTagTeams: 'Équipes',
    blogTagTools: 'Outils',
    blogTagIdeas: 'Idées',
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
    localStorageSaved: 'Deine Liste wird lokal in deinem Browser gespeichert.',
    footerTools: 'Tools',
    footerGiveaways: 'Gewinnspiele',
    footerResources: 'Ressourcen',
    footerTagline: '— Kostenloses Drehrad-Tool',
    footerAllRights: 'Alle Rechte vorbehalten.',
    bottleAddPlayer: 'Spieler hinzufügen...',
    bottleSpin: '🍾 Flasche drehen',
    bottleSpinning: '🍾 Dreht...',
    bottlePlayers: 'Spieler',
    bottleHistory: 'Verlauf',
    bottleResult: 'Die Flasche zeigt auf:',
    bottleMinPlayers: 'Mindestens 2 Spieler hinzufügen',
    bottleClearHistory: 'Löschen',

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
    navBlog: 'Blog',
    navGallery: 'Galerie',
    navFullscreen: 'Vollbild',

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
      'random-wheel': { h1: 'Zufallsrad – Online das Rad drehen', subtitle: 'Drehen Sie ein Zufallsrad, um sofort einen Gewinner zu ermitteln. Kostenlos, schnell und fair.', microText: 'Kostenlos • Ohne Anmeldung • Sofortiges Ergebnis', howItWorksTitle: 'Wie funktioniert dieses Zufallsrad?', howItWorksText: 'Geben Sie Namen oder Optionen ein, fügen Sie eine Liste ein oder laden Sie eine Vorlage. Klicken Sie auf Drehen und beobachten Sie das Rad in einer flüssigen Animation.', whenToUseTitle: 'Wann sollte man ein Zufallsrad verwenden?', useCases: [{title:'Social-Media-Gewinnspiele',description:'Gewinner für Instagram & TikTok fair auswählen'},{title:'Livestream-Ziehungen',description:'Zuschauer mit Echtzeit-Ziehungen auf Twitch/YouTube begeistern'},{title:'Klassenaktivitäten',description:'Schüler zufällig für Fragen auswählen'},{title:'Teamentscheidungen',description:'Aufgaben zuweisen oder entscheiden, wer anfängt'},{title:'Partyspiele',description:'Jeder Veranstaltung Spannung hinzufügen'}], seoTitle: 'Kostenloses Online-Zufallsrad — Drehen zum Entscheiden', seoText: 'Unser kostenloses Zufallsrad ist der schnellste Weg, unvoreingenommene Entscheidungen online zu treffen. Fügen Sie Optionen hinzu, drehen Sie das Rad und erhalten Sie ein sofortiges Ergebnis. Kein Konto erforderlich, keine Werbung, kein Limit für Drehungen. Verwendet die Web Crypto API für kryptografisch sichere Zufälligkeit.' },
      'wheel-of-names': { h1: 'Namensrad – Zufällig einen Namen auswählen', subtitle: 'Namen eingeben, Rad drehen und das Schicksal entscheiden lassen. Fair und transparent.', microText: 'Kostenlos • Ohne Anmeldung • Sofortiges Ergebnis', howItWorksTitle: 'Wie funktioniert dieses Namensrad?', howItWorksText: 'Fügen Sie Ihre Namensliste ein, klicken Sie auf Drehen und beobachten Sie das Rad, bis es auf einem zufällig ausgewählten Namen stoppt.', whenToUseTitle: 'Wann sollte man ein Namensrad verwenden?', useCases: [{title:'Gewinnerauswahl',description:'Gewinnspielgewinner transparent auswählen'},{title:'Schülerauswahl',description:'Schüler für Präsentationen auswählen'},{title:'Moderatorauswahl',description:'Wer leitet das nächste Meeting?'},{title:'Tombola-Ziehungen',description:'Faire Tombolas und Lotterien durchführen'},{title:'Wichteln',description:'Beschenkte zufällig zuweisen'}], seoTitle: 'Kostenloses Namensrad online', seoText: 'Das kostenlose Namensrad ist der einfachste Weg, einen zufälligen Namen aus Ihrer Liste auszuwählen. Perfekt für Klassenzimmer, Büros oder Gewinnspiele. Namen eingeben, das farbige Rad drehen und sofortiges Zufallsergebnis erhalten. Kein Konto erforderlich.' },
      'random-name-picker': { h1: 'Zufälliger Namenswähler – Namen fair auswählen', subtitle: 'Liste einfügen und in Sekunden einen zufälligen Namen auswählen. Absolut unvoreingenommen.', microText: 'Kostenlos • Ohne Anmeldung • Sofortiges Ergebnis', howItWorksTitle: 'Wie funktioniert dieser Namenswähler?', howItWorksText: 'Fügen Sie Namen zur Liste hinzu, klicken Sie auf Drehen und beobachten Sie das Rad, bis es auf einem zufällig gewählten Namen stoppt.', whenToUseTitle: 'Wann sollte man einen Namenswähler verwenden?', useCases: [{title:'Gewinnerauswahl',description:'Gewinner aus Wettbewerbsteilnehmern auswählen'},{title:'Klassenpicker',description:'Schüler zufällig aufrufen'},{title:'Teamzuweisungen',description:'Aufgaben fair verteilen'},{title:'Stream-Interaktionen',description:'Zuschauer für Belohnungen auswählen'},{title:'Preisziehungen',description:'Transparente Preisauswahl durchführen'}], seoTitle: 'Kostenloser Zufalls-Namenswähler Online — Keine Anmeldung', seoText: 'Unser kostenloser Zufalls-Namenswähler lässt Sie eine Namensliste hinzufügen und einen oder mehrere per Zufalls-Rad auswählen. Kein Konto, keine App. Verwendet die Web Crypto API — kryptografisch sicher und nicht vorhersehbar.' },
      'giveaway-picker': { h1: 'Gewinnspiel-Picker – Gewinner fair auswählen', subtitle: 'Führen Sie transparente Gewinnspiele durch und wählen Sie Gewinner aus, denen Ihr Publikum vertrauen kann.', microText: 'Kostenlos • Ohne Anmeldung • Sofortiges Ergebnis', howItWorksTitle: 'Wie funktioniert dieser Gewinnspiel-Picker?', howItWorksText: 'Fügen Sie Ihre Teilnehmer- oder Benutzerliste ein, drehen Sie das Rad und lassen Sie die Zufallsauswahl Ihren Gewinner bestimmen.', whenToUseTitle: 'Wann sollte man einen Gewinnspiel-Picker verwenden?', useCases: [{title:'Instagram-Gewinnspiele',description:'Gewinner aus Kommentaren oder Followern auswählen'},{title:'YouTube/Twitch-Wettbewerbe',description:'Abonnenten live im Stream auswählen'},{title:'Markenaktionen',description:'Marketing-Gewinnspiele professionell durchführen'},{title:'Mehrere Gewinner',description:'1, 5 oder 10+ Gewinner auf einmal auswählen'},{title:'Community-Events',description:'Engagierte Community-Mitglieder belohnen'}], seoTitle: 'Kostenloser Gewinnspiel-Picker — Gewinner transparent auswählen', seoText: 'Unser kostenloser Gewinnspiel-Picker lässt Sie eine Teilnehmerliste einfügen, ein farbiges Rad drehen und in Sekunden einen oder mehrere Zufallsgewinner auswählen. Bildschirmaufnahme des Drehens als Transparenzbeweis. Kein Konto, keine gespeicherten Daten.' },
      'weighted-random-picker': { h1: 'Gewichtetes Zufallsrad – Individuelle Wahrscheinlichkeiten', subtitle: 'Weisen Sie jedem Teilnehmer unterschiedliche Chancen für erweiterte Auswahlszenarien zu.', microText: 'Kostenlos • Ohne Anmeldung • Sofortiges Ergebnis', howItWorksTitle: 'Wie funktioniert das gewichtete Zufallsrad?', howItWorksText: 'Fügen Sie Teilnehmer hinzu und weisen Sie jedem ein Gewicht zu (höher = mehr Chancen). Die Radsegmente sind proportional zu den Gewichten.', whenToUseTitle: 'Wann sollte man einen gewichteten Zufallspicker verwenden?', useCases: [{title:'Treueprogramme',description:'Stammkunden mit besseren Chancen belohnen'},{title:'Abonnentenstufen',description:'Bessere Chancen für treue Unterstützer'},{title:'Teambeiträge',description:'Auswahl nach Aufwand oder Dienstalter gewichten'},{title:'Engagement-Belohnungen',description:'Mehr Einträge für mehr Engagement'},{title:'Spielmechanik',description:'Ausgewogene Zufallsbegegnungen erstellen'}], seoTitle: 'Kostenloser gewichteter Zufallspicker Online', seoText: 'Unser kostenloser gewichteter Zufallspicker ermöglicht individuelle Wahrscheinlichkeiten für jeden Teilnehmer. Perfekt für Treueprogramme und gestufte Gewinnspiele. Die Formel ist einfach: Wahrscheinlichkeit = (Ihr Gewicht ÷ Gesamtgewicht) × 100.' },
      'yes-or-no-wheel': { h1: 'Ja-oder-Nein-Rad – Die Entscheidung dem Rad überlassen', subtitle: 'Unentschlossen? Drehen Sie das Ja-oder-Nein-Rad für eine sofortige Antwort.', microText: 'Kostenlos • Kein Konto • Sofortige Antwort', howItWorksTitle: 'Wie funktioniert das Ja-oder-Nein-Rad?', howItWorksText: "Klicken Sie einfach auf Drehen und lassen Sie das Rad zwischen Ja und Nein entscheiden. Es verwendet kryptografische Zufälligkeit – keine Option wird bevorzugt.", whenToUseTitle: 'Wann sollte man ein Ja-oder-Nein-Rad verwenden?', useCases: [{title:'Tägliche Entscheidungen',description:'Entscheidungsschleifen sofort durchbrechen'},{title:'Gruppendebatten',description:'Das Rad Streitigkeiten beilegen lassen'},{title:'Partyspiele',description:'Spieleabenden ein zufälliges Element hinzufügen'},{title:'Klassenspaß',description:'Zufällige Ja/Nein-Entscheidungen interessant gestalten'},{title:'Challenges',description:'Challenges zufällig annehmen oder ablehnen'}], seoTitle: 'Kostenloses Ja-oder-Nein-Rad Online', seoText: 'Können Sie sich nicht entscheiden? Drehen Sie unser kostenloses Ja-oder-Nein-Rad. Perfekt für Entscheidungsschleifen, Gruppendebatten oder Partyspiele. Im Gegensatz zu einem Münzwurf können Sie das Rad mit weiteren Optionen wie "Vielleicht" oder "Später" anpassen.' },
      'team-generator': { h1: 'Team-Generator – Faire und zufällige Teamaufteilung', subtitle: 'Teilen Sie Ihre Gruppe sofort in ausgewogene, zufällige Teams auf.', microText: 'Kostenlos • Ohne Anmeldung • Sofortiges Ergebnis', howItWorksTitle: 'Wie funktioniert der Team-Generator?', howItWorksText: 'Namen eingeben, Teamanzahl oder Teamgröße festlegen und drehen. Das Tool weist Teilnehmer mithilfe kryptografischer Zufälligkeit den Teams zu.', whenToUseTitle: 'Wann sollte man einen Team-Generator verwenden?', useCases: [{title:'Sport & Spiele',description:'Ausgewogene Teams für jeden Sport erstellen'},{title:'Schulprojekte',description:'Schüler fair Projektgruppen zuweisen'},{title:'Teambuilding',description:'Abteilungen für Firmenaktivitäten mischen'},{title:'Turniere',description:'Gruppen und Brackets zufällig zusammenstellen'},{title:'Partyspiele',description:'Gäste für Aktivitäten in Teams aufteilen'}], seoTitle: 'Kostenloser Zufalls-Team-Generator Online', seoText: 'Teilen Sie Personen schnell und fair in Teams auf mit unserem kostenlosen Team-Generator. Ideal für Sporttage, Schulprojekte oder Teambuilding-Aktivitäten. Namen einfügen, Teamanzahl festlegen und sofort generieren.' },
      'random-number-generator': { h1: 'Zufallszahlengenerator – Sofort eine Zahl auswählen', subtitle: 'Wirklich zufällige Zahlen in jedem Bereich generieren. Keine Muster, kein Bias.', microText: 'Kostenlos • Kein Konto • Sofortiges Ergebnis', howItWorksTitle: 'Wie funktioniert dieser Zufallszahlengenerator?', howItWorksText: 'Legen Sie Ihren Bereich (Min. und Max.) fest, klicken Sie auf Drehen und erhalten Sie eine kryptografisch zufällige Zahl.', whenToUseTitle: 'Wann sollte man einen Zufallszahlengenerator verwenden?', useCases: [{title:'Lotterie-Ziehungen',description:'Gewinnende Lotterie- oder Tombola-Zahlen auswählen'},{title:'Spielmechanik',description:'Würfeln, zufällige Statistiken generieren'},{title:'Mathe-Unterricht',description:'Zufällige Zahlenübungen erstellen'},{title:'Reihenfolgeauswahl',description:'Wer präsentiert zuerst? Zahl auswählen'},{title:'Preisziehungen',description:'Preise zufälligen Ticketnummern zuweisen'}], seoTitle: 'Kostenloser Zufallszahlengenerator Online', seoText: 'Unser kostenloser Zufallszahlengenerator erstellt kryptografisch sichere Zahlen in jedem von Ihnen definierten Bereich. Perfekt für Lotterien, Spielmechanik, Unterricht oder jede Situation, die unvoreingenommene Zufallszahlen erfordert.' },
      'party-wheel': { h1: 'Party-Rad – Zufällige Challenges und Mutproben', subtitle: 'Drehen Sie das Party-Rad für zufällige Challenges, Aufgaben und Mutproben. Perfekt für Spieleabende.', microText: 'Kostenlos • Ohne Anmeldung • Sofortiger Spaß', howItWorksTitle: 'Wie funktioniert das Party-Rad?', howItWorksText: 'Laden Sie das Rad mit Party-Challenges, Mutproben oder Aufgaben und drehen Sie es zur zufälligen Zuweisung. Nutzen Sie die vorgeladenen Optionen oder passen Sie das Rad an.', whenToUseTitle: 'Wann sollte man ein Party-Rad verwenden?', useCases: [{title:'Spieleabende',description:'Brettspielen zufällige Challenges hinzufügen'},{title:'Gruppenaktivitäten',description:'Partygäste zufällige Aufgaben zuweisen'},{title:'Party-Pfänder',description:'Für Challenges und Pfänder drehen'},{title:'Wettbewerbe',description:'Zufällige Preise oder Challenge-Zuweisungen'},{title:'Eisbrecher',description:'Lustige Gesprächsstarter-Fragen'}], seoTitle: 'Kostenloses Party-Rad für Spieleabende', seoText: 'Machen Sie jede Party oder jeden Spieleabend aufregender mit unserem kostenlosen Party-Rad. Drehen Sie um Challenges, Pfänder, Aufgaben oder Preise zufällig zuzuweisen. Kostenlos, sofort, kein Konto erforderlich.' },
      'classroom-picker': { h1: 'Klassenzimmer-Picker – Schüler zufällig auswählen', subtitle: 'Schüler zufällig für Fragen, Aufgaben und Aktivitäten auswählen. Fair und stressfrei.', microText: 'Kostenlos • Ohne Anmeldung • Sofortiges Ergebnis', howItWorksTitle: 'Wie funktioniert dieser Klassenzimmer-Picker?', howItWorksText: 'Fügen Sie die Namen Ihrer Schüler hinzu und klicken Sie auf Drehen. Das Rad wählt einen Schüler zufällig aus und stellt sicher, dass jeder die gleiche faire Chance hat.', whenToUseTitle: 'Wann sollte man einen Klassenzimmer-Picker verwenden?', useCases: [{title:'Fragerunden',description:'Schüler zufällig zum Antworten aufrufen'},{title:'Gruppenprojekte',description:'Schüler fair Gruppen zuweisen'},{title:'Präsentationen',description:'Zufällige Präsentationsreihenfolge'},{title:'Klassenbelohnungen',description:'Schüler zufällig für Preise auswählen'},{title:'Rollenzuweisung',description:'Rollen und Aufgaben zufällig zuweisen'}], seoTitle: 'Kostenloser Schüler-Picker für das Klassenzimmer', seoText: 'Unser kostenloser Klassenzimmer-Picker hilft Lehrern, Schüler ohne Voreingenommenheit zufällig auszuwählen. Klassenliste eingeben und Rad drehen — perfekt für Abfragen, Präsentationsreihenfolge oder Gruppenbildung.' },
      'secret-santa-picker': { h1: 'Wichteln-Picker – Geschenkgeber zufällig zuweisen', subtitle: 'Organisieren Sie Ihren Wichtel-Austausch in Sekunden. Fair, anonym und unterhaltsam.', microText: 'Kostenlos • Ohne Anmeldung • Sofortiges Ergebnis', howItWorksTitle: 'Wie funktioniert der Wichteln-Picker?', howItWorksText: 'Fügen Sie die Namen der Teilnehmer hinzu, klicken Sie auf Drehen und das Rad weist jeder Person zufällig einen Beschenkten zu.', whenToUseTitle: 'Wann sollte man einen Wichteln-Picker verwenden?', useCases: [{title:'Büropartys',description:'Anonymer Geschenkeaustausch bei der Arbeit'},{title:'Freundesgruppen',description:'Faire zufällige Zuweisung unter Freunden'},{title:'Familienevents',description:'Weihnachtsgeschenke-Austausch für große Familien'},{title:'Online-Events',description:'Remote oder virtuelles Wichteln'},{title:'Schulevents',description:'Geschenkeaustausch im Klassenzimmer'}], seoTitle: 'Kostenloser Wichteln-Picker Online', seoText: 'Organisieren Sie Ihr Wichteln in Sekunden mit unserem kostenlosen Picker. Alle Namen eingeben, Rad drehen und Geschenkpaare zufällig zuweisen. Kein Konto, keine E-Mail erforderlich — alles läuft in Ihrem Browser.' },
      'raffle-picker': { h1: 'Tombola-Picker – Zufällig Gewinner auswählen', subtitle: 'Faire Tombola-Ziehungen durchführen und Gewinner zufällig bestimmen. Transparent und vertrauenswürdig.', microText: 'Kostenlos • Ohne Anmeldung • Sofortiges Ergebnis', howItWorksTitle: 'Wie funktioniert dieser Tombola-Picker?', howItWorksText: 'Geben Sie Ihre Los-Nummern oder Teilnehmernamen ein, drehen Sie das Rad und die Zufallsauswahl bestimmt Ihren Gewinner.', whenToUseTitle: 'Wann sollte man einen Tombola-Picker verwenden?', useCases: [{title:'Wohltätigkeitsveranstaltungen',description:'Tombola-Gewinner bei Charity-Events ziehen'},{title:'Preisverlosungen',description:'Preisgewinner aus Tickets auswählen'},{title:'Community-Tombolas',description:'Faire Ziehungen für Vereinsmitglieder'},{title:'Live-Events',description:'Auf dem Bildschirm drehen für volle Transparenz'},{title:'Online-Tombolas',description:'Digitale Tombola-Ziehungen für virtuelle Events'}], seoTitle: 'Kostenloser Online-Tombola-Picker', seoText: 'Unser kostenloser Tombola-Picker macht Gewinner-Ziehungen transparent, fair und aufregend. Teilnehmernamen oder Ticket-Nummern hinzufügen, Anzahl der Gewinner festlegen und Rad live drehen. Kein Konto erforderlich.' },
    },
    preparingWheel: 'Rad wird vorbereitet...',

    // Common
    loading: 'Laden...',

    // Homepage Island
    indexPageTitle: 'Glücksrad — Kostenloser Zufallsgenerator',
    indexSpinsText: 'Drehungen seit Jahresbeginn',
    tapToSpin: 'DRÜCKEN zum Drehen des Rads!',
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
    toolbarCustomize: 'Anpassen',
    toolbarSave: 'Speichern',
    toolbarSaving: 'Speichert…',
    toolbarAddImage: 'Bild hinzufügen',
    toolbarChangeImage: 'Bild ändern',
    customizeTitle: 'Rad anpassen',
    customizeTabAppearance: 'Aussehen',
    customizeTabDuringSpin: 'Beim Drehen',
    customizeTabAfterSpin: 'Nach dem Drehen',
    customizeColorTheme: 'Farbthema',
    customizeBorder: 'Rad-Rahmen',
    customizeTickSound: 'Klickton',
    customizeTickSoundDesc: 'Spielt bei jedem Segment einen Klickton ab',
    customizeTickVolume: 'Klicklautstärke',
    customizeTickStyle: 'Klicktonart',
    customizeSilent: 'Lautlos',
    customizeLoud: 'Laut',
    customizeSpinDuration: 'Drehdauer',
    customizeVictorySound: 'Siegeston',
    customizeVictorySoundDesc: 'Spielt eine Fanfare ab, wenn der Gewinner enthüllt wird',
    customizeVictoryVolume: 'Siegeslautstärke',
    customizeConfetti: 'Konfetti',
    customizeConfettiDesc: 'Startet Konfetti, wenn der Gewinner enthüllt wird',
    customizeShowRemove: 'Entfernen-Schaltfläche anzeigen',
    customizeShowRemoveDesc: 'Zeigt eine Schaltfläche zum Entfernen des Gewinners und erneuten Drehen',
    customizeReset: 'Zurücksetzen',
    customizeDone: 'Fertig',
    winnerModalTitle: 'Wir haben einen Gewinner!',
    winnerModalClose: 'Schließen',
    winnerModalRemove: 'Entfernen',
    clickToSpin: 'Klicken zum Drehen',
    clickToSpinSub: 'oder Strg+Enter',
    addWheel: 'Rad hinzufügen',
    removeWheel: 'Entfernen',
    wheelPrefix: 'Rad',
    nextToolTryAlso: 'Auch ausprobieren:',
    nextToolYesNo: 'Ja-oder-Nein-Rad',
    nextToolTeam: 'Team-Generator',
    nextToolNumber: 'Zufallszahlen',
    nextToolGiveaway: 'Gewinnspiel',
    nextToolClassroom: 'Klassenauswahl',
    toastLinkCopied: 'Link kopiert!',
    toastLinkCopiedDesc: 'Teile ihn, um dein Rad vorab zu laden.',
    toastCopyFailed: 'Kopieren fehlgeschlagen — kopiere die URL aus der Adressleiste.',
    toastWheelSaved: 'Rad in der Galerie gespeichert! 🎡',
    toastGalleryCopied: 'Link zur Galerie kopiert.',
    toastSaveFailed: 'Speichern fehlgeschlagen. Versuche es erneut.',
    indexTrustFree: '100% kostenlos',
    indexTrustNoSignup: 'Ohne Anmeldung',
    indexTrustCrypto: 'Krypto-fair',
    faqsTitle: 'Häufig gestellte Fragen',
    relatedBlogPostLabel: 'Schritt-für-Schritt-Anleitung gewünscht?',
    blogSubtitle: 'Anleitungen zu Gewinnspielen, zufälliger Auswahl im Unterricht, fairer Teamaufteilung und mehr.',
    blogFeatured: 'Empfohlen',
    blogReadGuide: 'Anleitung lesen',
    blogRead: 'Lesen',
    blogTryTools: 'Tools kostenlos ausprobieren',
    blogTagGiveaways: 'Gewinnspiele',
    blogTagEducation: 'Bildung',
    blogTagTeams: 'Teams',
    blogTagTools: 'Tools',
    blogTagIdeas: 'Ideen',
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
    localStorageSaved: 'Sua lista está salva localmente no seu navegador.',
    footerTools: 'Ferramentas',
    footerGiveaways: 'Sorteios',
    footerResources: 'Recursos',
    footerTagline: '— Ferramenta Gratuita de Roleta',
    footerAllRights: 'Todos os direitos reservados.',
    bottleAddPlayer: 'Adicionar jogador...',
    bottleSpin: '🍾 Girar a Garrafa',
    bottleSpinning: '🍾 Girando...',
    bottlePlayers: 'Jogadores',
    bottleHistory: 'Histórico',
    bottleResult: 'A garrafa aponta para:',
    bottleMinPlayers: 'Adicione pelo menos 2 jogadores',
    bottleClearHistory: 'Limpar',

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
    navBlog: 'Blog',
    navGallery: 'Galeria',
    navFullscreen: 'Tela cheia',

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
      'random-wheel': { h1: 'Roleta Aleatória – Gire a Roda Online', subtitle: 'Gire uma roleta aleatória para escolher um vencedor na hora. Grátis, rápido e justo.', microText: 'Grátis • Sem cadastro • Resultado imediato', howItWorksTitle: 'Como funciona essa roleta aleatória?', howItWorksText: 'Digite nomes ou opções, cole uma lista ou carregue um modelo. Clique em Girar e assista a roda girar com uma animação suave.', whenToUseTitle: 'Quando usar uma roleta aleatória?', useCases: [{title:'Sorteios em redes sociais',description:'Escolha ganhadores para concursos do Instagram e TikTok'},{title:'Lives e streams',description:'Anime seus lives com sorteios em tempo real'},{title:'Atividades na aula',description:'Selecione alunos aleatoriamente para perguntas'},{title:'Decisões de equipe',description:'Atribua tarefas ou escolha quem começa'},{title:'Jogos de festa',description:'Adicione emoção a qualquer reunião'}], seoTitle: 'Roleta aleatória gratuita online — Gire para decidir', seoText: 'Nossa roleta aleatória gratuita é a forma mais rápida de tomar decisões imparciais online. Adicione opções, gire a roleta e obtenha um resultado instantâneo. Sem conta, sem anúncios, sem limite de giros. Usa a Web Crypto API para aleatoriedade criptograficamente segura.' },
      'wheel-of-names': { h1: 'Roleta de Nomes – Escolha um Nome Aleatório na Hora', subtitle: 'Digite os nomes, gire a roda e deixe o destino decidir. Justo e transparente.', microText: 'Grátis • Sem cadastro • Resultado imediato', howItWorksTitle: 'Como funciona essa roleta de nomes?', howItWorksText: 'Cole sua lista de nomes, clique em girar e veja a roda girar até parar em um nome escolhido aleatoriamente.', whenToUseTitle: 'Quando usar uma roleta de nomes?', useCases: [{title:'Vencedores de concursos',description:'Selecione ganhadores de sorteios com transparência'},{title:'Seleção de alunos',description:'Escolha alunos para apresentações'},{title:'Facilitador de reuniões',description:'Escolha quem conduz a próxima reunião'},{title:'Rifas e sorteios',description:'Realize rifas e loterias justas'},{title:'Amigo Secreto',description:'Atribua destinatários de presentes aleatoriamente'}], seoTitle: 'Roleta de nomes gratuita online', seoText: 'A roleta de nomes gratuita é a forma mais simples de selecionar um nome aleatório da sua lista. Perfeita para salas de aula, escritórios ou concursos. Digite nomes, gire a roleta colorida e obtenha um resultado aleatório instantâneo. Sem conta necessária.' },
      'random-name-picker': { h1: 'Sorteio de Nomes – Escolha com Justiça', subtitle: 'Cole sua lista e sorteie um nome em segundos. Zero viés, garantido.', microText: 'Grátis • Sem cadastro • Resultado imediato', howItWorksTitle: 'Como funciona esse sorteio de nomes?', howItWorksText: 'Adicione nomes à sua lista, clique em Girar e veja a roda girar até parar em um nome escolhido aleatoriamente.', whenToUseTitle: 'Quando usar um sorteador de nomes?', useCases: [{title:'Seleção de ganhadores',description:'Escolha ganhadores entre os participantes'},{title:'Seletor de sala de aula',description:'Chame alunos aleatoriamente'},{title:'Atribuição de equipes',description:'Distribua tarefas de forma justa'},{title:'Interações em stream',description:'Selecione espectadores para recompensas'},{title:'Sorteios de prêmios',description:'Realize seleções de prêmios transparentes'}], seoTitle: 'Sorteador de nomes gratuito online — Sem cadastro', seoText: 'Nosso sorteador de nomes gratuito permite adicionar uma lista de nomes e sortear um ou mais com uma roleta visual. Sem conta, sem app. Usa a Web Crypto API — criptograficamente seguro e imprevisível. Seus nomes nunca saem do seu dispositivo.' },
      'giveaway-picker': { h1: 'Sorteador de Brindes – Escolha Ganhadores com Justiça', subtitle: 'Faça sorteios transparentes e escolha ganhadores em quem seu público vai confiar.', microText: 'Grátis • Sem cadastro • Resultado imediato', howItWorksTitle: 'Como funciona esse sorteador de brindes?', howItWorksText: 'Cole a lista de participantes ou usuários, gire a roda e deixe a seleção aleatória escolher o seu vencedor.', whenToUseTitle: 'Quando usar um sorteador de giveaways?', useCases: [{title:'Giveaways do Instagram',description:'Escolha ganhadores de comentários ou seguidores'},{title:'Concursos YouTube/Twitch',description:'Selecione inscritos ao vivo na transmissão'},{title:'Promoções de marca',description:'Realize giveaways de marketing profissionalmente'},{title:'Vários ganhadores',description:'Selecione 1, 5 ou 10+ ganhadores de uma vez'},{title:'Eventos comunitários',description:'Recompense membros da comunidade engajados'}], seoTitle: 'Sorteador de giveaway gratuito — Escolha ganhadores com transparência', seoText: 'Nosso sorteador de giveaway gratuito permite colar uma lista de participantes, girar uma roleta colorida e selecionar ganhadores aleatórios em segundos. Grave o sorteio como prova de transparência. Sem conta, sem dados armazenados.' },
      'weighted-random-picker': { h1: 'Roleta com Pesos – Sorteios com Probabilidades Personalizadas', subtitle: 'Atribua chances diferentes para cada participante em cenários de seleção avançados.', microText: 'Grátis • Sem cadastro • Resultado imediato', howItWorksTitle: 'Como funciona a roleta com pesos?', howItWorksText: 'Adicione participantes e atribua um peso a cada um (maior = mais chances). Os segmentos da roda são proporcionais aos pesos.', whenToUseTitle: 'Quando usar um sorteio ponderado?', useCases: [{title:'Programas de fidelidade',description:'Recompense clientes frequentes com melhores chances'},{title:'Níveis de assinantes',description:'Melhores chances para apoiadores fiéis'},{title:'Contribuições da equipe',description:'Pondere a seleção por esforço ou antiguidade'},{title:'Recompensas de engajamento',description:'Mais entradas para mais engajamento'},{title:'Mecânicas de jogo',description:'Crie encontros aleatórios equilibrados'}], seoTitle: 'Sorteio ponderado gratuito online', seoText: 'Nosso sorteador aleatório ponderado permite atribuir probabilidades personalizadas a cada participante. Perfeito para programas de fidelidade e sorteios em níveis. A fórmula é simples: Probabilidade = (Seu peso ÷ Peso total) × 100.' },
      'yes-or-no-wheel': { h1: 'Roleta Sim ou Não – Deixe a Roda Decidir', subtitle: 'Sem conseguir se decidir? Gire a roleta sim ou não para uma resposta imediata.', microText: 'Grátis • Sem conta • Resposta imediata', howItWorksTitle: 'Como funciona a roleta sim ou não?', howItWorksText: "Clique em Girar e deixe a roda decidir entre Sim e Não. Usa aleatoriedade criptográfica — nenhuma opção é favorecida.", whenToUseTitle: 'Quando usar uma roleta Sim ou Não?', useCases: [{title:'Decisões diárias',description:'Quebre o loop de indecisão instantaneamente'},{title:'Debates em grupo',description:'Deixe a roleta resolver argumentos'},{title:'Jogos de festa',description:'Adicione um elemento aleatório às noites de jogos'},{title:'Diversão na aula',description:'Torne escolhas aleatórias sim/não envolventes'},{title:'Desafios',description:'Aceite ou pule desafios aleatoriamente'}], seoTitle: 'Roleta Sim ou Não gratuita online', seoText: 'Não consegue decidir? Gire nossa roleta gratuita Sim ou Não. Perfeita para quebrar loops de indecisão, resolver debates ou animar jogos de festa. Personalizável com opções como "Talvez" ou "Depois".' },
      'team-generator': { h1: 'Gerador de Times – Divisão Justa e Aleatória', subtitle: 'Divida seu grupo em times equilibrados e aleatórios na hora.', microText: 'Grátis • Sem cadastro • Resultado imediato', howItWorksTitle: 'Como funciona o gerador de times?', howItWorksText: 'Adicione os nomes dos participantes, defina o número de times ou o tamanho e gire. A ferramenta distribui os participantes usando aleatoriedade criptográfica.', whenToUseTitle: 'Quando usar um gerador de equipes?', useCases: [{title:'Esportes e jogos',description:'Crie equipes equilibradas para qualquer esporte'},{title:'Projetos escolares',description:'Atribua alunos a grupos de forma justa'},{title:'Team Building',description:'Misture departamentos para atividades corporativas'},{title:'Torneios',description:'Sorteie grupos e chaves aleatoriamente'},{title:'Jogos de festa',description:'Divida os convidados em equipes para atividades'}], seoTitle: 'Gerador de equipes aleatório gratuito online', seoText: 'Divida pessoas em equipes de forma rápida e justa com nosso gerador de equipes gratuito. Ideal para dias de esporte, projetos escolares ou team building. Cole nomes, defina o número de equipes e gere instantaneamente.' },
      'random-number-generator': { h1: 'Gerador de Números Aleatórios – Obtenha um Número na Hora', subtitle: 'Gere números verdadeiramente aleatórios em qualquer faixa. Sem padrões, sem viés.', microText: 'Grátis • Sem conta • Resultado imediato', howItWorksTitle: 'Como funciona esse gerador de números aleatórios?', howItWorksText: 'Defina sua faixa (mín. e máx.), clique em girar e obtenha um número criptograficamente aleatório.', whenToUseTitle: 'Quando usar um gerador de números aleatórios?', useCases: [{title:'Sorteios de loteria',description:'Escolha números vencedores de loteria ou rifa'},{title:'Mecânicas de jogo',description:'Role dados, gere estatísticas aleatórias'},{title:'Ensino de matemática',description:'Crie exercícios com números aleatórios'},{title:'Seleção de ordem',description:'Quem apresenta primeiro? Escolha um número'},{title:'Sorteios de prêmios',description:'Atribua prêmios a números de ticket aleatórios'}], seoTitle: 'Gerador de números aleatórios gratuito online', seoText: 'Nosso gerador de números aleatórios gratuito cria números criptograficamente seguros em qualquer faixa que você definir. Perfeito para loterias, mecânicas de jogo ou qualquer situação que exija números aleatórios imparciais.' },
      'party-wheel': { h1: 'Roleta de Festa – Desafios e Penitências Aleatórias', subtitle: 'Gire a roleta de festa para desafios, tarefas e penitências aleatórias. Perfeita para noites de jogos.', microText: 'Grátis • Sem cadastro • Diversão imediata', howItWorksTitle: 'Como funciona a roleta de festa?', howItWorksText: 'Carregue a roda com desafios, penitências ou tarefas e gire para atribuí-los aleatoriamente. Use as opções pré-carregadas ou personalize com seus próprios desafios.', whenToUseTitle: 'Quando usar uma roleta de festa?', useCases: [{title:'Noites de jogos',description:'Adicione desafios aleatórios aos jogos de tabuleiro'},{title:'Atividades em grupo',description:'Atribua tarefas aleatórias aos convidados'},{title:'Prendas de festa',description:'Gire para desafios e prendas'},{title:'Competições',description:'Prêmios aleatórios ou atribuição de desafios'},{title:'Quebra-gelos',description:'Perguntas divertidas para iniciar conversas'}], seoTitle: 'Roleta de festa gratuita para noites de jogos', seoText: 'Torne qualquer festa ou noite de jogos mais emocionante com nossa roleta de festa gratuita. Gire para atribuir aleatoriamente desafios, prendas, tarefas ou prêmios. Personalize com suas próprias ideias. Gratuito, instantâneo, sem conta necessária.' },
      'classroom-picker': { h1: 'Sorteador de Alunos – Selecione Alunos Aleatoriamente', subtitle: 'Escolha alunos aleatoriamente para perguntas, tarefas e atividades. Justo e sem estresse.', microText: 'Grátis • Sem cadastro • Resultado imediato', howItWorksTitle: 'Como funciona esse sorteador de alunos?', howItWorksText: 'Adicione os nomes dos seus alunos e clique em girar. A roda seleciona um aluno aleatoriamente, garantindo que todos tenham uma chance igual.', whenToUseTitle: 'Quando usar um seletor de sala de aula?', useCases: [{title:'Sessões de perguntas',description:'Escolha alunos aleatoriamente para responder'},{title:'Projetos em grupo',description:'Atribua alunos a grupos de forma justa'},{title:'Apresentações',description:'Seleção aleatória da ordem de apresentação'},{title:'Recompensas da turma',description:'Escolha alunos aleatoriamente para prêmios'},{title:'Atribuição de papéis',description:'Atribua papéis e tarefas aleatoriamente'}], seoTitle: 'Seletor de alunos gratuito para sala de aula', seoText: 'Nosso seletor de sala de aula gratuito ajuda professores a selecionar alunos aleatoriamente sem viés ou repetição. Digite sua lista de turma e gire a roleta — perfeito para chamadas orais, ordem de apresentação ou formação de grupos.' },
      'secret-santa-picker': { h1: 'Amigo Secreto – Atribua Presentes Aleatoriamente', subtitle: 'Organize sua troca de presentes em segundos. Justo, anônimo e divertido.', microText: 'Grátis • Sem cadastro • Resultado imediato', howItWorksTitle: 'Como funciona o sorteador de amigo secreto?', howItWorksText: 'Adicione os nomes dos participantes, clique em girar e a roda atribui a cada pessoa um destinatário de presente aleatório.', whenToUseTitle: 'Quando usar um seletor de Amigo Secreto?', useCases: [{title:'Festas de escritório',description:'Troca de presentes anônima no trabalho'},{title:'Grupos de amigos',description:'Atribuição aleatória justa entre amigos'},{title:'Eventos familiares',description:'Troca de presentes para famílias grandes'},{title:'Eventos online',description:'Amigo Secreto remoto ou virtual'},{title:'Eventos escolares',description:'Atividades de troca de presentes na sala'}], seoTitle: 'Seletor de Amigo Secreto gratuito online', seoText: 'Organize sua troca de Amigo Secreto em segundos com nosso seletor gratuito. Digite todos os nomes, gire a roleta e atribua pares de presentes aleatoriamente. Sem conta, sem e-mail — tudo no seu navegador para total privacidade.' },
      'raffle-picker': { h1: 'Sorteador de Rifa – Escolha Ganhadores Aleatoriamente', subtitle: 'Faça rifas justas e escolha ganhadores aleatoriamente. Transparente e confiável.', microText: 'Grátis • Sem cadastro • Resultado imediato', howItWorksTitle: 'Como funciona esse sorteador de rifa?', howItWorksText: 'Digite os bilhetes ou nomes dos participantes, gire a roda e a seleção aleatória escolhe o seu ganhador.', whenToUseTitle: 'Quando usar um seletor de rifa?', useCases: [{title:'Eventos beneficentes',description:'Sorteie ganhadores de rifa em eventos de caridade'},{title:'Sorteios de prêmios',description:'Selecione ganhadores de prêmios dos tickets'},{title:'Rifas comunitárias',description:'Sorteios justos para membros de associações'},{title:'Eventos ao vivo',description:'Gire na tela para transparência total'},{title:'Rifas online',description:'Sorteios digitais para eventos virtuais'}], seoTitle: 'Seletor de rifa gratuito online', seoText: 'Nosso seletor de rifa gratuito torna os sorteios transparentes, justos e emocionantes. Adicione nomes ou números de ticket, defina o número de ganhadores e gire a roleta ao vivo. Sem conta necessária.' },
    },
    preparingWheel: 'Preparando a roda...',

    // Common
    loading: 'Carregando...',

    // Homepage Island
    indexPageTitle: 'Roleta Aleatória — Sorteio Gratuito',
    indexSpinsText: 'sorteios desde o início do ano',
    tapToSpin: 'PRESSIONE para girar a roleta!',
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
    toolbarCustomize: 'Personalizar',
    toolbarSave: 'Salvar',
    toolbarSaving: 'Salvando…',
    toolbarAddImage: 'Adicionar imagem',
    toolbarChangeImage: 'Trocar imagem',
    customizeTitle: 'Personalizar roda',
    customizeTabAppearance: 'Aparência',
    customizeTabDuringSpin: 'Durante o giro',
    customizeTabAfterSpin: 'Após o giro',
    customizeColorTheme: 'Tema de cores',
    customizeBorder: 'Borda da roda',
    customizeTickSound: 'Som de clique',
    customizeTickSoundDesc: 'Toca um som ao passar por cada segmento',
    customizeTickVolume: 'Volume do clique',
    customizeTickStyle: 'Estilo de som',
    customizeSilent: 'Silêncio',
    customizeLoud: 'Alto',
    customizeSpinDuration: 'Duração do giro',
    customizeVictorySound: 'Som de vitória',
    customizeVictorySoundDesc: 'Toca uma fanfarra quando o vencedor é revelado',
    customizeVictoryVolume: 'Volume de vitória',
    customizeConfetti: 'Confete',
    customizeConfettiDesc: 'Lança confetes quando o vencedor é revelado',
    customizeShowRemove: 'Mostrar botão Remover',
    customizeShowRemoveDesc: 'Exibe um botão para remover o vencedor e girar novamente',
    customizeReset: 'Redefinir',
    customizeDone: 'Concluído',
    winnerModalTitle: 'Temos um vencedor!',
    winnerModalClose: 'Fechar',
    winnerModalRemove: 'Remover',
    clickToSpin: 'Clique para girar',
    clickToSpinSub: 'ou Ctrl+Enter',
    addWheel: 'Adicionar roda',
    removeWheel: 'Remover',
    wheelPrefix: 'Roda',
    nextToolTryAlso: 'Experimente também:',
    nextToolYesNo: 'Roda Sim ou Não',
    nextToolTeam: 'Gerador de equipes',
    nextToolNumber: 'Gerador de números',
    nextToolGiveaway: 'Sorteio online',
    nextToolClassroom: 'Sorteio escolar',
    toastLinkCopied: 'Link copiado!',
    toastLinkCopiedDesc: 'Compartilhe para pré-carregar sua roda.',
    toastCopyFailed: 'Não foi possível copiar — copie a URL da barra do navegador.',
    toastWheelSaved: 'Roda salva na galeria! 🎡',
    toastGalleryCopied: 'Link para a galeria copiado.',
    toastSaveFailed: 'Não foi possível salvar. Tente novamente.',
    indexTrustFree: '100% gratuito',
    indexTrustNoSignup: 'Sem cadastro',
    indexTrustCrypto: 'Cripto justo',
    faqsTitle: 'Perguntas frequentes',
    relatedBlogPostLabel: 'Quer um guia passo a passo?',
    blogSubtitle: 'Guias sobre sorteios, seleção aleatória em salas de aula, divisão justa de equipes e mais.',
    blogFeatured: 'Destaque',
    blogReadGuide: 'Ler guia',
    blogRead: 'Ler',
    blogTryTools: 'Experimente as ferramentas gratuitamente',
    blogTagGiveaways: 'Sorteios',
    blogTagEducation: 'Educação',
    blogTagTeams: 'Equipes',
    blogTagTools: 'Ferramentas',
    blogTagIdeas: 'Ideias',
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
    localStorageSaved: 'La tua lista è salvata localmente nel tuo browser.',
    footerTools: 'Strumenti',
    footerGiveaways: 'Giveaway',
    footerResources: 'Risorse',
    footerTagline: '— Strumento Gratuito per la Ruota',
    footerAllRights: 'Tutti i diritti riservati.',
    bottleAddPlayer: 'Aggiungi giocatore...',
    bottleSpin: '🍾 Gira la Bottiglia',
    bottleSpinning: '🍾 Girando...',
    bottlePlayers: 'Giocatori',
    bottleHistory: 'Cronologia',
    bottleResult: 'La bottiglia indica:',
    bottleMinPlayers: 'Aggiungi almeno 2 giocatori',
    bottleClearHistory: 'Cancella',

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
    navBlog: 'Blog',
    navGallery: 'Galleria',
    navFullscreen: 'Schermo intero',

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
      'random-wheel': { h1: 'Ruota Casuale – Gira la Ruota Online', subtitle: 'Gira una ruota casuale per scegliere un vincitore all\'istante. Gratis, veloce e imparziale.', microText: 'Gratis • Senza registrazione • Risultato immediato', howItWorksTitle: 'Come funziona questa ruota casuale?', howItWorksText: 'Inserisci nomi o opzioni — scrivili, incolla una lista o carica un modello. Clicca su Gira e guarda la ruota ruotare con un\'animazione fluida.', whenToUseTitle: 'Quando dovresti usare una ruota casuale?', useCases: [{title:'Concorsi sui social media',description:'Scegli i vincitori in modo equo per concorsi Instagram e TikTok'},{title:'Estrazioni in diretta',description:'Coinvolgi gli spettatori con sorteggi in tempo reale su Twitch/YouTube'},{title:'Attività in classe',description:'Seleziona studenti casualmente per domande'},{title:'Decisioni di squadra',description:'Assegna compiti o scegli chi inizia'},{title:'Giochi di festa',description:'Aggiungi entusiasmo a qualsiasi riunione'}], seoTitle: 'Ruota casuale gratuita online — Gira per decidere', seoText: "La nostra ruota casuale gratuita è il modo più veloce per prendere decisioni imparziali online. Aggiungi le opzioni, gira la ruota e ottieni un risultato istantaneo. Nessun account richiesto, nessuna pubblicità, nessun limite di giri. Usa la Web Crypto API per un'aleatorietà crittograficamente sicura." },
      'wheel-of-names': { h1: 'Ruota dei Nomi – Estrai un Nome a Caso all\'Istante', subtitle: 'Inserisci i nomi, gira la ruota e lascia che il destino decida. Giusto e trasparente.', microText: 'Gratis • Senza registrazione • Risultato immediato', howItWorksTitle: 'Come funziona questa ruota dei nomi?', howItWorksText: 'Incolla la tua lista di nomi, clicca su Gira e guarda la ruota girare finché non si ferma su un nome scelto a caso.', whenToUseTitle: 'Quando dovresti usare una ruota dei nomi?', useCases: [{title:'Vincitori di concorsi',description:'Seleziona i vincitori di giveaway in modo trasparente'},{title:'Selezione studenti',description:'Scegli studenti per presentazioni'},{title:'Facilitatore di riunioni',description:'Scegli chi guida la prossima riunione'},{title:'Estrazioni a sorte',description:'Organizza tombole e lotterie eque'},{title:'Babbo Natale Segreto',description:'Assegna casualmente i destinatari dei regali'}], seoTitle: 'Ruota dei nomi gratuita online', seoText: 'La ruota dei nomi gratuita è il modo più semplice per selezionare un nome casuale dalla tua lista. Perfetta per classi, uffici o concorsi. Inserisci i nomi, gira la ruota colorata e ottieni un risultato casuale istantaneo. Nessun account richiesto.' },
      'random-name-picker': { h1: 'Estrazione Casuale di Nomi – Seleziona in Modo Equo', subtitle: 'Incolla la tua lista ed estrai un nome a caso in pochi secondi. Zero distorsioni, garantito.', microText: 'Gratis • Senza registrazione • Risultato immediato', howItWorksTitle: 'Come funziona questa estrazione casuale di nomi?', howItWorksText: 'Aggiungi nomi alla tua lista, clicca su Gira e guarda la ruota fermarsi su un nome scelto casualmente.', whenToUseTitle: 'Quando dovresti usare un estrattore di nomi?', useCases: [{title:'Selezione vincitori',description:'Scegli i vincitori tra i partecipanti al concorso'},{title:'Selettore in classe',description:'Chiama studenti casualmente'},{title:'Assegnazione team',description:'Distribuisci i compiti in modo equo'},{title:'Interazioni in stream',description:'Seleziona spettatori per premi'},{title:'Estrazioni premi',description:'Esegui selezioni di premi trasparenti'}], seoTitle: 'Estrattore di nomi casuale gratuito — Senza registrazione', seoText: "Il nostro estrattore di nomi casuale gratuito ti permette di aggiungere un elenco di nomi e selezionarne uno o più con una ruota visiva. Nessun account, nessuna app. Usa la Web Crypto API — crittograficamente sicuro e imprevedibile. I tuoi nomi non lasciano mai il tuo dispositivo." },
      'giveaway-picker': { h1: 'Estrattore per Giveaway – Scegli i Vincitori in Modo Equo', subtitle: 'Organizza giveaway trasparenti e seleziona vincitori di cui il tuo pubblico si fiderà.', microText: 'Gratis • Senza registrazione • Risultato immediato', howItWorksTitle: 'Come funziona questo estrattore per giveaway?', howItWorksText: 'Incolla la lista dei partecipanti o dei nomi utente, gira la ruota e lascia che la selezione casuale scelga il tuo vincitore.', whenToUseTitle: 'Quando dovresti usare un estrattore per giveaway?', useCases: [{title:'Giveaway Instagram',description:'Scegli i vincitori da commenti o follower'},{title:'Concorsi YouTube/Twitch',description:'Seleziona iscritti in diretta'},{title:'Promozioni di brand',description:'Gestisci giveaway di marketing professionalmente'},{title:'Più vincitori',description:'Seleziona 1, 5 o 10+ vincitori in una volta'},{title:'Eventi comunitari',description:'Premia i membri della community più attivi'}], seoTitle: 'Estrattore per giveaway gratuito — Scegli i vincitori con trasparenza', seoText: "Il nostro estrattore per giveaway gratuito ti permette di incollare un elenco di partecipanti, girare una ruota colorata e selezionare vincitori casuali in pochi secondi. Registra l'estrazione come prova di trasparenza. Nessun account, nessun dato memorizzato." },
      'weighted-random-picker': { h1: 'Ruota Ponderata – Estrazioni con Probabilità Personalizzate', subtitle: 'Assegna probabilità diverse a ciascun partecipante per scenari di selezione avanzati.', microText: 'Gratis • Senza registrazione • Risultato immediato', howItWorksTitle: 'Come funziona la ruota ponderata?', howItWorksText: 'Aggiungi i partecipanti e assegna a ciascuno un peso (più alto = più possibilità). I segmenti della ruota sono proporzionali ai pesi.', whenToUseTitle: 'Quando dovresti usare una ruota ponderata?', useCases: [{title:'Programmi fedeltà',description:'Premia i clienti abituali con probabilità migliori'},{title:'Livelli abbonati',description:'Probabilità migliori per i sostenitori fedeli'},{title:'Contributi del team',description:'Pondera la selezione per sforzo o anzianità'},{title:'Premi per engagement',description:'Più voci per più partecipazione'},{title:'Meccaniche di gioco',description:'Crea incontri casuali bilanciati'}], seoTitle: 'Estrattore casuale ponderato gratuito online', seoText: "Il nostro estrattore casuale ponderato gratuito ti permette di assegnare probabilità personalizzate a ciascun partecipante. Perfetto per programmi fedeltà e giveaway a livelli. La formula è semplice: Probabilità = (Il tuo peso ÷ Peso totale) × 100." },
      'yes-or-no-wheel': { h1: 'Ruota Sì o No – Lascia Decidere alla Ruota', subtitle: 'Non riesci a deciderti? Gira la ruota sì o no per una risposta immediata.', microText: 'Gratis • Senza account • Risposta immediata', howItWorksTitle: 'Come funziona la ruota sì o no?', howItWorksText: 'Clicca semplicemente su Gira e lascia che la ruota scelga tra Sì e No. Utilizza casualità crittografica — nessuna opzione è favorita.', whenToUseTitle: 'Quando dovresti usare una ruota Sì o No?', useCases: [{title:'Decisioni quotidiane',description:'Rompi immediatamente il loop di indecisione'},{title:'Dibattiti di gruppo',description:'Lascia che la ruota risolva le dispute'},{title:'Giochi di festa',description:'Aggiungi un elemento casuale alle serate giochi'},{title:'Divertimento in classe',description:'Rendi coinvolgenti le scelte casuali sì/no'},{title:'Sfide',description:'Accetta o salta sfide casualmente'}], seoTitle: 'Ruota Sì o No gratuita online', seoText: "Non riesci a decidere? Gira la nostra ruota gratuita Sì o No. Perfetta per rompere i loop di indecisione, risolvere dibattiti o animare le serate giochi. Personalizzabile con opzioni come 'Forse' o 'Dopo'." },
      'team-generator': { h1: 'Generatore di Squadre – Divisione Casuale ed Equa', subtitle: 'Dividi il tuo gruppo in squadre bilanciate e casuali all\'istante.', microText: 'Gratis • Senza registrazione • Risultato immediato', howItWorksTitle: 'Come funziona il generatore di squadre?', howItWorksText: 'Aggiungi i nomi dei partecipanti, imposta il numero di squadre o la dimensione e gira. Lo strumento assegna i partecipanti alle squadre con casualità crittografica.', whenToUseTitle: 'Quando dovresti usare un generatore di squadre?', useCases: [{title:'Sport e giochi',description:'Crea squadre equilibrate per qualsiasi sport'},{title:'Progetti scolastici',description:'Assegna studenti a gruppi in modo equo'},{title:'Team Building',description:'Mescola i reparti per attività aziendali'},{title:'Tornei',description:'Sorteggia gruppi e tabelloni casualmente'},{title:'Giochi di festa',description:'Dividi gli ospiti in squadre per le attività'}], seoTitle: 'Generatore di squadre casuale gratuito online', seoText: 'Dividi le persone in squadre in modo rapido ed equo con il nostro generatore di squadre gratuito. Ideale per giornate sportive, progetti scolastici o team building. Incolla i nomi, imposta il numero di squadre e genera istantaneamente.' },
      'random-number-generator': { h1: 'Generatore di Numeri Casuali – Ottieni un Numero all\'Istante', subtitle: 'Genera numeri veramente casuali in qualsiasi intervallo. Nessun pattern, nessun bias.', microText: 'Gratis • Senza account • Risultato immediato', howItWorksTitle: 'Come funziona questo generatore di numeri casuali?', howItWorksText: 'Imposta il tuo intervallo (min e max), clicca su Gira e ottieni un numero crittograficamente casuale.', whenToUseTitle: 'Quando dovresti usare un generatore di numeri casuali?', useCases: [{title:'Estrazioni lotteria',description:'Scegli i numeri vincenti di lotteria o tombola'},{title:'Meccaniche di gioco',description:'Lancia i dadi, genera statistiche casuali'},{title:'Insegnamento matematica',description:'Crea esercizi con numeri casuali'},{title:'Selezione ordine',description:'Chi presenta per primo? Scegli un numero'},{title:'Estrazioni premi',description:'Assegna premi a numeri di ticket casuali'}], seoTitle: 'Generatore di numeri casuali gratuito online', seoText: "Il nostro generatore di numeri casuali gratuito crea numeri crittograficamente sicuri in qualsiasi intervallo tu definisca. Perfetto per lotterie, meccaniche di gioco o qualsiasi situazione che richieda numeri casuali imparziali." },
      'party-wheel': { h1: 'Ruota della Festa – Sfide e Penitenze Casuali', subtitle: 'Gira la ruota della festa per sfide, compiti e penitenze casuali. Perfetta per le serate di giochi.', microText: 'Gratis • Senza registrazione • Divertimento immediato', howItWorksTitle: 'Come funziona la ruota della festa?', howItWorksText: 'Carica la ruota con sfide, penitenze o compiti, poi gira per assegnarli casualmente. Puoi usare le opzioni precaricate o personalizzarla con le tue sfide.', whenToUseTitle: 'Quando dovresti usare una ruota per feste?', useCases: [{title:'Serate giochi',description:'Aggiungi sfide casuali ai giochi da tavolo'},{title:'Attività di gruppo',description:'Assegna compiti casuali agli ospiti'},{title:'Penitenze di festa',description:'Gira per sfide e penitenze'},{title:'Competizioni',description:'Premi casuali o assegnazione di sfide'},{title:'Rompighiaccio',description:'Domande divertenti per iniziare conversazioni'}], seoTitle: 'Ruota per feste gratuita per le serate giochi', seoText: "Rendi qualsiasi festa o serata giochi più emozionante con la nostra ruota per feste gratuita. Gira per assegnare casualmente sfide, penitenze, compiti o premi. Personalizzala con le tue idee. Gratis, istantaneo, nessun account richiesto." },
      'classroom-picker': { h1: 'Estrattore per la Classe – Seleziona Studenti a Caso', subtitle: 'Scegli studenti casualmente per domande, compiti e attività. Equo e senza stress.', microText: 'Gratis • Senza registrazione • Risultato immediato', howItWorksTitle: 'Come funziona questo estrattore per la classe?', howItWorksText: 'Aggiungi i nomi dei tuoi studenti e clicca su Gira. La ruota seleziona casualmente uno studente, garantendo che tutti abbiano una possibilità uguale.', whenToUseTitle: 'Quando dovresti usare un selettore per la classe?', useCases: [{title:'Sessioni Q&A',description:'Scegli casualmente studenti per rispondere'},{title:'Progetti di gruppo',description:'Assegna studenti ai gruppi in modo equo'},{title:'Presentazioni',description:'Selezione casuale ordine di presentazione'},{title:'Premi in classe',description:'Scegli studenti casualmente per premi'},{title:'Assegnazione ruoli',description:'Assegna ruoli e compiti casualmente'}], seoTitle: 'Selettore studenti gratuito per la classe', seoText: "Il nostro selettore gratuito per la classe aiuta gli insegnanti a selezionare studenti casualmente senza bias. Inserisci la lista della classe e gira la ruota — perfetto per interrogazioni, ordine di presentazione o formazione dei gruppi." },
      'secret-santa-picker': { h1: 'Estrattore Babbo Natale Segreto – Assegna i Regali a Caso', subtitle: 'Organizza il tuo scambio di regali in pochi secondi. Equo, anonimo e divertente.', microText: 'Gratis • Senza registrazione • Risultato immediato', howItWorksTitle: "Come funziona l'estrattore Babbo Natale segreto?", howItWorksText: 'Aggiungi i nomi dei partecipanti, clicca su Gira e la ruota assegna a ciascuno un destinatario del regalo scelto a caso.', whenToUseTitle: 'Quando dovresti usare un estrattore del Babbo Natale Segreto?', useCases: [{title:'Feste in ufficio',description:'Scambio anonimo di regali al lavoro'},{title:'Gruppi di amici',description:'Assegnazione casuale equa tra amici'},{title:'Eventi familiari',description:'Scambio regali per famiglie numerose'},{title:'Eventi online',description:'Babbo Natale Segreto remoto o virtuale'},{title:'Eventi scolastici',description:'Attività di scambio regali in classe'}], seoTitle: 'Estrattore Babbo Natale Segreto gratuito online', seoText: "Organizza il tuo scambio di Babbo Natale Segreto in pochi secondi con il nostro estrattore gratuito. Inserisci tutti i nomi, gira la ruota e assegna coppie di regali casualmente. Nessun account, nessuna email richiesta — tutto nel tuo browser per la massima privacy." },
      'raffle-picker': { h1: 'Estrattore per Lotteria – Scegli i Vincitori a Caso', subtitle: 'Organizza lotterie eque e scegli i vincitori a caso. Trasparente e affidabile.', microText: 'Gratis • Senza registrazione • Risultato immediato', howItWorksTitle: 'Come funziona questo estrattore per lotteria?', howItWorksText: 'Inserisci i biglietti o i nomi dei partecipanti, gira la ruota e la selezione casuale sceglie il tuo vincitore.', whenToUseTitle: 'Quando dovresti usare un estrattore per tombola?', useCases: [{title:'Eventi di beneficenza',description:'Estrai i vincitori della tombola agli eventi di charity'},{title:'Sorteggio premi',description:'Seleziona i vincitori dei premi dai biglietti'},{title:'Tombole comunitarie',description:'Estrazioni eque per i membri delle associazioni'},{title:'Eventi dal vivo',description:'Gira in diretta per la massima trasparenza'},{title:'Tombole online',description:'Estrazioni digitali per eventi virtuali'}], seoTitle: 'Estrattore per tombola gratuito online', seoText: "Il nostro estrattore per tombola gratuito rende le estrazioni dei vincitori trasparenti, eque ed emozionanti. Aggiungi nomi o numeri di biglietto, imposta il numero di vincitori e gira la ruota dal vivo. Nessun account richiesto." },
    },
    preparingWheel: 'Preparazione ruota...',
    
    // Common
    loading: 'Caricamento...',

    // Homepage Island
    indexPageTitle: 'Ruota della Fortuna — Sorteggio Gratuito',
    indexSpinsText: 'estrazioni dall\'inizio dell\'anno',
    tapToSpin: 'PREMI per girare la ruota!',
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
    toolbarCustomize: 'Personalizza',
    toolbarSave: 'Salva',
    toolbarSaving: 'Salvataggio…',
    toolbarAddImage: 'Aggiungi immagine',
    toolbarChangeImage: 'Cambia immagine',
    customizeTitle: 'Personalizza ruota',
    customizeTabAppearance: 'Aspetto',
    customizeTabDuringSpin: 'Durante la rotazione',
    customizeTabAfterSpin: 'Dopo la rotazione',
    customizeColorTheme: 'Tema colori',
    customizeBorder: 'Bordo ruota',
    customizeTickSound: 'Suono clic',
    customizeTickSoundDesc: 'Riproduce un suono al passaggio di ogni segmento',
    customizeTickVolume: 'Volume clic',
    customizeTickStyle: 'Stile suono',
    customizeSilent: 'Silenzioso',
    customizeLoud: 'Alto',
    customizeSpinDuration: 'Durata rotazione',
    customizeVictorySound: 'Suono vittoria',
    customizeVictorySoundDesc: 'Riproduce una fanfara quando il vincitore viene rivelato',
    customizeVictoryVolume: 'Volume vittoria',
    customizeConfetti: 'Coriandoli',
    customizeConfettiDesc: 'Lancia coriandoli quando il vincitore viene rivelato',
    customizeShowRemove: 'Mostra pulsante Rimuovi',
    customizeShowRemoveDesc: 'Mostra un pulsante per rimuovere il vincitore e girare di nuovo',
    customizeReset: 'Ripristina',
    customizeDone: 'Fatto',
    winnerModalTitle: 'Abbiamo un vincitore!',
    winnerModalClose: 'Chiudi',
    winnerModalRemove: 'Rimuovi',
    clickToSpin: 'Clicca per girare',
    clickToSpinSub: 'o Ctrl+Invio',
    addWheel: 'Aggiungi ruota',
    removeWheel: 'Rimuovi',
    wheelPrefix: 'Ruota',
    nextToolTryAlso: 'Prova anche:',
    nextToolYesNo: 'Ruota Sì o No',
    nextToolTeam: 'Generatore di squadre',
    nextToolNumber: 'Generatore di numeri',
    nextToolGiveaway: 'Estrazione online',
    nextToolClassroom: 'Estrazione scolastica',
    toastLinkCopied: 'Link copiato!',
    toastLinkCopiedDesc: 'Condividilo per precaricare la tua ruota.',
    toastCopyFailed: "Impossibile copiare — copia l'URL dalla barra del browser.",
    toastWheelSaved: 'Ruota salvata nella galleria! 🎡',
    toastGalleryCopied: 'Link alla galleria copiato.',
    toastSaveFailed: 'Impossibile salvare. Riprova.',
    indexTrustFree: '100% gratuito',
    indexTrustNoSignup: 'Senza registrazione',
    indexTrustCrypto: 'Cripto equo',
    faqsTitle: 'Domande frequenti',
    relatedBlogPostLabel: 'Vuoi una guida passo passo?',
    blogSubtitle: 'Guide su sorteggi, selezione casuale in classe, divisione equa dei team e altro.',
    blogFeatured: 'In evidenza',
    blogReadGuide: 'Leggi guida',
    blogRead: 'Leggi',
    blogTryTools: 'Prova gli strumenti gratuitamente',
    blogTagGiveaways: 'Sorteggi',
    blogTagEducation: 'Educazione',
    blogTagTeams: 'Team',
    blogTagTools: 'Strumenti',
    blogTagIdeas: 'Idee',
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
