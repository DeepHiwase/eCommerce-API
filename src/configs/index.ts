/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import dotenv from "dotenv";
import ms from "ms";

dotenv.config();

const config = {
	PORT: process.env.PORT || 3000,
	NODE_ENV: process.env.NODE_ENV,
	WHITELIST_ORIGINS: ["https://docs.e-commerce-api.deephiwase.xyz"],
	MONGO_URI: process.env.MONGO_URI,
	LOG_LEVEL: process.env.LOG_LEVEL || "info",
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
	REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as ms.StringValue,
	ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as ms.StringValue,
	RESEND_API_KEY: process.env.RESEND_API_KEY,
	EMAIL_SENDER: process.env.EMAIL_SENDER!,
	WHITELIST_ADMIN_MAIL: ["deephiwase3@gmail.com"],
	defaultResLimit: 20,
	defaultResOffset: 0,
	CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
	CLOUDINARY_CLOUD_API_KEY: process.env.CLOUDINARY_CLOUD_API_KEY!,
	CLOUDINARY_CLOUD_API_SECRET: process.env.CLOUDINARY_CLOUD_API_SECRET!,
	STRIPE_SECERT_KEY: process.env.STRIPE_SECERT_KEY!,
};

export default config;
