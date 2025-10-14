import { motion } from "framer-motion";

const services = [
  {
    title: "Konsultuthyrning",
    text: "Rätt konsult ska både vara kompetent för rollen, bidra med nya perspektiv och kunna sätta igång snabbt. Vi hittar konsulten som matchar ditt uppdrag – för att skapa fokus och engagemang.",
    image: "/images/service1.jpg",
  },
  {
    title: "Rekrytering",
    text: "Rekrytering handlar om mer än att göra en matchning. Vi ser till att rätt person hamnar på rätt plats – med kompetens, kultur och potential i fokus.",
    image: "/images/service2.jpg",
  },
  {
    title: "Strategi & rådgivning",
    text: "Vi hjälper er med kompetensförsörjning på både strategisk och operativ nivå – utbildning, rekrytering och rådgivning för en långsiktigt hållbar organisation.",
    image: "/images/service3.jpg",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Vi erbjuder dig
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl shadow-lg group"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-blue-950/70 p-8 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-sm opacity-90 mb-6">{service.text}</p>
                <a
                  href="#contact"
                  className="inline-block border border-white px-5 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-blue-950 transition"
                >
                  LÄS MER
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
