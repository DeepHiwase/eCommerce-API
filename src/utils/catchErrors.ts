/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Types
import type { NextFunction, Request, Response } from "express";

type AsyncController = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<any>;

const catchErrors =
	(controller: AsyncController): AsyncController =>
	async (req, res, next) => {
		try {
			await controller(req, res, next);
		} catch (err) {
			next(err);
		}
	};

export default catchErrors;
