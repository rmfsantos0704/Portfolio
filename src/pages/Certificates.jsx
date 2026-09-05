import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { certificates } from "../data/content";
import DepthCarousel from "../components/ui/DepthCarousel";

export default function Certificates() {
  const [zoomedCertificate, setZoomedCertificate] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Trigger the entrance animation on the next frame so the initial
    // opacity-0/translate state actually paints before transitioning.
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!zoomedCertificate) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setZoomedCertificate(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoomedCertificate]);

  return (
    <>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 md:px-10">
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        <span
          className={`inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold tracking-wider text-cyan-300 transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          CERTIFICATIONS
        </span>

        <h1
          className={`mt-6 font-display text-5xl font-semibold text-white sm:text-6xl md:text-7xl transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: visible ? "100ms" : "0ms" }}
        >
          Certificates
        </h1>

        <p
          className={`mt-6 max-w-2xl text-lg leading-relaxed text-muted transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: visible ? "200ms" : "0ms" }}
        >
          A collection of certifications from courses and training I've completed. Click any certificate to view it full-size.
        </p>

        <div
          className={`mt-14 transition-all duration-700 ease-out ${
            visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          style={{ transitionDelay: visible ? "350ms" : "0ms" }}
        >
          <DepthCarousel
            items={certificates.map((cert) => ({ image: cert.src, alt: cert.title }))}
            cardWidth={560}
            cardHeight={400}
            radius={12}
            tint="#090c14"
            depth={180}
            spread={76}
            tilt={18}
            visibleCards={3}
            blur={4}
            onZoom={(certificate) => setZoomedCertificate(certificate)}
            className="certificates-carousel"
          />
        </div>

      </main>

      {zoomedCertificate && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${zoomedCertificate.alt}`}
          onClick={() => setZoomedCertificate(null)}
        >
          <button
            type="button"
            aria-label="Close zoomed certificate"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-200 transition-all duration-200 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-white"
            onClick={() => setZoomedCertificate(null)}
          >
            <X size={20} />
          </button>
          <img
            src={zoomedCertificate.image}
            alt={zoomedCertificate.alt}
            className="max-h-[90vh] max-w-full object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}