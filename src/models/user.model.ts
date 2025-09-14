/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Schema, model, type Document } from "mongoose";
// Custom Modules
import { hashValue } from "@/lib/bcrypt";

export interface UserDocument extends Document {
	email: string;
	password: string;
	role: "retailer" | "customer";
	verified: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: {
				values: ["retailer", "customer"],
				message: "{VALUE} is not supported",
			},
			default: "customer",
		},
		verified: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	this.password = await hashValue(this.password);
	next();
});

const UserModel = model<UserDocument>("User", userSchema);

export default UserModel;
