'use server';

import { auth } from '@/lib/auth';
import { z } from 'zod';
import { getServerSession } from '@/lib/getSession';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export type State = {
  errors?: {
    email?: string[];
    name?: string[];
    password?: string[];
  };
  message?: string | null;
  inviteLink?: string | null;
};

// ─── Trainer: Create Invite ───────────────────────────────────────────────────

const CreateInviteSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export async function createInvite(prevState: State, formData: FormData): Promise<State> {
  const session = await getServerSession();
  const userId = session?.user.id;

  if (!userId) return { message: 'Not authenticated.' };

  const validated = CreateInviteSchema.safeParse({ name: formData.get('username') });
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors as State['errors'], message: 'Missing fields.' };
  }

  try {
    const token = crypto.randomUUID();
    await prisma.invite.create({
      data: {
        trainerId: userId,
        name: validated.data.name,
        token,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'PENDING',
      },
    });
    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${token}`;
    return { errors: {}, message: 'Invite created successfully.', inviteLink };
  } catch (error) {
    console.error(error);
    return { message: 'Database error: failed to create invite.' };
  }
}

// ─── Trainee: Accept Invite ───────────────────────────────────────────────────

const AcceptInviteSchema = z.object({
  token: z.string().uuid(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function acceptInvite(prevState: State, formData: FormData): Promise<State> {
  const validated = AcceptInviteSchema.safeParse({
    token: formData.get('token'),
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors as State['errors'], message: 'Please fix the errors.' };
  }

  const { token, name, email, password } = validated.data;

  // 1. Look up the invite
  const invite = await prisma.invite.findUnique({ where: { token } });
  if (!invite) return { message: 'Invite not found.' };
  if (invite.status !== 'PENDING') return { message: 'This invite has already been used.' };
  if (invite.expiresAt < new Date()) return { message: 'This invite has expired.' };

  // 2. Check if email is already taken
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { errors: { email: ['This email is already registered.'] }, message: null };
  }

  // 3. Create the trainee account — nextCookies plugin sets the session cookie automatically
  const signUpResult = await auth.api.signUpEmail({
    body: { name, email, password },
  });

  const userId = signUpResult?.user?.id;
  if (!userId) return { message: 'Failed to create account. Please try again.' };

  // 4. Assign TRAINEE role and link to trainer
  await prisma.user.update({
    where: { id: userId },
    data: { role: 'TRAINEE', trainerId: invite.trainerId },
  });

  // 5. Mark invite as accepted
  await prisma.invite.update({
    where: { token },
    data: { status: 'ACCEPTED', traineeId: userId },
  });

  // 6. Sign in — nextCookies plugin automatically handles setting the session cookie
  await auth.api.signInEmail({
    body: { email, password },
  });

  // 7. Redirect — session cookie already set by nextCookies plugin above
  redirect('/dashboard');
}

// ─── Misc ─────────────────────────────────────────────────────────────────────

export async function fetchUserData() {
  const session = await getServerSession();
  const userId = session?.user.id;
  if (!userId) return null;
  return await prisma.user.findUnique({ where: { id: userId } });
}

export async function getAllTrainees() {
  return await prisma.user.findMany({ where: { role: 'TRAINEE' } });
}