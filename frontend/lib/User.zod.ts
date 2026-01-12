
import { z } from "zod";


export const RegisterSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters")
    .max(20, "Name must be less than 20 characters"),

  email: z.string().min(1, "Email is required").email("Email is invalid"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters"),
});

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters"),
});
export const UserProfileSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  name: z
    .string()
    .min(5, "Name must be at least 5 characters")
    .max(20, "Name must be less than 20 characters"),
});

// Type extraction
export type RegisterFormValues = z.infer<typeof RegisterSchema>;
export type LoginFormValues = z.infer<typeof LoginSchema>;
export type UserProfileFormValues = z.infer<typeof UserProfileSchema>;
