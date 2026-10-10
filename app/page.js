import Hero from "@/components/sections/Hero";
import Studio from "@/components/sections/Studio";
import Services from "@/components/sections/Services";
import WhyWorkWithUs from "@/components/sections/WhyWorkWithUs";
import WorkShowcase from "@/components/sections/WorkShowcase";
import Glance from "@/components/sections/Glance";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <main>
      {/* hero stays pinned while Studio scrolls over it */}
      <div className="relative bg-night">
        <Hero />
        <Studio />
      </div>
      <Services />
      <WhyWorkWithUs />
      <WorkShowcase />
      <Glance />
      <Faq />
      <Footer />
    </main>
  );
}