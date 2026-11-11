export type Answers = Record<string, string[]>;
export type Question = {
  id: string;
  title: string;
  hint: string;
  options: string[];
  category?: string;
  points?: number[];
  multi?: boolean;
  max?: number;
};
const unknown = "Not sure / not applicable";
export const questions: Question[] = [
  {
    id: "industry",
    title: "What kind of business do you run?",
    hint: "A little context helps us make the next steps relevant.",
    options: [
      "Retail & e-commerce",
      "Manufacturing & industrial",
      "Professional services",
      "Healthcare & wellness",
      "Education",
      "Hospitality",
      "Other / exploring an idea",
    ],
  },
  {
    id: "stage",
    title: "Where is your business right now?",
    hint: "Your size or age does not affect your score.",
    options: [
      "Starting something new",
      "Growing an existing business",
      "Established and modernizing",
      "Exploring for now",
    ],
  },
  {
    id: "presence",
    title: "Does your website help customers take the next step?",
    hint: "Think about mobile experience, clear information and enquiries.",
    category: "Digital presence",
    options: [
      "Yes — clear, mobile-friendly and easy to enquire",
      "Mostly — a few parts need attention",
      "It feels dated or hard to use",
      "We do not have a website",
      unknown,
    ],
    points: [3, 2, 1, 0, -1],
  },
  {
    id: "brand",
    title: "Does your brand look consistent everywhere?",
    hint: "Consider your website, social profiles, proposals and customer materials.",
    category: "Digital presence",
    options: [
      "Consistent with clear brand guidelines",
      "Mostly consistent",
      "Different across channels",
      "We have not established our brand yet",
      unknown,
    ],
    points: [3, 2, 1, 0, -1],
  },
  {
    id: "discovery",
    title: "Can the right customers find you online?",
    hint: "Think about search, business listings and relevant digital channels.",
    category: "Marketing & measurement",
    options: [
      "Regular relevant enquiries from tracked channels",
      "Some enquiries, but not consistently",
      "We rely mainly on word of mouth",
      "We have no active online presence",
      unknown,
    ],
    points: [3, 2, 1, 0, -1],
  },
  {
    id: "leads",
    title: "What happens after a customer sends an enquiry?",
    hint: "Consider ownership, reminders and visibility for your team.",
    category: "Customer journey",
    options: [
      "Tracked in a CRM with clear follow-up",
      "We use a shared list and follow up regularly",
      "Enquiries stay in separate inboxes or WhatsApp",
      "There is no consistent follow-up process",
      unknown,
    ],
    points: [3, 2, 1, 0, -1],
  },
  {
    id: "experience",
    title: "How easy is it for customers to work with you digitally?",
    hint: "Think about requests, updates, orders, payments or support.",
    category: "Customer journey",
    options: [
      "Clear digital journeys with timely updates",
      "Some useful digital touchpoints",
      "Mostly manual messages and phone calls",
      "Customers often need help finding the next step",
      unknown,
    ],
    points: [3, 2, 1, 0, -1],
  },
  {
    id: "operations",
    title: "How connected are your day-to-day business systems?",
    hint: "Consider sales, finance, projects, inventory and customer information.",
    category: "Systems & operations",
    options: [
      "Connected tools share reliable information",
      "Some tools are connected",
      "Separate tools need manual copying",
      "Mostly spreadsheets or paper",
      unknown,
    ],
    points: [3, 2, 1, 0, -1],
  },
  {
    id: "automation",
    title: "How much repetitive work have you simplified?",
    hint: "Focus on useful automation, not whether you use the latest AI tools.",
    category: "Systems & operations",
    options: [
      "Key repetitive workflows are automated and reviewed",
      "A few useful automations are in place",
      "We still repeat many tasks manually",
      "We have not reviewed repetitive workflows",
      unknown,
    ],
    points: [3, 2, 1, 0, -1],
  },
  {
    id: "measurement",
    title: "Can you tell which digital activities help your business?",
    hint: "Think about useful measures, regular reviews and decisions.",
    category: "Marketing & measurement",
    options: [
      "Clear measures, regular reviews and decisions",
      "Some measures, reviewed occasionally",
      "Separate reports with little clarity",
      "We do not measure consistently",
      unknown,
    ],
    points: [3, 2, 1, 0, -1],
  },
  {
    id: "priorities",
    title: "What would you most like to improve?",
    hint: "Choose up to three, in priority order. Select again to remove.",
    multi: true,
    max: 3,
    options: [
      "Digital presence",
      "Customer journey",
      "Systems & operations",
      "Marketing & measurement",
      "Not sure yet",
    ],
  },
  {
    id: "timing",
    title: "When would you like to start making changes?",
    hint: "This adds context to your enquiry; it does not affect your score.",
    options: [
      "As soon as possible",
      "Within 1–3 months",
      "Within 3–6 months",
      "Exploring for now",
    ],
  },
];
const guidance: Record<
  string,
  { interest: string; reason: string; services: string[] }
> = {
  "Digital presence": {
    interest: "build",
    reason:
      "A clearer brand and a more useful website can help customers understand your business and take action.",
    services: ["Brand strategy & identity", "Websites & e-commerce"],
  },
  "Customer journey": {
    interest: "operate",
    reason:
      "A shared lead process and clearer customer touchpoints can reduce missed handoffs.",
    services: ["CRM & lead management", "UI/UX & digital experiences"],
  },
  "Systems & operations": {
    interest: "operate",
    reason:
      "Review disconnected tools and repetitive handoffs before choosing integrations or automation.",
    services: ["ERP & business software", "AI & workflow automation"],
  },
  "Marketing & measurement": {
    interest: "grow",
    reason:
      "Connect channels to useful measures so the team can learn what brings relevant enquiries.",
    services: ["SEO & digital strategy", "Performance marketing"],
  },
};
export function scoreAssessment(answers: Answers) {
  const categories = Object.entries(guidance).map(([title, g]) => {
    const items = questions.filter((q) => q.category === title);
    let earned = 0,
      eligible = 0;
    const evidence: string[] = [];
    for (const q of items) {
      const i = q.options.indexOf(answers[q.id]?.[0] || "");
      const points = i >= 0 ? (q.points?.[i] ?? -1) : -1;
      if (points >= 0) {
        earned += points;
        eligible++;
        if (points < 3) evidence.push(`${q.title} — ${q.options[i]}`);
      }
    }
    return {
      title,
      ...g,
      score: eligible ? Math.round((earned / (eligible * 3)) * 100) : null,
      answered: eligible,
      evidence,
      earned,
    };
  });
  const eligible = categories.reduce((n, c) => n + c.answered, 0);
  const earned = categories.reduce((n, c) => n + c.earned, 0);
  const complete = questions.every((q) => (answers[q.id]?.length || 0) > 0);
  const score =
    complete && eligible >= 4
      ? Math.round((earned / (eligible * 3)) * 100)
      : null;
  return {
    score,
    complete,
    eligible,
    total: 8,
    band:
      score === null
        ? "More context needed"
        : score < 40
          ? "Foundations to build"
          : score < 70
            ? "Progress with gaps"
            : "Strong foundations",
    categories,
    opportunities: categories
      .filter((c) => c.score !== null && c.score < 100)
      .sort((a, b) => (a.score ?? 101) - (b.score ?? 101)),
  };
}
export function validAnswers(value: unknown): Answers {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const raw = value as Record<string, unknown>;
  const result: Answers = {};
  for (const q of questions) {
    const a = raw[q.id];
    if (Array.isArray(a))
      result[q.id] = [
        ...new Set(
          a.filter(
            (v): v is string => typeof v === "string" && q.options.includes(v),
          ),
        ),
      ].slice(0, q.multi ? (q.max ?? 3) : 1);
  }
  return result;
}
