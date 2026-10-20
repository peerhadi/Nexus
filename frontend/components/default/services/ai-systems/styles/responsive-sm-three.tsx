"use client";

export default function ResponsiveSmThreeStyles() {
  return (
    <style jsx global>{`
          .ai-principles {
            padding-block: 78px 80px;
          }

          .ai-principle-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .ai-principle-card {
            min-height: 0;
            padding: 18px;
          }

          .ai-principle-icon {
            width: 43px;
            height: 43px;
            margin-top: 25px;
          }

          .ai-principle-card h3 {
            margin-top: 16px;
          }

          .ai-principle-card p {
            max-width: 490px;
            margin-bottom: 20px;
          }

          .ai-principle-card-line {
            right: 18px;
            left: 18px;
          }

          .ai-process {
            padding-bottom: 80px;
          }

          .ai-process-heading {
            align-items: start;
            flex-direction: column;
            gap: 16px;
            margin-block: 27px 30px;
          }

          .ai-process-heading > p {
            max-width: 520px;
          }

          .ai-process-track {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .ai-process-step {
            min-height: 270px;
            padding: 16px 14px 0;
            border-bottom: 1px solid var(--ai-border);
          }

          .ai-process-step:nth-child(2) {
            border-right: 0;
          }

          .ai-process-step:nth-child(3),
          .ai-process-step:nth-child(4) {
            border-bottom: 0;
          }

          .ai-process-step-top {
            flex-wrap: wrap;
          }

          .ai-process-step h3 {
            font-size: 14px;
          }

          .ai-process-step p {
            font-size: 10px;
          }

          .ai-faq {
            grid-template-columns: 1fr;
            gap: 28px;
            padding-bottom: 80px;
          }

          .ai-faq-intro h2 {
            margin-top: 24px;
          }

          .ai-faq-intro > p {
            max-width: 400px;
          }

          .ai-faq-item summary {
            grid-template-columns: 25px 1fr 25px;
            gap: 9px;
            min-height: 68px;
          }

          .ai-faq-question {
            font-size: 12px;
          }

          .ai-faq-answer {
            padding: 0 28px 20px 34px;
          }

          .ai-cta-inner {
            padding-block: 70px;
          }

          .ai-cta-content {
            grid-template-columns: 1fr;
            gap: 8px;
            margin-top: 29px;
          }

          .ai-cta-content h2 {
            font-size: clamp(43px, 9vw, 64px);
          }

          .ai-cta-visual {
            min-height: 270px;
          }

          .ai-cta-visual-ring-one {
            width: 230px;
          }

          .ai-cta-visual-ring-two {
            height: 190px;
          }

          .ai-next-service {
            align-items: start;
            flex-direction: column;
            padding-block: 25px;
          }

          .ai-next-link {
            width: 100%;
            justify-content: space-between;
          }
        }
    `}</style>
  );
}
