/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Router } from "express";
// Controller
import registerHandler from "@/controllers/v1/auth/register.controller";

const router: Router = Router();

router.post("/register", registerHandler);

export default router;
