import { siteUrl } from "@/lib/site";

// Add a path here whenever you add a page.
const paths = ["", "/work", "/services", "/studio", "/contact"];

export default function sitemap() {
    const lastModified = new Date();
    return paths.map((p) => ({
        url: `${siteUrl}${p}`,
        lastModified,
        priority: p === "" ? 1 : 0.8,
    }));
}