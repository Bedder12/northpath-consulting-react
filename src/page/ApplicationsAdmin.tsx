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

  // FETCH APPS
  useEffect(() => {
    if (!checking && session) fetchApplications();
  }, [checking, session]);

  const fetchApplications = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setApplications(data || []);

    setLoading(false);
  };

  const updateStatus = async (id: number, newStatus: string) => {
    await supabase.from("applications").update({ status: newStatus }).eq("id", id);
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const deleteApplication = async (id: number) => {
    await supabase.from("applications").delete().eq("id", id);
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

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
    <section className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-md">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Ansökningar – Adminpanel
          </h1>

          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm sm:text-base"
          >
            📥 Exportera till Excel
          </button>
        </div>

        {/* FILTERS + UPDATE */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded w-full sm:w-auto"
          >
            <option>Alla</option>
            <option value="Ny">Ny</option>
            <option value="Granskad">Granskad</option>
            <option value="Kontaktad">Kontaktad</option>
          </select>

          <button
            onClick={fetchApplications}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
          >
            🔄 Uppdatera
          </button>
        </div>

        {loading ? (
          <p>Laddar ansökningar...</p>
        ) : filteredApps.length === 0 ? (
          <p className="text-gray-600">Inga ansökningar hittades.</p>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
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
                          <a href={app.linkedin} target="_blank" className="text-blue-600">
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
                          <option value="">Välj</option>
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

            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-4">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="p-4 border rounded-lg shadow-sm bg-white"
                >
                  <div className="flex justify-between">
                    <h2 className="font-bold text-lg">{app.name}</h2>
                    <button
                      onClick={() => deleteApplication(app.id)}
                      className="text-red-600"
                    >
                      Ta bort
                    </button>
                  </div>

                  <p className="text-sm text-gray-600">
                    {new Date(app.created_at).toLocaleDateString("sv-SE")}
                  </p>

                  <div className="mt-3 space-y-2 text-sm">
                    <p>
                      <span className="font-medium">E-post:</span>{" "}
                      <a href={`mailto:${app.email}`} className="text-blue-600">
                        {app.email}
                      </a>
                    </p>

                    {app.linkedin && (
                      <p>
                        <span className="font-medium">LinkedIn:</span>{" "}
                        <a
                          href={app.linkedin}
                          target="_blank"
                          className="text-blue-600"
                        >
                          Profil
                        </a>
                      </p>
                    )}

                    <p>
                      <span className="font-medium">Om kandidaten:</span>{" "}
                      {app.about || "-"}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    {app.file_url && (
                      <button
                        onClick={() => setPreviewUrl(app.file_url!)}
                        className="text-blue-600 font-medium"
                      >
                        Visa CV
                      </button>
                    )}

                    <select
                      value={app.status ?? ""}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className="border p-2 rounded w-full"
                    >
                      <option value="">Välj status</option>
                      <option value="Ny">Ny</option>
                      <option value="Granskad">Granskad</option>
                      <option value="Kontaktad">Kontaktad</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* CV MODAL */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl h-[80vh] rounded-xl overflow-hidden shadow-xl relative">
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute top-3 right-3 text-2xl text-gray-700"
            >
              ×
            </button>

            <iframe
              src={previewUrl}
              className="w-full h-full"
              title="CV Preview"
            />
          </div>
        </div>
      )}
    </section>
  );
}
