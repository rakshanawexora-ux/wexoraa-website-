"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  Minus,
  Menu,
  X,
  Layers3,
  Workflow,
  ChartNoAxesCombined,
  Code2,
  Database,
  Sparkles,
  Globe2,
  Smartphone,
  Check,
  MoveUpRight,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { solutions, processSteps } from "@/content/site";
const icons = [Layers3, Workflow, ChartNoAxesCombined];
const contactHref = "/contact";
function Arrow({ className = "" }: { className?: string }) {
  return <ArrowUpRight aria-hidden="true" className={className} size={19} />;
}
export function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="header">
      <Link className="wordmark" href="/" aria-label="Wexoraa Infotech home">
        wexoraa<small>INFOTECH</small>
      </Link>
      <nav
        aria-label="Main navigation"
        className={open ? "nav open" : "nav"}
        id="main-navigation"
      >
        {[
          ["Solutions", "/#solutions"],
          ["Services", "/#capabilities"],
          ["Work", "/#work"],
          ["About", "/#partnership"],
          ["Contact", contactHref],
        ].map(([text, url]) => (
          <Link key={text} href={url} onClick={() => setOpen(false)}>
            {text}
          </Link>
        ))}
        <Link className="button header-cta" href={contactHref}>
          Let’s talk <Arrow />
        </Link>
      </nav>
      <button
        ref={button}
        className="icon-button mobile-toggle"
        aria-expanded={open}
        aria-controls="main-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
function SectionLabel({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p className={`eyebrow ${dark ? "light-label" : ""}`}>
      <span className="square" />
      {children}
    </p>
  );
}
function SystemVisual() {
  const [active, setActive] = useState(0);
  const labels = ["Build", "Operate", "Grow"];
  return (
    <div className="system-visual">
      <div className="visual-top">
        <span>
          <i /> CONNECTED BY DESIGN
        </span>
        <span>W / 01</span>
      </div>
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <svg className="connections" viewBox="0 0 560 470" aria-hidden="true">
        <path d="M130 160 L280 235 L430 135 M280 235 L405 350 M280 235 L110 340" />
        <path className="signal" d="M130 160 L280 235 L430 135" />
      </svg>
      <div className="system-core">
        <div className="core-mark">
          <span />
          <span />
          <span />
        </div>
        <span>YOUR BUSINESS</span>
      </div>
      <button
        className={`system-node node-build ${active === 0 ? "active" : ""}`}
        onClick={() => setActive(0)}
        aria-pressed={active === 0}
      >
        <Layers3 size={19} />
        <span>Build</span>
        <Arrow />
      </button>
      <button
        className={`system-node node-operate ${active === 1 ? "active" : ""}`}
        onClick={() => setActive(1)}
        aria-pressed={active === 1}
      >
        <Workflow size={19} />
        <span>Operate</span>
        <Arrow />
      </button>
      <button
        className={`system-node node-grow ${active === 2 ? "active" : ""}`}
        onClick={() => setActive(2)}
        aria-pressed={active === 2}
      >
        <ChartNoAxesCombined size={19} />
        <span>Grow</span>
        <Arrow />
      </button>
      <span className="data-chip">
        <span /> People + process + technology
      </span>
      <div className="visual-bottom" aria-live="polite">
        <span>
          0{active + 1} / {labels[active].toUpperCase()}
        </span>
        <p>
          {
            [
              "Experiences that move you forward.",
              "Systems that work together.",
              "A clearer path to your customers.",
            ][active]
          }
        </p>
      </div>
    </div>
  );
}
function Comparison() {
  const [connected, setConnected] = useState(true);
  return (
    <div className="comparison">
      <div
        className="segmented"
        role="group"
        aria-label="Compare delivery models"
      >
        <button aria-pressed={!connected} onClick={() => setConnected(false)}>
          Separate vendors
        </button>
        <button aria-pressed={connected} onClick={() => setConnected(true)}>
          One connected partner
        </button>
      </div>
      <div className={`compare-diagram ${connected ? "connected" : ""}`}>
        <div className="compare-center">
          {connected ? "One shared direction" : "Your business"}
        </div>
        <div className="compare-items">
          {["Brand & design", "Technology", "Operations", "Marketing"].map(
            (x, i) => (
              <span key={x}>
                <span className="compare-number">0{i + 1}</span>
                {x}
                {connected ? <Check size={16} /> : <Minus size={16} />}
              </span>
            ),
          )}
        </div>
      </div>
      <p aria-live="polite">
        {connected
          ? "Shared context. Connected decisions. Clear accountability."
          : "Different briefs. Separate systems. More coordination for your team."}
      </p>
    </div>
  );
}
function Solutions() {
  const [active, setActive] = useState(0);
  const item = solutions[active];
  const Icon = icons[active];
  return (
    <section className="section solutions" id="solutions">
      <div className="section-heading">
        <div>
          <SectionLabel>
            ONE PARTNER. THREE CONNECTED POSSIBILITIES.
          </SectionLabel>
          <h2>
            Built for where
            <br />
            you want to go.
          </h2>
        </div>
        <p>
          Start with what your business needs now.
          <br className="desktop-break" /> Connect the rest as you grow.
        </p>
      </div>
      <div className="solution-tabs" role="tablist" aria-label="Solution areas">
        {solutions.map((s, i) => (
          <button
            role="tab"
            aria-selected={active === i}
            aria-controls={`panel-${s.id}`}
            id={`tab-${s.id}`}
            key={s.id}
            tabIndex={active === i ? 0 : -1}
            onKeyDown={(e) => {
              if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 2
                      : (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                setActive(next);
                document.getElementById(`tab-${solutions[next].id}`)?.focus();
              }
            }}
            onClick={() => setActive(i)}
          >
            <span>/{s.number}</span>
            {s.title}
            <Arrow />
          </button>
        ))}
      </div>
      <div
        className="solution-panel"
        role="tabpanel"
        id={`panel-${item.id}`}
        aria-labelledby={`tab-${item.id}`}
        tabIndex={0}
      >
        <div className="solution-art" aria-hidden="true">
          <div className={`art-block art-${active}`}>
            <Icon strokeWidth={1} size={110} />
            <span>{item.eyebrow}</span>
          </div>
          <span className="art-caption">
            WEXORAA / {item.title.toUpperCase()}
          </span>
          <span className="art-cross">+</span>
        </div>
        <div className="solution-copy">
          <p className="eyebrow">{item.eyebrow}</p>
          <h3>{item.description}</h3>
          <p>{item.detail}</p>
          <ul>
            {item.services.map((s) => (
              <li key={s}>
                <Plus size={15} />
                {s}
              </li>
            ))}
          </ul>
          <Link className="text-link" href={`/contact?interest=${item.id}`}>
            Discuss a {item.id} project <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
function Process() {
  const [active, setActive] = useState(0);
  return (
    <section className="section process" id="process">
      <div className="section-heading">
        <div>
          <SectionLabel>CLARITY AT EVERY STEP</SectionLabel>
          <h2>
            Good work starts
            <br />
            with understanding.
          </h2>
        </div>
        <p>
          A considered process.
          <br />A shared view of what comes next.
        </p>
      </div>
      <div
        className="process-steps"
        role="group"
        aria-label="Explore our process"
      >
        {processSteps.map((step, i) => (
          <button
            key={step[0]}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            <i />
            <strong>{step[0]}</strong>
          </button>
        ))}
      </div>
      <div className="process-detail" aria-live="polite">
        <span className="process-large">0{active + 1}</span>
        <div>
          <h3>{processSteps[active][1]}</h3>
          <p>{processSteps[active][2]}</p>
        </div>
        <ArrowRight size={32} strokeWidth={1} />
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link className="wordmark" href="/">
          wexoraa<small>INFOTECH</small>
        </Link>
        <p>
          Connected thinking.
          <br />
          Meaningful progress.
        </p>
        <div>
          <span className="eyebrow">BASED IN</span>
          <p>
            Coimbatore, Tamil Nadu
            <br />
            Built for businesses everywhere.
          </p>
        </div>
      </div>
      <div className="footer-links">
        <span>© {new Date().getFullYear()} Wexoraa Infotech</span>
        <Link href="/#solutions">Solutions</Link>
        <Link href="/#process">Our process</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/#top">Back to top ↑</Link>
      </div>
    </footer>
  );
}
export default function Home() {
  const reduced = useReducedMotion();
  return (
    <>
      <Header />
      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.65 }}
            >
              <SectionLabel>TECHNOLOGY. CREATIVITY. CONNECTED.</SectionLabel>
              <h1>
                Your next chapter.
                <br />
                Built{" "}
                <span className="green-word">
                  together
                  <svg viewBox="0 0 400 18" aria-hidden="true">
                    <path d="M2 13 Q180 -3 396 7" />
                  </svg>
                </span>
                .
              </h1>
              <p className="hero-description">
                Your business deserves more than disconnected solutions.
                Strategy, design, engineering and growth — connected through one
                technology partner.
              </p>
              <div className="hero-actions">
                <Link className="button" href={contactHref}>
                  Discuss your project <Arrow />
                </Link>
                <Link className="button button-outline" href="#assessment">
                  Assess your business <Arrow />
                </Link>
              </div>
              <div className="hero-footnote">
                <span className="mini-line" />
                Built around your business. Not the other way around.
              </div>
            </motion.div>
          </div>
          <SystemVisual />
          <div className="hero-baseline">
            <span>ONE PARTNER. FROM IDEA TO IMPACT.</span>
            <span>
              SCROLL TO CONNECT <span className="down-arrow">↓</span>
            </span>
          </div>
        </section>
        <div className="capability-strip">
          <span>BUILD. OPERATE. GROW.</span>
          <span>Brand & experience</span>
          <i />
          <span>Digital products</span>
          <i />
          <span>Business systems</span>
          <i />
          <span>Growth & creative</span>
          <ArrowUpRight size={22} />
        </div>
        <section className="section challenge">
          <div className="challenge-copy">
            <SectionLabel>THE PROBLEM ISN’T AMBITION</SectionLabel>
            <h2>
              Moving forward.
              <br />
              Pulled in different
              <br />
              <span className="muted-heading">directions?</span>
            </h2>
            <p>
              A designer here. A developer there. Another platform that doesn’t
              talk to the rest.
            </p>
            <p>
              When every part works in isolation, your team fills the gaps. We
              bring the thinking, the technology and the people together.
            </p>
            <Link className="text-link" href="#solutions">
              Find your starting point <Arrow />
            </Link>
          </div>
          <Comparison />
        </section>
        <Solutions />
        <section className="technical" id="capabilities">
          <div className="technical-top">
            <SectionLabel dark>ENGINEERING THE BIGGER PICTURE</SectionLabel>
            <span className="technical-status">
              <i /> CONNECTED SYSTEMS / HUMAN PURPOSE
            </span>
          </div>
          <div className="technical-heading">
            <h2>
              We engineer what
              <br />
              runs <span>behind</span>
              <br />
              your business.
            </h2>
            <p>
              The right technology should make complexity feel simple. We build
              the platforms, connections and workflows that help your business
              work better.
            </p>
          </div>
          <div className="architecture">
            <div className="architecture-top">
              <span>YOUR BUSINESS</span>
              <span>
                CONNECTED TECHNOLOGY LAYER <MoveUpRight size={16} />
              </span>
            </div>
            <div className="architecture-grid">
              {[
                [
                  Globe2,
                  "Web platforms",
                  "Fast, considered digital experiences.",
                ],
                [
                  Smartphone,
                  "Mobile applications",
                  "Useful products. Wherever work happens.",
                ],
                [
                  Database,
                  "CRM & ERP",
                  "A shared view of customers and operations.",
                ],
                [
                  Sparkles,
                  "AI & automation",
                  "Less repetitive work. More possibility.",
                ],
              ].map(([Icon, title, desc]) => {
                const I = Icon as typeof Globe2;
                return (
                  <div key={String(title)}>
                    <I size={27} strokeWidth={1.3} />
                    <h3>{String(title)}</h3>
                    <p>{String(desc)}</p>
                  </div>
                );
              })}
            </div>
            <div className="architecture-bottom">
              <Code2 size={18} />
              <span>CUSTOM SOFTWARE</span>
              <Plus size={13} />
              <span>API INTEGRATIONS</span>
              <Plus size={13} />
              <span>CONNECTED WORKFLOWS</span>
            </div>
          </div>
          <Link
            className="text-link light-link"
            href="/contact?interest=engineering"
          >
            Let’s discuss your systems <Arrow />
          </Link>
        </section>
        <section className="section work" id="work">
          <div className="section-heading">
            <div>
              <SectionLabel>FROM CHALLENGE TO POSSIBILITY</SectionLabel>
              <h2>
                Real problems.
                <br />
                Considered solutions.
              </h2>
            </div>
            <p>
              A look at the kinds of challenges
              <br />
              we help businesses work through.
            </p>
          </div>
          <div className="work-grid">
            <Link
              className="work-card"
              href="/contact?interest=digital-experience"
            >
              <div className="project-visual commerce">
                <div className="mini-browser">
                  <div className="browser-bar">
                    <span>CONCEPT / DIGITAL COMMERCE</span>
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="store-content">
                    <span>EVERYDAY, RECONSIDERED.</span>
                    <h3>
                      Less noise.
                      <br />
                      More intention.
                    </h3>
                    <div className="vase vase-one" />
                    <div className="vase vase-two" />
                    <span className="store-button">Explore collection ↗</span>
                  </div>
                </div>
                <span className="concept-label">
                  ILLUSTRATIVE CONCEPT — NOT CLIENT WORK
                </span>
                <span className="project-arrow">
                  <Arrow />
                </span>
              </div>
              <div className="work-meta">
                <span>BUILD / BRAND + E-COMMERCE</span>
                <Arrow />
              </div>
              <h3>
                A better first impression.
                <br />A clearer path to purchase.
              </h3>
              <p>
                Connecting brand expression and a considered shopping
                experience.
              </p>
            </Link>
            <Link
              className="work-card"
              href="/contact?interest=business-systems"
            >
              <div className="project-visual operations">
                <div className="dashboard">
                  <div className="dashboard-sidebar">
                    <span className="dashboard-symbol">◈</span>
                    {[0, 1, 2, 3].map((i) => (
                      <i key={i} />
                    ))}
                  </div>
                  <div className="dashboard-content">
                    <span className="dashboard-label">
                      WORKSPACE / OPERATIONS
                    </span>
                    <h3>Everything. In view.</h3>
                    <div className="dashboard-summary">
                      <span>
                        <i />
                        CUSTOMERS
                      </span>
                      <span>
                        <i />
                        PROJECTS
                      </span>
                      <span>
                        <i />
                        WORKFLOWS
                      </span>
                    </div>
                    <div className="dashboard-chart">
                      {[32, 55, 44, 70, 60, 85, 73, 94, 82, 108, 98, 125].map(
                        (h, i) => (
                          <i key={i} style={{ height: h }} />
                        ),
                      )}
                    </div>
                    <div className="dashboard-lines">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
                <span className="concept-label">
                  ILLUSTRATIVE CONCEPT — NOT CLIENT WORK
                </span>
                <span className="project-arrow">
                  <Arrow />
                </span>
              </div>
              <div className="work-meta">
                <span>OPERATE / CONNECTED BUSINESS SYSTEMS</span>
                <Arrow />
              </div>
              <h3>
                Less time connecting dots.
                <br />
                More time moving forward.
              </h3>
              <p>
                Bringing customer information, projects and workflows into one
                place.
              </p>
            </Link>
          </div>
          <p className="work-disclosure">
            Concepts illustrate our approach. Approved client case studies and
            verified outcomes will be published when available.
          </p>
        </section>
        <Process />
        <section className="partner section" id="partnership">
          <div>
            <SectionLabel>THE ONE-PARTNER ADVANTAGE</SectionLabel>
            <h2>
              Different disciplines.
              <br />
              One shared direction.
            </h2>
            <p>
              You shouldn’t have to reconnect the dots at every stage. We bring
              creative thinking and technical delivery into the same
              conversation.
            </p>
            <Link className="text-link" href={contactHref}>
              Let’s find the right fit <Arrow />
            </Link>
          </div>
          <div className="partner-list">
            {[
              [
                "01",
                "Context that carries forward",
                "Your goals stay connected as your project moves from strategy to design, engineering and growth.",
              ],
              [
                "02",
                "Systems that speak to each other",
                "We consider how each new platform fits into the wider business, from the beginning.",
              ],
              [
                "03",
                "A partnership that can evolve",
                "Start with a focused project. Add ongoing support or a broader technology partnership when it makes sense.",
              ],
            ].map(([n, t, d]) => (
              <div key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="assessment section" id="assessment">
          <div className="assessment-mark" aria-hidden="true">
            <Workflow size={92} strokeWidth={1} />
            <span>
              THE NEXT MOVE
              <br />
              STARTS WITH CLARITY.
            </span>
          </div>
          <div>
            <SectionLabel>NOT SURE WHERE TO START?</SectionLabel>
            <h2>
              Start with your business.
              <br />
              We’ll connect the possibilities.
            </h2>
            <p>
              A useful conversation begins with your goals, the friction in your
              day-to-day work and what you want to change.
            </p>
            <Link href="/contact?interest=business-review" className="button">
              Talk through your business <Arrow />
            </Link>
            <span className="assessment-note">
              A conversation, with no obligation to commit.
            </span>
          </div>
        </section>
        <section className="engagement section">
          <SectionLabel>A PARTNERSHIP AT YOUR PACE</SectionLabel>
          <div className="engagement-grid">
            {[
              [
                "01",
                "Your next project",
                "A focused scope. A clear objective. The right team to bring it to life.",
              ],
              [
                "02",
                "Ongoing support",
                "Keep your platforms maintained and your next improvements moving.",
              ],
              [
                "03",
                "Technology partnership",
                "A connected view of what your business needs today and where it goes next.",
              ],
            ].map(([n, t, d]) => (
              <div key={n}>
                <span>
                  {n} <ArrowRight size={18} />
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="final-cta">
          <SectionLabel>YOUR NEXT CHAPTER STARTS HERE</SectionLabel>
          <div>
            <h2>
              Let’s build
              <br />
              what’s <span>next.</span>
            </h2>
            <Link
              className="round-cta"
              href={contactHref}
              aria-label="Discuss your project"
            >
              <ArrowUpRight size={44} strokeWidth={1.3} />
            </Link>
          </div>
          <div className="final-bottom">
            <p>
              One project. A new system. A bigger ambition.
              <br />
              Let’s start with a conversation.
            </p>
            <ContactLinks />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
export function ContactLinks() {
  const phone = process.env.NEXT_PUBLIC_WEXORAA_PHONE;
  const whatsapp = process.env.NEXT_PUBLIC_WEXORAA_WHATSAPP;
  return (
    <div className="contact-links">
      <Link href={contactHref}>
        Discuss your project <Arrow />
      </Link>
      {whatsapp && (
        <Link
          href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Wexoraa, I'd like to discuss a technology or digital growth requirement for my business.")}`}
        >
          WhatsApp <Arrow />
        </Link>
      )}
      {phone && (
        <Link href={`tel:${phone.replace(/[^+\d]/g, "")}`}>
          Call us <Arrow />
        </Link>
      )}
    </div>
  );
}
