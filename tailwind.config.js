/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Suisse Intl"', '"Helvetica Neue"', "Arial", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", '"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        night: "#05101f", // loader + hero backdrop
        faq: "#faf9f7",
        card: "#f2f2f2",
        accent: "#a3140f",
        work: { 1: "#2a0504", 2: "#6a0d0a", 3: "#7c0f0b", 4: "#9a130c" },
      },
      // Type scale tuned against the 1440px Figma frame. Change sizes here only.
      fontSize: {
        hero: ["clamp(30px,4vw,88px)", { lineHeight: "1", letterSpacing: "-0.05em" }],
        title: ["clamp(36px,4vw,88px)", { lineHeight: "1", letterSpacing: "-0.045em" }],
        faqtitle: ["clamp(28px,2.9vw,64px)", { lineHeight: "1.3", letterSpacing: "-0.04em" }],
        body: ["clamp(15px,1.45vw,26px)", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        service: ["clamp(24px,6.2vw,130px)", { lineHeight: "1.5", letterSpacing: "-0.045em" }],
        small: ["clamp(12px,1.05vw,18px)", { lineHeight: "1.3" }],
        mono: ["clamp(10px,0.85vw,14px)", { lineHeight: "1", letterSpacing: "0.02em" }],
      },
    },
  },
  plugins: [],
};
