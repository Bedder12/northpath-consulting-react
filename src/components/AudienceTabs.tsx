import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// @ts-ignore
import kompetens from "../assets/kompetens.png";
// @ts-ignore
import konsult from "../assets/konsult.jpeg";
// @ts-ignore
import student from "../assets/student.jpeg";

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
    label: "För Företag",
    heading: "Rätt ekonomisk kompetens när ni behöver den",
    text:
      "På North Path Consulting vet vi att varje företag har unika behov. Därför skräddarsyr vi varje uppdrag och matchar er med kvalificerade ekonomer som har både rätt kompetens och förståelse för er verksamhet.",
    image: kompetens,
  },
  {
    id: "consultants",
    label: "För Konsulter",
    heading: "Uppdrag som utvecklar er professionellt",
    text:
      "Som konsult hos North Path får ni tillgång till kvalificerade uppdrag som stärker er karriär. Våra ekonomer har ofta akademiska meriter från ledande universitet och erfarenhet från nyckelroller inom näringslivet.",
    image: konsult,
  },
  {
    id: "candidates",
    label: "För Kandidater",
    heading: "Er karriärresa börjar här",
    text:
      "Vi matchar er med uppdrag inom ekonomi där ni får möjlighet att växa och bidra med er kompetens – från första kontakt till första dagen på uppdraget.",
    image: student,
  },
];

export default function AudienceTabs() {
  const [active, setActive] = useState("companies");
  const navigate = useNavigate();

  const activeTab = tabs.find((t) => t.id === active)!;

  // MAP TABS TO CORRECT "LÄS MER" DESTINATIONS
  const handleReadMore = () => {
    if (activeTab.id === "companies") navigate("/for-companies");
    if (activeTab.id === "consultants") navigate("/work-with-us");
    if (activeTab.id === "candidates") navigate("/work-with-us");
  };

  return (
    <section className="bg-white py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* SEGMENTED CONTROL TABS */}
        <div className="flex justify-center mb-12 mt-4">
          <div className="inline-flex rounded-md border border-blue-300 overflow-hidden shadow-sm">
            {tabs.map((tab, index) => {
              const isActive = active === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`
                    px-6 py-2 text-sm md:text-base font-semibold transition-all
                    ${isActive 
                      ? "bg-blue-600 text-white shadow" 
                      : "bg-white text-blue-600 hover:bg-blue-50"
                    }
                    ${index !== tabs.length - 1 ? "border-r border-blue-300" : ""}
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-10 items-center text-left"
          >
            {/* LEFT TEXT */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {activeTab.heading}
              </h2>

              <p className="text-lg text-gray-600 mb-6">{activeTab.text}</p>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4">

                {/* PRIMARY – CONTACT */}
                <button
                  onClick={() => navigate("/contact")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition w-full sm:w-auto"
                >
                  Kontakta oss
                </button>

                {/* SECONDARY – READ MORE */}
                <button
                  onClick={handleReadMore}
                  className="border border-blue-300 text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition w-full sm:w-auto"
                >
                  Läs mer
                </button>

              </div>
            </div>

            {/* IMAGE */}
            <motion.div
              className="
                w-full 
                h-64 sm:h-72 md:h-80 lg:h-96 
                overflow-hidden 
                rounded-xl 
                shadow-lg
              "
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={activeTab.image}
                alt={activeTab.heading}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
