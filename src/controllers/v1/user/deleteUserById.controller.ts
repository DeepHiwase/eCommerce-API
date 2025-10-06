/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { v2 as cloudinary } from "cloudinary";
// Custom Modules
import catchErrors from "@/utils/catchErrors";
import { logger } from "@/lib/winston";
// Models
import UserModel from "@/models/user.model";
import SessionModel from "@/models/session.model";
import ProductModel from "@/models/product.model";
// Schemas
import { deleteUserByIdUrlParamsSchema } from "@/validations/user.schema";
// Constants
import { NO_CONTENT } from "@/constants/http";

const deleteUserByIdHandler = catchErrors(async (req, res) => {
	const { userId } = deleteUserByIdUrlParamsSchema.parse(req.params);
	const products = await ProductModel.find({ retailer: userId })
		.select("images")
		.lean()
		.exec();

	const images = products.map((product) => product.images);
	const publicIds = images
		.filter((img) => img && Array.isArray(img))
		.flat()
		.map((img) => img.publicId)
		.filter((id) => id);

	if (publicIds.length > 0) {
		try {
			await cloudinary.api.delete_resources(publicIds);
			logger.info("Multiple product images deleted from Cloudinary", {
				publicIds,
			});
		} catch (error) {
			logger.error("Failed to delete images from Cloudinary", {
				publicIds,
				error,
			});
			// Continue with deletion even if Cloudinary fails
			// to avoid blocking user account deletion
		}
	}

	await ProductModel.deleteMany({ retailer: userId });
	logger.info("Multiple products deleted", {
		userId,
		productCount: products.length,
	});

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
