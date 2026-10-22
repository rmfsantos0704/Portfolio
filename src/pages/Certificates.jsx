import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { certificates } from "../data/content";

export default function Certificates() {
  const [activeCertificateIndex, setActiveCertificateIndex] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveCertificateIndex((prev) =>
      prev === null ? null : (prev - 1 + certificates.length) % certificates.length
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveCertificateIndex((prev) =>
      prev === null ? null : (prev + 1) % certificates.length
    );
  }, []);

  useEffect(() => {
    if (activeCertificateIndex === null) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveCertificateIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCertificateIndex, handlePrev, handleNext]);

  const currentCertificate =
    activeCertificateIndex !== null ? certificates[activeCertificateIndex] : null;

  return (
    <>
      <section id="certificates" className="relative min-h-screen w-full bg-[#060010] pb-24">
        {/* Back to Portfolio Button */}
        <a
          href="/portfolio"
          className={`fixed left-4 top-4 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur-md transition-all duration-700 hover:border-violet-400 hover:bg-violet-400/20 hover:text-white sm:left-6 sm:top-6 ${
            visible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
          }`}
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </a>

        {/* Header */}
        <div className="mx-auto max-w-4xl px-6 pb-12 pt-24 text-center sm:pt-28">
          <span
            className={`inline-block rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-bold tracking-wider text-violet-300 transition-all duration-700 ease-out ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            CERTIFICATIONS
          </span>

          <h1
            className={`mt-3 font-display text-4xl font-semibold text-white sm:text-5xl md:text-6xl transition-all duration-700 ease-out ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: visible ? "100ms" : "0ms" }}
          >
            Certificates
          </h1>

          <p
            className={`mt-2 text-base leading-relaxed text-slate-300 transition-all duration-700 ease-out ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: visible ? "200ms" : "0ms" }}
          >
            Click any certificate to view full size.
          </p>
        </div>

        {/* Static grid — flex-wrap + justify-center instead of CSS grid, so an
            incomplete last row (e.g. 10 items over 4 columns leaves 2) centers
            itself instead of sticking to the left like grid would. */}
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-4 px-6 sm:gap-5 lg:gap-6">
          {certificates.map((cert, index) => (
            <button
              key={cert.src}
              type="button"
              onClick={() => setActiveCertificateIndex(index)}
              className={`group relative aspect-[4/3] w-[calc((100%-1rem)/2)] overflow-hidden rounded-xl border border-white/10 bg-[#0b0b12] text-left transition-all duration-500 ease-out hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-[0_18px_40px_-15px_rgba(139,92,246,0.45)] focus-visible:-translate-y-1 focus-visible:border-violet-400/50 focus-visible:outline-none sm:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-4.5rem)/4)] ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: visible ? `${Math.min(index * 40, 400)}ms` : "0ms" }}
            >
              <img
                src={cert.src}
                alt={cert.title}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover opacity-80 saturate-[0.92] transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:saturate-100"
              />
              <span
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(6,0,16,0.55) 0%, rgba(6,0,16,0.15) 55%, transparent 100%)" }}
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-3 sm:p-4">
                <span className="truncate text-sm font-semibold text-white">{cert.title}</span>
                <span className="truncate text-xs font-medium text-violet-300">
                  {cert.issuer} · {cert.dateIssued}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Zoom / Lightbox Modal */}
      {currentCertificate && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${currentCertificate.title}`}
          onClick={() => setActiveCertificateIndex(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            aria-label="Close zoomed certificate"
            className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-slate-200 transition-all duration-200 hover:border-violet-400 hover:bg-violet-400/20 hover:text-white"
            onClick={() => setActiveCertificateIndex(null)}
          >
            <X size={22} />
          </button>

          {/* Previous Button */}
          <button
            type="button"
            aria-label="Previous certificate"
            className="absolute left-4 sm:left-8 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-slate-200 transition-all duration-200 hover:border-violet-400 hover:bg-violet-400/20 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
          >
            <ChevronLeft size={26} />
          </button>

          {/* Next Button */}
          <button
            type="button"
            aria-label="Next certificate"
            className="absolute right-4 sm:right-8 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-slate-200 transition-all duration-200 hover:border-violet-400 hover:bg-violet-400/20 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <ChevronRight size={26} />
          </button>

          {/* Image & Caption Container */}
          <div
            className="relative flex flex-col items-center max-h-[88vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentCertificate.src}
              alt={currentCertificate.title}
              className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl transition-all duration-300"
            />
            {currentCertificate.title && (
              <p className="mt-4 text-center font-display text-lg font-medium text-white/90">
                {currentCertificate.title}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}