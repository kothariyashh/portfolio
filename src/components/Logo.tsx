type LogoProps = {
  className?: string;
  gradientId?: string;
};

/**
 * YK monogram: the Y's arms flow into a shared stem, and the K's legs
 * branch off it, with an accent node at the joint.
 */
export default function Logo({ className = "h-9 w-9", gradientId = "ykGrad" }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6c5ce7" />
          <stop offset="55%" stopColor="#8e7cf3" />
          <stop offset="100%" stopColor="#00cec9" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${gradientId})`} />
      <g stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M18 15 L32 30" />
        <path d="M46 15 L32 30" />
        <path d="M32 30 L32 50" />
        <path d="M32 36 L46 50" />
      </g>
      <circle cx="32" cy="30" r="3.4" fill="#fff" opacity="0.95" />
    </svg>
  );
}
