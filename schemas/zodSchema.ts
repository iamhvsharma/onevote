import { z } from "zod";

export const sessionClaimsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export const pollSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  options: z.array(z.string().min(1)).min(2).max(4),
  expiresAt: z.string(), // You’ll convert this to Date
  duration: z.number().int().min(1).max(24),
});

export type SessionClaims = z.infer<typeof sessionClaimsSchema>;
export type Poll = z.infer<typeof pollSchema>;
