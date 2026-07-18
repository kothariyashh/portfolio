/**
 * Animated "data stream" divider: pulses of light travel along a line
 * between sections, like tokens streaming through a pipeline.
 */
export default function AIDivider() {
  return (
    <div className="relative mx-auto h-14 w-[92%] max-w-[1160px] overflow-hidden" aria-hidden>
      <div className="absolute top-1/2 right-0 left-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <span className="data-pulse" />
      <span className="data-pulse data-pulse--teal" />
      <span className="data-pulse data-pulse--pink" />
      <span className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-60" />
    </div>
  );
}
