import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  (import.meta.env.PUBLIC_SUPABASE_URL as string) ||
  'https://klejwxhvmxhmuvcyolwv.supabase.co';

const supabaseKey =
  (import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsZWp3eGh2bXhobXV2Y3lvbHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NzU1NTksImV4cCI6MjA4OTE1MTU1OX0.etCBTBTaojLfYah1CUnWwumwmN7WQKgQa7o5yVesqvY';

export const supabase = createClient(supabaseUrl, supabaseKey);
