/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Router } from "express";
// Constants
import { OK } from "@/constants/http";

const router: Router = Router();

router.get("/", (req, res) => {
	res.status(OK).json({
		message: "API is live",
		version: "1.0.0",
		docs: "https://docs.e-commerce-api.deephiwase.com",
		timestamp: new Date().toISOString(),
	});
});

export default router;
