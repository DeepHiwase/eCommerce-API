/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import createAccount from "@/services/v1/auth/createAccount.service";
// Schemas
import { registerSchema } from "@/validations/auth.schema";

const registerHandler = catchErrors(async (req, res) => {
	// validate request
	const request = registerSchema.parse({
		...req.body,
		userAgent: req.headers["user-agent"],
	});
	// call service
	const {} = await createAccount(request);
	// return response
});

export default registerHandler;
