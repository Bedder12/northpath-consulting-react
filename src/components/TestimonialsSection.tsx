export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Anna Eriksson",
      role: "CFO, NordTech AB",
      text: "NorthPath hjälpte oss hitta rätt kompetens extremt snabbt. Professionella, tydliga och effektiva.",
    },
    {
      name: "Johan Lind",
      role: "CTO, Atlas Group",
      text: "Deras konsulter levererade mer än vad vi hade förväntat oss. Rekommenderas starkt.",
    },
    {
      name: "Sara Holm",
      role: "HR-chef, Vectra",
      text: "Vi har samarbetat med NorthPath för både rekrytering och konsultlösningar – toppklass.",
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Vad våra kunder säger</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-xl shadow border border-gray-200"
            >
              <p className="text-gray-700 italic mb-4">“{t.text}”</p>
              <h4 className="font-semibold">{t.name}</h4>
              <p className="text-gray-600 text-sm">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
