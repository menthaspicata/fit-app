'use client';

import { fetchTrainingsByDate } from "@/lib/actions/workouts.actions";
import { useState, useEffect, useRef } from "react";
import Button from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';


export default function Schedule() {
  const today = new Date();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );

  const calendarRef = useRef<HTMLDivElement>(null);

  const getLocalDayKey = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const isToday = (date: Date) =>
    getLocalDayKey(date) === getLocalDayKey(today);

  useEffect(() => {
    setIsLoading(true);
    fetchTrainingsByDate(getLocalDayKey(selectedDate)).then((result) => {
      setWorkouts(result);
      setIsLoading(false);
    });
  }, [selectedDate]);

  useEffect(() => {
    if (!isCalendarOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCalendarOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isCalendarOpen]);

  const changeDay = (delta: number) => {
    setSelectedDate(prev =>
      new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + delta)
    );
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <div className="w-full">
      <h2 className="mt-4 mb-4 text-xl md:text-2xl">Today's Schedule</h2>
      <div className="flex items-center justify-between gap-2 mb-8">
        <Button
          onClick={() => changeDay(-1)}
          className="cursor-pointer flex-shrink-0"
          aria-label="Previous day"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>

        <div className="relative flex justify-center flex-1" ref={calendarRef}>
          <button
            type="button"
            onClick={() => setIsCalendarOpen(prev => !prev)}
            aria-expanded={isCalendarOpen}
            aria-haspopup="dialog"
            className="
              inline-flex items-center gap-1.5
              text-sm sm:text-base font-medium
              px-3 py-1.5 rounded-lg
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition-colors duration-150
              cursor-pointer select-none
            "
          >
            <span>{formatDate(selectedDate)}</span>
            <CalendarDaysIcon
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                isCalendarOpen ? 'rotate-[-8deg] text-gray-600 dark:text-gray-300' : ''
              }`}
            />
          </button>

          {/* Popup */}
          {isCalendarOpen && (
            <div
              role="dialog"
              aria-label="Date picker"
              className="
                absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2
                z-50
                bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-700
                rounded-2xl shadow-2xl
                p-2
                w-max
                max-w-[calc(100vw-2rem)]
              "
              style={{ animation: 'popupIn 0.15s ease-out forwards' }}
            >
              <div className="
                absolute -top-[7px] left-1/2 -translate-x-1/2
                w-3.5 h-3.5 rotate-45
                bg-white dark:bg-gray-900
                border-l border-t border-gray-200 dark:border-gray-700
              " />

              <Calendar
                selectedDate={selectedDate}
                onSelect={(date) => {
                  setIsCalendarOpen(false);
                  if (!date) return;
                  setSelectedDate(
                    new Date(date.getFullYear(), date.getMonth(), date.getDate())
                  );
                }}
              />
            </div>
          )}
        </div>

        <Button
          onClick={() => changeDay(1)}
          className="cursor-pointer flex-shrink-0"
          aria-label="Next day"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      </div>

      <div>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 dark:border-gray-600 dark:border-t-gray-300" />
          </div>
        ) : workouts.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {workouts.map((workout) => (
              <li key={workout.id}>
                <Link
                  href={`/dashboard/workouts/${workout.id}`}
                  className="
                    card flex items-center justify-between gap-4
                    px-4 py-3 rounded-xl
                    hover:bg-gray-50 dark:hover:bg-gray-800/60
                    transition-colors duration-150
                    group
                  "
                >
                  <p className="font-medium truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {workout.name}
                  </p>
                  <p className="text-sm text-gray-400 flex-shrink-0 tabular-nums">
                    {workout.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-14 gap-3 text-gray-400 dark:text-gray-500">
            <CalendarDaysIcon className="h-10 w-10 opacity-40" />
            <p className="text-sm sm:text-base text-center">
              {isToday(selectedDate)
                ? "You don't have any workouts today"
                : "No workouts on this day"}
            </p>
          </div>
        )}
      </div>

      {/* Popup animation */}
      <style>{`
        @keyframes popupIn {
          from {
            opacity: 0;
            transform: translateX(0%) translateY(-6px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateX(0%) translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
