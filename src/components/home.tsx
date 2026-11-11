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
} from "motion/react";
import {
  ArrowUpRight,
  ArrowDown,
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
import { serviceFor } from "@/content/catalog";
import Survey from "@/components/assessment";
import MotionShowcase from "@/components/motion-showcase";
import { MotionToggle } from "@/components/site-experience";
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
      <MotionToggle />
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
function LogoDoodle() {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      className="logo-doodle"
      viewBox="0 0 340 145"
      aria-hidden="true"
      focusable="false"
      animate={reduced ? {} : { y: [0, -6, 0], rotate: [-2, 1, -2] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.path
        d="M282 46C243 10 99 13 58 51C18 89 85 124 190 116C269 110 316 80 289 60"
        className="doodle-orbit"
        initial={false}
        animate={reduced ? {} : { pathLength: [0.86, 1, 0.86] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <image
        href="/brand/wexoraa-logo.svg"
        x="85"
        y="48"
        width="185"
        height="37.5"
        preserveAspectRatio="xMidYMid meet"
      />
      <path
        d="M298 29l2-12m9 17 10-6m-10 18 12 3M34 107c-11 11-9 22 8 23m-9-8 10 8-1-12"
        className="doodle-spark"
      />
    </motion.svg>
  );
}
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 25,
    restDelta: 0.001,
  });
  const y = useTransform(progress, [0, 1], [0, 155]);
  const scale = useTransform(progress, [0, 1], [1.06, 1]);
  const titleY = useTransform(progress, [0, 1], [0, -55]);
  const stickerY = useTransform(progress, [0, 1], [0, -70]);
  const stickerRotate = useTransform(progress, [0, 1], [5, -8]);
  const captionY = useTransform(progress, [0, 1], [0, -24]);
  const pathLength = useTransform(progress, [0, 0.55], [0.35, 1]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const px = useSpring(pointerX, { stiffness: 110, damping: 22 });
  const py = useSpring(pointerY, { stiffness: 110, damping: 22 });
  const rotateX = useTransform(py, [-1, 1], [4, -4]);
  const rotateY = useTransform(px, [-1, 1], [-5, 5]);
  const imageX = useTransform(px, [-1, 1], [-22, 22]);
  const imageY = useTransform(() => y.get() + py.get() * -16);
  const glowX = useTransform(px, [-1, 1], [-160, 160]);
  const glowY = useTransform(py, [-1, 1], [-90, 90]);
  return (
    <section ref={ref} className="hero" id="top">
      <div className="hero-topline">
        <Label>INDEPENDENT THINKING. CONNECTED POSSIBILITIES.</Label>
        <span className="location">
          <span /> COIMBATORE, INDIA · WORKING EVERYWHERE
        </span>
      </div>
      <div className="hero-title">
        <motion.h1 style={{ y: reduced ? 0 : titleY }}>
          {["Good design.", "Smart technology.", "Better business."].map(
            (line, i) => (
              <motion.span
                key={line}
                className={`hero-line ${i === 2 ? "hero-highlight" : ""}`}
                initial={false}
                animate={reduced ? {} : { y: [16, 0] }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
              </motion.span>
            ),
          )}
        </motion.h1>
        <div className="hero-intro">
          <LogoDoodle />
          <span className="hero-index">
            A LITTLE CURIOSITY. A BIGGER PICTURE.
          </span>
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
          <Link className="hero-discover" href="#challenge">
            Find your business problem <ArrowDown size={15} />
          </Link>
        </div>
      </div>
      <div
        className="hero-media"
        data-cursor="Explore"
        onPointerMove={(e) => {
          if (reduced || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          pointerX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
          pointerY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
        }}
        onPointerLeave={() => {
          pointerX.set(0);
          pointerY.set(0);
        }}
      >
        <motion.div
          className="hero-image-wrap"
          style={{
            y: reduced ? 0 : imageY,
            x: reduced ? 0 : imageX,
            rotateX: reduced ? 0 : rotateX,
            rotateY: reduced ? 0 : rotateY,
            scale: reduced ? 1 : scale,
          }}
        >
          <Image
            src="/hero-art.webp"
            alt="Silver and green sculptural ribbons interlocking into one connected form"
            fill
            priority
            sizes="100vw"
            className="hero-image"
          />
        </motion.div>
        <motion.div
          className="hero-pointer-light"
          aria-hidden="true"
          style={{ x: reduced ? 0 : glowX, y: reduced ? 0 : glowY }}
        />
        <span className="hero-pointer-hint" aria-hidden="true">
          MOVE YOUR CURSOR · EXPLORE THE CONNECTION
        </span>
        <div className="media-top">
          <span>CONNECTED BY DESIGN</span>
          <span>W / STUDIO EXPLORATION 001</span>
        </div>
        <motion.svg
          className="hero-scroll-doodle"
          viewBox="0 0 500 300"
          aria-hidden="true"
          focusable="false"
        >
          <motion.path
            d="M25 135C4 45 126 5 203 54S213 230 328 215C440 201 385 78 465 47m-17-1 18-2-4 18"
            style={{ pathLength: reduced ? 1 : pathLength }}
          />
        </motion.svg>
        <motion.div
          className="hero-media-bottom"
          style={{ y: reduced ? 0 : captionY }}
        >
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
        </motion.div>
        <motion.div
          className="brand-sticker"
          style={{
            y: reduced ? 0 : stickerY,
            rotate: reduced ? 0 : stickerRotate,
          }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 296 60" focusable="false">
            <image
              href="/brand/wexoraa-logo.svg"
              width="296"
              height="60"
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
          <span>BUILD. OPERATE. GROW.</span>
          <svg
            className="sticker-scribble"
            viewBox="0 0 160 22"
            focusable="false"
          >
            <path d="M3 14Q70-3 156 7M19 20Q80 6 141 16" />
          </svg>
        </motion.div>
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

function ProblemFinder({ configured = false }: { configured?: boolean }) {
  return (
    <section className="problem section" id="challenge">
      <Reveal className="problem-intro">
        <Label>FIND YOUR BUSINESS PROBLEM</Label>
        <h2>
          12 questions.
          <br />
          <span>Your digital-strength score.</span>
        </h2>
        <p>
          Understand what is working, where the gaps are and what to improve
          next. A practical survey built around your business.
        </p>
        <div className="survey-benefits">
          <span>✓ No email needed to see results</span>
          <span>✓ Score + four-category breakdown</span>
          <span>✓ Clear reasons and next steps</span>
        </div>
        <Link className="text-link" href="/business-assessment">
          Open the full assessment ↗
        </Link>
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
    <footer className="footer footer-v2">
      <div className="footer-invite">
        <p className="eyebrow">
          <span /> YOUR NEXT CHAPTER
        </p>
        <Link
          href="/contact"
          className="footer-invite-link"
          data-cursor="Let’s talk"
        >
          Got a good
          <br />
          challenge?
          <span>
            <ArrowUpRight size={52} />
          </span>
        </Link>
        <p>Bring the ambition. Let’s find the right direction.</p>
      </div>
      <div className="footer-content">
        <div className="footer-brand-column">
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
            Creative thinking.
            <br />
            Technical depth.
            <br />
            Connected possibilities.
          </p>
          <ContactLinks />
        </div>
        <nav aria-label="Footer explore">
          <span>EXPLORE</span>
          {[
            ["Solutions", "/solutions"],
            ["Services", "/services"],
            ["Studio concepts", "/work"],
            ["Our approach", "/process"],
          ].map(([t, h]) => (
            <Link key={h} href={h}>
              {t}
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </nav>
        <nav aria-label="Footer connect">
          <span>CONNECT</span>
          {[
            ["About Wexoraa", "/about"],
            ["Find your business problem", "/business-assessment"],
            ["Start a conversation", "/contact"],
            ["Privacy", "/privacy"],
          ].map(([t, h]) => (
            <Link key={h} href={h}>
              {t}
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </nav>
        <div className="footer-orbit" aria-hidden="true">
          <div />
          <div />
          <span>
            BUILD.
            <br />
            OPERATE.
            <br />
            GROW.
          </span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Wexoraa Infotech</span>
        <span>COIMBATORE, INDIA</span>
        <Link href="/#top">Back to top ↑</Link>
      </div>
    </footer>
  );
}

export default function Home({ emailReady = false }: { emailReady?: boolean }) {
  return (
    <>
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
        <ProblemFinder configured={emailReady} />
        <Solutions />
        <MotionShowcase />
        <Work />
        <Capabilities />
        <Process />
        <Partnership />
      </main>
      <Footer />
    </>
  );
}
