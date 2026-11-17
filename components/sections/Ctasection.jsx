import MaskedText from "@/components/ui/MaskedText";
import { cta } from "@/data/content";
import Link from "next/link";

/** "Let's talk" pill: label rolls up, arrow flies out and back in, pill grows slightly. */
function TalkButton({ label }) {
  const ease = "transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)]";
  return (
    <Link
      href={"/contact"}
      className="group inline-flex items-center gap-3 rounded-full bg-black px-[1.4em] py-[0.9em] text-[clamp(12px,0.95vw,16px)] uppercase leading-none tracking-[0.12em] text-white transition-transform duration-300 hover:scale-105"
    >
      {/* rolling label */}
      <span className="relative block h-[1.1em] overflow-hidden">
        <span className={`block ${ease} group-hover:-translate-y-full`}>{label}</span>
        <span className={`absolute left-0 top-full block ${ease} group-hover:-translate-y-full`} aria-hidden="true">
          {label}
        </span>
      </span>

      {/* arrow swap */}
      <span className="relative block h-[1em] w-[1em] overflow-hidden">
        <svg className={`absolute inset-0 ${ease} group-hover:-translate-y-full group-hover:translate-x-full`} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M2 12L12 2M4 2h8v8" />
        </svg>
        <svg className={`absolute inset-0 -translate-x-full translate-y-full ${ease} group-hover:translate-x-0 group-hover:translate-y-0`} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M2 12L12 2M4 2h8v8" />
        </svg>
      </span>
    </Link>
  );
}

/** Same language as "Why work with us": white, bold uppercase title, 3/3/6 grid, black pill. */
export default function CtaSection() {
  const { lines } = cta;
  return (
    <section data-theme="light" className="page-x bg-white pb-[16vw] pt-[16vw] md:pb-[7vw] md:pt-[9vw]">
      <MaskedText
        as="h2"
        text={`${lines.first} ${lines.accent}\n${lines.rest}`}
        className="text-[clamp(40px,6.2vw,130px)] font-bold uppercase leading-[0.95] tracking-[-0.05em]"
      />

      <div className="grid-12 mt-[10vw] gap-y-8 md:mt-[5vw]">
        <MaskedText text={cta.sub} delay={0.2} className="text-body col-span-12 md:col-span-3 md:whitespace-nowrap" />
        <MaskedText text={cta.note} delay={0.3} className="col-span-12 text-small text-black/60 md:col-span-3" />
        <div className="col-span-12 flex md:col-span-6 md:items-end md:justify-end">
          <TalkButton {...cta.button} />
        </div>
      </div>
    </section>
  );
}