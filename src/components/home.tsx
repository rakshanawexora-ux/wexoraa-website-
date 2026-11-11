"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  ArrowDown,
  Plus,
  Minus,
  Menu,
  X,
  Check,
  ChevronLeft,
  Layers3,
  Workflow,
  ChartNoAxesCombined,
  MoveUpRight,
} from "lucide-react";
import { solutions, processSteps } from "@/content/site";

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
      whileInView={reduced ? {} : { y: [18, 0] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  return (
    <header className="header">
      <Link href="/" className="wordmark" aria-label="Wexoraa Infotech home">
        wexoraa<span>infotech</span>
      </Link>
      <nav
        aria-label="Main navigation"
        id="main-navigation"
        className={`nav ${open ? "open" : ""}`}
      >
        {[
          ["What we do", "/#solutions"],
          ["Our approach", "/#process"],
          ["Explore work", "/#work"],
        ].map(([text, url]) => (
          <Link key={url} href={url} onClick={() => setOpen(false)}>
            {text}
          </Link>
        ))}
        <Link className="nav-contact" href="/contact">
          Let’s talk{" "}
          <span>
            <Arrow />
          </span>
        </Link>
      </nav>
      <button
        ref={ref}
        className="icon-button mobile-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-controls="main-navigation"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
function Cursor() {
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
function Magnetic({
  children,
  className = "",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.12);
        y.set((e.clientY - r.top - r.height / 2) * 0.12);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  return (
    <section ref={ref} className="hero" id="top">
      <div className="hero-topline">
        <Label>INDEPENDENT THINKING. CONNECTED POSSIBILITIES.</Label>
        <span className="location">
          <span /> COIMBATORE, INDIA · WORKING EVERYWHERE
        </span>
      </div>
      <div className="hero-title">
        <h1>
          Good design.
          <br />
          Smart technology.
          <br />
          <span>Better business.</span>
        </h1>
        <div className="hero-intro">
          <span className="hero-index">(01 — THE BIGGER PICTURE)</span>
          <p>
            We bring brands, digital experiences and business systems together.
            One connected partner for your next chapter.
          </p>
          <Magnetic className="button" href="/contact">
            Let’s build something{" "}
            <span>
              <Arrow />
            </span>
          </Magnetic>
        </div>
      </div>
      <div className="hero-media" data-cursor="Explore">
        <motion.div className="hero-image-wrap" style={{ y: reduced ? 0 : y }}>
          <Image
            src="/hero-art.webp"
            alt="Silver and green sculptural ribbons interlocking into one connected form"
            fill
            priority
            sizes="100vw"
            className="hero-image"
          />
        </motion.div>
        <div className="media-top">
          <span>CONNECTED BY DESIGN</span>
          <span>W / STUDIO EXPLORATION 001</span>
        </div>
        <div className="hero-media-bottom">
          <span className="media-caption">
            Different disciplines.
            <br />
            One shared direction.
          </span>
          <Link
            className="image-round"
            href="#solutions"
            aria-label="Explore our solutions"
          >
            <ArrowDown size={24} />
          </Link>
        </div>
        <span className="image-sticker">
          BUILD.
          <br />
          OPERATE.
          <br />
          GROW.
          <ArrowUpRight size={24} />
        </span>
      </div>
      <div className="hero-bottom">
        <span>STRATEGY MEETS CREATIVITY. CREATIVITY MEETS CODE.</span>
        <Link href="#challenge">
          FIND YOUR NEXT MOVE <ArrowDown size={15} />
        </Link>
      </div>
    </section>
  );
}
const challenges = [
  {
    id: "presence",
    label: "Our digital presence isn’t doing us justice.",
    tag: "BRAND & DIGITAL",
    title: "Make your first impression work harder.",
    desc: "Connect your brand, website and customer experience around a clear story and an easier next step.",
    services: ["Brand identity", "UX & website design", "E-commerce"],
    interest: "build",
  },
  {
    id: "leads",
    label: "We get enquiries. Following up is the problem.",
    tag: "LEAD MANAGEMENT",
    title: "Turn scattered enquiries into a connected pipeline.",
    desc: "Map the journey from first contact to follow-up, then bring your team and customer information into one place.",
    services: ["CRM setup", "Lead workflows", "System integrations"],
    interest: "operate",
  },
  {
    id: "operations",
    label: "Too much of our day is manual work.",
    tag: "OPERATIONS & AUTOMATION",
    title: "Give your team more time for meaningful work.",
    desc: "Find repetitive handoffs, disconnected systems and duplicate data entry. Build a workflow around how your team actually works.",
    services: [
      "Workflow automation",
      "ERP & custom software",
      "AI integrations",
    ],
    interest: "operate",
  },
  {
    id: "growth",
    label: "Our marketing needs a clearer direction.",
    tag: "MARKETING & GROWTH",
    title: "Connect what you create to what you want to achieve.",
    desc: "Bring your message, channels and measurement together with a considered plan for reaching the right people.",
    services: ["Digital strategy", "SEO & performance", "Creative & video"],
    interest: "grow",
  },
];
function ProblemFinder() {
  const [selected, setSelected] = useState<number | null>(null);
  const [stage, setStage] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const choice = selected === null ? null : challenges[selected];
  return (
    <section className="problem section" id="challenge">
      <Reveal className="problem-intro">
        <Label>LET’S START WITH YOU</Label>
        <h2>
          Big ambition.
          <br />
          <span>A few roadblocks?</span>
        </h2>
        <p>
          You don’t need to know the solution.
          <br />
          Just tell us what’s getting in the way.
        </p>
        <Link className="text-link" href="/business-assessment">
          Take the full business assessment <Arrow />
        </Link>
        <div className="finder-count">
          <span>{done ? "03" : choice ? "02" : "01"}</span>
          <div>
            <strong>
              {done
                ? "YOUR STARTING POINT"
                : choice
                  ? "A LITTLE MORE CONTEXT"
                  : "FIND YOUR BUSINESS PROBLEM"}
            </strong>
            <small>A quick starting point, not a diagnostic score.</small>
          </div>
        </div>
      </Reveal>
      <div className="finder" ref={ref}>
        {!done ? (
          <>
            <div className="finder-top">
              <span>{choice ? "02 / 02" : "01 / 02"}</span>
              <div className="progress-track">
                <span style={{ width: choice ? "100%" : "50%" }} />
              </div>
            </div>
            <h3>
              {choice
                ? "Where is your business right now?"
                : "What sounds most like your business?"}
            </h3>
            <p className="finder-help">
              Choose the closest fit. You can always go back.
            </p>
            {!choice ? (
              <div className="problem-options">
                {challenges.map((c, i) => (
                  <button key={c.id} onClick={() => setSelected(i)}>
                    <span>0{i + 1}</span>
                    {c.label}
                    <Arrow />
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div
                  className="stage-options"
                  role="group"
                  aria-label="Business stage"
                >
                  {[
                    "Starting something new",
                    "Growing an existing business",
                    "Modernizing an established business",
                    "Not sure yet",
                  ].map((s) => (
                    <button
                      key={s}
                      aria-pressed={stage === s}
                      onClick={() => setStage(s)}
                    >
                      {s}
                      <span>
                        {stage === s ? <Check size={16} /> : <Plus size={16} />}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="finder-actions">
                  <button
                    className="text-button"
                    onClick={() => {
                      setSelected(null);
                      setStage("");
                    }}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    className="button"
                    disabled={!stage}
                    onClick={() => {
                      setDone(true);
                      requestAnimationFrame(() =>
                        document.getElementById("finder-result")?.focus(),
                      );
                    }}
                  >
                    Find my starting point <Arrow />
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          choice && (
            <div className="finder-result" id="finder-result" tabIndex={-1}>
              <span className="result-chip">
                <Check size={14} /> A DIRECTION TO EXPLORE
              </span>
              <p className="eyebrow">{choice.tag}</p>
              <h3>{choice.title}</h3>
              <p>{choice.desc}</p>
              <div className="result-services">
                {choice.services.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <p className="result-context">
                For: {stage}. Based on the challenge you selected; a
                conversation will help confirm the right approach.
              </p>
              <Link
                className="button"
                href={`/contact?interest=${choice.interest}&challenge=${choice.id}`}
              >
                Let’s talk about this <Arrow />
              </Link>
              <button
                className="text-button"
                onClick={() => {
                  setDone(false);
                  setSelected(null);
                  setStage("");
                }}
              >
                Start again ↺
              </button>
            </div>
          )
        )}
      </div>
    </section>
  );
}
function Solutions() {
  const [active, setActive] = useState(0);
  return (
    <section className="solutions section" id="solutions">
      <Reveal className="section-heading">
        <div>
          <Label>ONE PARTNER. MORE POSSIBILITIES.</Label>
          <h2>
            From what if.
            <br />
            To what’s next.
          </h2>
        </div>
        <p>
          Creative thinking and technical depth.
          <br />
          Built around what your business needs.
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
              <strong>{s.title}</strong>
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
              <Link key={s} href={`/contact?interest=${solutions[active].id}`}>
                {s}
                <Plus size={14} />
              </Link>
            ))}
          </div>
          <Link
            href={`/contact?interest=${solutions[active].id}`}
            className="text-link"
          >
            Explore the possibilities <Arrow />
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
          <Label>THINKING, MADE TANGIBLE</Label>
          <h2>
            Made to stand out.
            <br />
            Built to work.
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
          href="/contact?interest=brand-experience"
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
          href="/contact?interest=digital-products"
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
      <Label>BEAUTY IN THE FRONT. SUBSTANCE BEHIND IT.</Label>
      <div className="engineering-heading">
        <h2>
          Good looks.
          <br />
          <span>Serious engineering.</span>
        </h2>
        <p>
          Under every great experience is a system that works. We connect the
          visible and the invisible.
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
            "Thoughtful integrations that reduce repetitive tasks and simplify how work gets done.",
          ],
        ].map(([n, t, p]) => (
          <Reveal key={n} className="engineering-card">
            <span>
              {n} <MoveUpRight size={22} />
            </span>
            <h3>{t}</h3>
            <p>{p}</p>
            <Link href="/contact?interest=engineering" className="text-link">
              Let’s explore <Arrow />
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
      <Label>BUILD. OPERATE. GROW.</Label>
      <h2>
        Not another vendor.
        <br />
        <span>Your next partner.</span>
      </h2>
      <div className="partnership-bottom">
        <p>
          Start with a focused project. Stay for connected thinking, considered
          execution and a team that understands the bigger picture.
        </p>
        <div>
          <span>01 / PROJECTS</span>
          <span>02 / ONGOING SUPPORT</span>
          <span>03 / TECHNOLOGY PARTNERSHIP</span>
        </div>
        <Link
          href="/contact"
          className="circle-link"
          aria-label="Discuss a partnership"
        >
          <ArrowUpRight size={32} />
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
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Label>HAVE SOMETHING IN MIND?</Label>
          <Link href="/contact" className="footer-big" data-cursor="Let’s talk">
            Let’s make
            <br />
            it happen.
            <ArrowUpRight />
          </Link>
        </div>
        <div className="footer-aside">
          <p>
            Good people.
            <br />
            Interesting challenges.
            <br />
            New possibilities.
          </p>
          <ContactLinks />
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        wexoraa<span>↗</span>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Wexoraa Infotech</span>
        <span>COIMBATORE, INDIA</span>
        <Link href="/privacy">Privacy</Link>
        <Link href="/#top">Back to top ↑</Link>
      </div>
    </footer>
  );
}
export default function Home() {
  return (
    <>
      <Cursor />
      <Header />
      <main id="main">
        <Hero />
        <div className="marquee" aria-hidden="true">
          <div>
            STRATEGY <span>✳</span> DESIGN <span>✳</span> TECHNOLOGY{" "}
            <span>✳</span> GROWTH <span>✳</span> STRATEGY <span>✳</span> DESIGN{" "}
            <span>✳</span> TECHNOLOGY <span>✳</span> GROWTH <span>✳</span>
          </div>
        </div>
        <ProblemFinder />
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
