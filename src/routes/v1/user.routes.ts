/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Router } from "express";
// Middlewares
import authenticate from "@/middlewares/authenticate";
import authorize from "@/middlewares/authorize";
// Controller
import getCurrentUserHandler from "@/controllers/v1/user/getCurrentUser.controller";
import updateCurrentUserHandler from "@/controllers/v1/user/updateCurrentUser.controller";

const router: Router = Router();

router.get(
	"/current",
	authenticate,
	authorize(["customer", "retailer", "admin"]),
	getCurrentUserHandler,
);

router.put(
	"/current",
	authenticate,
	authorize(["admin", "customer", "retailer"]),
	updateCurrentUserHandler,
);

export default router;
