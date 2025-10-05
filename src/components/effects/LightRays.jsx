export default function LightRays({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 1440 800" aria-hidden="true">
        <defs>
          <radialGradient id="rg" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopOpacity="0.8" stopColor="white" />
            <stop offset="100%" stopOpacity="0" stopColor="white" />
          </radialGradient>
          <linearGradient id="fade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0.35" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="mask">
            <rect width="100%" height="100%" fill="url(#fade)" />
          </mask>
        </defs>

        {/* Темний градієнт фону */}
        <rect width="100%" height="100%" fill="url(#rg)" opacity="0.15" />

        {/* 3 промені зверху */}
        <g mask="url(#mask)" opacity="0.7">
          <g className="animate-[pulse_6s_ease-in-out_infinite]">
            <path d="M400,-100 L520,0 280,800 160,800 Z" fill="url(#fade)" />
          </g>
          <g className="animate-[pulse_7s_ease-in-out_infinite]">
            <path d="M720,-100 L840,0 600,800 480,800 Z" fill="url(#fade)" />
          </g>
          <g className="animate-[pulse_8s_ease-in-out_infinite]">
            <path d="M1040,-100 L1160,0 920,800 800,800 Z" fill="url(#fade)" />
          </g>
        </g>
      </svg>
    </div>
  );
}