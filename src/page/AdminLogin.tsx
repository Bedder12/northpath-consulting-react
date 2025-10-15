import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Fel e-post eller lösenord. Försök igen.");
      setLoading(false);
      return;
    }

    // ✅ Save session handled automatically by Supabase
    if (data?.session) {
      navigate("/admin/dashboard");
    } else {
      setError("Inloggningen misslyckades. Försök igen.");
    }

    setLoading(false);
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-50 to-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Adminpanel
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Logga in för att hantera ansökningar och kontakter
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">E-post</label>
            <input
              type="email"
              placeholder="admin@northpath.se"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Lösenord</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
          >
            {loading ? "Loggar in..." : "Logga in"}
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
