export function FormErrorBanner({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      <span className="mt-0.5 shrink-0 text-red-500" aria-hidden="true">⚠</span>
      <p>{message}</p>
    </div>
  );
}