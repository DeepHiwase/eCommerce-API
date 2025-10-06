/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
// Custom Modules
import catchErrors from "@/utils/catchErrors";
import { logger } from "@/lib/winston";
import appAssert from "@/utils/appAssert";
// Models
import CommentModel from "@/models/comment.model";
import ProductModel from "@/models/product.model";
// Schemas
import {
	createCommentSchema,
	createCommentUrlParamsSchema,
} from "@/validations/comment.schema";
// Constants
import { CREATED, NOT_FOUND } from "@/constants/http";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

const createCommentHandler = catchErrors(async (req, res) => {
	const { productId } = createCommentUrlParamsSchema.parse(req.params);
	const { content } = createCommentSchema.parse(req.body);
	const userId = req.userId;

	const product = await ProductModel.findById(productId)
		.select("_id commentsCount")
		.exec();
	appAssert(product, NOT_FOUND, "Product not found");

	const cleanContent = purify.sanitize(content);

	const newComment = await CommentModel.create({
		productId,
		content: cleanContent,
		userId,
	});

	logger.info("New comment create", newComment);

	product.commentsCount++;
	await product.save();

	logger.info("Product comments count update", {
		productId: product._id,
		commentsCount: product.commentsCount,
	});

	return res.status(CREATED).json({
		comment: newComment,
	});
});

export default createCommentHandler;
