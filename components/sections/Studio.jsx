import MaskedText from "@/components/ui/MaskedText";
import { studio } from "@/data/content";

/** Scrolls over the pinned hero (parallax layer). */
export default function Studio() {
  return (
    <section id="studio" data-theme="light" className="page-x relative z-10 bg-white pb-[14vw] pt-[9vw] md:pb-[8vw] md:pt-[7vw]">
      <div className="grid-12 items-baseline gap-y-4">
        <h2 className="text-title col-span-12 font-bold md:col-span-3">{studio.title}</h2>
        <a href={studio.linkHref} className="col-span-12 font-mono text-mono uppercase transition-opacity hover:opacity-60 md:col-span-6 md:col-start-4">
          {studio.linkLabel} →
        </a>
      </div>

      <MaskedText text={studio.intro} className="text-body mt-[14vw] max-w-[34em] md:mt-[7.5vw] md:whitespace-nowrap" />
      <MaskedText text={studio.body} className="text-body mt-[8vw] max-w-[34em] md:mt-[4.5vw] md:whitespace-nowrap" />
    </section>
  );
}
