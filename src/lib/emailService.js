import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function isEmailServiceConfigured() {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

/**
 * Sends a contact-form message via EmailJS.
 * @param {{ name: string, email: string, message: string, inquiryType: string, toEmail: string }} payload
 */
export async function sendContactEmail({ name, email, message, inquiryType, toEmail }) {
  if (!isEmailServiceConfigured()) {
    throw new Error(
      "EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in your .env file."
    );
  }

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: name,
      from_email: email,
      message,
      inquiry_type: inquiryType,
      to_email: toEmail,
    },
    { publicKey: PUBLIC_KEY }
  );
}