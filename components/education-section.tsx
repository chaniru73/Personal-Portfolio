import {
  BookIcon,
  CheckIcon,
  EducationIcon,
  LocationIcon,
  StrengthIcon,
} from "@/components/icons";
import MotionReveal from "@/components/motion-reveal";

const educationDetails = [
  { label: "Degree", value: "BSc (Hons) in Software Engineering", icon: EducationIcon },
  { label: "Institution", value: "NSBM Green University", icon: LocationIcon },
  { label: "Current level", value: "Third-year undergraduate", icon: BookIcon },
  { label: "Status", value: "In Progress", icon: CheckIcon },
  { label: "Expected graduation", value: "2028", icon: EducationIcon },
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
      className="section-shell education-panel section-frame page-panel relative"
    >
      <div className="education-layout relative mx-auto w-full">
        <MotionReveal className="education-introduction text-center">
          <p className="education-badge mx-auto inline-flex text-sm font-bold">EDUCATION</p>
          <h2
            id="education-title"
            className="education-title section-title mx-auto font-bold tracking-normal"
          >
            Academic foundations supporting my technical growth.
          </h2>
          <p className="education-summary body-copy mx-auto text-base">
            My degree studies are helping me build a strong understanding of
            software development, system design, security, data, and
            user-centred technology.
          </p>
        </MotionReveal>

        <MotionReveal as="article" delay={140} className="education-card">
          <header className="education-degree-heading">
            <span className="education-heading-icon" aria-hidden="true">
              <EducationIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="education-kicker">Current degree</p>
              <h3>BSc (Hons) in Software Engineering</h3>
            </div>
            <span className="education-status">In Progress</span>
          </header>

          <dl className="education-metadata">
            {educationDetails.map((detail, index) => {
              const Icon = detail.icon;
              return (
                <MotionReveal
                  as="div"
                  key={detail.label}
                  delay={220 + index * 65}
                  className="education-meta-item"
                >
                  <dt>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {detail.label}
                  </dt>
                  <dd>{detail.value}</dd>
                </MotionReveal>
              );
            })}
          </dl>

          <MotionReveal delay={580} className="education-study-areas">
            <div className="education-subheading">
              <BookIcon className="h-5 w-5" aria-hidden="true" />
              <h4>Relevant study areas</h4>
            </div>
            <ul>
              {studyAreas.map((area) => <li key={area}>{area}</li>)}
            </ul>
          </MotionReveal>

          <div className="education-support-grid">
            <MotionReveal as="article" delay={650} className="education-support-panel">
              <div className="education-subheading">
                <StrengthIcon className="h-5 w-5" aria-hidden="true" />
                <h4>Practical Experience</h4>
              </div>
              <p>
                I&apos;m developing practical experience through university projects and
                technical coursework while strengthening my software engineering,
                backend, cloud, and DevOps knowledge.
              </p>
            </MotionReveal>

            <MotionReveal as="article" delay={720} className="education-support-panel">
              <div className="education-subheading">
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                <h4>Certification Status</h4>
              </div>
              <p>Additional certifications are not currently listed in this portfolio.</p>
            </MotionReveal>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
