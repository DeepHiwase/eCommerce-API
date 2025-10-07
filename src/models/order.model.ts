/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Schema, model, type Types, type Document } from "mongoose";

export interface OrderItemDocument {
	productId: Types.ObjectId;
	quantity: number;
	price: number;
}

export interface OrderDocument extends Document {
	userId: Types.ObjectId;
	items: OrderItemDocument[];
	totalAmount: number;
	shippingAddress: {
		fullName: string;
		address: string;
		city: string;
		postalCode: string;
		country: string;
	};
	paymentMethod: "COD" | "Stripe" | "Razorpay";
	paymentStatus: "pending" | "paid" | "failed";
	orderStatus: "processing" | "shipped" | "delivered" | "cancelled";
	createdAt: Date;
	updatedAt: Date;
}

const orderItemSchema = new Schema<OrderItemDocument>(
	{
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
			default: 1,
			min: 1,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
	},
	{ _id: false },
);

const orderSchema = new Schema<OrderDocument>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: [orderItemSchema],
		totalAmount: { type: Number, required: true, min: 0 },
		shippingAddress: {
			fullName: { type: String, required: true },
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true },
		},
		paymentMethod: {
			type: String,
			enum: ["COD", "Stripe", "Razorpay"],
			required: true,
		},
		paymentStatus: {
			type: String,
			enum: ["pending", "paid", "failed"],
			required: true,
			default: "pending",
		},
		orderStatus: {
			type: String,
			enum: ["processing", "shipped", "delivered", "cancelled"],
			required: true,
			default: "processing",
		},
	},
	{
		timestamps: true,
	},
);

const OrderModel = model<OrderDocument>("Order", orderSchema);

export default OrderModel;
