/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Node Modules
import Stripe from "stripe";
// Custom Modules
import config from "@/configs";

const stripe = new Stripe(config.STRIPE_SECERT_KEY, {
	apiVersion: "2025-09-30.clover",
});

export default stripe;
