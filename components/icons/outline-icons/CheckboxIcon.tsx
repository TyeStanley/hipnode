export default function CheckboxIcon({ checked }: { checked?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      {checked ? (
        <>
          <rect width="16" height="16" rx="2" fill="#FF4401" />
          <path
            d="M4 8.5L7 11L12 5"
            stroke="white"
            fill="#FF4401"
            strokeWidth="1.5"
          />
        </>
      ) : (
        <rect
          x="1"
          y="1"
          width="14"
          height="14"
          rx="1"
          stroke="#97989D"
          strokeWidth="2"
        />
      )}
    </svg>
  );
}
