/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
// Models
import OrderModel from "@/models/order.model";
import CartModel from "@/models/cart.model";
// Schemas
import { createOrderSchema } from "@/validations/order.schema";
// Constants
import { BAD_REQUEST, CREATED } from "@/constants/http";

const createOrderHandler = catchErrors(async (req, res) => {
	const userId = req.userId;
	const { shippingAddress, paymentMethod } = createOrderSchema.parse(req.body);

	const cart = await CartModel.findOne({ userId })
		.select("items")
		.populate("items.product", "price")
		.lean()
		.exec();
	if (!cart || cart.items.length === 0) {
		return res.status(BAD_REQUEST).json({ message: "Cart is empty" });
	}

	const totalAmount = cart.items.reduce(
		(sum, item) =>
			sum +
			JSON.parse(JSON.stringify(item))?.quantity *
				JSON.parse(JSON.stringify(item))?.product.price,
		0,
	);

	const itemsArr = cart.items.map((item) => ({
		productId: item.product._id,
		quantity: item.quantity,
		price: JSON.parse(JSON.stringify(item))?.product.price,
	}));

	const order = await OrderModel.create({
		userId,
		items: itemsArr,
		totalAmount,
		shippingAddress,
		paymentMethod,
	});

	await CartModel.findOneAndDelete({ userId });

	res.status(CREATED).json({
		order,
	});
});

export default createOrderHandler;
