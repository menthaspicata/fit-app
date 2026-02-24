'use server';

import { prisma } from '@/app/lib/prisma'

export async function fetchTrainerData(id: string) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}