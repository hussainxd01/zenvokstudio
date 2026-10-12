import { deliver } from "@/lib/deliver";
import { contact } from "@/data/contact";

const json = (body, status = 200) => Response.json(body, { status });
const VALID_SERVICES = contact.services.map((s) => s.id);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  // honeypot: real users never fill this hidden field
  if (body.company) return json({ ok: true });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();
  const services = Array.isArray(body.services) ? body.services.filter((s) => VALID_SERVICES.includes(s)) : [];

  if (!name || name.length > 120) return json({ error: "Invalid name" }, 400);
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 200) return json({ error: "Invalid e-mail" }, 400);
  if (phone.length > 40) return json({ error: "Invalid phone" }, 400);
  if (!services.length) return json({ error: "Choose a service" }, 400);
  if (message.length < 10 || message.length > contact.messageMax) return json({ error: "Invalid message" }, 400);
  if (body.consent !== true) return json({ error: "Consent required" }, 400);

  try {
    await deliver({ name, email, phone, services, message });
    return json({ ok: true });
  } catch (err) {
    // shows the real reason in Vercel > Logs (never sent to the browser)
    console.error("[contact] send failed:", err.message);
    return json({ error: "Could not send" }, 500);
  }
}