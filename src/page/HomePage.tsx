import Hero from "../components/Hero";
import Services from "../components/Services";
import CTASection from "../components/CTASection";
import AudienceTabs from "../components/AudienceTabs";
import TestimonialsSection from "../components/TestimonialsSection";

export default function Home() {
  return (
     <div className="font-['Inter'] scroll-smooth">
      <Hero />
      <AudienceTabs />
      <Services />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
