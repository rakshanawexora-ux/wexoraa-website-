export default function SystemsIllustration({ label }: { label: string }) {
  return (
    <div className="systems-illustration" role="img" aria-label={label}>
      <div className="systems-illustration-core">
        <span>YOUR BUSINESS SOFTWARE</span>
        <strong>One clear view.</strong>
        <p>Less chasing. More doing.</p>
      </div>
      {[
        [
          "01 / ENQUIRIES",
          "Every lead saved.",
          "Keep customer details together.",
        ],
        [
          "02 / FOLLOW-UP",
          "Know the next step.",
          "See who is handling each enquiry.",
        ],
        [
          "03 / CONNECTED TOOLS",
          "Information in sync.",
          "Connect the tools your team uses.",
        ],
        [
          "04 / DAILY WORK",
          "Fewer manual tasks.",
          "Spend less time copying information.",
        ],
      ].map(([step, title, detail]) => (
        <div className="systems-illustration-card" key={step}>
          <span>{step}</span>
          <strong>{title}</strong>
          <p>{detail}</p>
        </div>
      ))}
    </div>
  );
}
