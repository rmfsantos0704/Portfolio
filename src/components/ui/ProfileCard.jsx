import { useEffect, useRef } from "react";
import "./ProfileCard.css";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function ProfileCard({
  avatarUrl = "/russel-profile.jpg",
  name = "Russel Santos",
  title = "Full-Stack Developer",
  handle = "rmfsantos0704",
  status = "Available for work",
  contactText = "Contact Me",
  innerGradient = "linear-gradient(145deg, rgba(91,79,245,.55), rgba(34,211,238,.12) 58%, rgba(9,12,20,.94))",
  onContactClick,
  enableTilt = true,
  className = ""
}) {
  const wrapperRef = useRef(null);
  const shellRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const shell = shellRef.current;
    if (!wrapper || !shell || !enableTilt) return undefined;

    const handlePointerMove = (event) => {
      const rect = shell.getBoundingClientRect();
      const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
      const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
      const rotateX = (50 - y) / 8;
      const rotateY = (x - 50) / 8;

      wrapper.style.setProperty("--pointer-x", `${x}%`);
      wrapper.style.setProperty("--pointer-y", `${y}%`);
      wrapper.style.setProperty("--rotate-x", `${rotateX}deg`);
      wrapper.style.setProperty("--rotate-y", `${rotateY}deg`);
      wrapper.classList.add("is-active");
    };

    const resetTilt = () => {
      wrapper.style.setProperty("--pointer-x", "50%");
      wrapper.style.setProperty("--pointer-y", "50%");
      wrapper.style.setProperty("--rotate-x", "0deg");
      wrapper.style.setProperty("--rotate-y", "0deg");
      wrapper.classList.remove("is-active");
    };

    shell.addEventListener("pointermove", handlePointerMove);
    shell.addEventListener("pointerleave", resetTilt);
    return () => {
      shell.removeEventListener("pointermove", handlePointerMove);
      shell.removeEventListener("pointerleave", resetTilt);
    };
  }, [enableTilt]);

  return (
    <div
      ref={wrapperRef}
      className={`profile-card-wrapper ${className}`.trim()}
      style={{ "--inner-gradient": innerGradient }}
    >
      <div className="profile-card-glow" />
      <div ref={shellRef} className="profile-card-shell">
        <article ref={frameRef} className="profile-card">
          <div className="profile-card-overlay" />
          <img className="profile-card-avatar" src={avatarUrl} alt={`${name} portrait`} />
          <div className="profile-card-details">
            <p className="profile-card-title">{title}</p>
            <h2>{name}</h2>
          </div>
          <div className="profile-card-info">
            <div>
              <p className="profile-card-handle">@{handle}</p>
              <p className="profile-card-status"><span />{status}</p>
            </div>
            <button type="button" onClick={onContactClick}>{contactText}</button>
          </div>
        </article>
      </div>
    </div>
  );
}
