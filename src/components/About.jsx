import { useEffect, useRef, useState } from "react";
import { Terminal, Layers, Smartphone } from "lucide-react";

export default function About() {
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

  const focusItems = [
    {
      icon: Terminal,
      iconBg: "bg-indigo-500/20",
      iconColor: "text-indigo-300",
      title: "The Environment",
      description:
        "Daily workflow powered by Windows 11, VS Code, Git Bash, and XAMPP for seamless local testing.",
    },
    {
      icon: Layers, // Changed from Cpu to Layers
      iconBg: "bg-violet-500/20",
      iconColor: "text-violet-300",
      title: "Full-Stack Systems", // Changed from Hardware Integration
      description:
        "Developing robust backends and dynamic front-ends that work together to simplify complex tasks and workflows.",
    },
    {
      icon: Smartphone,
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-300",
      title: "Mobile-First UIs",
      description:
        "Architecting mobile schedulers and utility apps designed specifically for native phone experiences.",
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-[1fr_400px]">

          {/* Left Column: The Story */}
          <div
            className={`transition-all duration-700 ease-out ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              Behind the Code
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted">
              <p
                className={`transition-all duration-700 ease-out delay-100 ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                I am a full-stack developer driven by a simple goal: building intuitive applications that make everyday life easier. My core focus is on creating digital solutions that streamline routines, eliminate friction, and bring genuine convenience directly to the people who use them.
              </p>
<p
                className={`transition-all duration-700 ease-out delay-200 ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                I believe that the best software feels effortless to use. By focusing on clean architecture and responsive, real-time features, I strive to turn complex background processes into simple, engaging interfaces that users can rely on to manage their tasks efficiently every single day.
              </p>
              <p
                className={`transition-all duration-700 ease-out delay-300 ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                To bring these ideas to life, I leverage a versatile technology stack. Whether I am building robust systems using the Laravel ecosystem or crafting fluid mobile experiences with the MERN stack and React Native with Expo, my goal is always to deliver seamless applications that put convenience right in the palm of your hand.
              </p>
            </div>
          </div>

          {/* Right Column: Workflow & Environment */}
          <div
            className={`flex flex-col justify-center gap-6 rounded-3xl border border-white/5 bg-surface p-8 shadow-xl transition-all duration-700 ease-out delay-150 hover:border-indigo-400/30 hover:shadow-[0_0_50px_-15px_rgba(99,102,241,0.4)] ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Development Focus
            </h3>

            {focusItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`group flex items-start gap-4 transition-all duration-500 ease-out ${
                    i > 0 ? "border-t border-white/5 pt-6" : ""
                  } ${visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
                  style={{ transitionDelay: visible ? `${300 + i * 120}ms` : "0ms" }}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 transition-colors duration-300 group-hover:text-white">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}