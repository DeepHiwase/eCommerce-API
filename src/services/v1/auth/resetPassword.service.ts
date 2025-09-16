/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import appAssert from "@/utils/appAssert";
// Models
import UserModel from "@/models/user.model";
import VerificationCodeModel from "@/models/verificationCode.model";
// Constants
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "@/constants/http";
import VerificationCodeTypes from "@/constants/verificationCodeTypes";
import { hashValue } from "@/lib/bcrypt";
import SessionModel from "@/models/session.model";

type ResetPasswordParams = {
	password: string;
	verificationCode: string;
};

export const resetPassword = async ({
	password,
	verificationCode,
}: ResetPasswordParams) => {
	// get the verification code
	const validCode = await VerificationCodeModel.findOne({
		_id: verificationCode,
		type: VerificationCodeTypes.PasswordReset,
		expiresAt: { $gt: new Date() }, // meaning code is not expired if its greater than current
	});
	appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");

	// update users password
	const updatedUser = await UserModel.findByIdAndUpdate(
		validCode.userId,
		{
			password: await hashValue(password),
		},
		{ new: true },
	);
	appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to reset password");

	// delete verification code
	await validCode.deleteOne();

	// delete all sessions of user
	await SessionModel.deleteMany({
		userId: updatedUser._id,
	});

	return {
		user: updatedUser.omitPassword(),
	};
};
