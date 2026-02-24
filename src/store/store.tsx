import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'

type SetEntry = {
  setNumber: number;
  reps: number;
  weight: number;
};

type ExerciseEntry = {
  exerciseId: string;
  sets: SetEntry[];
};

type TrainingState = {
  exercises: ExerciseEntry[];
  selectedIds: Record<string, true>;

  addSet: (exerciseId: string) => void;
  // updateSet: (exerciseId: string, setNumber: number, reps: number, weight?: number) => void;
  updateWeight: (exerciseId: string, setNumber: number, weight: number) => void;
  updateReps: (exerciseId: string, setNumber: number, reps: number) => void;
  removeSet: (exerciseId: string, setNumber: number) => void;
  toggleExercise: (exerciseId: string) => void;
  
};

export const useTrainingStore = create<TrainingState>((set) => ({
  exercises: [],
  selectedIds: {},

  addSet: (exerciseId) =>
    set((state) => ({
      exercises: state.exercises.map((ex) =>
        ex.exerciseId === exerciseId
          ? {
              ...ex,
              sets: [
                ...ex.sets,
                { setNumber: (ex.sets[ex.sets.length - 1]?.setNumber ?? 0) + 1, reps: 0, weight: 0 },
              ],
            }
          : ex
          
      ),
    })),

  // updateSet: (exerciseId, setNumber, reps, weight) =>
  //   set((state) => ({
  //     exercises: state.exercises.map((ex) =>
  //       ex.exerciseId === exerciseId
  //         ? {
  //             ...ex,
  //             sets: ex.sets.map((s) =>
  //               s.setNumber === setNumber ? { ...s, reps, weight } : s
  //             ),
  //           }
  //         : ex
  //   ),
  //   })),

  updateWeight: (exerciseId, setNumber, kg) =>
    set((state) => ({
        exercises: state.exercises.map((ex) =>
          ex.exerciseId === exerciseId 
          ? { 
            ...ex,
            sets: ex.sets.map((s) => 
              s.setNumber === setNumber ? { ...s, weight : kg } : s
            )
          } 
          : ex
        ),
  })),

  updateReps: (exerciseId, setNumber, reps) =>
    set((state) => ({
      exercises: state.exercises.map((ex) =>
          ex.exerciseId === exerciseId 
          ? { 
            ...ex,
            sets: ex.sets.map((s) => 
              s.setNumber === setNumber ? { ...s, reps : reps } : s
            )
          } 
          : ex
        ),
  })),

  removeSet: (exerciseId, setNumber) =>
    set((state) => ({
      exercises: state.exercises.map((ex) =>  
        ex.exerciseId === exerciseId
          ? {
              ...ex,  
              sets: ex.sets.filter((s) => s.setNumber !== setNumber),
            }
          : ex
      ),
    })),


toggleExercise: (id: string) =>
  set((state) => {
    const isSelected = !!state.selectedIds[id];

    if (isSelected) {
      const { [id]: _, ...restSelected } = state.selectedIds;

      return {
        selectedIds: restSelected,
        exercises: state.exercises.filter(
          (ex) => ex.exerciseId !== id
        ),
      };
    }

    return {
      selectedIds: {
        ...state.selectedIds,
        [id]: true,
      },
      exercises: [
        ...state.exercises,
        {
          exerciseId: id,
          sets: [
            {
              setNumber: 1,
              reps: 0,
              weight: 0,
            },
          ],
        },
      ],
    };
  }),


}));


type SearchState = {
  query: string;
  setQuery: (q: string) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (q) => set({ query: q }),
}));

