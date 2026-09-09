import {
  CheckIcon,
  DatabaseIcon,
  ExternalIcon,
  GitBranchIcon,
  LayersIcon,
  ServerIcon,
} from "@/components/icons";
import MotionReveal from "@/components/motion-reveal";

const project = {
  number: "Project 01",
  name: "University ERP System",
  type: "University Group Project",
  status: "Completed",
  problem:
    "University academic and administrative information can be difficult to manage across separate processes. This project brings key operations together in one digital platform.",
  description:
    "A web-based University ERP system designed to manage students, lecturers, administrators, academic information, examinations, and other university operations.",
  contribution:
    "Backend development, API development, database integration, authentication, and role-based access control.",
  keyFeatures: [
    "Role-based login and access control",
    "Student and lecturer management",
    "Academic and examination management",
  ],
  technologies: [
    "Node.js",
    "Express.js",
    "JavaScript",
    "HTML",
    "CSS",
    "Bootstrap",
    "Microsoft SQL Server",
    "Git",
    "GitHub",
    "Postman",
  ],
  links: [
    {
      label: "Repository",
      text: "Repository link is not currently listed.",
    },
    {
      label: "Live demo",
      text: "Live demo is not currently available.",
    },
  ],
} as const;

const projectViews = ["Overview", "Features", "Technology"] as const;
const technicalFocus = ["Backend", "APIs", "Database", "Access Control"] as const;

function PanelHeading({
  icon: Icon,
  id,
  children,
}: {
  icon: typeof LayersIcon;
  id: string;
  children: string;
}) {
  return (
    <div className="projects-panel-heading">
      <span className="projects-panel-icon" aria-hidden="true">
        <Icon className="h-4 w-4" />
      </span>
      <h3 id={id}>{children}</h3>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      tabIndex={-1}
      aria-labelledby="projects-title"
      className="section-shell projects-panel section-frame page-panel"
    >
      <div className="projects-showcase">
        <MotionReveal className="projects-banner" variant="fade-up">
          <div aria-hidden="true" className="projects-banner-pattern">
            <span className="projects-banner-node projects-banner-node-one" />
            <span className="projects-banner-node projects-banner-node-two" />
            <span className="projects-banner-node projects-banner-node-three" />
          </div>
          <MotionReveal
            as="h2"
            id="projects-title"
            className="projects-outline-title"
            variant="scale-in"
            delay={80}
          >
            Projects
          </MotionReveal>
          <p className="projects-banner-heading">
            Practical work that reflects how I learn and build.
          </p>
          <p className="projects-banner-copy">
            A university group project where I applied software development
            concepts to practical problems.
          </p>
        </MotionReveal>

        <MotionReveal className="projects-information-strip" delay={140}>
          <ul aria-label="Project information groups">
            {projectViews.map((view, index) => (
              <li key={view}>
                <span aria-hidden="true">0{index + 1}</span>
                {view}
              </li>
            ))}
          </ul>
        </MotionReveal>

        <article className="projects-mosaic" aria-labelledby="project-name">
          <MotionReveal
            as="section"
            className="projects-mosaic-panel projects-identity-panel"
            variant="scale-in"
            delay={220}
            hover="card"
            aria-labelledby="project-name"
          >
            <span aria-hidden="true" className="projects-panel-pattern projects-network-pattern" />
            <div className="projects-project-meta">
              <span>{project.number}</span>
              <span>{project.type}</span>
              <span className="projects-completed-status">{project.status}</span>
            </div>

            <div className="projects-system-visual" aria-label="Project visual placeholder" role="img">
              <span aria-hidden="true" className="projects-system-core">
                <ServerIcon className="h-8 w-8" />
              </span>
              <span aria-hidden="true" className="projects-system-line projects-system-line-one" />
              <span aria-hidden="true" className="projects-system-line projects-system-line-two" />
              <span aria-hidden="true" className="projects-system-node projects-system-node-one" />
              <span aria-hidden="true" className="projects-system-node projects-system-node-two" />
              <span aria-hidden="true" className="projects-system-node projects-system-node-three" />
            </div>

            <h3 id="project-name" className="projects-project-title">
              {project.name}
            </h3>
            <div className="projects-focus-list" aria-label="Project technical focus">
              {technicalFocus.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </MotionReveal>

          <MotionReveal
            as="section"
            className="projects-mosaic-panel projects-overview-panel"
            variant="fade-left"
            delay={290}
            hover="card"
            aria-labelledby="project-overview-title"
          >
            <span aria-hidden="true" className="projects-panel-pattern projects-grid-pattern" />
            <PanelHeading icon={LayersIcon} id="project-overview-title">
              Project overview
            </PanelHeading>
            <p>{project.description}</p>
          </MotionReveal>

          <MotionReveal
            as="section"
            className="projects-mosaic-panel projects-problem-panel"
            variant="fade-right"
            delay={360}
            hover="card"
            aria-labelledby="project-problem-title"
          >
            <span aria-hidden="true" className="projects-panel-pattern projects-api-pattern" />
            <PanelHeading icon={LayersIcon} id="project-problem-title">
              Problem
            </PanelHeading>
            <p>{project.problem}</p>
          </MotionReveal>

          <MotionReveal
            as="section"
            className="projects-mosaic-panel projects-contribution-panel"
            variant="fade-left"
            delay={430}
            hover="card"
            aria-labelledby="project-contribution-title"
          >
            <span aria-hidden="true" className="projects-panel-pattern projects-terminal-pattern" />
            <PanelHeading icon={DatabaseIcon} id="project-contribution-title">
              My contribution
            </PanelHeading>
            <p>{project.contribution}</p>
          </MotionReveal>

          <MotionReveal
            as="section"
            className="projects-mosaic-panel projects-features-panel"
            variant="fade-right"
            delay={500}
            hover="card"
            aria-labelledby="project-features-title"
          >
            <span aria-hidden="true" className="projects-panel-pattern projects-access-pattern" />
            <PanelHeading icon={CheckIcon} id="project-features-title">
              Key features
            </PanelHeading>
            <ul className="projects-feature-list">
              {project.keyFeatures.map((feature) => (
                <li key={feature}>
                  <CheckIcon className="h-4 w-4" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </MotionReveal>

          <MotionReveal
            as="section"
            className="projects-mosaic-panel projects-technology-panel"
            delay={570}
            hover="card"
            aria-labelledby="project-technology-title"
          >
            <span aria-hidden="true" className="projects-panel-pattern projects-database-pattern" />
            <PanelHeading icon={DatabaseIcon} id="project-technology-title">
              Technologies and availability
            </PanelHeading>

            <ul className="projects-technology-list" aria-label="Project technologies">
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>

            <dl className="projects-availability-list">
              {project.links.map((link) => {
                const Icon = link.label === "Repository" ? GitBranchIcon : ExternalIcon;

                return (
                  <div key={link.label}>
                    <dt>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {link.label}
                    </dt>
                    <dd>{link.text}</dd>
                  </div>
                );
              })}
            </dl>
          </MotionReveal>
        </article>

        <MotionReveal as="p" className="projects-closing-message" delay={700}>
          More practical projects are in development.
        </MotionReveal>
      </div>
    </section>
  );
}
