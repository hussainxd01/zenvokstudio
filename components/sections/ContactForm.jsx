"use client";
import { useRef, useState } from "react";
import MaskedText from "@/components/ui/MaskedText";
import { contact } from "@/data/contact";

const labelCls = "mb-2 block text-[clamp(13px,1vw,16px)]";
const inputCls =
  "w-full border border-black/25 bg-transparent px-4 text-[clamp(14px,1.05vw,17px)] outline-none transition-colors placeholder:text-black/40 focus:border-black aria-[invalid=true]:border-accent";

function Field({ id, label, required, error, children }) {
  return (
    <div data-reveal className="opacity-0">
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && "*"}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-[13px] text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const formRef = useRef(null);
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "", company: "" }); // company = honeypot
  const [services, setServices] = useState([]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const toggle = (id) => setServices((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const validate = () => {
    const er = {};
    if (!values.name.trim()) er.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) er.email = "Enter a valid e-mail address";
    if (!services.length) er.services = "Choose at least one service";
    if (values.message.trim().length < 10) er.message = "Tell us a little about your project";
    if (!consent) er.consent = "Please confirm to continue";
    return er;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) {
      requestAnimationFrame(() => formRef.current?.querySelector("[aria-invalid='true']")?.focus());
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, services, consent }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues({ name: "", email: "", phone: "", message: "", company: "" });
    setServices([]);
    setConsent(false);
    setErrors({});
    setStatus("idle");
  };

  if (status === "sent")
    return (
      <div className="py-[10vw] md:py-[5vw]" role="status">
        <MaskedText as="h3" text={contact.successTitle} className="text-title font-bold" />
        <MaskedText text={contact.successBody} delay={0.2} className="mt-6 text-[clamp(15px,1.2vw,20px)] text-black/70" />
        <button onClick={reset} className="mt-8 text-[clamp(13px,1vw,16px)] underline underline-offset-4 transition-opacity hover:opacity-60">
          Send another message
        </button>
      </div>
    );

  const sending = status === "sending";
  const invalid = (k) => (errors[k] ? "true" : undefined);
  const described = (k) => (errors[k] ? `${k}-err` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-7">
      <MaskedText as="p" text={contact.intro} className="text-[clamp(14px,1.1vw,18px)]" />

      <div data-reveal className="flex items-baseline justify-between text-[clamp(13px,1vw,16px)] opacity-0">
        <span className="text-black/55">{contact.generalLabel}</span>
        <span>{contact.required}</span>
      </div>

      <div className="grid gap-x-2 gap-y-6 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name}>
          <input id="name" value={values.name} onChange={set("name")} autoComplete="name" placeholder="Enter name" aria-invalid={invalid("name")} aria-describedby={described("name")} className={`${inputCls} h-[52px]`} />
        </Field>
        <Field id="email" label="E-mail address" required error={errors.email}>
          <input id="email" type="email" value={values.email} onChange={set("email")} autoComplete="email" placeholder="Enter e-mail address" aria-invalid={invalid("email")} aria-describedby={described("email")} className={`${inputCls} h-[52px]`} />
        </Field>
      </div>

      <Field id="phone" label="Phone number (optional)">
        <input id="phone" type="tel" value={values.phone} onChange={set("phone")} autoComplete="tel" placeholder="Enter phone number" className={`${inputCls} h-[52px]`} />
      </Field>

      {/* honeypot: hidden from people, bots fill it */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" value={values.company} onChange={set("company")} className="hidden" />

      <hr data-reveal className="border-black/20 opacity-0" />

      <div data-reveal className="text-[clamp(13px,1vw,16px)] text-black/55 opacity-0">
        {contact.projectLabel}
      </div>

      <div data-reveal className="opacity-0">
        <p id="services-label" className={labelCls}>
          {contact.servicesLabel}* <span className="text-black/55">{contact.servicesHint}</span>
        </p>
        <div role="group" aria-labelledby="services-label" className="grid gap-2 sm:grid-cols-3">
          {contact.services.map((s) => {
            const on = services.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s.id)}
                className={`h-[52px] border px-3 text-[clamp(13px,1vw,16px)] transition-colors duration-300 ${
                  on ? "border-black bg-black text-white" : "border-black/25 hover:border-black"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        {errors.services && (
          <p role="alert" className="mt-1.5 text-[13px] text-accent">
            {errors.services}
          </p>
        )}
      </div>

      <Field id="message" label={contact.messageLabel} required error={errors.message}>
        <textarea
          id="message"
          rows={6}
          maxLength={contact.messageMax}
          value={values.message}
          onChange={set("message")}
          placeholder="Write a description"
          aria-invalid={invalid("message")}
          aria-describedby={described("message")}
          className={`${inputCls} resize-y py-3.5`}
        />
        <p className="mt-1.5 text-right text-[12px] text-black/45">
          {values.message.length}/{contact.messageMax}
        </p>
      </Field>

      <div data-reveal className="opacity-0">
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="peer sr-only" aria-invalid={invalid("consent")} />
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-black/40 text-transparent transition-colors peer-checked:border-black peer-checked:bg-black peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-black/40 peer-focus-visible:ring-offset-2">
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M1 4.5l3.5 3.5L11 1" />
            </svg>
          </span>
          <span className="text-[clamp(13px,1vw,16px)] leading-snug text-black/70">{contact.consent}</span>
        </label>
        {errors.consent && (
          <p role="alert" className="mt-1.5 text-[13px] text-accent">
            {errors.consent}
          </p>
        )}
      </div>

      <div data-reveal className="opacity-0">
        <button
          type="submit"
          disabled={sending}
          className="h-[56px] w-full border border-black bg-black text-[clamp(13px,1vw,16px)] uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-white hover:text-black disabled:opacity-60"
        >
          {sending ? contact.sending : contact.submit}
        </button>
        {status === "error" && (
          <p role="alert" className="mt-3 text-[13px] text-accent">
            Something went wrong. Please try again, or e-mail us at {contact.details.email}.
          </p>
        )}
      </div>
    </form>
  );
}