import {
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  MonitorIcon,
  ServerIcon,
  ToolsIcon,
} from "@/components/icons";
import RevealOnScroll from "@/components/reveal-on-scroll";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: CodeIcon,
    skills: ["Java", "JavaScript", "Dart", "Python", "SQL"],
  },
  {
    title: "Frontend & Mobile",
    icon: MonitorIcon,
    skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "Flutter"],
  },
  {
    title: "Backend Development",
    icon: ServerIcon,
    skills: ["Node.js", "Express.js", "Spring Boot"],
  },
  {
    title: "Databases",
    icon: DatabaseIcon,
    skills: ["MySQL", "Microsoft SQL Server"],
  },
  {
    title: "Cloud & DevOps",
    icon: CloudIcon,
    skills: [
      "Microsoft Azure",
      "Git",
      "GitHub",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    title: "Development & Design Tools",
    icon: ToolsIcon,
    skills: [
      "IntelliJ IDEA",
      "Visual Studio Code",
      "Postman",
      "SSMS",
      "XAMPP",
      "Figma",
      "draw.io",
    ],
  },
] as const;

const skillLevels = [
  {
    title: "Comfortable",
    skills: [
      "Java",
      "JavaScript",
      "Node.js",
      "Express.js",
      "SQL",
      "HTML & CSS",
      "Git & GitHub",
      "Postman",
    ],
  },
  {
    title: "Currently Learning",
    skills: [
      "Spring Boot",
      "Docker",
      "Cloud Computing",
      "DevOps",
      "Flutter & Dart",
    ],
  },
  {
    title: "Basic Knowledge",
    skills: [
      "Python",
      "Microsoft Azure",
      "GitHub Actions",
      "MySQL",
      "Software Architecture Tools",
    ],
  },
] as const;

function SkillBadge({ skill }: { skill: string }) {
  return (
    <span className="skill-badge text-sm font-semibold">
      {skill}
    </span>
  );
}

function SkillCategoryCard({
  title,
  icon: Icon,
  skills,
  staggerIndex,
}: {
  title: string;
  icon: typeof CodeIcon;
  skills: readonly string[];
  staggerIndex: number;
}) {
  return (
    <RevealOnScroll
      as="article"
      delay={140 + staggerIndex * 80}
      className="surface-card card-hover tag-card group min-w-0 rounded-2xl"
    >
      <div className="flex items-center gap-3">
        <span className="icon-bubble">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="card-title text-base font-bold">{title}</h3>
      </div>
      <ul className="tag-list mt-4">
        {skills.map((skill) => (
          <li key={skill} className="min-w-0 max-w-full">
            <SkillBadge skill={skill} />
          </li>
        ))}
      </ul>
    </RevealOnScroll>
  );
}

function LevelGroup({
  title,
  skills,
  delay,
}: {
  title: string;
  skills: readonly string[];
  delay: number;
}) {
  return (
    <RevealOnScroll
      delay={delay}
      className="subtle-panel confidence-card card-hover min-w-0 rounded-2xl p-5"
    >
      <div className="confidence-line" aria-hidden="true" />
      <h3 className="accent-text text-sm font-bold uppercase">{title}</h3>
      <ul className="tag-list mt-4">
        {skills.map((skill) => (
          <li key={skill} className="min-w-0 max-w-full">
            <span className="meta-badge text-sm font-medium">
              {skill}
            </span>
          </li>
        ))}
      </ul>
    </RevealOnScroll>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="section-shell skills-panel section-frame page-panel relative px-5 py-8 sm:px-8"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <RevealOnScroll className="max-w-3xl">
          <p className="eyebrow mb-5 inline-flex rounded-full px-4 py-2 text-sm font-medium">
            Skills &amp; Tools
          </p>

          <h2
            id="skills-title"
            className="section-title text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl"
          >
            Technologies I use and continue to develop.
          </h2>

          <p className="body-copy mt-6 max-w-2xl text-base leading-8 sm:text-lg">
            My skills have been developed through university coursework,
            practical projects, and continuous hands-on learning.
          </p>
        </RevealOnScroll>

        <div className="mt-5 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard
              key={category.title}
              title={category.title}
              icon={category.icon}
              skills={category.skills}
              staggerIndex={index}
            />
          ))}
        </div>

        <RevealOnScroll
          as="aside"
          aria-labelledby="skill-level-title"
          delay={680}
          className="soft-card confidence-shell mt-5 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="accent-text text-sm font-bold uppercase">
                Current Skill Level
              </p>
              <h2
                id="skill-level-title"
                className="section-title mt-3 text-2xl font-bold tracking-normal sm:text-3xl"
              >
                Practical familiarity by focus area.
              </h2>
            </div>
          </div>

          <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-3">
            {skillLevels.map((level, index) => (
              <LevelGroup
                key={level.title}
                title={level.title}
                skills={level.skills}
                delay={760 + index * 80}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
