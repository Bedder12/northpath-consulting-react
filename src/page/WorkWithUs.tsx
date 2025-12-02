import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import { checkRateLimit } from "../utils/rateLimit";
import { Users, Briefcase, Target, Star, MessageCircle, LineChart, BarChart2 } from "lucide-react";
import heroVideo from "../assets/watercomplete.mp4";

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

      {/* HERO VIDEO */}
      <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-900/50 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Jobba som ekonomikonsult
            </h1>

            <p className="mt-4 text-blue-100 text-base sm:text-lg max-w-xl">
              Exklusiva uppdrag inom controlling, redovisning, finans och BI med trygghet, utveckling och
              personlig rådgivning i centrum.
            </p>

            <button
              onClick={() => setShowCVModal(true)}
              className="mt-6 bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-fit"
            >
              Skicka ditt CV
            </button>
          </motion.div>
        </div>
      </div>

      {/* WHY NORTHPATH */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Varför välja NorthPath?</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          Vi är specialiserade på kvalificerad ekonomikompetens. Hos oss får du inte bara ett uppdrag du får
          en långsiktig partner som förstår din karriärresa inom finance.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Users size={40} className="text-blue-700" />,
              title: "Ekonomer som stöttar ekonomer",
              desc: "Du matchas av konsulter med branscherfarenhet inte generella rekryterare."
            },
            {
              icon: <Briefcase size={40} className="text-blue-700" />,
              title: "Kvalificerade uppdrag",
              desc: "Controller, redovisning, FP&A, BI roller där du gör verklig skillnad."
            },
            {
              icon: <Target size={40} className="text-blue-700" />,
              title: "Snabb, träffsäker matchning",
              desc: "Vi lär känna både dig och rollen så du hamnar rätt direkt."
            }
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

      {/* COMPETENCE AREAS */}
      <div className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Kompetensområden vi söker</h2>

          <div className="grid md:grid-cols-3 gap-8 text-left">

            {/* FINANCE */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Ekonomi & Finans</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Business Controller</li>
                <li>• Financial Controller</li>
                <li>• Redovisningsekonom</li>
                <li>• Ekonomiansvarig</li>
                <li>• Lön / Payroll</li>
              </ul>
            </motion.div>

            {/* ANALYTICS */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Analys & BI</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• BI Analyst</li>
                <li>• PowerBI / Excel specialists</li>
                <li>• Finansiell analys</li>
                <li>• Budget & Forecasting</li>
                <li>• KPI/Performance-analys</li>
              </ul>
            </motion.div>

            {/* LEADERSHIP */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Ledarskap & utveckling</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Teamlead ekonomi</li>
                <li>• CFO-support</li>
                <li>• Interim ekonomichef</li>
                <li>• Processutveckling</li>
                <li>• Modernisering av ekonomifunktioner</li>
              </ul>
            </motion.div>

          </div>
        </div>
      </div>

      {/* BENEFITS */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-8">Vad du får som konsult hos oss</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            "Trygga uppdrag på välrenommerade bolag",
            "Konkurrenskraftig ersättning",
            "Personlig konsultchef med ekonomi-bakgrund",
            "Stöd inför månadsbokslut & budgetprocesser",
            "Utvecklingsplan mot senior eller specialist",
            "Möjlighet till fast roll hos kund"
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
          <h2 className="text-3xl font-bold mb-12">Vad våra konsulter säger</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                quote:
                  "Jag matchades direkt med ett Business Controller-uppdrag där jag fick fullt stöd från NorthPath inför första månadsbokslutet.",
                name: "Sara – Business Controller",
              },
              {
                quote:
                  "NorthPath gav mig möjligheten att kliva in som interim-ekonomichef i ett bolag i stark tillväxt. Professionellt och personligt.",
                name: "Adam – Interim Ekonomichef",
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
            "Kompetenskartläggning & matchning",
            "Intervju hos kund",
            "Uppstart med onboarding & stöd"
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

      {/* CTA */}
      <div className="py-20 text-center bg-blue-950 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ta nästa steg i din ekonomi-karriär
        </h2>
        <p className="text-blue-200 mb-8">
          Skicka in ditt CV eller boka ett samtal så hjälper vi dig vidare mot ditt nästa uppdrag.
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
