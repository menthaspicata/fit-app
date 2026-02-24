'use server';

import { prisma } from '@/app/lib/prisma'


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