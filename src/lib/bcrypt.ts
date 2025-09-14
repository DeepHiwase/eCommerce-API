/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import bcrypt from "bcrypt";

export const hashValue = async (value: string, saltRounds?: number) =>
	await bcrypt.hash(value, saltRounds || 10);
