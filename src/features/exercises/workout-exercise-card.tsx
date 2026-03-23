"use client";

import { useTrainingStore } from "@/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { SetRow } from "@/features/exercises/exercise-row";
import type { ExerciseDTO } from "@/types/types";
import { MUSCLE_COLORS } from '@/features/helpers'


type Props = {
  exerciseId: string;
  meta: ExerciseDTO; // full exercise info passed from ExerciseBuilder
};

export function WorkoutExerciseCard({ exerciseId, meta }: Props) {
  const { exercises, addSet, toggleExercise } = useTrainingStore();
  const entry = exercises.find((e) => e.exerciseId === exerciseId);
  const colors = MUSCLE_COLORS[meta.muscleGroup ?? ""];

  if (!entry) return null;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-50">
        <div
          className={`w-2 h-2 rounded-full flex-shrink-0 ${colors?.dot ?? "bg-gray-300"}`}
        />
        {meta.muscleGroup && (
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${colors?.pill ?? "bg-gray-100 text-gray-500"}`}
          >
            {meta.muscleGroup}
          </span>
        )}
        <span className="flex-1 text-sm font-semibold text-gray-800 truncate">
          {meta.name}
        </span>
        <span className="text-xs text-gray-400 mr-1">
          {entry.sets.length} sets
        </span>
        <button
          onClick={() => toggleExercise(exerciseId)}
          className="w-7 h-7 cursor-pointer rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors flex-shrink-0 group/del"
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="w-3.5 h-3.5 text-gray-300 group-hover/del:text-red-400 transition-colors"
          />
        </button>
      </div>

      <div className="px-4 py-3 space-y-2">
        {entry.sets.length > 0 && (
          <div className="flex items-center gap-2 mb-1">
            <span className="w-5 flex-shrink-0" />
            <div className="flex-1 grid grid-cols-2 gap-2">
              <span className="text-[10px] font-semibold text-gray-400 text-center uppercase tracking-wide">
                Reps
              </span>
              <span className="text-[10px] font-semibold text-gray-400 text-center uppercase tracking-wide">
                Weight
              </span>
            </div>
            <span className="w-6 flex-shrink-0" />
          </div>
        )}
        {entry.sets.map((s) => (
          <SetRow key={s.setNumber} exerciseId={exerciseId} set={s} />
        ))}
        <button
          onClick={() => addSet(exerciseId)}
          className="w-full cursor-pointer flex items-center justify-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 border border-dashed border-violet-200 rounded-xl py-2 transition-all mt-1"
        >
          <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5" /> Add Set
        </button>
      </div>
    </div>
  );
}
