/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import loginUser from "@/services/v1/auth/loginUser.service";
import { logger } from "@/lib/winston";
import { setAuthCookies } from "@/utils/cookies";
// Schemas
import { loginSchema } from "@/validations/auth.schema";
// Constants
import { OK } from "@/constants/http";

const loginHandler = catchErrors(async (req, res) => {
	// validate request
	const request = loginSchema.parse({
		...req.body,
		userAgent: req.headers["user-agent"],
	});
	// call service
	const { user, accessToken, refreshToken } = await loginUser(request);

	logger.info("User logged-in successfully", {
		email: user.email,
		role: user.role,
	});

	// return response & before it create cookies
	return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
		message: "Login Successful",
	});
});

export default loginHandler;
