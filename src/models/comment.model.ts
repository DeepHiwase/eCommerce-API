/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Schema, model, type Document, type Types } from "mongoose";

export interface CommentDocument extends Document {
	productId: Types.ObjectId;
	userId: Types.ObjectId;
	content: string;
	createdAt: Date;
	updatedAt: Date;
}

const commentSchema = new Schema<CommentDocument>(
	{
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		content: {
			type: String,
			required: true,
			maxLength: 1000,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const CommentModel = model<CommentDocument>("Comment", commentSchema);

export default CommentModel;
