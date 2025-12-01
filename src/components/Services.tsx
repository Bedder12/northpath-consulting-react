import { motion } from "framer-motion";
import heroImg from "../assets/office.webp";
import { 
  Briefcase, 
  Users, 
  BrainCircuit, 
  FileCheck, 
  ChartBar, 
  Shield 
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

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/40 to-transparent"></div>

        {/* Text */}
        <div className="relative max-w-6xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Tjänster & Kompetenser
            </h1>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl">
              Vi hjälper företag växa med skräddarsydd konsultuthyrning, rekrytering och expertis inom IT, ekonomi och verksamhetsutveckling.
            </p>
          </motion.div>
        </div>
      </div>

      {/* SERVICE CARDS */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Våra kärnområden
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Briefcase size={42} className="text-blue-700" />,
              title: "Konsultuthyrning",
              desc: "Flexibla lösningar där du hyr in rätt kompetens när du behöver den – utan risker eller långa bindningstider."
            },
            {
              icon: <Users size={42} className="text-blue-700" />,
              title: "Rekrytering",
              desc: "Vi hittar kandidater som inte bara passar rollen – utan också kulturen och det långsiktiga målet."
            },
            {
              icon: <BrainCircuit size={42} className="text-blue-700" />,
              title: "IT & Digitalisering",
              desc: "Utveckling, systemstöd, arkitektur och teknisk rådgivning för att accelerera er digitala resa."
            },
            {
              icon: <ChartBar size={42} className="text-blue-700" />,
              title: "Ekonomi & Controlling",
              desc: "Från löpande bokföring till controlling, affärsanalys och interim-specialister."
            },
            {
              icon: <Shield size={42} className="text-blue-700" />,
              title: "Verksamhetsutveckling",
              desc: "Effektivisering, strategiutveckling och förbättringsarbete som skapar resultat."
            },
            {
              icon: <FileCheck size={42} className="text-blue-700" />,
              title: "Projektledning",
              desc: "Trygga projektledare som driver projekt framåt och säkerställer kvalitet hela vägen."
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

      {/* PROCESS SECTION */}
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
                desc: "Vi tar reda på vad ni verkligen behöver – kompetens, tid, nivå och målsättning."
              },
              {
                step: "2",
                title: "Matchning & urval",
                desc: "Vi presenterar kandidater eller konsulter som är skräddarsydda för uppdraget."
              },
              {
                step: "3",
                title: "Leverans & partnerskap",
                desc: "När samarbetet startar följer vi upp, stöttar och ser till att målen uppnås."
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

      {/* CTA SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Behöver du stärka ditt team?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Oavsett om du vill hyra in konsulter snabbt eller planera en långsiktig rekrytering,
          finns vi här för att hjälpa dig.
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
