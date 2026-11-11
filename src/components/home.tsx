"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import {
  ArrowUpRight,
  ChevronDown,
  Plus,
  Minus,
  Menu,
  X,
  Layers3,
  Workflow,
  ChartNoAxesCombined,
  MoveUpRight,
} from "lucide-react";
import { solutions, processSteps } from "@/content/site";
import { services, serviceFor } from "@/content/catalog";
import Survey from "@/components/assessment";
import CinematicHero from "@/components/cinematic-hero";
import MotionShowcase from "@/components/motion-showcase";
import { EnquiryCTA } from "@/components/enquiry-popup";
import { usePathname } from "next/navigation";
import { useExperienceMotion as useReducedMotion } from "@/hooks/use-experience-motion";

function Arrow() {
  return <ArrowUpRight size={19} aria-hidden="true" />;
}
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span /> {children}
    </p>
  );
}
function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? {} : { y: [24, 0] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesToggle = useRef<HTMLButtonElement>(null);
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open && !servicesOpen) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (servicesOpen) {
          setServicesOpen(false);
          servicesToggle.current?.focus();
        } else {
          setOpen(false);
          ref.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open, servicesOpen]);
  return (
    <header className="header">
      <Link href="/" className="wordmark" aria-label="Wexoraa Infotech home">
        <Image
          src="/brand/wexoraa-logo.svg"
          alt="Wexoraa Infotech"
          width={296}
          height={60}
          className="brand-logo"
          priority
        />
      </Link>
      <nav
        aria-label="Main navigation"
        id="main-navigation"
        className={`nav ${open ? "open" : ""}`}
      >
        {[
          ["Solutions", "/solutions"],
          ["Services", "/services"],
          ["Work", "/work"],
          ["About", "/about"],
          ["Contact", "/contact"],
        ].map(([text, url]) =>
          text === "Services" ? (
            <div
              className="nav-services"
              key={url}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget))
                  setServicesOpen(false);
              }}
            >
              <div className="nav-services-trigger">
                <Link
                  href="/services"
                  data-active={pathname.startsWith("/services")}
                  aria-current={pathname === "/services" ? "page" : undefined}
                  onClick={() => {
                    setOpen(false);
                    setServicesOpen(false);
                  }}
                >
                  Services
                </Link>
                <button
                  ref={servicesToggle}
                  type="button"
                  aria-label="Browse all services"
                  aria-expanded={servicesOpen}
                  aria-controls="services-dropdown"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  <ChevronDown size={16} />
                </button>
              </div>
              <div
                className="services-dropdown"
                id="services-dropdown"
                hidden={!servicesOpen}
              >
                <div className="services-dropdown-heading">
                  <span>WHAT CAN WE HELP YOU WITH?</span>
                  <Link
                    href="/services"
                    onClick={() => {
                      setOpen(false);
                      setServicesOpen(false);
                    }}
                  >
                    View all services <Arrow />
                  </Link>
                </div>
                <div className="services-dropdown-grid">
                  {["build", "operate", "grow"].map((group) => (
                    <section key={group} aria-label={`${group} services`}>
                      <h2>
                        {
                          solutions.find((area) => area.id === group)
                            ?.shortTitle
                        }
                      </h2>
                      {services
                        .filter((service) => service.group === group)
                        .map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            aria-current={
                              pathname === `/services/${service.slug}`
                                ? "page"
                                : undefined
                            }
                            onClick={() => {
                              setOpen(false);
                              setServicesOpen(false);
                            }}
                          >
                            {service.title}
                            <ArrowUpRight size={15} aria-hidden="true" />
                          </Link>
                        ))}
                    </section>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={url}
              href={url}
              data-active={pathname === url || pathname.startsWith(url + "/")}
              aria-current={pathname === url ? "page" : undefined}
              onClick={() => {
                setOpen(false);
                setServicesOpen(false);
              }}
            >
              {text}
            </Link>
          ),
        )}
      </nav>
      <EnquiryCTA
        interest="Project enquiry"
        label="Start a project"
        className="button header-project"
      >
        <span>Start a project</span>
        <Arrow />
      </EnquiryCTA>
      <button
        ref={ref}
        className="icon-button mobile-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-controls="main-navigation"
        aria-expanded={open}
        onClick={() => {
          setOpen(!open);
          setServicesOpen(false);
        }}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 250, damping: 25 });
  const sy = useSpring(y, { stiffness: 250, damping: 25 });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target =
        e.target instanceof Element
          ? e.target.closest("[data-cursor],a,button")
          : null;
      const label = target?.getAttribute("data-cursor") || "";
      if (ref.current) {
        ref.current.dataset.active = target ? "true" : "false";
        ref.current.dataset.label = label;
      }
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [reduced, x, y]);
  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className="cursor-accent"
      style={{ left: sx, top: sy }}
    />
  );
}
function ProblemFinder({ configured = false }: { configured?: boolean }) {
  return (
    <section className="problem section" id="challenge">
      <Reveal className="problem-intro">
        <Label>LET’S CHECK YOUR BUSINESS</Label>
        <h2>
          How ready is your business
          <br />
          <span>for its next stage of growth?</span>
        </h2>
        <p>
          Let’s find out together. Answer 12 simple questions about your
          website, marketing and day-to-day work. See what’s going well and
          where a few changes could help.
        </p>
        <div className="survey-benefits">
          <span>✓ Get your business growth-readiness score</span>
          <span>✓ See what to work on first</span>
          <span>✓ No email or signup needed</span>
        </div>
        <a className="button survey-start" href="#home-survey-question">
          Check my growth score <Arrow />
        </a>
        <p className="survey-explainer">
          A practical check of your digital setup, not a sales forecast. Your
          result is based on the answers you share.
        </p>
      </Reveal>
      <Survey configured={configured} embedded />
    </section>
  );
}
function Solutions() {
  const [active, setActive] = useState(0);
  return (
    <section className="solutions section" id="solutions">
      <Reveal className="section-heading">
        <div>
          <Label>HOW WE CAN HELP</Label>
          <h2>
            A better website? Less admin?
            <br />
            More customers?
          </h2>
        </div>
        <p>
          Choose what you need help with.
          <br />
          We’ll take you through the next steps.
        </p>
      </Reveal>
      <div className="solutions-layout">
        <div
          className="solution-menu"
          role="tablist"
          aria-label="Solution areas"
        >
          {solutions.map((s, i) => (
            <button
              key={s.id}
              id={`tab-${s.id}`}
              role="tab"
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              aria-controls="solution-panel"
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (
                  [
                    "ArrowDown",
                    "ArrowUp",
                    "ArrowLeft",
                    "ArrowRight",
                    "Home",
                    "End",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 2
                        : (i +
                            (["ArrowDown", "ArrowRight"].includes(e.key)
                              ? 1
                              : 2)) %
                          3;
                  setActive(next);
                  document.getElementById(`tab-${solutions[next].id}`)?.focus();
                }
              }}
            >
              <span>0{i + 1}</span>
              <strong>
                {s.title}
                <small>
                  {s.id === "build"
                    ? "Branding · UI/UX · Websites · Mobile apps"
                    : s.id === "operate"
                      ? "CRM · ERP · Integrations · Automation"
                      : "SEO · Ads · Social media · Video"}
                </small>
              </strong>
              <Arrow />
            </button>
          ))}
        </div>
        <div
          id="solution-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`tab-${solutions[active].id}`}
        >
          <div className="solution-service-image">
            <Image
              src={solutions[active].image}
              alt={solutions[active].imageAlt}
              width={800}
              height={450}
              loading="eager"
              sizes="(max-width:900px) 100vw, 50vw"
            />
          </div>
          <span className="solution-icon">
            {active === 0 ? (
              <Layers3 />
            ) : active === 1 ? (
              <Workflow />
            ) : (
              <ChartNoAxesCombined />
            )}
          </span>
          <h3>{solutions[active].description}</h3>
          <p>{solutions[active].detail}</p>
          <div className="service-chips">
            {solutions[active].services.map((s) => (
              <Link
                key={s}
                href={`/services/${serviceFor(s)?.slug || "websites-ecommerce"}`}
              >
                {s}
                <Plus size={14} />
              </Link>
            ))}
          </div>
          <Link
            href={`/solutions/${solutions[active].id}`}
            className="button text-link"
          >
            See these services <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
function Work() {
  return (
    <section className="work section" id="work">
      <Reveal className="section-heading">
        <div>
          <Label>A FEW DESIGN IDEAS</Label>
          <h2>
            See what your next
            <br />
            project could look like.
          </h2>
        </div>
        <span className="work-note">
          STUDIO CONCEPTS
          <br />
          Not commissioned client work.
        </span>
      </Reveal>
      <div className="work-grid">
        <Link
          href="/work/considered-brand-experience"
          className="work-card"
          data-cursor="View"
        >
          <div className="project-image brand-image">
            <Image
              src="/brand-art.webp"
              alt="Editorial concept of an olive and cream skincare brand with carefully arranged packaging"
              fill
              sizes="(max-width:640px) 100vw, 60vw"
            />
            <span className="project-pill">BRAND EXPERIENCE</span>
            <span className="project-view">
              <Arrow />
            </span>
          </div>
          <div className="work-title">
            <div>
              <h3>A considered first impression.</h3>
              <p>Brand identity · Art direction · Digital experience</p>
            </div>
            <span>01 / CONCEPT</span>
          </div>
        </Link>
        <Link
          href="/work/connected-business-concept"
          className="work-card secondary-project"
          data-cursor="Explore"
        >
          <div className="project-image product-image">
            <Image
              src="/hero-art.webp"
              alt="Connected silver and green sculptural forms as a technology concept"
              fill
              sizes="(max-width:640px) 100vw, 40vw"
            />
            <span className="project-pill">CONNECTED THINKING</span>
            <div className="project-overlay">
              <span>LESS FRICTION.</span>
              <h3>
                More
                <br />
                possibility.
              </h3>
            </div>
            <span className="project-view">
              <Arrow />
            </span>
          </div>
          <div className="work-title">
            <div>
              <h3>Designed to connect.</h3>
              <p>Digital strategy · Systems · Automation</p>
            </div>
            <span>02 / CONCEPT</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
function Process() {
  const [active, setActive] = useState(0);
  return (
    <section className="process section" id="process">
      <div className="process-left">
        <Label>GOOD WORK IS A CONVERSATION</Label>
        <h2>
          A little curiosity.
          <br />A clear direction.
          <br />
          <span>A better result.</span>
        </h2>
        <p>
          We ask, listen and challenge assumptions.
          <br />
          Then we make a plan worth building.
        </p>
        <Link href="/contact" className="button button-outline">
          Meet your next partner <Arrow />
        </Link>
      </div>
      <div className="process-list">
        {processSteps.map(([name, title, desc], i) => (
          <div
            key={name}
            className={active === i ? "process-item selected" : "process-item"}
          >
            <h3>
              <button
                aria-expanded={active === i}
                aria-controls={`process-${i}`}
                onClick={() => setActive(active === i ? -1 : i)}
              >
                <span>0{i + 1}</span>
                {name}
                {active === i ? <Minus size={19} /> : <Plus size={19} />}
              </button>
            </h3>
            <div id={`process-${i}`} hidden={active !== i}>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function Capabilities() {
  return (
    <section className="engineering section" id="capabilities">
      <Label>TOOLS THAT HELP YOUR BUSINESS</Label>
      <div className="engineering-heading">
        <h2>
          Built for your customers.
          <br />
          <span>Useful for your team.</span>
        </h2>
        <p>
          Your website should bring people in. Your software should make work
          easier. We help you get both right.
        </p>
      </div>
      <div className="engineering-grid">
        {[
          [
            "01",
            "Digital platforms",
            "Websites, commerce and mobile experiences that connect your business to your customers.",
          ],
          [
            "02",
            "Business systems",
            "CRM, ERP and custom software that bring your people and information together.",
          ],
          [
            "03",
            "AI & automation",
            "Connect your tools and automate repetitive tasks so your team has more time for customers.",
          ],
        ].map(([n, t, p]) => (
          <Reveal key={n} className="engineering-card">
            <span>
              {n} <MoveUpRight size={22} />
            </span>
            <h3>{t}</h3>
            <p>{p}</p>
            <Link
              href="/contact?interest=engineering"
              className="button text-link"
            >
              Talk to us <Arrow />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
function Partnership() {
  return (
    <section className="partnership section" id="partnership">
      <Label>HERE TO HELP, FROM START TO FINISH</Label>
      <h2>
        Start with one project.
        <br />
        <span>Get support as you grow.</span>
      </h2>
      <div className="partnership-bottom">
        <p>
          Tell us what you need today. We’ll help you choose a sensible first
          step, explain the work clearly and support you after launch.
        </p>
        <div>
          <span>01 / PROJECTS</span>
          <span>02 / ONGOING SUPPORT</span>
          <span>03 / TECHNOLOGY PARTNERSHIP</span>
        </div>
        <Link
          href="/contact"
          className="button"
          aria-label="Discuss a partnership"
        >
          Let’s talk <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
export function ContactLinks() {
  const phone = process.env.NEXT_PUBLIC_WEXORAA_PHONE;
  const whatsapp = process.env.NEXT_PUBLIC_WEXORAA_WHATSAPP;
  return (
    <div className="contact-links">
      <Link href="/contact">
        Start a conversation <Arrow />
      </Link>
      {phone && (
        <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>
          Call us <Arrow />
        </a>
      )}
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Wexoraa, I'd like to discuss a technology or digital growth requirement for my business.")}`}
        >
          WhatsApp <Arrow />
        </a>
      )}
    </div>
  );
}
export function Footer() {
  return (
    <footer className="footer footer-final footer-modern">
      <div className="footer-invite">
        <div>
          <p className="eyebrow">
            <span /> LET’S TALK
          </p>
          <h2>Got a good challenge?</h2>
          <p>
            Tell us what you’d like to improve. We’ll help you work out where to
            start.
          </p>
        </div>
        <EnquiryCTA
          interest="Project enquiry"
          className="button footer-invite-link"
        >
          Tell us about your project <Arrow />
        </EnquiryCTA>
      </div>
      <div className="footer-panel">
        <div className="footer-panel-top">
          <span>DESIGN, SOFTWARE & MARKETING. ONE TEAM.</span>
          <span>
            DESIGN <i /> SIMPLIFY <i /> GROW
          </span>
        </div>
        <div className="footer-main">
          <div className="footer-brand">
            <Link
              href="/"
              className="footer-logo"
              aria-label="Wexoraa Infotech home"
            >
              <Image
                src="/brand/wexoraa-logo.svg"
                alt="Wexoraa Infotech"
                width={296}
                height={60}
                className="brand-logo"
              />
            </Link>
            <p>
              Websites, apps, business software
              <br />
              and marketing that work for you.
            </p>
            <span className="footer-place">COIMBATORE, TAMIL NADU · INDIA</span>
          </div>
          <nav aria-label="Footer explore">
            <h3>Explore</h3>
            {[
              ["Solutions", "/solutions"],
              ["Services", "/services"],
              ["Work", "/work"],
              ["About", "/about"],
              ["Our process", "/process"],
            ].map(([t, h]) => (
              <Link key={h} href={h}>
                {t}
              </Link>
            ))}
          </nav>
          <nav aria-label="Footer services">
            <h3>Our services</h3>
            {services
              .filter((service) =>
                [
                  "websites-ecommerce",
                  "brand-strategy-identity",
                  "ui-ux-design",
                  "crm-lead-management",
                ].includes(service.slug),
              )
              .map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  {service.title}
                </Link>
              ))}
            <Link href="/services">
              All services <Arrow />
            </Link>
          </nav>
          <nav aria-label="Footer connect">
            <h3>Let’s connect</h3>
            <EnquiryCTA
              interest="Project enquiry"
              className="footer-enquiry-link"
            >
              Discuss your project <Arrow />
            </EnquiryCTA>
            <Link href="/business-assessment">
              Check your business growth score
            </Link>
            <Link href="/contact">Contact Wexoraa</Link>
            <ContactLinks />
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Wexoraa Infotech</span>
          <Link href="/privacy">Privacy</Link>
          <Link href="/#top">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}

export default function Home({ emailReady = false }: { emailReady?: boolean }) {
  return (
    <>
      <Header />
      <main id="main">
        <CinematicHero />
        <MotionShowcase />
        <ProblemFinder configured={emailReady} />
        <Solutions />
        <Work />
        <Capabilities />
        <Process />
        <Partnership />
      </main>
      <Footer />
    </>
  );
}
