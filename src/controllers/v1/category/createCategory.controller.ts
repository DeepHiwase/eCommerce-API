/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import { logger } from "@/lib/winston";
// Models
import CategoryModel from "@/models/category.model";
// Schemas
import { createCategorySchema } from "@/validations/category.schema";
// Constants
import { CREATED } from "@/constants/http";

const createCategoryHandler = catchErrors(async (req, res) => {
	const { name, description } = createCategorySchema.parse(req.body);

	const newCategory = await CategoryModel.create({
		name,
		description,
	});

	logger.info("New Category created", newCategory);

	return res.status(CREATED).json(newCategory);
});

export default createCategoryHandler;
