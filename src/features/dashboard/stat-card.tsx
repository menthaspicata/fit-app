import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type Stat = {
  icon: IconDefinition;
  color: "violet" | "purple" | "indigo" | "fuchsia";
  value: string | number;
  label: string;
  delta?: string;
};

export function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  const colorMap = {
    violet: { bg: "bg-violet-50", icon: "text-violet-600", ring: "ring-violet-100", dot: "bg-violet-600" },
    purple: { bg: "bg-purple-50", icon: "text-purple-600", ring: "ring-purple-100", dot: "bg-purple-600" },
    indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", ring: "ring-indigo-100", dot: "bg-indigo-600" },
    fuchsia: { bg: "bg-fuchsia-50", icon: "text-fuchsia-600", ring: "ring-fuchsia-100", dot: "bg-fuchsia-600" },
  } as const;
  const c = colorMap[stat.color as keyof typeof colorMap];

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 ${c.bg} ring-1 ${c.ring} rounded-xl flex items-center justify-center`}
        >
          <FontAwesomeIcon icon={stat.icon} className={`w-5 h-5 ${c.icon}`} />
        </div>
        <span className={`w-2 h-2 rounded-full ${c.dot} mt-1`} />
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-0.5">
        {stat.value}
      </div>
      <div className="text-sm font-medium text-gray-500 mb-1">{stat.label}</div>
      <div className="text-xs text-gray-400">{stat.delta}</div>
    </div>
  );
}
