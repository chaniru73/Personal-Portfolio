import {
  GithubLogo,
  LinkedinLogo,
  LocationIcon,
  MailIcon,
  UserIcon,
} from "@/components/icons";
import MotionLink from "@/components/motion-link";
import MotionReveal from "@/components/motion-reveal";

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
      tabIndex={-1}
      aria-labelledby="contact-title"
      className="section-shell contact-panel section-frame page-panel relative px-5 py-8 sm:px-8"
    >
      <div className="content-container relative mx-auto grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <MotionReveal variant="fade-left">
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
            <MotionLink
              href="mailto:chaniruweerasuriya@gmail.com"
              aria-label="Send an email to Chaniru Weerasuriya"
              className="primary-button focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition sm:w-auto"
              interaction="button"
            >
              Send an Email
            </MotionLink>
          </div>
        </MotionReveal>

        <aside
          aria-label="Contact information"
          className="surface-card contact-card min-w-0 rounded-2xl p-5 sm:p-6"
        >
          <dl className="grid min-w-0 gap-3">
            {contactDetails.map((detail, index) => {
              const Icon = detail.icon;

              return (
                <MotionReveal
                  as="div"
                  key={detail.label}
                  delay={220 + index * 80}
                  className="detail-row min-w-0"
                >
                  <dt className="accent-text flex items-center gap-2 text-xs font-bold uppercase">
                    <Icon className="h-4 w-4" />
                    <span>{detail.label}</span>
                  </dt>
                  <dd className="card-title mt-2 break-words text-base font-semibold leading-7">
                    {detail.label === "Email" ? (
                      <MotionLink href={`mailto:${detail.value}`} className="email-link focus-ring">
                        {detail.value}
                      </MotionLink>
                    ) : detail.value}
                  </dd>
                </MotionReveal>
              );
            })}
          </dl>

          <MotionReveal delay={500} className="mt-5 flex min-w-0 flex-wrap gap-3">
            {profileLinks.map((link) => {
              const Icon = link.icon;

              return (
                <MotionLink
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} profile opens in a new tab`}
                  title={link.label}
                  className="social-icon-link focus-ring"
                  interaction="icon"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{link.label}</span>
                </MotionLink>
              );
            })}
          </MotionReveal>
        </aside>
      </div>
    </section>
  );
}
