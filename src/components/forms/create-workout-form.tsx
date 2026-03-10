'use client'

import { createWorkout, State } from '@/lib/actions/workout';
import { useActionState, useEffect,  } from 'react';
import { useTrainingStore  } from '@/store/store';
import Button from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { UserDTO } from '@/types/types';


export function CreateWorkoutForm({ trainees }: { trainees: UserDTO[] }) {  
    const initialState: State = {
        message: null,
        errors: {},
        success: false,
    };

    const [state, dispatch] = useActionState(
        async (prevState: State, formData: FormData) => {
            const exercises = useTrainingStore.getState().exercises;
            formData.append('exercises', JSON.stringify(exercises));
            const formValues = Object.fromEntries(formData);

            return await createWorkout(prevState, formData);
        },
        initialState
    );

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            router.push('/dashboard/workouts');
        }
    }, [state.success, router]);
  
    return (   
        <>
            <form action={dispatch} className="grid gap-2">
                <label htmlFor="workoutName" className="flex flex-col">
                    Workout Name
                    <input className="outline-none px-4 py-2" type="text" name="workout-name" id="workoutName" placeholder="Workout name"/>

                </label>
                <label htmlFor="workoutDate" className="flex flex-col">
                    Date
                    <input className="outline-none px-4 py-2" type='datetime-local' id='workoutDate' name='workout-date'></input>
                </label>
                <label htmlFor="traineeId" className="flex flex-col">
                    Trainee
                    <select name="trainee-id" id="traineeId" className="outline-none px-4 py-2">
                        {trainees.map((trainee) => (
                            <option key={trainee.id} value={trainee.id}>{trainee.name}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor="workoutNote" className="flex flex-col">
                    Notes
                    <textarea className="outline-none px-4 py-2" name="workout-notes" id="workoutNote" placeholder="Take a note.."></textarea>
                </label>
             
                <Button type="submit" className="createWorkout cursor-pointer items-center">Save</Button>
            </form>

        </> 

    )
}