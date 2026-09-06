import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";

export default function Slideshow({ images, alt, deviceType = "desktop", theme }) {
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const total = images.length;
  const isMobile = deviceType === "mobile";

  const goTo = useCallback(
    (next) => {
      setIndex(() => (next + total) % total);
    },
    [total]
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <div
      ref={containerRef}
      className="project-slideshow group/frame relative overflow-hidden rounded-2xl border bg-surface-2 transition-shadow duration-300 data-[fs=true]:flex data-[fs=true]:h-screen data-[fs=true]:flex-col data-[fs=true]:justify-center data-[fs=true]:rounded-none data-[fs=true]:bg-bg"
      data-fs={isFullscreen}
      style={{ borderColor: `${theme.accent}66`, boxShadow: `0 0 60px -20px ${theme.accent}66` }}
    >
      {/* fake browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-surface px-4 py-3" style={{ backgroundColor: theme.surface }}>
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: theme.accent }} />
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: theme.secondary }} />
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: theme.highlight }} />
      </div>

      <div className="relative flex min-h-[420px] items-center justify-center px-6 py-10 sm:min-h-[520px]" style={{ backgroundColor: theme.backdrop }}>
        {/* prev / next arrows */}
        <button
          onClick={prev}
          aria-label="Previous screenshot"
          className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-black/40 text-slate-200 opacity-70 backdrop-blur transition-all duration-200 hover:scale-110 hover:bg-black/70 hover:text-white hover:opacity-100 sm:left-8"
          style={{ borderColor: `${theme.accent}88` }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dynamic container based on deviceType */}
        <div
          className={`relative w-full overflow-hidden border-4 shadow-2xl transition-transform duration-300 group-hover/frame:scale-[1.02] ${
            isMobile
              ? "max-w-[280px] rounded-[2rem] sm:max-w-[320px]"
              : "max-w-4xl rounded-xl"
          }`}
          style={{ borderColor: `${theme.accent}88` }}
        >
          <img
  key={images[index]}
  src={images[index]}
  alt={`${alt} screenshot ${index + 1}`}
  className={`w-full animate-[fadeIn_0.3s_ease] bg-black ${
    isMobile 
      ? "aspect-[9/19.5] object-cover" 
      : "aspect-video object-contain" // <-- Changed to object-contain for desktop
  }`}
/>
        </div>

        <button
          onClick={next}
          aria-label="Next screenshot"
          className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-black/40 text-slate-200 opacity-70 backdrop-blur transition-all duration-200 hover:scale-110 hover:bg-black/70 hover:text-white hover:opacity-100 sm:right-8"
          style={{ borderColor: `${theme.accent}88` }}
        >
          <ChevronRight size={20} />
        </button>

        {/* counter */}
          <span className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold backdrop-blur" style={{ color: theme.highlight }}>
          {index + 1} / {total}
        </span>

        {/* fullscreen toggle */}
        <button
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
          className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-slate-200 backdrop-blur transition-all duration-200 hover:scale-110 hover:bg-black/70 hover:text-white"
          style={{ color: theme.highlight }}
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

      {/* dot indicators */}
      <div className="flex items-center justify-center gap-2 border-t border-white/5 bg-surface py-4" style={{ backgroundColor: theme.surface }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to screenshot ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6" : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
            style={i === index ? { backgroundColor: theme.accent } : undefined}
          />
        ))}
      </div>
    </div>
  );
}