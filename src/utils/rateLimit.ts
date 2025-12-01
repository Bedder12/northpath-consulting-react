import { supabase } from "../supabaseClient";

// How many submissions allowed per hour per IP
const LIMIT = 5;

export async function checkRateLimit() {
  try {
    // 1️⃣ Get IP address from ipify
    const ipRes = await fetch("https://api64.ipify.org?format=json");
    const ipData = await ipRes.json();
    const ip = ipData.ip;

    // 2️⃣ Check rate limit rows in the last 1 hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from("rate_limit")
      .select("*")
      .eq("ip_address", ip)
      .gte("created_at", oneHourAgo);

    if (error) {
      console.error("Rate limit check error:", error);
      return { allowed: true, ip };
    }

    // 3️⃣ Block if over limit
    if (data && data.length >= LIMIT) {
      return { allowed: false, ip };
    }

    // 4️⃣ Insert new rate-limit record
    await supabase.from("rate_limit").insert([
      { ip_address: ip }
    ]);

    return { allowed: true, ip };

  } catch (err) {
    console.error("Rate limit failure", err);
    return { allowed: true };
  }
}
