import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const FocusCards = ({ cards, className }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {cards.map((card, index) => (
        <div
          key={card.id || index}
          className={cn(
            "relative h-96 w-full rounded-3xl overflow-hidden transition-all duration-300 ease-out",
            hovered !== null && hovered !== index && "blur-sm scale-[0.98] opacity-50"
          )}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          {card}
        </div>
      ))}
    </div>
  );
};

export default FocusCards;