/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import stripe from "@/lib/stripe";
import catchErrors from "@/utils/catchErrors";
import appAssert from "@/utils/appAssert";
// Models
import OrderModel from "@/models/order.model";
// Schemas
import { createPaymentIntentUrlParamsSchema } from "@/validations/payment.schema";
// Constants
import { BAD_REQUEST, NOT_FOUND, OK } from "@/constants/http";

const createPaymentIntentHandler = catchErrors(async (req, res) => {
	const { orderId } = createPaymentIntentUrlParamsSchema.parse(req.params);

	const order = await OrderModel.findById(orderId).select("-__v").exec();
	appAssert(order, NOT_FOUND, "Order not found");

	if (order.paymentStatus === "paid") {
		return res.status(BAD_REQUEST).json({ message: "Order already paid" });
	}

	const paymentIntent = await stripe.paymentIntents.create({
		amount: Math.round(+order.totalAmount * 100),
		currency: "inr",
		metadata: {
			orderId: String(order._id),
			userId: String(order.userId),
		},
		automatic_payment_methods: { enabled: true },
	});

	order.paymentStatus = "paid";
	order.orderStatus = "processing";
	await order.save();

	res.status(OK).json({
		clientSecret: paymentIntent.client_secret,
		order,
	});
});

export default createPaymentIntentHandler;
