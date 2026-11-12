"use client";
import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import {
  Lightbulb,
  MonitorSmartphone,
  Users,
  MessageSquare,
  Workflow,
  CheckCheck,
  Megaphone,
  Search,
  ArrowUpRight,
} from "lucide-react";
import { useExperienceMotion } from "@/hooks/use-experience-motion";
const flows = [
  {
    name: "Website",
    description:
      "Turn a good idea into a website that helps customers understand your business and get in touch.",
    steps: [
      {
        title: "Your idea",
        detail: "What you do and who you help",
        icon: Lightbulb,
      },
      {
        title: "A useful website",
        detail: "Clear pages, built around your customers",
        icon: MonitorSmartphone,
      },
      {
        title: "An easier next step",
        detail: "Find answers, enquire or buy",
        icon: Users,
      },
    ],
  },
  {
    name: "Systems",
    description:
      "Bring customer enquiries into one place so your team knows who needs a reply and what to do next.",
    steps: [
      {
        title: "A new enquiry",
        detail: "From your website, phone or inbox",
        icon: MessageSquare,
      },
      {
        title: "One shared system",
        detail: "Customer details and tasks together",
        icon: Workflow,
      },
      {
        title: "Clear follow-up",
        detail: "The right person knows the next step",
        icon: CheckCheck,
      },
    ],
  },
  {
    name: "Marketing",
    description:
      "Connect your message, the people you want to reach and a clear way for them to contact you.",
    steps: [
      {
        title: "Your message",
        detail: "Content that explains your business",
        icon: Megaphone,
      },
      {
        title: "The right audience",
        detail: "Search, social media and useful ads",
        icon: Search,
      },
      {
        title: "A way to connect",
        detail: "Help interested customers get in touch",
        icon: Users,
      },
    ],
  },
];
export default function BusinessMotionGraphic() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.2 });
  const reduced = useExperienceMotion();
  const [selected, setSelected] = useState(0);
  const px = useMotionValue(0),
    py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 90, damping: 22 }),
    y = useSpring(py, { stiffness: 90, damping: 22 });
  const flow = flows[selected];
  return (
    <div
      ref={ref}
      className="business-motion"
      data-flow-active={visible && !reduced}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left - r.width / 2) * 0.008);
        py.set((e.clientY - r.top - r.height / 2) * 0.008);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <div className="business-motion-top">
        <span>
          <i /> HOW IT WORKS TOGETHER
        </span>
        <span>W / MOTION STUDY 02</span>
      </div>
      <div
        className="flow-choices"
        role="group"
        aria-label="Choose a business flow"
      >
        {flows.map((item, i) => (
          <button
            key={item.name}
            type="button"
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            {item.name}
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        ))}
      </div>
      <motion.div
        className="flow-scene"
        style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }}
      >
        <div className="flow-connection" aria-hidden="true">
          <span className="flow-packet" />
          <span className="flow-packet second-packet" />
        </div>
        {flow.steps.map(({ title, detail, icon: Icon }, i) => (
          <motion.div
            key={`${selected}-${i}`}
            className={`flow-node flow-node-${i}`}
            initial={false}
            animate={reduced ? {} : { y: [12, 0] }}
            transition={{
              duration: 0.55,
              delay: i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="flow-node-number">0{i + 1}</span>
            <div className="flow-node-icon">
              <Icon size={27} aria-hidden="true" />
            </div>
            <h3>{title}</h3>
            <p>{detail}</p>
          </motion.div>
        ))}
      </motion.div>
      <div className="flow-summary" aria-live="polite">
        <span>
          0{selected + 1} / {flow.name}
        </span>
        <p>{flow.description}</p>
      </div>
    </div>
  );
}
