import RevealOnScroll from "@/components/reveal-on-scroll";

const contactDetails = [
  {
    label: "Name",
    value: "Chaniru Weerasuriya",
  },
  {
    label: "Location",
    value: "Malabe, Sri Lanka",
  },
  {
    label: "Email",
    value: "chaniruweerasuriya@gmail.com",
  },
] as const;

const profileLinks = [
  {
    label: "GitHub",
    href: "https://github.com/chaniru73",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chaniru-weerasuriya-a89607373",
  },
] as const;

export default function ContactSection() {
  return (
    <RevealOnScroll delay={240} variant="fade-left">
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="section-shell page-panel relative px-5 py-20 sm:px-8 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="section-divider pointer-events-none absolute inset-x-0 top-0 h-px"
        />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="stagger-item stagger-delay-1">
          <p className="eyebrow mb-5 inline-flex rounded-full px-4 py-2 text-sm font-medium">
            Contact
          </p>

          <h2
            id="contact-title"
            className="section-title max-w-3xl text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl"
          >
            Let&apos;s connect and discuss opportunities.
          </h2>

          <p className="body-copy mt-6 max-w-2xl text-base leading-8 sm:text-lg">
            I&apos;m open to Software Engineering, Backend Development, Cloud, and
            DevOps internships or entry-level opportunities where I can learn,
            contribute, and gain practical industry experience.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:chaniruweerasuriya@gmail.com"
              aria-label="Send an email to Chaniru Weerasuriya"
              className="primary-button focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-bold transition sm:w-auto"
            >
              Send an Email
            </a>
          </div>
        </div>

        <aside
          aria-label="Contact information"
          className="stagger-item stagger-delay-2 surface-card min-w-0 rounded-lg p-5 sm:p-6"
        >
          <dl className="grid min-w-0 gap-3">
            {contactDetails.map((detail) => (
              <div
                key={detail.label}
                className="soft-card min-w-0 rounded-lg px-4 py-3"
              >
                <dt className="accent-text text-xs font-bold uppercase tracking-[0.16em]">
                  {detail.label}
                </dt>
                <dd className="card-title mt-1 break-words text-sm font-semibold leading-6">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2">
            {profileLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} profile opens in a new tab`}
                className="soft-card focus-ring min-w-0 rounded-lg px-4 py-3 text-sm font-bold text-[var(--color-accent-strong)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-light)]"
              >
                <span className="block">{link.label}</span>
                <span className="body-copy mt-1 block break-all text-xs font-medium leading-5">
                  {link.href}
                </span>
              </a>
            ))}
          </div>
        </aside>
        </div>
      </section>
    </RevealOnScroll>
  );
}
