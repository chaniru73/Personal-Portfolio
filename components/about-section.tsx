import {
  BookIcon,
  EducationIcon,
  StrengthIcon,
} from "@/components/icons";
import MotionReveal, { type MotionRevealProps } from "@/components/motion-reveal";

const education = [
  "BSc (Hons) in Software Engineering",
  "Third-year undergraduate",
  "NSBM Green University",
];

const currentlyLearning = [
  "Java",
  "Spring Boot",
  "Node.js",
  "SQL",
  "Git & GitHub",
  "Docker",
  "Cloud Technologies",
  "DevOps",
  "Software Architecture",
  "Web Development",
];

const coreStrengths = [
  "Problem-solving",
  "Willingness to learn",
  "Teamwork",
  "Adaptability",
  "Responsibility",
];

function DetailList({
  title,
  items,
  icon: Icon,
  delay,
  motionVariant = "fade-up",
  variant = "tags",
}: {
  title: string;
  items: readonly string[];
  icon: typeof EducationIcon;
  delay: number;
  motionVariant?: MotionRevealProps["variant"];
  variant?: "rows" | "tags";
}) {
  return (
    <MotionReveal
      as="article"
      delay={delay}
      hover="card"
      variant={motionVariant}
      className="about-info-card surface-card"
    >
      <div className="about-card-heading flex items-center gap-3">
        <span className="about-card-icon icon-bubble">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="card-title text-lg font-bold tracking-normal">
          {title}
        </h3>
      </div>

      {variant === "rows" ? (
        <ul className="about-info-rows body-copy grid text-base">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="about-tag-list flex flex-wrap">
          {items.map((item) => (
            <li key={item} className="skill-badge">
              {item}
            </li>
          ))}
        </ul>
      )}
    </MotionReveal>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      tabIndex={-1}
      aria-labelledby="about-title"
      className="section-shell about-panel section-frame page-panel relative"
    >
      <div className="about-layout relative mx-auto flex w-full flex-col items-center">
        <div className="about-main mx-auto w-full">
          <MotionReveal
            as="p"
            delay={40}
            variant="scale-in"
            className="about-badge mx-auto inline-flex text-sm font-bold"
          >
            ABOUT ME
          </MotionReveal>

          <MotionReveal
            as="h2"
            id="about-title"
            delay={110}
            className="about-title section-title mx-auto text-center font-bold tracking-normal"
          >
            Building software with a focus on reliable delivery.
          </MotionReveal>

          <div className="about-paragraphs body-copy mx-auto text-base">
            <MotionReveal as="p" delay={180}>
              I&apos;m a third-year BSc (Hons) Software Engineering undergraduate
              at NSBM Green University. I chose this field because I enjoy
              solving problems and turning ideas into useful applications.
            </MotionReveal>
            <MotionReveal as="p" delay={250}>
              I&apos;m currently developing my skills in Java, Spring Boot,
              Node.js, SQL, Git and GitHub, Docker, cloud technologies, DevOps,
              software architecture, and web development. Cloud and DevOps
              interest me because they help teams build, deploy, scale, and
              maintain software more efficiently through automation and reliable
              delivery practices.
            </MotionReveal>
            <MotionReveal as="p" delay={320}>
              I value continuous learning, teamwork, adaptability, and taking
              responsibility for my work. My goal is to become a skilled
              Software Engineer with strong development, cloud, and DevOps
              knowledge, supported by real-world industry experience.
            </MotionReveal>
          </div>

          <MotionReveal delay={390}>
            <p className="about-opportunity mx-auto text-center text-base font-semibold">
              I&apos;m open to Software Engineering, Backend Development, Cloud,
              and DevOps internships or entry-level opportunities.
            </p>
          </MotionReveal>
        </div>

        <MotionReveal delay={460} className="about-explore-block">
          <div className="about-explore-row">
            <span aria-hidden="true" className="about-explore-line" />
            <a className="about-explore-link focus-ring" href="#about-details">
              EXPLORE
            </a>
            <span aria-hidden="true" className="about-explore-line" />
          </div>
          <div aria-hidden="true" className="about-divider" />
        </MotionReveal>

        <div id="about-details" className="about-card-grid grid w-full">
          <DetailList
            title="Education"
            items={education}
            icon={EducationIcon}
            delay={540}
            motionVariant="fade-left"
            variant="rows"
          />
          <DetailList
            title="Currently Learning"
            items={currentlyLearning}
            icon={BookIcon}
            delay={620}
            motionVariant="fade-right"
          />
          <DetailList
            title="Core Strengths"
            items={coreStrengths}
            icon={StrengthIcon}
            delay={700}
          />
        </div>
      </div>
    </section>
  );
}
