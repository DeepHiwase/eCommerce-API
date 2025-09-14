/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import { logger } from "@/lib/winston";
// Types
import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
	logger.error(`PATH: ${req.path}`, error);

	return res.status(500).send("Internal Server Error");
};

export default errorHandler;
