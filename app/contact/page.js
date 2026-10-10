import PageNav from "@/components/layout/PageNav";
import ContactHero from "@/components/sections/ContactHero";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Contact · ZENVOK® Studio",
  description: "Tell us about your project. Strategy and design, web development, optimization and support.",
};

export default function ContactPage() {
  return (
    <main className="relative">
      <PageNav />
      <ContactHero />
      <ContactSection />
      <Footer />
    </main>
  );
}