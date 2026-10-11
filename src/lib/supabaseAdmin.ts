// agent-notes: { ctx: "Supabase admin client using service role key for server routes", deps: [".env.local"], state: active, last: "antigravity@2026-10-11" }

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/**
 * Supabase client with elevated administrative privileges.
 * NEVER import this into client-side components! Only for API routes or Server Actions.
 */
export const supabaseAdmin = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  serviceRoleKey || "placeholder-service-key",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
