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
import markPaidOrderHandler from "@/controllers/v1/order/markPaidOrder.controller";
import getAllOrdersOfCurrentUserHandler from "@/controllers/v1/order/getAllOrdersOfCurrentUser.controller";
import getOrderDetailsHandler from "@/controllers/v1/order/getOrderDetails.controller";
import updateOrderStatusHandler from "@/controllers/v1/order/updateOrderStatus.controller";
import createOrderHandler from "@/controllers/v1/order/createOrder.controller";

const router: Router = Router();

router.post("/", authenticate, authorize(["customer"]), createOrderHandler);

router.get(
	"/my",
	authenticate,
	authorize(["customer"]),
	getAllOrdersOfCurrentUserHandler,
);

router.get(
	"/:orderId",
	authenticate,
	authorize(["customer"]),
	getOrderDetailsHandler,
);

router.patch(
	"/:orderId/pay",
	authenticate,
	authorize(["customer"]),
	markPaidOrderHandler,
);

router.put(
	"/:orderId",
	authenticate,
	authorize(["admin", "retailer"]),
	updateOrderStatusHandler,
);

export default router;
