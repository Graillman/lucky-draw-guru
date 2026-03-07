import { useState } from "react";
import { ChevronDown, ChevronUp, Instagram, HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface InstagramFAQProps {
  mode?: "simple" | "advanced";
}

const InstagramFAQ = ({ mode = "simple" }: InstagramFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language } = useLanguage();
  const isAdvanced = mode === "advanced";

  const faqItems = language === 'fr' ? [
    {
      q: "Comment extraire les usernames des commentaires Instagram ?",
      a: "Ouvrez votre post sur Instagram, cliquez sur 'Voir tous les commentaires', puis sélectionnez et copiez les @usernames. Collez-les dans notre outil - nous nettoyons automatiquement les @ et supprimons les doublons."
    },
    {
      q: "Les tirages Instagram sont-ils vraiment aléatoires ?",
      a: "Oui ! Nous utilisons l'API Web Crypto pour une sélection cryptographiquement sécurisée. Le tirage se fait 100% dans votre navigateur - rien n'est envoyé à nos serveurs."
    },
    {
      q: "Comment prouver la transparence du tirage à mes followers ?",
      a: "Enregistrez l'écran pendant le tirage ou faites-le en live. Le spinner visuel montre la sélection aléatoire en temps réel. Utilisez notre générateur d'annonce pour publier les résultats."
    },
    {
      q: "Puis-je tirer plusieurs gagnants + des suppléants ?",
      a: "Absolument ! Sélectionnez le nombre de gagnants souhaité. Après le tirage, utilisez 'Supprimer et retirer' pour sélectionner des suppléants parmi les participants restants."
    },
    {
      q: "Fonctionne-t-il pour TikTok, YouTube ou Twitter ?",
      a: "Oui ! Notre outil fonctionne pour toutes les plateformes sociales. Copiez simplement les usernames des commentaires et collez-les ici."
    }
  ] : language === 'es' ? [
    {
      q: "¿Cómo extraer usernames de los comentarios de Instagram?",
      a: "Abre tu post en Instagram, haz clic en 'Ver todos los comentarios', luego selecciona y copia los @usernames. Pégalos en nuestra herramienta - limpiamos automáticamente los @ y eliminamos duplicados."
    },
    {
      q: "¿Los sorteos de Instagram son realmente aleatorios?",
      a: "¡Sí! Usamos la API Web Crypto para selección criptográficamente segura. El sorteo ocurre 100% en tu navegador - nada se envía a nuestros servidores."
    },
    {
      q: "¿Cómo demostrar transparencia a mis seguidores?",
      a: "Graba la pantalla durante el sorteo o hazlo en vivo. El spinner visual muestra la selección aleatoria en tiempo real. Usa nuestro generador de anuncios para publicar resultados."
    },
    {
      q: "¿Puedo elegir múltiples ganadores + suplentes?",
      a: "¡Absolutamente! Selecciona el número de ganadores. Después del sorteo, usa 'Eliminar y volver a girar' para seleccionar suplentes."
    },
    {
      q: "¿Funciona para TikTok, YouTube o Twitter?",
      a: "¡Sí! Nuestra herramienta funciona para todas las plataformas sociales. Solo copia los usernames de comentarios y pégalos aquí."
    }
  ] : [
    {
      q: "How do I extract usernames from Instagram comments?",
      a: "Open your post on Instagram, click 'View all comments', then select and copy the @usernames. Paste them into our tool - we automatically clean the @ symbols and remove duplicates."
    },
    {
      q: "Are Instagram giveaway draws truly random?",
      a: "Yes! We use the Web Crypto API for cryptographically secure selection. The draw happens 100% in your browser - nothing is sent to our servers."
    },
    {
      q: "How can I prove transparency to my followers?",
      a: "Screen record the draw or do it live. The visual spinner shows random selection in real-time. Use our announcement generator to publish results professionally."
    },
    {
      q: "Can I pick multiple winners + backup winners?",
      a: "Absolutely! Select your desired number of winners. After the draw, use 'Remove & Respin' to select backup winners from remaining participants."
    },
    {
      q: "Does this work for TikTok, YouTube, or Twitter?",
      a: "Yes! Our tool works for all social platforms. Just copy usernames from comments and paste them here."
    }
  ];

  const title = language === 'fr' ? 'FAQ Giveaway Instagram' :
    language === 'es' ? 'FAQ Sorteo Instagram' :
    'Instagram Giveaway FAQ';

  return (
    <section className="py-6 space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Instagram className="w-5 h-5 text-pink-500" />
        <h2 className="text-lg md:text-xl font-bold text-foreground">{title}</h2>
      </div>
      
      <div className="space-y-2">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className={`rounded-lg border overflow-hidden transition-all duration-200 ${
              isAdvanced 
                ? "border-accent/30 bg-accent/5 hover:border-accent/50" 
                : "border-pink-500/20 bg-pink-500/5 hover:border-pink-500/40"
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

export default InstagramFAQ;
