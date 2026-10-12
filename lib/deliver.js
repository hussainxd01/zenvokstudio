import { contact } from "@/data/contact";

/**
 * Sends contact enquiries through Resend's REST API (plain fetch, no extra package).
 *
 * Env vars (.env.local locally, project settings on your host):
 *   RESEND_API_KEY        your Resend API key
 *   CONTACT_TO_EMAIL      where enquiries land (your inbox)
 *   CONTACT_FROM_EMAIL    sender address on your verified Resend domain, e.g. hello@yourdomain.com
 */
const ENDPOINT = "https://api.resend.com/emails";

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const oneLine = (s) => String(s).replace(/[\r\n]+/g, " ").trim();

export async function deliver({ name, email, phone, services, message }) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL;

  if (!key || !to || !sender) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Resend env vars missing, nothing sent (dev only)");
      return;
    }
    throw new Error("Resend is not configured (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL)");
  }

  const labels = services.map((id) => contact.services.find((s) => s.id === id)?.label ?? id).join(", ");
  const cleanName = oneLine(name);

  const text = [`Name: ${cleanName}`, `Email: ${email}`, `Phone: ${phone || "-"}`, `Services: ${labels}`, "", message].join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111">
      <p><strong>Name:</strong> ${esc(cleanName)}<br>
      <strong>Email:</strong> ${esc(email)}<br>
      <strong>Phone:</strong> ${esc(phone || "-")}<br>
      <strong>Services:</strong> ${esc(labels)}</p>
      <p style="white-space:pre-wrap">${esc(message)}</p>
    </div>`;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: sender.includes("<") ? sender : `ZENVOK Studio <${sender}>`,
      to: [to],
      reply_to: email, // hitting Reply answers the lead directly
      subject: `New enquiry from ${cleanName}`,
      text,
      html,
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}