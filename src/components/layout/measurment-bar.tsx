// ── Measurement Bar ───────────────────────────────────────────────────────────
export function MeasurementBar({ label, value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-slate-400 font-medium">{label}</span>
        <span className="text-xs text-white font-semibold">{value} cm</span>
      </div>
      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%`, transition: "width 0.8s ease" }} />
      </div>
    </div>
  );
}