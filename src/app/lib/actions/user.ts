'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/app/lib/prisma'


const FormSchema = z.object({
  //id: z.string(),
  email: z.string(),
  username: z.string(),
  password_hash: z.string(),
  // date: z.string(),
  // trainerId: z.number(),
  // role: z.enum(['TRAINEE', 'TRAINER']).default('TRAINEE'),
});

const CreateTrainee = FormSchema;

export type State = {
  errors?: {
    //traineeId?: string[];
    email?: string[];
    username?: string[];
    password_hash?: string[];
    // trainerId?: string[];
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
    username: formData.get('username'),
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