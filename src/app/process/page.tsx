import { PageShell } from "@/components/page-shell";
import { processSteps } from "@/content/site";
export const metadata = {
  title: "Our process — Wexoraa Infotech",
  description:
    "Discover, diagnose, design, engineer, launch and evolve with clarity at every step.",
  alternates: { canonical: "/process" },
};
export default function Page() {
  return (
    <PageShell
      eyebrow="CLARITY AT EVERY STEP"
      title="A considered process. A shared next step."
      intro="The detail changes with each engagement. The principle stays the same: understand the problem, make decisions together and keep the work visible."
    >
      <section className="section process-page-list">
        {processSteps.map(([name, title, description], i) => (
          <article key={name}>
            <span>0{i + 1}</span>
            <div>
              <h2>{name}</h2>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="section detail-grid">
        <h2>What happens after you enquire?</h2>
        <div>
          <p>
            We review the requirement and use your preferred contact method to
            clarify the goals, constraints and next steps.
          </p>
          <p>
            If there is a fit, we define a proposal with scope,
            responsibilities, delivery stages and commercial terms. You decide
            whether to proceed.
          </p>
          <p>
            For ongoing support or partnership work, review cadence and response
            expectations are agreed as part of the engagement.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
