/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import z from "zod";

export const createCategorySchema = z.object({
	name: z.string().min(2),
	description: z.string().min(3).optional(),
});
