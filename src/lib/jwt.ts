/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import jwt, { type SignOptions } from "jsonwebtoken";
// Custom Modules
import config from "@/configs";
// Types
import { UserDocument } from "@/models/user.model";
import { SessionDocument } from "@/models/session.model";

export type RefreshTokenPayload = {
	sessionId: SessionDocument["_id"];
};

export type AccessTokenPayload = {
	userId: UserDocument["_id"];
	sessionId: SessionDocument["_id"];
};

type SignOptionsAndSecret = SignOptions & {
	secret: string;
};

const defaults: SignOptions = {
	audience: ["customer"], // to overide this pass it in options
};

const accessTokenSignOptions: SignOptionsAndSecret = {
	expiresIn: config.ACCESS_TOKEN_EXPIRY,
	secret: config.JWT_ACCESS_SECRET,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
	expiresIn: config.REFRESH_TOKEN_EXPIRY,
	secret: config.JWT_REFRESH_SECRET,
};

type Audience = "retailer" | "customer";

export const signToken = (
	payload: AccessTokenPayload | RefreshTokenPayload,
	audience: Audience,
	options?: SignOptionsAndSecret,
) => {
	const { secret, ...signOpts } = options || accessTokenSignOptions;
	return jwt.sign(payload, secret, {
		...defaults,
		...signOpts,
		audience: [audience],
	});
};
