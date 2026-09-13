import ContactForm from "@/components/contact-form";
import MotionReveal from "@/components/motion-reveal";

export default function ContactSection() {
  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className="section-shell contact-panel section-frame page-panel"
    >
      <div className="contact-content">
        <div className="contact-copy-column">
          <MotionReveal
            as="p"
            className="contact-outline-title"
            variant="scale-in"
            data-section-number="06"
          >
            Contact
          </MotionReveal>

          <MotionReveal className="contact-introduction" delay={80}>
            <h2 id="contact-title">Let&apos;s connect and discuss opportunities.</h2>
            <p>
              I&apos;m open to Software Engineering, Backend Development, Cloud, and
              DevOps internships or entry-level opportunities where I can learn,
              contribute, and gain practical industry experience.
            </p>
          </MotionReveal>

          <MotionReveal className="contact-divider-wrap" delay={150}>
            <span aria-hidden="true" className="contact-divider" />
          </MotionReveal>

          <MotionReveal as="p" className="contact-direct" delay={190}>
            Prefer to write directly?{" "}
            <a className="focus-ring" href="mailto:chaniruweerasuriya@gmail.com">
              chaniruweerasuriya@gmail.com
            </a>
          </MotionReveal>
        </div>

        <div className="contact-form-shell">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
