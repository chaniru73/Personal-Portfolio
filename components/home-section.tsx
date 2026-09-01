import {
  BuildIcon,
  CodeIcon,
  DeployIcon,
  GithubLogo,
  LinkedinLogo,
  MonitorIcon,
} from "@/components/icons";

const workflow = [
  { label: "Code", icon: CodeIcon },
  { label: "Build", icon: BuildIcon },
  { label: "Deploy", icon: DeployIcon },
  { label: "Monitor", icon: MonitorIcon },
] as const;

export default function HomeSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="hero-section page-panel mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-center"
    >
      <div className="max-w-3xl">
        <p className="hero-sequence hero-delay-1 availability-pill mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
          <span aria-hidden="true" className="availability-dot" />
          Hello, I&apos;m
        </p>

        <h1
          id="hero-title"
          className="hero-sequence hero-delay-2 hero-title text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl"
        >
          Chaniru <span className="text-emerald">Weerasuriya</span>
        </h1>

        <p className="hero-sequence hero-delay-3 accent-text mt-5 max-w-2xl text-xl font-semibold leading-8 sm:text-2xl">
          Software Engineering Undergraduate | Aspiring Cloud &amp; DevOps
          Engineer
        </p>

        <p className="hero-sequence hero-delay-4 body-copy mt-5 max-w-2xl text-base leading-8 sm:text-lg">
          I&apos;m a Software Engineering undergraduate at NSBM Green University
          with a growing focus on Cloud and DevOps. I enjoy building practical
          applications, exploring backend systems, and learning how modern
          software is developed, deployed, and maintained.
        </p>

        <p className="hero-sequence hero-delay-5 location-label mt-5 text-sm font-bold uppercase">
          Malabe, Sri Lanka
        </p>

        <div className="hero-sequence hero-delay-6 mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://github.com/chaniru73"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore my work on GitHub, opens in a new tab"
            className="primary-button focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition sm:w-auto"
          >
            Explore My Work
          </a>
          <a
            href="mailto:chaniruweerasuriya@gmail.com"
            aria-label="Contact me by email"
            className="secondary-button focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition sm:w-auto"
          >
            Contact Me
          </a>
        </div>

        <div
          aria-label="Social links"
          className="hero-sequence hero-delay-7 mt-7 flex flex-wrap gap-3"
        >
          <a
            href="https://github.com/chaniru73"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile opens in a new tab"
            title="GitHub"
            className="social-icon-link focus-ring"
          >
            <GithubLogo className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/chaniru-weerasuriya-a89607373"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile opens in a new tab"
            title="LinkedIn"
            className="social-icon-link focus-ring"
          >
            <LinkedinLogo className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>

      <aside
        aria-label="CW profile placeholder and software delivery workflow"
        className="hero-visual flex flex-col items-center justify-center gap-6"
      >
        <div className="profile-orbit relative flex items-center justify-center">
          <span aria-hidden="true" className="orbit-ring" />
          <span aria-hidden="true" className="orbit-marker orbit-marker-one" />
          <span aria-hidden="true" className="orbit-marker orbit-marker-two" />
          <span aria-hidden="true" className="orbit-node orbit-node-one" />
          <span aria-hidden="true" className="orbit-node orbit-node-two" />
          <div className="profile-placeholder flex aspect-square w-full max-w-[300px] items-center justify-center rounded-full sm:max-w-[330px]">
            <span className="cw-mark text-6xl font-bold tracking-normal sm:text-7xl">
              CW
            </span>
          </div>
        </div>

        <ol className="grid w-full max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
          {workflow.map((step, index) => {
            const Icon = step.icon;

            return (
              <li
                key={step.label}
                className="workflow-label soft-card rounded-xl px-3 py-3 text-center text-sm font-bold"
              >
                <span className="icon-bubble mx-auto mb-2">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="block text-xs text-[var(--color-text-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step.label}
              </li>
            );
          })}
        </ol>
      </aside>
    </section>
  );
}
