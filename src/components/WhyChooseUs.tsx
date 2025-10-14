import { useEffect } from "react";
import feather from "feather-icons";

export default function WhyChooseUs() {
  useEffect(() => {
    feather.replace();
  }, []);

  const cards = [
    { icon: "users", title: "Right Expertise", desc: "Our consultants are carefully selected and matched to fit your specific needs." },
    { icon: "trending-up", title: "Measurable Results", desc: "We focus on turning strategy into action and creating value in practice." },
    { icon: "handshake", title: "Long-term Partnership", desc: "We build long-term relationships and support customers throughout the journey." },
  ];

  return (
    <section className="py-20 bg-white text-center" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-blue-600 font-semibold uppercase">WHY CHOOSE US</h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900">The Right Expertise at the Right Time</p>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Finding the right consultant is about more than filling a role. It's about creating conditions for real success.
        </p>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="flex justify-center items-center h-12 w-12 bg-blue-600 text-white rounded-md mx-auto">
                <i data-feather={c.icon}></i>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">{c.title}</h3>
              <p className="mt-2 text-gray-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
