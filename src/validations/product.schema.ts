/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import z from "zod";
// Custom Modules
import config from "@/configs";
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

export const getAllProductsQueryParamsSchema = z.object({
	limit: z.preprocess(
		(val) => Number(val),
		z.number().min(1).max(50).optional().default(config.defaultResLimit),
	),
	offset: z.preprocess(
		(val) => Number(val),
		z.number().min(0).optional().default(config.defaultResOffset),
	),
});

export const getProductsByRetailerUrlParamsSchema = z.object({
	retailerId: objectIdSchema,
});

export const getProductBySlugUrlParamsSchema = z.object({
	slug: z.string().min(1, { message: "Slug is required" }),
});

export const updateProductUrlParamsSchema = z.object({
	productId: objectIdSchema,
});

export const updateProductSchema = z.object({
	name: z.string().min(2).optional(),
	description: z.string().min(3).optional(),
	price: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
	discountedPrice: z
		.preprocess((val) => Number(val), z.number().min(0).optional())
		.optional(),
	images: z.array(imageSchema).optional(),
	isFeatured: z.boolean().optional().default(false).optional(),
	ratings: z.array(ratingSchema).optional(),
	brand: z.string().min(2).max(255).optional(),
	stock: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
	categoryId: objectIdSchema.optional(),
});

export const deleteProductUrlParamsSchema = z.object({
	productId: objectIdSchema,
});
