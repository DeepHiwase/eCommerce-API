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
import addToCartHandler from "@/controllers/v1/cart/addtoCart.controller";
import getCartHandler from "@/controllers/v1/cart/getCart.controller";
import updateCartHandler from "@/controllers/v1/cart/updateCart.controller";
import removeFromCartHandler from "@/controllers/v1/cart/removeFromCart.controller";
import emptyCartHandler from "@/controllers/v1/cart/emptyCart.controller";

const router: Router = Router();

router.post(
	"/:productId",
	authenticate,
	authorize(["customer"]),
	addToCartHandler,
);

router.get("/", authenticate, authorize(["customer"]), getCartHandler);

router.put(
	"/:productId",
	authenticate,
	authorize(["customer"]),
	updateCartHandler,
);

router.delete(
	"/:productId",
	authenticate,
	authorize(["customer"]),
	removeFromCartHandler,
);

router.delete("/", authenticate, authorize(["customer"]), emptyCartHandler);

export default router;
