export default function Hero() {
  return (
    <section className="bg-gradient-to-tr from-sky-100 to-green-50">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            <span className="block">Konsultlösningar</span>
            <span className="block text-blue-600">för affärstillväxt</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-md">
            På North Path Consulting erbjuder vi noggrant utvalda konsulter som skapar värde och operativ framgång.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Kontakta oss
            </a>
            <a
              href="#"
              className="border border-blue-600 text-blue-600 bg-white px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition"
            >
              Ladda upp CV
            </a>
          </div>
        </div>
        <img
          src="images/hero-image.jpg"
          alt="Kontorsmiljö"
          className="rounded-lg shadow-xl w-full object-cover"
        />
      </div>
    </section>
  );
}
