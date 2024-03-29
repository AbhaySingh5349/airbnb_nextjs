import * as z from 'zod';

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(2, 'UserName must be at least 2 characters')
    .max(50, 'UserName exceeds limit of 50 characters'),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('This is not a valid email.'),
  password: z
    .string()
    .min(4, { message: 'Password should have min 4 characters' })
    .max(20, { message: 'Password should have max 20 characters' }),
});
