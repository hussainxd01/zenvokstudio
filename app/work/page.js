import PageNav from "@/components/layout/PageNav";
import WorkPage from "@/components/sections/WorkPage";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Work · ZENVOK® Studio",
  description: "Selected projects: websites and digital experiences built to perform.",
};

export default function Page() {
  return (
    <main className="relative">
      <PageNav current="/work" />
      <WorkPage />
      <Footer />
    </main>
  );
}