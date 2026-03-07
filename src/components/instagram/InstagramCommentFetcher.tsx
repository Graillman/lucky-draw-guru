import { useState, useCallback } from "react";
import { Link2, Search, Users, Filter, Hash, ToggleLeft, ToggleRight, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ParticipantEntry } from "@/components/ParticipantInput";

interface InstagramCommentFetcherProps {
  mode?: "simple" | "advanced";
  onParticipantsLoaded: (participants: ParticipantEntry[]) => void;
}

interface CommentData {
  username: string;
  text: string;
  tagCount: number;
}

const InstagramCommentFetcher = ({ mode = "simple", onParticipantsLoaded }: InstagramCommentFetcherProps) => {
  const { language } = useLanguage();
  const [postUrl, setPostUrl] = useState("");
  const [rawComments, setRawComments] = useState("");
  const [keywordFilter, setKeywordFilter] = useState("");
  const [minTags, setMinTags] = useState(0);
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedComments, setParsedComments] = useState<CommentData[]>([]);
  const [showManualInput, setShowManualInput] = useState(false);

  const isAdvanced = mode === "advanced";

  // Labels
  const labels = {
    title: language === 'fr' ? '📥 Importer les commentaires' : language === 'es' ? '📥 Importar comentarios' : '📥 Import Comments',
    urlPlaceholder: language === 'fr' ? 'Coller le lien du post Instagram...' : language === 'es' ? 'Pegar enlace del post de Instagram...' : 'Paste Instagram post link...',
    fetchBtn: language === 'fr' ? 'Récupérer les commentaires' : language === 'es' ? 'Obtener comentarios' : 'Fetch Comments',
    manualBtn: language === 'fr' ? 'Coller manuellement' : language === 'es' ? 'Pegar manualmente' : 'Paste manually',
    manualPlaceholder: language === 'fr' ? 'Collez les commentaires ici (un par ligne)...\nFormat: @username commentaire\nou juste: @username' : language === 'es' ? 'Pega los comentarios aquí (uno por línea)...\nFormato: @username comentario\no solo: @username' : 'Paste comments here (one per line)...\nFormat: @username comment\nor just: @username',
    keywordLabel: language === 'fr' ? 'Filtrer par mot-clé' : language === 'es' ? 'Filtrar por palabra clave' : 'Filter by keyword',
    keywordPlaceholder: language === 'fr' ? 'Ex: #concours, merci, participé...' : language === 'es' ? 'Ej: #sorteo, gracias, participo...' : 'e.g. #giveaway, thanks, entered...',
    minTagsLabel: language === 'fr' ? 'Nombre minimum de tags (@)' : language === 'es' ? 'Número mínimo de tags (@)' : 'Minimum tag count (@)',
    duplicatesLabel: language === 'fr' ? 'Un seul commentaire par personne' : language === 'es' ? 'Un solo comentario por persona' : 'One comment per person',
    parseBtn: language === 'fr' ? 'Analyser et filtrer' : language === 'es' ? 'Analizar y filtrar' : 'Parse & Filter',
    loadBtn: language === 'fr' ? 'Charger dans le tirage' : language === 'es' ? 'Cargar en el sorteo' : 'Load into draw',
    foundCount: (n: number) => language === 'fr' ? `${n} participant(s) trouvé(s)` : language === 'es' ? `${n} participante(s) encontrado(s)` : `${n} participant(s) found`,
    apiNotReady: language === 'fr' ? "L'import automatique via lien sera bientôt disponible. En attendant, collez les commentaires manuellement." : language === 'es' ? "La importación automática por enlace estará disponible pronto. Mientras tanto, pega los comentarios manualmente." : "Auto-import via link coming soon. For now, paste comments manually.",
    noResults: language === 'fr' ? 'Aucun participant ne correspond aux filtres.' : language === 'es' ? 'Ningún participante coincide con los filtros.' : 'No participants match the filters.',
  };

  // Parse raw comments text into structured data
  const parseComments = useCallback((text: string): CommentData[] => {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const comments: CommentData[] = [];

    for (const line of lines) {
      // Try to extract username from start of line
      const match = line.match(/^@?(\w[\w.]{0,29})\s*(.*)/);
      if (match) {
        const username = match[1];
        const commentText = match[2] || '';
        // Count @mentions in the comment text
        const tags = (commentText.match(/@\w+/g) || []).length;
        comments.push({ username, text: commentText, tagCount: tags });
      }
    }

    return comments;
  }, []);

  // Apply filters
  const applyFilters = useCallback((comments: CommentData[]): CommentData[] => {
    let filtered = [...comments];

    // Keyword filter
    if (keywordFilter.trim()) {
      const keywords = keywordFilter.toLowerCase().split(',').map(k => k.trim()).filter(Boolean);
      filtered = filtered.filter(c =>
        keywords.some(kw => c.text.toLowerCase().includes(kw))
      );
    }

    // Min tags filter
    if (minTags > 0) {
      filtered = filtered.filter(c => c.tagCount >= minTags);
    }

    // Remove duplicates (keep first comment per username)
    if (removeDuplicates) {
      const seen = new Set<string>();
      filtered = filtered.filter(c => {
        const lower = c.username.toLowerCase();
        if (seen.has(lower)) return false;
        seen.add(lower);
        return true;
      });
    }

    return filtered;
  }, [keywordFilter, minTags, removeDuplicates]);

  const handleParse = useCallback(() => {
    const comments = parseComments(rawComments);
    const filtered = applyFilters(comments);
    setParsedComments(filtered);
  }, [rawComments, parseComments, applyFilters]);

  const handleLoad = useCallback(() => {
    const participants: ParticipantEntry[] = parsedComments.map(c => ({
      pseudo: c.username,
      weight: 1,
    }));
    onParticipantsLoaded(participants);
  }, [parsedComments, onParticipantsLoaded]);

  const handleFetchUrl = useCallback(() => {
    // Placeholder for future API integration
    setShowManualInput(true);
  }, []);

  return (
    <section className={`p-5 rounded-xl border space-y-4 ${
      isAdvanced ? "bg-accent/5 border-accent/30" : "bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20"
    }`}>
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-purple-500" />
        <h2 className="text-lg font-bold text-foreground">{labels.title}</h2>
      </div>

      {/* URL Input */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="url"
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              placeholder={labels.urlPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
          <button
            onClick={handleFetchUrl}
            disabled={!postUrl.includes('instagram.com')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {labels.fetchBtn}
          </button>
        </div>

        {/* API not ready notice */}
        {showManualInput && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-sm text-amber-700 dark:text-amber-400">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{labels.apiNotReady}</span>
          </div>
        )}
      </div>

      {/* Manual paste fallback (always shown for now) */}
      <div className="space-y-2">
        <button
          onClick={() => setShowManualInput(!showManualInput)}
          className="text-sm text-purple-500 hover:text-purple-400 underline underline-offset-2"
        >
          {labels.manualBtn}
        </button>

        {showManualInput && (
          <textarea
            value={rawComments}
            onChange={(e) => setRawComments(e.target.value)}
            placeholder={labels.manualPlaceholder}
            rows={6}
            className="w-full p-3 text-sm bg-card border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-mono"
          />
        )}
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-3">
        {/* Keyword filter */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Filter className="w-3.5 h-3.5" />
            {labels.keywordLabel}
          </label>
          <input
            type="text"
            value={keywordFilter}
            onChange={(e) => setKeywordFilter(e.target.value)}
            placeholder={labels.keywordPlaceholder}
            className="w-full px-3 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        </div>

        {/* Min tags filter */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Hash className="w-3.5 h-3.5" />
            {labels.minTagsLabel}
          </label>
          <input
            type="number"
            min={0}
            max={10}
            value={minTags}
            onChange={(e) => setMinTags(Number(e.target.value))}
            className="w-full px-3 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        </div>

        {/* Duplicates toggle */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            {removeDuplicates ? <ToggleRight className="w-3.5 h-3.5 text-green-500" /> : <ToggleLeft className="w-3.5 h-3.5" />}
            {labels.duplicatesLabel}
          </label>
          <button
            onClick={() => setRemoveDuplicates(!removeDuplicates)}
            className={`w-full px-3 py-2 text-sm rounded-lg border transition-colors text-left ${
              removeDuplicates 
                ? 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400' 
                : 'bg-card border-border text-muted-foreground'
            }`}
          >
            {removeDuplicates 
              ? (language === 'fr' ? '✅ Activé' : language === 'es' ? '✅ Activado' : '✅ Enabled')
              : (language === 'fr' ? '❌ Désactivé' : language === 'es' ? '❌ Desactivado' : '❌ Disabled')
            }
          </button>
        </div>
      </div>

      {/* Parse + Load buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleParse}
          disabled={!rawComments.trim()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Filter className="w-4 h-4" />
          {labels.parseBtn}
        </button>

        {parsedComments.length > 0 && (
          <button
            onClick={handleLoad}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Users className="w-4 h-4" />
            {labels.loadBtn}
          </button>
        )}
      </div>

      {/* Results preview */}
      {parsedComments.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">
            {labels.foundCount(parsedComments.length)}
          </p>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
            {parsedComments.map((c, i) => (
              <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 text-xs font-medium">
                @{c.username}
              </span>
            ))}
          </div>
        </div>
      )}

      {rawComments.trim() && parsedComments.length === 0 && (
        <p className="text-sm text-muted-foreground">{labels.noResults}</p>
      )}
    </section>
  );
};

export default InstagramCommentFetcher;
