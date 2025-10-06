/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
// Models
import WishlistModel from "@/models/wishlist.model";
// Constants
import { OK } from "@/constants/http";

const getAllWishlistProductsHandler = catchErrors(async (req, res) => {
	const userId = req.userId;

	const wishlist = await WishlistModel.findOne({ userId })
		.select("products")
		.populate("products")
		.lean()
		.exec();

	return res.status(OK).json({
		products: wishlist?.products,
	});
});

export default getAllWishlistProductsHandler;
