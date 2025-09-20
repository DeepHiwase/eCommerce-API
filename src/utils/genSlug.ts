/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

export const genSlug = (name: string): string => {
	const slug = name
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]\s/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");

	const ramdomChars = Math.random().toString(36).slice(2);
	const uniqueSlug = `${slug}-${ramdomChars}`;

	return uniqueSlug;
};
