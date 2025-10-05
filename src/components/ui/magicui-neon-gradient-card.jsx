import React from "react";
import { cn } from "@/lib/utils";

export const NeonGradientCard = ({ children, className, borderSize = 2, borderRadius = 16, neonColors = {
  firstColor: "#FFD400",
  secondColor: "#FFA500",
}, ...props }) => {
  return (
    <div
      className={cn(
        "relative h-fit w-full overflow-hidden rounded-3xl bg-neutral-950 p-[1px]",
        className
      )}
      style={{
        borderRadius: `${borderRadius}px`,
      }}
      {...props}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          padding: `${borderSize}px`,
          background: `linear-gradient(90deg, ${neonColors.firstColor}, ${neonColors.secondColor}, ${neonColors.firstColor})`,
          backgroundSize: "400% auto",
          animation: "gradient 6s linear infinite",
        }}
      />
      <div
        className="relative h-full w-full rounded-3xl bg-neutral-950"
        style={{
          borderRadius: `${borderRadius - borderSize}px`,
        }}
      >
        {children}
      </div>
      
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default NeonGradientCard;