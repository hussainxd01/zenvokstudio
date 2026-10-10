import MaskedText from "@/components/ui/MaskedText";
import { why } from "@/data/content";

export default function WhyWorkWithUs() {
  return (
    <section data-theme="light" className="page-x bg-white pb-[16vw] pt-[6vw] md:pb-[7vw] md:pt-[3vw]">
      <MaskedText as="h2" text={why.title} className="text-title font-bold" />

      <div className="grid-12 mt-[8vw] gap-y-8 md:mt-[5vw]">
        <MaskedText text={why.lead} className="text-body col-span-12 md:col-span-3 md:whitespace-nowrap" />

        <ul className="text-body col-span-12 space-y-[0.8em] md:col-span-3 md:space-y-[0.55em]">
          {why.principles.map((p) => (
            <li key={p}>
              <MaskedText as="span" text={p} className="block" />
            </li>
          ))}
        </ul>

        <MaskedText text={why.body} className="text-body col-span-12 text-justify md:col-span-6" />
      </div>
    </section>
  );
}
