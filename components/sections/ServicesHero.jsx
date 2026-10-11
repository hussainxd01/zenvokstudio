import MaskedText from "@/components/ui/MaskedText";
import {servicesPage} from "@/data/services";

export default function ServicesHero() {
  return (
    <section data-theme="light" className="page-x pb-[12vw] pt-[30vw] md:pb-[9vw] md:pt-[10.5vw]">
      <MaskedText
        as="h1"
        when="intro"
        delay={0.2}
        text={servicesPage.title}
        className="text-[clamp(52px,9.8vw,210px)] font-bold uppercase leading-[0.88] tracking-[-0.055em]"
      />
    </section>
  );
}