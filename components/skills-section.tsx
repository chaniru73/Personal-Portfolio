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
    <span className="max-w-full rounded-md border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1.5 text-sm font-semibold leading-5 text-cyan-50 shadow-[0_0_18px_rgba(34,211,238,0.08)] transition group-hover:border-cyan-200/40 group-hover:bg-cyan-300/[0.12]">
      {skill}
    </span>
  );
}

function SkillCategoryCard({
  title,
  skills,
}: {
  title: string;
  skills: readonly string[];
}) {
  return (
    <article className="group min-w-0 rounded-lg border border-cyan-300/15 bg-slate-950/70 p-5 shadow-xl shadow-cyan-950/20 backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-cyan-200/35 hover:bg-slate-900/80 hover:shadow-cyan-900/25">
      <h3 className="text-base font-bold text-white">{title}</h3>
      <ul className="mt-5 flex min-w-0 flex-wrap gap-2.5">
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
    <div className="min-w-0 rounded-lg border border-white/10 bg-slate-950/45 p-4 transition duration-200 hover:border-blue-200/30 hover:bg-blue-300/[0.06]">
      <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-blue-100">
        {title}
      </h3>
      <ul className="mt-4 flex min-w-0 flex-wrap gap-2">
        {skills.map((skill) => (
          <li key={skill} className="min-w-0 max-w-full">
            <span className="max-w-full rounded-md border border-blue-300/20 bg-blue-300/[0.08] px-3 py-1.5 text-sm font-medium leading-5 text-slate-100">
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
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative border-t border-cyan-300/10 px-5 py-20 sm:px-8 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.08)]">
            Skills &amp; Tools
          </p>

          <h2
            id="skills-title"
            className="text-3xl font-bold tracking-normal text-white sm:text-4xl lg:text-5xl"
          >
            Technologies I use and continue to develop.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            My skills have been developed through university coursework,
            practical projects, and continuous hands-on learning.
          </p>
        </div>

        <div className="mt-12 grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <SkillCategoryCard
              key={category.title}
              title={category.title}
              skills={category.skills}
            />
          ))}
        </div>

        <aside
          aria-labelledby="skill-level-title"
          className="mt-10 rounded-lg border border-blue-300/20 bg-gradient-to-br from-slate-950/95 via-blue-950/45 to-cyan-950/30 p-5 shadow-2xl shadow-blue-950/25 backdrop-blur sm:p-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-100">
                Current Skill Level
              </p>
              <h2
                id="skill-level-title"
                className="mt-3 text-2xl font-bold tracking-normal text-white sm:text-3xl"
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
  );
}
