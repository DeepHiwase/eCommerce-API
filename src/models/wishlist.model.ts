/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Schema, model, type Document, type Types } from "mongoose";

export interface WishlistDocument extends Document {
	userId: Types.ObjectId;
	products: Types.ObjectId[];
}

const wishlistSchema = new Schema<WishlistDocument>({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
		unique: true,
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
	],
});

const WishlistModel = model<WishlistDocument>("Wishlist", wishlistSchema);

export default WishlistModel;
