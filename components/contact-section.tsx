import { MailIcon } from "@/components/icons";
import ContactForm from "@/components/contact-form";
import MotionLink from "@/components/motion-link";
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

          <MotionReveal className="contact-direct" delay={190}>
            <p>Prefer to write directly?</p>
            <MotionLink
              href="mailto:chaniruweerasuriya@gmail.com"
              aria-label="Email Chaniru Weerasuriya directly"
              title="Email Chaniru Weerasuriya"
              className="social-icon-button contact-email-link focus-ring"
              interaction="icon"
            >
              <MailIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Email Chaniru Weerasuriya</span>
            </MotionLink>
          </MotionReveal>
        </div>

        <div className="contact-form-shell">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
