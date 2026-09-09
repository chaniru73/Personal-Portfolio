import {
  DeployIcon,
  GithubLogo,
  LinkedinLogo,
  MailIcon,
} from "@/components/icons";
import MotionLink from "@/components/motion-link";
import MotionReveal from "@/components/motion-reveal";

const footerLinks = [
  {
    label: "GitHub",
    href: "https://github.com/chaniru73",
    icon: GithubLogo,
    external: true,
    ariaLabel: "Visit Chaniru Weerasuriyas GitHub profile",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chaniru-weerasuriya-a89607373",
    icon: LinkedinLogo,
    external: true,
    ariaLabel: "Visit Chaniru Weerasuriyas LinkedIn profile",
  },
  {
    label: "Email",
    href: "mailto:chaniruweerasuriya@gmail.com",
    icon: MailIcon,
    external: false,
    ariaLabel: "Email Chaniru Weerasuriya",
  },
] as const;

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <MotionReveal
      as="footer"
      variant="fade-up"
      delay={120}
      className="site-footer-shell"
    >
      <div className="site-footer-inner">
        <MotionReveal delay={180}>
          <MotionLink
            href="#home"
            aria-label="Back to top"
            className="site-footer-back-to-top focus-ring"
            interaction="subtle"
          >
            <DeployIcon className="h-4 w-4" aria-hidden="true" />
            <span>Back to top</span>
          </MotionLink>
        </MotionReveal>

        <MotionReveal className="site-footer-identity" delay={240}>
          <p className="site-footer-name">Chaniru Weerasuriya</p>
          <p className="site-footer-location">Malabe, Sri Lanka</p>
        </MotionReveal>

        <MotionReveal delay={300}>
          <nav aria-label="Footer contact links">
            <ul className="site-footer-socials">
              {footerLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.label}>
                    <MotionLink
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      aria-label={link.ariaLabel}
                      title={link.label}
                      className="social-icon-button site-footer-social-link focus-ring"
                      interaction="icon"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{link.label}</span>
                    </MotionLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </MotionReveal>

        <MotionReveal className="site-footer-meta" delay={380}>
          <p>&copy; {currentYear} Chaniru Weerasuriya. All Rights Reserved.</p>
          <p>Built with Next.js, TypeScript, and Tailwind CSS.</p>
        </MotionReveal>
      </div>
    </MotionReveal>
  );
}
