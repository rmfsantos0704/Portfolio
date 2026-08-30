import { useState } from "react";
import emailjs from "@emailjs/browser";
import { profile } from "../data/content";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error(
        "EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in your .env file."
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: profile.email,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <div className="rounded-3xl border border-white/5 bg-surface p-8 shadow-[0_0_80px_-30px_rgba(91,79,245,0.35)] sm:p-12">
          <h2 className="text-center font-display text-3xl font-semibold text-white sm:text-4xl">
            Let&apos;s Build Something
          </h2>
          <p className="mt-3 text-center text-muted">
            Have a project in mind or just want to chat about NFC tech?
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-white/10 bg-bg px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors hover:border-white/20 focus:border-indigo-2"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full rounded-lg border border-white/10 bg-bg px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors hover:border-white/20 focus:border-indigo-2"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-lg border border-white/10 bg-bg px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors hover:border-white/20 focus:border-indigo-2"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-lg bg-indigo px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo/40 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "sent" && (
              <p className="text-center text-sm text-emerald-400">
                Message sent. I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-rose-400">
                Something went wrong. Check your EmailJS setup or email me directly at{" "}
                {profile.email}.
              </p>
            )}
          </form>

          <div className="mt-10 flex justify-center gap-8 border-t border-white/5 pt-8 text-sm font-medium text-slate-300">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
