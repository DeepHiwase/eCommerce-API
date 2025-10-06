/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import appAssert from "@/utils/appAssert";
// Models
import CartModel from "@/models/cart.model";
// Schemas
import { removeFromCartUrlParamsSchema } from "@/validations/cart.schema";
// Constants
import { NOT_FOUND, OK } from "@/constants/http";

const removeFromCartHandler = catchErrors(async (req, res) => {
	const { productId } = removeFromCartUrlParamsSchema.parse(req.params);
	const userId = req.userId;

	let cart = await CartModel.findOne({ userId });
	appAssert(cart, NOT_FOUND, "Cart not found");

	cart.items = cart.items.filter(
		(i) => JSON.parse(JSON.stringify(i.product)) !== productId,
	);

	await cart.save();

	res.status(OK).json(cart);
});

export default removeFromCartHandler;
