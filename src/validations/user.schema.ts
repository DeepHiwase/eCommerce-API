/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import z from "zod";
import { emailSchema, passwordSchema } from "@/validations/auth.schema";
import UserModel from "@/models/user.model";

async function emailExistsInDatabase(email: string): Promise<boolean> {
	const user = await UserModel.exists({ email });
	return !!user;
}

export const updateCurrentUserSchema = z.object({
	email: emailSchema.refine(
		async (email) => !(await emailExistsInDatabase(email)),
		"This email is already registered.",
	),
	password: passwordSchema,
});
