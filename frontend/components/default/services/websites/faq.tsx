import { faqs } from "./data";
import FAQItem from "./faq-item";
import SectionHeading from "./section-heading";

export default function Faq() {
  return (
    <section className="border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="COMMON QUESTIONS"
              title="Before we build."
              description="A few practical details to consider when planning your website."
            />
          </div>

          <div>
            {faqs.map((faq) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
