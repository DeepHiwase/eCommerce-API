/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
// Models
import CartModel from "@/models/cart.model";

const emptyCartHandler = catchErrors(async (req, res) => {
	const userId = req.userId;
	await CartModel.findOneAndDelete({ userId });
	res.sendStatus(204);
});

export default emptyCartHandler;
