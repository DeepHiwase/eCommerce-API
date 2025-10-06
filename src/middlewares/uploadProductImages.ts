/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import z, { file } from "zod";
import type { NextFunction, Request, Response } from "express";
// Custom Modules
import uploadToCloudinary from "@/lib/cloudinary";
import appAssert from "@/utils/appAssert";
// Models
import ProductModel from "@/models/product.model";
// Schemas
import {
	imageSchema,
	updateProductUrlParamsSchema,
} from "@/validations/product.schema";
// Constants
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "@/constants/http";

// const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * @description Middleware to upload images from req.files array object
 * @param method `POST` | `PUT`
 * @returns return a middleware call to upload images array
 */
const uploadProductImages = (method: "post" | "put") => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const images = req.files as Express.Multer.File[];

			if (method === "post") {
				appAssert(
					images && images.length > 0,
					BAD_REQUEST,
					"Images are required",
				);
			}

			if (method === "put" && (!images || images.length === 0)) {
				return next();
			}

			const uploadImages = await Promise.all(
				images!.map(async (image) => {
					const result = await uploadToCloudinary(image.buffer);
					return {
						publicId: result?.public_id!,
						url: result?.secure_url!,
						height: result?.height!,
						width: result?.width!,
					} satisfies z.infer<typeof imageSchema>;
				}),
			);

			if (method === "put") {
				const { productId } = updateProductUrlParamsSchema.parse(req.params);

				if (productId) {
					const product = await ProductModel.findById(productId)
						.select("images")
						.lean()
						.exec();

					if (product?.images.length) {
						req.body.images = [...product.images, ...uploadImages];
					} else {
						req.body.images = uploadImages;
					}
				} else {
					req.body.images = uploadImages;
				}
			} else {
				req.body.images = uploadImages;
			}

			return next();
		} catch (err) {
			console.error("Error in uploadProductImages:", err);
			res.status(INTERNAL_SERVER_ERROR).json({
				message: "Image upload failed",
				error: (err as Error).message,
			});
		}
	};
};

export default uploadProductImages;
