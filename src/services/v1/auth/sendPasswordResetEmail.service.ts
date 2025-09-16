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
import {
	INTERNAL_SERVER_ERROR,
	NOT_FOUND,
	TOO_MANY_REQUESTS,
} from "@/constants/http";
import VerificationCodeTypes from "@/constants/verificationCodeTypes";
import { fiveMinutesAgo, oneHourFromNow } from "@/utils/date";
import config from "@/configs";
import { sendMail } from "@/utils/sendMail";
import { getPasswordResetTemplate } from "@/utils/emailTemplates";

export const sendPasswordResetEmail = async (email: string) => {
	// get the user by email
	const user = await UserModel.findOne({ email });
	appAssert(user, NOT_FOUND, "User not found");

	// check email rate limit
	const fiveMinAgo = fiveMinutesAgo();
	const count = await VerificationCodeModel.countDocuments({
		userId: user._id,
		type: VerificationCodeTypes.PasswordReset,
		createdAt: { $gt: fiveMinAgo },
	});

	appAssert(
		count <= 1,
		TOO_MANY_REQUESTS,
		"Too many requests, please try again later",
	);

	// create verification code
	const expiresAt = oneHourFromNow();
	const verificationCode = await VerificationCodeModel.create({
		userId: user._id,
		type: VerificationCodeTypes.PasswordReset,
		expiresAt,
	});

	// send verification email
	const url = `${config.WHITELIST_ORIGINS}/password/reset?code=${verificationCode._id}&exp=${expiresAt.getTime()}`;
	const { data, error } = await sendMail({
		to: user.email,
		...getPasswordResetTemplate(url),
	});
	appAssert(
		data?.id,
		INTERNAL_SERVER_ERROR,
		`${error?.name} - ${error?.message}`,
	);

	// return success
	return {
		url,
		emailId: data.id,
	};
};
