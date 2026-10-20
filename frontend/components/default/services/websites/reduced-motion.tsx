export default function ReducedMotion() {
  return (
    <style jsx>{`
      @media (prefers-reduced-motion: reduce) {
        :global(*) {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          scroll-behavior: auto !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
  );
}
