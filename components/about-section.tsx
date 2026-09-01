import {
  BookIcon,
  EducationIcon,
  StrengthIcon,
} from "@/components/icons";
import RevealOnScroll from "@/components/reveal-on-scroll";

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
}: {
  title: string;
  items: readonly string[];
  icon: typeof EducationIcon;
  delay: number;
}) {
  return (
    <RevealOnScroll delay={delay} className="info-group">
      <div className="flex items-center gap-3">
        <span className="icon-bubble">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="accent-text text-sm font-bold uppercase">{title}</h3>
      </div>
      <ul className="body-copy mt-4 grid gap-3 text-sm leading-6 sm:text-[15px]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </RevealOnScroll>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section-shell about-panel section-frame page-panel relative px-5 py-8 sm:px-8"
    >
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <RevealOnScroll variant="fade-left">
          <p className="eyebrow mb-5 inline-flex rounded-full px-4 py-2 text-sm font-medium">
            About Me
          </p>

          <h2
            id="about-title"
            className="section-title max-w-3xl text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl"
          >
            Building software with a focus on reliable delivery.
          </h2>

          <div className="body-copy mt-6 space-y-4 text-base leading-8 sm:text-lg">
            <p>
              I&apos;m a third-year BSc (Hons) Software Engineering undergraduate
              at NSBM Green University. I chose this field because I enjoy
              solving problems and turning ideas into useful applications.
            </p>
            <p>
              I&apos;m currently developing my skills in Java, Spring Boot,
              Node.js, SQL, Git and GitHub, Docker, cloud technologies, DevOps,
              software architecture, and web development. Cloud and DevOps
              interest me because they help teams build, deploy, scale, and
              maintain software more efficiently through automation and reliable
              delivery practices.
            </p>
            <p>
              I value continuous learning, teamwork, adaptability, and taking
              responsibility for my work. My goal is to become a skilled
              Software Engineer with strong development, Cloud, and DevOps
              knowledge, supported by real-world industry experience.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll
          as="aside"
          aria-label="About information"
          variant="fade-right"
          delay={120}
          className="surface-card elevated-info-card rounded-2xl p-5 sm:p-6"
        >
          <div className="grid gap-6">
            <DetailList
              title="Education"
              items={education}
              icon={EducationIcon}
              delay={220}
            />
            <DetailList
              title="Currently learning"
              items={currentlyLearning}
              icon={BookIcon}
              delay={300}
            />
            <DetailList
              title="Core strengths"
              items={coreStrengths}
              icon={StrengthIcon}
              delay={380}
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={460} className="lg:col-span-2">
          <p className="soft-card rounded-2xl px-5 py-4 text-sm font-semibold leading-7 text-[var(--color-heading)] sm:text-base">
            I&apos;m open to Software Engineering, Backend Development, Cloud,
            and DevOps internships or entry-level opportunities.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
