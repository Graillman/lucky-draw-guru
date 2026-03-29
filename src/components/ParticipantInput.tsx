import { useState, useCallback, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import { cryptoRandom } from "@/lib/cryptoRandom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Settings, Trash2, Users, ChevronDown, ChevronUp, X,
  ArrowUpAZ, ArrowDownAZ, Shuffle, List, Upload, Plus
} from "lucide-react";
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
  const [singleInput, setSingleInput] = useState("");
  const singleInputRef = useRef<HTMLInputElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Sync textarea when participants loaded externally (e.g. from localStorage)
  useEffect(() => {
    if (textareaValue === '' && participants.length > 0) {
      setTextareaValue(participants.map(p => p.pseudo).join('\n'));
    }
  }, [participants]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sort A-Z - works on participants prop (works even if textarea was never typed in)
  const handleSortAZ = useCallback(() => {
    if (participants.length < 2) return;
    const sorted = [...participants].sort((a, b) => a.pseudo.localeCompare(b.pseudo));
    onParticipantsChange(sorted);
    setTextareaValue(sorted.map(p => p.pseudo).join('\n'));
  }, [participants, onParticipantsChange]);

  // Sort Z-A
  const handleSortZA = useCallback(() => {
    if (participants.length < 2) return;
    const sorted = [...participants].sort((a, b) => b.pseudo.localeCompare(a.pseudo));
    onParticipantsChange(sorted);
    setTextareaValue(sorted.map(p => p.pseudo).join('\n'));
  }, [participants, onParticipantsChange]);

  // Shuffle
  const handleShuffle = useCallback(() => {
    if (participants.length < 2) return;
    const shuffled = [...participants];
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(cryptoRandom() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    onParticipantsChange(shuffled);
    setTextareaValue(shuffled.map(p => p.pseudo).join('\n'));
  }, [participants, onParticipantsChange]);

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

  const handleFileImport = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      // Split by newlines, commas, semicolons, or tabs
      const lines = text.split(/[\r\n,;\t]+/)
        .map(l => l.trim())
        .filter(l => l.length > 0 && l.length < 200);
      const parsed = [...new Set(lines)].map(pseudo => {
        const existing = participants.find(p => p.pseudo === pseudo);
        return { pseudo, weight: existing?.weight ?? 1 };
      });
      if (parsed.length > 0) {
        onParticipantsChange(parsed);
        setTextareaValue(parsed.map(p => p.pseudo).join('\n'));
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }, [participants, onParticipantsChange]);

  // Add a single participant by name
  const addSingle = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    // Handle paste of multiple names (newline or comma separated)
    const names = trimmed.split(/[\n,]+/).map(n => n.trim()).filter(n => n.length > 0);
    const newParticipants = [...participants];
    names.forEach(n => {
      if (!newParticipants.find(p => p.pseudo === n)) {
        newParticipants.push({ pseudo: n, weight: 1 });
      }
    });
    onParticipantsChange(newParticipants);
    setTextareaValue(newParticipants.map(p => p.pseudo).join('\n'));
  }, [participants, onParticipantsChange]);

  const handleSingleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addSingle(singleInput);
      setSingleInput('');
    }
  }, [singleInput, addSingle]);

  const totalWeight = participants.reduce((sum, p) => sum + p.weight, 0);

  const getProbability = (weight: number) => {
    if (totalWeight === 0) return 0;
    return (weight / totalWeight) * 100;
  };

  if (!isAdvanced) {
    // Simple mode — single input + list with hover-to-delete
    return (
      <section className="space-y-2">
        {/* Single input: Enter to add */}
        <div className="flex gap-2">
          <input
            ref={singleInputRef}
            type="text"
            value={singleInput}
            onChange={e => setSingleInput(e.target.value)}
            onKeyDown={handleSingleKeyDown}
            placeholder={t.bulkAddPlaceholder}
            className="flex-1 h-8 text-sm px-3 rounded-lg border border-border bg-card focus:border-primary outline-none placeholder:text-muted-foreground/50"
          />
          <button
            onClick={() => { addSingle(singleInput); setSingleInput(''); }}
            disabled={!singleInput.trim()}
            className="h-8 w-8 flex items-center justify-center rounded-lg border border-border bg-card hover:bg-primary/10 hover:border-primary/40 transition-colors disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action row */}
        <div className="flex items-center justify-between gap-1 flex-wrap">
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-6 text-xs px-2 border-border hover:bg-primary/10" onClick={handleShuffle} disabled={participants.length < 2} title={t.shuffle}><Shuffle className="w-3 h-3" /></Button>
            <Button variant="outline" size="sm" className="h-6 text-xs px-2 border-border hover:bg-primary/10" onClick={handleSortAZ} disabled={participants.length < 2} title={t.sortAZ}><ArrowUpAZ className="w-3 h-3" /></Button>
            <Button variant="outline" size="sm" className="h-6 text-xs px-2 border-border hover:bg-primary/10" onClick={handleSortZA} disabled={participants.length < 2} title={t.sortZA}><ArrowDownAZ className="w-3 h-3" /></Button>
            <input ref={fileInputRef} type="file" accept=".csv,.txt,.tsv" className="hidden" onChange={handleFileImport} />
            <Button variant="outline" size="sm" className="h-6 text-xs px-2 border-border hover:bg-primary/10" onClick={() => fileInputRef.current?.click()} title="Import CSV/TXT"><Upload className="w-3 h-3" /></Button>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{participants.length} {participants.length !== 1 ? t.participants : t.participant}</span>
            {participants.length > 0 && (
              <Button variant="ghost" size="sm" onClick={handleClearAll} className="h-5 text-xs text-destructive hover:text-destructive px-1">
                <Trash2 className="w-3 h-3 mr-1" />{t.clearAll}
              </Button>
            )}
          </div>
        </div>

        {/* Entries list with hover-to-delete X */}
        <ScrollArea className="h-[300px] rounded-lg border border-border bg-card/50">
          {participants.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground text-center px-4 py-8">
              {t.addParticipantsLeft}
            </div>
          ) : (
            <div className="p-1">
              {participants.slice(0, 300).map((participant, index) => (
                <div
                  key={`${participant.pseudo}-${index}`}
                  className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-muted/50 group"
                >
                  <span className="text-sm text-foreground truncate flex-1">{participant.pseudo}</span>
                  <button
                    onClick={() => handleRemove(index)}
                    className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-all flex-shrink-0 ml-2"
                    aria-label={`Remove ${participant.pseudo}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {participants.length > 300 && (
                <div className="text-center text-xs text-muted-foreground py-2">
                  +{participants.length - 300} {t.moreParticipants}
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </section>
    );
  }

  // Advanced mode — keep 2-column layout
  return (
    <section className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Area */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            {t.participantList}
          </label>
          <Textarea
            placeholder={t.bulkAddPlaceholder}
            value={textareaValue}
            onChange={handleTextareaChange}
            className="min-h-[250px] font-mono text-sm bg-card border-border resize-none focus:border-accent placeholder:text-muted-foreground/50"
          />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs border-accent/30 hover:bg-accent/10" onClick={handleSortAZ} disabled={participants.length < 2}><ArrowUpAZ className="w-3.5 h-3.5 mr-1.5" />{t.sortAZ}</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs border-accent/30 hover:bg-accent/10" onClick={handleSortZA} disabled={participants.length < 2}><ArrowDownAZ className="w-3.5 h-3.5 mr-1.5" />{t.sortZA}</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs border-accent/30 hover:bg-accent/10" onClick={handleShuffle} disabled={participants.length < 2}><Shuffle className="w-3.5 h-3.5 mr-1.5" />{t.shuffle}</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs border-accent/30 hover:bg-accent/10" onClick={handleOnePerLine} disabled={participants.length === 0}><List className="w-3.5 h-3.5 mr-1.5" />{t.onePerLine}</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs border-accent/30 hover:bg-accent/10" onClick={handleCommaSeparated} disabled={participants.length === 0}><span className="mr-1.5 font-mono">,</span>{t.commaSeparated}</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs border-accent/30 hover:bg-accent/10" onClick={handleRemoveDuplicates} disabled={participants.length < 2}><X className="w-3.5 h-3.5 mr-1.5" />{t.removeDuplicates}</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs border-accent/30 hover:bg-accent/10" onClick={() => fileInputRef.current?.click()} title="Import CSV or TXT file"><Upload className="w-3.5 h-3.5 mr-1.5" />Import</Button>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {participants.length} {participants.length !== 1 ? t.participants : t.participant}
              {participants.length >= 100 && <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-500">{t.largeList}</span>}
            </span>
            {participants.length > 0 && (
              <Button variant="ghost" size="sm" onClick={handleClearAll} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4 mr-1" />{t.clearAll}</Button>
            )}
          </div>
        </div>

        {/* Probabilities */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Settings className="w-4 h-4 text-accent" />
            {t.adjustProbabilities}
          </label>
          <ScrollArea className="h-[300px] rounded-lg border border-accent/30 bg-card/50 p-3">
            {participants.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground text-center px-4">{t.addParticipantsLeft}</div>
            ) : (
              <div className="space-y-2">
                {participants.slice(0, 100).map((participant, index) => (
                  <div key={`${participant.pseudo}-${index}`} className="rounded-lg border border-accent/30 bg-accent/5">
                    <div className="flex items-center justify-between p-2 cursor-pointer" onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="font-mono text-xs truncate text-foreground max-w-[120px]">{participant.pseudo}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-accent/20 text-accent whitespace-nowrap">{getProbability(participant.weight).toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {expandedIndex === index ? <ChevronUp className="w-3 h-3 text-muted-foreground" /> : <ChevronDown className="w-3 h-3 text-muted-foreground" />}
                        <button onClick={(e) => { e.stopPropagation(); handleRemove(index); }} className="p-0.5 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"><X className="w-3 h-3" /></button>
                      </div>
                    </div>
                    {expandedIndex === index && (
                      <div className="px-2 pb-2 space-y-2 border-t border-accent/20 pt-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{t.weight}: {participant.weight}</span>
                          <span>{t.probability}: {getProbability(participant.weight).toFixed(2)}%</span>
                        </div>
                        <Slider value={[participant.weight]} onValueChange={([value]: number[]) => handleWeightChange(index, value)} min={1} max={100} step={1} className="w-full" />
                      </div>
                    )}
                  </div>
                ))}
                {participants.length > 100 && <div className="text-center text-xs text-muted-foreground py-2">+{participants.length - 100} {t.moreParticipants}</div>}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default ParticipantInput;
