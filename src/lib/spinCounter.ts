// Global spin counter, backed by Supabase PostgREST.
//
// This module talks to the REST endpoint directly with `fetch()` and does NOT
// import `@supabase/supabase-js`, so islands that only need the counter
// (SimpleWheelIsland, HomepageIsland via useSpinCounter) don't pull the heavy
// client into their bundle. When env vars are missing everything degrades
// gracefully to a no-op / 0.

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;
const isConfigured = Boolean(supabaseUrl && supabaseKey);

const restHeaders = (): Record<string, string> => ({
  apikey: supabaseKey as string,
  Authorization: `Bearer ${supabaseKey as string}`,
  'Content-Type': 'application/json',
});

let localBuffer = 0;
let flushTimeout: ReturnType<typeof setTimeout> | null = null;

export async function getSpinCount(): Promise<number> {
  if (!isConfigured) return 0;
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/spin_counter?id=eq.global&select=total_spins`,
      { method: 'GET', headers: restHeaders() }
    );
    if (!res.ok) return 0;
    const rows = (await res.json()) as Array<{ total_spins: number }>;
    return (rows?.[0]?.total_spins as number) ?? 0;
  } catch {
    return 0;
  }
}

export function recordSpin() {
  if (!isConfigured) return;
  localBuffer++;
  if (!flushTimeout) {
    flushTimeout = setTimeout(async () => {
      const amount = localBuffer;
      localBuffer = 0;
      flushTimeout = null;
      try {
        // The server-side `increment_spins(amount)` RPC clamps amount to 1-100.
        await fetch(`${supabaseUrl}/rest/v1/rpc/increment_spins`, {
          method: 'POST',
          headers: restHeaders(),
          body: JSON.stringify({ amount }),
        });
      } catch (e) {
        console.error('Failed to flush spins:', e);
      }
    }, 5000);
  }
}
