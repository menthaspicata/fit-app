'use server'


import { auth } from '@/lib/auth';
import { redirect } from "next/navigation";
import { RegisterUser } from '@/lib/validation';
import { headers } from "next/headers";
import { cookies } from "next/headers";

export type State = {
  errors?: {
    email?: string[];
    name?: string[];
    password?: string[]
  };
  message?: string | null;
};

export async function signUpAction(formData: FormData): Promise<State> {
  const validatedFields = RegisterUser.safeParse(Object.fromEntries(formData));
  const requestHeaders = await headers();

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const response = await auth.api.signUpEmail( {
    body: {
        ...validatedFields.data,
    },
    headers: requestHeaders,
  })

  if (!response) {
    throw new Error("Registration failed");
  }

  const signInResponse = await auth.api.signInEmail({
    body: {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    },
    headers: requestHeaders,
    asResponse: true, 
  });

  if (!signInResponse) {
    throw new Error("Auto-login failed");
  }

  const cookieStore = await cookies();
  signInResponse.headers.getSetCookie().forEach((cookie) => {
    const [nameValue, ...attrs] = cookie.split(";");
    const [name, value] = nameValue.split("=");
    cookieStore.set(name.trim(), value.trim());
  });

  redirect("/dashboard");
}