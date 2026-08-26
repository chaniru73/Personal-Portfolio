import RevealOnScroll from "@/components/reveal-on-scroll";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Java", "JavaScript", "Dart", "Python", "SQL"],
  },
  {
    title: "Frontend & Mobile",
    skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "Flutter"],
  },
  {
    title: "Backend Development",
    skills: ["Node.js", "Express.js", "Spring Boot"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "Microsoft SQL Server"],
  },
  {
    title: "Cloud & DevOps",
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
  skills,
  staggerIndex,
}: {
  title: string;
  skills: readonly string[];
  staggerIndex: number;
}) {
  return (
    <article
      className={`surface-card card-hover tag-card group min-w-0 rounded-lg stagger-item stagger-delay-${Math.min(
        staggerIndex + 2,
        6,
      )}`}
    >
      <h3 className="card-title text-base font-bold">{title}</h3>
      <ul className="tag-list mt-6">
        {skills.map((skill) => (
          <li key={skill} className="min-w-0 max-w-full">
            <SkillBadge skill={skill} />
          </li>
        ))}
      </ul>
    </article>
  );
}

function LevelGroup({
  title,
  skills,
}: {
  title: string;
  skills: readonly string[];
}) {
  return (
    <div className="subtle-panel card-hover min-w-0 rounded-lg p-5">
      <h3 className="accent-text text-sm font-bold uppercase tracking-[0.16em]">
        {title}
      </h3>
      <ul className="tag-list mt-6">
        {skills.map((skill) => (
          <li key={skill} className="min-w-0 max-w-full">
            <span className="meta-badge text-sm font-medium">
              {skill}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <RevealOnScroll delay={120} variant="fade-up">
      <section
        id="skills"
        aria-labelledby="skills-title"
        className="section-shell page-panel relative px-5 py-20 sm:px-8 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="section-divider pointer-events-none absolute inset-x-0 top-0 h-px"
        />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="stagger-item stagger-delay-1 max-w-3xl">
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
        </div>

        <div className="mt-12 grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard
              key={category.title}
              title={category.title}
              skills={category.skills}
              staggerIndex={index}
            />
          ))}
        </div>

        <aside
          aria-labelledby="skill-level-title"
          className="stagger-item stagger-delay-6 soft-card mt-10 rounded-lg p-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="accent-text text-sm font-bold uppercase tracking-[0.16em]">
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

          <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-3">
            {skillLevels.map((level) => (
              <LevelGroup
                key={level.title}
                title={level.title}
                skills={level.skills}
              />
            ))}
          </div>
        </aside>
        </div>
      </section>
    </RevealOnScroll>
  );
}
