/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import z from "zod";
import type { NextFunction, Request, Response } from "express";
// Custom Modules
import uploadToCloudinary from "@/lib/cloudinary";
import appAssert from "@/utils/appAssert";
// Models
import ProductModel from "@/models/product.model";
// Schemas
import { imageSchema } from "@/validations/product.schema";
// Constants
import { BAD_REQUEST } from "@/constants/http";

// const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * @description Middleware to upload images from req.files array object
 * @param method `POST` | `PUT`
 * @returns return a middleware call to upload images array
 */
const uploadProductImages = (method: "post" | "put") => {
	return async (req: Request, res: Response, next: NextFunction) => {
		if (method === "put" && !req.files) {
			next();
			return;
		}
		appAssert(req.files, BAD_REQUEST, "Images are required");

		// console.log(req.files);
		const images = req.files as Express.Multer.File[];

		// if (req.files.size > MAX_FILE_SIZE) {
		//   res.status(413).json({
		//     code : 'ValidationError',
		//     message: 'File size must be less than 2MB'
		//   })
		//   return;
		// }
		// const fileSizeExceedsLimit = req.files.filter((file) => file.size > MAX_FILE_SIZE );

		// const { productId } = req.params;

		// const product = await ProductModel.findById(productId)
		// 	.select("images")
		// 	.exec();

		const uploadedImages: z.infer<typeof imageSchema>[] = [];

		// sequential upload
		for (const image of images) {
			const result = await uploadToCloudinary(image.buffer);
			uploadedImages.push({
				publicId: result?.public_id!,
				url: result?.url!,
				height: result?.height!,
				width: result?.width!,
			});
		}

		req.body.images = uploadedImages; // its an array of Images

		next();
	};
};

export default uploadProductImages;
