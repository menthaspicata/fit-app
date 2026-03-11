"use client";

import { getTrainerWorkoutsByDate } from "@/lib/actions/workout";
import { useState, useEffect, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { avatarGradient, initials } from "@/features/trainees/helpers";
import { authClient } from "@/lib/auth-client";

export default function Schedule() {
  const today = new Date();

  // Single source of truth for date
  const [selectedDate, setSelectedDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const isToday = selectedDate.toDateString() === today.toDateString();

  const getLocalDayKey = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const changeDay = (delta: number) => {
    setSelectedDate(
      (prev) =>
        new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + delta),
    );
  };

  // Fetch workouts whenever date or user changes
  useEffect(() => {
    if (!user?.id) return;
    setIsLoading(true);
    getTrainerWorkoutsByDate(user.id, getLocalDayKey(selectedDate)).then(
      (result) => {
        setWorkouts(result);
        setIsLoading(false);
      },
    );
  }, [selectedDate, user?.id]);

  // Close calendar on outside click or Escape
  useEffect(() => {
    if (!isCalendarOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCalendarOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isCalendarOpen]);

  return (
    <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-visible">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <h2 className="text-base font-bold text-gray-900">Today's Schedule</h2>

        {/* Date nav */}
        <div className="flex items-center gap-2 relative" ref={calendarRef}>
          <button
            onClick={() => changeDay(-1)}
            className="cursor-pointer w-8 h-8 bg-violet-600 hover:bg-violet-700 rounded-lg flex items-center justify-center transition-colors shadow-sm shadow-violet-200"
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="w-4 h-4 text-white"
            />
          </button>

          {/* Date pill */}
          <div
            onClick={() => setIsCalendarOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer select-none"
            aria-expanded={isCalendarOpen}
            aria-haspopup="dialog"
          >
            <FontAwesomeIcon
              icon={faCalendar}
              className="w-3.5 h-3.5 text-gray-400"
            />
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              {formatDate(selectedDate)}
            </span>
            {isToday && (
              <span className="ml-1 text-[10px] font-bold text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded-full">
                Today
              </span>
            )}
          </div>

          <button
            onClick={() => changeDay(1)}
            className="cursor-pointer w-8 h-8 bg-violet-600 hover:bg-violet-700 rounded-lg flex items-center justify-center transition-colors shadow-sm shadow-violet-200"
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className="w-4 h-4 text-white"
            />
          </button>

          {/* Calendar popup */}
          {isCalendarOpen && (
            <div
              role="dialog"
              aria-label="Date picker"
              className="absolute top-[calc(100%+8px)] left-1/2 z-50 bg-white border border-gray-200 rounded-2xl shadow-2xl p-2 w-max max-w-[calc(100vw-2rem)]"
              style={{ animation: "popupIn 0.15s ease-out forwards" }}
            >
              {/* Arrow */}
              <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rotate-45 bg-white border-l border-t border-gray-200" />
              <Calendar
                selectedDate={selectedDate}
                onSelect={(date) => {
                  if (!date) return;
                  setSelectedDate(
                    new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate(),
                    ),
                  );
                  setIsCalendarOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Workout list */}
      <div className="divide-y divide-gray-50">
        {isLoading ? (
          <div className="flex items-center justify-center py-14">
            <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : workouts.length > 0 ? (
          workouts.map((workout) => (
            <div
              key={workout.id}
              className="flex relative items-center gap-4 px-6 py-3.5 hover:bg-gray-50/50 transition-colors group"
            >
              <Link
                href={`/dashboard/workouts/${workout.workout.id}`}
                className="absolute inset-0"
              />
              {/* Time */}
              <div className="w-14 text-center flex-shrink-0">
                <div className="text-sm font-bold text-gray-800">
                  {new Date(workout.startDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              {/* Status dot */}
              <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${workout.status === "completed" ? "bg-emerald-400" : "bg-violet-500 animate-pulse"}`}
                />
                <div className="w-px h-6 bg-gray-200" />
              </div>
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${avatarGradient(workout.user.id)} flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0`}
              >
                {initials(workout.user.name)}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800">
                  {workout.user.name}
                </div>
                <div className="text-xs text-gray-400">
                  {workout.workout.name}
                </div>
              </div>
              {/* Status badge */}
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                  workout.status === "completed"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-violet-50 text-violet-600"
                }`}
              >
                {workout.status === "completed" ? "Completed" : "Upcoming"}
              </span>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-14">
            <FontAwesomeIcon
              icon={faCalendar}
              className="w-10 h-10 text-gray-200 mb-3"
            />
            <p className="text-sm text-gray-400 font-medium">
              No workouts scheduled
            </p>
          </div>
        )}
      </div>
      <style>{`
        @keyframes popupIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1);    }
        }
      `}</style>
    </div>
  );
}
