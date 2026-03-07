import { useState } from "react";
import { Shield, Shuffle, Users, Lock, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

const faqItems = [
  {
    icon: <Shield className="w-5 h-5" />,
    question: "Is this random picker truly fair and unbiased?",
    answer: "Yes, absolutely. Our random picker uses the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure random numbers. This is the same technology used by banks and security applications. Every participant has exactly equal chances in fair mode - no manipulation is possible.",
  },
  {
    icon: <Shuffle className="w-5 h-5" />,
    question: "How does the randomness algorithm work?",
    answer: "We use your browser's built-in cryptographic random number generator (CSPRNG). Unlike simple Math.random(), this provides true randomness based on hardware entropy sources. The algorithm is deterministic once seeded, ensuring consistent and verifiable results. All calculations happen locally - nothing is sent to servers.",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    question: "Is my data safe? What do you store?",
    answer: "We store absolutely nothing on our servers. Your participant list is saved only in your browser's local storage for convenience - you can clear it anytime. No cookies track you, no analytics collect personal data, and no information leaves your device. The draw runs 100% client-side.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    question: "Can I use this for Instagram or YouTube giveaways?",
    answer: "Yes! Our giveaway picker is perfect for social media contests. You can paste comments, usernames, or any list of participants. The visual wheel spin adds transparency - show your audience the live draw. Many influencers and streamers use our tool for fair, public winner selection.",
  },
  {
    icon: <HelpCircle className="w-5 h-5" />,
    question: "What's the difference between Fair and Custom draw modes?",
    answer: "Fair mode gives everyone equal chances - perfect for giveaways where fairness is essential. Custom mode lets you assign different weights/probabilities to participants - useful for loyalty programs, engagement rewards, or scenarios where some entries should have better odds. Both modes show transparent probability calculations.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    question: "Can I pick multiple winners at once?",
    answer: "Yes! Set the number of winners before spinning. For multiple winners, we use our casino roulette visualization with numbered balls - each landing in a unique slot. Winners are selected without replacement, ensuring the same person can't win twice in a single draw.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    question: "Does it work on mobile devices?",
    answer: "Absolutely. Our tool is fully responsive and optimized for all devices - phones, tablets, and desktops. The wheel animations are smooth, touch-friendly, and work identically across all platforms. No app download required - just open the website.",
  },
  {
    icon: <HelpCircle className="w-5 h-5" />,
    question: "Is this free? Are there hidden costs?",
    answer: "100% free with no hidden costs, no premium tiers, no signup required. We're supported by non-intrusive ads that never interrupt your draws. Use it unlimited times with unlimited participants.",
  },
];

const FaqAccordionIsland = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="space-y-4">
      {faqItems.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full p-5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {item.icon}
              </div>
              <h2 className="text-base md:text-lg font-semibold text-foreground">{item.question}</h2>
            </div>
            {openIndex === index
              ? <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            }
          </button>
          {openIndex === index && (
            <div className="px-5 pb-5">
              <p className="text-muted-foreground leading-relaxed pl-14">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default FaqAccordionIsland;
