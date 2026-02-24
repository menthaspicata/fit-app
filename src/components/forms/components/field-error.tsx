// ── Small reusable error components ──────────────────────────────────────────

export function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return (
    <ul className="mt-1 space-y-0.5">
      {messages.map((msg) => (
        <li key={msg} className="flex items-center gap-1.5 text-xs text-red-500">
          <span aria-hidden="true">✕</span>
          {msg}
        </li>
      ))}
    </ul>
  );
}