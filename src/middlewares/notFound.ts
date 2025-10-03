/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import type { Request, Response, NextFunction } from "express";
// Custom Modules
import appAssert from "@/utils/appAssert";
// Constants
import { NOT_FOUND } from "@/constants/http";
import AppErrorCode from "@/constants/appErrorCode";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
	appAssert(
		null,
		NOT_FOUND,
		`Invalid Url: ${req.originalUrl} or Invalid request method: ${req.method}`,
		AppErrorCode.NotFoundError,
	);
	next();
};

export default notFoundHandler;
