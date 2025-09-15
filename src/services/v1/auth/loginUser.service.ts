/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import appAssert from "@/utils/appAssert";
import { refreshTokenSignOptions, signToken } from "@/lib/jwt";
// Models
import UserModel from "@/models/user.model";
import SessionModel from "@/models/session.model";
// Constants
import { UNAUTHORIZED } from "@/constants/http";

type LoginUserParams = {
	email: string;
	password: string;
	userAgent?: string;
};

const loginUser = async ({ email, password, userAgent }: LoginUserParams) => {
	// get the user by email
	const user = await UserModel.findOne({ email })
		.select("email password role")
		.exec();
	appAssert(user, UNAUTHORIZED, "Invalid email or password");

	// validate password from the request
	const isValid = await user.comparePassword(password);
	appAssert(isValid, UNAUTHORIZED, "Invalid email or password");

	const userId = user._id;

	// create session
	const session = await SessionModel.create({
		userId,
		userAgent,
	});

	const sessionInfo = {
		sessionId: session._id,
	};

	// sign access token & refresh token
	const refreshToken = signToken(
		sessionInfo,
		user.role,
		refreshTokenSignOptions,
	);

	const accessToken = signToken(
		{
			...sessionInfo,
			userId,
		},
		user.role,
	);

	// return user & tokens
	return {
		user: user.omitPassword(),
		accessToken,
		refreshToken,
	};
};

export default loginUser;
