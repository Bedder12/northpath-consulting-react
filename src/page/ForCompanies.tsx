import { motion } from "framer-motion";
import heroImg from "../assets/teammeating.webp";
import {
  Briefcase,
  CheckCircle,
  Users,
  TrendingUp,
  Award,
  BarChart2,
  LineChart,
} from "lucide-react";

export default function ForCompanies() {
  return (
    <section className="bg-white text-gray-900">

      {/* HERO */}
      <div className="relative h-[60vh] sm:h-[70vh] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="NorthPath Consulting"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-900/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-center sm:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Rätt ekonomisk kompetens<br />när ni behöver den.
            </h1>

            <p className="mt-4 text-blue-100 text-base sm:text-lg max-w-lg">
              Interimslösningar, rekrytering och verksamhetsstöd inom controlling,
              redovisning och finansiell analys – snabbt, tryggt och med hög precision.
            </p>

            <a
              href="/contact"
              className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white 
              px-6 py-3 rounded-lg font-semibold transition"
            >
              Boka ett möte
            </a>
          </motion.div>
        </div>
      </div>

      {/* SOCIAL PROOF */}
      <div className="py-14 px-4 text-center bg-white">
        <h2 className="text-gray-600 uppercase tracking-widest text-xs sm:text-sm mb-6">
          Anlitade av växande bolag i hela Sverige
        </h2>

        <div className="flex justify-center gap-8 sm:gap-12 opacity-70 flex-wrap">
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968885.png" className="h-10 sm:h-12" />
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" className="h-10 sm:h-12" />
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968983.png" className="h-10 sm:h-12" />
        </div>
      </div>

      {/* SERVICES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3">
          Våra tjänster
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-sm sm:text-base">
          Ekonomikonsulter & rekrytering för bolag i tillväxt – från scale-ups till
          etablerade företag som behöver förstärka sina ekonomiteam.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          {[
            {
              icon: <Users size={40} className="text-blue-700" />,
              title: "Interim & konsultuthyrning",
              desc: "Controller, redovisning, CFO-support, ekonomiassistent, BI-analys redo snabbt.",
            },
            {
              icon: <Briefcase size={40} className="text-blue-700" />,
              title: "Rekrytering inom ekonomi",
              desc: "Vi rekryterar specialister och ledare inom finance – verifierad kompetens.",
            },
            {
              icon: <TrendingUp size={40} className="text-blue-700" />,
              title: "Verksamhetsutveckling",
              desc: "Budgetprocess, forecast, BI, automatisering och utveckling av ekonomifunktionen.",
            },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="p-6 sm:p-8 bg-white shadow rounded-xl hover:shadow-lg transition"
            >
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-3 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center text-sm sm:text-base">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ROLES */}
      <div className="bg-blue-50 py-16 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-10">
            Roller vi levererar
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 text-center">
            {[
              {
                icon: <BarChart2 size={40} className="text-blue-700 mx-auto" />,
                title: "Controlling",
                desc: "Business Controller, FP&A, KPI-/analysstöd, budget & forecast.",
              },
              {
                icon: <Award size={40} className="text-blue-700 mx-auto" />,
                title: "Redovisning",
                desc: "Redovisningsekonom, ekonomiansvarig, bokslut, K3/IFRS, payroll.",
              },
              {
                icon: <LineChart size={40} className="text-blue-700 mx-auto" />,
                title: "Analys & BI",
                desc: "PowerBI, Excel-specialister, datadriven automatisering & rapportering.",
              },
            ].map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-6 sm:p-8 rounded-xl shadow hover:shadow-lg transition"
              >
                <div>{role.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mt-3 mb-3">
                  {role.title}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base">{role.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY NORTHPATH */}
      <div className="bg-white py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
            Varför företag väljer NorthPath
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
            {[
              {
                icon: <CheckCircle size={40} className="text-blue-700 mx-auto" />,
                title: "Snabb leverans",
                desc: "Verifierade kandidater inom 48–72 timmar.",
              },
              {
                icon: <Award size={40} className="text-blue-700 mx-auto" />,
                title: "Specialiserade",
                desc: "Vi arbetar enbart med finance–roller, inget generiskt urval.",
              },
              {
                icon: <Users size={40} className="text-blue-700 mx-auto" />,
                title: "Personlig konsultchef",
                desc: "Dedikerad kontakt som förstår verktyg och processer.",
              },
              {
                icon: <TrendingUp size={40} className="text-blue-700 mx-auto" />,
                title: "Resultatfokus",
                desc: "Matchning baserad på kompetens, personlighet & krav.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-blue-50 p-6 sm:p-8 rounded-xl shadow text-center border border-blue-100"
              >
                <div>{item.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mt-3 mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm sm:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
          Vår process
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-center">
          {[
            "Behovsanalys – system, nivå, tid & bransch",
            "Verifierad kandidatpresentation",
            "Intervju & kvalitetssäkring",
            "Onboarding, uppföljning & resultat",
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="p-6 sm:p-8 bg-white shadow-lg rounded-xl"
            >
              <div className="text-3xl sm:text-4xl font-bold text-blue-700 mb-3">
                {i + 1}
              </div>
              <p className="text-gray-700 text-sm sm:text-base">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-950 py-16 sm:py-20 text-center text-white px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Stärk ert ekonomiteam med rätt kompetens.
        </h2>
        <p className="text-blue-200 text-sm sm:text-base mb-8">
          Vi presenterar kandidater inom 48–72 timmar.
        </p>

        <a
          href="/contact"
          className="bg-blue-600 hover:bg-blue-700 text-white 
          px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold transition"
        >
          Boka möte
        </a>
      </div>

    </section>
  );
}
