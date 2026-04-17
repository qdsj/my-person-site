import type { ApiErrorState } from "../demo-types";

export function ErrorCard({ error }: { error: ApiErrorState }) {
  return (
    <div className="rounded-[24px] border border-[rgba(180,92,61,0.22)] bg-[rgba(180,92,61,0.08)] p-5">
      <p className="text-sm uppercase tracking-[0.16em] text-[var(--secondary)]">Error</p>
      <p className="mt-3 text-safe-wrap text-lg text-[var(--accent-strong)]">{error.message}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[18px] bg-white/65 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-black/45">HTTP status</p>
          <p className="mt-2 text-base text-black/75">{error.statusCode}</p>
        </div>
        <div className="rounded-[18px] bg-white/65 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-black/45">Error code</p>
          <p className="mt-2 text-safe-wrap text-base text-black/75">{error.errorCode ?? "-"}</p>
        </div>
      </div>
    </div>
  );
}
