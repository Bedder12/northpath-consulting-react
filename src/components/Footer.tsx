import { Link } from "react-router-dom";
import { Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid gap-12 sm:grid-cols-2 md:grid-cols-4">
        {/* 🏢 Om företaget */}
        <div className="md:col-span-2">
          <h3 className="text-white text-xl font-bold mb-4">
            North Path Consulting
          </h3>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Vi hjälper företag att navigera genom förändring, växa hållbart och
            effektivisera verksamheten med stöd av våra noggrant utvalda
            konsulter. Tillsammans skapar vi trygghet, stabilitet och framgång.
          </p>
          <div className="flex space-x-5 justify-center md:justify-start">
            <a
              href="https://www.linkedin.com/company/northpath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <Instagram size={22} />
            </a>
          </div>
        </div>

        {/* 🔗 Navigering */}
        <div>
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
            Navigering
          </h3>
          <ul className="space-y-2 text-center sm:text-left">
            <li><Link to="/" className="hover:text-white transition">Hem</Link></li>
            <li><Link to="/about" className="hover:text-white transition">Om oss</Link></li>
            <li><Link to="/services" className="hover:text-white transition">Tjänster</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Kontakt</Link></li>
          </ul>
        </div>

        {/* 📞 Kontakt */}
        <div className="text-center sm:text-left">
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
            Kontakt
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>info@northpath.se</li>
            <li>+46 (0)70 123 45 67</li>
            <li>Stockholm</li>
          </ul>
          <Link
            to="/contact"
            className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition"
          >
            Boka möte
          </Link>
        </div>
      </div>

      {/* ⚖️ Copyright */}
      <div className="border-t border-gray-700 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} North Path Consulting. Alla rättigheter förbehållna.
      </div>
    </footer>
  );
}
