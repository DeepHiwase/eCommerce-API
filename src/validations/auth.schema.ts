/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import z from "zod";

export const registerSchema = z.object({
	email: z.email().min(5).max(255),
	password: z.string().min(6).max(255),
	role: z.enum(["retailer", "customer"]),
	userAgent: z.string().optional(),
});
