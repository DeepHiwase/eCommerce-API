/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

/**
 * @description To create a one year time in ISO DATE ex:`2026-09-15T07:30:28.015Z`
 * @returns one year expires time in ISO string
 */
export const oneYearFromNow = () =>
	new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
