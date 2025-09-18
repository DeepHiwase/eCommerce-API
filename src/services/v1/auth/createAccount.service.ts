/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import appAssert from "@/utils/appAssert";
import { oneYearFromNow } from "@/utils/date";
import { refreshTokenSignOptions, signToken } from "@/lib/jwt";
import { sendMail } from "@/utils/sendMail";
import { getVerifyEmailTemplate } from "@/utils/emailTemplates";
import config from "@/configs";
// Models
import UserModel from "@/models/user.model";
import VerificationCodeModel from "@/models/verificationCode.model";
import SessionModel from "@/models/session.model";
// Constants
import { CONFLICT, FORBIDDEN } from "@/constants/http";
import VerificationCodeTypes from "@/constants/verificationCodeTypes";
import AppErrorCode from "@/constants/appErrorCode";
import { logger } from "@/lib/winston";

type CreateAccountParams = {
	email: string;
	password: string;
	role: "retailer" | "customer" | "admin";
	userAgent?: string;
};

const createAccount = async (data: CreateAccountParams) => {
	// handle user is registering with admin role without admin email
	if (
		data.role === "admin" &&
		!config.WHITELIST_ADMIN_MAIL.includes(data.email)
	) {
		logger.warn(
			`User with email ${data.email} tried to register as an admin but is not in whitelist`,
		);
		appAssert(
			null,
			FORBIDDEN,
			"You can not register as an admin",
			AppErrorCode.AuthorizationError,
		);
	}

	// verify existing user doesn't exists
	const existingUser = await UserModel.exists({
		email: data.email,
	});
	appAssert(!existingUser, CONFLICT, "Email already in use");

	// create user
	const newUser = await UserModel.create({
		email: data.email,
		password: data.password,
		role: data.role,
	});

	// create verification code
	const verificationCode = await VerificationCodeModel.create({
		userId: newUser._id,
		type: VerificationCodeTypes.EmailVerification,
		expiresAt: oneYearFromNow(),
	});

	// send verification email
	const url = `${config.WHITELIST_ORIGINS}/email/verify/${verificationCode._id}`;
	const { error } = await sendMail({
		to: newUser.email,
		...getVerifyEmailTemplate(url),
	});
	if (error) {
		console.log(error);
	}

	// create session
	const session = await SessionModel.create({
		userId: newUser._id,
		userAgent: data.userAgent,
	});

	// sign access token & refresh token
	const refreshToken = signToken(
		{
			sessionId: session._id,
		},
		newUser.role,
		refreshTokenSignOptions,
	);

	const accessToken = signToken(
		{
			userId: newUser._id,
			sessionId: session._id,
		},
		newUser.role,
	);

	// return user & tokens
	return {
		newUser: newUser.omitPassword(),
		accessToken,
		refreshToken,
	};
};

export default createAccount;
