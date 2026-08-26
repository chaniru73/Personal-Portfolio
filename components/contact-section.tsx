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
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative border-t border-cyan-300/10 px-5 py-20 sm:px-8 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.08)]">
            Contact
          </p>

          <h2
            id="contact-title"
            className="max-w-3xl text-3xl font-bold tracking-normal text-white sm:text-4xl lg:text-5xl"
          >
            Let&apos;s connect and discuss opportunities.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            I&apos;m open to Software Engineering, Backend Development, Cloud, and
            DevOps internships or entry-level opportunities where I can learn,
            contribute, and gain practical industry experience.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:chaniruweerasuriya@gmail.com"
              aria-label="Send an email to Chaniru Weerasuriya"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.28)] transition hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
            >
              Send an Email
            </a>
          </div>
        </div>

        <aside
          aria-label="Contact information"
          className="min-w-0 rounded-lg border border-cyan-300/15 bg-slate-950/75 p-5 shadow-2xl shadow-cyan-950/25 backdrop-blur sm:p-6"
        >
          <dl className="grid min-w-0 gap-3">
            {contactDetails.map((detail) => (
              <div
                key={detail.label}
                className="min-w-0 rounded-lg border border-blue-300/15 bg-blue-300/[0.06] px-4 py-3"
              >
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                  {detail.label}
                </dt>
                <dd className="mt-1 break-words text-sm font-semibold leading-6 text-slate-100">
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
                className="min-w-0 rounded-lg border border-cyan-300/20 bg-cyan-300/[0.08] px-4 py-3 text-sm font-bold text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-300/[0.12] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                <span className="block">{link.label}</span>
                <span className="mt-1 block break-all text-xs font-medium leading-5 text-slate-300">
                  {link.href}
                </span>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
