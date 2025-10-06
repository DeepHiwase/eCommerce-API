/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Schema, model, type Document, type Types } from "mongoose";

export interface CartItemDocument {
	product: Types.ObjectId;
	quantity: number;
}

export interface CartDocument extends Document {
	userId: Types.ObjectId;
	items: CartItemDocument[];
	createdAt: Date;
	updatedAt: Date;
}

const cartItemSchema = new Schema<CartItemDocument>(
	{
		product: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		quantity: {
			type: Number,
			default: 1,
			min: 1,
		},
	},
	{ _id: false },
);

const cartSchema = new Schema<CartDocument>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
		items: [cartItemSchema],
	},
	{
		timestamps: true,
	},
);

const CartModel = model<CartDocument>("Cart", cartSchema);

export default CartModel;
