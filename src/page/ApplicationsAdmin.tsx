import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

interface Application {
  id: number;
  name: string;
  email: string;
  linkedin: string | null;
  about: string | null;
  file_url: string | null;
  status: string | null;
  created_at: string;
}

export default function ApplicationsAdmin() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Alla");
  const navigate = useNavigate();

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        navigate("/admin/login");
      }
    }
    checkSession();
    fetchApplications();
  }, [navigate]);

  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error("Fel vid hämtning:", error);
    else setApplications(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: number, newStatus: string) => {
    const { error } = await supabase
      .from("applications")
      .update({ status: newStatus })
      .eq("id", id);
    if (!error) {
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
    }
  };

  const filteredApps =
    filter === "Alla"
      ? applications
      : applications.filter((a) => a.status === filter);

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 bg-gray-50 min-h-screen py-12 px-6">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Ansökningar
          </h1>

          <div className="flex justify-between items-center mb-6">
            <div>
              <label className="text-gray-700 font-medium mr-2">Filter:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1"
              >
                <option>Alla</option>
                <option>Ny</option>
                <option>Granskad</option>
                <option>Kontaktad</option>
              </select>
            </div>
            <button
              onClick={fetchApplications}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              🔄 Uppdatera
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500">Laddar ansökningar...</p>
          ) : filteredApps.length === 0 ? (
            <p className="text-gray-500">Inga ansökningar att visa.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200 text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="border p-2">Namn</th>
                    <th className="border p-2">E-post</th>
                    <th className="border p-2">LinkedIn</th>
                    <th className="border p-2">Om kandidaten</th>
                    <th className="border p-2">CV</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="border p-2 font-medium">{app.name}</td>
                      <td className="border p-2">
                        <a
                          href={`mailto:${app.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {app.email}
                        </a>
                      </td>
                      <td className="border p-2">
                        {app.linkedin ? (
                          <a
                            href={app.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Profil
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="border p-2 max-w-xs text-gray-700">
                        {app.about || "-"}
                      </td>
                      <td className="border p-2 text-center">
                        {app.file_url ? (
                          <a
                            href={app.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Ladda ner
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="border p-2">
                        <select
                          value={app.status || "Ny"}
                          onChange={(e) =>
                            updateStatus(app.id, e.target.value)
                          }
                          className="border border-gray-300 rounded-md px-2 py-1"
                        >
                          <option>Ny</option>
                          <option>Granskad</option>
                          <option>Kontaktad</option>
                        </select>
                      </td>
                      <td className="border p-2 text-gray-500">
                        {new Date(app.created_at).toLocaleDateString("sv-SE")}
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
