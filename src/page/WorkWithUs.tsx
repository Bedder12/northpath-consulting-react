import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import { checkRateLimit } from "../utils/rateLimit";
import { Briefcase, Users, Target, ArrowRight, Star, MessageCircle } from "lucide-react";
import heroImg from "../assets/office.webp";

export default function WorkWithUs() {

  const [showCVModal, setShowCVModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

  const [cvData, setCvData] = useState({
    name: "",
    email: "",
    linkedin: "",
    about: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleCvChange = (e: any) =>
    setCvData({ ...cvData, [e.target.name]: e.target.value });

  const handleFileChange = (e: any) =>
    setFile(e.target.files?.[0] || null);

  const handleCvSubmit = async (e: any) => {
    e.preventDefault();
    setUploadMsg("");

    if (!file) {
      setUploadMsg("Välj en fil innan du skickar.");
      return;
    }

    const rate = await checkRateLimit();
    if (!rate.allowed) {
      setUploadMsg("För många försök. Försök igen om 1 timme.");
      return;
    }

    try {
      setLoading(true);

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

      setUploadMsg("Tack! Ditt CV har skickats.");
      setCvData({ name: "", email: "", linkedin: "", about: "" });
      setFile(null);

      setTimeout(() => setShowCVModal(false), 1500);
    } catch (err) {
      setUploadMsg("Fel vid uppladdning. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white text-gray-800">

      {/* HERO */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Work With Us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/50 to-transparent"></div>

        <div className="relative max-w-6xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white">
              Jobba med oss
            </h1>
            <p className="mt-4 text-blue-100 text-lg max-w-xl">
              Bli en del av NorthPath – och ta nästa steg i din karriär inom IT, ekonomi och verksamhetsutveckling.
            </p>

            <button
              onClick={() => setShowCVModal(true)}
              className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Skicka ditt CV
            </button>
          </motion.div>
        </div>
      </div>

      {/* WHY JOIN US */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Varför NorthPath?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Vi erbjuder trygghet, utveckling och möjligheten att arbeta på Sveriges mest spännande företag.
          Oavsett om du söker längre uppdrag, projekt eller en fast tjänst – matchar vi dig med rätt roll.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {[ 
            { icon: <Users size={40} className="text-blue-700" />, title: "Personlig kontakt", desc: "En dedikerad konsultchef som följer dig hela vägen." },
            { icon: <Briefcase size={40} className="text-blue-700" />, title: "Trygga uppdrag", desc: "Långsiktiga roller inom etablerade bolag." },
            { icon: <Target size={40} className="text-blue-700" />, title: "Rätt matchning", desc: "Vi fokuserar på både kompetens och kulturpassform." },
          ].map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="p-8 bg-white shadow rounded-xl hover:shadow-lg transition"
            >
              <div className="flex justify-center">{b.icon}</div>
              <h3 className="text-xl font-semibold mt-4 mb-3">{b.title}</h3>
              <p className="text-gray-600">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AREAS WE HIRE FOR */}
      <div className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Kompetensområden</h2>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "IT & Tech",
                list: ["Fullstack", "Backend", "DevOps", "Cloud", "Data & BI"]
              },
              {
                title: "Ekonomi & finans",
                list: ["Redovisning", "Controller", "Lön", "Ekonomiansvar"]
              },
              {
                title: "Verksamhetsutveckling",
                list: ["Projektledning", "Processutveckling", "Agil coachning"]
              },
            ].map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-sm"
              >
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">{cat.title}</h3>
                <ul className="text-gray-700 space-y-2">
                  {cat.list.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* BENEFITS */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-8">Fördelar med att vara konsult hos oss</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            "Trygga uppdrag hos stora företag",
            "Flexibilitet och möjlighet till distansarbete",
            "Konkurrenskraftig ersättning",
            "Stark konsultgemenskap",
            "Kompetensutveckling",
            "Möjlighet till fast anställning hos kund",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-6 bg-blue-950 text-white rounded-xl shadow"
            >
              <Star className="mx-auto mb-3 text-blue-300" size={30} />
              <p className="text-blue-100">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="bg-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Vad konsulter säger</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                quote:
                  "NorthPath gav mig möjligheten att växa snabbt och ta större ansvar i min roll som controller.",
                name: "Sara – Ekonomikonsult",
              },
              {
                quote:
                  "Professionellt, tryggt och flexibelt. Jag har alltid känt mig stöttad.",
                name: "Adam – IT-konsult",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-xl shadow text-left"
              >
                <MessageCircle className="text-blue-600 mb-4" size={32} />
                <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
                <p className="text-gray-900 font-semibold">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">Så fungerar processen</h2>

        <div className="grid md:grid-cols-4 gap-10 text-center">
          {[
            "Skicka CV",
            "Matchning & screening",
            "Intervju",
            "Starta uppdrag",
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="p-6 bg-white shadow rounded-xl"
            >
              <div className="text-4xl font-extrabold text-blue-700 mb-3">
                {i + 1}
              </div>
              <p className="text-gray-700">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Vanliga frågor
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Behöver jag erfarenhet?",
                a: "Vi matchar både juniora och seniora profiler med rätt uppdrag.",
              },
              {
                q: "Hur ofta får jag återkoppling?",
                a: "Vi återkommer vanligtvis inom 24 timmar.",
              },
              {
                q: "Hur fungerar anställningen?",
                a: "Du kan vara anställd hos NorthPath eller direkt hos kund, beroende på uppdrag.",
              },
              {
                q: "Kan jag jobba på distans?",
                a: "Många uppdrag erbjuder hybrid- eller distansmöjligheter.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {f.q}
                </h3>
                <p className="text-gray-700">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 text-center bg-blue-950 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Är du redo att ta nästa steg i din karriär?
        </h2>
        <p className="text-blue-200 mb-8">
          Skicka in ditt CV eller boka ett samtal — så hjälper vi dig vidare.
        </p>

        <button
          onClick={() => setShowCVModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold transition"
        >
          Skicka CV
        </button>
      </div>

      {/* CV MODAL */}
      {showCVModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowCVModal(false)}
              className="absolute top-3 right-3 text-gray-500 text-xl"
            >
              ×
            </button>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Skicka in ditt CV
            </h3>

            <form onSubmit={handleCvSubmit} className="space-y-4 text-left">

              <input
                type="text"
                name="name"
                placeholder="Namn"
                value={cvData.name}
                onChange={handleCvChange}
                required
                className="w-full border rounded-md px-3 py-2"
              />

              <input
                type="email"
                name="email"
                placeholder="E-post"
                value={cvData.email}
                onChange={handleCvChange}
                required
                className="w-full border rounded-md px-3 py-2"
              />

              <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn (valfritt)"
                value={cvData.linkedin}
                onChange={handleCvChange}
                className="w-full border rounded-md px-3 py-2"
              />

              <textarea
                name="about"
                placeholder="Berätta kort om dig själv"
                value={cvData.about}
                onChange={handleCvChange}
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
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                {loading ? "Skickar..." : "Skicka CV"}
              </button>

              {uploadMsg && (
                <p className="mt-2 text-center text-gray-700">{uploadMsg}</p>
              )}
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
