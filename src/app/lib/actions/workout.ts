'use server';

import { z } from 'zod';
import { Exercise } from '@prisma/client';
import { prisma } from '@/app/lib/prisma'



const createWorkoutData = z.object({
  name: z.string(),
  notes: z.string().optional(),
  date: z.string(),
})


export async function createWorkout(formData: FormData, exercises: Exercise[]) {
  console.log('createWorkout', formData)
  const workoutName = formData.get('workout-name') as string;
  const validatedFields = createWorkoutData.safeParse({
    name: workoutName,
    notes: formData.get('notes'),
    date: new Date().toISOString().split('T')[0],
  });

  try {
    // await prisma.workoutExercise.create({ data: validatedFields.data });
    await prisma.workout.create({ data: validatedFields.data });
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