// All copy + asset paths live here. Edit content here, not in components.

export const heroImage = "/images/Hero.jpg";

export const navLinks = [
  { label: "Works", href: "#works" },
  { label: "Studio", href: "#studio" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const menuLinks = [{ label: "Home", href: "#top" }, ...navLinks];

export const socials = [
  { label: "WhatsApp", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
];

export const hero = {
  statement:
    "We design, develop, and optimize\nwebsites that attract customers, convert\ntraffic, and sustain long term growth",
};

// Spacing is intentional (matches Figma): double spaces between words, wide gaps
// around "digital experiences that helps". Extra spaces collapse on mobile.
export const studio = {
  title: "STUDIO.",
  linkLabel: "DISCOVER MORE ABOUT STUDIO",
  linkHref: "#",
  intro: "A  digital  studio  that  builds  websites  and\nexperiences  for  ambitious  brands.",
  body:
    "We  combine  strategy,  design,  and\ntechnology  to  create  clear,  purposeful\ndigital      experiences      that helps\nour  clients  grow.",
};

export const services = {
  label: "What can we do for you",
  cta: { label: "View all Works", href: "#works" },
  // `src` can be an image, gif or video (.mp4/.webm). Missing file -> placeholder.
  rows: [
    { before: "STR", after: "TEGY & DESIGN", capsule: { src: "/images/motion.webm", placeholder: "from-amber-300 to-orange-500" } },
    { before: "WEB & DIGITAL PR", after: "DUCT", capsule: { src: "/images/motion-2.webm", placeholder: "from-stone-400 to-stone-700" } },
    { before: "OPTIMIZA", after: "TION & SUPPORT", capsule: { src: "/images/motion-3.webm", placeholder: "from-sky-200 via-slate-400 to-slate-700" } },
  ],
};

export const why = {
  title: "WHY WORK WITH US?",
  lead: "We operate on\nsimple principles",
  principles: ["(01)  Clear strategy", "(02)  Thoughtful design", "(03)  Built to perform"],
  body:
    "We believe great digital work should look good, feel effortless, and serve a purpose. From strategy to the final interaction, we build websites that help ambitious brands communicate clearly, connect with their audience, and grow.",
};

export const projects = [
  { title: "Digital Marketing Agency -The Growth Co.", url: "#", image: "/work-1.png" },
  { title: "Cuisine Restaurant - Elahi Luxury Dining", url: "#", image: "/work-2.png" },
  { title: "Beyond - Ecommerce Platform", url: "#", image: "/work-3.png" },
  { title: "Hijab House - Modest Ecommerce Platform", url: "#", image: "/work-4.png" },
];

const quote = "“They understood the brand and made the whole experience feel effortless”";
export const glance = {
  title: "ZENVOK® STUDIO AT A GLANCE",
  link: { label: "LEARN MORE", href: "#" },
  slides: [
    { type: "stat", text: "Built for brands ready to move forward.", value: "5+", label: "digital experiences" },
    { type: "image", src: "/images/slider-1.png", lines: ["Fashion Brand", "Retail", "eCommerce", "Portfolio", "Agency"] },
    { type: "quote", text: quote, value: "2", label: "selected projects" },
    { type: "image", src: "/images/slider-2.jpg", lines: ["eCommerce", "Brand Websites", "Digital Experiences"] },
    { type: "quote", text: quote, value: "1", label: "selected projects" },
  ],
};

// TODO: replace the placeholder answers with your real ones.
export const faq = {
  title: "Got a question?\nWe answer\nit here",
  cta: { label: "Get in touch ↗", href: "mailto:hello@zenvok.com" },
  items: [
    { q: "How much does a website cost with ZENVOK® Studio?", a: "Every project is scoped around your goals, pages and features, so pricing varies. Send us a few details and we'll come back with a clear quote." },
    { q: "How long does it take to build a website with ZENVOK® Studio?", a: "Timelines depend on scope. A focused marketing site is quicker than a full e-commerce build, and we'll agree on dates with you before we start." },
    { q: "Can I update the website myself after launch?", a: "Yes. We set up content so you can make everyday changes yourself, and we're available for anything bigger." },
    { q: "Which technology do you use: Framer, Astro or Next.js?", a: "We build with Next.js, React and Tailwind CSS, adding a database such as MongoDB when a project needs one." },
    { q: "What makes ZENVOK® Studio different from other web design agencies?", a: "We combine strategy, design and development in one small team, so the site you approve is the site that ships, built to look good and perform." },
    { q: "Where is ZENVOK® Studio based, and do you work with international clients?", a: "We work with brands in any time zone and keep communication clear and async-friendly. Tell us where you are and we'll set up a rhythm that works." },
  ],
};

export const footer = {
  tagline: "Do it once. Do it right.",
  newsletterLabel: "Sign up for our newsletter",
  nav: [
    { label: "Home", href: "#top" },
    { label: "Work", href: "#works" },
    { label: "About", href: "#studio" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    { label: "Instagram", href: "#" }, // TODO: real URLs
    { label: "WhatsApp", href: "#" },
  ],
  location: "India – Kolkata",
  terms: { label: "Terms of use", href: "#" },
  copyright: "©2026",
};

export const cta = {
  lines: { first: "Got a", accent: "project", rest: "in mind?" },
  sub: "Let’s turn your idea into something\nthat drives real results.",
  note: "From first thought to final launch, we’re ready when you are.",
  button: { label: "Let's talk", href: "mailto:hello@zenvok.com" }, // TODO: real email / contact link
};