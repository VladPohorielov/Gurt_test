import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export const GeminiEffect = ({ children, className, pathLengths = [0.2, 0.8, 0.6, 0.4, 1.0] }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    let animationId;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Малюємо анімовані лінії
      pathLengths.forEach((pathLength, index) => {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "rgba(255, 212, 0, 0)");
        gradient.addColorStop(0.5, "rgba(255, 212, 0, 0.8)");
        gradient.addColorStop(1, "rgba(255, 165, 0, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        const y = (canvas.height / (pathLengths.length + 1)) * (index + 1);
        const startX = (time * 50 + index * 100) % (canvas.width + 200) - 100;
        const endX = startX + canvas.width * pathLength;
        
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
      });

      time += 0.01;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [pathLengths]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GeminiEffect;