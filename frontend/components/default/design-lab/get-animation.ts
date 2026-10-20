import type { AnimationType } from "@/components/default/design-lab/types";

export function getAnimation(animation: AnimationType, index = 0) {
  if (animation === "none") return {};

  if (animation === "fade") {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.55, delay: index * 0.07 },
    };
  }

  if (animation === "stagger") {
    return {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.45,
        delay: Math.min(index * 0.1, 0.6),
        ease: "easeOut" as const,
      },
    };
  }

  if (animation === "float") {
    return {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: [12, 0, -3, 0] },
      transition: {
        duration: 0.8,
        delay: index * 0.06,
        ease: "easeOut" as const,
      },
    };
  }

  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.6,
      delay: index * 0.06,
      ease: "easeOut" as const,
    },
  };
}
