export function VerticalFlash({ ok, error }: { ok?: string; error?: string }) {
  if (error) {
    return (
      <div className="mb-4 rounded-lg border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-sm text-danger-200">
        {error}
      </div>
    );
  }
  if (ok) {
    return (
      <div className="mb-4 rounded-lg border border-success-500/30 bg-success-500/10 px-4 py-3 text-sm text-success-200">
        {ok}
      </div>
    );
  }
  return null;
}
