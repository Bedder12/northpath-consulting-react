import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import heroImg from "../assets/office.webp"; // Byt gärna till en mer corporate finance-bild

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-white text-gray-800">

      {/* HERO */}
      <div className="relative h-[45vh] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/40 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Våra tjänster
            </h1>

            <p className="mt-4 text-lg text-blue-100">
              Vi stärker företag med rätt ekonomisk kompetens kvalificerade och välrenommerade ekonomer
              som skapar värde på både kort och lång sikt.
            </p>
          </motion.div>
        </div>
      </div>

      {/* INTRO – DIREKT FRÅN KUND */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            På North Path Consulting vet vi att varje företag har unika behov. Därför skräddarsyr vi varje
            uppdrag och matchar er med konsulter som inte bara har rätt kompetens utan även rätt erfarenhet
            och förståelse för er verksamhet.
          </p>

          <p>
            Flera av våra konsulter har akademiska meriter från Handelshögskolan och andra ledande universitet,
            ofta med dubbla kandidater eller masterutbildningar, kombinerat med mångårig erfarenhet från
            nyckelroller inom näringslivet.
          </p>

          <p>
            Med rätt kompetens på plats bidrar vi till stabilitet, trygghet och långsiktig tillväxt oavsett om ni
            behöver en tillfällig eller en mer permanent lösning.
          </p>
        </div>
      </div>

      {/* TJÄNSTER SEKTION */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">

        {/* ⭐ KONSULTUTHYRNING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Konsultuthyrning (Interim)
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Att hitta rätt kompetens ska inte ta tid det ska ge resultat.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              På North Path Consulting erbjuder vi skräddarsydda, erfarna och kvalificerade ekonomer som snabbt
              kan kliva in och bidra där behovet är som störst.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Vi arbetar nära både kund och konsult för att säkerställa en perfekt matchning där kompetens,
              personlighet och engagemang möts. Våra konsulter är handplockade många med akademiska
              meriter från ledande universitet och lång erfarenhet från roller inom finans, bank och ekonomi.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Oavsett om ni behöver en tillfällig förstärkning, en längre insats eller en permanent lösning levererar
              vi konsulter som skapar värde från dag ett, med fokus på trygghet, kvalitet och resultat.
            </p>

            <Link
              to="/contact"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-800 transition font-medium"
            >
              Kontakta oss för att hitta rätt konsult
            </Link>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&w=900&q=60"
              alt="Interim consulting"
              className="rounded-xl shadow-xl w-full h-[420px] object-cover"
            />
          </div>
        </motion.div>

        {/* ⭐ REKRYTERING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Rekrytering</h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Rekrytering handlar om mer än att bara göra en matchning.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Vi ser till att rätt person hamnar på rätt plats med kompetens, prestation och affärsförståelse.
            </p>

            <Link
              to="/contact"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-800 transition font-medium"
            >
              Kontakta oss
            </Link>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&w=900&q=60"
              alt="Rekrytering"
              className="rounded-xl shadow-xl w-full h-[420px] object-cover"
            />
          </div>
        </motion.div>

        {/* ⭐ STRATEGI & RÅDGIVNING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Strategi & rådgivning</h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Vi hjälper er att stärka den finansiella styrningen och skapa en hållbar ekonomisk strategi.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Genom rådgivning, utbildning och rätt kompetens både strategisk och operativ får ni bättre kontroll
              över lönsamhet, risk och tillväxt.
            </p>

            <Link
              to="/contact"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-800 transition font-medium"
            >
              Kontakta oss
            </Link>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&w=900&q=60"
              alt="Rådgivning"
              className="rounded-xl shadow-xl w-full h-[420px] object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="bg-blue-950 py-20 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Rätt ekonomisk kompetens när ni behöver den
        </h2>

        <p className="max-w-2xl mx-auto text-blue-200 mb-8">
          Vi erbjuder kvalificerade ekonomer som skapar värde, trygghet och långsiktig tillväxt från dag ett.
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
