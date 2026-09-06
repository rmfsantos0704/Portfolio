import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { projects } from "../data/content";

export default function Projects() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <h2
          className={`relative inline-block font-display text-4xl font-semibold text-white sm:text-5xl transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span
            aria-hidden="true"
            className="absolute -left-[2px] top-0 text-violet-400/70"
            style={{ clipPath: "inset(0 0 55% 0)" }}
          >
            Featured Work
          </span>
          <span className="relative">Featured Work</span>
        </h2>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-surface transition-all duration-500 ease-out hover:-translate-y-2 hover:border-indigo-2/40 hover:shadow-[0_20px_60px_-20px_rgba(91,79,245,0.45)] ${
                visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: visible ? `${i * 150}ms` : "0ms",
                borderColor: `${project.theme.accent}55`,
                boxShadow: `0 20px 60px -28px ${project.theme.accent}66`,
              }}
            >
              <div
                className="relative flex h-52 items-center justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${project.theme.surface}, ${project.theme.backdrop} 65%, ${project.theme.accent})`,
                }}
              >
                {project.logo ? (
                  <img
                    src={project.logo}
                    alt={`${project.title} logo`}
                    className="h-28 w-28 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out group-hover:scale-110"
                    onError={(e) => {
                      // Falls back to the text watermark if the logo file isn't in place yet
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "block";
                    }}
                  />
                ) : null}
                <span
                  className="select-none font-display text-6xl font-semibold transition-transform duration-500 ease-out group-hover:scale-110"
                  style={{
                    color: project.theme.highlight,
                    opacity: 0.28,
                    display: project.logo ? "none" : "block",
                  }}
                >
                  {project.watermark}
                </span>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="p-8">
                <span
                  className={`inline-block rounded-full border border-white/10 px-3 py-1.5 text-xs font-bold tracking-wider transition-colors duration-200 ${project.labelColor}`}
                >
                  {project.label}
                </span>
                <h3
                  className="mt-4 font-display text-2xl font-semibold text-white transition-colors duration-200"
                  style={{ color: project.theme.highlight }}
                >
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-white/5 pt-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors duration-200 group-hover:text-white">
                    View Project
                  </span>
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border text-slate-200 transition-all duration-200 group-hover:translate-x-1 group-hover:text-white"
                    style={{ borderColor: `${project.theme.accent}88`, color: project.theme.accent }}
                  >
                    <ChevronRight size={18} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}