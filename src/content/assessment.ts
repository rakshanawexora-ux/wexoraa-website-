export type Question = {
  id: string;
  title: string;
  hint?: string;
  options: string[];
  multi?: boolean;
  max?: number;
};
export const questions: Question[] = [
  {
    id: "industry",
    title: "What industry does your business operate in?",
    options: [
      "Retail & e-commerce",
      "Manufacturing & industrial",
      "Professional services",
      "Healthcare & wellness",
      "Education",
      "Hospitality",
      "Something else / not sure",
    ],
  },
  {
    id: "stage",
    title: "What stage is your business currently at?",
    options: [
      "Getting started",
      "Growing",
      "Established",
      "Modernizing or expanding",
      "Not sure",
    ],
  },
  {
    id: "team",
    title: "Approximately how large is your team?",
    options: [
      "Just me",
      "2–10 people",
      "11–50 people",
      "51–200 people",
      "More than 200",
      "Prefer to skip",
    ],
  },
  {
    id: "goals",
    title: "What are your primary goals for the next 12 months?",
    hint: "Choose all that apply.",
    multi: true,
    options: [
      "Improve our digital presence",
      "Generate more enquiries",
      "Simplify operations",
      "Launch a product or service",
      "Connect our systems",
      "Not sure yet",
    ],
  },
  {
    id: "friction",
    title: "What is currently slowing your business down?",
    multi: true,
    options: [
      "An outdated website",
      "Missed lead follow-ups",
      "Manual repetitive work",
      "Disconnected software",
      "Inconsistent marketing",
      "No major problem / not sure",
    ],
  },
  {
    id: "enquiries",
    title: "How do you generate new customer enquiries?",
    multi: true,
    options: [
      "Word of mouth",
      "Website or search",
      "Social media",
      "Paid advertising",
      "Sales outreach",
      "Not actively generating enquiries",
    ],
  },
  {
    id: "leads",
    title: "How do you manage and follow up leads?",
    options: [
      "A CRM with a clear process",
      "Spreadsheets",
      "WhatsApp or email",
      "We do not have a consistent process",
      "Not applicable / not sure",
    ],
  },
  {
    id: "presence",
    title: "How satisfied are you with your website and digital presence?",
    options: [
      "Very satisfied",
      "It could be better",
      "It is holding us back",
      "We do not have a website",
      "Not sure",
    ],
  },
  {
    id: "brand",
    title: "How consistent is your branding?",
    options: [
      "Consistent across touchpoints",
      "Somewhat consistent",
      "Different everywhere",
      "We are building our brand",
      "Not sure / not applicable",
    ],
  },
  {
    id: "operations",
    title: "How are daily business operations managed?",
    options: [
      "Connected business software",
      "Several separate tools",
      "Spreadsheets and manual processes",
      "We are still setting things up",
      "Not applicable / not sure",
    ],
  },
  {
    id: "connected",
    title: "Are your existing software systems connected?",
    options: [
      "Yes, they share information",
      "Partially",
      "No, we copy information manually",
      "We do not use software systems",
      "Not sure",
    ],
  },
  {
    id: "repetitive",
    title: "Which repetitive tasks consume the most employee time?",
    multi: true,
    options: [
      "Data entry & reporting",
      "Customer follow-ups",
      "Invoicing & administration",
      "Inventory & order handling",
      "Content & marketing tasks",
      "None / not sure",
    ],
  },
  {
    id: "measurement",
    title: "How do you measure marketing and business performance?",
    options: [
      "Connected dashboards and regular reviews",
      "Separate reports from different tools",
      "Occasional manual reporting",
      "We do not measure consistently",
      "Not sure / not applicable",
    ],
  },
  {
    id: "priorities",
    title: "Which three areas would you prioritize improving?",
    hint: "Select up to three, in priority order. Select again to remove.",
    multi: true,
    max: 3,
    options: [
      "Digital Presence",
      "Lead Management",
      "Operations",
      "CRM / ERP",
      "Automation and AI",
      "Marketing and Growth",
      "Not sure yet",
    ],
  },
  {
    id: "timing",
    title: "When are you planning to begin improvements?",
    options: [
      "As soon as possible",
      "Within 1–3 months",
      "Within 3–6 months",
      "Later this year",
      "Exploring for now",
    ],
  },
];
export type Answers = Record<string, string[]>;
export function opportunities(answers: Answers) {
  const has = (id: string, value: string) => answers[id]?.includes(value);
  const result: { title: string; reason: string; interest: string }[] = [];
  if (
    has("presence", "It could be better") ||
    has("presence", "It is holding us back") ||
    has("presence", "We do not have a website") ||
    has("goals", "Improve our digital presence") ||
    has("brand", "Different everywhere") ||
    has("brand", "We are building our brand")
  )
    result.push({
      title: "Digital Presence",
      reason:
        "You indicated that your website, brand or digital presence needs attention.",
      interest: "build",
    });
  if (
    has("leads", "Spreadsheets") ||
    has("leads", "WhatsApp or email") ||
    has("leads", "We do not have a consistent process") ||
    has("friction", "Missed lead follow-ups")
  )
    result.push({
      title: "Lead Management",
      reason:
        "Your answers suggest lead follow-up could benefit from a more consistent, shared process.",
      interest: "operate",
    });
  if (
    has("operations", "Spreadsheets and manual processes") ||
    has("operations", "Several separate tools")
  )
    result.push({
      title: "Operations",
      reason: "You described manual processes or separate operational tools.",
      interest: "operate",
    });
  if (
    has("connected", "Partially") ||
    has("connected", "No, we copy information manually") ||
    has("goals", "Connect our systems")
  )
    result.push({
      title: "CRM / ERP",
      reason: "You highlighted gaps in how business systems share information.",
      interest: "operate",
    });
  if (
    has("friction", "Manual repetitive work") ||
    answers.repetitive?.some((a) => a !== "None / not sure")
  )
    result.push({
      title: "Automation and AI",
      reason:
        "You identified repetitive tasks. First map the workflow, then assess where automation is useful.",
      interest: "operate",
    });
  if (
    has("goals", "Generate more enquiries") ||
    has("friction", "Inconsistent marketing") ||
    has("measurement", "We do not measure consistently")
  )
    result.push({
      title: "Marketing and Growth",
      reason:
        "You highlighted enquiry generation, marketing consistency or measurement as a concern.",
      interest: "grow",
    });
  for (const priority of answers.priorities || []) {
    if (
      priority !== "Not sure yet" &&
      !result.some((r) => r.title === priority)
    )
      result.push({
        title: priority,
        reason: "You selected this as a priority for improvement.",
        interest:
          priority === "Digital Presence"
            ? "build"
            : priority === "Marketing and Growth"
              ? "grow"
              : "operate",
      });
  }
  return result.sort((a, b) => {
    const pa = answers.priorities?.indexOf(a.title) ?? -1;
    const pb = answers.priorities?.indexOf(b.title) ?? -1;
    return (pa < 0 ? 99 : pa) - (pb < 0 ? 99 : pb);
  });
}
