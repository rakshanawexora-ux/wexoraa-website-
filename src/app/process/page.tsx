import { pageMetadata } from "@/lib/seo";
import { PageShell } from "@/components/page-shell";
import { processSteps } from "@/content/site";
export const metadata = pageMetadata(
  "Our process — Wexoraa Infotech",
  "Discover, diagnose, design, engineer, launch and evolve with clarity at every step.",
  "/process",
);
export default function Page() {
  return (
    <PageShell
      eyebrow="CLARITY AT EVERY STEP"
      title="You’ll know what happens next."
      intro="We listen first, agree on a clear plan and keep you involved as the work takes shape. Here is how a typical project works."
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
