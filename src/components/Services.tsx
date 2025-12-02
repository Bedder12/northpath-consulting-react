import { motion } from "framer-motion";
import heroImg from "../assets/office.webp";
import { 
  Briefcase, 
  Users, 
  LineChart 
} from "lucide-react";

export default function Services() {
  return (
    <section className="bg-white text-gray-800">

      {/* HERO BANNER */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img
          src={heroImg}
          className="absolute inset-0 w-full h-full object-cover"
          alt="NorthPath Consulting"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/40 to-transparent"></div>

        <div className="relative max-w-6xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Våra tjänster
            </h1>

            <p className="mt-4 text-lg text-blue-100 max-w-2xl">
              Vi stärker företag med rätt ekonomisk kompetens – kvalificerade och 
              välrenommerade ekonomer som skapar värde från dag ett.
            </p>
          </motion.div>
        </div>
      </div>

      {/* SERVICE CARDS — UPDATED FOR ECONOMY ONLY */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Våra kärnområden
        </h2>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
          Våra tjänster är utformade för att skapa både kortsiktigt och långsiktigt värde, 
          trygghet och tillväxt. Vi matchar er med ekonomer som har rätt kompetens, 
          erfarenhet och förståelse för er verksamhet.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Briefcase size={42} className="text-blue-700" />,
              title: "Konsultuthyrning (Interim)",
              desc: 
                "Kvalificerade och erfarna ekonomer som kan stärka er organisation snabbt – för tillfälliga, längre eller kritiska behov."
            },
            {
              icon: <Users size={42} className="text-blue-700" />,
              title: "Rekrytering",
              desc: 
                "Vi ser till att rätt ekonom hamnar på rätt plats – med kompetens, prestation och affärsförståelse som matchar era mål."
            },
            {
              icon: <LineChart size={42} className="text-blue-700" />,
              title: "Strategi & rådgivning",
              desc: 
                "Stärk den finansiella styrningen och skapa en hållbar ekonomisk strategi genom rådgivning, analys och rätt kompetens."
            }
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition border border-gray-100"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-blue-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PROCESS SECTION — UPDATED PER CUSTOMER REQUIREMENTS */}
      <div className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Så arbetar vi
          </h2>

          <div className="grid md:grid-cols-3 gap-12 text-left">
            {[
              {
                step: "1",
                title: "Behovsanalys",
                desc: 
                  "Vi börjar med att förstå ert verkliga behov – nivå, kompetens, erfarenhet och vilken typ av ekonomisk förstärkning som krävs för att skapa trygghet och stabilitet."
              },
              {
                step: "2",
                title: "Matchning & urval",
                desc: 
                  "Vi presenterar kvalificerade ekonomer med rätt kompetens och bakgrund. Våra konsulter har ofta akademiska meriter från ledande universitet och erfarenhet från finans och ekonomi."
              },
              {
                step: "3",
                title: "Leverans & partnerskap",
                desc: 
                  "När uppdraget startar följer vi upp kontinuerligt och säkerställer att rätt resultat uppnås. Vi arbetar nära både kund och konsult för ett hållbart och långsiktigt samarbete."
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition"
              >
                <div className="text-blue-700 text-4xl font-extrabold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA SECTION — UPDATED */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Behöver ni stärka er ekonomifunktion?
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Oavsett om ni behöver en interimsekonom snabbt eller planerar en långsiktig rekrytering 
          finns vi här för att hjälpa er hitta rätt ekonomisk kompetens.
        </p>

        <a
          href="/contact"
          className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-lg shadow-md text-lg font-semibold transition"
        >
          Kontakta oss
        </a>
      </div>

    </section>
  );
}
