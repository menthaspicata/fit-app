// lib/getSession.ts
import { headers } from "next/headers"
import { auth } from "@/app/lib/auth"

export async function getServerSession() {
  return auth.api.getSession({
    headers: await headers(),
  })
}
