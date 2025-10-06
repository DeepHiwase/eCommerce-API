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
import { addProductToWishlistUrlParamsSchema } from "@/validations/wishlist.schema";
// Constants
import { BAD_REQUEST, OK } from "@/constants/http";

const addProductToWishlistHandler = catchErrors(async (req, res) => {
	const { productId } = addProductToWishlistUrlParamsSchema.parse(req.params);
	const userId = req.userId;

	const wishlist = await WishlistModel.findOne({ userId });

	if (!wishlist) {
		const newWishlist = await WishlistModel.create({
			userId,
			products: [productId],
		});
		logger.info("Added to wishlist", newWishlist);
		return res.status(OK).json({
			wishlist: newWishlist,
		});
	} else if (wishlist && wishlist.products.includes(productId)) {
		appAssert(null, BAD_REQUEST, "Product already in present wishlist");
	} else {
		wishlist.products.push(productId);
		await wishlist.save();

		logger.info("Added to wishlist", wishlist);
		return res.status(OK).json({
			wishlist,
		});
	}
});

export default addProductToWishlistHandler;
