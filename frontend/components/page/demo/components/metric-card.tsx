export function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-[22px] border border-black/8 bg-[var(--surface)] p-5">
      <p className="text-sm uppercase tracking-[0.16em] text-black/45">{label}</p>
      <p className="mt-3 text-safe-wrap text-lg text-black/80">{value}</p>
    </article>
  );
}
