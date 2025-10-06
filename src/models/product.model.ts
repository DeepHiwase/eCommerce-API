/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Schema, model, type Document, type Types } from "mongoose";
// Custom modules
import { genSlug } from "@/utils/genSlug";

export type ImageOfProduct = {
	publicId: string;
	url: string;
	width: number;
	height: number;
};

export interface ProductDocument extends Document {
	name: string;
	description: string;
	slug: string;
	price: number;
	discountedPrice?: number;
	stock: number;
	category: Types.ObjectId;
	brand?: string;
	images: ImageOfProduct[];
	// images: string[];
	ratings: {
		average: number;
		count: number;
	};
	isFeatured: boolean;
	retailer: Types.ObjectId;
	likesCount: number;
	commentsCount: number;
	createdAt: Date;
	updatedAt: Date;
}

const imageOfProductSchema = new Schema<ImageOfProduct>({
	publicId: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	height: {
		type: Number,
		required: true,
	},
	width: {
		type: Number,
		required: true,
	},
});

const productSchema = new Schema<ProductDocument>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		price: {
			type: Number,
			required: true,
		},
		discountedPrice: {
			type: Number,
		},
		stock: {
			type: Number,
			required: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		brand: {
			type: String,
		},
		images: [imageOfProductSchema],
		ratings: {
			average: {
				type: Number,
				default: 0,
			},
			count: {
				type: Number,
				default: 0,
			},
		},
		isFeatured: {
			type: Boolean,
			required: true,
			default: false,
		},
		retailer: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		likesCount: {
			type: Number,
			default: 0,
		},
		commentsCount: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

productSchema.pre("validate", function (next) {
	if (this.name && !this.slug) {
		this.slug = genSlug(this.name);
	}

	next();
});

const ProductModel = model<ProductDocument>("Product", productSchema);

export default ProductModel;
