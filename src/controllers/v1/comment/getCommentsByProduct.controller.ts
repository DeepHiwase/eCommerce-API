/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import appAssert from "@/utils/appAssert";
// Models
import CommentModel from "@/models/comment.model";
import ProductModel from "@/models/product.model";
// Schemas
import { getCommentsByProductUrlParamsSchema } from "@/validations/comment.schema";
// Constants
import { NOT_FOUND, OK } from "@/constants/http";

const getCommentsByProductHandler = catchErrors(async (req, res) => {
	const { productId } = getCommentsByProductUrlParamsSchema.parse(req.params);

	const product = await ProductModel.findById(productId)
		.select("_id")
		.lean()
		.exec();
	appAssert(product, NOT_FOUND, "Product not found");

	const allComments = await CommentModel.find({ productId })
		.sort({ createdAt: -1 })
		.lean()
		.exec();

	return res.status(OK).json({
		comments: allComments,
	});
});

export default getCommentsByProductHandler;
