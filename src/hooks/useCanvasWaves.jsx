import { useEffect, useRef } from "react";

class Particle {
  constructor(canvas, x, y, directionX, directionY, size, color) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.baseSize = size;
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(ctx, mouse) {
    if (this.x > this.canvas.width || this.x < 0) this.directionX = -this.directionX;
    if (this.y > this.canvas.height || this.y < 0) this.directionY = -this.directionY;
    this.x += this.directionX;
    this.y += this.directionY;

    // Mouse repulsion + size boost — makes the field visibly react to cursor movement
    this.size = this.baseSize;
    if (mouse.x != null && mouse.y != null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influenceRadius = mouse.radius;

      if (dist < influenceRadius) {
        const force = (influenceRadius - dist) / influenceRadius;
        const pushX = (dx / (dist || 1)) * force * 3.2;
        const pushY = (dy / (dist || 1)) * force * 3.2;
        this.x += pushX;
        this.y += pushY;
        this.size = this.baseSize + force * 2.5;
      }
    }

    this.draw(ctx);
  }
}

export function useCanvasWaves() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 110 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let step = 0;

    const resizeCanvas = () => {
      // Fix: Use the exact CSS pixel dimensions of the canvas element 
      // instead of window.innerWidth so the coordinates perfectly align.
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 1.8 + 0.6;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const directionX = Math.random() * 0.5 - 0.25;
        const directionY = Math.random() * 0.5 - 0.25;
        particles.push(new Particle(canvas, x, y, directionX, directionY, size, "#818cf8"));
      }
    };

    const drawWaveBundle = (numLines, colorBase, isReversed = false) => {
      const mouse = mouseRef.current;
      const mouseInfluenceX = mouse.x != null ? mouse.x / canvas.width : 0.5;

      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = colorBase(i, numLines);

        for (let x = 0; x <= canvas.width + 50; x += 15) {
          const progress = x / canvas.width;

          // Waves bulge subtly toward the cursor's horizontal position for a felt sense of interactivity
          const proximity = 1 - Math.min(Math.abs(progress - mouseInfluenceX) * 2.2, 1);
          const mouseBoost = mouse.x != null ? proximity * 28 : 0;

          const y = isReversed
            ? canvas.height * 0.8 -
              Math.sin(progress * Math.PI * 1.5 - step * 0.5) * (canvas.height * 0.35) +
              Math.sin(x * 0.003 + step + i * 0.15) * 50 +
              i * 9 -
              mouseBoost
            : canvas.height * 0.2 +
              Math.sin(progress * Math.PI * 1.5 + step * 0.5) * (canvas.height * 0.35) +
              Math.cos(x * 0.003 - step + i * 0.15) * 50 +
              i * 9 +
              mouseBoost;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    const drawWaves = () => {
      step += 0.005;
      const numLines = 16;
      drawWaveBundle(numLines, (i) => `rgba(99, 102, 241, ${0.08 + (i / numLines) * 0.28})`, false);
      drawWaveBundle(numLines, (i) => `rgba(129, 140, 248, ${0.06 + (i / numLines) * 0.24})`, true);
    };

    const connectParticles = () => {
      const mouse = mouseRef.current;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            const opacityValue = 1 - distance / 110;
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacityValue * 0.28})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }

        if (mouse.x != null && mouse.y != null) {
          const dxMouse = particles[a].x - mouse.x;
          const dyMouse = particles[a].y - mouse.y;
          const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distanceMouse < mouse.radius) {
            const opacityValue = 1 - distanceMouse / mouse.radius;
            ctx.strokeStyle = `rgba(165, 180, 252, ${opacityValue * 0.8})`;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Soft glow pulse directly under the cursor for extra visual feedback
      if (mouse.x != null && mouse.y != null) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        gradient.addColorStop(0, "rgba(129, 140, 248, 0.12)");
        gradient.addColorStop(1, "rgba(129, 140, 248, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawWaves();
      particles.forEach((particle) => particle.update(ctx, mouseRef.current));
      connectParticles();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const { left, top } = canvasRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - left, y: e.clientY - top, radius: 110 };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: null, y: null, radius: 110 };
  };

  return { canvasRef, handleMouseMove, handleMouseLeave };
}