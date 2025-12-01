import { motion } from "framer-motion";
import heroImg from "../assets/office.webp";
import team from "../assets/image1.webp";
import arbetssatt from "../assets/arbetssätt.webp";
import { Briefcase, Users, ThumbsUp } from "lucide-react";

export default function About() {
  return (
    <section className="bg-white text-gray-800">

      {/* TOP BANNER = premium version */}
      <div className="relative h-[50vh] w-full overflow-hidden">

        {/* Background image */}
        <img
          src={heroImg}
          alt="NorthPath Consulting"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/40 to-transparent"></div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Om NorthPath Consulting
            </h1>
            <p className="mt-4 text-lg text-blue-100 max-w-xl">
              Vi hjälper företag bygga starka organisationer genom modern konsulting,
              rekrytering och verksamhetsutveckling.
            </p>
          </motion.div>
        </div>
      </div>

      {/* SECTION 1 – Filosofi */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Vår filosofi
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Vi tror att varje organisation har en unik väg framåt. Vårt uppdrag är
            att skapa långsiktig framgång genom att förena företag med konsulter
            som levererar kvalitet, innovation och värde från dag ett.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed">
            Med fokus på transparens, professionalism och ett mänskligt
            förhållningssätt bygger vi samarbeten som varar.
          </p>
        </div>

        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={team}
          alt="Team"
          className="rounded-xl shadow-xl w-full h-[400px] object-cover"
        />
      </div>

      {/* SECTION 2 – Värderingar */}
      <div className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Våra värderingar
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-left">
            {[
              {
                icon: <ThumbsUp className="text-blue-700" size={36} />,
                title: "Engagemang",
                desc: "Vi bryr oss om varje uppdrag och individ."
              },
              {
                icon: <Briefcase className="text-blue-700" size={36} />,
                title: "Kvalitet",
                desc: "Vi levererar noggrannhet och professionalism i varje steg."
              },
              {
                icon: <Users className="text-blue-700" size={36} />,
                title: "Tillit",
                desc: "Transparens och ansvar bygger långsiktiga samarbeten."
              }
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition"
              >
                <div className="mb-4">{v.icon}</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-3">
                  {v.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 – Arbetssätt */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={arbetssatt}
          alt="Vårt arbetssätt"
          className="rounded-xl shadow-xl w-full h-[400px] object-cover"
        />

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Vårt arbetssätt
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Vi arbetar nära våra kunder och konsulter för att skapa skräddarsydda
            lösningar som stärker både människan och organisationen.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Vårt fokus är att leverera resultat, kvalitet och trygghet – varje gång.
          </p>

          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition"
          >
            Kontakta oss
          </a>
        </div>
      </div>

    </section>
  );
}
