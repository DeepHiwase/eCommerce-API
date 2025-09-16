/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

// Custom Modules
import config from "@/configs";
import resend from "@/lib/resend";

type SendMailParams = {
	to: string;
	subject: string;
	text: string;
	html: string;
};

const getFromMail = () =>
	config.NODE_ENV === "development"
		? "onboarding@resend.dev"
		: config.EMAIL_SENDER;

const getToEmail = (to: string) =>
	config.NODE_ENV === "development" ? "delivered@resend.dev" : to;

export const sendMail = async ({ to, subject, text, html }: SendMailParams) =>
	await resend.emails.send({
		from: getFromMail(),
		to: getToEmail(to),
		subject,
		text,
		html,
	});
