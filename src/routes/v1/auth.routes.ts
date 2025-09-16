/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Router } from "express";
// Controller
import registerHandler from "@/controllers/v1/auth/register.controller";
import loginHandler from "@/controllers/v1/auth/login.controller";
import logoutHandler from "@/controllers/v1/auth/logout.controller";
import refreshHandler from "@/controllers/v1/auth/refresh.controller";

const router: Router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/logout", logoutHandler);
router.get("/refresh", refreshHandler);

export default router;
