/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Router } from "express";
// Routes
import authRoutes from "@/routes/v1/auth.routes";
import userRoutes from "@/routes/v1/user.routes";
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

router.use("/auth", authRoutes);
// protected routes
router.use("/user", userRoutes);

export default router;
