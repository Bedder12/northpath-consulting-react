import { useState } from "react";
import { supabase } from "../supabaseClient";
import heroFallback from "../assets/office.webp";

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
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0] || null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Välj en fil innan du laddar upp.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const filePath = `cvs/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("cvs")
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage
        .from("cvs")
        .getPublicUrl(filePath);

      const fileUrl = publicData?.publicUrl;

      const { error: insertError } = await supabase
        .from("applications")
        .insert([{ ...formData, file_url: fileUrl }]);
      if (insertError) throw insertError;

      setMessage("Tack! Din ansökan har skickats.");
      setFormData({ name: "", email: "", linkedin: "", about: "" });
      setFile(null);

      setTimeout(() => setShowModal(false), 1500);
    } catch (err) {
      setMessage("Ett fel uppstod. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative h-[75vh] sm:h-[80vh] w-full overflow-hidden">

      {/* ===== BACKGROUND FALLBACK IMAGE ===== */}
      <img
        src={heroFallback}
        alt="North Path Consulting"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ===== BACKGROUND VIDEO ===== */}
      <video
        className="absolute inset-0 w-full h-full object-cover hidden sm:block"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/video/office.mp4" type="video/mp4" />
      </video>

      {/* ===== DARK OVERLAY FOR CONTRAST (MOBILE-FRIENDLY) ===== */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/60 to-transparent"></div>

      {/* ===== CONTENT ===== */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full 
                      flex flex-col justify-center items-center sm:items-start 
                      text-center sm:text-left pt-10 sm:pt-0">

        <div className="max-w-2xl text-white">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
            Vi stärker företag<br />
            <span className="text-blue-300">
              med rätt ekonomisk kompetens.
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-blue-100 leading-relaxed">
            På North Path Consulting erbjuder vi kvalificerade och välrenommerade ekonomer 
            som skapar värde. Rätt ekonom till rätt uppdrag – interim, projekt eller rekrytering.
          </p>

          {/* CTA BUTTONS (stack on mobile) */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            
            <a
              href="/contact"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md 
                         hover:bg-blue-800 transition font-medium text-lg text-center"
            >
              Kontakta oss
            </a>

            <button
              onClick={() => setShowModal(true)}
              className="border border-blue-200 text-blue-100 bg-transparent 
                         px-6 py-3 rounded-lg hover:bg-blue-800/40 transition 
                         font-medium text-lg text-center"
            >
              Registrera dig som konsult
            </button>

          </div>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm 
                        flex items-center justify-center z-50 px-4 py-6">
          
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-4 sm:p-6 relative 
                          max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Registrera dig som konsult
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Namn"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-2"
              />

              <input
                type="email"
                name="email"
                placeholder="E-post"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-2"
              />

              <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn (valfritt)"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />

              <textarea
                name="about"
                placeholder="Kort beskrivning"
                value={formData.about}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 h-24"
              />

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                className="w-full border rounded-md px-3 py-2 cursor-pointer"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 text-white py-3 rounded-lg 
                           hover:bg-blue-800 transition font-semibold"
              >
                {loading ? "Skickar..." : "Skicka CV"}
              </button>

              {message && (
                <p className="text-center text-sm mt-2 text-gray-700">{message}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
