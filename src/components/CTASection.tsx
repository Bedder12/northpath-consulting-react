export default function ContactSection() {
  return (
    <section className="bg-blue-950 text-white py-20" id="contact">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Sätt människor i rörelse <br /> tillsammans med oss
          </h2>
          <p className="text-gray-200 mb-6">
            Fyll i formuläret så kontaktar vi dig inom kort.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Förnamn*" className="p-3 rounded-md text-gray-900 w-full" />
              <input type="text" placeholder="Efternamn*" className="p-3 rounded-md text-gray-900 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="email" placeholder="Email*" className="p-3 rounded-md text-gray-900 w-full" />
              <input type="text" placeholder="Företag*" className="p-3 rounded-md text-gray-900 w-full" />
            </div>
            <textarea placeholder="Vad kan vi hjälpa dig med?" className="p-3 rounded-md text-gray-900 w-full h-28"></textarea>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition"
            >
              SKICKA
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
