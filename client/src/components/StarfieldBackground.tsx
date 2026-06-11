import { useEffect, useRef, useState } from "react";
import Ariral from "@/assets/AriralShip.gif";
import Starbound from "@/assets/Starbound.gif";
import Venator from "@/assets/Venator.gif";
import Warframe from "@/assets/Warframe.gif";


interface Asset {
  name: string;
  speed: number;
  asset_url: string;
}

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

interface Special {
  id: number
  x: number;
  y: number;
  angle: number;
  asset: Asset;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [specials, setSpecials] = useState<Special[]>([]);
  const specialsRef = useRef<Special[]>([]);
  const idCounter = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false }); // optimize for no transparency on base
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Lower resolution for pixelated look
    const pixelScale = 2;

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
    const starColors = [
      "rgb(255, 255, 255)",
      "rgb(248, 207, 135)",
      "rgb(151, 245, 255)",
      "rgb(255, 135, 119)"
    ];

    const initStars = () => {
      stars.length = 0;
      const starCount = (width * height) / 350; // Density, more is less stars
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() > 0.9 ? 2 : 1, // Occasional bigger stars
          color: starColors[Math.floor(Math.random() * starColors.length)],
          speed: Math.random() * 0.0005, // Very slow background movement
          blinkSpeed: 0.001 + Math.random() * 0.005,
          opacity: Math.random(),
          blinkDir: 1,
        });
      }
    };

    // Comets
    const comets: Comet[] = [];
    const spawnComet = () => {
      if (Math.random() > 0.005 || comets.length > 4) return; // Rare spawn, limit of 4
      const startSide = Math.random() > 0.5 ? "left" : "top";
      let x, y, angle;

      if (startSide === "left") {
        x = -20;
        y = Math.random() * (height / 2);
        angle = Math.PI / 4 + (Math.random() * 0.2 - Math.random()); // Diagonally down
      } else {
        x = Math.random() * (width / 2);
        y = -20;
        angle = Math.PI / 4 + (Math.random() * 0.2 - Math.random());
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
    
    // Special
    const spawnSpecial = () => {
      if (Math.random() > 0.003 || specialsRef.current.length > 3) return; // Rare spawn
      const startSide = Math.round(Math.random() * 10 % 4);
      const assetType = Math.round(Math.random() * 10 % 4);
      let x = 0, y = 0, angle = 0, asset: Asset;

      switch(assetType) {
        case 0: // Ariral Ship
          asset = {
            name: "AriralShip",
            speed: 0.5 + Math.random() * 0.5,
            asset_url: Ariral
          }
          break;
        case 1: // Starbound Ship
          asset = {
            name: "StarboundShip",
            speed: 0.5 + Math.random() * 0.5,
            asset_url: Starbound
          }
          break;
        case 2: // Venator Ship
          asset = {
            name: "VenatorShip",
            speed: 0,
            asset_url: Venator
          }
          x = Math.random() * (width - 100) + 100 ;
          y = Math.random() * (height - 100) + 100;
          angle = Math.PI + (Math.random() * 0.4 - 0.2); // Move mostly leftwards
          break;
        case 3: // Warframe
        default:
          asset = {
            name: "Warframe",
            speed: Math.random()/2,
            asset_url: Warframe
          }
          break;
      }
      if (specialsRef.current.some((v) => v.asset.name == asset.name)) return;
      console.log(asset.name)

      switch(startSide) {
        case 0: // left moving right
          if (assetType == 0 || assetType == 1) {
            x = -30;
            y = Math.random() * height;
            angle = (Math.random() * 0.4) - 0.2; // Move mostly rightwards
            break;
          }
        case 1: // top moving down
          if (assetType == 0 || assetType == 1) {
            x = Math.random() * width;
            y = -30;
            angle = Math.PI / 2 + (Math.random() * 0.4 - 0.2); // Move mostly downwards
            break;
          }
        case 2: // bottom moving up
          if (assetType == 0 || assetType == 1) {
            x = Math.random() * width;
            y = height + 30;
            angle = -Math.PI / 2 + (Math.random() * 0.4 - 0.2); // Move mostly upwards
            break;
          }
        case 3: // right moving left
        default:
          if (assetType != 2){
            x = width + 30;
            y = Math.random() * height;
            angle = Math.PI + (Math.random() * 0.4 - 0.2); // Move mostly leftwards
            break;
          }
      }
      specialsRef.current.push({id: idCounter.current++, x, y, angle, asset});
    };

    // Nebula / Galaxy clouds
    const nebulas: Nebula[] = [];
    const initNebulas = () => {
      const count = 9;
      const colors = [
        "rgba(76, 29, 149, 0.2)",
        "rgba(30, 64, 175, 0.2)",
        "rgba(157, 23, 77, 0.1)",
        "rgba(72, 225, 50, 0.1)",
        "rgba(139, 41, 166, 0.1)",
      ];

      for (let i = 0; i < count; i++) {
        nebulas.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 30 + Math.random() * 350,
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
      // pure redraw is cleaner for pixel art style
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

      // Draw Specials
      spawnSpecial();
      const nextSpecials = [];
      for (let i = specialsRef.current.length - 1; i >= 0; i--) {
        const gif = specialsRef.current[i];
        const nextX = gif.x + Math.cos(gif.angle) * gif.asset.speed;
        const nextY = gif.y + Math.sin(gif.angle) * gif.asset.speed;

        // Keep item if it's within bounds
        if (nextX <= width + 100 && nextX >= -100 && nextY <= height + 100 && nextY >= -100) {
          gif.x = nextX;
          gif.y = nextY;
          nextSpecials.push(gif);
        }
      }
      specialsRef.current = nextSpecials;
      setSpecials([...nextSpecials]) // Update state
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none overflow-hidden select-none">
      {/* Background Layer Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: "pixelated" }} />

      {/* Foreground Layer Asset Rendering */}
      {specials.map((sp) => {
        // Offset the rotation by 180 degrees (Math.PI) to point the left side forward
        const targetRotationRad = sp.angle + (sp.asset.name == "AriralShip" || sp.asset.name == "StarboundShip" ? 0 :Math.PI);
        const scale = sp.asset.name == "VenatorShip" ? 2 : 1;

        return (
          <img
            key={sp.id}
            src={sp.asset.asset_url}
            alt={sp.asset.name}
            className="absolute origin-center"
            style={{
              // Remap canvas coordinates back to native window sizes
              left: `${sp.x * 2}px`,
              top: `${sp.y * 2}px`,
              transform: `translate(-50%, -50%) rotate(${targetRotationRad}rad)`,
              imageRendering: "pixelated",
              scale: scale
            }}
          />
        );
      })}
    </div>
/*    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[-1] pointer-events-none"
      style={{
        imageRendering: "pixelated",
      }}
    />*/
  );
}
