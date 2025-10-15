import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kcctblzaazmfyaybfcxa.supabase.co"; // 🔹 Replace this
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjY3RibHphYXptZnlheWJmY3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MDQ3MzMsImV4cCI6MjA3NjA4MDczM30.ET7_-dSDgw0ngVP771u0-vuh47EaLxIgTCRjt5suIbE"; // 🔹 Replace this

export const supabase = createClient(supabaseUrl, supabaseKey);
