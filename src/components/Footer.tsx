import { useLanguage } from "@/contexts/LanguageContext";

interface FooterProps {
  mode?: "simple" | "advanced";
}

const Footer = ({ mode = "simple" }: FooterProps) => {
  const { t } = useLanguage();
  const isAdvanced = mode === "advanced";

  return (
    <footer className="py-8 border-t border-border">
      {/* Mobile Ad Banner - Sticky */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-secondary/95 backdrop-blur-sm border-t border-border flex items-center justify-center z-50">
        <span className="text-xs text-muted-foreground">{t.mobileBanner}</span>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-4 pb-16 md:pb-0">
        <div className={`text-2xl font-bold transition-all duration-300 ${
          isAdvanced 
            ? "bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent"
            : "text-gradient-gold"
        }`}>
          randompicker.com
        </div>
        
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          {t.footerDisclaimer}
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} randompicker.com</span>
          <span>•</span>
          <a href="#" className={`transition-colors ${
            isAdvanced ? "hover:text-accent" : "hover:text-primary"
          }`}>
            {t.legalNotice}
          </a>
          <span>•</span>
          <a href="#" className={`transition-colors ${
            isAdvanced ? "hover:text-accent" : "hover:text-primary"
          }`}>
            {t.privacy}
          </a>
          <span>•</span>
          <a href="#" className={`transition-colors ${
            isAdvanced ? "hover:text-accent" : "hover:text-primary"
          }`}>
            {t.contact}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
