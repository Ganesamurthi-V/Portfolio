"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Loader2, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { contact, site } from "@/content/site";
import { Reveal, RevealText } from "@/components/ui/reveal";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const channels = [
  { label: "Email", value: site.email, href: site.links.email, Icon: Mail, copy: site.email },
  { label: "Phone", value: site.phone, href: site.phoneHref, Icon: Phone, copy: site.phone },
  {
    label: "GitHub",
    value: "Ganesamurthi-V",
    href: site.links.github,
    Icon: GithubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "Ganesamurthi V",
    href: site.links.linkedin,
    Icon: LinkedinIcon,
    external: true,
  },
];

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "", company: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [copied, setCopied] = useState<string | null>(null);

  const update =
    (field: keyof typeof values) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  function validate() {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (values.message.trim().length < 10) {
      next.message = "A little more detail helps — at least 10 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function openMailClient() {
    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`);
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { ok: boolean; reason?: string; errors?: Errors };

      if (data.ok) {
        setStatus("sent");
        setValues({ name: "", email: "", message: "", company: "" });
        toast.success("Message sent", { description: "Thanks — I'll get back to you soon." });
        return;
      }

      if (data.reason === "invalid" && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }

      if (data.reason === "rate-limited") {
        setStatus("idle");
        toast.error("Too many attempts", {
          description: "Please try again in a few minutes, or email me directly.",
        });
        return;
      }

      setStatus("idle");
      toast.info("Opening your mail app", {
        description: `Your message is pre-filled for ${site.email}.`,
      });
      openMailClient();
    } catch {
      setStatus("idle");
      toast.info("Opening your mail app", {
        description: `Your message is pre-filled for ${site.email}.`,
      });
      openMailClient();
    }
  }

  async function copyValue(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      toast.success("Copied to clipboard");
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      toast.error("Could not copy — please select it manually.");
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 grid-lines opacity-50" />
        <div className="pixel-field absolute inset-x-0 top-0 h-[22rem] opacity-30" />
      </div>

      <Section id="contact" index="06" eyebrow="Contact" innerClassName="mt-0">
        <div className="shell">
          <div className="rule mb-8" aria-hidden="true" />

          <h2>
            <RevealText
              text={contact.heading}
              stagger={20}
              className="font-display text-[clamp(2.5rem,1.2rem+6vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
            />
          </h2>

          <Reveal delay={80}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {contact.body}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* form */}
            <Reveal>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="border border-hairline bg-surface p-6 sm:p-8"
              >
                <p className="eyebrow">Send a message</p>

                <div className="mt-7 space-y-6">
                  <Field
                    id="contact-name"
                    label="Name"
                    error={errors.name}
                    value={values.name}
                    onChange={update("name")}
                    autoComplete="name"
                    maxLength={80}
                  />
                  <Field
                    id="contact-email"
                    label="Email"
                    type="email"
                    error={errors.email}
                    value={values.email}
                    onChange={update("email")}
                    autoComplete="email"
                    maxLength={160}
                  />

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={values.message}
                      onChange={update("message")}
                      maxLength={4000}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      className={cn(
                        "mt-2.5 w-full resize-y border bg-surface-2 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground/45",
                        errors.message ? "border-destructive/60" : "border-hairline",
                      )}
                      placeholder="What are you building, and where could I help?"
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="mt-2 text-xs text-destructive">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Honeypot — hidden from users, catches naive bots. */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="contact-company">Company</label>
                    <input
                      id="contact-company"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.company}
                      onChange={update("company")}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {status === "sending" && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                  {status === "sent" && <Check className="size-4" aria-hidden="true" />}
                  {status === "sending" ? "Sending" : status === "sent" ? "Message sent" : "Send Message"}
                  {status === "idle" && (
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </button>

                <p className="mt-4 text-[0.6875rem] leading-relaxed text-muted-foreground">
                  Prefer email? Write to{" "}
                  <a href={site.links.email} className="link-underline text-foreground">
                    {site.email}
                  </a>
                  .
                </p>
              </form>
            </Reveal>

            {/* channels */}
            <Reveal delay={80}>
              <div>
                <p className="eyebrow">Direct channels</p>

                <ul className="mt-7 divide-y divide-[color:var(--hairline)] border-y border-hairline">
                  {channels.map(({ label, value, href, Icon, external, copy }) => (
                    <li key={label} className="flex items-center gap-4 py-5">
                      <span className="grid size-9 shrink-0 place-items-center border border-hairline bg-surface-2 text-silver-300">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
                          {label}
                        </span>
                        <a
                          href={href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noreferrer noopener" : undefined}
                          className="link-underline block truncate text-sm text-foreground sm:text-base"
                        >
                          {value}
                        </a>
                      </span>

                      {copy && (
                        <button
                          type="button"
                          onClick={() => copyValue(copy)}
                          aria-label={`Copy ${label.toLowerCase()}`}
                          className="grid size-8 shrink-0 place-items-center border border-hairline text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                        >
                          {copied === copy ? (
                            <Check className="size-3.5" aria-hidden="true" />
                          ) : (
                            <Copy className="size-3.5" aria-hidden="true" />
                          )}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-[0.75rem] leading-relaxed text-muted-foreground">
                  Based in {site.location}. Comfortable working remote across time zones.{" "}
                  <a
                    href={site.resume}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline text-foreground"
                  >
                    Resume
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ------------------------------------------------------------------ */

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

function Field({ id, label, error, className, ...props }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "mt-2.5 w-full border bg-surface-2 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground/45",
          error ? "border-destructive/60" : "border-hairline",
          className,
        )}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
