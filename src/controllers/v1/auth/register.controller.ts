/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import createAccount from "@/services/v1/auth/createAccount.service";
import { logger } from "@/lib/winston";
// Schemas
import { registerSchema } from "@/validations/auth.schema";
// Constants
import { CREATED } from "@/constants/http";

const registerHandler = catchErrors(async (req, res) => {
	// validate request
	const request = registerSchema.parse({
		...req.body,
		userAgent: req.headers["user-agent"],
	});
	// call service
	const { newUser, accessToken, refreshToken } = await createAccount(request);

	logger.info("User registered successfully", {
		username: newUser.email,
		role: newUser.role,
	});

	// return response
	return res.status(CREATED).json(newUser);
});

export default registerHandler;
