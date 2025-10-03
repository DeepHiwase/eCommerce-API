/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import express from "express";
import cors from "cors";
import cookerParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
// Custom Modules
import config from "@/configs";
import { connectToDatabase, disconnectFromDatabase } from "@/lib/mongoose";
import { logger } from "@/lib/winston";
// Middlewares
import limiter from "@/lib/express_rate_limit";
import errorHandler from "@/middlewares/errorHandler";
import notFoundHandler from "@/middlewares/notFound";
// Root Router
import v1Routes from "@/routes/v1";
// Types
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

			logger.error(`CORS error: ${requestOrigin} is not allowed by CORS`);
		}
	},
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookerParser());
app.use(
	compression({
		threshold: 1024,
	}),
);
app.use(helmet());

app.use(limiter);

(async () => {
	try {
		await connectToDatabase();

		app.use("/api/v1", v1Routes);

		app.use(notFoundHandler);

		app.use(errorHandler);

		app.listen(config.PORT, () => {
			logger.info(`Server running on: http://localhost:${config.PORT}`);
		});
	} catch (err) {
		logger.error("Failed to start the server", err);

		if (config.NODE_ENV === "production") {
			process.exit(1);
		}
	}
})();

const handleServerShutdown = async () => {
	try {
		await disconnectFromDatabase();

		logger.warn("Server SHUTDOWN");
		process.exit(0);
	} catch (err) {
		logger.error("Error during server shutdown", err);
	}
};

process.on("SIGTERM", handleServerShutdown);
process.on("SIGINT", handleServerShutdown);
