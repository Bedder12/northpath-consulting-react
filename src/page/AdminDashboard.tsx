// src/pages/AdminDashboard.tsx
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function AdminDashboard() {

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

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
