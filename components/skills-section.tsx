import {
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  MonitorIcon,
  ServerIcon,
  ToolsIcon,
} from "@/components/icons";
import MotionReveal from "@/components/motion-reveal";

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
    <MotionReveal
      as="article"
      delay={140 + staggerIndex * 80}
      hover="card"
      className="surface-card tag-card min-w-0"
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
    </MotionReveal>
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
    <MotionReveal
      delay={delay}
      hover="card"
      className="confidence-group min-w-0"
    >
      <h4 className="card-title text-base font-bold">{title}</h4>
      <ul className="tag-list mt-4">
        {skills.map((skill) => (
          <li key={skill} className="min-w-0 max-w-full">
            <span className="skill-badge text-sm font-medium">
              {skill}
            </span>
          </li>
        ))}
      </ul>
    </MotionReveal>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      tabIndex={-1}
      aria-labelledby="skills-title"
      className="section-shell skills-panel section-frame page-panel relative px-5 py-8 sm:px-8"
    >
      <div className="content-container relative mx-auto w-full">
        <MotionReveal className="max-w-3xl">
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
        </MotionReveal>

        <div className="section-content-grid mt-8 grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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

        <aside
          aria-labelledby="skill-level-title"
          className="confidence-shell"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="accent-text text-sm font-bold uppercase">
                Current Skill Level
              </p>
              <h3
                id="skill-level-title"
                className="card-title mt-3 text-2xl font-bold tracking-normal"
              >
                Practical familiarity by focus area.
              </h3>
            </div>
          </div>

          <div className="confidence-grid mt-6 grid min-w-0 gap-6">
            {skillLevels.map((level, index) => (
              <LevelGroup
                key={level.title}
                title={level.title}
                skills={level.skills}
                delay={760 + index * 80}
              />
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
