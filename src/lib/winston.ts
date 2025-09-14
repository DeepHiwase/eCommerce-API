/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import winston from "winston";
// Custom Modules
import config from "@/configs";

const { timestamp, printf, json, errors, combine, colorize, align } =
	winston.format;

const transports: winston.transport[] = [];

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

export { logger };
