/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Schema, model, type Document } from "mongoose";

export interface CategoryDocument extends Document {
	name: string;
	description?: string;
	createdAt: Date;
	updatedAt: Date;
}

const categorySchema = new Schema<CategoryDocument>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

const CategoryModel = model<CategoryDocument>("Category", categorySchema);

export default CategoryModel;
