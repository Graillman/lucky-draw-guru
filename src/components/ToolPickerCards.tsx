import { Link } from "react-router-dom";
import { Dices, Users, Gift, BarChart3, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ToolPickerCardsProps {
  mode?: "simple" | "advanced";
}

const ToolPickerCards = ({ mode = "simple" }: ToolPickerCardsProps) => {
  const { t, language } = useLanguage();
  const isAdvanced = mode === "advanced";

  const chooseToolLabel = language === 'fr' ? 'Choisir votre outil' : 
    language === 'es' ? 'Elige tu herramienta' :
    language === 'de' ? 'Wählen Sie Ihr Tool' :
    language === 'pt' ? 'Escolha sua ferramenta' :
    language === 'it' ? 'Scegli il tuo strumento' :
    'Choose Your Tool';

  const tools = [
    {
      slug: "random-wheel",
      icon: Dices,
      title: t.navRandomWheel,
      benefit: language === 'fr' ? 'Décisions rapides et amusantes' :
               language === 'es' ? 'Decisiones rápidas y divertidas' :
               language === 'de' ? 'Schnelle & lustige Entscheidungen' :
               language === 'pt' ? 'Decisões rápidas e divertidas' :
               language === 'it' ? 'Decisioni rapide e divertenti' :
               'Quick & fun decisions',
      color: "from-amber-500 to-yellow-500",
    },
    {
      slug: "wheel-of-names",
      icon: GraduationCap,
      title: t.navWheelOfNames,
      benefit: language === 'fr' ? 'Parfait pour les enseignants' :
               language === 'es' ? 'Perfecto para profesores' :
               language === 'de' ? 'Perfekt für Lehrer' :
               language === 'pt' ? 'Perfeito para professores' :
               language === 'it' ? 'Perfetto per insegnanti' :
               'Perfect for teachers',
      color: "from-emerald-500 to-green-500",
    },
    {
      slug: "random-name-picker",
      icon: Users,
      title: t.navNamePicker,
      benefit: language === 'fr' ? 'Le plus rapide et simple' :
               language === 'es' ? 'El más rápido y simple' :
               language === 'de' ? 'Am schnellsten & einfachsten' :
               language === 'pt' ? 'O mais rápido e simples' :
               language === 'it' ? 'Il più veloce e semplice' :
               'Fastest & simplest',
      color: "from-blue-500 to-indigo-500",
    },
    {
      slug: "giveaway-picker",
      icon: Gift,
      title: t.navGiveaway,
      benefit: language === 'fr' ? 'Tirages de concours équitables' :
               language === 'es' ? 'Sorteos de concursos justos' :
               language === 'de' ? 'Faire Gewinnspiel-Ziehungen' :
               language === 'pt' ? 'Sorteios de concursos justos' :
               language === 'it' ? 'Estrazioni concorsi eque' :
               'Fair contest draws',
      color: "from-rose-500 to-pink-500",
    },
    {
      slug: "weighted-random-picker",
      icon: BarChart3,
      title: t.navWeighted,
      benefit: language === 'fr' ? 'Probabilités personnalisées' :
               language === 'es' ? 'Probabilidades personalizadas' :
               language === 'de' ? 'Anpassbare Wahrscheinlichkeiten' :
               language === 'pt' ? 'Probabilidades personalizadas' :
               language === 'it' ? 'Probabilità personalizzate' :
               'Custom probabilities',
      color: "from-purple-500 to-violet-500",
    },
    {
      slug: "random-team-selector",
      icon: Users,
      title: t.navTeams,
      benefit: language === 'fr' ? 'Créer des groupes équitables' :
               language === 'es' ? 'Crear grupos justos' :
               language === 'de' ? 'Faire Gruppen erstellen' :
               language === 'pt' ? 'Criar grupos justos' :
               language === 'it' ? 'Creare gruppi equi' :
               'Create fair groups',
      color: "from-cyan-500 to-teal-500",
    },
  ];

  return (
    <section className="py-6 space-y-4">
      <h2 className={`text-xl md:text-2xl font-bold text-center ${
        isAdvanced ? "text-accent" : "text-foreground"
      }`}>
        {chooseToolLabel}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <Link
              key={tool.slug}
              to={`/${tool.slug}`}
              className={`group p-4 rounded-xl border bg-card transition-all duration-300 hover:scale-[1.03] ${
                isAdvanced 
                  ? "border-accent/30 hover:border-accent/60 hover:shadow-[0_0_20px_-5px_hsl(262,83%,58%/0.3)]" 
                  : "border-border hover:border-primary/50 hover:shadow-gold-sm"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{tool.title}</h3>
              <p className="text-xs text-muted-foreground">{tool.benefit}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ToolPickerCards;
