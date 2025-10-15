import { useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import office from "../assets/office.webp"; // behåll din bild

export default function Hero() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    about: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Välj en fil innan du laddar upp.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // 🧩 1. Ladda upp CV till Supabase Storage
      const filePath = `cvs/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("cvs")
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      // 🧩 2. Hämta offentlig URL till filen
      const { data: publicData } = supabase.storage
        .from("cvs")
        .getPublicUrl(filePath);
      const fileUrl = publicData?.publicUrl;

      // 🧩 3. Spara ansökan i databasen
      const { error: insertError } = await supabase.from("applications").insert([
        {
          name: formData.name,
          email: formData.email,
          linkedin: formData.linkedin,
          about: formData.about,
          file_url: fileUrl,
        },
      ]);
      if (insertError) throw insertError;

      setMessage("Tack! Din ansökan har skickats.");
      setFormData({ name: "", email: "", linkedin: "", about: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("Ett fel uppstod. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-tr from-sky-100 to-green-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid lg:grid-cols-2 gap-8 items-center">
        {/* 🧠 Textdel */}
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Vi hjälper företag att navigera genom förändring och växa hållbart.
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-md">
            På North Path Consulting erbjuder vi erfarna konsulter inom ekonomi
            och verksamhetsutveckling – flexibla lösningar för rätt kompetens i
            rätt tid.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {/* Boka möte */}
            <a
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Boka ett möte
            </a>

            {/* Skicka ansökan */}
            <button
              onClick={() => setShowModal(true)}
              className="border border-blue-600 text-blue-600 bg-white px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition"
            >
              Skicka in din ansökan
            </button>
          </div>

          {message && (
            <p className="mt-4 text-green-700 text-sm max-w-md">{message}</p>
          )}
        </div>

        {/* 🖼️ Bild */}
        <img
          src={office}
          alt="Kontorsmiljö"
          className="rounded-lg shadow-xl w-full object-cover h-[420px]"
        />
      </div>

      {/* ✅ Popup-modal för CV-uppladdning */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Skicka in din ansökan
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              <input
                type="text"
                name="name"
                placeholder="Namn"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />

              <input
                type="email"
                name="email"
                placeholder="E-post"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />

              <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn (valfritt)"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />

              <textarea
                name="about"
                placeholder="Berätta kort om dig själv"
                value={formData.about}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
              />

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                className="block w-full text-sm border border-gray-300 rounded-md cursor-pointer"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
              >
                {loading ? "Skickar..." : "Skicka CV"}
              </button>

              {message && (
                <p className="text-sm text-center text-gray-700 mt-2">{message}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
