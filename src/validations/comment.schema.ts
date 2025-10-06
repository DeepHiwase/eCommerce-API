/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import z from "zod";
// Schemas
import { objectIdSchema } from "@/validations/user.schema";

export const createCommentUrlParamsSchema = z.object({
	productId: objectIdSchema,
});

export const createCommentSchema = z.object({
	content: z.string().trim(),
});

export const getCommentsByProductUrlParamsSchema = z.object({
	productId: objectIdSchema,
});

export const deleteCommentUrlParamsSchema = z.object({
	commentId: objectIdSchema,
});
