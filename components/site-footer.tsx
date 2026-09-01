import { GithubLogo, LinkedinLogo } from "@/components/icons";
import RevealOnScroll from "@/components/reveal-on-scroll";

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
    <RevealOnScroll
      as="footer"
      delay={80}
      className="footer-shell relative z-10 px-5 py-5 text-sm sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
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
              <a
                href="#home"
                className="text-link focus-ring rounded-md transition"
              >
                Back to top
              </a>
            </li>
            {footerLinks.map((link) => {
              const Icon = link.icon;

              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} profile opens in a new tab`}
                    title={link.label}
                    className="social-icon-link social-icon-link-sm focus-ring"
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span className="sr-only">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </RevealOnScroll>
  );
}
