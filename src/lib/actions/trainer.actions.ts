'use server';

import { prisma } from '@/lib/prisma'

export async function fetchTrainerData(id: string) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}