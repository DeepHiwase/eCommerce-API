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
import deleteCurrentUserHandler from "@/controllers/v1/user/deleteCurrentUser.controller";
import getAllUsersHandler from "@/controllers/v1/user/getAllUsers.controller";
import getUserByIdHandler from "@/controllers/v1/user/getUserById.controller";
import deleteUserByIdHandler from "@/controllers/v1/user/deleteUserById.controller";

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

router.delete(
	"/current",
	authenticate,
	authorize(["admin", "customer", "retailer"]),
	deleteCurrentUserHandler,
);

// admin permissions
router.get("/", authenticate, authorize(["admin"]), getAllUsersHandler);

router.get("/:userId", authenticate, authorize(["admin"]), getUserByIdHandler);

router.delete(
	"/:userId",
	authenticate,
	authorize(["admin"]),
	deleteUserByIdHandler,
);

export default router;
