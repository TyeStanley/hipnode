export const StraightLine = ({ className }: { className?: string }) => (
  <svg className={className}>
    <line
      x1="50%"
      y1="0%"
      x2="50%"
      y2="100%"
      strokeWidth="1"
      className="dark:stroke-sc-3"
    />
  </svg>
);

export const CurveLine = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg height="100%" width="100%" viewBox="0 0 100 51">
      <path
        d="M 50 0 Q 50 50, 100 50"
        fill="none"
        strokeWidth="2"
        className="dark:stroke-sc-3"
      />
    </svg>
  </div>
);
