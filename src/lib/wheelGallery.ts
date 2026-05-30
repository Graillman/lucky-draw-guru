// Public wheel gallery, backed by Supabase PostgREST.
//
// Talks to the REST endpoint directly with `fetch()` and does NOT import
// `@supabase/supabase-js`, so the gallery islands (GalleryIsland, HomepageIsland)
// no longer pull the heavy client library into their bundle (~44 KB gzip saved).
// When env vars are missing everything degrades gracefully to []/null/no-op.

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;
const isConfigured = Boolean(supabaseUrl && supabaseKey);

const restHeaders = (extra: Record<string, string> = {}): Record<string, string> => ({
  apikey: supabaseKey as string,
  Authorization: `Bearer ${supabaseKey as string}`,
  'Content-Type': 'application/json',
  ...extra,
});

export interface SavedWheel {
  id: string;
  title: string;
  items: string[];
  theme: string;
  border_style: string;
  author_name: string;
  spin_count: number;
  created_at: string;
}

export async function getPublicWheels(limit = 30): Promise<SavedWheel[]> {
  if (!isConfigured) return [];
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/saved_wheels?is_public=eq.true&select=*&order=spin_count.desc&limit=${limit}`,
      { method: 'GET', headers: restHeaders() }
    );
    if (!res.ok) return [];
    return ((await res.json()) as SavedWheel[]) || [];
  } catch {
    return [];
  }
}

export async function saveWheel(wheel: {
  title: string;
  items: string[];
  theme?: string;
  border_style?: string;
  author_name?: string;
}): Promise<string | null> {
  if (!isConfigured) return null;
  try {
    // Server-side RLS enforces: is_public=true, title 1-80, items 2-200,
    // author_name <= 40, spin_count = 0. We send is_public explicitly.
    const res = await fetch(`${supabaseUrl}/rest/v1/saved_wheels`, {
      method: 'POST',
      headers: restHeaders({ Prefer: 'return=representation' }),
      body: JSON.stringify([{ ...wheel, is_public: true }]),
    });
    if (!res.ok) {
      console.error('saveWheel failed:', res.status, await res.text());
      return null;
    }
    const rows = (await res.json()) as Array<{ id: string }>;
    return rows?.[0]?.id ?? null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getWheelById(id: string): Promise<SavedWheel | null> {
  if (!isConfigured) return null;
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/saved_wheels?id=eq.${encodeURIComponent(id)}&select=*`,
      { method: 'GET', headers: restHeaders() }
    );
    if (!res.ok) return null;
    const rows = (await res.json()) as SavedWheel[];
    return rows?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function incrementWheelSpins(id: string): Promise<void> {
  if (!isConfigured) return;
  try {
    await fetch(`${supabaseUrl}/rest/v1/rpc/increment_wheel_spins`, {
      method: 'POST',
      headers: restHeaders(),
      body: JSON.stringify({ wheel_id: id }),
    });
  } catch {
    /* non-critical */
  }
}
