import { useState } from "react";
import { supabase } from "../supabaseClient";
import heroFallback from "../assets/office.webp"; // byt till mer finance/corporate bild

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
    <section className="relative h-[80vh] w-full overflow-hidden">

      {/* STILLBILD UNDER VIDEON */}
      <img
        src={heroFallback}
        alt="North Path Consulting"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* VIDEO (byt gärna till finance/corporate video) */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/video/office.mp4" type="video/mp4" />
      </video>

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-900/50 to-transparent"></div>

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center md:items-start items-center">

        {/* TEXT - ENLIGT KUNDENS COPY */}
        <div className="max-w-2xl text-center md:text-left text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Vi stärker företag<br />
            <span className="text-blue-300">med rätt ekonomisk kompetens.</span>
          </h1>

          <p className="mt-6 text-lg text-blue-100 leading-relaxed">
            På North Path Consulting erbjuder vi kvalificerade och välrenommerade ekonomer 
            som skapar värde. Rätt ekonom till rätt uppdrag – interim, projekt eller rekrytering.
          </p>

          {/* CTA FÖR FÖRETAG */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="bg-blue-700 text-white px-8 py-4 rounded-lg shadow-md hover:bg-blue-800 transition font-medium text-lg"
            >
              Kontakta oss
            </a>

            {/* CV-FUNKTION FÖR KONSULTER – men sekundärt */}
            <button
              onClick={() => setShowModal(true)}
              className="border border-blue-200 text-blue-100 bg-transparent px-8 py-4 rounded-lg hover:bg-blue-800/40 transition font-medium text-lg"
            >
              Registrera dig som konsult
            </button>
          </div>
        </div>
      </div>

      {/* CV MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Registrera dig som konsult
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Namn" value={formData.name} onChange={handleChange} required className="w-full border rounded-md px-3 py-2" />

              <input type="email" name="email" placeholder="E-post" value={formData.email} onChange={handleChange} required className="w-full border rounded-md px-3 py-2" />

              <input type="url" name="linkedin" placeholder="LinkedIn (valfritt)" value={formData.linkedin} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />

              <textarea name="about" placeholder="Kort beskrivning" value={formData.about} onChange={handleChange} className="w-full border rounded-md px-3 py-2 h-24"></textarea>

              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required className="w-full border rounded-md px-3 py-2 cursor-pointer" />

              <button type="submit" disabled={loading} className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold">
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
