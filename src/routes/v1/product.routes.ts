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

const upload = multer();

const router: Router = Router();

router.post(
	"/",
	authenticate,
	authorize(["retailer"]),
	upload.array("product_images"),
	uploadProductImages("post"),
	createProductHandler,
);

router.get(
	"/",
	authenticate,
	authorize(["admin", "customer", "retailer"]),
	getAllProductsHandler,
);

export default router;
