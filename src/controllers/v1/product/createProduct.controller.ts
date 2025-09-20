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
// Models
import ProductModel from "@/models/product.model";
// Schemas
import { createProductSchema } from "@/validations/product.schema";
// Constants
import { CREATED } from "@/constants/http";

// Purify the blog content
const window = new JSDOM("").window;
const purify = DOMPurify(window);

const createProductHandler = catchErrors(async (req, res) => {
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
	} = createProductSchema.parse(req.body);

	const userId = req.userId;

	const cleanContent = purify.sanitize(description);

	const newProduct = await ProductModel.create({
		name,
		description: cleanContent,
		price,
		discountedPrice,
		ratings,
		stock,
		images,
		brand,
		isFeatured,
		retailer: userId,
		category: categoryId,
	});

	logger.info("New product created", newProduct);

	return res.status(CREATED).json({
		product: newProduct,
	});
});

export default createProductHandler;
