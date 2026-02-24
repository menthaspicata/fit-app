'use server'

import { auth } from '@/lib/auth';
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { cookies } from "next/headers";
import { z } from 'zod';

export type State = {
  errors?: {
    email?: string[];
    name?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

const RegisterUser = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export async function signUpAction(formData: FormData): Promise<State> {
  const validatedFields = RegisterUser.safeParse(Object.fromEntries(formData));
  const requestHeaders = await headers();

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please fix the errors below.',
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        role: 'trainer', // ensure your Better Auth config maps this additional field to the User model
      },
      headers: requestHeaders,
    });

    if (!response) {
      return { message: 'Registration failed. Please try again.' };
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Registration failed. The email may already be in use.';
    return { message };
  }

  try {
    const signInResponse = await auth.api.signInEmail({
      body: { email, password },
      headers: requestHeaders,
      asResponse: true,
    });

    if (!signInResponse) {
      return { message: 'Account created but auto-login failed. Please sign in manually.' };
    }

    const cookieStore = await cookies();
    signInResponse.headers.getSetCookie().forEach((cookie) => {
      const [nameValue] = cookie.split(';');
      const [cookieName, cookieValue] = nameValue.split('=');
      cookieStore.set(cookieName.trim(), cookieValue?.trim() ?? '');
    });
  } catch {
    return { message: 'Account created but auto-login failed. Please sign in manually.' };
  }

  redirect('/dashboard');
}