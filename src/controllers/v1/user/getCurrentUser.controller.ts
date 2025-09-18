/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import appAssert from "@/utils/appAssert";
// Models
import UserModel from "@/models/user.model";
// Constants
import { NOT_FOUND, OK } from "@/constants/http";

const getCurrentUserHandler = catchErrors(async (req, res) => {
	const userId = req.userId;
	const user = await UserModel.findById(userId)
		.select("-__v -password")
		.lean()
		.exec();
	appAssert(user, NOT_FOUND, "User not found");

	return res.status(OK).json(user);
});

export default getCurrentUserHandler;
