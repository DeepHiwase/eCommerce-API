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
import likeProductHandler from "@/controllers/v1/like/likeProduct.controller";
import unlikeProductHandler from "@/controllers/v1/like/unlikeProduct.controller";

const router: Router = Router();

router.post(
	"/product/:productId",
	authenticate,
	authorize(["customer"]),
	likeProductHandler,
);

router.delete(
	"/product/:productId",
	authenticate,
	authorize(["customer"]),
	unlikeProductHandler,
);

export default router;
