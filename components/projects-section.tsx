import type { ReactNode } from "react";

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
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-title`}>
      <h4
        id={`${title.toLowerCase().replaceAll(" ", "-")}-title`}
        className="accent-text text-sm font-bold uppercase tracking-[0.16em]"
      >
        {title}
      </h4>
      <div className="body-copy mt-3 text-sm leading-7 sm:text-base">
        {children}
      </div>
    </section>
  );
}

export default function ProjectsSection() {
  return (
    <RevealOnScroll delay={160} variant="fade-left">
      <section
        id="projects"
        aria-labelledby="projects-title"
        className="section-shell page-panel relative px-5 py-20 sm:px-8 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="section-divider pointer-events-none absolute inset-x-0 top-0 h-px"
        />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="stagger-item stagger-delay-1 max-w-3xl">
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
        </div>

        <article className="stagger-item stagger-delay-2 surface-card card-hover group mt-12 grid min-w-0 gap-6 rounded-lg p-5 sm:p-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-2.5">
              <span className="meta-badge text-xs font-bold uppercase tracking-[0.16em]">
                {project.number}
              </span>
              <span className="meta-badge text-xs font-bold uppercase tracking-[0.16em]">
                {project.type}
              </span>
              <span className="status-badge rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em]">
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
              className="project-visual mt-6 overflow-hidden rounded-lg p-4"
            >
              <div className="rounded-md border border-[var(--color-border-soft)] bg-white p-4">
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-light)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
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
          </div>

          <div className="grid min-w-0 gap-6">
            <ProjectDetail title="Problem">
              <p>{project.problem}</p>
            </ProjectDetail>

            <ProjectDetail title="My contribution">
              <p>{project.contribution}</p>
            </ProjectDetail>

            <ProjectDetail title="Key features">
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

            <ProjectDetail title="Technologies">
              <ul className="tag-list mt-5">
                {project.technologies.map((technology) => (
                  <li key={technology} className="min-w-0 max-w-full">
                    <TechnologyTag technology={technology} />
                  </li>
                ))}
              </ul>
            </ProjectDetail>

            <ProjectDetail title="Links">
              <dl className="grid gap-4">
                {project.links.map((link) => (
                  <div
                    key={link.label}
                    className="soft-card rounded-lg px-4 py-3"
                  >
                    <dt className="accent-text text-xs font-bold uppercase tracking-[0.16em]">
                      {link.label}
                    </dt>
                    <dd className="body-copy mt-1 text-sm font-medium leading-6">
                      {link.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </ProjectDetail>
          </div>
        </article>
        </div>
      </section>
    </RevealOnScroll>
  );
}
