export default function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-chipline bg-chipbg px-3 py-1 text-xs font-medium text-chiptext transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white">
      {label}
    </span>
  );
}
