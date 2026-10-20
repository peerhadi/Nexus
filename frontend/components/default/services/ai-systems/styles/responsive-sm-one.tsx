"use client";

export default function ResponsiveSmOneStyles() {
  return (
    <style jsx global>{`
        @media (max-width: 760px) {
          .ai-page .section-shell {
            width: calc(100% - 36px);
          }

          .ai-hero {
            min-height: auto;
          }

          .ai-hero-inner {
            grid-template-columns: 1fr;
            gap: 0;
            width: calc(100% - 36px);
            padding-block: 72px 28px;
          }

          .ai-hero-copy {
            max-width: 590px;
          }

          .ai-eyebrow {
            margin-bottom: 25px;
            font-size: 9px;
          }

          .ai-hero h1 {
            font-size: clamp(48px, 10.5vw, 76px);
          }

          .ai-hero-description {
            max-width: 540px;
            font-size: 14px;
          }

          .ai-hero-footnote {
            margin-top: 27px;
          }

          .ai-core-stage {
            width: min(100%, 480px);
            justify-self: center;
            margin-top: 7px;
          }

          .ai-hero-bottom-inner {
            width: calc(100% - 36px);
            min-height: 44px;
            font-size: 7px;
          }

          .ai-hero-bottom-track {
            width: 17vw;
          }

          .ai-orbit-one {
            top: 63%;
            left: 72%;
          }

          .ai-orbit-two {
            top: 47%;
            left: 58%;
          }

          .ai-manifesto {
            padding-block: 78px 65px;
          }

          .ai-manifesto-grid {
            grid-template-columns: 1fr;
            gap: 22px;
            margin-top: 28px;
          }

          .ai-manifesto h2,
          .ai-section-heading h2,
          .ai-lab-heading h2,
          .ai-process-heading h2,
          .ai-faq-intro h2 {
            font-size: clamp(39px, 8vw, 58px);
          }

          .ai-manifesto-copy p {
            font-size: 13px;
          }

          .ai-manifesto-visual {
            min-height: 110px;
            margin-top: 38px;
            padding-inline: 5px;
          }

          .ai-manifesto-word {
            font-size: clamp(32px, 8vw, 60px);
          }

          .ai-manifesto-symbol {
            width: 65px;
            height: 65px;
          }

          .ai-manifesto-symbol svg {
            width: 35px;
            height: 35px;
          }

          .ai-capabilities {
            padding-block: 10px 78px;
          }

          .ai-section-heading {
            align-items: start;
            flex-direction: column;
            gap: 17px;
            margin-bottom: 30px;
          }

          .ai-section-heading h2 {
            margin-top: 24px;
          }

          .ai-section-heading > p {
            max-width: 520px;
            font-size: 13px;
          }

          .ai-capability-layout {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .ai-capability-list {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
          }

          .ai-capability-item {
            grid-template-columns: 28px 1fr 14px;
            min-height: 104px;
            gap: 8px;
            padding: 12px 10px;
          }

          .ai-capability-number {
            grid-column: 1;
            grid-row: 1;
            padding-top: 0;
          }

          .ai-capability-icon {
            grid-column: 1;
            grid-row: 2;
            width: 30px;
            height: 30px;
          }

          .ai-capability-icon svg {
            width: 15px;
            height: 15px;
          }

          .ai-capability-title {
            grid-column: 2;
            grid-row: 1 / span 2;
            gap: 6px;
          }

          .ai-capability-title strong {
            font-size: 12px;
            line-height: 1.5;
          }

          .ai-capability-title small {
            font-size: 10px;
            line-height: 1.5;
          }

          .ai-capability-arrow {
            grid-column: 3;
            grid-row: 1;
            align-self: start;
          }

          .ai-capability-detail {
            min-height: 0;
          }

          .ai-detail-art {
            min-height: 185px;
          }

          .ai-detail-copy {
            padding: 20px 17px;
          }

          .ai-detail-copy h3 {
            font-size: 20px;
          }

          .ai-detail-tags {
            gap: 6px;
          }

          .ai-detail-tags span {
            font-size: 9px;
          }
    `}</style>
  );
}
