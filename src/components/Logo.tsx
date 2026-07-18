type LogoProps = {
  className?: string;
  gradientId?: string;
};

/**
 * Animated neural-network mark: a glowing AI core with satellite nodes,
 * data pulses flowing along the connections and a slow orbiting ring.
 * Animations live in globals.css (.logo-*) and respect reduced motion.
 */
export default function Logo({ className = "h-9 w-9", gradientId = "ykGrad" }: LogoProps) {
  const nodes: Array<[number, number, number]> = [
    [32, 13, 0],
    [14, 25, 0.4],
    [50, 25, 0.8],
    [19, 47, 1.2],
    [45, 47, 1.6],
  ];

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c6cf0" />
          <stop offset="50%" stopColor="#5f4fe0" />
          <stop offset="100%" stopColor="#00b8b4" />
        </linearGradient>
        <radialGradient id={`${gradientId}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="64" height="64" rx="17" fill={`url(#${gradientId})`} />

      {/* orbiting ring */}
      <g className="logo-orbit">
        <circle
          cx="32"
          cy="32"
          r="25"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.35"
          strokeWidth="1.4"
          strokeDasharray="10 42"
          strokeLinecap="round"
        />
        <circle cx="57" cy="32" r="2" fill="#fff" opacity="0.9" />
      </g>

      {/* data flowing along the connections */}
      <g stroke="#fff" strokeWidth="1.2" strokeOpacity="0.35">
        {nodes.map(([x, y]) => (
          <line key={`e-${x}-${y}`} x1="32" y1="32" x2={x} y2={y} />
        ))}
      </g>
      <g stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
        {nodes.map(([x, y], i) => (
          <line
            key={`f-${x}-${y}`}
            className="logo-edge"
            x1="32"
            y1="32"
            x2={x}
            y2={y}
            style={{ animationDelay: `${i * -0.3}s` }}
          />
        ))}
      </g>

      {/* satellite nodes */}
      {nodes.map(([x, y, d]) => (
        <circle
          key={`n-${x}-${y}`}
          className="logo-node"
          cx={x}
          cy={y}
          r="3"
          fill="#fff"
          style={{ animationDelay: `${d}s` }}
        />
      ))}

      {/* glowing AI core */}
      <circle cx="32" cy="32" r="12" fill={`url(#${gradientId}-glow)`} opacity="0.55" />
      <circle className="logo-core" cx="32" cy="32" r="6.5" fill="#fff" />
      <circle className="logo-core" cx="32" cy="32" r="3" fill="#00e5df" style={{ animationDelay: "-1s" }} />
    </svg>
  );
}
