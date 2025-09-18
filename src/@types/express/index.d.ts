/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import * as express from "express";

// Types
import type { Types } from "mongoose";

declare global {
	namespace Express {
		interface Request {
			userId?: Types.ObjectId;
			sessionId?: Types.ObjectId;
		}
	}
}

export {};
