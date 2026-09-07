import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, Check, Copy, ArrowLeft } from "lucide-react";
import { profile } from "../data/content";
import ReflectiveCard from "@/components/ui/Reflectivecard";

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM2.75 9.75h4.46V21H2.75V9.75Zm7.25 0h4.28v1.54h.06c.6-1.1 2.06-2.26 4.24-2.26 4.53 0 5.37 2.98 5.37 6.86V21h-4.46v-4.54c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39V21H10V9.75Z" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
    </svg>
  );
}

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [isLoaded, setIsLoaded] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleCopyEmail = () => {
    const emailToCopy = profile.email || "santosrussel0704@gmail.com";
    navigator.clipboard.writeText(emailToCopy);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("09451191938");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
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
      const fullName = `${form.firstName} ${form.lastName}`.trim();

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: fullName,
          first_name: form.firstName,
          last_name: form.lastName,
          from_email: form.email,
          message: form.message,
          to_email: profile.email,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("sent");
      setForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const fullName = `${form.firstName} ${form.lastName}`.trim();

  return (
    <section id="contact" className="relative min-h-[100dvh] border-t border-white/5 py-14 overflow-hidden">
      {/* Fixed Back to Portfolio Button on Top-Left of the Screen */}
      <div
        className={`fixed top-6 left-6 z-50 transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <a
          href="/portfolio"
          className="group flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-md transition-all hover:border-violet-400 hover:bg-white/10 hover:text-white shadow-lg"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
        </a>
      </div>

      <div className="mx-auto grid min-h-[calc(100dvh-7rem)] max-w-7xl items-center gap-10 px-6 md:grid-cols-[minmax(0,1fr)_23rem] md:px-10 lg:gap-20">
        <div className="w-full">
          {/* Header Animation */}
          <div
            className={`transition-all duration-700 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
            }`}
          >
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-base text-muted">
              Have a project in mind?
            </p>
          </div>

          <form id="contact-form" onSubmit={handleSubmit} className="mt-12 w-full">
            <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
              {/* Left Side: Contact Details & Social Links */}
              <div
                className={`flex flex-col justify-between space-y-6 transition-all duration-700 delay-150 ease-out ${
                  isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-violet-400">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone</p>
                      <div className="flex items-center gap-2">
                        <a href="tel:09451191938" className="text-sm font-medium hover:text-white transition-colors">
                          09451191938
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyPhone}
                          title="Copy Phone Number"
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          {copiedPhone ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-violet-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</p>
                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${profile.email || "santosrussel0704@gmail.com"}`}
                          className="text-sm font-medium hover:text-white transition-colors break-all"
                        >
                          {profile.email || "santosrussel0704@gmail.com"}
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          title="Copy Email"
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Connect
                  </p>
                  <div className="flex items-center gap-3" aria-label="Social links">
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      title="GitHub"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-all duration-200 hover:-translate-y-1 hover:border-violet-400 hover:text-white"
                    >
                      <GithubIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      title="LinkedIn"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-all duration-200 hover:-translate-y-1 hover:border-violet-400 hover:text-white"
                    >
                      <LinkedinIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                    <a
                      href={profile.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      title="Facebook"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-all duration-200 hover:-translate-y-1 hover:border-violet-400 hover:text-white"
                    >
                      <FacebookIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side: Text Fields */}
              <div
                className={`space-y-6 transition-all duration-700 delay-300 ease-out ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Your First Name"
                      className="w-full rounded-lg border border-white/10 bg-bg px-4 py-3 text-base text-white placeholder-slate-500 outline-none transition-colors hover:border-white/20 focus:border-indigo-2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Your Last Name"
                      className="w-full rounded-lg border border-white/10 bg-bg px-4 py-3 text-base text-white placeholder-slate-500 outline-none transition-colors hover:border-white/20 focus:border-indigo-2"
                    />
                  </div>
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
                    className="w-full rounded-lg border border-white/10 bg-bg px-4 py-3 text-base text-white placeholder-slate-500 outline-none transition-colors hover:border-white/20 focus:border-indigo-2"
                  />
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
                    className="w-full resize-none rounded-lg border border-white/10 bg-bg px-4 py-3 text-base text-white placeholder-slate-500 outline-none transition-colors hover:border-white/20 focus:border-indigo-2"
                  />
                </div>

                {status === "sent" && (
                  <p className="text-center text-sm text-emerald-400">
                    Message sent. I&apos;ll get back to you soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-center text-sm text-rose-400">
                    Something went wrong. Check your EmailJS setup or email me directly at{" "}
                    {profile.email || "santosrussel0704@gmail.com"}.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Reflective Card & Button Animation */}
        <div
          className={`flex flex-col items-center md:sticky md:top-24 transition-all duration-700 delay-450 ease-out ${
            isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
          }`}
        >
          <ReflectiveCard
            name={fullName ? fullName.toUpperCase() : "YOUR NAME"}
            title={form.email.trim() || "your@email.com"}
            idNumber="RS-0704-DEV"
            idLabel="DEVELOPER ID"
            badgeLabel="AVAILABLE FOR WORK"
            grayscale={0}
          />

          <button
            type="submit"
            form="contact-form"
            disabled={status === "sending"}
            className="mt-6 w-full max-w-[23rem] rounded-lg bg-indigo px-6 py-4 text-base font-bold text-white shadow-lg shadow-indigo/40 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </section>
  );
}