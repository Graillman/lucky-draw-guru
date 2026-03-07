import { useState } from "react";
import { ChevronDown, ChevronUp, Gift } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface GiveawayFAQProps {
  mode?: "simple" | "advanced";
}

const GiveawayFAQ = ({ mode = "simple" }: GiveawayFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language } = useLanguage();
  const isAdvanced = mode === "advanced";

  const faqItems = language === 'fr' ? [
    {
      q: "Comment garantir que le tirage est vraiment aléatoire ?",
      a: "Notre outil utilise l'API Web Crypto, la même technologie utilisée par les banques. Chaque participant a exactement les mêmes chances. Le tirage se fait 100% dans votre navigateur - rien n'est envoyé à nos serveurs, rendant toute manipulation impossible."
    },
    {
      q: "Puis-je tirer plusieurs gagnants et des suppléants ?",
      a: "Oui ! Définissez le nombre de gagnants principaux et de suppléants. Les suppléants sont tirés séparément après les gagnants principaux, parmi les participants restants."
    },
    {
      q: "Comment prouver la transparence du tirage ?",
      a: "Utilisez notre module 'Preuve de Résultat' qui génère un document avec timestamp, nombre de participants, méthode utilisée et résultats. Vous pouvez le copier et le partager publiquement."
    },
    {
      q: "Que faire si un gagnant ne répond pas ?",
      a: "C'est pourquoi nous recommandons de tirer des suppléants. Si le gagnant principal ne répond pas dans le délai que vous fixez, contactez le premier suppléant."
    },
    {
      q: "Les données des participants sont-elles stockées ?",
      a: "Non. Tout se passe localement dans votre navigateur via localStorage. Nous n'avons accès à aucune donnée. Vous pouvez vider le cache à tout moment."
    },
    {
      q: "Puis-je refaire le tirage si je me suis trompé ?",
      a: "Oui, mais pour la transparence, nous recommandons de documenter chaque tirage. Si vous refaites un tirage, soyez transparent avec votre audience sur la raison."
    }
  ] : language === 'es' ? [
    {
      q: "¿Cómo garantizar que el sorteo es realmente aleatorio?",
      a: "Nuestra herramienta usa la API Web Crypto, la misma tecnología usada por bancos. Cada participante tiene exactamente las mismas posibilidades. El sorteo ocurre 100% en tu navegador - nada se envía a nuestros servidores."
    },
    {
      q: "¿Puedo sortear múltiples ganadores y suplentes?",
      a: "¡Sí! Define el número de ganadores principales y suplentes. Los suplentes se sortean después de los ganadores principales, entre los participantes restantes."
    },
    {
      q: "¿Cómo demostrar la transparencia del sorteo?",
      a: "Usa nuestro módulo 'Prueba de Resultado' que genera un documento con timestamp, número de participantes, método usado y resultados. Puedes copiarlo y compartirlo públicamente."
    },
    {
      q: "¿Qué hacer si un ganador no responde?",
      a: "Por eso recomendamos sortear suplentes. Si el ganador principal no responde en el plazo que defines, contacta al primer suplente."
    },
    {
      q: "¿Se almacenan los datos de los participantes?",
      a: "No. Todo ocurre localmente en tu navegador via localStorage. No tenemos acceso a ningún dato. Puedes borrar el caché cuando quieras."
    },
    {
      q: "¿Puedo rehacer el sorteo si me equivoqué?",
      a: "Sí, pero para transparencia, recomendamos documentar cada sorteo. Si rehaces un sorteo, sé transparente con tu audiencia sobre la razón."
    }
  ] : [
    {
      q: "How can I ensure the draw is truly random?",
      a: "Our tool uses the Web Crypto API, the same technology used by banks. Every participant has exactly equal chances. The draw happens 100% in your browser - nothing is sent to our servers, making manipulation impossible."
    },
    {
      q: "Can I draw multiple winners and backup winners?",
      a: "Yes! Set the number of main winners and backup winners. Backups are drawn separately after main winners, from the remaining participants."
    },
    {
      q: "How do I prove the draw was transparent?",
      a: "Use our 'Result Proof' module which generates a document with timestamp, participant count, method used, and results. You can copy and share it publicly."
    },
    {
      q: "What if a winner doesn't respond?",
      a: "That's why we recommend drawing backup winners. If the main winner doesn't respond within your deadline, contact the first backup."
    },
    {
      q: "Is participant data stored anywhere?",
      a: "No. Everything happens locally in your browser via localStorage. We have no access to any data. You can clear your cache anytime."
    },
    {
      q: "Can I redo the draw if I made a mistake?",
      a: "Yes, but for transparency, we recommend documenting each draw. If you redo a draw, be transparent with your audience about the reason."
    }
  ];

  const title = language === 'fr' ? 'FAQ Giveaway & Concours' :
    language === 'es' ? 'FAQ Sorteos y Concursos' :
    'Giveaway & Contest FAQ';

  return (
    <section className="py-6 space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Gift className="w-5 h-5 text-amber-500" />
        <h2 className="text-lg md:text-xl font-bold text-foreground">{title}</h2>
      </div>
      
      <div className="space-y-2">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className={`rounded-lg border overflow-hidden transition-all duration-200 ${
              isAdvanced 
                ? "border-accent/30 bg-accent/5 hover:border-accent/50" 
                : "border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40"
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <span className="font-medium text-foreground text-sm pr-4">{item.q}</span>
              {openIndex === index ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-4 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GiveawayFAQ;
