import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;
      if (!session) {
        navigate("/admin/login");
        return;
      }
      setAdminEmail(session.user.email);
      if (session.user.email !== "admin@northpath.se") navigate("/");
    }
    checkSession();
  }, [navigate]);

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 bg-gray-50 min-h-screen p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Välkommen till Adminpanelen
        </h1>
        {adminEmail && (
          <p className="text-sm text-gray-600 mb-8">
            Inloggad som <span className="font-medium text-blue-700">{adminEmail}</span>
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Snabböversikt
            </h2>
            <p className="text-gray-600">Hantera alla inkommande ansökningar och kontakter i menyn.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Tips</h2>
            <p className="text-gray-600">Du kan växla mellan sidorna i sidomenyn.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
