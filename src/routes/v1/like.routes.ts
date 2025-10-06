/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Router } from "express";
// Middlewares
import authenticate from "@/middlewares/authenticate";
import authorize from "@/middlewares/authorize";
import likeProductHandler from "@/controllers/v1/like/likeProduct.controller";
// Controller

const router: Router = Router();

router.post(
	"/product/:productId",
	authenticate,
	authorize(["customer"]),
	likeProductHandler,
);

export default router;
