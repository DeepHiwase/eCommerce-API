/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import appAssert from "@/utils/appAssert";
import { logger } from "@/lib/winston";
// Models
import UserModel from "@/models/user.model";
// Schemas
import { updateCurrentUserSchema } from "@/validations/user.schema";
// Constants
import { NOT_FOUND, OK } from "@/constants/http";

const updateCurrentUserHandler = catchErrors(async (req, res) => {
	const userId = req.userId;
	const { email, password } = await updateCurrentUserSchema.parseAsync(
		req.body,
	);

	const user = await UserModel.findById(userId)
		.select("+email +password")
		.exec();
	appAssert(user, NOT_FOUND, "User not found");

	if (email) user.email = email;
	if (password) user.password = password;

	await user.save();

	logger.info("User updated successfully", user.omitPassword());

	return res.status(OK).json(user.omitPassword());
});

export default updateCurrentUserHandler;
