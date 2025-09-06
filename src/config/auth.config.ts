import {email, z} from 'zod'

export const signupSchema = z.object({
    email: z.email(),
    name: z.string().min(3),
    password: z.string().min(6)
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})