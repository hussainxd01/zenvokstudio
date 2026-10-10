import MaskedText from "@/components/ui/MaskedText";
import { cta } from "@/data/content";

const ACCENT = "#ff6a57"; // brightened version of the site's reds; change here only

function ArrowIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M2 12L12 2M4 2h8v8" />
    </svg>
  );
}

/** "Let's talk" link: text rolls, arrow flies out and back in, accent underline draws. */
function TalkButton({ label, href }) {
  const ease = "transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)]";
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-3 pb-2.5 text-[clamp(12px,0.95vw,16px)] uppercase leading-none tracking-[0.12em] text-white"
    >
      {/* rolling label */}
      <span className="relative block h-[1.1em] overflow-hidden">
        <span className={`block ${ease} group-hover:-translate-y-full`}>{label}</span>
        <span className={`absolute left-0 top-full block ${ease} group-hover:-translate-y-full`} style={{ color: ACCENT }} aria-hidden="true">
          {label}
        </span>
      </span>

      {/* arrow swap */}
      <span className="relative block h-[1.1em] w-[1.1em] overflow-hidden">
        <span className={`absolute inset-0 ${ease} group-hover:-translate-y-full group-hover:translate-x-full`}>
          <ArrowIcon />
        </span>
        <span
          className={`absolute inset-0 -translate-x-full translate-y-full ${ease} group-hover:translate-x-0 group-hover:translate-y-0`}
          style={{ color: ACCENT }}
          aria-hidden="true"
        >
          <ArrowIcon />
        </span>
      </span>

      {/* underline */}
      <span className="absolute bottom-0 left-0 h-px w-full bg-white/80" />
      <span
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-x-100"
        style={{ backgroundColor: ACCENT }}
      />
    </a>
  );
}

export default function CtaSection() {
  const { lines } = cta;
  return (
    <section
      data-theme="dark"
      className="page-x relative flex min-h-[78svh] flex-col justify-between overflow-hidden bg-[#150808] py-[14vw] text-white md:min-h-[34vw] md:py-[5.5vw]"
    >
      <div className="relative">
        <h2 className="text-[clamp(44px,6.2vw,130px)] font-normal leading-[1.02] tracking-[-0.045em]">
          <MaskedText as="span" text={lines.first} className="block" />
          <span className="block">
            <span style={{ color: ACCENT }}>
              <MaskedText as="span" text={lines.accent} delay={0.1} className="inline" />
            </span>{" "}
            <MaskedText as="span" text={lines.rest} delay={0.2} className="inline" />
          </span>
        </h2>
        <MaskedText
          text={cta.sub}
          delay={0.35}
          className="mt-[5vw] text-[clamp(18px,2vw,40px)] font-light leading-[1.2] tracking-[-0.02em] md:mt-[1.6vw]"
        />
      </div>

      <div className="relative mt-[16vw] flex flex-col gap-8 md:mt-[3vw] md:flex-row md:items-end md:justify-between">
        <MaskedText as="p" text={cta.note} delay={0.5} className="max-w-[28em] text-[clamp(12px,0.95vw,16px)] tracking-[0.04em] text-white/70" />
        <TalkButton {...cta.button} />
      </div>
    </section>
  );
}