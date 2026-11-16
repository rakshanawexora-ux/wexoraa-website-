"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import {
  ArrowUpRight,
  ChevronDown,
  Plus,
  Menu,
  X,
  Layers3,
  Workflow,
  ChartNoAxesCombined,
  MoveUpRight,
} from "lucide-react";
import { solutions, processSteps } from "@/content/site";
import { services, serviceFor } from "@/content/catalog";
import GrowthInvitation from "@/components/growth-invitation";
import ProjectShowcase from "@/components/project-showcase";
import HomeFaq from "@/components/home-faq";
import SystemsIllustration from "@/components/systems-illustration";
import ActionArrow from "@/components/action-arrow";
import BusinessMotionGraphic from "@/components/business-motion-graphic";
import ClientMarquee from "@/components/client-marquee";
import CinematicHero from "@/components/cinematic-hero";
import MotionShowcase from "@/components/motion-showcase";
import BendingMarquee from "@/components/bending-marquee";
import { EnquiryCTA } from "@/components/enquiry-popup";
import { usePathname } from "next/navigation";
import { useExperienceMotion as useReducedMotion } from "@/hooks/use-experience-motion";

function Arrow() {
  return <ActionArrow />;
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
  return <div className={className}>{children}</div>;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesToggle = useRef<HTMLButtonElement>(null);
  const hoverOpened = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open && !servicesOpen) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (servicesOpen) {
          setServicesOpen(false);
          hoverOpened.current = false;
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
    <header className="header floating-header">
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
          ["What we do", "/services"],
          ["Work", "/work"],
          ["About", "/about"],
          ["Contact", "/contact"],
        ].map(([text, url]) =>
          text === "What we do" ? (
            <div
              className="nav-services"
              key={url}
              onPointerEnter={(e) => {
                if (
                  e.pointerType !== "mouse" ||
                  !matchMedia("(min-width:901px)").matches
                )
                  return;
                cancelClose();
                if (!servicesOpen) hoverOpened.current = true;
                setServicesOpen(true);
              }}
              onPointerLeave={(e) => {
                if (
                  e.pointerType !== "mouse" ||
                  !matchMedia("(min-width:901px)").matches
                )
                  return;
                cancelClose();
                closeTimer.current = setTimeout(() => {
                  setServicesOpen(false);
                  hoverOpened.current = false;
                }, 160);
              }}
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
                  What we do
                </Link>
                <button
                  ref={servicesToggle}
                  type="button"
                  aria-label="Browse all services"
                  aria-expanded={servicesOpen}
                  aria-controls="services-dropdown"
                  onClick={() => {
                    cancelClose();
                    if (hoverOpened.current) {
                      hoverOpened.current = false;
                      return;
                    }
                    setServicesOpen(!servicesOpen);
                  }}
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
                  <span>ONE TEAM. ALL THE PIECES.</span>
                  <Link
                    href="/services"
                    onClick={() => {
                      setOpen(false);
                      setServicesOpen(false);
                    }}
                  >
                    Explore what we do <Arrow />
                  </Link>
                </div>
                <div className="services-dropdown-grid">
                  {["build", "operate", "grow"].map((group, index) => (
                    <section key={group} aria-label={`${group} services`}>
                      <div className="service-group-badge" aria-hidden="true">
                        {index === 0 ? (
                          <Layers3 size={20} />
                        ) : index === 1 ? (
                          <Workflow size={20} />
                        ) : (
                          <ChartNoAxesCombined size={20} />
                        )}
                        <span>0{index + 1}</span>
                      </div>
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
              onPointerEnter={(e) => {
                if (
                  e.pointerType === "mouse" &&
                  !e.currentTarget.parentElement?.querySelector(
                    ":focus-visible",
                  )
                )
                  setActive(i);
              }}
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
          <div className="solution-service-image" key={solutions[active].id}>
            {active === 1 ? (
              <SystemsIllustration label={solutions[active].imageAlt} />
            ) : (
              <Image
                src={solutions[active].image}
                alt={solutions[active].imageAlt}
                width={800}
                height={450}
                loading="eager"
                sizes="(max-width:900px) 100vw, 50vw"
              />
            )}
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
        </div>
      </div>
    </section>
  );
}
function Process() {
  const [active, setActive] = useState(0);
  return (
    <section className="process section process-roadmap" id="process">
      <div className="roadmap-heading">
        <div>
          <Label>FROM FIRST HELLO TO WHAT’S NEXT</Label>
          <h2>
            A clear path.
            <br />
            <span>Built together.</span>
          </h2>
        </div>
        <p>
          You’ll always know what we’re working on, what comes next and where
          your input matters.
        </p>
      </div>
      <div className="roadmap-layout">
        <div
          className="roadmap-steps"
          role="tablist"
          aria-label="Our project process"
        >
          {processSteps.map(([name], i) => (
            <button
              type="button"
              key={name}
              role="tab"
              id={`roadmap-tab-${i}`}
              aria-selected={active === i}
              aria-controls="roadmap-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (
                  [
                    "ArrowDown",
                    "ArrowUp",
                    "ArrowRight",
                    "ArrowLeft",
                    "Home",
                    "End",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 5
                        : (i +
                            (["ArrowDown", "ArrowRight"].includes(e.key)
                              ? 1
                              : 5)) %
                          6;
                  setActive(next);
                  document.getElementById(`roadmap-tab-${next}`)?.focus();
                }
              }}
            >
              <span>0{i + 1}</span>
              <strong>{name}</strong>
              <ArrowUpRight size={20} />
            </button>
          ))}
        </div>
        <div
          className="roadmap-panel"
          role="tabpanel"
          id="roadmap-panel"
          aria-labelledby={`roadmap-tab-${active}`}
          tabIndex={0}
        >
          <div className="roadmap-art" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>0{active + 1}</span>
          </div>
          <div className="roadmap-panel-copy" key={active}>
            <span className="eyebrow">
              STEP 0{active + 1} / {processSteps[active][0].toUpperCase()}
            </span>
            <h3>{processSteps[active][1]}</h3>
            <p>{processSteps[active][2]}</p>
            <div className="roadmap-progress" aria-hidden="true">
              {processSteps.map(([name], i) => (
                <i key={name} className={i <= active ? "complete" : ""} />
              ))}
            </div>
            <span className="roadmap-caption">
              Your feedback shapes every stage.
            </span>
          </div>
        </div>
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
      <BusinessMotionGraphic />
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
              ["What we do", "/services"],
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

            <Link href="/business-assessment">
              Check your business growth score
            </Link>
            <Link href="/contact">Contact Wexoraa</Link>
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
      <main id="main" className="home-page">
        <CinematicHero />
        <ClientMarquee />
        <GrowthInvitation configured={emailReady} />
        <BendingMarquee />
        <Solutions />
        <MotionShowcase />
        <ProjectShowcase />
        <Capabilities />
        <Process />
        <Partnership />
        <HomeFaq />
      </main>
      <Footer />
    </>
  );
}
