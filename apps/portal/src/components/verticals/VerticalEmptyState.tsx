function EmptyState({ message }: { message: string }) {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-surface-border bg-surface-cardHover/40 p-12 text-center">
      <p className="text-sm text-text-tertiary">{message}</p>
    </div>
  );
}

export { EmptyState as VerticalEmptyState };
