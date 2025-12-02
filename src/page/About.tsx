import { motion } from "framer-motion";
import heroImg from "../assets/office.webp";
import team from "../assets/image1.webp";
import arbetssatt from "../assets/arbetssätt.webp";
import { Briefcase, Users, ThumbsUp, BarChart2, Award, LineChart } from "lucide-react";

export default function About() {
  return (
    <section className="bg-white text-gray-800">

      {/* HERO BANNER */}
      <div className="relative h-[55vh] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="NorthPath Consulting"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-900/50 to-transparent"></div>

        <div className="relative max-w-6xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Om NorthPath Consulting
            </h1>
            <p className="mt-4 text-lg text-blue-100 max-w-xl">
              Vi är specialister inom ekonomi, controlling och verksamhetsutveckling 
              och hjälper företag bygga stabila, datadrivna och framgångsrika organisationer.
            </p>
          </motion.div>
        </div>
      </div>

      {/* SECTION 1 – Filosofi */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Vår filosofi
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Ekonomifunktionen är hjärtat i varje organisation. När rätt kompetens finns på plats 
            blir beslut skarpare, prognoser mer tillförlitliga och verksamheten mer lönsam.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Vår filosofi bygger på kvalitet, transparens och långsiktighet. Vi matchar företag 
            med konsulter och kandidater som inte bara har rätt teknisk kompetens utan även 
            förståelse för affären, människorna och organisationens mål.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed">
            Resultatet är samarbeten som skapar verkligt värde och bidrar till hållbar tillväxt.
          </p>
        </div>

        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={team}
          alt="Team"
          className="rounded-xl shadow-xl w-full h-[420px] object-cover"
        />
      </div>

      {/* SECTION 2 – Värderingar */
      }
      <div className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Våra kärnvärden
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-left">
            {[
              {
                icon: <ThumbsUp size={40} className="text-blue-700" />,
                title: "Engagemang",
                desc: "Vi arbetar nära både kund och konsult med genuint intresse och närvaro."
              },
              {
                icon: <Award size={40} className="text-blue-700" />,
                title: "Kvalitet & professionalism",
                desc: "Vi levererar hög standard, tydlig kommunikation och noggrant urval."
              },
              {
                icon: <Users size={40} className="text-blue-700" />,
                title: "Tillit & transparens",
                desc: "Partnerskap byggt på ärlighet, långsiktighet och gemensamma mål."
              }
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition"
              >
                <div className="mb-4">{v.icon}</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-3">
                  {v.title}
                </h3>
                <p className="text-gray-600">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 – Vår expertis */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Vår expertis
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: <BarChart2 size={40} className="text-blue-700" />,
              title: "Controlling",
              desc: "Budget, forecast, analys, KPI-uppföljning och affärsstöd."
            },
            {
              icon: <Briefcase size={40} className="text-blue-700" />,
              title: "Redovisning",
              desc: "Löpande redovisning, bokslut, rapportering och compliance."
            },
            {
              icon: <LineChart size={40} className="text-blue-700" />,
              title: "Analys & BI",
              desc: "PowerBI, datavisualisering och automatiserad rapportering."
            }
          ].map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition text-left"
            >
              <div className="mb-4">{e.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{e.title}</h3>
              <p className="text-gray-600">{e.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION 4 – Arbetssätt */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={arbetssatt}
          alt="Vårt arbetssätt"
          className="rounded-xl shadow-xl w-full h-[420px] object-cover"
        />

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Vårt arbetssätt
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Vi arbetar konsultativt, datadrivet och alltid med fokus på affären. 
            För oss är rätt matchning inte en process det är ett hantverk.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Genom noggrann behovsanalys, senior kompetens och nära uppföljning 
            säkerställer vi kvalitet i varje leverans.
          </p>

          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition"
          >
            Kontakta oss
          </a>
        </div>
      </div>

    </section>
  );
}
