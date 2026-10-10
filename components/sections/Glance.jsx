import DragMarquee from "@/components/ui/DragMarquee";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { glance } from "@/data/content";

const W = "w-[clamp(210px,19.3vw,320px)]";
const TEXT = "text-[clamp(12px,1.05vw,16px)] leading-[1.25]";

function Card({ s }) {
  if (s.type === "image")
    return (
      <div className={`${W} relative aspect-[149/217] text-white`}>
        <ImageWithFallback
          src={s.src}
          className="absolute inset-0 h-full w-full"
          placeholder="bg-gradient-to-b from-neutral-700 to-neutral-900"
          label={s.src.replace("/", "")}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 to-transparent" />
        <p className={`${TEXT} absolute left-[6%] top-[5%]`}>
          {s.lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </p>
      </div>
    );

  const dark = s.type === "stat";
  return (
    <div
      className={`${W} flex flex-col justify-between p-[6%] ${dark ? "aspect-[149/163] bg-black text-white" : "aspect-[149/156] bg-card text-black/80"}`}
    >
      <p className={`${TEXT} max-w-[11em]`}>{s.text}</p>
      <div>
        <p className="text-[clamp(32px,3.6vw,60px)] font-light leading-none tracking-tight">{s.value}</p>
        <p className={`${TEXT} mt-[0.4em]`}>{s.label}</p>
      </div>
    </div>
  );
}

export default function Glance() {
  return (
    <section data-theme="light" className="bg-white pb-[8vw] pt-[8vw] md:pt-[8.5vw]">
      <div className="page-x flex items-baseline justify-between">
        <h2 className="text-[clamp(14px,1.45vw,24px)] tracking-tight">{glance.title}</h2>
        <a href={glance.link.href} className="font-mono text-mono uppercase transition-opacity hover:opacity-60">
          {glance.link.label}
        </a>
      </div>
      <DragMarquee className="mt-[5vw] md:mt-[4vw]" gap={20} speed={40}>
        {glance.slides.map((s, i) => (
          <Card key={i} s={s} />
        ))}
      </DragMarquee>
    </section>
  );
}
