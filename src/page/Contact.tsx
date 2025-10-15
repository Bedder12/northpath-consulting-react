import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Contact() {
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showCVModal, setShowCVModal] = useState(false);

  // CV form
  const [cvData, setCvData] = useState({
    name: "",
    email: "",
    linkedin: "",
    about: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploadMsg, setUploadMsg] = useState("");

  // Handle contact form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle contact submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSuccess("");
    setError("");

    try {
      const { error } = await supabase.from("contacts").insert([
        {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        },
      ]);
      if (error) throw error;

      setSuccess("Tack! Ditt meddelande har skickats.");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Ett fel uppstod. Försök igen senare.");
    } finally {
      setSending(false);
    }
  };

  // CV upload
  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setCvData({ ...cvData, [e.target.name]: e.target.value });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0] || null);

  const handleCvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setUploadMsg("Välj en fil först.");
      return;
    }
    try {
      const filePath = `cvs/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from("cvs").upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage.from("cvs").getPublicUrl(filePath);
      const fileUrl = publicUrl?.publicUrl;

      const { error: insertError } = await supabase.from("applications").insert([
        {
          name: cvData.name,
          email: cvData.email,
          linkedin: cvData.linkedin,
          about: cvData.about,
          file_url: fileUrl,
        },
      ]);
      if (insertError) throw insertError;

      setUploadMsg("CV uppladdat! Vi kontaktar dig snart.");
      setCvData({ name: "", email: "", linkedin: "", about: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      setUploadMsg("Fel vid uppladdning. Försök igen.");
    }
  };

  return (
    <section className="bg-white text-gray-800 py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        {/* Left info */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Låt oss ta första steget tillsammans
          </h2>
          <p className="text-gray-600 mb-6">
            Fyll i formuläret så kontaktar vi dig inom kort – eller skicka in din ansökan direkt.
          </p>

          <div className="space-y-2 mb-8">
            <p>
              <strong>Telefon:</strong>{" "}
              <a href="tel:+46701234567" className="text-blue-600 hover:underline">
                +46 (0)70 123 45 67
              </a>
            </p>
            <p>
              <strong>E-post:</strong>{" "}
              <a href="mailto:info@northpath.se" className="text-blue-600 hover:underline">
                info@northpath.se
              </a>
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/company/northpath"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Följ oss på LinkedIn
              </a>
            </p>
          </div>

          <button
            onClick={() => setShowCVModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition"
          >
            Skicka din ansökan
          </button>
        </div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="bg-blue-950 text-white rounded-xl p-8 shadow-xl space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Förnamn*"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 rounded-md text-gray-900 w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="E-post*"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 rounded-md text-gray-900 w-full"
            />
          </div>
          <input
            type="text"
            name="company"
            placeholder="Företag"
            value={formData.company}
            onChange={handleChange}
            className="p-3 rounded-md text-gray-900 w-full"
          />
          <textarea
            name="message"
            placeholder="Meddelande"
            value={formData.message}
            onChange={handleChange}
            className="p-3 rounded-md text-gray-900 w-full h-28"
            required
          ></textarea>
          <button
            type="submit"
            disabled={sending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition w-full"
          >
            {sending ? "Skickar..." : "Skicka meddelande"}
          </button>

          {success && <p className="text-green-400 mt-3">{success}</p>}
          {error && <p className="text-red-400 mt-3">{error}</p>}
        </form>
      </div>

      {/* ✅ CV-popup */}
      {showCVModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in">
            <button
              onClick={() => setShowCVModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Skicka in din ansökan
            </h3>
            <form onSubmit={handleCvSubmit} className="text-left space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Namn"
                value={cvData.name}
                onChange={handleCvChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="email"
                name="email"
                placeholder="E-post"
                value={cvData.email}
                onChange={handleCvChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn (valfritt)"
                value={cvData.linkedin}
                onChange={handleCvChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <textarea
                name="about"
                placeholder="Berätta kort om dig själv"
                value={cvData.about}
                onChange={handleCvChange}
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
                className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
              >
                Skicka CV
              </button>
              {uploadMsg && (
                <p className="mt-2 text-sm text-gray-700 text-center">{uploadMsg}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
