/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import bcrypt from "bcrypt";

/**
 * @description To hashed the values like password
 * @param value Value to hashed
 * @param saltRounds no. of cycles to hash the password. More the number harder to hashing and time consuming, needs to await for more than 1 round
 * @returns hashed value
 */
export const hashValue = async (value: string, saltRounds?: number) =>
	await bcrypt.hash(value, saltRounds || 10);

/**
 * @description To compare given value to hashed value. the given value is hashed first then comapre with hashed value
 * @param value original value to compare
 * @param hashedValue the hashed value to compare with the given value like comapring given string password to original password store in database which is hashed one
 * @returns returns true if both values are equal or false if not equal or error
 */
export const compareValue = async (value: string, hashedValue: string) =>
	await bcrypt.compare(value, hashedValue).catch(() => false);
