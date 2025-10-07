/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import appAssert from "@/utils/appAssert";
// Models
import OrderModel from "@/models/order.model";
// Schemas
import { getOrderDetailsUrlParamsSchema } from "@/validations/order.schema";
// Constants
import { NOT_FOUND, OK } from "@/constants/http";
import AppErrorCode from "@/constants/appErrorCode";

const getOrderDetailsHandler = catchErrors(async (req, res) => {
	const { orderId } = getOrderDetailsUrlParamsSchema.parse(req.params);

	const order = await OrderModel.findById(orderId);
	appAssert(
		order,
		NOT_FOUND,
		"Order details not found",
		AppErrorCode.NotFoundError,
	);

	res.status(OK).json({ order });
});

export default getOrderDetailsHandler;
