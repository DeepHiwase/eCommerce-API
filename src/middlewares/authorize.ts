/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import type { NextFunction, Request, Response } from "express";
// Custom Modules
import { logger } from "@/lib/winston";
import appAssert from "@/utils/appAssert";
// Models
import UserModel from "@/models/user.model";
// Constants
import AppErrorCode from "@/constants/appErrorCode";
import { FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND } from "@/constants/http";

export type AuthRole = "retailer" | "customer" | "admin";

const authorize = (roles: AuthRole[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.userId;

		try {
			const user = await UserModel.findById(userId).select("role").exec();
			appAssert(user, NOT_FOUND, "User not found");

			appAssert(
				roles.includes(user.role),
				FORBIDDEN,
				"Access denied, insufficient permissions",
				AppErrorCode.AuthorizationError,
			);

			return next();
		} catch (err) {
			res.status(INTERNAL_SERVER_ERROR).json({
				message: "Internal server error",
			});

			logger.error("Error while authorizing user", err);
		}
	};
};

export default authorize;
