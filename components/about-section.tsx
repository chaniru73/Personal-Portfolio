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
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-100">
        {title}
      </h3>
      <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.55)]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative border-t border-cyan-300/10 px-5 py-20 sm:px-8 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.08)]">
            About Me
          </p>

          <h2
            id="about-title"
            className="max-w-3xl text-3xl font-bold tracking-normal text-white sm:text-4xl lg:text-5xl"
          >
            Building software with a focus on reliable delivery.
          </h2>

          <div className="mt-7 space-y-5 text-base leading-8 text-slate-300 sm:text-lg">
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
        </div>

        <aside
          aria-label="About information"
          className="rounded-2xl border border-cyan-300/15 bg-slate-950/70 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur sm:p-6"
        >
          <div className="grid gap-8 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <DetailList title="Education" items={education} />
            <DetailList title="Currently learning" items={currentlyLearning} />
            <DetailList title="Core strengths" items={coreStrengths} />
          </div>
        </aside>

        <div className="lg:col-span-2">
          <p className="rounded-xl border border-blue-300/20 bg-blue-300/[0.07] px-5 py-4 text-sm font-semibold leading-7 text-blue-100 shadow-[0_0_28px_rgba(59,130,246,0.12)] sm:text-base">
            I&apos;m open to Software Engineering, Backend Development, Cloud,
            and DevOps internships or entry-level opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}
