/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import appAssert from "@/utils/appAssert";
// Models
import UserModel from "@/models/user.model";
// Constants
import { CONFLICT } from "@/constants/http";

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
	// create verification code
	// send verification email
	// create session
	// sign access token & refresh token
	// return user & tokens
};

export default createAccount;
