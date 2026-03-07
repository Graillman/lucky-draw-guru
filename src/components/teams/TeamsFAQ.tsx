import { useState } from "react";
import { ChevronDown, ChevronUp, Users, HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TeamsFAQProps {
  mode?: "simple" | "advanced";
}

const TeamsFAQ = ({ mode = "simple" }: TeamsFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language } = useLanguage();
  const isAdvanced = mode === "advanced";

  const faqItems = language === 'fr' ? [
    {
      q: "Comment créer des équipes équilibrées ?",
      a: "Notre générateur distribue automatiquement les participants de manière équilibrée. Si vous avez 10 personnes et créez 3 équipes, vous obtiendrez des équipes de 4-3-3 membres."
    },
    {
      q: "Puis-je définir des capitaines d'équipe ?",
      a: "Oui ! Utilisez d'abord la roue pour sélectionner les capitaines, puis générez les équipes avec les participants restants."
    },
    {
      q: "La répartition est-elle vraiment aléatoire ?",
      a: "Absolument. Nous utilisons l'algorithme Fisher-Yates avec des nombres aléatoires cryptographiques pour un mélange parfaitement équitable."
    },
    {
      q: "Comment exporter les équipes créées ?",
      a: "Cliquez sur 'Copier' pour le presse-papiers ou 'Exporter CSV' pour un fichier tableur compatible Excel/Sheets."
    },
    {
      q: "Puis-je créer des équipes par niveau de compétence ?",
      a: "Pour des équipes équilibrées par niveau, entrez d'abord les participants par catégorie puis utilisez notre système de pots (bientôt disponible)."
    }
  ] : language === 'es' ? [
    {
      q: "¿Cómo crear equipos equilibrados?",
      a: "Nuestro generador distribuye automáticamente los participantes de manera equilibrada. Si tienes 10 personas y creas 3 equipos, obtendrás equipos de 4-3-3 miembros."
    },
    {
      q: "¿Puedo definir capitanes de equipo?",
      a: "¡Sí! Primero usa la ruleta para seleccionar capitanes, luego genera equipos con los participantes restantes."
    },
    {
      q: "¿La distribución es realmente aleatoria?",
      a: "Absolutamente. Usamos el algoritmo Fisher-Yates con números aleatorios criptográficos para mezcla perfectamente justa."
    },
    {
      q: "¿Cómo exportar los equipos creados?",
      a: "Haz clic en 'Copiar' para el portapapeles o 'Exportar CSV' para archivo compatible con Excel/Sheets."
    },
    {
      q: "¿Puedo crear equipos por nivel de habilidad?",
      a: "Para equipos equilibrados por nivel, primero ingresa participantes por categoría y usa nuestro sistema de bombos (próximamente)."
    }
  ] : [
    {
      q: "How do I create balanced teams?",
      a: "Our generator automatically distributes participants evenly. If you have 10 people and create 3 teams, you'll get teams of 4-3-3 members."
    },
    {
      q: "Can I set team captains first?",
      a: "Yes! First use the wheel to select captains, then generate teams with the remaining participants."
    },
    {
      q: "Is the distribution truly random?",
      a: "Absolutely. We use the Fisher-Yates algorithm with cryptographically secure random numbers for perfectly fair shuffling."
    },
    {
      q: "How do I export the created teams?",
      a: "Click 'Copy' for clipboard or 'Export CSV' for a spreadsheet file compatible with Excel/Sheets."
    },
    {
      q: "Can I create teams by skill level?",
      a: "For skill-balanced teams, first enter participants by category and use our pot/tier system (coming soon)."
    }
  ];

  const title = language === 'fr' ? 'FAQ Équipes & Groupes' :
    language === 'es' ? 'FAQ Equipos y Grupos' :
    'Teams & Grouping FAQ';

  return (
    <section className="py-6 space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Users className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg md:text-xl font-bold text-foreground">{title}</h2>
      </div>
      
      <div className="space-y-2">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className={`rounded-lg border overflow-hidden transition-all duration-200 ${
              isAdvanced 
                ? "border-accent/30 bg-accent/5 hover:border-accent/50" 
                : "border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40"
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

export default TeamsFAQ;
