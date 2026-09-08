import {
  BookIcon,
  EducationIcon,
  StrengthIcon,
} from "@/components/icons";
import MotionReveal from "@/components/motion-reveal";

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
  variant = "tags",
}: {
  title: string;
  items: readonly string[];
  icon: typeof EducationIcon;
  delay: number;
  variant?: "rows" | "tags";
}) {
  return (
    <MotionReveal
      as="article"
      delay={delay}
      hover="card"
      className="about-info-card surface-card rounded-2xl p-6 sm:p-7"
    >
      <div className="about-card-heading flex items-center gap-3">
        <span className="icon-bubble">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="card-title text-lg font-bold tracking-normal">
          {title}
        </h3>
      </div>

      {variant === "rows" ? (
        <ul className="about-info-rows body-copy mt-6 grid gap-4 text-base leading-7">
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
        <ul className="about-tag-list mt-6 flex flex-wrap gap-3">
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
      className="section-shell about-panel section-frame page-panel relative px-5 py-8 sm:px-8"
    >
      <div className="about-layout content-container relative mx-auto flex w-full flex-col items-center">
        <div className="about-main mx-auto w-full max-w-[1020px]">
          <MotionReveal
            as="p"
            delay={40}
            className="about-badge eyebrow mx-auto inline-flex rounded-full px-4 py-2 text-sm font-medium"
          >
            About Me
          </MotionReveal>

          <MotionReveal
            as="h2"
            id="about-title"
            delay={120}
            className="about-title section-title mx-auto max-w-4xl text-center text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl"
          >
            Building software with a focus on reliable delivery.
          </MotionReveal>

          <div className="about-paragraphs body-copy mx-auto text-base leading-8 sm:text-lg">
            <MotionReveal as="p" delay={220}>
              I&apos;m a third-year BSc (Hons) Software Engineering undergraduate
              at NSBM Green University. I chose this field because I enjoy
              solving problems and turning ideas into useful applications.
            </MotionReveal>
            <MotionReveal as="p" delay={300}>
              I&apos;m currently developing my skills in Java, Spring Boot,
              Node.js, SQL, Git and GitHub, Docker, cloud technologies, DevOps,
              software architecture, and web development. Cloud and DevOps
              interest me because they help teams build, deploy, scale, and
              maintain software more efficiently through automation and reliable
              delivery practices.
            </MotionReveal>
            <MotionReveal as="p" delay={380}>
              I value continuous learning, teamwork, adaptability, and taking
              responsibility for my work. My goal is to become a skilled
              Software Engineer with strong development, cloud, and DevOps
              knowledge, supported by real-world industry experience.
            </MotionReveal>
          </div>

          <MotionReveal delay={480}>
            <p className="about-opportunity soft-card mx-auto rounded-2xl px-5 py-4 text-center text-sm font-semibold leading-7 text-[var(--color-heading)] sm:text-base">
              I&apos;m open to Software Engineering, Backend Development, Cloud,
              and DevOps internships or entry-level opportunities.
            </p>
          </MotionReveal>
        </div>

        <div className="about-card-grid grid w-full">
          <DetailList
            title="Education"
            items={education}
            icon={EducationIcon}
            delay={580}
            variant="rows"
          />
          <DetailList
            title="Currently Learning"
            items={currentlyLearning}
            icon={BookIcon}
            delay={670}
          />
          <DetailList
            title="Core Strengths"
            items={coreStrengths}
            icon={StrengthIcon}
            delay={760}
          />
        </div>
      </div>
    </section>
  );
}
