import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { useTrainingStore } from "@/store/store";
import type { ExerciseDTO } from "@/types/types";

export function ExerciseCard({ ex }: { ex: ExerciseDTO }) {
  const selectedIds = useTrainingStore((s) => s.selectedIds);
  const toggleExercise = useTrainingStore((s) => s.toggleExercise);
  const isSelected = !!selectedIds[ex.id];

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-150 ${isSelected ? "bg-violet-50 dark:bg-violet-50/20 border-violet-200 " : "bg-white dark:bg-gray-50/10 border-gray-100 dark:border-slate-800 hover:border-violet-200 hover:shadow-sm"}`}
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isSelected ? "bg-violet-100" : "bg-gray-100 dark:bg-slate-800"}`}
      >
        <FontAwesomeIcon
          icon={faDumbbell}
          className={`w-4 h-4 ${isSelected ? "text-violet-600" : "text-gray-400"}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-800 dark:text-violet-300">{ex.name}</div>
        {/* <div className={`text-[10px] font-semibold mt-0.5 ${MUSCLE_COLORS[ex.muscleGroup]?.split(' ')[1] ?? 'text-gray-400'}`}>{ex.muscleGroup}</div> */}
      </div>
      <button
        onClick={() => !isSelected && toggleExercise(ex.id)}
        className={`w-8 h-8 cursor-pointer rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
          isSelected
            ? "bg-violet-100 text-violet-600 cursor-default"
            : "bg-gray-100  hover:bg-violet-600 hover:text-white text-gray-400"
        }`}
      >
        {isSelected ? (
          <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
        ) : (
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
