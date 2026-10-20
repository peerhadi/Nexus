import { faqItems } from "@/components/default/services/ai-systems/faq-items";

export default function Faq() {
  return (
    <section className="ai-faq section-shell">
      <div className="ai-faq-intro">
        <div className="ai-section-kicker">
          <span>06</span>
          <span className="ai-kicker-line" />
          GOOD QUESTIONS
        </div>
        <h2>
          Let&apos;s clear
          <br />
          <span>the fog.</span>
        </h2>
        <p>
          AI should make your product more useful, not harder to understand.
        </p>
      </div>

      <div className="ai-faq-list">
        {faqItems.map((item, index) => (
          <details className="ai-faq-item" key={item.question}>
            <summary>
              <span className="ai-faq-number">0{index + 1}</span>
              <span className="ai-faq-question">{item.question}</span>
              <span className="ai-faq-toggle">
                <span />
                <span />
              </span>
            </summary>
            <div className="ai-faq-answer">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
