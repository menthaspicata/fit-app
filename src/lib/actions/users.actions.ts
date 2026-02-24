'use server';

import { auth } from '@/lib/auth';
import { z } from 'zod';
import { getServerSession } from '@/lib/getSession';
import { prisma } from '@/lib/prisma'


const CreateUser = z.object({
  email: z.string(),
  name: z.string()
});

export type State = {
  errors?: {
    email?: string[];
    name?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = CreateUser.safeParse({
    email: formData.get('email'),
    name: formData.get('username'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

    const tempPassword = crypto.randomUUID().slice(0, 8)

    console.log('Creating user with temp password:', tempPassword);
    const user = await auth.api.signUpEmail({
        body: {
            name: validatedFields.data.name,
            email: validatedFields.data.email,
            password: tempPassword,
        }

    })

    return {
        errors: {},
        message: `User created successfully. Temporary password is ${tempPassword}`,
    };

//   try {
//     await prisma.user.create({ data: validatedFields.data });
//     return {
//       errors: {},
//       message: 'Trainee created successfully.',
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       errors: {},
//       message: 'Database Error: Failed to Create Trainee.',
//     };
//   }
}

export async function createInvite(prevState: State, formData: FormData) {
  const token = crypto.randomUUID();
  const session = await getServerSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  return await prisma.invite.create({
    data: {
      trainerId: userId,
      name: formData.get('username')?.toString() || null,
      token: token,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
      status: 'VAITING',
    },
  });
}

export async function fetchUserData() {
  const session = await getServerSession();
  const userId = session?.user.id;

  if (!userId) {
    return null; // TODO: редирект на /login
  }

  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

// Query All Trainees
export async function getAllTrainees() {    
  return await prisma.user.findMany({
    where: {
      role: 'TRAINEE',
    },
  });
}