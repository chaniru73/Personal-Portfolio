import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import EducationSection from "@/components/education-section";
import ProjectsSection from "@/components/projects-section";
import RevealOnScroll from "@/components/reveal-on-scroll";
import SiteFooter from "@/components/site-footer";
import SiteNavigation from "@/components/site-navigation";
import SkillsSection from "@/components/skills-section";

export default function Home() {
  const workflow = ["Code", "Build", "Deploy", "Monitor"];

  return (
    <div className="page-shell relative flex min-h-screen flex-col overflow-x-hidden">
      <header className="site-header fixed inset-x-0 top-0 z-[100] backdrop-blur">
        <SiteNavigation />
      </header>

      <main className="main-stack relative z-10 flex flex-1 flex-col">
        <RevealOnScroll variant="scale-in">
          <section
            id="home"
            aria-labelledby="hero-title"
            className="hero-section page-panel mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center"
          >
            <div className="max-w-3xl">
              <p className="hero-sequence hero-delay-1 eyebrow mb-5 inline-flex rounded-full px-4 py-2 text-sm font-medium">
                Hello, I&apos;m
              </p>

              <h1
                id="hero-title"
                className="hero-sequence hero-delay-2 hero-title text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl"
              >
                Chaniru Weerasuriya
              </h1>

              <p className="hero-sequence hero-delay-3 accent-text mt-5 max-w-2xl text-xl font-semibold leading-8 sm:text-2xl">
                Software Engineering Undergraduate | Aspiring Cloud & DevOps
                Engineer
              </p>

              <p className="hero-sequence hero-delay-4 body-copy mt-6 max-w-2xl text-base leading-8 sm:text-lg">
                I&apos;m a Software Engineering undergraduate at NSBM Green
                University with a growing focus on Cloud and DevOps. I enjoy
                building practical applications, exploring backend systems, and
                learning how modern software is developed, deployed, and
                maintained.
              </p>

              <p className="hero-sequence hero-delay-5 accent-text mt-5 text-sm font-bold uppercase tracking-[0.16em]">
                Malabe, Sri Lanka
              </p>

              <div className="hero-sequence hero-delay-6 mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://github.com/chaniru73"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Explore my work on GitHub, opens in a new tab"
                  className="primary-button focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-bold transition sm:w-auto"
                >
                  Explore My Work
                </a>
                <a
                  href="mailto:chaniruweerasuriya@gmail.com"
                  aria-label="Contact me by email"
                  className="secondary-button focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-bold transition sm:w-auto"
                >
                  Contact Me
                </a>
              </div>

              <div
                aria-label="Social links"
                className="hero-sequence hero-delay-7 mt-8 flex flex-wrap gap-4 text-sm font-semibold"
              >
                <a
                  href="https://github.com/chaniru73"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile opens in a new tab"
                  className="text-link focus-ring rounded-md underline underline-offset-4 transition"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/chaniru-weerasuriya-a89607373"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile opens in a new tab"
                  className="text-link focus-ring rounded-md underline underline-offset-4 transition"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <aside
              aria-label="CW profile placeholder and software delivery workflow"
              className="hero-visual flex flex-col items-center justify-center gap-8"
            >
              <div className="profile-orbit relative flex items-center justify-center">
                <span aria-hidden="true" className="orbit-marker orbit-marker-one" />
                <span aria-hidden="true" className="orbit-marker orbit-marker-two" />
                <div className="profile-placeholder flex aspect-square w-full max-w-[280px] items-center justify-center rounded-full sm:max-w-[340px]">
                <div className="flex h-[76%] w-[76%] items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-white/80">
                  <span className="text-6xl font-bold tracking-normal sm:text-7xl">
                    CW
                  </span>
                </div>
              </div>
              </div>

              <ol className="grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-4">
                {workflow.map((step, index) => (
                  <li
                    key={step}
                    className="workflow-label soft-card rounded-lg px-3 py-3 text-center text-sm font-bold text-[var(--color-accent-strong)]"
                  >
                    <span className="block text-xs text-[var(--color-body)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </aside>
          </section>
        </RevealOnScroll>
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
