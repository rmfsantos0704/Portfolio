import { useState } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/content";
import { useCanvasWaves } from "../hooks/useCanvasWaves";
import WarpText from "./ui/WarpText";

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
    </svg>
  );
}

export default function Hero() {
  const [imgError, setImgError] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});
  const { canvasRef, handleMouseMove, handleMouseLeave } = useCanvasWaves();

  const handleImageMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = (-(e.clientY - rect.top - yc) / yc) * 12;
    const rotateY = ((e.clientX - rect.left - xc) / xc) * 12;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleImageMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-in-out",
    });
  };

  return (
    <section
      id="top"
      // Changed `items-start` to `items-center` here
      className="relative mx-auto flex h-[100dvh] w-full max-w-[90rem] flex-col items-center justify-center overflow-hidden px-8 py-24 font-mono sm:px-12 lg:px-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90" />

      {/* Changed `items-start` to `items-center` and `text-left` to `text-center` here */}
      <div className="relative z-10 flex max-h-full w-full max-w-4xl flex-col items-center justify-center text-center">
        {/* Logo */}
        <div
          className="group relative h-32 w-32 shrink-0 cursor-pointer sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-60 lg:w-60"
          onMouseMove={handleImageMouseMove}
          onMouseLeave={handleImageMouseLeave}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-8 animate-[spin_12s_linear_infinite] rounded-full border-2 border-indigo-500/30 shadow-[0_0_70px_rgba(91,79,245,0.3)] transition-all duration-500 group-hover:border-indigo-400/60 group-hover:shadow-[0_0_110px_rgba(91,79,245,0.6)]" />
          <div className="absolute inset-9 animate-[spin_16s_linear_infinite_reverse] rounded-full border border-indigo-300/20" />

          <div
            className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-transparent shadow-2xl"
            style={tiltStyle}
          >
            {!imgError ? (
              <img
                src="/Logo.png"
                alt={`${profile.firstName} ${profile.lastName} Logo`}
                className="h-full w-full object-contain scale-100 mix-blend-screen filter invert transition-transform duration-700 ease-out"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-mono text-3xl md:text-4xl text-slate-500 bg-slate-800">
                {profile.firstName[0]}
                {profile.lastName[0]}
              </div>
            )}
          </div>
        </div>

        {/* Small eyebrow label */}
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.4em] text-indigo-300/80 sm:text-sm">
          Full-Stack Developer
        </p>

{/* Animated name */}
        <div className="mt-3 h-24 w-full min-w-0 sm:h-28 md:h-32 lg:h-40">
          <WarpText
            text={`${profile.firstName} ${profile.lastName}`}
            className="h-full w-full"
            color="#ffffff" /* Changed from "#a5b4fc" to "#ffffff" */
            fontSize="clamp(2.75rem, 8vw, 5.5rem)"
            fontWeight={700}
            letterSpacing="-0.03em"
            textAlign="center"
          />
        </div>

        {/* Small subtitle */}
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-400 sm:text-sm">
          Laravel &middot; MERN &middot; Full-Stack
        </p>

        {/* Description */}
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300 line-clamp-3 sm:text-xl sm:line-clamp-none">
          {profile.tagline}
        </p>

        {/* Buttons - Changed `justify-start` to `justify-center` here */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          <Link
            to="/portfolio#projects"
            className="group relative overflow-hidden rounded-full border border-indigo-500/50 bg-indigo-500/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-indigo-500/20 hover:shadow-[0_0_30px_-5px_rgba(91,79,245,0.4)] sm:text-base"
          >
            Explore Work
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 sm:text-base"
          >
            <GithubIcon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 sm:h-6 sm:w-6" />
            GitHub
          </a>
          <Link
            to="/portfolio#contact"
            className="rounded-full border border-indigo-200/40 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-300 transition-all duration-300 hover:border-indigo-400 hover:text-white sm:text-base"
          >
            Hire Me
          </Link>
        </div>
      </div>
    </section>
  );
}