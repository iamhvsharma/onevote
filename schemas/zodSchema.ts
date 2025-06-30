import { z } from "zod"

export const sessionClaimsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
})

export type SessionClaims = z.infer<typeof sessionClaimsSchema>
