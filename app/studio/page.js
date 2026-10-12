import PageNav from "@/components/layout/PageNav";
import StudioHero from "@/components/sections/StudioHero";
import StudioAbout from "@/components/sections/StudioAbout";
import MediaShowcase from "@/components/ui/MediaShowcase";
import Footer from "@/components/sections/Footer";
import { studioPage } from "@/data/studio";

export const metadata = {
    title: "Studio · ZENVOK® Studio",
    description: "A digital studio that builds websites and experiences for ambitious brands.",
};

export default function StudioPage() {
    return (
        <main className="relative">
            <PageNav current="/studio" />
            <StudioHero />
            <MediaShowcase {...studioPage.media} />
            <StudioAbout />
            <Footer />
        </main>
    );
}