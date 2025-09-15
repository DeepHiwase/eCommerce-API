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
