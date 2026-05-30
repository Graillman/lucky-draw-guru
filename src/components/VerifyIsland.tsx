import React, { useEffect, useMemo, useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  Trophy,
  Clock,
  Users,
  Fingerprint,
  Hash,
  ClipboardPaste,
} from 'lucide-react';
import {
  decodeCertificate,
  verifyCertificate,
  type FairnessCertificate,
  type VerifyResult,
} from '@/lib/fairnessCertificate';

type Status =
  | { kind: 'empty' }
  | { kind: 'error'; message: string }
  | { kind: 'ok'; certificate: FairnessCertificate; result: VerifyResult };

/**
 * Reads an encoded certificate from a string, decodes + verifies it, and
 * resolves to a Status. Kept outside the component so it can be reused for
 * both the URL path and the manual-paste path.
 */
async function evaluate(encoded: string): Promise<Status> {
  const trimmed = encoded.trim();
  if (!trimmed) return { kind: 'empty' };
  let certificate: FairnessCertificate;
  try {
    certificate = decodeCertificate(trimmed);
  } catch {
    return {
      kind: 'error',
      message:
        'This certificate code is not readable. Make sure you copied the full code.',
    };
  }
  try {
    const result = await verifyCertificate(certificate);
    return { kind: 'ok', certificate, result };
  } catch (e) {
    return {
      kind: 'error',
      message:
        e instanceof Error ? e.message : 'Unable to verify this certificate.',
    };
  }
}

/** Extract the `c` param from either the query string or the hash fragment. */
function readCertificateFromUrl(): string {
  if (typeof window === 'undefined') return '';
  const fromQuery = new URLSearchParams(window.location.search).get('c');
  if (fromQuery) return fromQuery;
  const hash = window.location.hash.replace(/^#/, '');
  const fromHash = new URLSearchParams(hash).get('c');
  return fromHash ?? '';
}

const VerifyIsland: React.FC = () => {
  const [status, setStatus] = useState<Status>({ kind: 'empty' });
  const [raw, setRaw] = useState('');
  const [checking, setChecking] = useState(false);

  // On mount, try to read a certificate from the URL and auto-verify it.
  useEffect(() => {
    const fromUrl = readCertificateFromUrl();
    if (!fromUrl) return;
    setRaw(fromUrl);
    setChecking(true);
    evaluate(fromUrl)
      .then(setStatus)
      .finally(() => setChecking(false));
  }, []);

  const handleVerify = async (value: string) => {
    setChecking(true);
    const next = await evaluate(value);
    setStatus(next);
    setChecking(false);
  };

  return (
    <div className="space-y-6">
      {/* Manual input */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-3">
        <label
          htmlFor="cert-input"
          className="flex items-center gap-2 text-sm font-semibold text-foreground"
        >
          <ClipboardPaste className="w-4 h-4 text-primary" />
          Paste a certificate code
        </label>
        <textarea
          id="cert-input"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder="Paste the certificate code (the part after ?c= in a verify link)…"
          rows={3}
          className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleVerify(raw)}
            disabled={checking || raw.trim().length === 0}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            {checking ? 'Verifying…' : 'Verify draw'}
          </button>
          {raw.trim().length > 0 && (
            <button
              type="button"
              onClick={() => {
                setRaw('');
                setStatus({ kind: 'empty' });
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Result */}
      <ResultPanel status={status} />
    </div>
  );
};

const ResultPanel: React.FC<{ status: Status }> = ({ status }) => {
  if (status.kind === 'empty') {
    return (
      <div className="bg-card border border-border rounded-xl p-6 flex items-start gap-3 text-muted-foreground">
        <ShieldQuestion className="w-6 h-6 shrink-0 text-muted-foreground" />
        <div className="text-sm leading-relaxed">
          <p className="font-semibold text-foreground">No certificate loaded</p>
          <p>
            Open a verification link (it contains{' '}
            <code className="bg-muted px-1 rounded font-mono text-xs">?c=…</code>
            ) or paste a certificate code above to check whether a draw result
            is authentic.
          </p>
        </div>
      </div>
    );
  }

  if (status.kind === 'error') {
    return (
      <div className="bg-card border border-destructive/40 rounded-xl p-6 flex items-start gap-3">
        <ShieldAlert className="w-6 h-6 shrink-0 text-destructive" />
        <div className="text-sm leading-relaxed">
          <p className="font-semibold text-destructive">
            Could not read this certificate
          </p>
          <p className="text-muted-foreground">{status.message}</p>
        </div>
      </div>
    );
  }

  const { certificate, result } = status;
  const valid = result.valid;

  return (
    <div className="space-y-4">
      {/* Verdict banner */}
      <div
        className={`rounded-xl p-6 flex items-start gap-4 border ${
          valid
            ? 'border-emerald-500/40 bg-emerald-500/5'
            : 'border-destructive/40 bg-destructive/5'
        }`}
      >
        {valid ? (
          <ShieldCheck className="w-10 h-10 shrink-0 text-emerald-500" />
        ) : (
          <ShieldAlert className="w-10 h-10 shrink-0 text-destructive" />
        )}
        <div className="space-y-1">
          <p
            className={`text-lg font-bold ${
              valid ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'
            }`}
          >
            {valid
              ? '✅ Authentic — this result has not been modified'
              : '❌ Invalid or altered certificate'}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {valid
              ? 'The SHA-256 hash recomputed from this certificate matches the published value. The winner, the participant list, the timestamp — every recorded field is exactly what was sealed at draw time. Nothing was changed afterwards.'
              : 'The hash recomputed from this certificate does not match the published value. The result may have been edited after the draw, or the code was corrupted in transit.'}
          </p>
        </div>
      </div>

      {/* Checks breakdown */}
      <div className="grid gap-3">
        <CheckRow
          ok={result.hashMatches}
          label="Integrity hash matches"
          detail="SHA-256 recomputed from the recorded fields"
        />
      </div>

      {/* Certificate details */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <DetailRow
          icon={<Trophy className="w-4 h-4 text-primary" />}
          label="Declared winner"
          value={certificate.winner}
        />
        <DetailRow
          icon={<Clock className="w-4 h-4 text-primary" />}
          label="Draw timestamp"
          value={new Date(certificate.timestamp).toLocaleString()}
        />
        <DetailRow
          icon={<Fingerprint className="w-4 h-4 text-primary" />}
          label="Nonce"
          value={certificate.nonce}
          mono
        />
        <DetailRow
          icon={<Hash className="w-4 h-4 text-primary" />}
          label={`Hash (${certificate.v})`}
          value={certificate.hash}
          mono
        />

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Users className="w-4 h-4 text-primary" />
            Participants ({certificate.participants.length})
          </div>
          <ol className="grid sm:grid-cols-2 gap-1.5 text-sm">
            {certificate.participants.map((p, i) => {
              const isWinner = p.pseudo === certificate.winner;
              return (
                <li
                  key={`${p.pseudo}-${i}`}
                  className={`flex items-center justify-between rounded-lg border px-3 py-1.5 ${
                    isWinner
                      ? 'border-primary/50 bg-primary/5 font-semibold text-foreground'
                      : 'border-border text-muted-foreground'
                  }`}
                >
                  <span className="truncate">
                    {i + 1}. {p.pseudo}
                    {isWinner && ' 🏆'}
                  </span>
                  {p.weight > 1 && (
                    <span className="ml-2 shrink-0 text-xs">×{p.weight}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

const CheckRow: React.FC<{ ok: boolean; label: string; detail: string }> = ({
  ok,
  label,
  detail,
}) => (
  <div
    className={`flex items-start gap-3 rounded-xl border p-4 ${
      ok ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-destructive/30 bg-destructive/5'
    }`}
  >
    {ok ? (
      <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-500" />
    ) : (
      <ShieldAlert className="w-5 h-5 shrink-0 text-destructive" />
    )}
    <div>
      <p className="text-sm font-semibold text-foreground">
        {ok ? '✅ ' : '❌ '}
        {label}
      </p>
      <p className="text-xs text-muted-foreground break-all">{detail}</p>
    </div>
  </div>
);

const DetailRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}> = ({ icon, label, value, mono }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {icon}
      {label}
    </div>
    <p
      className={`text-sm text-foreground break-all ${
        mono ? 'font-mono text-xs' : ''
      }`}
    >
      {value}
    </p>
  </div>
);

export default VerifyIsland;
