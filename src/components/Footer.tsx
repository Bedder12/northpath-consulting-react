export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white pt-16 pb-10 mt-32">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">

        {/* LEFT */}
        <div>
          <h3 className="text-2xl font-bold mb-4">NorthPath Consulting</h3>
          <p className="text-blue-200 text-sm leading-relaxed max-w-sm">
            Vi hjälper företag med konsultuthyrning, rekrytering och moderna IT-lösningar.
            Med fokus på kvalitet, långsiktighet och professionell utveckling.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Snabblänkar</h4>
          <ul className="space-y-2 text-blue-200">
            <li><a href="/" className="hover:text-white">Hem</a></li>
            <li><a href="/about" className="hover:text-white">Om oss</a></li>
            <li><a href="/services" className="hover:text-white">Tjänster</a></li>
            <li><a href="/upload-cv" className="hover:text-white">Jobba med oss</a></li>
            <li><a href="/contact" className="hover:text-white">Kontakt</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Kontakt</h4>
          <p className="text-blue-200 text-sm">info@northpath.se</p>
          <p className="text-blue-200 text-sm mt-1">+46 (0)70 123 45 67</p>

          <a
            href="https://www.linkedin.com/company/northpath"
            target="_blank"
            className="inline-block mt-4 text-blue-300 hover:text-white underline"
          >
            Följ oss på LinkedIn
          </a>
        </div>
      </div>

      <p className="text-center text-blue-400 text-xs mt-12">
        © {new Date().getFullYear()} NorthPath Consulting — Alla rättigheter förbehållna.
      </p>
    </footer>
  );
}
