export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        <div>
          <h3 className="text-lg font-semibold mb-4">NorthPath Consulting</h3>
          <p className="text-blue-200 text-sm">
            Vi hjälper företag växa genom moderna konsult- och rekryteringslösningar.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Företag</h4>
          <ul className="space-y-2 text-blue-200 text-sm">
            <li><a href="/about">Om oss</a></li>
            <li><a href="/services">Tjänster</a></li>
            <li><a href="/contact">Kontakt</a></li>
            <li><a href="/upload-cv">Jobba med oss</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Kontakt</h4>
          <p className="text-blue-200 text-sm">
            info@northpath.se<br />
            +46 (0)70 123 45 67
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Följ oss</h4>
          <a
            href="https://www.linkedin.com/company/northpath"
            className="text-blue-200 hover:text-white"
          >
            LinkedIn →
          </a>
        </div>

      </div>

      <div className="text-center text-blue-300 mt-12 text-sm">
        © {new Date().getFullYear()} NorthPath Consulting — Alla rättigheter reserverade.
      </div>
    </footer>
  );
}
