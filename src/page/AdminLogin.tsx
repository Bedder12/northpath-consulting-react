import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // 1️⃣ Check if email is allowed before sending login link
const { data: allowed } = await supabase
  .from("allowed_admins")
  .select("*")
  .eq("email", email)
  .single();


    if (!allowed) {
      setError("Du har inte behörighet att logga in.");
      return;
    }

    // 2️⃣ Send magic login link
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + "/admin/dashboard",
      },
    });

    if (otpError) {
      setError("Kunde inte skicka inloggningslänk.");
      return;
    }

    setMessage("En inloggningslänk har skickats till din e-post.");
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Admininloggning
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Din admin e-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Skicka inloggningslänk
          </button>
        </form>

        {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </section>
  );
}
