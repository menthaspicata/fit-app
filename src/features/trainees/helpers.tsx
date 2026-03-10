// Helpers
export function initials(name) {
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}
export function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
export function avgDuration(sessions) {
  if (!sessions.length) return 0;
  return Math.round(sessions.reduce((s, x) => s + (x.duration_minutes || 0), 0) / sessions.length);
}
export function lastSeen(sessions) {
  if (!sessions.length) return "No sessions";
  const dates = sessions.map(s => new Date(s.startedAt));
  return fmtDate(new Date(Math.max(...dates)).toISOString());
}
export function statusColor(status) {
  if (status === "completed") return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
  if (status === "in_progress") return "bg-violet-500/20 text-violet-300 border border-violet-500/30";
  return "bg-slate-500/20 text-slate-400 border border-slate-500/30";
}
export function avatarGradient(id) {
    const gradients = [
        "from-violet-500 to-purple-700",
        "from-fuchsia-500 to-violet-700",
        "from-indigo-500 to-violet-600",
        "from-purple-500 to-pink-600",
        "from-violet-400 to-indigo-600",
        "from-fuchsia-400 to-purple-600",
    ];
    const idx = id.charCodeAt(id.length - 1) % gradients.length;
    return gradients[idx];
}

export function WeightSparkline({ measurements }) {
  if (measurements.length < 2) return <span className="text-slate-500 text-xs">No data</span>;
  const weights = measurements.map(m => m.weight);
  const min = Math.min(...weights) - 2;
  const max = Math.max(...weights) + 2;
  const W = 80, H = 28;
  const pts = weights.map((w, i) => {
    const x = (i / (weights.length - 1)) * W;
    const y = H - ((w - min) / (max - min)) * H;
    return `${x},${y}`;
  }).join(" ");
  const trend = weights[weights.length - 1] < weights[0];
  return (
    <svg width={W} height={H} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={trend ? "#34d399" : "#f87171"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {weights.map((w, i) => {
        const x = (i / (weights.length - 1)) * W;
        const y = H - ((w - min) / (max - min)) * H;
        return <circle key={i} cx={x} cy={y} r="2.5" fill={trend ? "#34d399" : "#f87171"} />;
      })}
    </svg>
  );
}