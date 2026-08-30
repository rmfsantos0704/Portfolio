import { useEffect, useRef } from "react";

class Particle {
  constructor(canvas, x, y, directionX, directionY, size, color) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(ctx) {
    if (this.x > this.canvas.width || this.x < 0) this.directionX = -this.directionX;
    if (this.y > this.canvas.height || this.y < 0) this.directionY = -this.directionY;
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw(ctx);
  }
}

export function useCanvasWaves() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let step = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 14000;
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 1.5 + 0.5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const directionX = Math.random() * 0.4 - 0.2;
        const directionY = Math.random() * 0.4 - 0.2;
        particles.push(new Particle(canvas, x, y, directionX, directionY, size, "#6366f1"));
      }
    };

    const drawWaveBundle = (numLines, colorBase, isReversed = false) => {
      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = colorBase(i, numLines);

        for (let x = 0; x <= canvas.width + 50; x += 15) {
          const progress = x / canvas.width;
          const y = isReversed
            ? canvas.height * 0.8 -
              Math.sin(progress * Math.PI * 1.5 - step * 0.5) * (canvas.height * 0.35) +
              Math.sin(x * 0.003 + step + i * 0.15) * 50 +
              i * 9
            : canvas.height * 0.2 +
              Math.sin(progress * Math.PI * 1.5 + step * 0.5) * (canvas.height * 0.35) +
              Math.cos(x * 0.003 - step + i * 0.15) * 50 +
              i * 9;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    const drawWaves = () => {
      step += 0.004;
      const numLines = 14;
      drawWaveBundle(numLines, (i) => `rgba(99, 102, 241, ${0.05 + (i / numLines) * 0.18})`, false);
      drawWaveBundle(numLines, (i) => `rgba(129, 140, 248, ${0.04 + (i / numLines) * 0.15})`, true);
    };

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 95) {
            const opacityValue = 1 - distance / 95;
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacityValue * 0.2})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }

        const mouse = mouseRef.current;
        if (mouse.x != null && mouse.y != null) {
          const dxMouse = particles[a].x - mouse.x;
          const dyMouse = particles[a].y - mouse.y;
          const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          
          if (distanceMouse < mouse.radius) {
            const opacityValue = 1 - distanceMouse / mouse.radius;
            ctx.strokeStyle = `rgba(129, 140, 248, ${opacityValue * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawWaves();
      particles.forEach((particle) => particle.update(ctx));
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
    mouseRef.current = { x: e.clientX - left, y: e.clientY - top, radius: 150 };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: null, y: null, radius: 150 };
  };

  return { canvasRef, handleMouseMove, handleMouseLeave };
}