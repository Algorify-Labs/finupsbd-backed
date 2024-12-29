import { z } from 'zod';

const createUserValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .regex(/^\d{11}$/, 'Phone number must be 11 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});



export const UserValidation = {
    createUserValidationSchema
}