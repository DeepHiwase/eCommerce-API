/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
// Custom Modules
import catchErrors from "@/utils/catchErrors";
import appAssert from "@/utils/appAssert";
import { logger } from "@/lib/winston";
// Models
import UserModel from "@/models/user.model";
import ProductModel from "@/models/product.model";
// Schemas
import {
	updateProductSchema,
	updateProductUrlParamsSchema,
} from "@/validations/product.schema";
// Constants
import { FORBIDDEN, NOT_FOUND, OK } from "@/constants/http";
import AppErrorCode from "@/constants/appErrorCode";

// Purify the product content
const window = new JSDOM("").window;
const purify = DOMPurify(window);

const updateProductHandler = catchErrors(async (req, res) => {
	const {
		images,
		description,
		name,
		price,
		ratings,
		stock,
		categoryId,
		isFeatured,
		brand,
		discountedPrice,
	} = updateProductSchema.parse(req.body);
	const userId = req.userId;
	const { productId } = updateProductUrlParamsSchema.parse(req.params);

	const user = await UserModel.findById(userId).select("role").lean().exec();
	appAssert(user, NOT_FOUND, "User not found");
	const product = await ProductModel.findById(productId).select("-__v").exec();
	appAssert(product, NOT_FOUND, "Product not found");

	appAssert(
		JSON.parse(JSON.stringify(product.retailer)) === userId &&
			user?.role === "retailer",
		FORBIDDEN,
		"Access denied, insufficient permissions",
		AppErrorCode.AuthorizationError,
	);

	if (name) product.name = name;
	if (description) {
		const cleanContent = purify.sanitize(description);
		product.description = cleanContent;
	}
	if (price) product.price = price;
	// if (ratings) product.ratings = ratings; // TODO: fix rating update issue
	if (stock) product.stock = stock;
	if (categoryId) product.category = categoryId;
	if (isFeatured) product.isFeatured = isFeatured;
	if (brand) product.brand = brand;
	if (discountedPrice) product.discountedPrice = discountedPrice;
	if (images) product.images = req.body.images;

	await product.save();

	logger.info("Product updated successfully", product);

	return res.status(OK).json({
		product,
	});
});

export default updateProductHandler;
