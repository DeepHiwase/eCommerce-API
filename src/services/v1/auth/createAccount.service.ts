/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

type CreateAccountParams = {
	email: string;
	password: string;
	role: "retailer" | "customer";
	userAgent?: string;
};

const createAccount = async (data: CreateAccountParams) => {
	// verify existing user doesn't exists
	// create user
	// create verification code
	// send verification email
	// create session
	// sign access token & refresh token
	// return user & tokens
};

export default createAccount;
