import { z } from "zod"

export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, { message: "Email or username is required" })
    .trim(),
  password: z.string().min(1, { message: "Password is required" }),
})

export type LoginInput = z.infer<typeof loginSchema>
