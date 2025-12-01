import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Users, Briefcase, Target } from "lucide-react";
import heroImg from "../assets/office.webp";

export default function Services() {

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const services = [
    {
      title: "Långsiktiga uppdrag (Interim)",
      desc: "För företag som behöver en stabil resurs under en längre period. Våra konsulter bidrar med trygghet, kvalité och kontinuitet.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=60",
    },
    {
      title: "Kortare uppdrag (Projekt & specialiststöd)",
      desc: "När ni behöver spetskompetens för en tydligt avgränsad utmaning. Våra specialister levererar resultat snabbt.",
      image:
        "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=900&q=60",
    },
    {
      title: "Rekrytering / Direktmatchning",
      desc: "Vi hjälper företag hitta sin nästa toppkandidat — och ekonomer att hitta en arbetsplats där de trivs och utvecklas långsiktigt.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <section className="bg-white text-gray-800">

      {/* HERO BANNER */}
      <div className="relative h-[45vh] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/40 to-transparent"></div>

        <div className="relative max-w-6xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
              Våra tjänster
            </h1>
            <p className="mt-4 text-lg text-blue-100 max-w-xl">
              Flexibla och moderna konsultlösningar inom IT, ekonomi och verksamhetsutveckling.
            </p>
          </motion.div>
        </div>
      </div>

      {/* VALUE ICON SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Vad vi erbjuder
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Users size={40} className="text-blue-700" />,
              title: "Handplockade konsulter",
              desc: "Endast seniora, pålitliga och erfarna profiler som kan leverera direkt."
            },
            {
              icon: <Briefcase size={40} className="text-blue-700" />,
              title: "Flexibla lösningar",
              desc: "Interim, projekt eller direktrekrytering — vi löser ert behov."
            },
            {
              icon: <Target size={40} className="text-blue-700" />,
              title: "Träffsäker matchning",
              desc: "Vi fokuserar både på kompetens och kulturpassform för långsiktighet."
            },
          ].map((box, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              className="bg-white shadow-md hover:shadow-xl transition p-8 rounded-xl text-center"
            >
              <div className="flex justify-center mb-4">{box.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{box.title}</h3>
              <p className="text-gray-600">{box.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SERVICE CARDS */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`grid md:grid-cols-2 gap-10 items-center ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className={`${index % 2 === 1 ? "md:order-2" : "md:order-1"}`}>
              <img
                src={service.image}
                alt={service.title}
                className="rounded-xl shadow-xl w-full h-[420px] object-cover"
              />
            </div>

            <div className={`${index % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{service.desc}</p>

              <Link
                to="/contact"
                className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-800 transition font-medium"
              >
                Kontakta oss
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA SECTION */}
      <div className="bg-blue-950 py-20 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Rätt kompetens — direkt när ni behöver den
        </h2>

        <p className="max-w-2xl mx-auto text-blue-200 mb-8">
          Oavsett om det gäller interim, projekt eller rekrytering skapar vi trygghet,
          kvalitet och resultat från dag ett.
        </p>

        <Link
          to="/contact"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition"
        >
          Boka ett möte
        </Link>
      </div>

    </section>
  );
}
