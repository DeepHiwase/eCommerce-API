/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import appAssert from "@/utils/appAssert";
// Models
import CartModel from "@/models/cart.model";
// Constants
import { NOT_FOUND, OK } from "@/constants/http";
import AppErrorCode from "@/constants/appErrorCode";

const getCartHandler = catchErrors(async (req, res) => {
	const userId = req.userId;
	const cart = await CartModel.findOne({ userId }).populate(
		"items.product",
		"name price images",
	);
	appAssert(cart, NOT_FOUND, "Cart not found", AppErrorCode.NotFoundError);

	res.status(OK).json({
		cart: cart || [],
	});
});

export default getCartHandler;
