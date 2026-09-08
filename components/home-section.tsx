import {
  BuildIcon,
  CodeIcon,
  DeployIcon,
  GithubLogo,
  LinkedinLogo,
  MonitorIcon,
} from "@/components/icons";
import HomeAnimation from "@/components/home-animation";
import MotionLink from "@/components/motion-link";

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
      data-home-animation-root
      tabIndex={-1}
      aria-labelledby="hero-title"
      className="hero-section hero-inner section-frame page-panel content-container mx-auto grid w-full px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
    >
      <HomeAnimation />
      <div className="hero-copy max-w-3xl">
        <p
          className="hero-gsap-item hero-greeting availability-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
        >
          <span aria-hidden="true" className="availability-dot" />
          Hello, I&apos;m
        </p>

        <h1
          id="hero-title"
          className="hero-gsap-item hero-name hero-title text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl"
        >
          Chaniru <span className="text-emerald block">Weerasuriya</span>
        </h1>

        <p
          className="hero-gsap-item hero-role accent-text max-w-2xl text-xl font-semibold leading-8 sm:text-2xl"
        >
          Software Engineering Undergraduate | Aspiring Cloud &amp; DevOps
          Engineer
        </p>

        <p
          className="hero-gsap-item hero-introduction body-copy max-w-2xl text-base leading-8 sm:text-lg"
        >
          I&apos;m a Software Engineering undergraduate at NSBM Green University
          with a growing focus on Cloud and DevOps. I enjoy building practical
          applications, exploring backend systems, and learning how modern
          software is developed, deployed, and maintained.
        </p>

        <p
          className="hero-gsap-item hero-location location-label text-sm font-bold uppercase"
        >
          Malabe, Sri Lanka
        </p>

        <div
          className="hero-gsap-item hero-actions flex flex-col gap-3 sm:flex-row"
        >
          <MotionLink
            href="#projects"
            aria-label="Explore my work projects"
            className="primary-button focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition sm:w-auto"
            interaction="button"
          >
            Explore My Work
          </MotionLink>
          <MotionLink
            href="#contact"
            aria-label="Contact me"
            className="secondary-button focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition sm:w-auto"
            interaction="button"
          >
            Contact Me
          </MotionLink>
        </div>

        <div
          aria-label="Social links"
          className="hero-gsap-item hero-socials flex flex-wrap gap-3"
        >
          <MotionLink
            href="https://github.com/chaniru73"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile opens in a new tab"
            title="GitHub"
            className="social-icon-link focus-ring"
            interaction="icon"
          >
            <GithubLogo className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </MotionLink>
          <MotionLink
            href="https://www.linkedin.com/in/chaniru-weerasuriya-a89607373"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile opens in a new tab"
            title="LinkedIn"
            className="social-icon-link focus-ring"
            interaction="icon"
          >
            <LinkedinLogo className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </MotionLink>
        </div>
      </div>

      <aside
        aria-label="CW monogram and software delivery workflow"
        className="hero-visual flex flex-col items-center justify-center gap-6"
      >
        <div
          className="profile-orbit relative flex items-center justify-center"
        >
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

        <ol className="hero-workflow grid w-full max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
          {workflow.map((step, index) => {
            const Icon = step.icon;

            return (
              <li
                key={step.label}
                className="hero-workflow-card workflow-label soft-card rounded-xl px-3 py-3 text-center text-sm font-bold"
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
