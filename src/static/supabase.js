import { createClient } from "https://esm.sh/@supabase/supabase-js@1.35.4";


const SUPABASE_URL = "https://nttddjadlxijwiweezhx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50dGRkamFkbHhpandpd2Vlemh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY0MDU2NzUsImV4cCI6MTk3MTk4MTY3NX0.VG0kXU4aNzPSYunVP0c8zabxLM4xlepgb37O0_gBPFM";

const supabase = createClient(
	SUPABASE_URL,
	SUPABASE_ANON_KEY
);

window.supabase = supabase;