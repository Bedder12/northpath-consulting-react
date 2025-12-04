import { useState } from "react";
import { supabase } from "../supabaseClient";
import { checkRateLimit } from "../utils/rateLimit";
import { Phone, Mail, Building2, ArrowRight } from "lucide-react";

export default function Contact() {
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
  const [cvData, setCvData] = useState({
    name: "",
    email: "",
    linkedin: "",
    about: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploadMsg, setUploadMsg] = useState("");

  // --- INPUT HANDLERS ---
  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCvChange = (e: any) =>
    setCvData({ ...cvData, [e.target.name]: e.target.value });

  const handleFileChange = (e: any) =>
    setFile(e.target.files?.[0] || null);

  // --- CONTACT FORM SUBMIT ---
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSuccess("");

    // Rate limit
    const rate = await checkRateLimit();
    if (!rate.allowed) {
      setError("För många försök. Försök igen om 1 timme.");
      setSending(false);
      return;
    }

    try {
      const { error } = await supabase.from("contacts").insert([formData]);
      if (error) throw error;

      setSuccess("Tack! Vi hör av oss inom 24 timmar.");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch {
      setError("Ett fel uppstod. Försök igen senare.");
    } finally {
      setSending(false);
    }
  };

  // --- CV SUBMIT ---
  const handleCvSubmit = async (e: any) => {
    e.preventDefault();

    if (!file) {
      setUploadMsg("Välj en fil först.");
      return;
    }

    const rate = await checkRateLimit();
    if (!rate.allowed) {
      setUploadMsg("För många försök. Försök igen om 1 timme.");
      return;
    }

    try {
      const filePath = `cvs/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("cvs")
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage
        .from("cvs")
        .getPublicUrl(filePath);

      const fileUrl = publicUrl?.publicUrl;

      const { error: insertError } = await supabase
        .from("applications")
        .insert([{ ...cvData, file_url: fileUrl }]);

      if (insertError) throw insertError;

      setUploadMsg("CV uppladdat! Vi hör av oss snart.");
      setCvData({ name: "", email: "", linkedin: "", about: "" });
      setFile(null);
    } catch {
      setUploadMsg("Fel vid uppladdning. Försök igen.");
    }
  };

  return (
    <section className="bg-white min-h-screen py-16 px-4 sm:px-6">

      {/* TITLE */}
      <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Kontakta oss
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
          Oavsett om du är ett företag som söker kompetens eller en kandidat som vill växa – vi hjälper dig vidare.
        </p>
      </div>

      {/* CONTACT INFO */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        <ContactCard
          icon={<Phone size={32} className="mx-auto text-blue-700" />}
          title="Telefon"
          text="+46 (0)70 123 45 67"
        />
        <ContactCard
          icon={<Mail size={32} className="mx-auto text-blue-700" />}
          title="E-post"
          text="info@northpath.se"
        />
        <ContactCard
          icon={<Building2 size={32} className="mx-auto text-blue-700" />}
          title="Företag"
          text="Stockholm • Remote"
        />
      </div>

      {/* FORM SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* LEFT CTA */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            För företag & kandidater
          </h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Vi svarar vanligtvis inom 24 timmar. Berätta kort vad du behöver.
          </p>

          <button
            onClick={() => setShowCVModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Skicka din ansökan
            <ArrowRight size={20} />
          </button>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-blue-950 text-white rounded-xl p-6 sm:p-8 shadow-xl space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Namn*"
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

          <textarea
            name="message"
            placeholder="Berätta vad du behöver hjälp med"
            value={formData.message}
            onChange={handleChange}
            className="p-3 rounded-md text-gray-900 w-full h-28"
            required
          ></textarea>

          <button
            type="submit"
            disabled={sending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition w-full"
          >
            {sending ? "Skickar..." : "Skicka meddelande"}
          </button>

          {success && <p className="text-green-400 mt-3">{success}</p>}
          {error && <p className="text-red-400 mt-3">{error}</p>}
        </form>
      </div>

      {/* CV MODAL */}
      {showCVModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-5 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCVModal(false)}
              className="absolute top-3 right-3 text-gray-500 text-xl"
            >
              ×
            </button>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Ladda upp ditt CV
            </h3>

            <form onSubmit={handleCvSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Namn*"
                value={cvData.name}
                onChange={handleCvChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />

              <input
                type="email"
                name="email"
                placeholder="E-post*"
                value={cvData.email}
                onChange={handleCvChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />

              <textarea
                name="about"
                placeholder="Berätta kort om dig själv"
                value={cvData.about}
                onChange={handleCvChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
              ></textarea>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
              >
                Skicka CV
              </button>

              {uploadMsg && (
                <p className="text-center text-gray-700 mt-2">{uploadMsg}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

/* SMALL CARD COMPONENT */
function ContactCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-blue-50 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition">
      {icon}
      <p className="font-semibold text-gray-900 mt-3">{title}</p>
      <p className="text-gray-700 text-sm mt-1">{text}</p>
    </div>
  );
}
