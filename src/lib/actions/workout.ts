'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma'
import { getServerSession } from '@/lib/getSession';

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
  traineeId: z.string().optional().nullable(), 
});

const createWorkoutData = createWorkoutDataForm;

export async function createWorkout(prevState: State, formData: FormData): Promise<State> {
  const session = await getServerSession()
  const userId = session?.user.id
  const workoutFields = createWorkoutData.safeParse({
    userId: userId,
    name: formData.get('workout-name'),
    notes: formData.get('workout-notes'),
    traineeId: formData.get('trainee-id') || null,
    created_at: new Date(),
    date: new Date(formData.get('workout-date') as string),
    exercises: JSON.parse(formData.get('exercises') as string),
  });

  if (!workoutFields.success) {
    return {
      errors: workoutFields.error.flatten().fieldErrors, // TODO: map Zod errors to State errors
      message: 'Missing Fields. Failed to Create Workout.',
    };
  }

  try {
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
          workoutFields.data.exercises[exIndex].sets.map((set: { reps: number; weight: number }, setIndex: number) => ({
        workoutExerciseId: we.id,
        set_number: setIndex + 1,
        reps: set.reps,
        weight: set.weight,
        order_number: setIndex,
          }))
        ),
      });

      if (workoutFields.data.traineeId) {
        await tx.userWorkout.create({
          data: {
            userId: workoutFields.data.traineeId,   // the trainee
            workoutId: workout.id,
            assignedBy: workoutFields.data.userId,  // the trainer
            status: 'assigned',
            startDate: workoutFields.data.date,
          },
        });
      }
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

export async function updateWorkoutStatus(
  workoutId: string,
  status: 'assigned' | 'in_progress' | 'completed'
): Promise<{ success: boolean; message: string }> {
  const session = await getServerSession();
  const userId = session?.user.id;
  if (!userId) return { success: false, message: 'Not authenticated.' };

  const workout = await prisma.workout.findUnique({ where: { id: workoutId } });
  if (!workout) return { success: false, message: 'Workout not found.' };
  if (workout.userId !== userId) return { success: false, message: 'Not authorized.' };

  await prisma.userWorkout.updateMany({
    where: { workoutId },
    data: { status },
  });

  return { success: true, message: 'Status updated.' };
}

export async function updateWorkout(workoutId: string, prevState: State, formData: FormData): Promise<State> {
  const session = await getServerSession();
  const userId = session?.user.id;

  const workout = await prisma.workout.findUnique({ where: { id: workoutId } });
  if (!workout) return { errors: {}, message: 'Workout not found.' };
  if (workout.userId !== userId) return { errors: {}, message: 'Not authorized.' };

  const fields = createWorkoutData.safeParse({
    userId,
    name: formData.get('workout-name'),
    notes: formData.get('workout-notes'),
    traineeId: formData.get('trainee-id') || null,
    created_at: new Date(),
    date: new Date(formData.get('workout-date') as string),
    exercises: JSON.parse(formData.get('exercises') as string),
  });

  if (!fields.success) return { errors: fields.error.flatten().fieldErrors, message: 'Missing Fields.' };

  try {
    await prisma.$transaction(async (tx) => {
      await tx.workout.update({
        where: { id: workoutId },
        data: {
          name: fields.data.name,
          notes: fields.data.notes,
          date: fields.data.date,
        },
      });

      // Replace exercises + sets
      const existing = await tx.workoutExercise.findMany({ where: { workoutId } });
      await tx.workoutSet.deleteMany({ where: { workoutExerciseId: { in: existing.map((e) => e.id) } } });
      await tx.workoutExercise.deleteMany({ where: { workoutId } });

      const workoutExercises = await Promise.all(
        fields.data.exercises.map((ex) =>
          tx.workoutExercise.create({ data: { workoutId, exerciseId: ex.exerciseId } })
        )
      );

      await tx.workoutSet.createMany({
        data: workoutExercises.flatMap((we, i) =>
          fields.data.exercises[i].sets.map((set: { reps: number; weight: number }, j: number) => ({
            workoutExerciseId: we.id,
            set_number: j + 1,
            reps: set.reps,
            weight: set.weight,
            order_number: j,
          }))
        ),
      });

      if (fields.data.traineeId) {
        await tx.userWorkout.deleteMany({ where: { workoutId } });

        await tx.userWorkout.create({
          data: {
            userId: fields.data.traineeId,
            workoutId,
            assignedBy: userId!,
            status: 'assigned',
            startDate: fields.data.date,
          },
        });
      }
    });

    return { errors: {}, message: 'Workout updated successfully.', success: true };
  } catch (error) {
    console.error(error);
    return { errors: {}, message: 'Database Error: Failed to Update Workout.' };
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
  const session = await getServerSession();
  const userId = session?.user.id;

  return await prisma.workout.findMany({
    where: {
      userId: userId,
    },
    include: {
      userWorkouts: {
        include: {
          user: {  // the trainee
            select: { id: true, name: true },
          },
        },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
  ],
  });
}

export async function getTrainerWorkoutsByDate(trainerId: string, date: string) {
  const startOfDay = new Date(`${date}T00:00:00`);
  const endOfDay = new Date(`${date}T23:59:59.999`);

  const userWorkouts = await prisma.userWorkout.findMany({
    where: {
      assignedBy: trainerId,
      startDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      user: true,
      workout: true,
    },
  });

  return userWorkouts;
}

// Query Workout by ID
export async function getWorkoutById(workoutId: string) {
  return await prisma.workout.findUnique({
    where: { id: workoutId },
    include: {
      userWorkouts: {
        include: {
          user: {  // the trainee
            select: { id: true, name: true },
          },
        },
      },
    },
  });
}

// Query Workout Exercises by Workout ID

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

// Delete Workout 

export async function deleteWorkout(workoutId: string): Promise<{ success: boolean; message: string }> {
  const session = await getServerSession();
  const userId = session?.user.id;
 
  if (!userId) return { success: false, message: 'Not authenticated.' };
 
  // Verify the workout belongs to the requesting trainer
  const workout = await prisma.workout.findUnique({ where: { id: workoutId } });
  if (!workout) return { success: false, message: 'Workout not found.' };
  if (workout.userId !== userId) return { success: false, message: 'Not authorized.' };
 
  try {
    await prisma.$transaction(async (tx) => {
      // Delete sets → exercises → assignments → workout (in dependency order)
      const workoutExercises = await tx.workoutExercise.findMany({ where: { workoutId } });
      await tx.workoutSet.deleteMany({
        where: { workoutExerciseId: { in: workoutExercises.map((we) => we.id) } },
      });
      await tx.workoutExercise.deleteMany({ where: { workoutId } });
      await tx.userWorkout.deleteMany({ where: { workoutId } });
      await tx.workout.delete({ where: { id: workoutId } });
    });
 
    return { success: true, message: 'Workout deleted successfully.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Database error: failed to delete workout.' };
  }
}

export async function getDashboardStats() {
  const session = await getServerSession();
  const userId = session?.user.id;
  if (!userId) return { totalTrainees: 0, activeWorkouts: 0, workoutsToday: 0 };

  const today = new Date().toISOString().split('T')[0];
  const startOfDay = new Date(`${today}T00:00:00.000Z`);
  const endOfDay = new Date(`${today}T23:59:59.999Z`);

  const [totalTrainees, activeWorkouts, workoutsToday] = await Promise.all([
    // Count trainees linked to this trainer
    prisma.user.count({
      where: { trainerId: userId },
    }),
    // Active userWorkouts assigned by this trainer
    prisma.userWorkout.count({
      where: {
        assignedBy: userId,
        status: { in: ['assigned', 'in_progress'] },
      },
    }),
    // Workouts assigned by trainer scheduled for today
    prisma.userWorkout.count({
      where: {
        assignedBy: userId,
        startDate: { gte: startOfDay, lte: endOfDay },
      },
    }),
  ]);

  return { totalTrainees, activeWorkouts, workoutsToday };
}

// Workout in progress
export async function completeWorkout(
  workoutId: string,
  userId: string
): Promise<{ success: boolean; message: string }> {
  const assignment = await prisma.userWorkout.findFirst({
    where: { workoutId, userId },
  });

  if (!assignment) return { success: false, message: 'Workout assignment not found.' };

  await prisma.userWorkout.updateMany({
    where: { workoutId, userId },
    data: {
      status: 'completed',
      endDate: new Date(),
    },
  });

  return { success: true, message: 'Workout completed.' };
}