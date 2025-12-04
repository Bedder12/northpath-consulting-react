// src/pages/AdminDashboard.tsx
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function AdminDashboard() {

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-20 sm:py-24">
      <div className="max-w-lg mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-md">

        {/* HEADER */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          NorthPath Adminpanel
        </h1>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">

          <Link
            to="/admin/applications"
            className="
              bg-blue-600 text-white 
              w-full py-4 px-4 text-center rounded-xl 
              font-semibold text-lg shadow-sm 
              hover:bg-blue-700 active:scale-[0.98] transition
            "
          >
            👔 Kandidatansökningar
          </Link>

          <Link
            to="/admin/contacts"
            className="
              bg-green-600 text-white 
              w-full py-4 px-4 text-center rounded-xl 
              font-semibold text-lg shadow-sm 
              hover:bg-green-700 active:scale-[0.98] transition
            "
          >
            🏢 Företagsförfrågningar
          </Link>

        </div>

        {/* LOGOUT */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-500 hover:text-red-600 transition"
          >
            Logga ut
          </button>
        </div>

      </div>
    </section>
  );
}
