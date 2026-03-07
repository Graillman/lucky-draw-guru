import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tag } from "lucide-react";

interface DrawTitleInputProps {
  title: string;
  onTitleChange: (title: string) => void;
  mode: "simple" | "advanced";
}

export function DrawTitleInput({ title, onTitleChange, mode }: DrawTitleInputProps) {
  const { t } = useLanguage();

  return (
    <div className={`rounded-xl p-4 border transition-all duration-300 ${
      mode === "advanced" 
        ? "bg-accent/10 border-accent/30" 
        : "bg-card border-border"
    }`}>
      <Label 
        htmlFor="draw-title" 
        className="flex items-center justify-center gap-2 text-sm font-medium mb-2 text-foreground"
      >
        <Tag className={`w-4 h-4 ${mode === "advanced" ? "text-accent" : "text-primary"}`} />
        {t.drawTitleLabel}
        <span className="text-muted-foreground font-normal">({t.optional})</span>
      </Label>
      <Input
        id="draw-title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder={t.drawTitlePlaceholder}
        className={`text-center transition-all duration-300 ${
          mode === "advanced"
            ? "border-accent/30 focus:border-accent bg-background/50"
            : "border-border focus:border-primary"
        }`}
      />
    </div>
  );
}
