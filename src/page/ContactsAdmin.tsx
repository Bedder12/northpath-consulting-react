import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

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
  const navigate = useNavigate();

  // AUTH CHECK
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate("/admin/login");
        return;
      }

      const { data: allowed } = await supabase
        .from("allowed_admins")
        .select("*")
        .eq("email", session.user.email)
        .single();

      if (!allowed) {
        navigate("/");
        return;
      }

      setChecking(false);
    };

    checkAuth();
  }, [navigate]);

  // LOAD CONTACTS AFTER AUTH
  useEffect(() => {
    if (!checking) fetchContacts();
  }, [checking]);

  // FETCH CONTACTS — ONLY add NEW ones
  const fetchContacts = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fel vid hämtning:", error);
    } else {
      setContacts((prev) => {
        const existingIds = new Set(prev.map((c) => c.id));
        const newOnes = (data || []).filter((c) => !existingIds.has(c.id));
        return [...prev, ...newOnes];
      });
    }

    setLoading(false);
  };

  // UPDATE STATUS
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

  // DELETE CONTACT REQUEST
  const deleteContact = async (id: number) => {
    const { error } = await supabase.from("contacts").delete().eq("id", id);

    if (!error) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // EXPORT TO EXCEL
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(contacts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

    XLSX.writeFile(workbook, "contact_requests.xlsx");
  };

  if (checking) {
    return <p className="text-center mt-10">Kontrollerar behörighet...</p>;
  }

  // COUNTERS
  const countNy = contacts.filter((c) => c.status === "Ny").length;
  const countKontaktad = contacts.filter((c) => c.status === "Kontaktad").length;
  const countAvslutad = contacts.filter((c) => c.status === "Avslutad").length;

  const filteredContacts =
    filter === "Alla"
      ? contacts
      : contacts.filter((c) => c.status === filter);

  return (
    <section className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md">

        {/* HEADER + EXPORT */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Företagsförfrågningar – Admin</h1>

          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            📥 Exportera till Excel
          </button>
        </div>

        {/* STATUS COUNTERS */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md font-medium">
            Ny: {countNy}
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md font-medium">
            Kontaktad: {countKontaktad}
          </div>
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-md font-medium">
            Avslutad: {countAvslutad}
          </div>
          <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md font-medium">
            Totalt: {contacts.length}
          </div>
        </div>

        {/* FILTER + REFRESH */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <label className="text-gray-700 font-medium mr-2">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1"
            >
              <option>Alla</option>
              <option value="Ny">Ny</option>
              <option value="Kontaktad">Kontaktad</option>
              <option value="Avslutad">Avslutad</option>
            </select>
          </div>

          <button
            onClick={fetchContacts}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            🔄 Uppdatera
          </button>
        </div>

        {/* TABLE */}
        {loading ? (
          <p className="text-gray-500">Laddar förfrågningar...</p>
        ) : filteredContacts.length === 0 ? (
          <p className="text-gray-500">Inga förfrågningar att visa.</p>
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
                  <th className="border p-2">Ta bort</th>
                  <th className="border p-2">Datum</th>
                </tr>
              </thead>

              <tbody>
                {filteredContacts.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">

                    <td className="border p-2 font-medium">{c.name}</td>

                    <td className="border p-2">{c.company || "-"}</td>

                    <td className="border p-2">
                      <a href={`mailto:${c.email}`} className="text-blue-600 hover:underline">
                        {c.email}
                      </a>
                    </td>

                    {/* MESSAGE PREVIEW */}
                    <td className="border p-2 max-w-xs">
                      <button
                        onClick={() => setPreviewMessage(c.message || "Inget meddelande")}
                        className="text-blue-600 hover:underline"
                      >
                        Visa
                      </button>
                    </td>

                    {/* STATUS DROPDOWN */}
                    <td className="border p-2">
                      <select
                        value={c.status ?? ""}
                        onChange={(e) => updateStatus(c.id, e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1"
                      >
                        <option value="">Välj status</option>
                        <option value="Ny">Ny</option>
                        <option value="Kontaktad">Kontaktad</option>
                        <option value="Avslutad">Avslutad</option>
                      </select>
                    </td>

                    {/* DELETE BUTTON */}
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => deleteContact(c.id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Ta bort
                      </button>
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

      {/* MESSAGE PREVIEW MODAL */}
      {previewMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-lg rounded-xl shadow-xl p-6 relative">

            <button
              className="absolute top-3 right-3 text-gray-700 hover:text-black text-xl"
              onClick={() => setPreviewMessage(null)}
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4">Meddelande</h2>

            <p className="text-gray-800 whitespace-pre-wrap">
              {previewMessage}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
