/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import z from "zod";
// Schemas
import { objectIdSchema } from "@/validations/user.schema";

export const addToCartUrlParamsSchema = z.object({
	productId: objectIdSchema,
});

export const updateCartUrlParamsSchema = z.object({
	productId: objectIdSchema,
});

export const updateCartSchema = z.object({
	quantity: z.number().min(1),
});

export const removeFromCartUrlParamsSchema = z.object({
	productId: objectIdSchema,
});
