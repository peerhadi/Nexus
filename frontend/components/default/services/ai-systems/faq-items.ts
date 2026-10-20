import type { FaqItem } from "@/components/default/services/ai-systems/types";

export const faqItems: FaqItem[] = [
  {
    question: "What counts as an AI system?",
    answer:
      "It could be a product assistant, a document-search experience, a tool-using agent, a classification pipeline, or a custom AI feature embedded in an existing application. The right scope depends on the problem you need to solve.",
  },
  {
    question: "Do I need to train my own model?",
    answer:
      "Usually, no. Depending on your requirements, an existing model combined with good context, retrieval, tools, and evaluation may be the better starting point. Custom training is considered when there is a clear reason for it.",
  },
  {
    question: "Can it work with my existing application?",
    answer:
      "Potentially, yes. Existing APIs, databases, authentication, and business workflows can often be connected, subject to their technical constraints and access permissions.",
  },
  {
    question: "How do you approach privacy and reliability?",
    answer:
      "We design around the data involved, access boundaries, validation, error handling, and the level of human oversight the use case requires. Specific safeguards depend on the system and its risks.",
  },
  {
    question: "What if I only have an idea?",
    answer:
      "That's a fine starting point. We can help clarify the use case, identify what the system needs to do, and work out a practical first version before expanding the scope.",
  },
];
