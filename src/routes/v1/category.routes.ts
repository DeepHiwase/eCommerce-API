/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Router } from "express";
// Middlewares
import authenticate from "@/middlewares/authenticate";
import authorize from "@/middlewares/authorize";
// Controller
import createCategoryHandler from "@/controllers/v1/category/createCategory.controller";

const router: Router = Router();

router.post("/", authenticate, authorize(["admin"]), createCategoryHandler);

export default router;
