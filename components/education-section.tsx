const educationDetails = [
  {
    label: "Degree",
    value: "BSc (Hons) in Software Engineering",
  },
  {
    label: "Institution",
    value: "NSBM Green University",
  },
  {
    label: "Current level",
    value: "Year 3",
  },
  {
    label: "Status",
    value: "In Progress",
  },
  {
    label: "Expected graduation",
    value: "2028",
  },
] as const;

const studyAreas = [
  "Software Engineering",
  "Software Architecture",
  "Information Assurance & Security",
  "Algorithms & Complexity",
  "Database Management Systems",
  "Human-Computer Interaction",
] as const;

export default function EducationSection() {
  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="relative border-t border-cyan-300/10 px-5 py-20 sm:px-8 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.08)]">
            Education
          </p>

          <h2
            id="education-title"
            className="max-w-3xl text-3xl font-bold tracking-normal text-white sm:text-4xl lg:text-5xl"
          >
            Academic foundations supporting my technical growth.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            My degree studies are helping me build a strong understanding of
            software development, system design, security, data, and
            user-centred technology.
          </p>
        </div>

        <article className="min-w-0 rounded-lg border border-cyan-300/15 bg-slate-950/75 p-5 shadow-2xl shadow-cyan-950/25 backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-cyan-200/35 hover:bg-slate-900/80 sm:p-6">
          <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
            <h3 className="text-2xl font-bold tracking-normal text-white">
              BSc (Hons) in Software Engineering
            </h3>
            <span className="rounded-md border border-emerald-300/25 bg-emerald-300/[0.1] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-100">
              In Progress
            </span>
          </div>

          <dl className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2">
            {educationDetails.map((detail) => (
              <div
                key={detail.label}
                className="min-w-0 rounded-lg border border-blue-300/15 bg-blue-300/[0.06] px-4 py-3"
              >
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                  {detail.label}
                </dt>
                <dd className="mt-1 break-words text-sm font-semibold leading-6 text-slate-100">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7">
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-100">
              Relevant study areas
            </h4>
            <ul className="mt-4 flex min-w-0 flex-wrap gap-2.5">
              {studyAreas.map((area) => (
                <li key={area} className="min-w-0 max-w-full">
                  <span className="max-w-full rounded-md border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1.5 text-sm font-semibold leading-5 text-cyan-50">
                    {area}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-7 rounded-lg border border-cyan-300/15 bg-cyan-300/[0.07] px-4 py-3 text-sm font-medium leading-7 text-slate-200 sm:text-base">
            I&apos;m developing practical experience through university projects and
            technical coursework while strengthening my software engineering,
            backend, Cloud, and DevOps knowledge.
          </p>
        </article>
      </div>
    </section>
  );
}
