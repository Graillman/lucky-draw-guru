import { Users, HelpCircle, Dices, Globe, Hash, Utensils } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ParticipantEntry } from "@/components/ParticipantInput";

interface Template {
  id: string;
  icon: React.ElementType;
  names: string[];
}

interface PopularTemplatesProps {
  onApplyTemplate: (participants: ParticipantEntry[]) => void;
  mode?: "simple" | "advanced";
}

const PopularTemplates = ({ onApplyTemplate, mode = "simple" }: PopularTemplatesProps) => {
  const { language } = useLanguage();
  const isAdvanced = mode === "advanced";

  const templateLabels: Record<string, Record<string, string>> = {
    classroom: {
      en: 'Classroom Students',
      fr: 'Élèves de classe',
      es: 'Estudiantes de clase',
      de: 'Klassenschüler',
      pt: 'Alunos da turma',
      it: 'Studenti della classe',
    },
    yesno: {
      en: 'Yes / No',
      fr: 'Oui / Non',
      es: 'Sí / No',
      de: 'Ja / Nein',
      pt: 'Sim / Não',
      it: 'Sì / No',
    },
    numbers: {
      en: 'Numbers 1-100',
      fr: 'Nombres 1-100',
      es: 'Números 1-100',
      de: 'Zahlen 1-100',
      pt: 'Números 1-100',
      it: 'Numeri 1-100',
    },
    countries: {
      en: 'Countries',
      fr: 'Pays',
      es: 'Países',
      de: 'Länder',
      pt: 'Países',
      it: 'Paesi',
    },
    teams: {
      en: 'Team Names',
      fr: 'Noms d\'équipes',
      es: 'Nombres de equipo',
      de: 'Teamnamen',
      pt: 'Nomes de equipes',
      it: 'Nomi squadre',
    },
    restaurant: {
      en: 'Restaurant Picker',
      fr: 'Choix de restaurant',
      es: 'Elegir restaurante',
      de: 'Restaurant-Auswahl',
      pt: 'Escolher restaurante',
      it: 'Scegli ristorante',
    },
  };

  const templates: Template[] = [
    {
      id: 'classroom',
      icon: Users,
      names: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eva', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'],
    },
    {
      id: 'yesno',
      icon: HelpCircle,
      names: language === 'fr' ? ['Oui', 'Non'] : 
             language === 'es' ? ['Sí', 'No'] :
             language === 'de' ? ['Ja', 'Nein'] :
             language === 'pt' ? ['Sim', 'Não'] :
             language === 'it' ? ['Sì', 'No'] :
             ['Yes', 'No'],
    },
    {
      id: 'numbers',
      icon: Hash,
      names: Array.from({ length: 100 }, (_, i) => String(i + 1)),
    },
    {
      id: 'countries',
      icon: Globe,
      names: ['USA', 'UK', 'France', 'Germany', 'Spain', 'Italy', 'Japan', 'Brazil', 'Canada', 'Australia'],
    },
    {
      id: 'teams',
      icon: Users,
      names: ['Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta', 'Team Omega'],
    },
    {
      id: 'restaurant',
      icon: Utensils,
      names: ['Italian', 'Chinese', 'Mexican', 'Japanese', 'Indian', 'Thai', 'French', 'American'],
    },
  ];

  const handleApply = (template: Template) => {
    const participants: ParticipantEntry[] = template.names.map(name => ({
      pseudo: name,
      weight: 1,
    }));
    onApplyTemplate(participants);
  };

  const sectionTitle = language === 'fr' ? 'Modèles populaires' :
    language === 'es' ? 'Plantillas populares' :
    language === 'de' ? 'Beliebte Vorlagen' :
    language === 'pt' ? 'Modelos populares' :
    language === 'it' ? 'Modelli popolari' :
    'Popular Templates';

  const clickToApply = language === 'fr' ? 'Cliquez pour appliquer' :
    language === 'es' ? 'Haz clic para aplicar' :
    language === 'de' ? 'Klicken zum Anwenden' :
    language === 'pt' ? 'Clique para aplicar' :
    language === 'it' ? 'Clicca per applicare' :
    'Click to apply';

  return (
    <section className="py-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className={`text-sm font-medium ${isAdvanced ? "text-accent" : "text-foreground"}`}>
          {sectionTitle}
        </h3>
        <span className="text-xs text-muted-foreground">{clickToApply}</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {templates.map((template) => {
          const IconComponent = template.icon;
          const label = templateLabels[template.id]?.[language] || templateLabels[template.id]?.en;
          
          return (
            <button
              key={template.id}
              onClick={() => handleApply(template)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-200 hover:scale-105 ${
                isAdvanced 
                  ? "bg-accent/10 border-accent/30 text-accent hover:bg-accent/20" 
                  : "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
              }`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              {label}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default PopularTemplates;
