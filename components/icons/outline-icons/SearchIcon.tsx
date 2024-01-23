export default function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      className={className}
    >
      <circle cx="9" cy="9" r="8" strokeWidth="2" />
      <path d="M14.5 15.5L18.5 19.5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
