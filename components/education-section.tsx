import { BookIcon, EducationIcon, StrengthIcon } from "@/components/icons";
import MotionReveal from "@/components/motion-reveal";

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
    value: "Third-year undergraduate",
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
      tabIndex={-1}
      aria-labelledby="education-title"
      className="section-shell education-panel section-frame page-panel relative px-5 py-8 sm:px-8"
    >
      <div className="content-container relative mx-auto grid w-full gap-8">
        <MotionReveal variant="fade-left" className="max-w-3xl">
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
        </MotionReveal>

        <article
          className="surface-card education-card grid min-w-0 gap-6 p-5 sm:p-7 lg:grid-cols-2"
        >
          <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 lg:col-span-2">
            <div className="flex min-w-0 items-start gap-3">
              <span className="icon-bubble">
                <EducationIcon className="h-5 w-5" />
              </span>
              <h3 className="card-title text-2xl font-bold tracking-normal">
                BSc (Hons) in Software Engineering
              </h3>
            </div>
            <span className="status-badge rounded-md px-3 py-1.5 text-xs font-bold uppercase">
              In Progress
            </span>
          </div>

          <dl className="education-details grid min-w-0 gap-4 sm:grid-cols-2 lg:row-span-2">
            {educationDetails.map((detail, index) => (
              <MotionReveal
                as="div"
                key={detail.label}
                delay={240 + index * 70}
                hover="card"
                className="detail-row min-w-0"
              >
                <dt className="accent-text text-xs font-bold uppercase">
                  {detail.label}
                </dt>
                <dd className="card-title mt-2 break-words text-base font-semibold leading-7">
                  {detail.value}
                </dd>
              </MotionReveal>
            ))}
          </dl>

          <MotionReveal delay={160}>
            <div className="flex items-center gap-3">
              <span className="icon-bubble icon-bubble-sm">
                <BookIcon className="h-4.5 w-4.5" />
              </span>
              <h4 className="accent-text text-sm font-bold uppercase">
                Relevant study areas
              </h4>
            </div>
            <ul className="tag-list mt-4">
              {studyAreas.map((area) => (
                <li key={area} className="min-w-0 max-w-full">
                  <span className="skill-badge text-sm font-semibold">
                    {area}
                  </span>
                </li>
              ))}
            </ul>
          </MotionReveal>

          <MotionReveal
            as="p"
            delay={700}
            className="supporting-note text-base leading-7"
          >
            <StrengthIcon className="mr-2 inline h-4.5 w-4.5 align-[-0.15em] text-[var(--color-accent)]" />
            I&apos;m developing practical experience through university projects and
            technical coursework while strengthening my software engineering,
            backend, cloud, and DevOps knowledge.
          </MotionReveal>
          <MotionReveal as="p" delay={200} className="body-copy text-base leading-7 lg:col-span-2">
            Additional certifications are not currently listed in this
            portfolio.
          </MotionReveal>
        </article>
      </div>
    </section>
  );
}
