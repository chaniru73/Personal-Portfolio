import { DeployIcon, GithubLogo, LinkedinLogo } from "@/components/icons";
import MotionLink from "@/components/motion-link";
import MotionReveal from "@/components/motion-reveal";

const footerLinks = [
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

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <MotionReveal
      as="footer"
      variant="fade-up"
      delay={120}
      className="footer-shell relative z-10 px-5 py-5 text-sm sm:px-8"
    >
      <div className="content-container mx-auto flex w-full flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="font-semibold text-white">
            &copy; {currentYear} Chaniru Weerasuriya.
          </p>
          <p className="mt-2 leading-6">
            Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex min-w-0 flex-wrap items-center gap-3 font-semibold">
            <li>
              <MotionLink
                href="#home"
                className="text-link back-to-top focus-ring rounded-md transition"
                interaction="subtle"
              >
                <DeployIcon className="h-4 w-4" />
                Back to top
              </MotionLink>
            </li>
            {footerLinks.map((link) => {
              const Icon = link.icon;

              return (
                <li key={link.label}>
                  <MotionLink
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} profile opens in a new tab`}
                    title={link.label}
                    className="social-icon-link social-icon-link-sm focus-ring"
                    interaction="icon"
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span className="sr-only">{link.label}</span>
                  </MotionLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </MotionReveal>
  );
}
