/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { type Response, type CookieOptions } from "express";
// Custom Modules
import config from "@/configs";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "@/utils/date";

export const REFRESH_PATH = "/api/v1/auth/refresh";

const defaults: CookieOptions = {
	httpOnly: true,
	sameSite: "strict",
	secure: config.NODE_ENV !== "development",
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
	...defaults,
	expires: fifteenMinutesFromNow(),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
	...defaults,
	expires: thirtyDaysFromNow(),
	path: REFRESH_PATH,
});

type SetAuthCookiesParams = {
	res: Response;
	accessToken: string;
	refreshToken: string;
};

/**
 * @description to set auth cookies to the response object
 * @returns response object with auth cookies attached
 */
export const setAuthCookies = ({
	res,
	accessToken,
	refreshToken,
}: SetAuthCookiesParams) =>
	res
		.cookie("accessToken", accessToken, getAccessTokenCookieOptions())
		.cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
