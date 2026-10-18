// agent-notes: { ctx: "Supabase browser and server client helper", deps: [".env.local"], state: active, last: "antigravity@2026-10-18" }

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    !supabaseUrl.includes("placeholder.supabase.co") &&
    supabaseAnonKey &&
    supabaseAnonKey !== "placeholder-anon-key"
);

if (!isSupabaseConfigured) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "Supabase credentials missing. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local or your hosting environment."
    );
  }
}

/**
 * Standard Supabase client instance for client-side and public queries.
 */
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
