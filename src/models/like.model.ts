/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Schema, model, type Document, type Types } from "mongoose";

export interface LikeDocument extends Document {
	productId?: Types.ObjectId;
	userId: Types.ObjectId;
	commentId?: Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

const likeSchema = new Schema<LikeDocument>(
	{
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
		commentId: {
			type: Schema.Types.ObjectId,
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

// one user -> only one like to a product
likeSchema.index({ userId: 1, productId: 1 }, { unique: true });

const LikeModel = model<LikeDocument>("Like", likeSchema);

export default LikeModel;
