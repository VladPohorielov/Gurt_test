import { cn } from "@/lib/utils";

export default function LightRaysFallback({ 
  className = "", 
  opacity = 0.25 
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0">
        {/* SVG промені */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ray-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity={opacity} />
              <stop offset="50%" stopColor="white" stopOpacity={opacity * 0.6} />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ray-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="20%" stopColor="white" stopOpacity={opacity} />
              <stop offset="80%" stopColor="white" stopOpacity={opacity} />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Центральне сяйво */}
          <circle 
            cx="500" 
            cy="500" 
            r="80" 
            fill="url(#ray-gradient)" 
            className="animate-pulse"
            style={{ filter: 'blur(20px)' }}
          />
          
          {/* Промені */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (360 / 8) * i;
            return (
              <g key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
                <line
                  x1="500"
                  y1="500"
                  x2="900"
                  y2="500"
                  stroke="url(#ray-line)"
                  strokeWidth="2"
                  transform={`rotate(${angle} 500 500)`}
                  style={{ filter: 'blur(1px)' }}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}