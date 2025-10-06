/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Router } from "express";
import multer from "multer";
// Middlewares
import authenticate from "@/middlewares/authenticate";
import authorize from "@/middlewares/authorize";
import uploadProductImages from "@/middlewares/uploadProductImages";
// Controller
import createProductHandler from "@/controllers/v1/product/createProduct.controller";
import getAllProductsHandler from "@/controllers/v1/product/getAllProducts.controller";
import getProductsByRetailerHandler from "@/controllers/v1/product/getProductsByRetailer.controller";
import getProductBySlugHandler from "@/controllers/v1/product/getProductBySlug.controller";
import updateProductHandler from "@/controllers/v1/product/updateProduct.controller";
import deleteProductHandler from "@/controllers/v1/product/deleteProduct.controller";

const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 },
});

const router: Router = Router();

router.post(
	"/",
	authenticate,
	authorize(["retailer"]),
	upload.array("product_images", 10),
	uploadProductImages("post"),
	createProductHandler,
);

router.get(
	"/",
	authenticate,
	authorize(["admin", "customer", "retailer"]),
	getAllProductsHandler,
);

router.get(
	"/retailer/:retailerId",
	authenticate,
	authorize(["admin", "customer", "retailer"]),
	getProductsByRetailerHandler,
);

router.get(
	"/:slug",
	authenticate,
	authorize(["admin", "customer", "retailer"]),
	getProductBySlugHandler,
);

router.put(
	"/:productId",
	authenticate,
	authorize(["retailer"]),
	upload.array("product_images", 10),
	uploadProductImages("put"),
	updateProductHandler,
);

router.delete(
	"/:productId",
	authenticate,
	authorize(["retailer", "admin"]),
	deleteProductHandler,
);

export default router;
