/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import z from "zod";

export const emailSchema = z.email().min(5).max(255);

export const passwordSchema = z.string().min(6).max(255);

export const loginSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
	userAgent: z.string().optional(),
});

export const registerSchema = loginSchema.extend({
	role: z.enum(["retailer", "customer"]),
});

export const verificationCodeSchema = z.string().min(1).max(24); // based on mongo ID

export const resetPasswordSchema = z.object({
	password: passwordSchema,
	verificationCode: verificationCodeSchema,
});
