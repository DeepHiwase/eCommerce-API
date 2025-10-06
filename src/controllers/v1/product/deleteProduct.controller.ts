/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { v2 as cloudinary } from "cloudinary";
// Custom Modules
import catchErrors from "@/utils/catchErrors";
import appAssert from "@/utils/appAssert";
import { logger } from "@/lib/winston";
// Models
import UserModel from "@/models/user.model";
import ProductModel from "@/models/product.model";
// Schemas
import { deleteProductUrlParamsSchema } from "@/validations/product.schema";
// Constants
import { FORBIDDEN, NO_CONTENT, NOT_FOUND } from "@/constants/http";
import AppErrorCode from "@/constants/appErrorCode";

const deleteProductHandler = catchErrors(async (req, res) => {
	const { productId } = deleteProductUrlParamsSchema.parse(req.params);
	const userId = req.userId;

	const user = await UserModel.findById(userId).select("role").lean().exec();
	appAssert(user, NOT_FOUND, "User not found");
	const product = await ProductModel.findById(productId)
		.select("retailer images")
		.lean()
		.exec();
	appAssert(product, NOT_FOUND, "Product not found");

	appAssert(
		JSON.parse(JSON.stringify(product.retailer)) === userId ||
			user?.role === "retailer", // TODO: add for admin also
		FORBIDDEN,
		"Access denied, insufficient permissions",
		AppErrorCode.AuthorizationError,
	);

	for (const image of product.images) {
		// TODO: its wrong approach, fix it as by using Promise.all
		await cloudinary.uploader.destroy(image.publicId);
		logger.info("Product image deleted from Cloudinary", {
			publicId: image.publicId,
		});
	}

	await ProductModel.deleteOne({ _id: productId });
	logger.info("Product deleted successfully", {
		productId,
	});

	return res.sendStatus(NO_CONTENT);
});

export default deleteProductHandler;
