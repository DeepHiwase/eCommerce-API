/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { NextFunction, type Request, Response } from "express";
// Custom Modules
import { verifyToken } from "@/lib/jwt";
import appAssert from "@/utils/appAssert";
// Types
import { Types } from "mongoose";
// Constants
import AppErrorCode from "@/constants/appErrorCode";
import { UNAUTHORIZED } from "@/constants/http";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
	const accessToken = req.cookies.accessToken as string | undefined;
	appAssert(
		accessToken,
		UNAUTHORIZED,
		"Not authorized",
		AppErrorCode.InvalidAccessToken,
	);

	const { error, payload } = verifyToken(accessToken);
	appAssert(
		payload,
		UNAUTHORIZED,
		error === "jwt expired" ? "Token expired" : "Invalid token",
		AppErrorCode.InvalidAccessToken,
	);

	req.userId = payload.userId as Types.ObjectId;
	req.sessionId = payload.sessionId as Types.ObjectId;

	next();
};

export default authenticate;
