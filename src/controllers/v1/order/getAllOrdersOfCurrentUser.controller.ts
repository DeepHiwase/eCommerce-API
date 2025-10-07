/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
// Models
import OrderModel from "@/models/order.model";
// Constants
import { OK } from "@/constants/http";

const getAllOrdersOfCurrentUserHandler = catchErrors(async (req, res) => {
	const userId = req.userId;

	const orders = await OrderModel.find({ userId })
		.select("-__v")
		.sort({ createdAt: -1 })
		.lean()
		.exec();

	res.status(OK).json({ orders: orders || [] });
});

export default getAllOrdersOfCurrentUserHandler;
