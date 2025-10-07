/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import z from "zod";
import multer from "multer";
import Stripe from "stripe";
// Custom Modules
import stripe from "@/lib/stripe";
import { logger } from "@/lib/winston";
import AppError from "@/utils/AppError";
import { clearAuthCookies, REFRESH_PATH } from "@/utils/cookies";
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

const handleAppError = (res: Response, error: AppError) => {
	return res.status(error.statusCode).json({
		message: error.message,
		errorCode: error.errorCode,
	});
};

const handleMulterError = (res: Response, error: multer.MulterError) => {
	return res.status(BAD_REQUEST).json({
		message: error.message,
		code: error.code,
	});
};

const handleStripeError = (res: Response, error: Stripe.errors.StripeError) => {
	console.log(error);
	return res.status(INTERNAL_SERVER_ERROR).json({
		message: error.message,
		code: error.code,
	});
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
	logger.error(`PATH: ${req.path}`, error);

	if (req.path === REFRESH_PATH) {
		clearAuthCookies(res);
	}

	if (error instanceof z.ZodError) {
		return handleZodError(res, error);
	}

	if (error instanceof AppError) {
		return handleAppError(res, error);
	}

	if (error instanceof multer.MulterError) {
		return handleMulterError(res, error);
	}

	if (error instanceof stripe.errors.StripeError) {
		return handleStripeError(res, error);
	}

	return res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
};

export default errorHandler;
