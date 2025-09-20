/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
// Custom Modules
import config from "@/configs";
import { logger } from "@/lib/winston";

cloudinary.config({
	cloud_name: config.CLOUDINARY_CLOUD_NAME,
	api_key: config.CLOUDINARY_CLOUD_API_KEY,
	api_secret: config.CLOUDINARY_CLOUD_API_SECRET,
	secure: config.NODE_ENV === "production",
});

/**
 *
 * @param buffer A buffer containing entire file
 * @param publicId Optional Helps to replace with this id a new image to upload
 * @returns
 */
const uploadToCloudinary = (
	buffer: Buffer<ArrayBufferLike>,
	publicId?: string,
): Promise<UploadApiResponse | undefined> => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader
			.upload_stream(
				{
					allowed_formats: ["png", "jpg", "webp"],
					resource_type: "image",
					folder: "e_commerce_api",
					public_id: publicId,
					transformation: { quality: "auto" },
				},
				(err, result) => {
					if (err) {
						logger.error("Error uploading image to Cloudinary", err);
						reject(err);
					}

					resolve(result);
				},
			)
			.end(buffer);
	});
};

export default uploadToCloudinary;
