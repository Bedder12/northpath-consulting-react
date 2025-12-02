import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { useAuthContext } from "../auth/AuthProvider";

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
  const [checking, setChecking] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  // FETCH DATA WHEN AUTH OR SESSION CHANGES
  useEffect(() => {
    if (!checking && session) {
      fetchApplications();
    }
  }, [checking, session]);

  const fetchApplications = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setApplications(data || []);
    }

    setLoading(false);
  };

  // UPDATE STATUS
  const updateStatus = async (id: number, newStatus: string) => {
    await supabase
      .from("applications")
      .update({ status: newStatus })
      .eq("id", id);

    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  // DELETE APPLICATION
  const deleteApplication = async (id: number) => {
    await supabase.from("applications").delete().eq("id", id);

    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  // EXPORT TO EXCEL
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(applications);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
    XLSX.writeFile(workbook, "applications.xlsx");
  };

  if (checking) {
    return <p className="text-center mt-10">Kontrollerar behörighet...</p>;
  }

  const filteredApps =
    filter === "Alla"
      ? applications
      : applications.filter((a) => a.status === filter);

  return (
    <section className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Ansökningar – Adminpanel
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
            <option value="Granskad">Granskad</option>
            <option value="Kontaktad">Kontaktad</option>
          </select>

          <button
            onClick={fetchApplications}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            🔄 Uppdatera
          </button>
        </div>

        {loading ? (
          <p>Laddar ansökningar...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Namn</th>
                  <th className="border p-2">E-post</th>
                  <th className="border p-2">LinkedIn</th>
                  <th className="border p-2">Om kandidaten</th>
                  <th className="border p-2">CV</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Ta bort</th>
                  <th className="border p-2">Datum</th>
                </tr>
              </thead>

              <tbody>
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="border p-2">{app.name}</td>
                    <td className="border p-2">
                      <a href={`mailto:${app.email}`} className="text-blue-600">
                        {app.email}
                      </a>
                    </td>
                    <td className="border p-2">
                      {app.linkedin ? (
                        <a
                          href={app.linkedin}
                          target="_blank"
                          className="text-blue-600"
                        >
                          Profil
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="border p-2">{app.about || "-"}</td>
                    <td className="border p-2">
                      {app.file_url ? (
                        <button
                          onClick={() => setPreviewUrl(app.file_url!)}
                          className="text-blue-600"
                        >
                          Visa CV
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="border p-2">
                      <select
                        value={app.status ?? ""}
                        onChange={(e) => updateStatus(app.id, e.target.value)}
                        className="border p-1 rounded"
                      >
                        <option value="">Välj status</option>
                        <option value="Ny">Ny</option>
                        <option value="Granskad">Granskad</option>
                        <option value="Kontaktad">Kontaktad</option>
                      </select>
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="text-red-600"
                      >
                        Ta bort
                      </button>
                    </td>
                    <td className="border p-2">
                      {new Date(app.created_at).toLocaleDateString("sv-SE")}
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
