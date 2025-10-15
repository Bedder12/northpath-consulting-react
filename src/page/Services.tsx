import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Långsiktiga uppdrag (Interim)",
      desc: "För företag som behöver en stabil resurs under en längre period. Våra konsulter bidrar kontinuerligt med kompetens och trygghet, vilket skapar stabilitet och tid för utveckling.",
      image:
       "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=60" , // affärssamarbete
    },
    {
      title: "Kortare uppdrag (Projekt & specialiststöd)",
      desc: "När det behövs spetskompetens för en specifik utmaning eller ett tydligt avgränsat projekt. Våra konsulter kan snabbt sätta sig in i situationen och driva arbetet i mål.",
      image:
         "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=900&q=60", // projektteam
    },
    {
      title: "Rekrytering / Direktmatchning",
      desc: "För företag som söker rätt ekonom att anställa permanent – och för ekonomer som söker rätt företag. Vi ser till att matchningen blir hållbar över tid, där kompetens och kultur passar perfekt ihop.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60", // intervju / rekrytering
    },
  ];

  return (
    <section className="bg-white text-gray-800">
      {/* Hero */}
      <div className="bg-gradient-to-tr from-sky-100 to-green-50 py-20 md:py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4"
        >
          Våra tjänster
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Flexibla lösningar som säkerställer att ni alltid har rätt kompetens på rätt plats – i rätt tid.
        </motion.p>
      </div>

      {/* Service cards */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`grid md:grid-cols-2 gap-10 items-center ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div
              className={`${
                index % 2 === 1 ? "md:order-2" : "md:order-1"
              }`}
            >
              <img
                src={service.image}
                alt={service.title}
                className="rounded-xl shadow-lg w-full h-[400px] object-cover"
              />
            </div>

            <div
              className={`${
                index % 2 === 1 ? "md:order-1" : "md:order-2"
              } text-left`}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {service.title}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {service.desc}
              </p>
              <Link
                to="/contact"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
              >
                Kontakta oss
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-blue-950 py-20 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Rätt kompetens när ni behöver den
        </h2>
        <p className="max-w-2xl mx-auto text-gray-300 mb-8">
          Oavsett om det handlar om ett kort projekt, ett interimuppdrag eller
          en permanent rekrytering hjälper vi er att hitta lösningen som passar bäst.
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
