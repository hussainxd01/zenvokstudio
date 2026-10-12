
// Canonical site URL (no trailing slash). Override with NEXT_PUBLIC_SITE_URL if the domain changes.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://zenvokstudio.in").replace(/\/$/, "");