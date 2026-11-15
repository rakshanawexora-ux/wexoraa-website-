export const quickQuestions = [
  {
    title: "How is your website working for you?",
    area: "Website",
    options: [
      "We don’t have one yet",
      "It’s online, but needs work",
      "It clearly explains us and brings enquiries",
      "Not sure",
    ],
    advice:
      "Make it easy for people to understand your business and get in touch.",
  },
  {
    title: "How do new customers find you online?",
    area: "Marketing",
    options: [
      "Mostly word of mouth",
      "We post or advertise occasionally",
      "We consistently track and improve our marketing",
      "Not sure",
    ],
    advice:
      "Choose a clear marketing channel and track which enquiries it brings.",
  },
  {
    title: "What happens when an enquiry comes in?",
    area: "Follow-up",
    options: [
      "Sometimes we lose track",
      "We follow up manually",
      "Every enquiry is saved with a clear next step",
      "Not sure",
    ],
    advice: "Keep enquiries in one place with a simple follow-up process.",
  },
  {
    title: "How much daily work is still manual?",
    area: "Systems",
    options: [
      "Most tasks are repeated by hand",
      "Some tools help, but they’re disconnected",
      "Our tools connect and repetitive work is automated",
      "Not sure",
    ],
    advice:
      "Connect the tools you use most and automate one repeated task first.",
  },
];
export function quickScore(values: number[]) {
  const known = values.filter((v) => v >= 0 && v < 3);
  return values.length === 4 && known.length >= 2
    ? Math.round((known.reduce((a, b) => a + b, 0) / (known.length * 2)) * 100)
    : null;
}
