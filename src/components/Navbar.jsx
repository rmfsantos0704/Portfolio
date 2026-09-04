import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Split the nav links so 2 sit on the left and 2 (including Contact) sit on the right,
  // with the logo centered between them — matching the reference layout.
  const half = Math.ceil(navLinks.length / 2);
  const leftLinks = navLinks.slice(0, half);
  const rightLinks = navLinks.slice(half);

  const NavLink = ({ link }) => (
    <Link
      to={link.href}
      className="group relative text-sm font-semibold uppercase tracking-wider text-slate-200 transition-colors hover:text-white"
    >
      {link.label}
      <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-indigo-2 transition-all duration-300 group-hover:w-full" />
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-bg/90 backdrop-blur">
      <nav className="mx-auto grid max-w-6xl grid-cols-2 items-center px-6 py-5 md:grid-cols-[1fr_auto_1fr] md:px-10">

        {/* Left links (desktop only) */}
        <div className="hidden w-full items-center justify-evenly md:flex">
          {leftLinks.map((link) => (
            <NavLink key={link.href} link={link} />
          ))}
        </div>

        {/* Logo, centered on desktop */}
        <Link
          to="/portfolio"
          className="group flex h-11 w-11 items-center justify-center justify-self-start rounded-full border border-white/15 font-display text-xl font-semibold tracking-tight text-white transition-all duration-300 hover:border-indigo-2/60 hover:shadow-[0_0_20px_-4px_rgba(91,79,245,0.6)] md:mx-10 md:justify-self-center"
        >
          RS<span className="text-indigo-2 transition-transform duration-300 inline-block group-hover:rotate-180">.</span>
        </Link>

        {/* Right links + Contact (desktop only) */}
        <div className="hidden w-full items-center justify-evenly md:flex">
          {rightLinks.map((link) => (
            <NavLink key={link.href} link={link} />
          ))}

          <Link
            to="/contact"
            className="rounded-lg border border-indigo-2/40 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-indigo-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-2 hover:bg-indigo-2/10 hover:text-indigo-300"
          >
            Contact
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="justify-self-end text-slate-200 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-bg px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-slate-200"
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold uppercase tracking-wider text-indigo-2"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}