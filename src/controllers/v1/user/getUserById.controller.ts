/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import appAssert from "@/utils/appAssert";
import catchErrors from "@/utils/catchErrors";
// Models
import UserModel from "@/models/user.model";
// Schemas
import { getUserByIdUrlParamsSchema } from "@/validations/user.schema";
// Constants
import { NOT_FOUND, OK } from "@/constants/http";

const getUserByIdHandler = catchErrors(async (req, res) => {
	const { userId } = getUserByIdUrlParamsSchema.parse(req.params);

	const user = await UserModel.findById(userId).select("-password -__v").exec();
	appAssert(user, NOT_FOUND, "User not found");

	return res.status(OK).json(user);
});

export default getUserByIdHandler;
