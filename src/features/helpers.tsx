// Helpers
export function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}
export function fmtDate(iso: Date | string | null | undefined) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
export function fmtTime(date: Date | null | undefined) {
  if (!date) return '';
  return new Date(date).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
export function fmtDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
export function avgDuration(sessions: { duration_minutes?: number }[]) {
  if (!sessions.length) return 0;
  return Math.round(sessions.reduce((s, x) => s + (x.duration_minutes || 0), 0) / sessions.length);
}
export function lastSeen(sessions: { startedAt: string }[]) {
  if (!sessions.length) return "No sessions";
  const dates = sessions.map(s => new Date(s.startedAt).getTime());
  return fmtDate(new Date(Math.max(...dates)).toISOString());
}
export function statusColor(status: string) {
  if (status === "completed") return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
  if (status === "in_progress") return "bg-violet-500/20 text-violet-300 border border-violet-500/30";
  return "bg-slate-500/20 text-slate-400 border border-slate-500/30";
}
export function avatarGradient(id: string) {
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

export function WeightSparkline({ measurements }: { measurements: { weight: number }[] }) {
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

export function isExpired(expiresAt: Date) {
  return new Date(expiresAt) < new Date();
}

type InviteStatus = 'pending' | 'accepted' | 'expired' | string;

export function statusConfig(status: InviteStatus, expiresAt: Date) {
  const expired = isExpired(expiresAt) && status.toLocaleLowerCase() === 'pending';
  const s = expired ? 'expired' : status.toLocaleLowerCase();
  const map: Record<string, { label: string; pill: string; dot: string }> = {
    pending:  { label: 'pending',  pill: 'bg-amber-50 text-amber-600 border-amber-200',   dot: 'bg-amber-400 animate-pulse' },
    accepted: { label: 'accepted', pill: 'bg-emerald-50 text-emerald-600 border-emerald-200', dot: 'bg-emerald-400' },
    expired:  { label: 'expired',  pill: 'bg-gray-100 text-gray-500 border-gray-200',     dot: 'bg-gray-300' },
  };
  return map[s] ?? map['expired'];
}


// ── Muscle colours  ────────────────────────────────────
export const MUSCLE_COLORS: Record<string, { pill: string; dot: string }> = {
  "Chest Exercises":    { pill: "bg-rose-50 text-rose-600",     dot: "bg-rose-400"    },
  "Back Exercises":     { pill: "bg-blue-50 text-blue-600",     dot: "bg-blue-400"    },
  "Legs Exercises":     { pill: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-400" },
  "Shoulder Exercises": { pill: "bg-amber-50 text-amber-600",   dot: "bg-amber-400"   },
  "Biceps Exercises":   { pill: "bg-violet-50 text-violet-600", dot: "bg-violet-400"  },
  "Triceps Exercises":  { pill: "bg-fuchsia-50 text-fuchsia-600", dot: "bg-fuchsia-400" },
  "Core Exercises":     { pill: "bg-indigo-50 text-indigo-600", dot: "bg-indigo-400"  },
};