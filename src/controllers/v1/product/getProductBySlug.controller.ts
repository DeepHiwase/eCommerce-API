/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import appAssert from "@/utils/appAssert";
import catchErrors from "@/utils/catchErrors";
// Models
import ProductModel from "@/models/product.model";
// Schemas
import { getProductBySlugUrlParamsSchema } from "@/validations/product.schema";
// Constants
import { NOT_FOUND, OK } from "@/constants/http";
import AppErrorCode from "@/constants/appErrorCode";

const getProductBySlugHandler = catchErrors(async (req, res) => {
	const { slug } = getProductBySlugUrlParamsSchema.parse(req.params);

	const product = await ProductModel.findOne({ slug })
		.select("-__v")
		.populate("retailer", "-__v -createdAt -updatedAt -password")
		.populate("category", "-__v -createdAt -updatedAt -description")
		.lean()
		.exec();

	appAssert(
		product,
		NOT_FOUND,
		"Product not found",
		AppErrorCode.NotFoundError,
	);

	return res.status(OK).json({
		product,
	});
});

export default getProductBySlugHandler;
