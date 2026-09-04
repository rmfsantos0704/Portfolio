import { useCallback, useEffect, useRef, useState } from "react";
import "./OptionWheel.css";

export default function OptionWheel({
  items = [],
  defaultSelected = 0,
  onChange,
  textColor = "#8a93a6",
  activeColor = "#ffffff",
  side = "left",
  fontSize = 2.1,
  spacing = 1.45,
  curve = 0.9,
  tilt = 6,
  blur = 1.5,
  fade = 0.2,
  minOpacity = 0.08,
  smoothing = 180,
  inset = 12,
  loop = false,
  draggable = true,
  className = ""
}) {
  const rootRef = useRef(null);
  const itemRefs = useRef([]);
  const positionRef = useRef(defaultSelected);
  const targetRef = useRef(defaultSelected);
  const frameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const dragRef = useRef(null);
  const dragMovedRef = useRef(false);
  const selectedRef = useRef(defaultSelected);
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
  const [isDragging, setIsDragging] = useState(false);

  const applyFrame = useCallback((now) => {
    const elapsed = Math.min((now - lastTimeRef.current) / 1000, 0.05);
    lastTimeRef.current = now;
    const rowHeight = Math.max(fontSize * spacing * 16, 1);
    const factor = 1 - Math.exp(-elapsed / Math.max(smoothing, 1) * 1000);
    const next = positionRef.current + (targetRef.current - positionRef.current) * factor;
    const settled = Math.abs(targetRef.current - next) < 0.001;
    positionRef.current = settled ? targetRef.current : next;

    const radius = tilt > 0 ? rowHeight / ((tilt * Math.PI) / 180) : 0;
    itemRefs.current.forEach((element, index) => {
      if (!element) return;
      let distance = index - positionRef.current;
      if (loop && items.length > 1) {
        distance = ((distance % items.length) + items.length) % items.length;
        if (distance > items.length / 2) distance -= items.length;
      }
      const absoluteDistance = Math.abs(distance);
      const angle = radius ? Math.max(-Math.PI / 2, Math.min(Math.PI / 2, distance * ((tilt * Math.PI) / 180))) : 0;
      const x = radius ? -(side === "right" ? -1 : 1) * radius * (1 - Math.cos(angle)) * curve : 0;
      const y = radius ? radius * Math.sin(angle) : distance * rowHeight;
      const rotation = radius ? ((side === "right" ? -1 : 1) * angle * 180) / Math.PI : 0;

      element.style.transform = `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rotation.toFixed(2)}deg)`;
      element.style.opacity = String(Math.max(minOpacity, 1 - absoluteDistance * fade));
      element.style.filter = blur > 0 ? `blur(${(absoluteDistance * blur).toFixed(2)}px)` : "none";
      element.style.setProperty("--ow-progress", Math.max(0, 1 - Math.min(absoluteDistance, 1)).toFixed(4));
    });

    frameRef.current = settled ? null : requestAnimationFrame(applyFrame);
  }, [blur, curve, fade, fontSize, items.length, loop, minOpacity, side, smoothing, spacing, tilt]);

  const startFrame = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    lastTimeRef.current = performance.now();
    frameRef.current = requestAnimationFrame(applyFrame);
  }, [applyFrame]);

  const select = useCallback((value, snap = true) => {
    const lastIndex = Math.max(items.length - 1, 0);
    const nextTarget = loop ? value : Math.min(Math.max(value, 0), lastIndex);
    targetRef.current = snap ? Math.round(nextTarget) : nextTarget;
    const nextIndex = ((Math.round(targetRef.current) % items.length) + items.length) % items.length;
    if (nextIndex !== selectedRef.current && items[nextIndex]) {
      selectedRef.current = nextIndex;
      setSelectedIndex(nextIndex);
      onChange?.(nextIndex, items[nextIndex]);
    }
    startFrame();
  }, [items, loop, onChange, startFrame]);

  useEffect(() => {
    if (!items.length) return undefined;
    select(Math.min(defaultSelected, items.length - 1), false);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [defaultSelected, items.length, select]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const handleWheel = (event) => {
      event.preventDefault();
      const rowHeight = Math.max(fontSize * spacing * 16, 1);
      const direction = event.deltaY / rowHeight;
      select(targetRef.current + Math.max(-1, Math.min(1, direction)), false);
    };
    root.addEventListener("wheel", handleWheel, { passive: false });
    return () => root.removeEventListener("wheel", handleWheel);
  }, [fontSize, select, spacing]);

  const handlePointerDown = (event) => {
    if (!draggable) return;
    dragRef.current = { startY: event.clientY, startValue: targetRef.current, pointerId: event.pointerId };
    dragMovedRef.current = false;
    setIsDragging(true);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current) return;
    const rowHeight = Math.max(fontSize * spacing * 16, 1);
    const delta = event.clientY - dragRef.current.startY;
    if (Math.abs(delta) > 4) dragMovedRef.current = true;
    if (dragMovedRef.current) {
      rootRef.current?.setPointerCapture(dragRef.current.pointerId);
      select(dragRef.current.startValue - delta / rowHeight, false);
    }
  };

  const handlePointerEnd = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setIsDragging(false);
    if (dragMovedRef.current) select(targetRef.current, true);
  };

  const handleKeyDown = (event) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowLeft" && event.key !== "ArrowDown" && event.key !== "ArrowRight") return;
    event.preventDefault();
    select(Math.round(targetRef.current) + (event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 1));
  };

  return (
    <div
      ref={rootRef}
      role="listbox"
      tabIndex={0}
      aria-label="Skills"
      className={`option-wheel${side === "right" ? " option-wheel--right" : ""}${isDragging ? " option-wheel--dragging" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--ow-text-color": textColor, "--ow-active-color": activeColor, "--ow-font-size": `${fontSize}rem`, "--ow-inset": `${inset}px` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onKeyDown={handleKeyDown}
    >
      {items.map((item, index) => (
        <button
          key={`${item}-${index}`}
          ref={(element) => { itemRefs.current[index] = element; }}
          type="button"
          role="option"
          aria-selected={selectedIndex === index}
          className={`option-wheel__item${selectedIndex === index ? " option-wheel__item--selected" : ""}`}
          onClick={() => !dragMovedRef.current && select(index)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
