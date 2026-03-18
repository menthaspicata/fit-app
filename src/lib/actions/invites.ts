'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/lib/getSession';
import { revalidatePath } from 'next/cache';

export async function getAllInvites() {
  const session = await getServerSession();
  const trainerId = session?.user.id;
  if (!trainerId) return [];

  return await prisma.invite.findMany({
    where: { trainerId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function deleteInvite(id: string): Promise<{ success: boolean; message: string }> {
  const session = await getServerSession();
  const trainerId = session?.user.id;
  if (!trainerId) return { success: false, message: 'Unauthorized' };

  try {
    // Ensure the invite belongs to this trainer before deleting
    const invite = await prisma.invite.findUnique({ where: { id } });
    if (!invite || invite.trainerId !== trainerId) {
      return { success: false, message: 'Invite not found' };
    }

    await prisma.invite.delete({ where: { id } });
    revalidatePath('/dashboard/invites');
    return { success: true, message: 'Invite deleted' };
  } catch {
    return { success: false, message: 'Failed to delete invite' };
  }
}