import PageNav from "@/components/layout/PageNav";
import ServicesHero from "@/components/sections/ServicesHero";
import ServicesList from "@/components/sections/ServicesList";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Services · ZENVOK® Studio",
  description: "Strategy and design, web development, optimization and support.",
};

export default function ServicesPage() {
  return (
    <main className="relative">
      <PageNav current="/services" />
      <ServicesHero />
      <ServicesList />
      <Footer />
    </main>
  );
}