/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import express from "express";
import cors from "cors";

/**
 * Custom modules
 */
import config from "@/configs";

/**
 * Types
 */
import type { CorsOptions } from "cors";

const app = express();

const corsOptions: CorsOptions = {
	origin(requestOrigin, callback) {
		if (
			config.NODE_ENV === "development" ||
			!requestOrigin ||
			config.WHITELIST_ORIGINS.includes(requestOrigin)
		) {
			callback(null, true);
		} else {
			callback(
				new Error(`CORS error: ${requestOrigin} is not allowed by CORS`),
				false,
			);

			console.log(`CORS error: ${requestOrigin} is not allowed by CORS`);
		}
	},
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
	res.json({
		message: "Hello World",
	});
});

app.listen(config.PORT, () => {
	console.log(`Server running on: http://localhost:${config.PORT}`);
});
