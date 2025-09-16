/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import {
	getAccessTokenCookieOptions,
	getRefreshTokenCookieOptions,
} from "@/utils/cookies";
import appAssert from "@/utils/appAssert";
// Constants
import { OK, UNAUTHORIZED } from "@/constants/http";
import { refreshUserAccessToken } from "@/services/v1/auth/refreshUserAccessToken.service";

const refreshHandler = catchErrors(async (req, res) => {
	const refreshToken = req.cookies.refreshToken as string | undefined;
	appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

	const { accessToken, newRefreshToken } =
		await refreshUserAccessToken(refreshToken);

	if (newRefreshToken) {
		res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
	}

	return res
		.status(OK)
		.cookie("accessToken", accessToken, getAccessTokenCookieOptions())
		.json({ message: "Access token refreshed" });
});

export default refreshHandler;
