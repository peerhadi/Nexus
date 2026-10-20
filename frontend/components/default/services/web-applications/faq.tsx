import { faqs } from "./data";
import FaqItem from "./faq-item";
import SectionHeading from "./section-heading";

export default function Faq() {
  return (
    <section className="bg-[var(--surface-secondary)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div>
          <SectionHeading
            eyebrow="Common questions"
            title="Before you build."
            description="A few things worth understanding before turning your idea into an application."
          />
        </div>
        <div>
          {faqs.map((faq, index) => (
            <FaqItem key={faq.question} {...faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
