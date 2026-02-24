'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
//import { PrismaClient, Prisma } from '../../../generated/prisma/client'
import { prisma } from '@/app/lib/prisma'
import bcrypt from 'bcryptjs';


// Create Trainee

const FormSchema = z.object({
  //id: z.string(),
  email: z.string(),
  name: z.string(),
  password_hash: z.string(),
  // date: z.string(),
  // trainerId: z.number(),
  // role: z.enum(['TRAINEE', 'TRAINER']).default('TRAINEE'),
});

const CreateTrainee = FormSchema;

export type State = {
  errors?: {
    email?: string[];
    name?: string[];
    password_hash?: string[];
  };
  message?: string | null;
};

export async function createTrainee(prevState: State, formData: FormData): Promise<State> {
  const password = await hashPassword(formData.get('password') as string);
  console.log('hashPassword', password);
    //console.log('CreateTrainee:', CreateTrainee);
  const validatedFields = CreateTrainee.safeParse({
    //traineeId: formData.get('id'),
    email: formData.get('email'),
    name: formData.get('username'),
    password_hash: password,
    // date: new Date().toISOString().split('T')[0],
    // trainer_id: 1,
    // role: 'TRAINEE',
  });

  console.log('Validated Fields:', validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }



  try {
    await prisma.user.create({ data: validatedFields.data });
    return {
      errors: {},
      message: 'Trainee created successfully.',
    };
  } catch (error) {
    console.error(error);
    return {
      errors: {},
      message: 'Database Error: Failed to Create Trainee.',
    };
  }
}


const createWorkoutDataForm = z.object({
  user_id: z.number(),
  name: z.string(),
  notes: z.string().optional().nullable(),
  date: z.date(),
  created_at: z.date(),
  exercises: z.array(z.any()),
});

const createWorkoutData = createWorkoutDataForm;

export async function createWorkout(prevState: State, formData: FormData): Promise<State> {
  const workoutFields = createWorkoutData.safeParse({
    user_id: 16, // TODO: change to real ID of creator
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
    console.log('createWorkout try', workoutFields.data);
    await prisma.$transaction(async (tx) => {
      const workout = await tx.workout.create({
        data: {
          user_id: workoutFields.data.user_id,
          name: workoutFields.data.name,
          notes: workoutFields.data.notes,
          date: workoutFields.data.date,
          created_at: workoutFields.data.created_at,
        },
      });

      // await tx.workoutExercise.createMany({
      //   data: workoutFields.data.exercises.map((ex, index) => ({
      //     workout_id: workout.id,
      //     exercise_id: Number(ex.exerciseId), // TODO: recivind ID as a number from the form
      //     // sets: ex.sets,
      //     // reps: ex.reps,
      //     // weight: ex.weight,
      //     // order_number: index,
      //   })),
      // });

      const workoutExercises = await Promise.all(
        workoutFields.data.exercises.map((ex) =>
          tx.workoutExercise.create({
            data: {
              workout_id: workout.id,
              exercise_id: Number(ex.exerciseId),
            },
          })
        )
      );

      await tx.workoutSet.createMany({
        data: workoutExercises.flatMap((we, exIndex) =>
          workoutFields.data.exercises[exIndex].sets.map((set, setIndex) => ({
            workout_exercise_id: we.id,
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
    };
  } catch (error) {
    console.error(error);
    return {
      errors: {},
      message: 'Database Error: Failed to Create Workout.',
    };
  }
}



export async function hashPassword(unHashPassword: string): Promise<string> {
  return await bcrypt.hash(unHashPassword, 10);
}

export async function isPasswordSame(unHashPassword: string, hashPassword: string): Promise<boolean> {
  return await bcrypt.compare(unHashPassword, hashPassword);
}


// Query All Trainees
export async function getAllTrainees() {    
  return await prisma.user.findMany({
    // where: {
    //   role: 'TRAINEE',
    // },
  });
}



// Query Workout by ID
export async function getWorkoutById(workoutId: string) {
  return await prisma.workout.findUnique({
    where: {
      id: workoutId,
    },
  });
}

export async function getWorkoutExercises(workoutId: string) {
  const workoutExercises = await prisma.workoutExercise.findMany({
    where: {
      workoutId: workoutId,
    },
  });

  return await Promise.all(
    workoutExercises.map(async (we) => {
      const exercise = await prisma.exercise.findUnique({
        where: {
          id: we.exerciseId,
        },
      });

      const sets = await prisma.workoutSet.findMany({
        where: {
          workoutExerciseId: we.id,
        },
        orderBy: {
          set_number: 'asc',
        },
      });

      return {
        ...we,
        exercise,
        sets,
      };
    })
  );
}

// Query All Exercises
export async function getAllExercises() {    
  return await prisma.exercise.findMany();
}

//Handle Search
export async function filterExercises({ term }: { term?: string }) {
  return await prisma.exercise.findMany({
    where: {
      name: {
        contains: term,
        mode: 'insensitive',
      },
    },
  });
}
