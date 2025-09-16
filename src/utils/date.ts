/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

/**
 * @description To create a one year time in ISO DATE ex:`2026-09-15T07:30:28.015Z`
 * @returns one year time in ISO Date
 */
export const oneYearFromNow = () =>
	new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

/**
 * @description To create a thirty days time in ISO DATE ex:`2025-10-15T07:44:17.940Z`
 * @returns thirty days time in ISO Date
 */
export const thirtyDaysFromNow = () =>
	new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

/**
 * @description Return One day time in milliseconds
 */
export const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * @description to calculate one hour timestanp date
 * @returns return datetime in one hour added to current datetime
 */
export const oneHourFromNow = () => new Date(Date.now() + 60 * 60 * 1000);

/**
 * @description To create a fifteen minutes time in ISO Date Time ex:`2025-10-15T07:44:17.940Z`
 * @returns fifteen minutes time in ISO Date Time
 */
export const fifteenMinutesFromNow = () =>
	new Date(Date.now() + 15 * 60 * 1000);

/**
 * @description To calculate time of five minutes ago
 * @returns return datetime of five minute age of current datetime
 */
export const fiveMinutesAgo = () => new Date(Date.now() - 5 * 6 * 1000);
