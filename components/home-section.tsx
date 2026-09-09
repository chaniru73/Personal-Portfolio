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
import Image from "next/image";

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
      className="hero-section home-split-section section-frame page-panel w-full"
    >
      <HomeAnimation />
      <div className="home-hero-upper">
        <div aria-hidden="true" className="home-hero-background">
          <span className="home-diagonal-light" />
        </div>

        <div className="home-upper-content">
          <div className="hero-copy home-light-content">
            <p
              className="hero-gsap-item hero-greeting availability-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            >
              <span aria-hidden="true" className="availability-dot" />
              Hello, I&apos;m
            </p>

            <h1
              id="hero-title"
              className="hero-name hero-title text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl"
            >
              <span className="hero-gsap-item hero-first-name block">Chaniru</span>
              <span className="hero-gsap-item hero-surname block">Weerasuriya</span>
            </h1>

            <p
              className="hero-gsap-item hero-role accent-text max-w-2xl text-xl font-semibold leading-8 sm:text-2xl"
            >
              <span className="home-role-line">
                Software Engineering Undergraduate |
              </span>
              <span className="home-role-line">
                Aspiring Cloud &amp; DevOps Engineer
              </span>
            </p>

            <p
              className="hero-gsap-item hero-location location-label text-sm font-bold"
            >
              Malabe, Sri Lanka
            </p>

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
            aria-label="Portrait of Chaniru Weerasuriya and software delivery workflow"
            className="hero-visual home-dark-content flex flex-col items-center justify-center"
          >
            <div
              className="profile-orbit relative flex aspect-square items-center justify-center"
            >
              <span aria-hidden="true" className="orbit-ring" />
              <span aria-hidden="true" className="orbit-marker orbit-marker-one" />
              <span aria-hidden="true" className="orbit-marker orbit-marker-two" />
              <span aria-hidden="true" className="orbit-node orbit-node-one" />
              <span aria-hidden="true" className="orbit-node orbit-node-two" />
              <div className="profile-portrait-frame aspect-square rounded-full">
                <Image
                  src="/images/chaniru-profile.jpeg"
                  alt="Portrait of Chaniru Weerasuriya"
                  width={971}
                  height={1280}
                  sizes="(max-width: 767px) 280px, (max-width: 1279px) 300px, 340px"
                  priority
                  className="profile-portrait-image"
                />
              </div>
            </div>

            <ol className="hero-workflow grid w-full grid-cols-2">
              {workflow.map((step, index) => {
                const Icon = step.icon;

                return (
                  <li
                    key={step.label}
                    className="hero-workflow-card workflow-label soft-card rounded-lg px-3 py-3 text-center text-sm font-bold"
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
        </div>
      </div>

      <div className="home-info-band">
        <div className="home-info-inner">
          <div className="home-info-copy">
            <p className="hero-gsap-item home-info-label">My Work</p>
            <p
              className="hero-gsap-item hero-introduction body-copy max-w-2xl text-base leading-8 sm:text-lg"
            >
              I&apos;m a Software Engineering undergraduate at NSBM Green University
              with a growing focus on Cloud and DevOps. I enjoy building practical
              applications, exploring backend systems, and learning how modern
              software is developed, deployed, and maintained.
            </p>
          </div>
        </div>
        <span aria-hidden="true" className="home-band-monogram">CW</span>
      </div>
    </section>
  );
}
