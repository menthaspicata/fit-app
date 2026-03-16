"use client";

import { createWorkout, updateWorkout, State } from "@/lib/actions/workout";
import { useActionState, useEffect, useState } from "react";
import { useTrainingStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { UserDTO, WorkoutDTO } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser, faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";


export function CreateWorkoutForm({
  trainees,
  workout,
}: {
  trainees: UserDTO[];
  workout?: WorkoutDTO;
}) {
  const isEditing = !!workout;

  // Format date for datetime-local input
  const toInputDate = (d: Date) =>
    new Date(d).toISOString().slice(0, 16);

  const [workoutName, setWorkoutName] = useState(workout?.name ?? "");
  const [workoutDate, setWorkoutDate] = useState(workout?.date ? toInputDate(workout.date) : "");
  const [traineeId, setTraineeId] = useState(workout?.userId ?? (trainees[0]?.id ?? ""));
  const [notes, setNotes] = useState(workout?.notes ?? "");

  const initialState: State = { message: null, errors: {}, success: false };

  const action = isEditing
    ? (prev: State, fd: FormData) => updateWorkout(workout.id, prev, fd)
    : createWorkout;

  const [state, dispatch] = useActionState(
    async (prevState: State, formData: FormData) => {
      const exercises = useTrainingStore.getState().exercises;
      formData.set("exercises", JSON.stringify(exercises));
      return await action(prevState, formData);
    },
    initialState,
  );

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      useTrainingStore.getState().clearExercises?.();
      router.push(isEditing ? `/dashboard/workouts/${workout!.id}` : "/dashboard/workouts");
    }
  }, [state.success]);

  return (
    <form
      action={dispatch}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden lg:col-start-1 lg:row-start-1"
    >
      <div className="px-6 py-4 border-b border-gray-50">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
          {isEditing ? 'Edit Workout' : 'Workout Details'}
        </h2>
      </div>
      <div className="px-6 py-5 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Workout Name
          </label>
          <input
            type="text"
            name="workout-name"
            placeholder="e.g. Upper Body Blast"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              <FontAwesomeIcon icon={faCalendar} className="w-3 h-3" /> Date
            </label>
            <input
              type="datetime-local"
              name="workout-date"
              value={workoutDate}
              onChange={(e) => setWorkoutDate(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              <FontAwesomeIcon icon={faUser} className="w-3 h-3" /> Assign To
            </label>
            <select
              name="trainee-id"
              value={traineeId}
              onChange={(e) => setTraineeId(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all appearance-none cursor-pointer"
            >
              {trainees.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            <FontAwesomeIcon icon={faPenToSquare} className="w-3 h-3" /> Notes
          </label>
          <textarea
            name="workout-notes"
            placeholder="Add instructions or notes for the trainee…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all resize-none"
          />
        </div>

        {state.message && !state.success && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <button className="w-full cursor-pointer bg-violet-600 hover:bg-violet-700 active:scale-[0.99] text-white font-semibold text-sm py-3.5 rounded-2xl shadow-lg shadow-violet-200 transition-all duration-150 flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
          {isEditing ? 'Save Changes' : 'Save Workout'}
        </button>
      </div>
    </form>
  );
}