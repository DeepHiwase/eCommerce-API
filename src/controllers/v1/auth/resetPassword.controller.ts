/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import { logger } from "@/lib/winston";
import { clearAuthCookies } from "@/utils/cookies";
import { resetPassword } from "@/services/v1/auth/resetPassword.service";
// Schemas
import { resetPasswordSchema } from "@/validations/auth.schema";
// Constants
import { OK } from "@/constants/http";

const resetPasswordHandler = catchErrors(async (req, res) => {
	const request = resetPasswordSchema.parse(req.body);

	const { user } = await resetPassword(request);

	clearAuthCookies(res).status(OK).json({
		message: "Password reset successful",
	});

	logger.info("Password reset successful", {
		email: user.email,
	});
	return;
});

export default resetPasswordHandler;
