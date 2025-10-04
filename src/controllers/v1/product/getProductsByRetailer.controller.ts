/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import appAssert from "@/utils/appAssert";
import catchErrors from "@/utils/catchErrors";
// Models
import UserModel from "@/models/user.model";
import ProductModel from "@/models/product.model";
// Schemas
import {
	getAllProductsQueryParamsSchema,
	getProductsByRetailerUrlParamsSchema,
} from "@/validations/product.schema";
// Constants
import { NOT_FOUND, OK } from "@/constants/http";

const getProductsByRetailerHandler = catchErrors(async (req, res) => {
	const { retailerId } = getProductsByRetailerUrlParamsSchema.parse(req.params);
	const { limit, offset } = getAllProductsQueryParamsSchema.parse(req.query);

	const retailer = await UserModel.findById(retailerId)
		.select("-password -__v")
		.exec();
	appAssert(retailer, NOT_FOUND, "Retailer not found");

	const total = await ProductModel.countDocuments({ retailer: retailerId });

	const products = await ProductModel.find({ retailer: retailerId })
		.select("-__v")
		.populate("retailer", "-__v -createdAt -updatedAt -password")
		.populate("category", "-__v -createdAt -updatedAt -description")
		.limit(limit)
		.skip(offset)
		.sort({ createdAt: -1 })
		.lean()
		.exec();

	return res.status(OK).json({
		limit,
		offset,
		total,
		products,
	});
});

export default getProductsByRetailerHandler;
