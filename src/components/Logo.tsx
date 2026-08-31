interface LogoProps {
  /** Pixel size of the square mark. */
  size?: number;
  /** Render the "SignBridge" wordmark next to the mark. */
  withWordmark?: boolean;
  className?: string;
}

/**
 * SignBridge mark — an abstract hand made of tracking landmarks,
 * echoing the MediaPipe-style skeleton used by the app itself.
 */
export function Logo({ size = 34, withWordmark = true, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        role="img"
        aria-label="SignBridge logo"
        className="shrink-0"
      >
        <rect width="64" height="64" rx="14" fill="#0D0D0D" />
        <rect
          x="0.75"
          y="0.75"
          width="62.5"
          height="62.5"
          rx="13.25"
          fill="none"
          stroke="#2A2A2A"
          strokeWidth="1.5"
        />
        <g stroke="#00E5FF" strokeWidth="2.6" strokeLinecap="round" fill="none">
          <path d="M32 50 24 42V22" />
          <path d="M24 42 16 36" />
          <path d="M32 50V18" />
          <path d="M32 50l8-8V24" />
          <path d="M40 42l8 4" />
        </g>
        <g fill="#00E5FF">
          <circle cx="32" cy="50" r="3.6" />
          <circle cx="24" cy="42" r="2.8" />
          <circle cx="24" cy="22" r="2.8" />
          <circle cx="16" cy="36" r="2.8" />
          <circle cx="32" cy="18" r="2.8" />
          <circle cx="40" cy="42" r="2.8" />
          <circle cx="40" cy="24" r="2.8" />
          <circle cx="48" cy="46" r="2.8" />
        </g>
      </svg>
      {withWordmark && (
        <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
          Sign<span className="text-accent">Bridge</span>
        </span>
      )}
    </span>
  );
}
