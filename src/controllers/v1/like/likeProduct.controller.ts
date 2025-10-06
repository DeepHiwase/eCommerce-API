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
import { likeProductUrlParamsSchema } from "@/validations/like.schema";
// Constants
import { BAD_REQUEST, NOT_FOUND, OK } from "@/constants/http";

const likeProductHandler = catchErrors(async (req, res) => {
	const { productId } = likeProductUrlParamsSchema.parse(req.params);
	const userId = req.userId;

	const product = await ProductModel.findById(productId)
		.select("likesCount")
		.exec();
	appAssert(product, NOT_FOUND, "Product not found");

	const existingLike = await LikeModel.findOne({ productId, userId })
		.lean()
		.exec();
	appAssert(!existingLike, BAD_REQUEST, "You already liked this product");

	await LikeModel.create({ productId, userId });

	product.likesCount++;
	await product.save();

	logger.info("Product liked successfully", {
		userId,
		productId: product._id,
		likesCount: product.likesCount,
	});

	return res.status(OK).json({
		likesCount: product.likesCount,
	});
});

export default likeProductHandler;
