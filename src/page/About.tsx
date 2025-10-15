import { motion } from "framer-motion";
import team from "../assets/image1.webp";
import arbetsätt from "../assets/arbetssätt.webp";

export default function About() {
  return (
    <section className="bg-white text-gray-800">
      <div className="bg-gradient-to-tr from-sky-100 to-green-50 py-20 md:py-28 text-center">
        <motion.h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Om North Path Consulting
        </motion.h1>
        <motion.p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Vi tror att varje organisation har en unik väg framåt. 
          Vår vision är att skapa långsiktig framgång genom att förena företag med konsulter som verkligen gör skillnad.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Vår filosofi</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Vi kombinerar erfarenhet, engagemang och trygghet för att hjälpa företag navigera i förändring. 
            Våra konsulter är handplockade för att skapa värde från dag ett – både i resultatet och i samarbetet.
          </p>
        </div>
        <img src={team} alt="Team" className="rounded-xl shadow-lg w-full h-[400px] object-cover" />
      </div>

      <div className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Våra värderingar</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Engagemang", desc: "Vi bryr oss om varje uppdrag och individ." },
              { title: "Kvalitet", desc: "Noggrannhet och professionalism i varje steg." },
              { title: "Tillit", desc: "Transparens, respekt och ansvar bygger långsiktiga samarbeten." },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <img src={arbetsätt} alt="Vårt arbetssätt" className="rounded-xl shadow-lg w-full h-[400px] object-cover" />
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Vårt arbetssätt</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Vi arbetar nära våra kunder och konsulter för att skapa lösningar som stärker både människan och organisationen.
          </p>
          <a
            href="#contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition"
          >
            Kontakta oss
          </a>
        </div>
      </div>
    </section>
  );
}
