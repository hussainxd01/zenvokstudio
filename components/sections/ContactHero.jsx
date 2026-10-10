import MaskedText from "@/components/ui/MaskedText";
import { contact } from "@/data/contact";

export default function ContactHero() {
  return (
    <section data-theme="light" className="page-x pb-[12vw] pt-[30vw] md:pb-[9vw] md:pt-[10.5vw]">
      <MaskedText
        as="h1"
        when="intro"
        delay={0.2}
        text={contact.title}
        className="text-[clamp(52px,9.8vw,210px)] font-bold uppercase leading-[0.88] tracking-[-0.055em]"
      />
    </section>
  );
}