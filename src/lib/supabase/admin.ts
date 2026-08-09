/**
 * Service-role Supabase client — bypasses RLS. SERVER-ONLY.
 * Use only where strictly necessary (e.g. trusted server actions). Never expose to the browser.
 */
import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { publicEnv, getServiceRoleKey } from "@/lib/env";
import type { Database } from "@/lib/supabase/types";

export function createAdminClient() {
  return createSupabaseClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    getServiceRoleKey(),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
