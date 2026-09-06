import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./BubbleMenu.css";

const defaultItems = [
  { label: "home", href: "/portfolio#top", ariaLabel: "Home", rotation: -8, hoverStyles: { bgColor: "#6366f1", textColor: "#ffffff" } },
  { label: "about", href: "/portfolio#about", ariaLabel: "About", rotation: 8, hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" } },
  { label: "skills", href: "/portfolio#skills", ariaLabel: "Skills", rotation: -8, hoverStyles: { bgColor: "#06b6d4", textColor: "#ffffff" } },
  { label: "projects", href: "/portfolio#projects", ariaLabel: "Projects", rotation: 8, hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" } },
  { label: "certificates", href: "/portfolio#certificates", ariaLabel: "Certificates", rotation: 8, hoverStyles: { bgColor: "#ec4899", textColor: "#ffffff" } },
  { label: "contact", href: "/portfolio#contact", ariaLabel: "Contact", rotation: -8, hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" } },
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = "Toggle menu",
  menuBg = "#ffffff",
  menuContentColor = "#4f46e5",
  items = defaultItems,
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.12,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [randomRotations] = useState(() =>
    items.map((item) => item.rotation ?? Math.round((Math.random() * 15 - 7.5) * 10) / 10)
  );
  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!overlay || !bubbles.length) return undefined;

    if (isMenuOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 24, autoAlpha: 0 });
      bubbles.forEach((bubble, index) => {
        const timeline = gsap.timeline({ delay: index * staggerDelay + gsap.utils.random(-0.05, 0.05) });
        timeline.to(bubble, { scale: 1, duration: animationDuration, ease: animationEase });
        if (labels[index]) {
          timeline.to(labels[index], { y: 0, autoAlpha: 1, duration: animationDuration, ease: "power3.out" }, `-=${animationDuration * 0.9}`);
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, { y: 24, autoAlpha: 0, duration: 0.2, ease: "power3.in" });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          setShowOverlay(false);
        },
      });
    }

    return () => gsap.killTweensOf([...bubbles, ...labels]);
  }, [animationDuration, animationEase, isMenuOpen, showOverlay, staggerDelay]);

  return (
    <>
      <nav className={`bubble-menu fixed ${className || ""}`} style={style} aria-label="Main navigation">
        <div className="bubble-menu-bubble logo-bubble" aria-label="Logo" style={{ background: menuBg }}>
          {typeof logo === "string" ? <img src={logo} alt="Logo" className="bubble-logo" /> : logo}
        </div>
        <button
          type="button"
          className={`bubble-menu-bubble toggle-bubble ${isMenuOpen ? "open" : ""}`}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-expanded={isMenuOpen}
          style={{ background: menuBg }}
        >
          <span className="menu-line" style={{ background: menuContentColor }} />
          <span className="menu-line short" style={{ background: menuContentColor }} />
        </button>
      </nav>
      {showOverlay && (
        <div ref={overlayRef} className="bubble-menu-items fixed" aria-hidden={!isMenuOpen}>
          <ul className="pill-list" role="menu" aria-label="Menu links">
            {items.map((item, index) => (
              <li key={item.label} role="none" className="pill-col">
                <a
                  role="menuitem"
                  href={item.href}
                  aria-label={item.ariaLabel || item.label}
                  className="pill-link"
                  style={{
                    "--item-rot": `${randomRotations[index] ?? 0}deg`,
                    "--pill-bg": menuBg,
                    "--pill-color": menuContentColor,
                    "--hover-bg": item.hoverStyles?.bgColor || "#f3f4f6",
                    "--hover-color": item.hoverStyles?.textColor || menuContentColor,
                  }}
                  ref={(element) => { bubblesRef.current[index] = element; }}
                >
                  <span className="pill-label" ref={(element) => { labelRefs.current[index] = element; }}>
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}