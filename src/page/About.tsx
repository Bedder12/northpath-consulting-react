import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="bg-white text-gray-800">
      {/* HERO - Inledning */}
      <div className="bg-gradient-to-tr from-sky-100 to-green-50 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6"
          >
            Om North Path Consulting
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Vår vision är att skapa långsiktig framgång genom att förena företag
            med konsulter som verkligen gör skillnad. Vi tror att trygghet och
            utveckling går hand i hand – för både företag och människor.
          </motion.p>
        </div>
      </div>

      {/* FÖRETAGETS SYFTE / FILOSOFI */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Vi tror på partnerskap som skapar verklig skillnad
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            North Path Consulting hjälper företag att navigera genom förändring
            och växa hållbart. Vi matchar varje uppdrag med rätt kompetens –
            noggrant utvalda konsulter som bidrar med energi, kunskap och
            stabilitet från dag ett.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Vi tror att de mest framgångsrika samarbetena bygger på tillit,
            engagemang och gemensamma mål. Därför arbetar vi nära våra kunder
            och konsulter för att skapa värde som märks i praktiken – inte bara
            i resultatet, utan i hela samarbetet.
          </p>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          src="/images/about-team.jpg"
          alt="North Path Consulting team"
          className="rounded-xl shadow-lg w-full h-[420px] object-cover"
        />
      </div>

      {/* VÅRA VÄRDERINGAR */}
      <div className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Våra värderingar
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Engagemang",
                desc: "Vi bryr oss om varje uppdrag och varje individ. Genom närvaro och omtanke skapar vi starka och hållbara relationer.",
              },
              {
                title: "Kvalitet",
                desc: "Noggrannhet och professionalism i varje steg – från urval till leverans. Vårt mål är att överträffa förväntningar, varje gång.",
              },
              {
                title: "Tillit",
                desc: "Transparens, respekt och ansvar är grunden för allt vi gör. Vi bygger långsiktiga samarbeten som skapar trygghet.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-blue-700 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* VÅRT ARBETSSÄTT */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          src="/images/work-process.jpg"
          alt="Vårt arbetssätt"
          className="rounded-xl shadow-lg w-full h-[400px] object-cover"
        />
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Vårt arbetssätt
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Vi kombinerar erfarenhet och flexibilitet för att skapa lösningar
            som möter varje kunds specifika behov. Våra konsulter är handplockade
            och matchade inte bara utifrån kompetens, utan också kultur och
            samarbetsförmåga.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Tillsammans med våra kunder utvecklar vi moderna och hållbara sätt
            att arbeta – med målet att stärka både människan och organisationen.
          </p>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-blue-950 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Låt oss växa tillsammans
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Vill du veta mer om vårt arbetssätt, våra konsulter eller våra värderingar?
          Hör av dig till oss så tar vi första steget tillsammans.
        </p>
        <a
          href="#contact"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition"
        >
          Kontakta oss
        </a>
      </div>
    </section>
  );
}
