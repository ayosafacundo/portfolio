import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  blinkSpeed: number;
  opacity: number;
  blinkDir: number;
}

interface Comet {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  color: string;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false }); // optimize for no transparency on base
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Lower resolution for pixelated look
    const pixelScale = 4;

    const resize = () => {
      width = Math.ceil(window.innerWidth / pixelScale);
      height = Math.ceil(window.innerHeight / pixelScale);
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);
    resize();

    // Stars
    const stars: Star[] = [];
    const starColors = ["#ffffff", "#ffe9c4", "#d4fbff", "#ffdad5"]; // White, yellowish, bluish, reddish

    const initStars = () => {
      stars.length = 0;
      const starCount = (width * height) / 105; // Density
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() > 0.9 ? 2 : 1, // Occasional bigger stars
          color: starColors[Math.floor(Math.random() * starColors.length)],
          speed: Math.random() * 0.005, // Very slow background movement
          blinkSpeed: 0.01 + Math.random() * 0.05,
          opacity: Math.random(),
          blinkDir: 1,
        });
      }
    };

    // Comets
    const comets: Comet[] = [];
    const spawnComet = () => {
      if (Math.random() > 0.005) return; // Rare spawn

      const startSide = Math.random() > 0.5 ? "left" : "top";
      let x, y, angle;

      if (startSide === "left") {
        x = -20;
        y = Math.random() * (height / 2);
        angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1); // Diagonally down
      } else {
        x = Math.random() * (width / 2);
        y = -20;
        angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1);
      }

      comets.push({
        x,
        y,
        length: 10 + Math.random() * 20,
        speed: 1 + Math.random() * 1.5,
        angle,
        color: Math.random() > 0.5 ? "#50c878" : "#00ffff", // Green or Cyan tails
      });
    };

    // Nebula / Galaxy clouds
    const nebulas: Nebula[] = [];
    const initNebulas = () => {
      const count = 5;
      const colors = [
        "rgba(76, 29, 149, 0.2)",
        "rgba(30, 64, 175, 0.2)",
        "rgba(157, 23, 77, 0.1)",
      ];

      for (let i = 0; i < count; i++) {
        nebulas.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 30 + Math.random() * 50,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
        });
      }
    };

    initStars();
    initNebulas();

    let animationFrameId: number;

    const render = () => {
      // Clear with trail effect for comets? No, pure redraw is cleaner for pixel art style usually,
      // but maybe a slight fade for "monitor ghosting" effect
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // Draw Nebulas
      nebulas.forEach((neb) => {
        neb.x += neb.vx;
        neb.y += neb.vy;

        // Bounce off edges
        if (neb.x < -50 || neb.x > width + 50) neb.vx *= -1;
        if (neb.y < -50 || neb.y > height + 50) neb.vy *= -1;

        const gradient = ctx.createRadialGradient(
          neb.x,
          neb.y,
          0,
          neb.x,
          neb.y,
          neb.radius,
        );
        gradient.addColorStop(0, neb.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(
          neb.x - neb.radius,
          neb.y - neb.radius,
          neb.radius * 2,
          neb.radius * 2,
        );
      });

      // Draw Stars
      stars.forEach((star) => {
        // Blink
        star.opacity += star.blinkSpeed * star.blinkDir;
        if (star.opacity >= 1 || star.opacity <= 0.3) star.blinkDir *= -1;

        // Move
        star.y -= star.speed;
        if (star.y < 0) star.y = height;

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        ctx.fillRect(
          Math.round(star.x),
          Math.round(star.y),
          star.size,
          star.size,
        );
        ctx.globalAlpha = 1.0;
      });

      // Draw Constellations (connect nearby stars)
      /*
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let i = 0; i < stars.length; i++) {
        // Only check some stars to save perf
        if (i % 10 !== 0) continue; 
        
        const starA = stars[i];
        for (let j = i + 1; j < stars.length; j++) {
           // Limit connections
           if (Math.random() > 0.05) continue;

           const starB = stars[j];
           const dx = starA.x - starB.x;
           const dy = starA.y - starB.y;
           const dist = Math.sqrt(dx * dx + dy * dy);

           if (dist < 30) { // Connection distance in low-res pixels
             ctx.moveTo(Math.round(starA.x), Math.round(starA.y));
             ctx.lineTo(Math.round(starB.x), Math.round(starB.y));
           }
        }
      }
      ctx.stroke();
      */
      // Draw Comets
      spawnComet();
      for (let i = comets.length - 1; i >= 0; i--) {
        const comet = comets[i];
        comet.x += Math.cos(comet.angle) * comet.speed;
        comet.y += Math.sin(comet.angle) * comet.speed;

        // Draw head
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(Math.round(comet.x), Math.round(comet.y), 2, 2);

        // Draw tail
        for (let t = 0; t < comet.length; t++) {
          const tailX = comet.x - Math.cos(comet.angle) * t;
          const tailY = comet.y - Math.sin(comet.angle) * t;
          ctx.fillStyle = comet.color;
          ctx.globalAlpha = 1 - t / comet.length;
          if (t % 2 === 0) {
            // Pixelated dithering for tail
            ctx.fillRect(Math.round(tailX), Math.round(tailY), 1, 1);
          }
        }
        ctx.globalAlpha = 1.0;

        // Remove off-screen comets
        if (comet.x > width + 50 || comet.y > height + 50) {
          comets.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[-1] pointer-events-none"
      style={{
        imageRendering: "pixelated",
      }}
    />
  );
}
