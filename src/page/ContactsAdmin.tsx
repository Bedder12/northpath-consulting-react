import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { useAuthContext } from "../auth/AuthProvider";

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
  const [filter, setFilter] = useState("Alla");
  const [checking, setChecking] = useState(true);
  const [previewMessage, setPreviewMessage] = useState<string | null>(null);

  const { session } = useAuthContext();
  const navigate = useNavigate();

  // AUTH CHECK
  useEffect(() => {
    const checkAuth = async () => {
      if (!session) {
        navigate("/admin/login");
        return;
      }

      const email = session.user.email;

      const { data: allowed } = await supabase
        .from("allowed_admins")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      if (!allowed) {
        navigate("/");
        return;
      }

      setChecking(false);
    };

    checkAuth();
  }, [session, navigate]);

  // LOAD DATA WHEN SESSION AVAILABLE
  useEffect(() => {
    if (!checking && session) {
      fetchContacts();
    }
  }, [checking, session]);

  const fetchContacts = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setContacts(data || []);
    }

    setLoading(false);
  };

  const updateStatus = async (id: number, newStatus: string) => {
    await supabase
      .from("contacts")
      .update({ status: newStatus })
      .eq("id", id);

    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const deleteContact = async (id: number) => {
    await supabase.from("contacts").delete().eq("id", id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(contacts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
    XLSX.writeFile(workbook, "contact_requests.xlsx");
  };

  if (checking) {
    return <p className="text-center mt-10">Kontrollerar behörighet...</p>;
  }

  const filteredContacts =
    filter === "Alla"
      ? contacts
      : contacts.filter((c) => c.status === filter);

  return (
    <section className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Företagsförfrågningar – Admin
          </h1>
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            📥 Exportera till Excel
          </button>
        </div>

        {/* FILTER */}
        <div className="flex justify-between mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option>Alla</option>
            <option value="Ny">Ny</option>
            <option value="Kontaktad">Kontaktad</option>
            <option value="Avslutad">Avslutad</option>
          </select>

          <button
            onClick={fetchContacts}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            🔄 Uppdatera
          </button>
        </div>

        {loading ? (
          <p>Laddar förfrågningar...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Namn</th>
                  <th className="border p-2">Företag</th>
                  <th className="border p-2">E-post</th>
                  <th className="border p-2">Meddelande</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Ta bort</th>
                  <th className="border p-2">Datum</th>
                </tr>
              </thead>

              <tbody>
                {filteredContacts.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="border p-2">{c.name}</td>
                    <td className="border p-2">{c.company || "-"}</td>
                    <td className="border p-2">
                      <a href={`mailto:${c.email}`} className="text-blue-600">
                        {c.email}
                      </a>
                    </td>
                    <td className="border p-2">
                      <button
                        className="text-blue-600 underline"
                        onClick={() =>
                          setPreviewMessage(c.message || "Inget meddelande")
                        }
                      >
                        Visa
                      </button>
                    </td>
                    <td className="border p-2">
                      <select
                        value={c.status ?? ""}
                        onChange={(e) => updateStatus(c.id, e.target.value)}
                        className="border p-1 rounded"
                      >
                        <option value="">Välj status</option>
                        <option value="Ny">Ny</option>
                        <option value="Kontaktad">Kontaktad</option>
                        <option value="Avslutad">Avslutad</option>
                      </select>
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => deleteContact(c.id)}
                        className="text-red-600"
                      >
                        Ta bort
                      </button>
                    </td>
                    <td className="border p-2">
                      {new Date(c.created_at).toLocaleDateString("sv-SE")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
