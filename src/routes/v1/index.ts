/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Router } from "express";
// Routes
import authRoutes from "@/routes/v1/auth.routes";
import userRoutes from "@/routes/v1/user.routes";
import categoryRoutes from "@/routes/v1/category.routes";
import productRoutes from "@/routes/v1/product.routes";
import likeRoutes from "@/routes/v1/like.routes";
import commentRoutes from "@/routes/v1/comment.routes";
import wishlistRoutes from "@/routes/v1/wishlist.routes";
import cartRoutes from "@/routes/v1/cart.routes";
// Constants
import { OK } from "@/constants/http";

const router: Router = Router();

router.get("/", (req, res) => {
	res.status(OK).json({
		message: "API is live",
		version: "1.0.0",
		docs: "https://docs.e-commerce-api.deephiwase.com",
		timestamp: new Date().toISOString(),
	});
});

router.use("/auth", authRoutes);
// protected routes
router.use("/user", userRoutes);

router.use("/categories", categoryRoutes);

router.use("/products", productRoutes);

router.use("/likes", likeRoutes);

router.use("/comments", commentRoutes);

router.use("/wishlist", wishlistRoutes);

router.use("/cart", cartRoutes);

export default router;
