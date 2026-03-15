import { supabase } from './supabase';

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
  if (!supabase) return [];
  const { data } = await supabase
    .from('saved_wheels')
    .select('*')
    .eq('is_public', true)
    .order('spin_count', { ascending: false })
    .limit(limit);
  return (data as SavedWheel[]) || [];
}

export async function saveWheel(wheel: {
  title: string;
  items: string[];
  theme?: string;
  border_style?: string;
  author_name?: string;
}): Promise<string | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('saved_wheels')
    .insert([{ ...wheel, is_public: true }])
    .select('id')
    .single();
  if (error) { console.error(error); return null; }
  return (data as { id: string })?.id || null;
}

export async function getWheelById(id: string): Promise<SavedWheel | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from('saved_wheels')
    .select('*')
    .eq('id', id)
    .single();
  return data as SavedWheel | null;
}

export async function incrementWheelSpins(id: string): Promise<void> {
  if (!supabase) return;
  await supabase.rpc('increment_wheel_spins', { wheel_id: id });
}
