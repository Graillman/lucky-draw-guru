import { useState, useCallback, KeyboardEvent, ChangeEvent } from "react";
import { cryptoRandom } from "@/lib/cryptoRandom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Settings, Trash2, Users, ChevronDown, ChevronUp, X, 
  ArrowUpAZ, ArrowDownAZ, Shuffle, List, Type
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export interface ParticipantEntry {
  pseudo: string;
  weight: number;
}

interface ParticipantInputProps {
  mode: "simple" | "advanced";
  participants: ParticipantEntry[];
  onParticipantsChange: (participants: ParticipantEntry[]) => void;
}

const ParticipantInput = ({ mode, participants, onParticipantsChange }: ParticipantInputProps) => {
  const { t } = useLanguage();
  const [textareaValue, setTextareaValue] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const isAdvanced = mode === "advanced";

  // Parse textarea content to participants
  const parseParticipants = useCallback((text: string): ParticipantEntry[] => {
    // Split by newlines or commas
    const lines = text.split(/[\n,]+/).map(line => line.trim()).filter(line => line.length > 0);
    // Remove duplicates while preserving order
    const unique = [...new Set(lines)];
    return unique.map(pseudo => {
      const existing = participants.find(p => p.pseudo === pseudo);
      return { pseudo, weight: existing?.weight ?? 1 };
    });
  }, [participants]);

  // Handle textarea changes
  const handleTextareaChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setTextareaValue(text);
    const parsed = parseParticipants(text);
    onParticipantsChange(parsed);
  }, [parseParticipants, onParticipantsChange]);

  // Sort A-Z - works on current textarea content
  const handleSortAZ = useCallback(() => {
    // Parse current text first
    const names = textareaValue
      .split(/[\s,\n]+/)
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    if (names.length < 2) return;
    
    const sorted = [...new Set(names)].sort((a, b) => a.localeCompare(b));
    const newText = sorted.join('\n');
    setTextareaValue(newText);
    
    const newParticipants = sorted.map(pseudo => {
      const existing = participants.find(p => p.pseudo === pseudo);
      return { pseudo, weight: existing?.weight ?? 1 };
    });
    onParticipantsChange(newParticipants);
  }, [textareaValue, participants, onParticipantsChange]);

  // Sort Z-A
  const handleSortZA = useCallback(() => {
    const names = textareaValue
      .split(/[\s,\n]+/)
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    if (names.length < 2) return;
    
    const sorted = [...new Set(names)].sort((a, b) => b.localeCompare(a));
    const newText = sorted.join('\n');
    setTextareaValue(newText);
    
    const newParticipants = sorted.map(pseudo => {
      const existing = participants.find(p => p.pseudo === pseudo);
      return { pseudo, weight: existing?.weight ?? 1 };
    });
    onParticipantsChange(newParticipants);
  }, [textareaValue, participants, onParticipantsChange]);

  // Shuffle
  const handleShuffle = useCallback(() => {
    const names = textareaValue
      .split(/[\s,\n]+/)
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    if (names.length < 2) return;
    
    const uniqueNames = [...new Set(names)];
    // Fisher-Yates shuffle
    for (let i = uniqueNames.length - 1; i > 0; i--) {
      const j = Math.floor(cryptoRandom() * (i + 1));
      [uniqueNames[i], uniqueNames[j]] = [uniqueNames[j], uniqueNames[i]];
    }
    
    const newText = uniqueNames.join('\n');
    setTextareaValue(newText);
    
    const newParticipants = uniqueNames.map(pseudo => {
      const existing = participants.find(p => p.pseudo === pseudo);
      return { pseudo, weight: existing?.weight ?? 1 };
    });
    onParticipantsChange(newParticipants);
  }, [textareaValue, participants, onParticipantsChange]);

  // Format: one per line - splits by spaces/commas and puts each name on new line
  const handleOnePerLine = useCallback(() => {
    // Split current text by spaces, commas, or newlines
    const names = textareaValue
      .split(/[\s,\n]+/)
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    if (names.length === 0) return;
    
    const newText = names.join('\n');
    setTextareaValue(newText);
    
    // Update participants
    const newParticipants = [...new Set(names)].map(pseudo => {
      const existing = participants.find(p => p.pseudo === pseudo);
      return { pseudo, weight: existing?.weight ?? 1 };
    });
    onParticipantsChange(newParticipants);
  }, [textareaValue, participants, onParticipantsChange]);

  // Format: comma separated - splits by spaces/newlines and joins with commas
  const handleCommaSeparated = useCallback(() => {
    // Split current text by spaces or newlines
    const names = textareaValue
      .split(/[\s\n]+/)
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    if (names.length === 0) return;
    
    const newText = names.join(', ');
    setTextareaValue(newText);
    
    // Update participants
    const newParticipants = [...new Set(names)].map(pseudo => {
      const existing = participants.find(p => p.pseudo === pseudo);
      return { pseudo, weight: existing?.weight ?? 1 };
    });
    onParticipantsChange(newParticipants);
  }, [textareaValue, participants, onParticipantsChange]);

  // Remove duplicates
  const handleRemoveDuplicates = useCallback(() => {
    const seen = new Set<string>();
    const unique = participants.filter(p => {
      const lower = p.pseudo.toLowerCase();
      if (seen.has(lower)) return false;
      seen.add(lower);
      return true;
    });
    onParticipantsChange(unique);
    setTextareaValue(unique.map(p => p.pseudo).join('\n'));
  }, [participants, onParticipantsChange]);

  const handleWeightChange = useCallback((index: number, weight: number) => {
    const updated = [...participants];
    updated[index] = { ...updated[index], weight };
    onParticipantsChange(updated);
  }, [participants, onParticipantsChange]);

  const handleRemove = useCallback((index: number) => {
    const updated = participants.filter((_, i) => i !== index);
    onParticipantsChange(updated);
    setTextareaValue(updated.map(p => p.pseudo).join('\n'));
  }, [participants, onParticipantsChange]);

  const handleClearAll = useCallback(() => {
    onParticipantsChange([]);
    setTextareaValue("");
  }, [onParticipantsChange]);

  const totalWeight = participants.reduce((sum, p) => sum + p.weight, 0);

  const getProbability = (weight: number) => {
    if (totalWeight === 0) return 0;
    return (weight / totalWeight) * 100;
  };

  return (
    <section className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Area - Left Column */}
        <div className="space-y-3">
          <label className={`text-sm font-medium text-foreground flex items-center gap-2`}>
            <Users className={`w-4 h-4 transition-colors duration-300 ${isAdvanced ? "text-accent" : "text-primary"}`} />
            {t.participantList}
          </label>
          
          <Textarea
            placeholder={t.bulkAddPlaceholder}
            value={textareaValue}
            onChange={handleTextareaChange}
            className={cn(
              "min-h-[250px] font-mono text-sm bg-card border-border resize-none transition-colors duration-300",
              "placeholder:text-muted-foreground/50",
              isAdvanced ? "focus:border-accent" : "focus:border-primary"
            )}
          />

          {/* Action Buttons - Full labels */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 text-xs",
                isAdvanced ? "border-accent/30 hover:bg-accent/10" : "border-border hover:bg-primary/10"
              )}
              onClick={handleSortAZ}
              disabled={participants.length < 2}
            >
              <ArrowUpAZ className="w-3.5 h-3.5 mr-1.5" />
              {t.sortAZ}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 text-xs",
                isAdvanced ? "border-accent/30 hover:bg-accent/10" : "border-border hover:bg-primary/10"
              )}
              onClick={handleSortZA}
              disabled={participants.length < 2}
            >
              <ArrowDownAZ className="w-3.5 h-3.5 mr-1.5" />
              {t.sortZA}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 text-xs",
                isAdvanced ? "border-accent/30 hover:bg-accent/10" : "border-border hover:bg-primary/10"
              )}
              onClick={handleShuffle}
              disabled={participants.length < 2}
            >
              <Shuffle className="w-3.5 h-3.5 mr-1.5" />
              {t.shuffle}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 text-xs",
                isAdvanced ? "border-accent/30 hover:bg-accent/10" : "border-border hover:bg-primary/10"
              )}
              onClick={handleOnePerLine}
              disabled={participants.length === 0}
            >
              <List className="w-3.5 h-3.5 mr-1.5" />
              {t.onePerLine}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 text-xs",
                isAdvanced ? "border-accent/30 hover:bg-accent/10" : "border-border hover:bg-primary/10"
              )}
              onClick={handleCommaSeparated}
              disabled={participants.length === 0}
            >
              <span className="mr-1.5 font-mono">,</span>
              {t.commaSeparated}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 text-xs",
                isAdvanced ? "border-accent/30 hover:bg-accent/10" : "border-border hover:bg-primary/10"
              )}
              onClick={handleRemoveDuplicates}
              disabled={participants.length < 2}
            >
              <X className="w-3.5 h-3.5 mr-1.5" />
              {t.removeDuplicates}
            </Button>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {participants.length} {participants.length !== 1 ? t.participants : t.participant}
              {participants.length >= 100 && (
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-500">
                  {t.largeList}
                </span>
              )}
            </span>
            {participants.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                {t.clearAll}
              </Button>
            )}
          </div>
        </div>

        {/* Participants Preview - Right Column */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            {mode === "advanced" ? (
              <>
                <Settings className="w-4 h-4 text-accent" />
                {t.adjustProbabilities}
              </>
            ) : (
              <>
                <Users className="w-4 h-4 text-primary" />
                {t.preview} ({participants.length})
              </>
            )}
          </label>

          <ScrollArea className={cn(
            "h-[300px] rounded-lg border bg-card/50 p-3 transition-colors duration-300",
            isAdvanced ? "border-accent/30" : "border-border"
          )}>
            {participants.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground text-center px-4">
                {t.addParticipantsLeft}
              </div>
            ) : mode === "simple" ? (
              /* Simple mode - Compact list for large datasets */
              <div className="flex flex-wrap gap-1.5">
                {participants.slice(0, 200).map((participant, index) => (
                  <div
                    key={`${participant.pseudo}-${index}`}
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all",
                      "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
                    )}
                  >
                    <span className="max-w-[120px] truncate">{participant.pseudo}</span>
                    <button
                      onClick={() => handleRemove(index)}
                      className="p-0.5 rounded hover:bg-primary/30 transition-colors flex-shrink-0"
                      aria-label={`Remove ${participant.pseudo}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {participants.length > 200 && (
                  <div className="w-full text-center text-xs text-muted-foreground py-2">
                    +{participants.length - 200} {t.moreParticipants}
                  </div>
                )}
              </div>
            ) : (
              /* Advanced mode - Expandable list with weights */
              <div className="space-y-2">
                {participants.slice(0, 100).map((participant, index) => (
                  <div
                    key={`${participant.pseudo}-${index}`}
                    className="rounded-lg border border-accent/30 bg-accent/5"
                  >
                    <div 
                      className="flex items-center justify-between p-2 cursor-pointer"
                      onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="font-mono text-xs truncate text-foreground max-w-[120px]">
                          {participant.pseudo}
                        </span>
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-accent/20 text-accent whitespace-nowrap">
                          {getProbability(participant.weight).toFixed(1)}%
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {expandedIndex === index 
                          ? <ChevronUp className="w-3 h-3 text-muted-foreground" />
                          : <ChevronDown className="w-3 h-3 text-muted-foreground" />
                        }
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(index);
                          }}
                          className="p-0.5 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {expandedIndex === index && (
                      <div className="px-2 pb-2 space-y-2 border-t border-accent/20 pt-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{t.weight}: {participant.weight}</span>
                          <span>{t.probability}: {getProbability(participant.weight).toFixed(2)}%</span>
                        </div>
                        <Slider
                          value={[participant.weight]}
                          onValueChange={([value]) => handleWeightChange(index, value)}
                          min={1}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                ))}
                {participants.length > 100 && (
                  <div className="text-center text-xs text-muted-foreground py-2">
                    +{participants.length - 100} {t.moreParticipants}
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default ParticipantInput;
