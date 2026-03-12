"use client";

import { useTrainingStore } from "@/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { WorkoutExerciseCard } from "@/features/exercises/workout-exercise-card";
import type { ExerciseDTO } from "@/types/types";


type Props = {
  allExercises: ExerciseDTO[]; // pass the full list from the page
};

export function ExerciseBuilder({ allExercises }: Props) {
  const { exercises } = useTrainingStore();

  return (
    <>
      {/* Exercises Builder */}
      <div
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden
            lg:col-start-1 lg:row-start-2"
      >
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Exercises
          </h2>
          {exercises.length > 0 && (
            <span className="text-xs text-gray-400">
              {exercises.length} added
            </span>
          )}
        </div>

        <div className="px-6 py-5 max-h-[520px] overflow-y-auto">
          {exercises.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-200 rounded-2xl">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                <FontAwesomeIcon
                  icon={faDumbbell}
                  className="w-6 h-6 text-gray-300"
                />
              </div>
              <p className="text-sm font-medium text-gray-400">
                No exercises added yet
              </p>
              <p className="text-xs text-gray-300 mt-1">
                Search and add exercises from the panel →
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {exercises.map((ex) => {
                const meta = allExercises.find((e) => e.id === ex.exerciseId);
                if (!meta) return null;

                return (
                  <WorkoutExerciseCard
                    key={ex.exerciseId}
                    exerciseId={ex.exerciseId}
                    meta={meta}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
