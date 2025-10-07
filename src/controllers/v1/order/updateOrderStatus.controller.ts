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
import {
	updateOrderStatusSchema,
	updateOrderStatusUrlParamsSchema,
} from "@/validations/order.schema";
// Constants
import { NOT_FOUND, OK } from "@/constants/http";
import AppErrorCode from "@/constants/appErrorCode";

const updateOrderStatusHandler = catchErrors(async (req, res) => {
	const { orderId } = updateOrderStatusUrlParamsSchema.parse(req.params);
	const { orderStatus } = updateOrderStatusSchema.parse(req.body);

	const order = await OrderModel.findById(orderId);
	appAssert(
		order,
		NOT_FOUND,
		"Order details not found",
		AppErrorCode.NotFoundError,
	);

	order.orderStatus = orderStatus;
	await order.save();

	logger.info("Order Status updated successfully", { order });

	res.status(OK).json({ message: "Order Status updated successfully", order });
});

export default updateOrderStatusHandler;
