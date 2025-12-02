import { motion } from "framer-motion";
import heroImg from "../assets/teammeating.webp";
import { 
  Briefcase, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Award, 
  BarChart2, 
  LineChart 
} from "lucide-react";

export default function ForCompanies() {
  return (
    <section className="bg-white text-gray-900">

      {/* HERO */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="NorthPath Consulting"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-900/50 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Rätt ekonomisk kompetens när ni behöver den.
            </h1>

            <p className="mt-4 text-blue-100 text-lg max-w-xl">
              Interimslösningar, rekrytering och verksamhetsstöd inom controlling, redovisning 
              och finansiell analys , snabbt, tryggt och med hög precision.
            </p>

            <a
              href="/contact"
              className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Boka ett möte
            </a>
          </motion.div>
        </div>
      </div>

      {/* SOCIAL PROOF */}
      <div className="py-14 text-center bg-white">
        <h2 className="text-gray-600 uppercase tracking-widest text-sm mb-6">
          Anlitade av växande bolag i hela Sverige
        </h2>

        {/* Placeholder logos */}
        <div className="flex justify-center gap-12 opacity-70">
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968885.png" className="h-12" />
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" className="h-12" />
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968983.png" className="h-12" />
        </div>
      </div>

      {/* SERVICES */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Våra tjänster
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
          Kvalificerade ekonomikonsulter och rekrytering för bolag i förändring från snabbväxande scale-ups 
          till etablerade företag med behov av förstärkning i sina ekonomiteam.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Users size={40} className="text-blue-700" />,
              title: "Interim & konsultuthyrning",
              desc: "Controller, redovisning, CFO-support, ekonomiassistent, BI-analys redo att kliva in snabbt."
            },
            {
              icon: <Briefcase size={40} className="text-blue-700" />,
              title: "Rekrytering inom ekonomi",
              desc: "Vi rekryterar specialister och ledare inom finance verifierad kompetens, hög kvalitet."
            },
            {
              icon: <TrendingUp size={40} className="text-blue-700" />,
              title: "Verksamhetsutveckling & modernisering",
              desc: "Stöd i budgetprocess, forecast, BI, automatisering och utveckling av ekonomifunktionen."
            },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="p-8 bg-white shadow rounded-xl hover:shadow-lg transition"
            >
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mt-4 mb-3 text-center">{service.title}</h3>
              <p className="text-gray-600 text-center">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ROLE EXAMPLES (NEW & IMPORTANT FOR CREDIBILITY) */}
      <div className="bg-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-10">Roller vi levererar</h2>

          <div className="grid md:grid-cols-3 gap-10 text-center">

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <BarChart2 className="text-blue-700 mx-auto mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">Controlling</h3>
              <p className="text-gray-600">Business Controller, FP&A, KPI-/analysstöd, budget & forecast.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <Award className="text-blue-700 mx-auto mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">Redovisning</h3>
              <p className="text-gray-600">Redovisningsekonom, ekonomiansvarig, bokslut, K3/IFRS, payroll.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <LineChart className="text-blue-700 mx-auto mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">Analys & BI</h3>
              <p className="text-gray-600">PowerBI, Excel-specialister, datadriven rapportering & automatisering.</p>
            </div>

          </div>
        </div>
      </div>

      {/* WHY NORTHPATH – NOW PREMIUM & CREDIBLE */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Varför företag väljer NorthPath
          </h2>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              {
                icon: <CheckCircle size={40} className="text-blue-700" />,
                title: "Snabb leverans",
                desc: "Verifierade kandidater inom 48–72 timmar redo för intervju."
              },
              {
                icon: <Award size={40} className="text-blue-700" />,
                title: "Specialiserade på ekonomi",
                desc: "Vi arbetar enbart med roller inom finance inget generiskt urval."
              },
              {
                icon: <Users size={40} className="text-blue-700" />,
                title: "Personlig konsultchef",
                desc: "En dedikerad kontakt som förstår system, verktyg och processer."
              },
              {
                icon: <TrendingUp size={40} className="text-blue-700" />,
                title: "Resultatfokus",
                desc: "Matchning baserad på kompetens, personlighet och branschens krav."
              },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-blue-50 p-8 rounded-xl shadow text-center border border-blue-100"
              >
                <div className="flex justify-center">{b.icon}</div>
                <h3 className="text-xl font-semibold mt-4 mb-3">{b.title}</h3>
                <p className="text-gray-700">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Vår process
        </h2>

        <div className="grid md:grid-cols-4 gap-10 text-center">
          {[
            "Behovsanalys system, nivå, tid & bransch",
            "Verifierad kandidatpresentation",
            "Intervju & kvalitetssäkring",
            "Onboarding, uppföljning & resultat"
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="p-8 bg-white shadow-lg rounded-xl"
            >
              <div className="text-4xl font-bold text-blue-700 mb-3">
                {i + 1}
              </div>
              <p className="text-gray-700">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-950 py-20 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stärk ert ekonomiteam med rätt kompetens.
        </h2>
        <p className="text-blue-200 mb-8">
          Kontakta oss vi presenterar kandidater inom 48–72 timmar.
        </p>

        <a
          href="/contact"
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold transition"
        >
          Boka möte
        </a>
      </div>

    </section>
  );
}
