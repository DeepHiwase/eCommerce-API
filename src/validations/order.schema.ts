/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import z from "zod";
// Schemas
import { objectIdSchema } from "@/validations/user.schema";

export const createOrderSchema = z.object({
	shippingAddress: z.object({
		fullName: z.string().min(1).max(255),
		country: z.string(),
		address: z.string().min(10).max(300),
		city: z.string().min(2).max(255),
		postalCode: z.string().length(6),
	}),
	paymentMethod: z.enum(["COD", "Stripe", "RazorPay"]),
});

export const markPaidOrderUrlParamsSchema = z.object({
	orderId: objectIdSchema,
});

export const getOrderDetailsUrlParamsSchema = z.object({
	orderId: objectIdSchema,
});

export const updateOrderStatusUrlParamsSchema = z.object({
	orderId: objectIdSchema,
});

export const updateOrderStatusSchema = z.object({
	orderStatus: z.enum(["processing", "shipped", "delivered", "cancelled"]),
});
