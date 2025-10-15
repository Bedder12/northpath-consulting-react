import { motion } from "framer-motion";
import konsultuthyrning from "../assets/konsultuthyrning.jpg";
import rekrytering from "../assets/rekrutment.webp";
import rådgivning from "../assets/rådgivning.jpg";

const services = [
  {
    title: "Konsultuthyrning",
    text: "Rätt konsult ska både vara kompetent för rollen, bidra med nya perspektiv och kunna sätta igång snabbt. Vi hittar konsulten som matchar ditt uppdrag – för att skapa fokus och engagemang.",
    image: konsultuthyrning,
  },
  {
    title: "Rekrytering",
    text: "Rekrytering handlar om mer än att göra en matchning. Vi ser till att rätt person hamnar på rätt plats – med kompetens, kultur och potential i fokus.",
    image: rekrytering,
  },
  {
    title: "Strategi & rådgivning",
    text: "Vi hjälper er med kompetensförsörjning på både strategisk och operativ nivå – utbildning, rekrytering och rådgivning för en långsiktigt hållbar organisation.",
    image: rådgivning,
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-20" id="services">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Vi erbjuder dig</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Våra tjänster är utformade för att skapa långsiktigt värde, trygghet och tillväxt.
        </p>

        {/* Service cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col h-full"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-56 object-cover rounded-t-xl"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{service.text}</p>
                <a
                  href="#contact"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium self-center transition"
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
