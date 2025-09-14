/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
// Schemas
import { registerSchema } from "@/validations/auth.schema";

const registerHandler = catchErrors(async (req, res) => {
	// validate request
	const request = registerSchema.parse({
		...req.body,
		userAgent: req.headers["user-agent"],
	});
	// call service
	// return response
});

export default registerHandler;
