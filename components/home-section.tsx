import Image from "next/image";

import HomeAnimation from "@/components/home-animation";
import {
  BuildIcon,
  CodeIcon,
  DeployIcon,
  GithubLogo,
  LinkedinLogo,
  LocationIcon,
  MonitorIcon,
} from "@/components/icons";
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
      className="hero-section home-split-section section-frame page-panel w-full"
    >
      <HomeAnimation />

      <div className="home-hero-upper">
        <div aria-hidden="true" className="home-hero-background">
          <span className="home-diagonal-light" />
          <span className="home-diagonal-edge" />
        </div>

        <div className="home-upper-content">
          <div className="hero-copy home-light-content">
            <p className="hero-gsap-item hero-greeting">
              <span aria-hidden="true" className="availability-dot" />
              Hello, I&apos;m
            </p>

            <h1 id="hero-title" className="hero-name hero-title">
              <span className="hero-gsap-item hero-first-name">Chaniru</span>
              <span className="hero-gsap-item hero-surname">Weerasuriya</span>
            </h1>

            <div className="home-positioning">
              <div className="hero-gsap-item hero-current home-positioning-row">
                <span className="home-positioning-label">Now</span>
                <p>
                  Third-year BSc (Hons) Software Engineering undergraduate at NSBM
                  Green University.
                </p>
              </div>
              <div className="hero-gsap-item hero-direction home-positioning-row">
                <span className="home-positioning-label">Direction</span>
                <p>Backend, Cloud, and DevOps opportunities.</p>
              </div>
            </div>

            <p className="hero-gsap-item hero-statement">
              I build practical software while learning how reliable systems are
              designed, delivered, and maintained.
            </p>

            <p className="hero-gsap-item hero-location">
              <LocationIcon aria-hidden="true" className="home-location-icon" />
              Malabe, Sri Lanka
            </p>

            <div className="home-controls">
              <div
                role="group"
                className="hero-gsap-item hero-actions"
                aria-label="Portfolio action"
              >
                <MotionLink
                  href="#projects"
                  className="home-action home-action-primary focus-ring"
                  interaction="button"
                >
                  View My Work
                  <span aria-hidden="true">{"\u2197"}</span>
                </MotionLink>
              </div>

              <div
                role="group"
                aria-label="Social links"
                className="hero-gsap-item hero-socials"
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
          </div>

          <aside
            aria-label="Portrait of Chaniru Weerasuriya and software delivery workflow"
            className="hero-visual home-dark-content"
          >
            <div className="profile-orbit">
              <span aria-hidden="true" className="profile-orbit-axis" />
              <span aria-hidden="true" className="profile-orbit-corners" />
              <span aria-hidden="true" className="orbit-ring" />
              <span aria-hidden="true" className="orbit-marker orbit-marker-one" />
              <span aria-hidden="true" className="orbit-marker orbit-marker-two" />
              <span aria-hidden="true" className="orbit-node orbit-node-one" />
              <span aria-hidden="true" className="orbit-node orbit-node-two" />
              <div className="profile-portrait-frame">
                <Image
                  src="/images/chaniru-profile.jpeg"
                  alt="Portrait of Chaniru Weerasuriya"
                  width={971}
                  height={1280}
                  sizes="(max-width: 639px) 260px, (max-width: 1023px) 300px, 390px"
                  priority
                  className="profile-portrait-image"
                />
              </div>
            </div>

            <div className="home-workflow-block">
              <ol
                aria-label="Software delivery workflow: Code, Build, Deploy, Monitor"
                className="hero-workflow"
              >
                {workflow.map((step) => {
                  const Icon = step.icon;

                  return (
                    <li
                      key={step.label}
                      className="hero-workflow-card workflow-label"
                    >
                      <span className="icon-bubble">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>{step.label}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </aside>
        </div>
      </div>

      <div id="home-story" className="home-info-band">
        <div className="home-info-inner">
          <div className="home-info-copy">
            <h2 className="hero-gsap-item home-info-label">
              My Work
            </h2>
            <p className="hero-gsap-item hero-introduction">
              Practical projects are where I connect coursework with implementation.
              I enjoy building applications, exploring backend systems, and learning
              how software moves from code to reliable delivery and maintenance.
            </p>
          </div>

          <MotionLink
            href="#about"
            aria-label="Continue to the About section"
            className="hero-gsap-item home-about-bridge focus-ring"
            interaction="subtle"
          >
            <strong>Continue to About</strong>
            <span aria-hidden="true" className="home-about-arrow">&darr;</span>
          </MotionLink>
        </div>
      </div>
    </section>
  );
}
