import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      // Not logged in → redirect
      if (!session) {
        navigate("/admin/login");
        return;
      }

      const email = session.user.email;

      // Check if allowed admin
      const { data: allowed } = await supabase
        .from("allowed_admins")
        .select("*")
        .eq("email", email)
        .single();

      if (!allowed) {
        navigate("/");
        return;
      }

      setChecking(false);
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (checking) {
    return <p className="text-center mt-10">Kontrollerar behörighet...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          NorthPath Adminpanel
        </h1>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
          <Link
            to="/admin/applications"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            👔 Kandidatansökningar
          </Link>
          <Link
            to="/admin/contacts"
            className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition"
          >
            🏢 Företagsförfrågningar
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-red-600 transition"
        >
          Logga ut
        </button>
      </div>
    </section>
  );
}
