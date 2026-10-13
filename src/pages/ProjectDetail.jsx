import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { projects } from "../data/content";
import Slideshow from "../components/Slideshow";

// Perceived brightness (WCAG relative luminance) of a hex color, 0 (black) to
// 1 (white) — used to decide whether text sitting on a themed surface should
// be light or dark.
function getLuminance(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  const [rl, gl, bl] = [r, g, b].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
    </svg>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [id]);

  if (!project) return <Navigate to="/portfolio" replace />;

  const otherProjects = projects.filter((p) => p.id !== id);
  const hasLink = Boolean(project.link);
  const hasRepo = Boolean(project.repo);

  // Every project's colorscheme lives in its `theme` object in content.js.
  // `accent` drives highlights (buttons, hovers, the "0X." numbers' sibling
  // elements); `pageBackground`/`pageSurface`/`pageText`/`pageMuted` drive the
  // actual page look (body background, card surfaces, body/muted text) so
  // each project's detail page reads as its own color scheme, not one
  // global dark theme reused everywhere.
  const theme = project.theme || {};
  const accent = theme.accent || "#5b4ff5";
  const pageBackground = theme.pageBackground || "#05070d";
  const pageSurface = theme.pageSurface || "#0f1320";
  const pageText = theme.pageText || "#f5f6fa";
  const pageMuted = theme.pageMuted || "#9aa3b8";

  // `pageText`/`pageMuted` are tuned to read against `pageBackground` (often
  // dark). Some themes (Booknight) use a LIGHT `pageSurface` for cards — if we
  // keep using `pageText` there it's near-invisible (light-on-light). So any
  // text drawn on top of a *surface* (the sidebar, "More Work" cards) picks a
  // dark color when the surface is light, using the theme's own darker
  // accent tones (`title`/`secondary`) rather than a generic gray, so it
  // still matches that project's color scheme.
  const surfaceTextFor = (surfaceHex, t) => {
    const isLight = getLuminance(surfaceHex) > 0.6;
    return {
      text: isLight ? t.title || t.accent || "#1f2937" : t.pageText || pageText,
      muted: isLight ? t.secondary || t.accent || "#4b5563" : t.pageMuted || pageMuted,
    };
  };
  const { text: surfaceText, muted: surfaceMuted } = surfaceTextFor(pageSurface, theme);

  return (
    <div style={{ backgroundColor: pageBackground, color: pageText }} className="min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 md:px-10">
        <Link
          to="/portfolio"
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors"
          style={{ color: pageMuted }}
          onMouseEnter={(e) => (e.currentTarget.style.color = pageText)}
          onMouseLeave={(e) => (e.currentTarget.style.color = pageMuted)}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 group-hover:-translate-x-1"
            style={{ borderColor: `${pageText}26` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${accent}80`;
              e.currentTarget.style.backgroundColor = `${accent}1a`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${pageText}26`;
              e.currentTarget.style.backgroundColor = "";
            }}
          >
            <ArrowLeft size={14} />
          </span>
          Back to Portfolio
        </Link>
        <Link
          to="/portfolio"
          className="font-display text-lg font-semibold transition-colors"
          style={{ color: `${pageText}b3` }}
          onMouseEnter={(e) => (e.currentTarget.style.color = pageText)}
          onMouseLeave={(e) => (e.currentTarget.style.color = `${pageText}b3`)}
        >
          RS<span style={{ color: accent }}>.</span>
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 md:px-10">
        <span
          className={`inline-block rounded-full border px-3 py-1 text-xs font-bold tracking-wider ${project.badgeColor} ${project.labelColor}`}
        >
          {project.label}
        </span>

        <h1
          className="mt-6 font-display text-5xl font-semibold sm:text-6xl md:text-7xl"
          style={{ color: pageText }}
        >
          {project.title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: pageMuted }}>
          {project.description}
        </p>

        {/* Live site / GitHub buttons — shown for any project that has a link and/or repo field */}
        {(hasLink || hasRepo) && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {hasLink && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold backdrop-blur-sm transition-all duration-300"
                style={{
                  border: `1px solid ${accent}80`,
                  backgroundColor: `${accent}1a`,
                  color: pageText,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${accent}33`;
                  e.currentTarget.style.boxShadow = `0 0 20px -5px ${accent}66`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${accent}1a`;
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <span>Visit Live Site</span>
                <ExternalLink size={13} />
              </a>
            )}
            {hasRepo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold backdrop-blur-sm transition-all duration-300"
                style={{
                  border: `1px solid ${pageText}33`,
                  backgroundColor: `${pageText}0d`,
                  color: pageText,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${pageText}1a`)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = `${pageText}0d`)}
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        )}

        <div className="mt-14">
          <Slideshow
            images={project.screenshots}
            alt={project.title}
            deviceType={project.deviceType || "desktop"}
            theme={project.theme}
          />
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_280px]">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-semibold" style={{ color: pageText }}>
                <span className={project.labelColor}>01.</span> The Challenge
              </h2>
              <p className="mt-3 leading-relaxed" style={{ color: pageMuted }}>
                {project.challenge}
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold" style={{ color: pageText }}>
                <span className={project.labelColor}>02.</span> The Solution
              </h2>
              <p className="mt-3 leading-relaxed" style={{ color: pageMuted }}>
                {project.solution}
              </p>
            </div>

            {project.sdlc && project.sdlc.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold" style={{ color: pageText }}>
                  <span className={project.labelColor}>03.</span> Development Process (SDLC)
                </h2>
                <ol
                  className="mt-6 space-y-6 border-l pl-6"
                  style={{ borderColor: `${pageText}26` }}
                >
                  {project.sdlc.map((step, idx) => (
                    <li key={step.phase} className="relative">
                      <span
                        className="absolute -left-[1.95rem] flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ backgroundColor: accent }}
                      >
                        {idx + 1}
                      </span>
                      <h3
                        className="text-sm font-bold uppercase tracking-wider"
                        style={{ color: pageText }}
                      >
                        {step.phase}
                      </h3>
                      <p className="mt-1 leading-relaxed" style={{ color: pageMuted }}>
                        {step.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <aside
            className="h-fit rounded-2xl border p-6 space-y-6"
            style={{ borderColor: `${surfaceMuted}33`, backgroundColor: pageSurface }}
          >
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: surfaceMuted }}
              >
                Tech Stack
              </h3>
              <ul className="mt-4 space-y-3">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="group flex items-center gap-2 text-sm transition-transform duration-150 hover:translate-x-1"
                    style={{ color: surfaceText }}
                  >
                    <Check size={14} className={project.labelColor} />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {(hasLink || hasRepo) && (
              <div
                className="space-y-3 border-t pt-6"
                style={{ borderColor: `${surfaceMuted}33` }}
              >
                {hasLink && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold text-white transition-colors"
                    style={{ backgroundColor: accent, boxShadow: `0 10px 20px -5px ${accent}33` }}
                    onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.filter = "")}
                  >
                    <span>Visit {project.title}</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                {hasRepo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-bold transition-colors"
                    style={{ borderColor: `${surfaceMuted}4d`, color: surfaceText }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${surfaceMuted}80`;
                      e.currentTarget.style.backgroundColor = `${surfaceMuted}1a`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${surfaceMuted}4d`;
                      e.currentTarget.style.backgroundColor = "";
                    }}
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>View on GitHub</span>
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>

        {otherProjects.length > 0 && (
          <div className="mt-24 border-t pt-10" style={{ borderColor: `${pageText}0d` }}>
            <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: pageMuted }}>
              More Work
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {otherProjects.map((p) => {
                const pTheme = p.theme || {};
                const pAccent = pTheme.accent || "#5b4ff5";
                const pSurface = pTheme.pageSurface || pageSurface;
                // Each card uses ITS OWN project's surface + a contrast-checked
                // text color (dark accent tones on a light surface like
                // Booknight's paper, light pageText on a dark surface) so the
                // title is always readable and still matches that project's
                // color scheme.
                const { text: pSurfaceText, muted: pSurfaceMuted } = surfaceTextFor(
                  pSurface,
                  pTheme
                );

                return (
                  <Link
                    key={p.id}
                    to={`/projects/${p.id}`}
                    className="group rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1"
                    style={{ borderColor: `${pSurfaceMuted}33`, backgroundColor: pSurface }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${pAccent}66`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${pSurfaceMuted}33`;
                    }}
                  >
                    <span className={`text-xs font-bold tracking-wider ${p.labelColor}`}>
                      {p.label}
                    </span>
                    <h4
                      className="mt-2 font-display text-xl font-semibold transition-colors"
                      style={{ color: pSurfaceText }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = pAccent)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = pSurfaceText)}
                    >
                      {p.title}
                    </h4>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}