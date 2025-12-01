import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

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
  const navigate = useNavigate();

  // Check admin authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate("/admin/login");
        return;
      }

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

      setChecking(false);
    };

    checkAuth();
  }, [navigate]);

  // Load applications
  useEffect(() => {
    if (!checking) fetchApplications();
  }, [checking]);

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

  // Update status
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

  // Delete application
  const deleteApplication = async (id: number) => {
    const { error } = await supabase
      .from("applications")
      .delete()
      .eq("id", id);

    if (!error) {
      setApplications((prev) => prev.filter((a) => a.id !== id));
    }
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

  // Counters
  const countNy = applications.filter((a) => a.status === "Ny").length;
  const countGranskad = applications.filter((a) => a.status === "Granskad").length;
  const countKontaktad = applications.filter((a) => a.status === "Kontaktad").length;

  const filteredApps =
    filter === "Alla"
      ? applications
      : applications.filter((a) => a.status === filter);

  return (
    <section className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md">

        {/* HEADER + EXPORT */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Ansökningar – Adminpanel</h1>

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
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-md font-medium">
            Granskad: {countGranskad}
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md font-medium">
            Kontaktad: {countKontaktad}
          </div>
          <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md font-medium">
            Totalt: {applications.length}
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

        {/* TABLE */}
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
                  <th className="border p-2">Ta bort</th>
                  <th className="border p-2">Datum</th>
                </tr>
              </thead>

              <tbody>
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="border p-2 font-medium">{app.name}</td>

                    <td className="border p-2">
                      <a href={`mailto:${app.email}`} className="text-blue-600 hover:underline">
                        {app.email}
                      </a>
                    </td>

                    <td className="border p-2">
                      {app.linkedin ? (
                        <a href={app.linkedin} target="_blank" className="text-blue-600 hover:underline">
                          Profil
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="border p-2 max-w-xs text-gray-700">
                      {app.about || "-"}
                    </td>

                    {/* CV COLUMN */}
                    <td className="border p-2 text-center">
                      {app.file_url ? (
                        <div className="flex flex-col items-center gap-1">
                          <button
                            onClick={() => setPreviewUrl(app.file_url!)}
                            className="text-blue-600 hover:underline"
                          >
                            Visa CV
                          </button>

                          <a
                            href={app.file_url!}
                            target="_blank"
                            className="text-gray-600 text-sm hover:underline"
                          >
                            Ladda ner
                          </a>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* STATUS */}
                    <td className="border p-2">
                      <select
                        value={app.status || "Ny"}
                        onChange={(e) => updateStatus(app.id, e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1"
                      >
                        <option>Ny</option>
                        <option>Granskad</option>
                        <option>Kontaktad</option>
                      </select>
                    </td>

                    {/* DELETE BUTTON */}
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Ta bort
                      </button>
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

      {/* CV PREVIEW MODAL */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-4xl h-[90%] rounded-xl shadow-xl p-4 relative flex flex-col">

            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-700 hover:text-black text-xl"
              onClick={() => setPreviewUrl(null)}
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-3 text-gray-800">CV Preview</h2>

            {/* PDF Viewer */}
            <iframe
              src={previewUrl}
              className="flex-grow w-full rounded-md border"
            />

            <a
              href={previewUrl}
              target="_blank"
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md text-center hover:bg-blue-700"
            >
              Ladda ner filen
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
