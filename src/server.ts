/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import express from "express";

/**
 * Custom modules
 */
import config from "@/configs";

const app = express();

app.get("/", (req, res) => {
	res.json({
		message: "Hello World",
	});
});

app.listen(config.PORT, () => {
	console.log(`Server running on: http://localhost:${config.PORT}`);
});
