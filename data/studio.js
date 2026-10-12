// Studio page copy. Edit here, not in components.
export const studioPage = {
    title: "THE\nSTUDIO",
    statement: "A digital studio that builds websites and experiences for ambitious brands.",

    // type: "video" | "image" | "slideshow" (slideshow uses `sources: [{ src, alt }]`)
    media: {
        type: "video",
        src: "/showreel.mp4",
        title: "Showreel",
        playText: "Play Reel",
        closeText: "Close Reel",
    },

    about: {
        label: "(01) Who we are",
        lead: "We combine strategy, design, and technology to create clear, purposeful digital experiences that help our clients grow.",
        body: "We believe great digital work should look good, feel effortless, and serve a purpose. From strategy to the final interaction, we build websites that help ambitious brands communicate clearly, connect with their audience, and grow.",
    },
    principles: {
        label: "(02) How we work",
        items: ["Clear strategy", "Thoughtful design", "Built to perform"],
    },
    stat: { label: "(03) At a glance", value: "5+", text: "digital experiences" },
    cta: { text: "Have a project in mind?", label: "Let's talk", href: "/contact" },
};