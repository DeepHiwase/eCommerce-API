/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
// Models
import UserModel from "@/models/user.model";
// Schemas
import { getAllUsersQueryParamsSchema } from "@/validations/user.schema";
// Constants
import { OK } from "@/constants/http";

const getAllUsersHandler = catchErrors(async (req, res) => {
	// const limit = parseInt(req.query.limit as string) ?? config.defaultResLimit;
	// const offset =
	// 	parseInt(req.query.offset as string) ?? config.defaultResOffset;
	const { limit, offset } = getAllUsersQueryParamsSchema.parse(req.query);

	const total = await UserModel.countDocuments();

	const users = await UserModel.find()
		.select("-__v -password")
		.limit(limit)
		.skip(offset)
		.lean()
		.exec();

	return res.status(OK).json({
		limit,
		offset,
		total,
		users,
	});
});

export default getAllUsersHandler;
