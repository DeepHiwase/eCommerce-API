/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import mongoose from "mongoose";
// Custom Modules
import config from "@/configs";
import { logger } from "@/lib/winston";
// Types
import type { ConnectOptions } from "mongoose";

const clientOptions: ConnectOptions = {
	dbName: "e-commerce-db",
	appName: "E-Commerce API",
	serverApi: {
		version: "1",
		strict: true,
		deprecationErrors: true,
	},
};

export const connectToDatabase = async (): Promise<void> => {
	if (!config.MONGO_URI) {
		throw new Error("MongoDB URI is not defined in the configuration.");
	}

	try {
		await mongoose.connect(config.MONGO_URI, clientOptions);

		logger.info("Connected to database successfully.", {
			uri: config.MONGO_URI,
			options: clientOptions,
		});
	} catch (err) {
		if (err instanceof Error) {
			throw err;
		}

		logger.error("Error connecting to database", err);
	}
};

export const disconnectFromDatabase = async (): Promise<void> => {
	try {
		await mongoose.disconnect();

		logger.info("Disconnected from the database successfully.", {
			uri: config.MONGO_URI,
			options: clientOptions,
		});
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}

		logger.error("Error connecting to database", err);
	}
};
