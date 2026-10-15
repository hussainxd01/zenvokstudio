import Capsule from "@/components/ui/Capsule";
import { services } from "@/data/content";

export default function Services() {
  return (
    <section
      id="services"
      data-theme="light"
      className="page-x bg-white pb-[9vw] pt-[3vw] text-center"
    >
      <p className="text-small font-bold tracking-tight">{services.label}</p>

      <div className="mt-[4vw] md:mt-[2vw]">
        {services.rows.map((row) => (
          <a
            key={row.before + row.after}
            href="/contact"
            className="group block text-service whitespace-nowrap font-medium"
          >
            {row.before}
            <Capsule {...row.capsule} />
            {row.after}
          </a>
        ))}
      </div>

      <a
        href={services.cta.href}
        className="text-small mt-[6vw] inline-flex items-center gap-1 rounded-full bg-black px-[1.1em] py-[0.6em] text-white transition-transform duration-300 hover:scale-105 md:mt-[3.5vw]"
      >
        {services.cta.label} →
      </a>
    </section>
  );
}
