import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center p-8">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-brand-300">404</p>
        <h1 className="mt-2 text-3xl font-semibold text-text-primary">Page not found</h1>
        <p className="mt-2 text-sm text-text-tertiary">
          That route doesn&apos;t exist yet — or you don&apos;t have access to it.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex items-center rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium text-white shadow-glow"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
