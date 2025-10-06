/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import appAssert from "@/utils/appAssert";
// Models
import ProductModel from "@/models/product.model";
import CartModel from "@/models/cart.model";
// Schemas
import { addToCartUrlParamsSchema } from "@/validations/cart.schema";
// Constants
import { NOT_FOUND, OK } from "@/constants/http";

const addToCartHandler = catchErrors(async (req, res) => {
	const userId = req.userId;
	const { productId } = addToCartUrlParamsSchema.parse(req.params);
	const product = await ProductModel.findById(productId);
	appAssert(product, NOT_FOUND, "Product not found");

	let cart = await CartModel.findOne({ userId });

	if (!cart) cart = await CartModel.create({ userId, items: [] });

	const itemIndex = cart.items.findIndex(
		(i) => JSON.parse(JSON.stringify(i.product)) === productId,
	);

	if (itemIndex > -1) {
		cart.items[itemIndex]!.quantity += 1;
	} else {
		cart.items.push({ product: productId, quantity: 1 });
	}

	await cart.save();
	res.status(OK).json(cart);
});

export default addToCartHandler;
