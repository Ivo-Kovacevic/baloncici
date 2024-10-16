import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iwqkvjhfryekkidifyuh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3cWt2amhmcnlla2tpZGlmeXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxMDUzNjMsImV4cCI6MjA0NDY4MTM2M30.JmbHcQgmhzxVGtZ9FGb5fCgGCj0WhAwceNaMNFR6dpQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
