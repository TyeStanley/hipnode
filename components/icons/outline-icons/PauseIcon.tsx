const PauseIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="flex-center translate-y-[1px]"
    >
      <g>
        <path
          className={className ?? "fill-white"}
          d="M3.756,0H1.523C1.029,0,0.629,0.4,0.629,0.894v11.434c0,0.493,0.4,0.893,0.894,0.893h2.233
			c0.494,0,0.894-0.399,0.894-0.893V0.894C4.651,0.4,4.251,0,3.756,0z"
        />
        <path
          className={className ?? "fill-white"}
          d="M11.698,0H9.464C8.971,0,8.57,0.4,8.57,0.894v11.434c0,0.493,0.4,0.893,0.894,0.893h2.234
			c0.494,0,0.894-0.399,0.894-0.893V0.894C12.591,0.4,12.192,0,11.698,0z"
        />
      </g>
    </svg>
  );
};

export default PauseIcon;
