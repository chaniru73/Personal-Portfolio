import type { ReactNode } from "react";

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
    <span className="max-w-full rounded-md border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1.5 text-sm font-semibold leading-5 text-cyan-50">
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
        className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-100"
      >
        {title}
      </h4>
      <div className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
        {children}
      </div>
    </section>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative border-t border-cyan-300/10 px-5 py-20 sm:px-8 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.08)]">
            Projects
          </p>

          <h2
            id="projects-title"
            className="text-3xl font-bold tracking-normal text-white sm:text-4xl lg:text-5xl"
          >
            Practical work that reflects how I learn and build.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            A selection of university and personal projects where I have applied
            software development concepts to practical problems.
          </p>
        </div>

        <article className="group mt-12 grid min-w-0 gap-6 rounded-lg border border-cyan-300/15 bg-slate-950/75 p-5 shadow-2xl shadow-cyan-950/25 backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-cyan-200/35 hover:bg-slate-900/80 sm:p-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-2.5">
              <span className="rounded-md border border-blue-300/25 bg-blue-300/[0.08] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                {project.number}
              </span>
              <span className="rounded-md border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">
                {project.type}
              </span>
              <span className="rounded-md border border-emerald-300/25 bg-emerald-300/[0.1] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-100">
                {project.status}
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-bold tracking-normal text-white sm:text-3xl">
              {project.name}
            </h3>

            <p className="mt-4 text-base leading-8 text-slate-300">
              {project.description}
            </p>

            <div
              aria-label="Project visual placeholder"
              className="mt-6 overflow-hidden rounded-lg border border-blue-300/20 bg-gradient-to-br from-slate-950 via-blue-950/55 to-cyan-950/35 p-4 shadow-[0_0_32px_rgba(59,130,246,0.12)]"
            >
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <p className="text-lg font-bold text-white">
                  University ERP System
                </p>
                <div className="mt-5 grid grid-cols-1 gap-2 text-sm font-semibold text-cyan-50 sm:grid-cols-2">
                  {["Backend", "APIs", "Database", "Access Control"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-md border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-2"
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
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.55)]"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </ProjectDetail>

            <ProjectDetail title="Technologies">
              <ul className="flex min-w-0 flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <li key={technology} className="min-w-0 max-w-full">
                    <TechnologyTag technology={technology} />
                  </li>
                ))}
              </ul>
            </ProjectDetail>

            <ProjectDetail title="Links">
              <dl className="grid gap-3">
                {project.links.map((link) => (
                  <div
                    key={link.label}
                    className="rounded-lg border border-blue-300/15 bg-blue-300/[0.06] px-4 py-3"
                  >
                    <dt className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                      {link.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium leading-6 text-slate-200">
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
  );
}
