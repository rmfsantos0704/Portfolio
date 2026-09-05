import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Video, Heart, Coins, Radio, Smartphone, Layers, Award } from "lucide-react";
import { skills } from "../data/content";
import SpotlightCard from "./ui/SpotlightCard";
import OptionWheel from "./ui/OptionWheel";

const icons = {
  laravel: Video,
  tailwind: Heart,
  mysql: Coins,
  nfc: Radio,
  reactNative: Smartphone, // Added for Expo & React Native
  mern: Layers,
};

export default function Skills() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const skillOptions = useMemo(() => skills.map((skill) => skill.title), []);
  const handleSkillChange = useCallback((index) => setSelectedIndex(index), []);

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

  const selectedSkill = skills[selectedIndex] ?? skills[0];
  const SelectedIcon = icons[selectedSkill.id];

  return (
    <section ref={sectionRef} id="skills" className="relative flex min-h-[100dvh] items-center border-t border-white/5 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-center gap-5">
          <h2
            className={`text-center font-display text-4xl font-semibold tracking-wide text-white transition-all duration-700 ease-out sm:text-5xl lg:text-6xl ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            EXPERTISE
          </h2>

        </div>

        <div className="mt-12 grid min-h-[32rem] items-center gap-12 md:grid-cols-[minmax(20rem,0.85fr)_minmax(0,1.15fr)] lg:mt-16 lg:gap-28">
          <div
            className={`transition-all duration-700 ease-out ${
              visible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <p className="mb-5 px-3 font-mono text-sm font-semibold uppercase tracking-[0.25em] text-violet-300/70">
              Skills
            </p>
            <OptionWheel
              items={skillOptions}
              defaultSelected={2}
              onChange={handleSkillChange}
              textColor="#64748b"
              activeColor="#ffffff"
              side="left"
              fontSize={3.1}
              spacing={1.45}
              curve={0.9}
              tilt={6}
              blur={1.5}
              fade={0.2}
              inset={12}
            />
          </div>

          <SpotlightCard
            className={`min-h-[22rem] border-white/5 bg-surface p-10 transition-all duration-700 ease-out lg:p-14 ${
              visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
            spotlightColor="rgba(167, 139, 250, 0.24)"
          >
            <div className={`mb-9 flex h-20 w-20 items-center justify-center rounded-2xl ${selectedSkill.accent}`}>
              <SelectedIcon size={36} />
            </div>
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-violet-300/70">
              Capability {selectedIndex + 1} / {skills.length}
            </p>
            <h3 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              {selectedSkill.title}
            </h3>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl lg:text-2xl">
              {selectedSkill.description}
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}