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
import addProductToWishlistHandler from "@/controllers/v1/wishlist/addProductToWishlist.controller";
import getAllWishlistProductsHandler from "@/controllers/v1/wishlist/getAllWishlistProducts.controller";
import deleteProductFromWishlistHandler from "@/controllers/v1/wishlist/deleteProductFromWishlist.controller";

const router: Router = Router();

router.post(
	"/:productId",
	authenticate,
	authorize(["customer"]),
	addProductToWishlistHandler,
);

router.get(
	"/",
	authenticate,
	authorize(["customer"]),
	getAllWishlistProductsHandler,
);

router.delete(
	"/:productId",
	authenticate,
	authorize(["customer"]),
	deleteProductFromWishlistHandler,
);

export default router;
