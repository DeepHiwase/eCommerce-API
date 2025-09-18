/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import z from "zod";
// Custom Modules
import config from "@/configs";
// Models
import UserModel from "@/models/user.model";
// Schemas
import { emailSchema, passwordSchema } from "@/validations/auth.schema";
// Types
import { Types } from "mongoose";

async function emailExistsInDatabase(email: string): Promise<boolean> {
	const user = await UserModel.exists({ email });
	return !!user;
}

export const updateCurrentUserSchema = z.object({
	email: emailSchema
		.refine(
			async (email) => !(await emailExistsInDatabase(email)),
			"This email is already registered.",
		)
		.optional(),
	password: passwordSchema.optional(),
});

export const getAllUsersQueryParamsSchema = z.object({
	limit: z.preprocess(
		(val) => Number(val),
		z.number().min(1).max(50).optional().default(config.defaultResLimit),
	),
	offset: z.preprocess(
		(val) => Number(val),
		z.number().min(0).optional().default(config.defaultResOffset),
	),
});

export const objectIdSchema = z.custom<Types.ObjectId>(
	(val) => {
		if (val instanceof Types.ObjectId) {
			return true;
		}

		if (typeof val === "string") {
			return Types.ObjectId.isValid(val);
		}
		return false;
	},
	{
		error: "Invalid MongoDB ObjectId",
	},
);

export const getUserByIdUrlParamsSchema = z.object({
	userId: objectIdSchema,
});

export const deleteUserByIdUrlParamsSchema = z.object({
	userId: objectIdSchema,
});
