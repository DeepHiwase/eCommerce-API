/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import assert from "node:assert";
// Custom Modules
import AppError from "@/utils/AppError";
// Constants
import { HttpStatusCode } from "@/constants/http";
import AppErrorCode from "@/constants/appErrorCode";

type AppAssert = (
	condition: any,
	httpStatusCode: HttpStatusCode,
	message: string,
	appErrorCode?: AppErrorCode,
) => asserts condition;

/**
 * @description Asserts a condition and throws an AppError if condition is falsy
 * @param condition any
 * @param httpStatusCode
 * @param message - string
 * @param appErrorCode
 * @returns throws an AppError if condition is falsy
 */

const appAssert: AppAssert = (
	condition,
	httpStatusCode,
	message,
	appErrorCode,
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;
