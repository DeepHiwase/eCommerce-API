/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import z from "zod";
// Schemas
import { objectIdSchema } from "@/validations/user.schema";

export const imageSchema = z.object({
	publicId: z.string(),
	url: z.url(),
	height: z.number().min(0),
	width: z.number().min(0),
});

export const ratingSchema = z.object({
	average: z.number().min(0),
	count: z.number().min(0),
});

export const createProductSchema = z.object({
	name: z.string().min(2),
	description: z.string().min(3),
	price: z.preprocess((val) => Number(val), z.number().min(0)),
	discountedPrice: z.preprocess(
		(val) => Number(val),
		z.number().min(0).optional(),
	),
	images: z.array(imageSchema),
	isFeatured: z.boolean().optional().default(false),
	ratings: z.array(ratingSchema).optional(),
	brand: z.string().min(2).max(255).optional(),
	stock: z.preprocess((val) => Number(val), z.number().min(0)),
	categoryId: objectIdSchema,
});
