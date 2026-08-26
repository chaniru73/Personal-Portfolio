import RevealOnScroll from "@/components/reveal-on-scroll";

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
    <RevealOnScroll delay={200} variant="fade-right">
      <section
        id="education"
        aria-labelledby="education-title"
        className="section-shell page-panel relative px-5 py-20 sm:px-8 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="section-divider pointer-events-none absolute inset-x-0 top-0 h-px"
        />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="stagger-item stagger-delay-1">
          <p className="eyebrow mb-5 inline-flex rounded-full px-4 py-2 text-sm font-medium">
            Education
          </p>

          <h2
            id="education-title"
            className="section-title max-w-3xl text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl"
          >
            Academic foundations supporting my technical growth.
          </h2>

          <p className="body-copy mt-6 max-w-2xl text-base leading-8 sm:text-lg">
            My degree studies are helping me build a strong understanding of
            software development, system design, security, data, and
            user-centred technology.
          </p>
        </div>

        <article className="stagger-item stagger-delay-2 surface-card card-hover min-w-0 rounded-lg p-5 sm:p-6">
          <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
            <h3 className="card-title text-2xl font-bold tracking-normal">
              BSc (Hons) in Software Engineering
            </h3>
            <span className="status-badge rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em]">
              In Progress
            </span>
          </div>

          <dl className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2">
            {educationDetails.map((detail) => (
              <div
                key={detail.label}
                className="soft-card min-w-0 rounded-lg px-4 py-3"
              >
                <dt className="accent-text text-xs font-bold uppercase tracking-[0.16em]">
                  {detail.label}
                </dt>
                <dd className="card-title mt-1 break-words text-sm font-semibold leading-6">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7">
            <h4 className="accent-text text-sm font-bold uppercase tracking-[0.16em]">
              Relevant study areas
            </h4>
            <ul className="tag-list mt-6">
              {studyAreas.map((area) => (
                <li key={area} className="min-w-0 max-w-full">
                  <span className="skill-badge text-sm font-semibold">
                    {area}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="soft-card mt-7 rounded-lg px-4 py-3 text-sm font-medium leading-7 text-[var(--color-heading)] sm:text-base">
            I&apos;m developing practical experience through university projects and
            technical coursework while strengthening my software engineering,
            backend, Cloud, and DevOps knowledge.
          </p>
        </article>
        </div>
      </section>
    </RevealOnScroll>
  );
}
