'use client'

import { useTrainingStore } from "@/store/store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

type SetRowProps = {
  setNumber: number | null;
  reps: number | null;
  weight: number | null;
};

export function SetRow({ exerciseId, set }: { exerciseId: string; set: SetRowProps }) {
  const updateReps   = useTrainingStore((s) => s.updateReps);
  const updateWeight = useTrainingStore((s) => s.updateWeight);
  const removeSet    = useTrainingStore((s) => s.removeSet);

  return (
    <div className="flex items-center gap-2 group/set">
      <span className="w-5 text-center text-[10px] font-bold text-gray-300 flex-shrink-0">{set.setNumber}</span>
      <div className="flex-1 grid grid-cols-2 gap-2">
        <div className="relative">
          <input
            type="number" min={0}
            value={set.reps ?? ''}
            placeholder="0"
            onChange={(e) => updateReps(exerciseId, set.setNumber ?? 0, Number(e.target.value))}
            className="w-full text-sm text-center bg-gray-50 border border-gray-200 rounded-lg py-1.5 pr-8 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 pointer-events-none">reps</span>
        </div>
        <div className="relative">
          <input
            type="number" min={0}
            value={set.weight ?? ''}
            placeholder="0"
            onChange={(e) => updateWeight(exerciseId, set.setNumber ?? 0, Number(e.target.value))}
            className="w-full text-sm text-center bg-gray-50 border border-gray-200 rounded-lg py-1.5 pr-7 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 pointer-events-none">kg</span>
        </div>
      </div>
      <button
        onClick={() => removeSet(exerciseId, set.setNumber ?? 0)}
        className="opacity-0 group-hover/set:opacity-100 w-6 h-6 rounded-lg hover:bg-red-50 flex items-center justify-center transition-all flex-shrink-0"
      >
        <FontAwesomeIcon icon={faTrashCan} className="w-3 h-3 cursor-pointer text-red-400" />
      </button>
    </div>
  );
}