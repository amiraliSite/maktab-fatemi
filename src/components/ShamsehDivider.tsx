interface ShamsehDividerProps {
  className?: string;
}

export function ShamsehDivider({ className = '' }: ShamsehDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-4 my-2 select-none ${className}`}
    >
      <span className="h-px flex-1 bg-gradient-to-l from-[#D4AF37]/50 via-[#D6CEBE] to-transparent dark:from-[#D4AF37]/45 dark:via-[#3B342D]" />
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        className="text-[#B8862D] dark:text-[#E6C260] shrink-0"
      >
        <rect
          x="5.5"
          y="5.5"
          width="13"
          height="13"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="5.5"
          y="5.5"
          width="13"
          height="13"
          transform="rotate(45 12 12)"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/50 via-[#D6CEBE] to-transparent dark:from-[#D4AF37]/45 dark:via-[#3B342D]" />
    </div>
  );
}
