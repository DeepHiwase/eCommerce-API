/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import appAssert from "@/utils/appAssert";
import { oneYearFromNow } from "@/utils/date";
// Models
import UserModel from "@/models/user.model";
import VerificationCodeModel from "@/models/verificationCode.model";
import SessionModel from "@/models/session.model";
// Constants
import { CONFLICT } from "@/constants/http";
import VerificationCodeTypes from "@/constants/verificationCodeTypes";

type CreateAccountParams = {
	email: string;
	password: string;
	role: "retailer" | "customer";
	userAgent?: string;
};

const createAccount = async (data: CreateAccountParams) => {
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
	// create session
	const session = await SessionModel.create({
		userId: newUser._id,
		userAgent: data.userAgent,
	});

	// sign access token & refresh token
	// return user & tokens
};

export default createAccount;
