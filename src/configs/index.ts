/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import dotenv from "dotenv";

dotenv.config();

const config = {
	PORT: process.env.PORT || 3000,
	NODE_ENV: process.env.NODE_ENV,
	WHITELIST_ORIGINS: ["docs.e-commerce-api.deephiwase.com"],
};

export default config;
