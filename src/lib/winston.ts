/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import winston from "winston";
import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";
// Custom Modules
import config from "@/configs";

const { timestamp, printf, json, errors, combine, colorize, align } =
	winston.format;

const transports: winston.transport[] = [];

const logtail = new Logtail(config.LOGTAIL_SOURCE_TOKEN, {
	endpoint: `https://${config.LOGTAIL_INGESTING_HOST}`,
});

if (config.NODE_ENV === "production") {
	if (!config.LOGTAIL_SOURCE_TOKEN || !config.LOGTAIL_INGESTING_HOST) {
		throw new Error(
			"Logtail source token and ingesting host must be provided in the configuration",
		);
	}

	transports.push(new LogtailTransport(logtail));
}

if (config.NODE_ENV !== "production") {
	transports.push(
		new winston.transports.Console({
			format: combine(
				colorize({ all: true }),
				timestamp({ format: "YYYY-MM-DD hh:mm:ss A" }),
				align(),
				printf(({ timestamp, level, message, ...meta }) => {
					const metaStr = Object.keys(meta).length
						? `\n${JSON.stringify(meta)}`
						: "";

					return `${timestamp} [${level}]: ${message}${metaStr}`;
				}),
			),
		}),
	);
}

const logger = winston.createLogger({
	level: config.LOG_LEVEL || "info",
	format: combine(timestamp(), errors({ stack: true }), json()),
	transports,
	silent: config.NODE_ENV === "test",
});

export { logger, logtail };
