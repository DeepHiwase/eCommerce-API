/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import appAssert from "@/utils/appAssert";
import { ONE_DAY_MS, thirtyDaysFromNow } from "@/utils/date";
import {
	RefreshTokenPayload,
	refreshTokenSignOptions,
	signToken,
	verifyToken,
} from "@/lib/jwt";
// Models
import SessionModel from "@/models/session.model";
import UserModel from "@/models/user.model";
// Constants
import { NOT_FOUND, UNAUTHORIZED } from "@/constants/http";

export const refreshUserAccessToken = async (refreshToken: string) => {
	const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
		secret: refreshTokenSignOptions.secret,
	});
	appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

	const session = await SessionModel.findById(payload.sessionId);
	const now = Date.now();
	appAssert(
		session && session.expiresAt.getTime() > now,
		UNAUTHORIZED,
		"Session expired",
	);

	const sessionNeedsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;
	if (sessionNeedsRefresh) {
		session.expiresAt = thirtyDaysFromNow();
		await session.save();
	}

	const userRole = await UserModel.findById(session.userId)
		.select("role")
		.lean()
		.exec();
	appAssert(userRole, NOT_FOUND, "User Role not found");

	const newRefreshToken = sessionNeedsRefresh
		? signToken(
				{ sessionId: session._id },
				userRole.role,
				refreshTokenSignOptions,
			)
		: undefined;

	const accessToken = signToken(
		{
			userId: session.userId,
			sessionId: session._id,
		},
		userRole.role,
	);

	return {
		accessToken,
		newRefreshToken,
	};
};
