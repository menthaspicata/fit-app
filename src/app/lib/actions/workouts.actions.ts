'use server';

import { z } from 'zod';
import { prisma } from '@/app/lib/prisma'
import { getServerSession } from '@/app/lib/getSession';

export type State = {
  errors?: {
    email?: string[];
    name?: string[];
  };
  message?: string | null;
  success?: boolean;
};

const createWorkoutDataForm = z.object({
  userId: z.string(),
  name: z.string(),
  notes: z.string().optional().nullable(),
  date: z.date(),
  created_at: z.date(),
  exercises: z.array(z.any()),
});

const createWorkoutData = createWorkoutDataForm;

export async function createWorkout(prevState: State, formData: FormData): Promise<State> {
  const session = await getServerSession()
  const userId = session?.user.id
  const workoutFields = createWorkoutData.safeParse({
    userId: userId,
    name: formData.get('workout-name'),
    notes: formData.get('workout-notes'),
    created_at: new Date(),
    date: new Date(formData.get('workout-date') as string),
    exercises: JSON.parse(formData.get('exercises') as string),
  });
  
  console.log('createWorkout workoutFields', workoutFields);

  if (!workoutFields.success) {
    return {
      errors: workoutFields.error.flatten().fieldErrors, // TODO: map Zod errors to State errors
      message: 'Missing Fields. Failed to Create Workout.',
    };
  }

  try {
    //console.log('createWorkout try', workoutFields.data);
    await prisma.$transaction(async (tx) => {
      const workout = await tx.workout.create({
        data: {
          userId: workoutFields.data.userId,
          name: workoutFields.data.name,
          notes: workoutFields.data.notes,
          date: workoutFields.data.date,
          createdAt: workoutFields.data.created_at,
        },
      });

      const workoutExercises = await Promise.all(
        workoutFields.data.exercises.map((ex) =>
          tx.workoutExercise.create({
            data: {
              workoutId: workout.id,
              exerciseId: ex.exerciseId,
            },
          })
        )
      );

      

      await tx.workoutSet.createMany({
        data: workoutExercises.flatMap((we, exIndex) =>
          workoutFields.data.exercises[exIndex].sets.map((set, setIndex) => ({
        workoutExerciseId: we.id,
        set_number: setIndex + 1,
        reps: set.reps,
        weight: set.weight,
        order_number: setIndex,
          }))
        ),
      });
    });





    
    return {
      errors: {},
      message: 'Workout created successfully.',
        success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      errors: {},
      message: 'Database Error: Failed to Create Workout.',
    };
  }
}

export async function fetchTrainingsByDate(day: string) {
  const session = await getServerSession()
  const userId = session?.user.id
  const start = new Date(`${day}T00:00:00.000Z`);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);

  return await prisma.workout.findMany({
    where: {
      userId: userId,
      date: {
        gte: start,
        lt: end,
      },
    },
  });
}

// Query All Workouts
export async function getAllWorkouts() {    
  return await prisma.workout.findMany({
    // where: {
    //   role: 'TRAINEE',
    // },
  });
}

