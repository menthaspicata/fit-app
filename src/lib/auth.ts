import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'
import { prisma } from '@/lib/prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: { 
    enabled: true, 
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    "https://fit-app-git-dev-kseniia-pekurs-projects.vercel.app/",
    "http://localhost:3000",
  ],
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'trainer',
      },
    },
  },
  plugins: [nextCookies()],
})