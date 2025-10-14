import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Det viktiga var att han skulle förstå vårt behov och vad vi söker. Vi fick rätt person på plats och ett otroligt engagemang.",
    name: "Frida Dunger",
    company: "Emmaus",
  },
  {
    quote: "Sabina var superproffsig och gav mig allt jag behövde för att känna mig trygg under hela processen.",
    name: "Paulia Robinson",
    company: "Veidekke",
  },
  {
    quote: "Jag upplevde samarbetet som väldigt bra. Anette och Rise var professionella och effektiva genom hela processen.",
    name: "Margaret Simonson McNamee",
    company: "Rise",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Snacka om att ha roligt på jobbet!
          </h2>
          <p className="text-gray-700 mb-6">
            Vi har över 1 600 nöjda kunder – här är ett urval av deras upplevelser.
          </p>
          <a
            href="#contact"
            className="inline-block border border-blue-700 text-blue-700 px-6 py-3 rounded-md hover:bg-blue-700 hover:text-white transition"
          >
            LÄS MER
          </a>
        </div>

        <div className="space-y-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-lg shadow p-6 relative"
            >
              <span className="absolute -top-4 left-4 text-blue-600 text-5xl font-serif">“</span>
              <p className="text-gray-700 mb-4 italic">{t.quote}</p>
              <p className="font-semibold text-gray-900">{t.name}</p>
              <p className="text-sm text-gray-500">{t.company}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
