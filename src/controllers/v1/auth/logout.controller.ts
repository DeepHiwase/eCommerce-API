/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import { logger } from "@/lib/winston";
import { clearAuthCookies } from "@/utils/cookies";
import { verifyToken } from "@/lib/jwt";
// Models
import SessionModel from "@/models/session.model";
// Constants
import { OK } from "@/constants/http";

const logoutHandler = catchErrors(async (req, res) => {
	const accessToken = req.cookies.accessToken as string | undefined;
	const { payload } = verifyToken(accessToken || "");

	if (payload) {
		await SessionModel.findByIdAndDelete(payload.sessionId);
	}

	clearAuthCookies(res).status(OK).json({
		message: "Logout successful",
	});

	logger.info("User logged-out successfully");
	return;
});

export default logoutHandler;
