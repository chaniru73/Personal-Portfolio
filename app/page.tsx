import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import EducationSection from "@/components/education-section";
import ProjectsSection from "@/components/projects-section";
import SiteFooter from "@/components/site-footer";
import SkillsSection from "@/components/skills-section";

export default function Home() {
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  const workflow = ["Code", "Build", "Deploy", "Monitor"];

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#020617] text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56, 189, 248, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-700/20 blur-3xl"
      />

      <header className="relative z-10 border-b border-cyan-300/10 bg-slate-950/70 backdrop-blur">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
        >
          <a
            href="#home"
            aria-label="CW home"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-sm font-bold tracking-wide text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.18)] transition hover:border-cyan-200/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          >
            CW
          </a>

          <details className="relative md:hidden">
            <summary className="cursor-pointer rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm font-bold text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-300/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
              Menu
            </summary>
            <ul className="absolute right-0 top-full z-20 mt-3 grid w-52 max-w-[calc(100vw-2.5rem)] gap-1 rounded-lg border border-cyan-300/15 bg-slate-950/95 p-2 text-sm font-medium text-slate-300 shadow-2xl shadow-cyan-950/30 backdrop-blur">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-label={link.label}
                    className="block rounded-lg px-3 py-2 transition hover:bg-cyan-300/10 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          <ul className="hidden flex-wrap items-center justify-end gap-2 text-sm font-medium text-slate-300 md:flex md:gap-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  className="rounded-lg px-3 py-2 transition hover:bg-cyan-300/10 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        <section
          id="home"
          aria-labelledby="hero-title"
          className="mx-auto grid min-h-[calc(100vh-77px)] w-full max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-28"
        >
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.08)]">
              Hello, I&apos;m
            </p>

            <h1
              id="hero-title"
              className="text-4xl font-bold tracking-normal text-white sm:text-5xl lg:text-6xl"
            >
              Chaniru Weerasuriya
            </h1>

            <p className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-cyan-100 sm:text-2xl">
              Software Engineering Undergraduate | Aspiring Cloud & DevOps
              Engineer
            </p>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              I&apos;m a Software Engineering undergraduate at NSBM Green University
              with a growing focus on Cloud and DevOps. I enjoy building
              practical applications, exploring backend systems, and learning
              how modern software is developed, deployed, and maintained.
            </p>

            <p className="mt-5 text-sm font-medium uppercase tracking-[0.16em] text-blue-200">
              Malabe, Sri Lanka
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/chaniru73"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Explore my work on GitHub, opens in a new tab"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.28)] transition hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                Explore My Work
              </a>
              <a
                href="mailto:chaniruweerasuriya@gmail.com"
                aria-label="Contact me by email"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-blue-300/30 px-5 py-3 text-sm font-bold text-blue-100 transition hover:border-blue-200/60 hover:bg-blue-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                Contact Me
              </a>
            </div>

            <div
              aria-label="Social links"
              className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-slate-300"
            >
              <a
                href="https://github.com/chaniru73"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile opens in a new tab"
                className="rounded-md text-cyan-100 underline decoration-cyan-300/40 underline-offset-4 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/chaniru-weerasuriya-a89607373"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile opens in a new tab"
                className="rounded-md text-cyan-100 underline decoration-cyan-300/40 underline-offset-4 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <aside
            aria-label="Software delivery workflow: Code, Build, Deploy, Monitor"
            className="rounded-2xl border border-cyan-300/15 bg-slate-950/70 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur sm:p-6"
          >
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              <ol className="space-y-4">
                {workflow.map((step, index) => (
                  <li key={step} className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 font-mono text-sm font-bold text-cyan-100">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 rounded-lg border border-blue-300/15 bg-blue-300/[0.06] px-4 py-3 text-sm font-semibold text-slate-100">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-6 rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 font-mono text-xs leading-6 text-emerald-100">
                workflow.status = &quot;learning and building&quot;
              </div>
            </div>
          </aside>
        </section>
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
