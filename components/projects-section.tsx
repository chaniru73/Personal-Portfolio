import type { ReactNode } from "react";

import {
  CheckIcon,
  DatabaseIcon,
  ExternalIcon,
  GitBranchIcon,
  LayersIcon,
} from "@/components/icons";
import RevealOnScroll from "@/components/reveal-on-scroll";

const project = {
  number: "Project 01",
  name: "University ERP System",
  type: "University Group Project",
  status: "Completed",
  problem:
    "University academic and administrative information can be difficult to manage across separate processes. This project brings key operations together in one digital platform.",
  description:
    "A web-based University ERP system designed to manage students, lecturers, administrators, academic information, examinations, and other university operations.",
  contribution:
    "Backend development, API development, database integration, authentication, and role-based access control.",
  keyFeatures: [
    "Role-based login and access control",
    "Student and lecturer management",
    "Academic and examination management",
  ],
  technologies: [
    "Node.js",
    "Express.js",
    "JavaScript",
    "HTML",
    "CSS",
    "Bootstrap",
    "Microsoft SQL Server",
    "Git",
    "GitHub",
    "Postman",
  ],
  links: [
    {
      label: "Repository",
      text: "Repository link will be added soon.",
    },
    {
      label: "Live demo",
      text: "Live demo is not currently available.",
    },
  ],
} as const;

function TechnologyTag({ technology }: { technology: string }) {
  return (
    <span className="skill-badge text-sm font-semibold">
      {technology}
    </span>
  );
}

function ProjectDetail({
  title,
  children,
  icon: Icon,
  delay,
}: {
  title: string;
  children: ReactNode;
  icon?: typeof CheckIcon;
  delay?: number;
}) {
  return (
    <RevealOnScroll
      as="section"
      delay={delay}
      aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-title`}
    >
      <div className="flex items-center gap-3">
        {Icon ? (
          <span className="icon-bubble icon-bubble-sm">
            <Icon className="h-4.5 w-4.5" />
          </span>
        ) : null}
        <h4
          id={`${title.toLowerCase().replaceAll(" ", "-")}-title`}
          className="accent-text text-sm font-bold uppercase"
        >
          {title}
        </h4>
      </div>
      <div className="body-copy mt-3 text-sm leading-7 sm:text-base">
        {children}
      </div>
    </RevealOnScroll>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="section-shell projects-panel section-frame page-panel relative px-5 py-8 sm:px-8"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <RevealOnScroll className="max-w-3xl">
          <p className="eyebrow mb-5 inline-flex rounded-full px-4 py-2 text-sm font-medium">
            Projects
          </p>

          <h2
            id="projects-title"
            className="section-title text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl"
          >
            Practical work that reflects how I learn and build.
          </h2>

          <p className="body-copy mt-6 max-w-2xl text-base leading-8 sm:text-lg">
            A selection of university and personal projects where I have applied
            software development concepts to practical problems.
          </p>
        </RevealOnScroll>

        <RevealOnScroll
          as="article"
          variant="scale-in"
          delay={120}
          className="surface-card card-hover project-card group mt-5 grid min-w-0 gap-6 rounded-2xl p-5 sm:p-6 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <RevealOnScroll variant="fade-left" delay={220} className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-2.5">
              <span className="meta-badge text-xs font-bold uppercase">
                {project.number}
              </span>
              <span className="meta-badge text-xs font-bold uppercase">
                {project.type}
              </span>
              <span className="status-badge rounded-md px-3 py-1.5 text-xs font-bold uppercase">
                {project.status}
              </span>
            </div>

            <h3 className="card-title mt-6 text-2xl font-bold tracking-normal sm:text-3xl">
              {project.name}
            </h3>

            <p className="body-copy mt-4 text-base leading-8">
              {project.description}
            </p>

            <div
              aria-label="Project visual placeholder"
              className="project-visual mt-6 overflow-hidden rounded-2xl p-4"
            >
              <div className="project-window rounded-xl p-4">
                <div className="mb-5 flex items-center gap-2">
                  <span className="window-dot" />
                  <span className="window-dot window-dot-muted" />
                  <span className="window-dot window-dot-accent" />
                </div>
                <p className="card-title text-lg font-bold">
                  University ERP System
                </p>
                <div className="tag-list mt-6 text-sm font-semibold text-[var(--color-accent-strong)]">
                  {["Backend", "APIs", "Database", "Access Control"].map(
                    (item) => (
                      <span
                        key={item}
                        className="skill-badge text-sm font-semibold"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid min-w-0 gap-6 lg:grid-cols-2">
            <ProjectDetail title="Problem" icon={LayersIcon} delay={300}>
              <p>{project.problem}</p>
            </ProjectDetail>

            <ProjectDetail
              title="My contribution"
              icon={DatabaseIcon}
              delay={380}
            >
              <p>{project.contribution}</p>
            </ProjectDetail>

            <ProjectDetail title="Key features" icon={CheckIcon} delay={460}>
              <ul className="grid gap-3">
                {project.keyFeatures.map((feature) => (
                  <li key={feature} className="flex min-w-0 gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </ProjectDetail>

            <ProjectDetail title="Technologies" icon={LayersIcon} delay={540}>
              <ul className="tag-list mt-5">
                {project.technologies.map((technology) => (
                  <li key={technology} className="min-w-0 max-w-full">
                    <TechnologyTag technology={technology} />
                  </li>
                ))}
              </ul>
            </ProjectDetail>

            <ProjectDetail title="Links" delay={620}>
              <dl className="grid gap-4">
                {project.links.map((link) => {
                  const Icon =
                    link.label === "Repository" ? GitBranchIcon : ExternalIcon;

                  return (
                    <div
                      key={link.label}
                      className="soft-card rounded-xl px-4 py-3"
                    >
                      <dt className="accent-text flex items-center gap-2 text-xs font-bold uppercase">
                        <Icon className="h-4 w-4" />
                        <span>{link.label}</span>
                      </dt>
                      <dd className="body-copy mt-1 text-sm font-medium leading-6">
                        {link.text}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </ProjectDetail>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
