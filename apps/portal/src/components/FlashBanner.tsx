export function FlashBanner({ message, tone }: { message: string; tone: 'success' | 'error' | 'warning' }) {
  const styles =
    tone === 'success'
      ? 'border-success-500/30 bg-success-500/10 text-success-200'
      : tone === 'error'
        ? 'border-danger-500/30 bg-danger-500/10 text-danger-200'
        : 'border-warning-500/30 bg-warning-500/10 text-warning-200';

  return (
    <div className={`mb-4 rounded-lg border px-4 py-3 text-sm ${styles}`}>{message}</div>
  );
}
