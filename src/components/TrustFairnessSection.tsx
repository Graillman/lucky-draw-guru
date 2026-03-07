import { Shield, Lock, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TrustFairnessSectionProps {
  mode?: "simple" | "advanced";
}

const TrustFairnessSection = ({ mode = "simple" }: TrustFairnessSectionProps) => {
  const { language } = useLanguage();
  const isAdvanced = mode === "advanced";

  const title = language === 'fr' ? 'Confiance & Équité' :
    language === 'es' ? 'Confianza y Equidad' :
    language === 'de' ? 'Vertrauen & Fairness' :
    language === 'pt' ? 'Confiança e Equidade' :
    language === 'it' ? 'Fiducia ed Equità' :
    'Trust & Fairness';

  const items = [
    {
      icon: Shield,
      title: language === 'fr' ? 'Aléatoire cryptographique' :
             language === 'es' ? 'Aleatorio criptográfico' :
             language === 'de' ? 'Kryptografisch zufällig' :
             language === 'pt' ? 'Aleatório criptográfico' :
             language === 'it' ? 'Casuale crittografico' :
             'Cryptographic Randomness',
      desc: language === 'fr' ? 'Utilise Web Crypto API pour une vraie sélection aléatoire' :
            language === 'es' ? 'Usa Web Crypto API para selección verdaderamente aleatoria' :
            language === 'de' ? 'Verwendet Web Crypto API für echte Zufallsauswahl' :
            language === 'pt' ? 'Usa Web Crypto API para seleção verdadeiramente aleatória' :
            language === 'it' ? 'Usa Web Crypto API per selezione veramente casuale' :
            'Uses Web Crypto API for true random selection',
    },
    {
      icon: Lock,
      title: language === 'fr' ? 'Zéro données stockées' :
             language === 'es' ? 'Cero datos almacenados' :
             language === 'de' ? 'Keine Daten gespeichert' :
             language === 'pt' ? 'Zero dados armazenados' :
             language === 'it' ? 'Zero dati memorizzati' :
             'Zero Data Stored',
      desc: language === 'fr' ? 'Tout reste dans votre navigateur, rien n\'est envoyé' :
            language === 'es' ? 'Todo permanece en su navegador, nada se envía' :
            language === 'de' ? 'Alles bleibt in Ihrem Browser, nichts wird gesendet' :
            language === 'pt' ? 'Tudo fica no seu navegador, nada é enviado' :
            language === 'it' ? 'Tutto rimane nel tuo browser, niente viene inviato' :
            'Everything stays in your browser, nothing sent',
    },
    {
      icon: Globe,
      title: language === 'fr' ? '100% côté client' :
             language === 'es' ? '100% del lado del cliente' :
             language === 'de' ? '100% clientseitig' :
             language === 'pt' ? '100% do lado do cliente' :
             language === 'it' ? '100% lato client' :
             '100% Client-Side',
      desc: language === 'fr' ? 'Le tirage se fait localement, vérifiable et transparent' :
            language === 'es' ? 'El sorteo ocurre localmente, verificable y transparente' :
            language === 'de' ? 'Die Ziehung erfolgt lokal, überprüfbar und transparent' :
            language === 'pt' ? 'O sorteio acontece localmente, verificável e transparente' :
            language === 'it' ? 'L\'estrazione avviene localmente, verificabile e trasparente' :
            'Draw happens locally, verifiable and transparent',
    },
  ];

  return (
    <section className={`p-5 rounded-xl border ${
      isAdvanced 
        ? "bg-accent/5 border-accent/30" 
        : "bg-primary/5 border-primary/30"
    }`}>
      <h3 className={`text-lg font-bold mb-4 ${isAdvanced ? "text-accent" : "text-foreground"}`}>
        {title}
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                isAdvanced ? "bg-accent/20" : "bg-primary/20"
              }`}>
                <IconComponent className={`w-4 h-4 ${isAdvanced ? "text-accent" : "text-primary"}`} />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrustFairnessSection;
