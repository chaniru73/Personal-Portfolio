const footerLinks = [
  {
    label: "GitHub",
    href: "https://github.com/chaniru73",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chaniru-weerasuriya-a89607373",
  },
] as const;

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-shell relative z-10 px-5 py-8 text-sm sm:px-8">
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
          <ul className="flex min-w-0 flex-wrap gap-4 font-semibold">
            <li>
              <a
                href="#home"
                className="text-link focus-ring rounded-md underline underline-offset-4 transition hover:text-white"
              >
                Back to top
              </a>
            </li>
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} profile opens in a new tab`}
                  className="text-link focus-ring rounded-md underline underline-offset-4 transition hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
