import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Video, Heart, Coins, Radio, Smartphone, Layers } from "lucide-react";
import { skills } from "../data/content";

const icons = {
  laravel: Video,
  tailwind: Heart,
  mysql: Coins,
  nfc: Radio,
  reactNative: Smartphone, // Added for Expo & React Native
  mern: Layers,
};

export default function Skills() {
  const scrollerRef = useRef(null);
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

  const scroll = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="skills" className="relative border-t border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <h2
          className={`text-center font-display text-3xl font-semibold tracking-wide text-white sm:text-4xl transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          EXPERTISE
        </h2>

        <div className="relative mt-14">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-surface p-2 text-slate-200 transition-all duration-200 hover:scale-110 hover:border-indigo-2 hover:bg-indigo-2/10 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>

          <div
            ref={scrollerRef}
            className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth px-2 py-2"
          >
            {skills.map((skill, i) => {
              const Icon = icons[skill.id];
              return (
                <div
                  key={skill.id}
                  className={`group w-72 shrink-0 rounded-2xl border border-white/5 bg-surface p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-indigo-2/30 hover:shadow-[0_20px_50px_-20px_rgba(91,79,245,0.4)] ${
                    visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
                >
                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${skill.accent}`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white transition-colors duration-200 group-hover:text-indigo-2">
                    {skill.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {skill.description}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full border border-white/15 bg-surface p-2 text-slate-200 transition-all duration-200 hover:scale-110 hover:border-indigo-2 hover:bg-indigo-2/10 hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}