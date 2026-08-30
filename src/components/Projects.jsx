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
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <h2
          className={`relative inline-block font-display text-3xl font-semibold text-white sm:text-4xl transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span
            aria-hidden="true"
            className="absolute -left-[2px] top-0 text-cyan-400/70"
            style={{ clipPath: "inset(0 0 55% 0)" }}
          >
            Featured Work
          </span>
          <span className="relative">Featured Work</span>
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-surface transition-all duration-500 ease-out hover:-translate-y-2 hover:border-indigo-2/40 hover:shadow-[0_20px_60px_-20px_rgba(91,79,245,0.45)] ${
                visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: visible ? `${i * 150}ms` : "0ms" }}
            >
              <div
                className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient}`}
              >
                <span className="select-none font-display text-4xl font-semibold text-white/10 transition-transform duration-500 ease-out group-hover:scale-110">
                  {project.watermark}
                </span>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="p-5">
                <span
                  className={`inline-block rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-bold tracking-wider transition-colors duration-200 ${project.labelColor}`}
                >
                  {project.label}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-white transition-colors duration-200 group-hover:text-indigo-2">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 transition-colors duration-200 group-hover:text-white">
                    View Project
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-slate-200 transition-all duration-200 group-hover:translate-x-1 group-hover:border-indigo-2 group-hover:bg-indigo-2/15 group-hover:text-white">
                    <ChevronRight size={14} />
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