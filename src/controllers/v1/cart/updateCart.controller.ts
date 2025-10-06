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
import {
	updateCartSchema,
	updateCartUrlParamsSchema,
} from "@/validations/cart.schema";
// Constants
import { NOT_FOUND, OK } from "@/constants/http";

const updateCartHandler = catchErrors(async (req, res) => {
	const { productId } = updateCartUrlParamsSchema.parse(req.params);
	const { quantity } = updateCartSchema.parse(req.body);
	const userId = req.userId;

	let cart = await CartModel.findOne({ userId });
	appAssert(cart, NOT_FOUND, "Cart not found");

	const item = cart.items.find(
		(i) => JSON.parse(JSON.stringify(i.product)) === productId,
	);
	appAssert(item, NOT_FOUND, "Item not found in cart");

	item.quantity = quantity;
	await cart.save();

	res.status(OK).json(cart);
});

export default updateCartHandler;
