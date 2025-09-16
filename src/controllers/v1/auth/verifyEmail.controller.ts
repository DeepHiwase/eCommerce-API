/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import { logger } from "@/lib/winston";
import { verifyEmail } from "@/services/v1/auth/verifyEmail.service";
// Schemas
import { verificationCodeSchema } from "@/validations/auth.schema";
// Constants
import { OK } from "@/constants/http";

const verifyEmailHandler = catchErrors(async (req, res) => {
	const verificationCode = verificationCodeSchema.parse(req.params.code);

	const { user } = await verifyEmail(verificationCode);

	res.status(OK).json({
		message: "Email was successfully verified",
	});

	logger.info("Email was successfully verified", {
		email: user.email,
	});
	return;
});

export default verifyEmailHandler;
