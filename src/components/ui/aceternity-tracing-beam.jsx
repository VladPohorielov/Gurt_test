import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const TracingBeam = ({ children, className }) => {
  const ref = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [activePathLength, setActivePathLength] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setSvgHeight(ref.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        setActivePathLength(scrollProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Tracing line */}
      <div className="absolute left-4 top-3 md:left-20">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="block"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD400" stopOpacity="0" />
              <stop offset="10%" stopColor="#FFD400" stopOpacity="1" />
              <stop offset="50%" stopColor="#FFA500" stopOpacity="1" />
              <stop offset="90%" stopColor="#FFD400" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFD400" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Background path */}
          <path
            d={`M 1 0 L 1 ${svgHeight}`}
            fill="none"
            stroke="#374151"
            strokeOpacity="0.16"
            strokeWidth="1"
          />
          
          {/* Active path */}
          <path
            d={`M 1 0 L 1 ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              strokeDasharray: svgHeight,
              strokeDashoffset: svgHeight * (1 - activePathLength),
              transition: "stroke-dashoffset 0.3s ease"
            }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative pl-16 md:pl-32">
        {children}
      </div>
    </div>
  );
};

export default TracingBeam;