import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = {
  id: string;
  label: string;
  heading: string;
  text: string;
  image: string;
};

const tabs: Tab[] = [
  {
    id: "companies",
    label: "För företag",
    heading: "Rätt kompetens när ni behöver den",
    text: "Vi hjälper företag att hitta erfarna konsulter och rekryteringslösningar som skapar trygghet och tillväxt.",
    image: "/images/company.jpg",
  },
  {
    id: "consultants",
    label: "För konsulter",
    heading: "Uppdrag som utvecklar",
    text: "Som konsult hos North Path får du uppdrag som matchar din kompetens och dina ambitioner – både korta och långsiktiga.",
    image: "/images/consultant.jpg",
  },
  {
    id: "candidates",
    label: "För kandidater",
    heading: "Din karriärresa börjar här",
    text: "Vi matchar dig med rätt möjligheter och ger stöd hela vägen från ansökan till första dagen på nya jobbet.",
    image: "/images/candidate.jpg",
  },
];

export default function AudienceTabs() {
  const [active, setActive] = useState("companies");

  const activeTab = tabs.find((t) => t.id === active)!;

  return (
    <section className="bg-white py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-6 py-2 rounded-full font-medium border transition-all duration-200
                ${
                  active === tab.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-10 items-center text-left"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {activeTab.heading}
              </h2>
              <p className="text-lg text-gray-600 mb-6">{activeTab.text}</p>
              <a
                href="#contact"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
              >
                Kontakta oss
              </a>
            </div>
            <motion.img
              src={activeTab.image}
              alt={activeTab.heading}
              className="rounded-xl shadow-lg w-full object-cover h-80"
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
