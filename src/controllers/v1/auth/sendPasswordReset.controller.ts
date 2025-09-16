/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import { logger } from "@/lib/winston";
// Schemas
import { emailSchema } from "@/validations/auth.schema";
// Constants
import { OK } from "@/constants/http";
import { sendPasswordResetEmail } from "@/services/v1/auth/sendPasswordResetEmail.service";

const sendPasswordResetHandler = catchErrors(async (req, res) => {
	const email = emailSchema.parse(req.body.email);

	const { emailId } = await sendPasswordResetEmail(email);

	res.status(OK).json({
		message: "Password reset email sent",
	});

	logger.info("Password reset email sent", {
		email: emailId,
	});
	return;
});

export default sendPasswordResetHandler;
