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
import createCommentHandler from "@/controllers/v1/comment/createComment.controller";
import deleteCommentHandler from "@/controllers/v1/comment/deleteComment.controller";
import getCommentsByProductHandler from "@/controllers/v1/comment/getCommentsByProduct.controller";

const router: Router = Router();

router.post(
	"/product/:productId",
	authenticate,
	authorize(["customer", "admin", "retailer"]),
	createCommentHandler,
);

router.get(
	"/product/:productId",
	authenticate,
	authorize(["customer", "admin", "retailer"]),
	getCommentsByProductHandler,
);

router.delete(
	"/:commentId",
	authenticate,
	authorize(["customer", "admin", "retailer"]),
	deleteCommentHandler,
);

export default router;
