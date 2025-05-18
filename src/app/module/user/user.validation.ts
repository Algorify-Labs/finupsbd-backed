import { z } from 'zod';

export const emailSchema = z
  .string()
  .email('Invalid email format')
  .min(1, 'Email is required');

export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters long');

export const phoneSchema = z.string().min(1, 'Phone is required').regex(/^\d{11}$/, 'Phone number must be 11 digits');




const createUserValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
  profile: z.object({}).optional(),
});

const verifyPinValidationSchema = z.object({
  email: emailSchema,
  // phone: phoneSchema,
  pin: z.string().min(6, 'Password must be at least 6 characters long'),
});

const loginValidationSchema = z.object({
  email: emailSchema,
  // phone: phoneSchema,
  password: passwordSchema,
});

const forgetPasswordValidationSchema = z.object({
  email: emailSchema,
  // phone: phoneSchema,
});

const resetPasswordValidationSchema = z.object({
  email: emailSchema,
  newPassword: passwordSchema
  // phone: phoneSchema,
});

const changePasswordValidationSchema = z.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema
  // phone: phoneSchema,
});

// password = z
//   .string()
//   .min(8, 'Password must be at least 8 characters long') // Minimum length
//   .max(20, 'Password must not exceed 20 characters') // Maximum length
//   .regex(/[A-Z]/, 'Password must contain at least one uppercase letter') // At least one uppercase letter
//   .regex(/[a-z]/, 'Password must contain at least one lowercase letter') // At least one lowercase letter
//   .regex(/[0-9]/, 'Password must contain at least one number') // At least one number
//   .regex(/[@$!%*?&]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &)') // At least one special character
//   .refine((value) => !/\s/.test(value), {
//     message: 'Password must not contain spaces', // No spaces allowed
//   });

export const UserValidation = {
  createUserValidationSchema,
  verifyPinValidationSchema,
  loginValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
  changePasswordValidationSchema
};
