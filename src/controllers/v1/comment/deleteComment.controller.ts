/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import { logger } from "@/lib/winston";
import appAssert from "@/utils/appAssert";
// Models
import ProductModel from "@/models/product.model";
import CommentModel from "@/models/comment.model";
import UserModel from "@/models/user.model";
// Schemas
import { deleteCommentUrlParamsSchema } from "@/validations/comment.schema";
// Constants
import { FORBIDDEN, NO_CONTENT, NOT_FOUND } from "@/constants/http";
import AppErrorCode from "@/constants/appErrorCode";

const deleteCommentHandler = catchErrors(async (req, res) => {
	const { commentId } = deleteCommentUrlParamsSchema.parse(req.params);
	const currentUserId = req.userId;

	const comment = await CommentModel.findById(commentId)
		.select("userId productId")
		.exec();
	appAssert(comment, NOT_FOUND, "Comment not found");
	const user = await UserModel.findById(currentUserId)
		.select("role")
		.lean()
		.exec();
	appAssert(user, NOT_FOUND, "User not found");

	const product = await ProductModel.findById(comment.productId)
		.select("commentsCount")
		.exec();
	appAssert(product, NOT_FOUND, "Product not found");

	// if (comment.userId !== currentUserId && (user?.role as string) !== "admin") {
	// }
	appAssert(
		JSON.parse(JSON.stringify(comment.userId)) === currentUserId ||
			(user?.role as string) === "admin", // Admin can delete any product // TODO: I think to fix this also
		FORBIDDEN,
		"Access denied, insufficient permissions",
		AppErrorCode.AuthorizationError,
	);

	await CommentModel.deleteOne({ _id: commentId });

	logger.info("Comment deleted successfully", { commentId });

	product.commentsCount--;
	await product.save();

	logger.info("Product comments count updated", {
		productId: product._id,
		commentsCount: product.commentsCount,
	});

	res.sendStatus(NO_CONTENT);
});

export default deleteCommentHandler;
