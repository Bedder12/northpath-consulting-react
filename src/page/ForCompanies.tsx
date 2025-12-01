import { motion } from "framer-motion";
import heroImg from "../assets/teammeating.webp";
import { Briefcase, CheckCircle, Users, TrendingUp, Award, PhoneCall } from "lucide-react";

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

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/40 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Stärk ert team med rätt kompetens.
            </h1>

            <p className="mt-4 text-blue-100 text-lg max-w-xl">
              Vi hjälper företag att hitta seniora konsulter och skräddarsydda lösningar
              inom IT, ekonomi och verksamhetsutveckling — snabbt, tryggt och effektivt.
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
      <div className="py-14 bg-white text-center">
        <h2 className="text-gray-600 uppercase tracking-widest text-sm mb-6">
          Förtroende från företag i hela Sverige
        </h2>

   {/* Placeholder loggor – byt ut mot riktiga när du har */}
       {/* Placeholder loggor – snyggare variant */}
<div className="flex justify-center gap-12 opacity-70">
  <img
    src="https://cdn-icons-png.flaticon.com/512/5968/5968885.png"
    alt="Logo 1"
    className="h-12 w-auto object-contain"
  />
  <img
    src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
    alt="Logo 2"
    className="h-12 w-auto object-contain"
  />
  <img
    src="https://cdn-icons-png.flaticon.com/512/5968/5968983.png"
    alt="Logo 3"
    className="h-12 w-auto object-contain"
  />
</div>
      </div>

      {/* SERVICES */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Våra tjänster
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
          Flexibla och moderna lösningar för företag som behöver förstärka sin organisation —
          oavsett om det gäller korta uppdrag, långsiktiga behov eller strategiska roller.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Users size={40} className="text-blue-700" />,
              title: "Konsultuthyrning",
              desc: "Hitta rätt kompetens snabbt — seniora konsulter inom IT, ekonomi och projektledning."
            },
            {
              icon: <Briefcase size={40} className="text-blue-700" />,
              title: "Rekrytering",
              desc: "Vi hjälper er rekrytera rätt — kvalitetssäkrad process och kandidatgaranti."
            },
            {
              icon: <TrendingUp size={40} className="text-blue-700" />,
              title: "Verksamhetsutveckling",
              desc: "Stöd i förändringsarbete, processkartläggning och ledarskap."
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

      {/* WHY US */}
      <div className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Varför NorthPath?
          </h2>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              {
                icon: <CheckCircle size={40} className="text-blue-700" />,
                title: "Snabb leverans",
                desc: "Vi presenterar kandidater inom 3–5 dagar."
              },
              {
                icon: <Award size={40} className="text-blue-700" />,
                title: "Senior expertis",
                desc: "Våra konsulter har erfarenhet från ledande bolag."
              },
              {
                icon: <Users size={40} className="text-blue-700" />,
                title: "Personlig kontakt",
                desc: "Ni får en dedikerad kontaktperson som följer hela processen."
              },
              {
                icon: <TrendingUp size={40} className="text-blue-700" />,
                title: "Resultatfokus",
                desc: "Vi matchar både kompetens och kultur."
              },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 rounded-xl shadow text-center"
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
          Så fungerar processen
        </h2>

        <div className="grid md:grid-cols-4 gap-10 text-center">
          {[
            "Behovsanalys",
            "Kandidatpresentation",
            "Intervju & urval",
            "Start av uppdrag",
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
          Redo att stärka ert team?
        </h2>
        <p className="text-blue-200 mb-8">
          Kontakta oss — vi hjälper er hitta rätt kompetens.
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
