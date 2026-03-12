'use server';

import { prisma } from '@/lib/prisma'


// Query All Exercises
export async function getAllExercises() {    
  return await prisma.exercise.findMany();
}

// Query Single Exercise
export async function getExerciseById(id: string) {
  return await prisma.exercise.findUnique({
    where: { id },
  });
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