/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import z from "zod";
// Custom Modules
import { logger } from "@/lib/winston";
// Types
import type { ErrorRequestHandler, Response } from "express";
// Constants
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "@/constants/http";

const handleZodError = (res: Response, error: z.ZodError) => {
	const errors = error.issues.map((err) => ({
		path: err.path.join("."),
		message: err.message,
	}));

	return res.status(BAD_REQUEST).json({
		message: error.message,
		errors,
	});
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
	logger.error(`PATH: ${req.path}`, error);

	if (error instanceof z.ZodError) {
		return handleZodError(res, error);
	}

	return res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
};

export default errorHandler;
