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
      "På North Path Consulting vet vi att varje företag har unika behov. Därför matchar vi er med kvalificerade ekonomer med branscherfarenhet och skräddarsydd kompetens.",
    image: kompetens,
  },
  {
    id: "consultants",
    label: "För Konsulter",
    heading: "Uppdrag som utvecklar er professionellt",
    text:
      "Som konsult hos oss får ni tillgång till kvalificerade uppdrag som stärker er karriär. Vi arbetar nära både kunder och konsulter för att säkerställa rätt matchning.",
    image: konsult,
  },
  {
    id: "candidates",
    label: "För Kandidater",
    heading: "Er karriärresa börjar här",
    text:
      "Vi matchar er med utvecklande roller inom ekonomi där ni får möjlighet att växa och bidra med er kompetens – från första kontakt till första dagen på uppdraget.",
    image: student,
  },
];

export default function AudienceTabs() {
  const [active, setActive] = useState("companies");
  const navigate = useNavigate();

  const activeTab = tabs.find((t) => t.id === active)!;

  const handleReadMore = () => {
    if (activeTab.id === "companies") navigate("/for-companies");
    if (activeTab.id === "consultants") navigate("/work-with-us");
    if (activeTab.id === "candidates") navigate("/work-with-us");
  };

  return (
    <section className="bg-white py-16 sm:py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">

        {/* ======= SEGMENTED CONTROL (RESPONSIVE) ======= */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg border border-blue-300 overflow-hidden shadow-sm w-full sm:w-auto">
            {tabs.map((tab, index) => {
              const isActive = active === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`
                    flex-1 sm:flex-none px-4 sm:px-6 py-2 text-sm sm:text-base font-medium
                    transition-all whitespace-nowrap
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

        {/* ======= ANIMATION & CONTENT ======= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.35 }}
            className="
              grid 
              grid-cols-1 md:grid-cols-2 
              gap-10 md:gap-12 
              items-center 
              text-left
            "
          >
            {/* ===== LEFT TEXT ===== */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {activeTab.heading}
              </h2>

              <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                {activeTab.text}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">

                <button
                  onClick={() => navigate("/contact")}
                  className="
                    bg-blue-600 text-white 
                    px-6 py-3 
                    rounded-md font-medium
                    hover:bg-blue-700 transition
                    w-full sm:w-auto
                  "
                >
                  Kontakta oss
                </button>

                <button
                  onClick={handleReadMore}
                  className="
                    border border-blue-300 text-blue-600 
                    px-6 py-3 
                    rounded-md font-medium
                    hover:bg-blue-50 transition
                    w-full sm:w-auto
                  "
                >
                  Läs mer
                </button>

              </div>
            </div>

            {/* ===== RIGHT IMAGE ===== */}
            <motion.div
              className="
                w-full 
                h-56 sm:h-64 md:h-80 lg:h-96 
                rounded-xl shadow-lg overflow-hidden
              "
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.35 }}
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
