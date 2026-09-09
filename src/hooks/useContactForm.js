import { useEffect, useRef, useState } from "react";
import { sendContactEmail } from "../lib/emailService";

const inquiryTypes = ["Project", "Collaboration", "Job Offer", "General", "Other"];

// Anti-spam tuning: bots that fill the form faster than this are almost
// certainly not human, and resubmits within this window are blocked too.
const MIN_FILL_SECONDS = 3;
const RESEND_COOLDOWN_MS = 30_000;

/**
 * Encapsulates all contact-form behavior: field state, spam prevention,
 * and submission. Returns everything a presentational component needs
 * without exposing how any of it works underneath.
 */
export function useContactForm(recipientEmail) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [inquiryType, setInquiryType] = useState("General");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | cooldown | error
  const [honeypot, setHoneypot] = useState(""); // invisible field — real users never fill this

  const mountedAtRef = useRef(Date.now());
  const lastSentAtRef = useRef(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({ name: "", email: "", message: "" });
    setInquiryType("General");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: if this hidden field has anything in it, a bot filled it in.
    // Pretend success so the bot doesn't learn to adapt — don't actually send.
    if (honeypot.trim() !== "") {
      setStatus("sent");
      resetForm();
      return;
    }

    // Filled too fast to be a human typing — likely a bot script.
    const secondsElapsed = (Date.now() - mountedAtRef.current) / 1000;
    if (secondsElapsed < MIN_FILL_SECONDS) {
      setStatus("error");
      return;
    }

    // Basic resend cooldown, in case someone spams the Submit button itself.
    if (Date.now() - lastSentAtRef.current < RESEND_COOLDOWN_MS) {
      setStatus("cooldown");
      return;
    }

    setStatus("sending");
    try {
      await sendContactEmail({
        name: form.name,
        email: form.email,
        message: form.message,
        inquiryType,
        toEmail: recipientEmail,
      });
      lastSentAtRef.current = Date.now();
      setStatus("sent");
      resetForm();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return {
    form,
    inquiryType,
    setInquiryType,
    inquiryTypes,
    status,
    honeypot,
    setHoneypot,
    handleChange,
    handleSubmit,
  };
}