"use client";

import type { KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ProgrammeStage } from "./ProgrammeStructure";

type StructureStageProps = {
  stage: ProgrammeStage;
  isActive: boolean;
  isFinePointer: boolean;
  panelId: string;
  onSelect: (id: number) => void;
  onHover: (id: number) => void;
  onLeave: () => void;
  variant?: "stepper" | "overlay";
};

export function StructureStage({
  stage,
  isActive,
  isFinePointer,
  panelId,
  onSelect,
  onHover,
  onLeave,
  variant = "stepper",
}: StructureStageProps) {
  const reduceMotion = useReducedMotion();

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(stage.id);
    }
  };

  const handleEnter = () => {
    if (isFinePointer) onHover(stage.id);
  };

  const handleLeave = () => {
    if (isFinePointer) onLeave();
  };

  if (variant === "overlay") {
    return null;
  }

  return (
    <motion.button
      type="button"
      aria-label={`Open Phase ${stage.id}, ${stage.fullTitle}`}
      aria-expanded={isActive}
      aria-controls={panelId}
      onClick={() => onSelect(stage.id)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      onKeyDown={handleKeyDown}
      className="group relative z-[2] flex w-full flex-col items-center px-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A47]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F2E8]"
      animate={{ scale: isActive && !reduceMotion ? 1.03 : 1 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full border font-serif text-[17px] transition-all duration-200 lg:h-16 lg:w-16 lg:text-[18px] ${
          isActive
            ? "border-[#B58A47] bg-[#243128] text-[#FFFDF8] shadow-[0_0_0_4px_rgba(181,138,71,0.28)]"
            : "border-[#C4A574] bg-[#FFFDF8] text-[#68665F] group-hover:border-[#B58A47] group-hover:text-[#1F2622]"
        }`}
      >
        {stage.id}
      </span>

      <span
        className={`mt-3 max-w-[150px] text-center font-sans text-[11px] font-bold leading-tight lg:text-[12px] ${
          isActive ? "text-[#1F2622]" : "text-[#5C574F] group-hover:text-[#1F2622]"
        }`}
      >
        {stage.shortTitle}
      </span>
    </motion.button>
  );
}
