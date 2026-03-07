import { useState } from "react";
import { ChevronDown, ChevronUp, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WeightedFAQProps {
  mode?: "simple" | "advanced";
}

const WeightedFAQ = ({ mode = "advanced" }: WeightedFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language } = useLanguage();

  const faqItems = language === 'fr' ? [
    {
      q: "Comment fonctionnent les probabilités pondérées ?",
      a: "Chaque participant a un poids. La probabilité de gagner = poids individuel ÷ somme de tous les poids. Un participant avec poids 20 sur un total de 100 a 20% de chances de gagner."
    },
    {
      q: "Est-ce toujours équitable avec des probabilités différentes ?",
      a: "C'est 'équitable' dans le sens où les chances sont transparentes et calculées correctement. Si vous affichez les probabilités à votre audience, ils peuvent voir exactement comment fonctionne le système."
    },
    {
      q: "Quand devrais-je utiliser le mode pondéré ?",
      a: "Pour les programmes de fidélité, récompenses basées sur l'engagement, tirages où la contribution compte, simulations statistiques, ou tout scénario où certains participants méritent plus de chances."
    },
    {
      q: "Comment normaliser les poids à 100% ?",
      a: "Utilisez le bouton 'Normaliser à 100%' dans les Actions Rapides. Cela convertit vos poids en pourcentages tout en gardant les proportions relatives."
    },
    {
      q: "Puis-je combiner mode pondéré et multiple gagnants ?",
      a: "Oui ! Le système tire séquentiellement, chaque gagnant étant retiré du pool avant le prochain tirage. Les probabilités sont recalculées après chaque sélection."
    },
    {
      q: "Les poids négatifs ou zéro sont-ils autorisés ?",
      a: "Non. Tous les poids doivent être positifs (≥1). Un poids de 0 exclurait le participant, ce qui devrait être fait en le supprimant de la liste."
    }
  ] : language === 'es' ? [
    {
      q: "¿Cómo funcionan las probabilidades ponderadas?",
      a: "Cada participante tiene un peso. Probabilidad de ganar = peso individual ÷ suma de todos los pesos. Un participante con peso 20 sobre un total de 100 tiene 20% de posibilidades."
    },
    {
      q: "¿Es justo con probabilidades diferentes?",
      a: "Es 'justo' en el sentido de que las probabilidades son transparentes y calculadas correctamente. Si muestras las probabilidades a tu audiencia, pueden ver exactamente cómo funciona."
    },
    {
      q: "¿Cuándo debería usar el modo ponderado?",
      a: "Para programas de fidelidad, recompensas por engagement, sorteos donde la contribución importa, simulaciones estadísticas, o cualquier escenario donde algunos participantes merecen más chances."
    },
    {
      q: "¿Cómo normalizar los pesos a 100%?",
      a: "Usa el botón 'Normalizar a 100%' en Acciones Rápidas. Esto convierte tus pesos en porcentajes manteniendo las proporciones relativas."
    },
    {
      q: "¿Puedo combinar modo ponderado y múltiples ganadores?",
      a: "¡Sí! El sistema sortea secuencialmente, cada ganador es removido del pool antes del siguiente sorteo. Las probabilidades se recalculan después de cada selección."
    },
    {
      q: "¿Se permiten pesos negativos o cero?",
      a: "No. Todos los pesos deben ser positivos (≥1). Un peso de 0 excluiría al participante, lo cual debería hacerse eliminándolo de la lista."
    }
  ] : [
    {
      q: "How do weighted probabilities work?",
      a: "Each participant has a weight. Probability of winning = individual weight ÷ sum of all weights. A participant with weight 20 out of a total 100 has a 20% chance of winning."
    },
    {
      q: "Is it still fair with different probabilities?",
      a: "It's 'fair' in the sense that chances are transparent and calculated correctly. If you display the probabilities to your audience, they can see exactly how the system works."
    },
    {
      q: "When should I use weighted mode?",
      a: "For loyalty programs, engagement-based rewards, draws where contribution matters, statistical simulations, or any scenario where some participants deserve better odds."
    },
    {
      q: "How do I normalize weights to 100%?",
      a: "Use the 'Normalize to 100%' button in Quick Actions. This converts your weights to percentages while keeping relative proportions."
    },
    {
      q: "Can I combine weighted mode with multiple winners?",
      a: "Yes! The system draws sequentially, with each winner removed from the pool before the next draw. Probabilities are recalculated after each selection."
    },
    {
      q: "Are negative or zero weights allowed?",
      a: "No. All weights must be positive (≥1). A weight of 0 would exclude the participant, which should be done by removing them from the list instead."
    }
  ];

  const title = language === 'fr' ? 'FAQ Mode Pondéré' :
    language === 'es' ? 'FAQ Modo Ponderado' :
    'Weighted Mode FAQ';

  return (
    <section className="py-6 space-y-4">
      <div className="flex items-center justify-center gap-2">
        <BarChart3 className="w-5 h-5 text-accent" />
        <h2 className="text-lg md:text-xl font-bold text-foreground">{title}</h2>
      </div>
      
      <div className="space-y-2">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border overflow-hidden transition-all duration-200 border-accent/30 bg-accent/5 hover:border-accent/50"
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

export default WeightedFAQ;
