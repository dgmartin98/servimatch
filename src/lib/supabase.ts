import { createClient } from "@supabase/supabase-js";

// Creamos un cliente reutilizable en toda la app
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,     // viene del .env.local
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // viene del .env.local
);
