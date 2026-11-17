export type CheckAnswers = Record<string, string[]>;
export type CheckQuestion = {
  id: string;
  title: string;
  options: string[];
  multi?: boolean;
  exclusive?: string;
};
export const businessQuestions: CheckQuestion[] = [
  {
    id: "businessType",
    title: "What does your business offer?",
    options: [
      "Manufacturing",
      "Wholesale / Distribution",
      "Retail / Shopping",
      "Healthcare",
      "Education",
      "Hotels / Restaurants",
      "Travel / Tourism",
      "Real Estate / Construction",
      "Professional Services",
      "Startup",
      "Other",
    ],
  },
  {
    id: "businessAge",
    title: "How long have you been running your business?",
    options: [
      "Just getting started",
      "Less than a year",
      "1–3 years",
      "3–5 years",
      "More than 5 years",
    ],
  },
  {
    id: "reach",
    title: "How do customers usually reach your business?",
    multi: true,
    options: [
      "They visit us directly",
      "They call us",
      "They message us on WhatsApp",
      "They find us on social media",
      "They visit our website",
      "They find us through online platforms",
      "Through local client referrals",
    ],
  },
];
export const challengeQuestions: CheckQuestion[] = [
  {
    id: "difficulties",
    title: "What feels difficult in your business?",
    multi: true,
    options: [
      "Getting new customers",
      "Handling customer enquiries",
      "Following up with customers",
      "Managing orders and sales",
      "Keeping track of payments",
      "Managing stock and supplies",
      "Coordinating employees and tasks",
      "Promoting the business",
      "Managing multiple activities",
      "Something else",
    ],
  },
  {
    id: "handling",
    title: "What becomes difficult to handle as work comes in?",
    multi: true,
    exclusive: "We manage things smoothly",
    options: [
      "Customer enquiries get missed",
      "Following up becomes difficult",
      "Orders take more time to manage",
      "Team coordination gets difficult",
      "Records and information become scattered",
      "Daily tasks pile up",
      "We manage things smoothly",
    ],
  },
  {
    id: "tracking",
    title: "How do you track customers and their enquiries?",
    options: [
      "Through calls and WhatsApp",
      "Using Excel or Google Sheets",
      "Using business software",
      "Through different tools and platforms",
      "We don’t have a fixed way",
    ],
  },
  {
    id: "manual",
    title: "Which tasks does your team do manually?",
    multi: true,
    exclusive: "No major repetitive tasks",
    options: [
      "Updating records",
      "Sending messages and reminders",
      "Preparing bills and reports",
      "Managing orders",
      "Following up with customers",
      "Sharing information between teams",
      "Managing stock",
      "No major repetitive tasks",
    ],
  },
];
export const digitalQuestions: CheckQuestion[] = [
  {
    id: "website",
    title: "Does your website need any changes?",
    options: [
      "We don’t have a website yet",
      "We have a basic website with limited information",
      "Our website needs a fresh look and better features",
      "We need to showcase our products and services better",
      "Our website represents our business well",
    ],
  },
  {
    id: "online",
    title: "How does your business currently attract customers online?",
    options: [
      "We don’t promote our business online",
      "We mainly use social media",
      "We rely on Google and online searches",
      "We run online advertisements",
      "We work with a marketing team or agency",
      "We use multiple online channels",
      "We are happy with the customers we’re reaching online",
    ],
  },
  {
    id: "growth",
    title: "What marketing challenges are slowing your growth?",
    multi: true,
    exclusive: "Our current marketing is delivering good results",
    options: [
      "We’re not reaching the right audience",
      "We’re not generating enough business enquiries",
      "Our brand is not getting enough visibility",
      "Our social media engagement is low",
      "Our advertisements aren’t generating good returns",
      "We’re not getting enough website visitors",
      "We struggle to maintain consistent marketing",
      "We cannot clearly measure marketing results",
      "Our current marketing is delivering good results",
    ],
  },
  {
    id: "app",
    title: "Do you maintain a mobile app for your product or business?",
    options: ["Yes", "No"],
  },
];
export const allCheckQuestions = [
  ...businessQuestions,
  ...challengeQuestions,
  ...digitalQuestions,
];
export function toggleAnswer(
  current: string[],
  option: string,
  question: CheckQuestion,
) {
  if (!question.multi) return [option];
  if (option === question.exclusive)
    return current.includes(option) ? [] : [option];
  const values = current.filter((v) => v !== question.exclusive);
  return values.includes(option)
    ? values.filter((v) => v !== option)
    : [...values, option];
}
export function validQuestion(q: CheckQuestion, values: string[] | undefined) {
  return Boolean(
    values?.length &&
    (q.multi || values.length === 1) &&
    new Set(values).size === values.length &&
    values.every((v) => q.options.includes(v)) &&
    !(q.exclusive && values.includes(q.exclusive) && values.length > 1),
  );
}
export function solutionReport(answers: CheckAnswers) {
  const complete = allCheckQuestions.every((q) =>
    validQuestion(q, answers[q.id]),
  );
  const pick = (id: string) => (answers[id] || [])[0];
  const issues = (id: string, none: string) =>
    (answers[id] || []).includes(none) ? 0 : (answers[id] || []).length;
  const dimensions = [
    {
      name: "Enquiry tracking",
      points:
        [1, 2, 3, 1, 0][
          challengeQuestions[2].options.indexOf(pick("tracking"))
        ] ?? 0,
    },
    {
      name: "Daily work",
      points: 3 - Math.min(3, issues("handling", "We manage things smoothly")),
    },
    {
      name: "Manual tasks",
      points: 3 - Math.min(3, issues("manual", "No major repetitive tasks")),
    },
    {
      name: "Website",
      points:
        [0, 1, 1, 2, 3][digitalQuestions[0].options.indexOf(pick("website"))] ??
        0,
    },
    {
      name: "Online reach",
      points:
        [0, 1, 2, 2, 2, 3, 3][
          digitalQuestions[1].options.indexOf(pick("online"))
        ] ?? 0,
    },
    {
      name: "Marketing",
      points:
        3 -
        Math.min(
          3,
          issues("growth", "Our current marketing is delivering good results"),
        ),
    },
  ];
  const score = complete
    ? Math.round((dimensions.reduce((sum, d) => sum + d.points, 0) / 18) * 100)
    : null;
  const recommendations: string[] = [];
  const ideas: string[] = [];
  if (dimensions[3].points < 3) {
    recommendations.push("Website & UI/UX design");
    ideas.push(
      "Make it easier for customers to understand your offer and find the next step on your website.",
    );
  }
  if (dimensions[0].points < 3 || dimensions[1].points < 3) {
    recommendations.push("CRM & business systems");
    ideas.push(
      "Bring enquiries and follow-ups into one shared place, with a clear owner and next action.",
    );
  }
  if (dimensions[2].points < 3) {
    recommendations.push("Workflow automation");
    ideas.push(
      "Start with one repetitive task and check whether a simple automation would save your team time.",
    );
  }
  if (dimensions[4].points < 3 || dimensions[5].points < 3) {
    recommendations.push("Digital marketing & content");
    ideas.push(
      "Choose the audience and channels that fit your business, then measure useful enquiries rather than only views.",
    );
  }
  if (
    (answers.growth || []).includes(
      "Our brand is not getting enough visibility",
    )
  )
    recommendations.push("Branding & creative design");
  if (!recommendations.length) {
    recommendations.push("Ongoing review & support");
    ideas.push(
      "Keep reviewing the systems and channels that already work before investing in new ones.",
    );
  }
  return {
    score,
    dimensions,
    recommendations,
    ideas,
    band:
      score === null
        ? "More context needed"
        : score < 40
          ? "Start with the foundations"
          : score < 70
            ? "A few useful improvements"
            : "Good foundations to build on",
  };
}
