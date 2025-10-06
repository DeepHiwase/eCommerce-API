/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import { logger } from "@/lib/winston";
import appAssert from "@/utils/appAssert";
// Models
import LikeModel from "@/models/like.model";
import ProductModel from "@/models/product.model";
// Schemas
import { unlikeProductUrlParamsSchema } from "@/validations/like.schema";
// Constants
import { BAD_REQUEST, NO_CONTENT, NOT_FOUND, OK } from "@/constants/http";

const unlikeProductHandler = catchErrors(async (req, res) => {
	const { productId } = unlikeProductUrlParamsSchema.parse(req.params);
	const userId = req.userId;

	const product = await ProductModel.findById(productId)
		.select("likesCount")
		.exec();
	appAssert(product, NOT_FOUND, "Product not found");

	const existingLike = await LikeModel.findOne({ productId, userId })
		.lean()
		.exec();
	appAssert(existingLike, BAD_REQUEST, "Like not found");

	await LikeModel.deleteOne({ _id: existingLike._id });

	product.likesCount--;
	await product.save();

	logger.info("Product unliked successfully", {
		userId,
		productId: product._id,
		likesCount: product.likesCount,
	});

	return res.sendStatus(NO_CONTENT);
});

export default unlikeProductHandler;
