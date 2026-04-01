"use client";

import { useState, useTransition } from "react";
import { updateWorkoutStatus } from "@/lib/actions/workout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const STATUS_OPTIONS = [
  {
    value: "assigned",
    label: "Upcoming",
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
  {
    value: "in_progress",
    label: "In Progress",
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    value: "completed",
    label: "Completed",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
] as const;

type Status = (typeof STATUS_OPTIONS)[number]["value"];

export function WorkoutStatusSelect({
  workoutId,
  currentStatus,
}: {
  workoutId: string;
  currentStatus: Status;
}) {
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<Status>(currentStatus);
  const current =
    STATUS_OPTIONS.find((s) => s.value === selected) ?? STATUS_OPTIONS[0];

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as Status;
    setSelected(next);
    startTransition(() => {
      updateWorkoutStatus(workoutId, next);
    });
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-gray-100 dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="w-9 h-9 text-gray-400"
        />
      </div>
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
          Status
        </p>
        <select
          defaultValue={currentStatus}
          onChange={handleChange}
          disabled={isPending}
          className={`mt-0.5 text-sm font-semibold border rounded-lg px-2 py-0.5 pr-6 appearance-none cursor-pointer
            transition-opacity ${isPending ? "opacity-50" : ""} ${current.color}`}
        >
          {STATUS_OPTIONS.map((s) => (
            <option
              key={s.value}
              value={s.value}
              className="bg-white text-gray-900"
            >
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
