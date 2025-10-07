/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import { logger } from "@/lib/winston";
import appAssert from "@/utils/appAssert";
// Models
import OrderModel from "@/models/order.model";
// Schemas
import { markPaidOrderUrlParamsSchema } from "@/validations/order.schema";
// Constants
import { NOT_FOUND, OK } from "@/constants/http";
import AppErrorCode from "@/constants/appErrorCode";

const markPaidOrderHandler = catchErrors(async (req, res) => {
	const { orderId } = markPaidOrderUrlParamsSchema.parse(req.params);

	const order = await OrderModel.findById(orderId);
	appAssert(
		order,
		NOT_FOUND,
		"Order details not found",
		AppErrorCode.NotFoundError,
	);

	order.paymentStatus = "paid";
	await order.save();

	logger.info("Payment marked as paid", { order });

	res.status(OK).json({ message: "Payment marked as paid", order });
});

export default markPaidOrderHandler;
