import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const cards = [
    {
      title: "Rätt kompetens vid rätt tidpunkt",
      desc: "Våra konsulter är noggrant utvalda för att matcha just era behov – både strategiskt och operativt.",
      icon: "👥",
    },
    {
      title: "Resultat som märks",
      desc: "Vi omvandlar strategi till handling och levererar värde som syns i praktiken.",
      icon: "📈",
    },
    {
      title: "Ett partnerskap som håller",
      desc: "Vi bygger långsiktiga relationer och finns med som stöd genom hela resan.",
      icon: "🤝",
    },
  ];

  return (
    <section className="py-20 bg-blue-50 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Därför väljer företag North Path Consulting
        </h2>
        <p className="text-gray-600 mb-12">
          Att hitta rätt konsult handlar om mer än att fylla en roll. 
          Det handlar om att skapa förutsättningar för verklig framgång.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{c.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{c.title}</h3>
              <p className="text-gray-600 leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
        <a
          href="#contact"
          className="inline-block mt-12 bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition"
        >
          Låt oss ta första steget tillsammans
        </a>
      </div>
    </section>
  );
}
