import MaskedText from "@/components/ui/MaskedText";
import { studioPage } from "@/data/studio";

export default function StudioHero() {
    return (
        <section data-theme="light" className="page-x pb-[12vw] pt-[30vw] md:pb-[8vw] md:pt-[10.5vw]">
            <MaskedText
                as="h1"
                when="intro"
                delay={0.2}
                text={studioPage.title}
                className="text-[clamp(52px,9.8vw,210px)] font-bold uppercase leading-[0.88] tracking-[-0.055em]"
            />
            <div className="grid-12 mt-[12vw] md:mt-[5vw]">
                <MaskedText
                    text={studioPage.statement}
                    delay={0.3}
                    className="col-span-12 text-[clamp(20px,2.2vw,40px)] font-light leading-[1.1] tracking-[-0.03em] md:col-span-6 md:col-start-7"
                />
            </div>
        </section>
    );
}