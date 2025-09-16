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

export const verifyEmail = async (code: string) => {
	// get the verification code
	const validCode = await VerificationCodeModel.findOne({
		_id: code,
		type: VerificationCodeTypes.EmailVerification,
		expiresAt: { $gt: new Date() },
	});
	appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");

	// update user id verified true
	const updatedUser = await UserModel.findByIdAndUpdate(
		validCode.userId,
		{
			verified: true,
		},
		{ new: true },
	);
	appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to verify email");

	// delete verification code
	await validCode.deleteOne();

	// return user
	return {
		user: updatedUser.omitPassword(),
	};
};
