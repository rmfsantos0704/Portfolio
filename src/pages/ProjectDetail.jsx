import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { projects } from "../data/content";
import Slideshow from "../components/Slideshow";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [id]);

  if (!project) return <Navigate to="/portfolio" replace />;

  const otherProjects = projects.filter((p) => p.id !== id);

  return (
    <>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 md:px-10">
        <Link
          to="/portfolio"
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors hover:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-all duration-200 group-hover:-translate-x-1 group-hover:border-indigo-2 group-hover:bg-indigo-2/10">
            <ArrowLeft size={14} />
          </span>
          Back to Portfolio
        </Link>
        <Link to="/portfolio" className="font-display text-lg font-semibold text-white/70 transition-colors hover:text-white">
          RS<span className="text-indigo-2">.</span>
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 md:px-10">
        <span
          className={`inline-block rounded-full border px-3 py-1 text-xs font-bold tracking-wider ${project.badgeColor} ${project.labelColor}`}
        >
          {project.label}
        </span>

        <h1 className="mt-6 font-display text-5xl font-semibold text-white sm:text-6xl md:text-7xl">
          {project.title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {project.description}
        </p>

        {/* Landing Page Button Moved Directly Below Description */}
        {project.id === "snowed" && (
          <div className="mt-6">
            <a
              href="https://snowed-landing.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-indigo-500/50 bg-indigo-500/10 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-indigo-500/20 hover:shadow-[0_0_20px_-5px_rgba(91,79,245,0.4)]"
            >
              <span>View Landing Page</span>
              <ExternalLink size={13} />
            </a>
          </div>
        )}

        <div className="mt-14">
          <Slideshow 
            images={project.screenshots} 
            alt={project.title} 
            deviceType={project.deviceType || "desktop"} 
          />
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_280px]">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-semibold text-white">
                <span className="text-indigo-2">01.</span> The Challenge
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{project.challenge}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-white">
                <span className="text-indigo-2">02.</span> The Solution
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{project.solution}</p>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-white/10 bg-surface p-6 space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Tech Stack
              </h3>
              <ul className="mt-4 space-y-3">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="group flex items-center gap-2 text-sm text-slate-200 transition-transform duration-150 hover:translate-x-1"
                  >
                    <Check size={14} className="text-emerald-400" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {project.id === "snowed" && (
              <div className="border-t border-white/10 pt-6">
                <a
                  href="https://snowed-landing.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
                >
                  <span>Visit SnowEd Landing</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            )}
          </aside>
        </div>

        {otherProjects.length > 0 && (
          <div className="mt-24 border-t border-white/5 pt-10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              More Work
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {otherProjects.map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.id}`}
                  className="group rounded-2xl border border-white/5 bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-2/40"
                >
                  <span className={`text-xs font-bold tracking-wider ${p.labelColor}`}>
                    {p.label}
                  </span>
                  <h4 className="mt-2 font-display text-xl font-semibold text-white transition-colors group-hover:text-indigo-2">
                    {p.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}