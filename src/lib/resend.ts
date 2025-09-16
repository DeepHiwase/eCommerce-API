/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import { Resend } from "resend";
// Custom Modules
import config from "@/configs";

const resend = new Resend(config.RESEND_API_KEY);

export default resend;
