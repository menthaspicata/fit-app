import { z } from 'zod'

export const RegisterUser = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string().min(6)
});