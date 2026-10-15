import DragMarquee from "@/components/ui/DragMarquee";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { glance } from "@/data/content";

const W = "w-[clamp(210px,19.3vw,320px)]";
const TEXT = "text-[clamp(12px,1.05vw,16px)] leading-[1.25]";

function Card({ s }) {
  if (s.type === "image") {
    return (
      <div
        className={`${W} relative aspect-[149/217] text-white overflow-hidden rounded-sm`}
      >
        <ImageWithFallback
          src={s.src}
          className="absolute inset-0 h-full w-full"
          placeholder="bg-gradient-to-b from-neutral-700 to-neutral-900"
          label={s.src.replace("/", "")}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/45 to-transparent" />

        <p className={`${TEXT} absolute left-[6%] top-[5%]`}>
          {s.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    );
  }

  if (s.type === "quote") {
    return (
      <div
        className={`${W} flex aspect-[149/163] flex-col justify-between bg-card p-[6%] text-black/80 overflow-hidden rounded-sm`}
      >
        <p className={TEXT}>{s.text}</p>

        <div>
          <p className="text-[clamp(32px,3.6vw,60px)] font-light leading-none tracking-tight">
            {s.value}
          </p>

          <p className={`${TEXT} mt-[0.4em]`}>{s.label}</p>
        </div>
      </div>
    );
  }

  if (s.type === "stat") {
    return (
      <div
        className={`${W} flex aspect-[149/163] flex-col justify-between bg-black p-[6%] text-white overflow-hidden rounded-sm`}
      >
        <p className={`${TEXT} max-w-[11em]`}>{s.text}</p>

        <div>
          <p className="text-[clamp(32px,3.6vw,60px)] font-light leading-none tracking-tight">
            {s.value}
          </p>

          <p className={`${TEXT} mt-[0.4em]`}>{s.label}</p>
        </div>
      </div>
    );
  }

  return null;
}

export default function Glance() {
  return (
    <section
      data-theme="light"
      className="bg-white pb-[8vw] pt-[8vw] md:pt-[8.5vw]"
    >
      <div className="page-x flex items-baseline justify-between">
        <h2 className="text-[clamp(14px,1.45vw,24px)] tracking-tight">
          {glance.title}
        </h2>

        <a
          href={glance.link.href}
          className="font-mono text-mono uppercase transition-opacity hover:opacity-60"
        >
          {glance.link.label}
        </a>
      </div>

      <DragMarquee className="mt-[5vw] md:mt-[4vw]" gap={20} speed={40}>
        {glance.slides.map((slide, index) => (
          <Card key={`${slide.type}-${index}`} s={slide} />
        ))}
      </DragMarquee>
    </section>
  );
}
