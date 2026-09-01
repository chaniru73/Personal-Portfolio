import {
  GithubLogo,
  LinkedinLogo,
  LocationIcon,
  MailIcon,
  UserIcon,
} from "@/components/icons";
import SiteFooter from "@/components/site-footer";

const contactDetails = [
  {
    label: "Name",
    value: "Chaniru Weerasuriya",
    icon: UserIcon,
  },
  {
    label: "Location",
    value: "Malabe, Sri Lanka",
    icon: LocationIcon,
  },
  {
    label: "Email",
    value: "chaniruweerasuriya@gmail.com",
    icon: MailIcon,
  },
] as const;

const profileLinks = [
  {
    label: "GitHub",
    href: "https://github.com/chaniru73",
    icon: GithubLogo,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chaniru-weerasuriya-a89607373",
    icon: LinkedinLogo,
  },
] as const;

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section-shell contact-panel page-panel relative flex flex-col"
    >
      <div className="relative mx-auto grid w-full max-w-6xl flex-1 gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="panel-column-left stagger-item stagger-delay-1">
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
              className="primary-button focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition sm:w-auto"
            >
              Send an Email
            </a>
          </div>
        </div>

        <aside
          aria-label="Contact information"
          className="panel-column-right stagger-item stagger-delay-2 surface-card contact-card min-w-0 rounded-2xl p-5 sm:p-6"
        >
          <dl className="grid min-w-0 gap-3">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;

              return (
                <div
                  key={detail.label}
                  className="soft-card min-w-0 rounded-xl px-4 py-3"
                >
                  <dt className="accent-text flex items-center gap-2 text-xs font-bold uppercase">
                    <Icon className="h-4 w-4" />
                    <span>{detail.label}</span>
                  </dt>
                  <dd className="card-title mt-1 break-words text-sm font-semibold leading-6">
                    {detail.value}
                  </dd>
                </div>
              );
            })}
          </dl>

          <div className="mt-5 flex min-w-0 flex-wrap gap-3">
            {profileLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} profile opens in a new tab`}
                  title={link.label}
                  className="social-icon-link focus-ring"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{link.label}</span>
                </a>
              );
            })}
          </div>
        </aside>
      </div>
      <SiteFooter />
    </section>
  );
}
