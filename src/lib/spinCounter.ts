import { supabase } from './supabase';

let localBuffer = 0;
let flushTimeout: ReturnType<typeof setTimeout> | null = null;
const FALLBACK = 1_315_354;

export async function getSpinCount(): Promise<number> {
  if (!supabase) return FALLBACK;
  try {
    const { data } = await supabase
      .from('spin_counter')
      .select('total_spins')
      .eq('id', 'global')
      .single();
    return (data?.total_spins as number) || FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export function recordSpin() {
  if (!supabase) return;
  localBuffer++;
  if (!flushTimeout) {
    flushTimeout = setTimeout(async () => {
      const amount = localBuffer;
      localBuffer = 0;
      flushTimeout = null;
      try {
        await supabase!.rpc('increment_spins', { amount });
      } catch (e) {
        console.error('Failed to flush spins:', e);
      }
    }, 5000);
  }
}
