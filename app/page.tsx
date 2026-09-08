import AboutSection from "@/components/about-section";
import AmbientBackground from "@/components/ambient-background";
import ContactSection from "@/components/contact-section";
import EducationSection from "@/components/education-section";
import HomeSection from "@/components/home-section";
import ProjectsSection from "@/components/projects-section";
import SiteFooter from "@/components/site-footer";
import SiteNavigation from "@/components/site-navigation";
import SkillsSection from "@/components/skills-section";

export default function Home() {
  return (
    <div className="page-shell relative min-h-screen">
      <AmbientBackground />
      <a href="#main-content" className="skip-link focus-ring">Skip to content</a>
      <header className="site-header fixed inset-x-0 top-0 z-[100]">
        <SiteNavigation />
      </header>

      <main id="main-content" tabIndex={-1} className="main-stack relative z-10">
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
