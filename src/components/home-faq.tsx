import { Plus } from "lucide-react";
import { homeFaqs } from "@/content/faqs";
export default function HomeFaq() {
  return (
    <section className="home-faq section" aria-labelledby="home-faq-title">
      <div className="home-faq-intro">
        <p className="eyebrow">
          <span /> A FEW COMMON QUESTIONS
        </p>
        <h2 id="home-faq-title">
          Good questions.
          <br />
          Clear answers.
        </h2>
        <p>
          Here are a few things you might want to know before getting started.
        </p>
      </div>
      <div className="home-faq-list">
        {homeFaqs.map(({ question, answer }) => (
          <details key={question} name="home-faq">
            <summary>
              {question}
              <Plus size={19} aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
