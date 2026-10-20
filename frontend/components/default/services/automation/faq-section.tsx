import FaqItem from "./faq-item";
import { faqs } from "./data";
import SectionHeading from "./section-heading";

export default function FaqSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Common questions"
            title="Before connecting everything."
            description="A few practical things to consider before automating a workflow."
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
