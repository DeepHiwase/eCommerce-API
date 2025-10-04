/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
// Models
import ProductModel from "@/models/product.model";
// Schemas
import { getAllProductsQueryParamsSchema } from "@/validations/product.schema";
// Constants
import { OK } from "@/constants/http";

const getAllProductsHandler = catchErrors(async (req, res) => {
	const { limit, offset } = getAllProductsQueryParamsSchema.parse(req.query);

	const total = await ProductModel.countDocuments();

	const products = await ProductModel.find()
		.select("-__v")
		.populate("retailer", "-__v -createdAt -updatedAt -password")
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

export default getAllProductsHandler;
