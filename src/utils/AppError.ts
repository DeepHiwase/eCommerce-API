/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Constants
import AppErrorCode from "@/constants/appErrorCode";
import { type HttpStatusCode } from "@/constants/http";

class AppError extends Error {
	constructor(
		public statusCode: HttpStatusCode,
		public message: string,
		public errorCode?: AppErrorCode,
	) {
		super(message);
	}
}

export default AppError;
