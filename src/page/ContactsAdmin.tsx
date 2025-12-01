import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

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
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  // ✅ FIX: Guarantee Supabase session exists before fetching data
  useEffect(() => {
    const checkAuth = async () => {
      // 1️⃣ Get Supabase session
      const { data: { session } } = await supabase.auth.getSession();

      console.log("Session loaded:", session);

      if (!session) {
        navigate("/admin/login");
        return;
      }

      // 2️⃣ Check allowed_admins table for authorization
      const email = session.user.email;
      const { data: allowed } = await supabase
        .from("allowed_admins")
        .select("*")
        .eq("email", email)
        .single();

      if (!allowed) {
        navigate("/");
        return;
      }

      // 3️⃣ Auth OK → Allow data fetch
      setChecking(false);
    };

    checkAuth();
  }, [navigate]);

  // ⚡ Load contacts ONLY after authentication is verified
  useEffect(() => {
    if (!checking) fetchContacts();
  }, [checking]);

  const fetchContacts = async () => {
    setLoading(true);

    console.log("Fetching contacts...");

    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fel vid hämtning:", error);
    } else {
      console.log("Fetched contacts:", data);
      setContacts(data || []);
    }

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

  if (checking) {
    return <p className="text-center mt-10">Kontrollerar behörighet...</p>;
  }

  return (
    <section className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Företagsförfrågningar – Adminpanel
        </h1>

        {loading ? (
          <p className="text-gray-500">Laddar förfrågningar...</p>
        ) : contacts.length === 0 ? (
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
                  <th className="border p-2">Datum</th>
                </tr>
              </thead>

              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="border p-2 font-medium">{contact.name}</td>

                    <td className="border p-2">
                      {contact.company || "-"}
                    </td>

                    <td className="border p-2">
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {contact.email}
                      </a>
                    </td>

                    <td className="border p-2 max-w-xs text-gray-700">
                      {contact.message || "-"}
                    </td>

                    <td className="border p-2">
                      <select
                        value={contact.status || "Ny"}
                        onChange={(e) =>
                          updateStatus(contact.id, e.target.value)
                        }
                        className="border border-gray-300 rounded-md px-2 py-1"
                      >
                        <option>Ny</option>
                        <option>Kontaktad</option>
                        <option>Avslutad</option>
                      </select>
                    </td>

                    <td className="border p-2 text-gray-500">
                      {new Date(contact.created_at).toLocaleDateString("sv-SE")}
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
