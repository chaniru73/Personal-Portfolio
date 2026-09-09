import {
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  MonitorIcon,
  ServerIcon,
  TechnologyMark,
  ToolsIcon,
} from "@/components/icons";
import MotionReveal from "@/components/motion-reveal";

const technologyIcons: Record<string, { icon: string; color?: string; monochrome?: boolean }> = {
  Java: { icon: "/icons/skills/java.svg" },
  JavaScript: { icon: "/icons/skills/javascript.svg", color: "#d6b800", monochrome: true },
  Dart: { icon: "/icons/skills/dart.svg", color: "#0175c2", monochrome: true },
  Python: { icon: "/icons/skills/python.svg", color: "#3776ab", monochrome: true },
  SQL: { icon: "/icons/skills/database.svg" },
  HTML: { icon: "/icons/skills/html5.svg", color: "#e34f26", monochrome: true },
  CSS: { icon: "/icons/skills/css.svg", color: "#663399", monochrome: true },
  Bootstrap: { icon: "/icons/skills/bootstrap.svg", color: "#7952b3", monochrome: true },
  Flutter: { icon: "/icons/skills/flutter.svg", color: "#02569b", monochrome: true },
  "Node.js": { icon: "/icons/skills/nodedotjs.svg", color: "#339933", monochrome: true },
  "Express.js": { icon: "/icons/skills/express.svg", color: "#202020", monochrome: true },
  "Spring Boot": { icon: "/icons/skills/springboot.svg", color: "#6db33f", monochrome: true },
  MySQL: { icon: "/icons/skills/mysql.svg", color: "#4479a1", monochrome: true },
  "Microsoft SQL Server": { icon: "/icons/skills/microsoftsqlserver.svg" },
  "Microsoft Azure": { icon: "/icons/skills/microsoftazure.svg" },
  Git: { icon: "/icons/skills/git.svg" },
  GitHub: { icon: "/icons/skills/github.svg" },
  Docker: { icon: "/icons/skills/docker.svg" },
  "GitHub Actions": { icon: "/icons/skills/githubactions.svg" },
  "IntelliJ IDEA": { icon: "/icons/skills/intellijidea.svg" },
  "Visual Studio Code": { icon: "/icons/skills/visualstudiocode.svg" },
  Postman: { icon: "/icons/skills/postman.svg" },
  SSMS: { icon: "/icons/skills/database.svg" },
  XAMPP: { icon: "/icons/skills/xampp.svg", color: "#fb7a24", monochrome: true },
  Figma: { icon: "/icons/skills/figma.svg" },
  "draw.io": { icon: "/icons/skills/diagramsdotnet.svg", color: "#f08705", monochrome: true },
};

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

function SkillLevelItem({ skill }: { skill: string }) {
  return (
    <span className="skills-level-item text-sm font-semibold">
      {skill}
    </span>
  );
}

function TechnologyItem({
  skill,
  delay,
}: {
  skill: string;
  delay: number;
}) {
  const details = technologyIcons[skill] ?? { icon: "/icons/skills/database.svg" };

  return (
    <MotionReveal
      as="li"
      aria-label={`${skill} technology`}
      delay={delay}
      variant="scale-in"
      className="skills-technology-item"
    >
      <TechnologyMark
        icon={details.icon}
        name={skill}
        color={details.color}
        monochrome={details.monochrome}
      />
      <span className="skills-technology-name">{skill}</span>
    </MotionReveal>
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
      delay={180 + staggerIndex * 70}
      className="skills-category min-w-0"
    >
      <div className="skills-category-heading flex items-center gap-3">
        <span className="skills-category-icon">
          <Icon className="h-5 w-5" />
        </span>
        <h4 className="skills-category-title font-bold">{title}</h4>
      </div>
      <ul className="skills-technology-grid">
        {skills.map((skill, index) => (
          <TechnologyItem
            key={skill}
            skill={skill}
            delay={260 + staggerIndex * 65 + Math.floor(index / 4) * 55}
          />
        ))}
      </ul>
    </MotionReveal>
  );
}

function LevelGroup({
  title,
  skills,
  delay,
  className = "",
  labelledBy,
  showTitle = true,
}: {
  title: string;
  skills: readonly string[];
  delay: number;
  className?: string;
  labelledBy?: string;
  showTitle?: boolean;
}) {
  return (
    <MotionReveal
      as="article"
      aria-labelledby={labelledBy}
      delay={delay}
      className={`skills-level-group min-w-0 ${className}`.trim()}
    >
      {showTitle ? (
        <h4 className="skills-level-title text-base font-bold">{title}</h4>
      ) : null}
      <ul className="skills-level-list">
        {skills.map((skill) => (
          <li key={skill} className="min-w-0 max-w-full">
            <SkillLevelItem skill={skill} />
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
      className="section-shell skills-panel section-frame page-panel relative"
    >
      <div className="skills-layout relative mx-auto w-full">
        <MotionReveal className="skills-introduction text-center">
          <p className="skills-badge mx-auto inline-flex text-sm font-bold">
            SKILLS
          </p>

          <h2
            id="skills-title"
            className="skills-title section-title mx-auto font-bold tracking-normal"
          >
            Technologies I use and continue to develop.
          </h2>

          <p className="skills-summary body-copy mx-auto text-base">
            My skills have been developed through university coursework,
            practical projects, and continuous hands-on learning.
          </p>
        </MotionReveal>

        <section aria-labelledby="core-stack-title" className="skills-core-stack">
          <MotionReveal
            as="h3"
            id="core-stack-title"
            delay={100}
            className="skills-area-title"
          >
            Core Technology Stack
          </MotionReveal>

          <div className="skills-category-grid grid min-w-0">
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
        </section>

        <section aria-labelledby="learning-title" className="skills-proficiency-area">
          <MotionReveal
            as="h3"
            id="learning-title"
            delay={700}
            className="skills-area-title"
          >
            Currently Learning
          </MotionReveal>
          <LevelGroup
            title="Currently Learning"
            skills={skillLevels[1].skills}
            delay={760}
            className="skills-learning-group"
            labelledBy="learning-title"
            showTitle={false}
          />
        </section>

        <aside aria-labelledby="skill-level-title" className="skills-proficiency-area">
          <MotionReveal delay={820}>
            <h3 id="skill-level-title" className="skills-area-title">
              Current Skill Level
            </h3>
            <p className="skills-level-summary body-copy text-base">
              Practical familiarity by focus area.
            </p>
          </MotionReveal>

          <div className="skills-level-grid grid min-w-0">
            <LevelGroup
              title={skillLevels[0].title}
              skills={skillLevels[0].skills}
              delay={880}
            />
            <LevelGroup
              title={skillLevels[2].title}
              skills={skillLevels[2].skills}
              delay={960}
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
