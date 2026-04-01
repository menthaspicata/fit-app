"use client";

import { useMemo, useState } from "react";
import type { ExerciseDTO } from "@/types/types";
import { ExerciseCard } from "@/features/exercises/exercise-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type Props = {
  allExercises: ExerciseDTO[];
};

export function ExerciseList({ allExercises }: Props) {
  const [search, setSearch] = useState("");
  const [muscleFilter, setMuscleFilter] = useState("All");

  const filteredExercises = useMemo(
    () =>
      allExercises.filter((ex) => {
        const matchesSearch =
          ex.name?.toLowerCase().includes(search.toLowerCase()) ?? false;
        const matchesMuscle =
          muscleFilter === "All" || ex.muscleGroup === muscleFilter;
        return matchesSearch && matchesMuscle;
      }),
    [search, muscleFilter],
  );

  return (
    <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
      {/* ── Right: Exercise Search ── */}
      <div className="sticky top-6 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 dark:border-gray-800">
          <h2 className="text-sm font-bold text-gray-800 dark:text-violet-100 uppercase tracking-wide mb-3">
            Exercise Library
          </h2>

          {/* Search input */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            />
            <input
              type="search"
              placeholder="Search exercises…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50  border border-gray-200 dark:bg-slate-700  dark:border-slate-600 dark:text-violet-100 text-gray-700 placeholder-gray-400 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-violet-400 dark:focus:border-slate-800  focus:ring-2 focus:ring-violet-100 dark:focus:ring-slate-600 transition-all"
            />
          </div>
        </div>

        {/* Muscle group filters */}
        {/* <div className="px-5 py-3 border-b border-gray-50 flex gap-1.5 flex-wrap">
                    {MUSCLE_GROUPS.map(mg => (
                    <button
                        key={mg}
                        onClick={() => setMuscleFilter(mg)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all ${
                        muscleFilter === mg
                            ? 'bg-violet-600 text-white shadow-sm shadow-violet-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                    >
                        {mg}
                    </button>
                    ))}
                </div> */}

        {/* Exercise list */}
        <div className="max-h-[520px] overflow-y-auto px-4 py-3 space-y-2">
          {filteredExercises.length === 0 ? (
            <div className="text-center py-10 text-sm text-gray-400">
              No exercises found.
            </div>
          ) : (
            filteredExercises.map((ex) => <ExerciseCard key={ex.id} ex={ex} />)
          )}
        </div>
      </div>
    </div>
  );
}
