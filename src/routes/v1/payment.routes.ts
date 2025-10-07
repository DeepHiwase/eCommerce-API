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
import createPaymentIntentHandler from "@/controllers/v1/payment/createPaymentIntentHandler.controller";

const router: Router = Router();

router.post(
	"/:orderId/create-intent",
	authenticate,
	authorize(["admin", "customer", "retailer"]),
	createPaymentIntentHandler,
);

export default router;
