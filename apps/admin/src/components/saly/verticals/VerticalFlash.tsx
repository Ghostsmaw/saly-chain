export function VerticalFlash({ ok, error }: { ok?: string; error?: string }) {
  if (error) {
    return (
      <div className="mb-6 rounded-saly border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300">
        {error}
      </div>
    );
  }
  if (ok) {
    return (
      <div className="mb-6 rounded-saly border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3 text-sm text-emerald-300">
        {ok}
      </div>
    );
  }
  return null;
}
