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
  navTemplates: string;
  navImport: string;
  navSave: string;
  navCustomize: string;
  navImportCsv: string;
  navImportTxt: string;
  drawTitleDefault: string;
  navGiveawaySubtitle: string;
  navFullscreen: string;
  // Tool menu — labels for the Explore-More-Tools dropdown
  navSpinWheel: string;
  navYesNo: string;
  navCoinFlip: string;
  navDecisionWheel: string;
  navNumberPicker: string;
  navRaffle: string;
  navSecretSanta: string;
  navClassroom: string;
  navTruthDare: string;
  navPartyWheel: string;
  navSpinBottle: string;
  navWheelOfNamesSubtitle: string;
  navWeightedSubtitle: string;
  // SimpleWheelIsland editor (collapsible "Customize entries" panel)
  customizeEntries: string;
  hideEditor: string;
  showEditor: string;
  onePerLineHint: string;
  onePerLinePlaceholder: string;
  entriesCount: string;
  resetToDefaults: string;
  // Cookie banner
  cookieTitle: string;
  cookieMessageBefore: string;
  cookieMessageAfter: string;
  cookiePrivacyLink: string;
  cookieDecline: string;
  cookieAccept: string;
  // Wheel toolbar (sound, share, history)
  shareWheel: string;
  shareWheelCopied: string;
  shareWheelHint: string;
  soundOn: string;
  soundOff: string;
  recentWinners: string;
  noRecentWinners: string;
  clearHistory: string;
  loadedFromLink: string;

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
