/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import express from "express";

const app = express();

app.listen(3000, () => {
	console.log(`Server running on: http://localhost:${3000}`);
});
