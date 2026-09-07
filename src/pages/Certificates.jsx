import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { certificates } from "../data/content";
import DriftWall from "../components/ui/DriftWall";

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
      <section id="certificates" className="relative h-screen w-screen overflow-hidden bg-[#060010]">
        {/* Floating Header */}
        <div className="pointer-events-none absolute left-0 right-0 top-10 z-10 mx-auto max-w-4xl px-6 text-center">
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

        {/* 100% Canvas Drift Wall */}
        <div className="h-full w-full">
          <DriftWall
            items={certificates.map((cert, index) => ({
              image: cert.src,
              title: cert.title,
              index,
            }))}
            columns={5}
            tileWidth={280}
            tileHeight={190}
            gap={22}
            tilt={14}
            turn={-12}
            speed={38}
            lift={70}
            overlayColor="#060010"
            onTileClick={(item) => setActiveCertificateIndex(item.index)}
          />
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