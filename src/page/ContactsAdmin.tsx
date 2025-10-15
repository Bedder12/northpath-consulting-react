import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

interface Contact {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string | null;
  status: string | null;
  created_at: string;
}

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) navigate("/admin/login");
    }
    checkSession();
    fetchContacts();
  }, [navigate]);

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    else setContacts(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: number, newStatus: string) => {
    const { error } = await supabase
      .from("contacts")
      .update({ status: newStatus })
      .eq("id", id);
    if (!error) {
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 bg-gray-50 min-h-screen py-12 px-6">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Företagsförfrågningar
          </h1>
          {loading ? (
            <p className="text-gray-500">Laddar kontakter...</p>
          ) : contacts.length === 0 ? (
            <p className="text-gray-500">Inga nya förfrågningar ännu.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200 text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="border p-2">Namn</th>
                    <th className="border p-2">Företag</th>
                    <th className="border p-2">E-post</th>
                    <th className="border p-2">Meddelande</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="border p-2 font-medium">{c.name}</td>
                      <td className="border p-2">{c.company || "-"}</td>
                      <td className="border p-2">
                        <a
                          href={`mailto:${c.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {c.email}
                        </a>
                      </td>
                      <td className="border p-2 max-w-xs text-gray-700">
                        {c.message || "-"}
                      </td>
                      <td className="border p-2">
                        <select
                          value={c.status || "Ny"}
                          onChange={(e) =>
                            updateStatus(c.id, e.target.value)
                          }
                          className="border border-gray-300 rounded-md px-2 py-1"
                        >
                          <option>Ny</option>
                          <option>Kontaktad</option>
                          <option>Avslutad</option>
                        </select>
                      </td>
                      <td className="border p-2 text-gray-500">
                        {new Date(c.created_at).toLocaleDateString("sv-SE")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
