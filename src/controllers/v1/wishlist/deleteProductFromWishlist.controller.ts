/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import { logger } from "@/lib/winston";
import appAssert from "@/utils/appAssert";
// Models
import WishlistModel from "@/models/wishlist.model";
// Schemas
import { deleteProductFromWishlistUrlParamsSchema } from "@/validations/wishlist.schema";
// Constants
import { NO_CONTENT, NOT_FOUND } from "@/constants/http";

const deleteProductFromWishlistHandler = catchErrors(async (req, res) => {
	const { productId } = deleteProductFromWishlistUrlParamsSchema.parse(
		req.params,
	);
	const userId = req.userId;

	const wishlist = await WishlistModel.findOne({ userId });
	appAssert(wishlist, NOT_FOUND, "Wishlist not found");

	wishlist.products = wishlist.products.filter(
		(product_id) => JSON.parse(JSON.stringify(product_id)) !== productId,
	);

	await wishlist.save();

	logger.info("Removed product from wishlist", {
		userId,
		productId,
	});

	return res.sendStatus(NO_CONTENT);
});

export default deleteProductFromWishlistHandler;
