"use client";

import { type FormEvent, useState } from "react";

import MotionReveal from "@/components/motion-reveal";

const contactEmail = "chaniruweerasuriya@gmail.com";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

function validateForm(form: HTMLFormElement) {
  const data = new FormData(form);
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  const errors: FieldErrors = {};

  if (!name) errors.name = "Enter your name.";
  if (!email) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!message) errors.message = "Enter a message.";

  return { data: { name, email, phone, message }, errors };
}

export default function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateForm(event.currentTarget);
    setErrors(result.errors);

    const firstError = Object.keys(result.errors)[0] as keyof FieldErrors | undefined;
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus();
      return;
    }

    const { name, email, phone, message } = result.data;
    const subject = `Portfolio contact from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <MotionReveal className="contact-field" delay={240}>
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name ? (
          <p id="contact-name-error" className="contact-field-error" role="alert">
            {errors.name}
          </p>
        ) : null}
      </MotionReveal>

      <MotionReveal className="contact-field" delay={310}>
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email ? (
          <p id="contact-email-error" className="contact-field-error" role="alert">
            {errors.email}
          </p>
        ) : null}
      </MotionReveal>

      <MotionReveal className="contact-field" delay={380}>
        <label htmlFor="contact-phone">
          Phone number <span>(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
        />
      </MotionReveal>

      <MotionReveal className="contact-field" delay={450}>
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={3}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message ? (
          <p id="contact-message-error" className="contact-field-error" role="alert">
            {errors.message}
          </p>
        ) : null}
      </MotionReveal>

      <MotionReveal className="contact-submit-row" delay={520}>
        <button type="submit" className="contact-submit focus-ring">
          Prepare Email
        </button>
        <p className="contact-form-note">
          This opens your email application with the message prepared. It is not
          sent automatically.
        </p>
      </MotionReveal>
    </form>
  );
}
