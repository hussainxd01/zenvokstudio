/**
 * Where enquiries go. Not configured yet.
 * In development it just succeeds so you can test the form.
 * In production it throws until you wire up a provider, so no lead is silently lost.
 */
export async function deliver(enquiry) {
  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] enquiry received (dev only, nothing sent)");
    return;
  }
  // TODO: send `enquiry` via your provider (Resend, Nodemailer, ...) or save it to MongoDB
  throw new Error("Contact delivery is not configured");
}