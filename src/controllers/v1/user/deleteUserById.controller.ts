/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import catchErrors from "@/utils/catchErrors";
import { logger } from "@/lib/winston";
// Models
import UserModel from "@/models/user.model";
import SessionModel from "@/models/session.model";
// Schemas
import { deleteUserByIdUrlParamsSchema } from "@/validations/user.schema";
// Constants
import { NO_CONTENT } from "@/constants/http";

const deleteUserByIdHandler = catchErrors(async (req, res) => {
	const { userId } = deleteUserByIdUrlParamsSchema.parse(req.params);

	await SessionModel.deleteMany({ userId });
	logger.info("Sessions deleted during account deletion", {
		userId,
	});

	await UserModel.deleteOne({ _id: userId });
	logger.info("A user account has been deleted", {
		userId,
	});

	return res.sendStatus(NO_CONTENT);
});

export default deleteUserByIdHandler;
