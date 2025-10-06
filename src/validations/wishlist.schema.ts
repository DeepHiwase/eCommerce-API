/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import z from "zod";
// Schemas
import { objectIdSchema } from "@/validations/user.schema";

export const addProductToWishlistUrlParamsSchema = z.object({
	productId: objectIdSchema,
});

export const deleteProductFromWishlistUrlParamsSchema = z.object({
	productId: objectIdSchema,
});
