"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFinePointer } from "@/lib/marketing/useFinePointer";
import { StructureStage } from "./StructureStage";

export type ProgrammeStage = {
  id: number;
  shortTitle: string;
  fullTitle: string;
  description: string;
  tabLabel: string;
};

export const PROGRAMME_STAGES: readonly ProgrammeStage[] = [
  {
    id: 1,
    shortTitle: "Understanding",
    tabLabel: "Understanding",
    fullTitle: "Phase 1 · Weeks 1 and 2 — Understanding your profile",
    description:
      "We make sense of what your Bridge Map revealed. Why your body has been responding this way. Why this was never a discipline problem, and never your fault.",
  },
  {
    id: 2,
    shortTitle: "Building the foundation",
    tabLabel: "Foundation",
    fullTitle: "Phase 2 · Weeks 3 and 4 — Building the foundation",
    description:
      "You start working with your nervous system instead of against it. Small, consistent shifts your body can actually hold. Safety before pressure, always in that order.",
  },
  {
    id: 3,
    shortTitle: "Deepening capacity",
    tabLabel: "Capacity",
    fullTitle: "Phase 3 · Weeks 5 and 6 — Deepening capacity",
    description:
      "We apply what's working and adjust what isn't. We go deeper into the patterns that need the most attention, and build momentum that doesn't collapse the moment life gets hard.",
  },
  {
    id: 4,
    shortTitle: "Integration",
    tabLabel: "Integration",
    fullTitle: "Phase 4 · Weeks 7 and 8 — Integration",
    description:
      "Everything moves into your real life and your actual goals. You feel progress where before you only felt stuck. This is where the wall comes down.",
  },
] as const;

const contentEase = [0.22, 1, 0.36, 1] as const;

const contentVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

function Eyebrow({ children }: { children: string }) {
  return (
    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(31,38,34,0.14)] bg-[#FFFDF8]/60 px-3.5 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#68665F]">
      <span className="h-[5px] w-[5px] rounded-full bg-[#B58A47]" aria-hidden />
      {children}
    </span>
  );
}

type StageContentPanelProps = {
  stage: ProgrammeStage;
  panelId: string;
  showNav?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
};

function StageContentPanel({
  stage,
  panelId,
  showNav = false,
  onPrevious,
  onNext,
}: StageContentPanelProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key={stage.id}
      id={panelId}
      role="region"
      aria-live="polite"
      aria-label={stage.fullTitle}
      initial={reduceMotion ? false : contentVariants.initial}
      animate={contentVariants.animate}
      exit={contentVariants.exit}
      transition={{ duration: reduceMotion ? 0 : 0.28, ease: contentEase }}
      className="rounded-[24px] border border-[rgba(31,38,34,0.14)] bg-[#FFFDF8] px-6 py-7 shadow-[0_18px_44px_-36px_rgba(31,38,34,0.18)] sm:px-8 sm:py-8"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-[#B58A47]">
              Phase {stage.id}
            </span>
            <span className="font-sans text-[11px] text-[#68665F]">
              {stage.id} of {PROGRAMME_STAGES.length}
            </span>
          </div>
          <h3 className="font-serif text-[clamp(22px,4vw,30px)] font-normal leading-[1.14] text-[#1F2622]">
            {stage.fullTitle}
          </h3>
          <p className="font-sans text-body leading-[1.72] text-[#68665F]">
            {stage.description}
          </p>
        </div>

        {showNav ? (
          <div className="flex shrink-0 items-center gap-2 self-start">
            <button
              type="button"
              onClick={onPrevious}
              disabled={stage.id === 1}
              aria-label="Previous phase"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(31,38,34,0.14)] bg-[#F7F2E8] text-[#1F2622] transition-colors hover:bg-[#FFFDF8] disabled:cursor-not-allowed disabled:opacity-35 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A47]/60"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={stage.id === PROGRAMME_STAGES.length}
              aria-label="Next phase"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(31,38,34,0.14)] bg-[#F7F2E8] text-[#1F2622] transition-colors hover:bg-[#FFFDF8] disabled:cursor-not-allowed disabled:opacity-35 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A47]/60"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

export function ProgrammeStructure() {
  const finePointer = useFinePointer();
  const reduceMotion = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const [activeStage, setActiveStage] = useState(1);
  const [lockedStage, setLockedStage] = useState<number | null>(null);

  const currentStage =
    PROGRAMME_STAGES.find((stage) => stage.id === activeStage) ?? PROGRAMME_STAGES[0];

  const panelId = "programme-structure-panel";
  const mobilePanelId = "programme-structure-mobile-panel";

  const selectStage = useCallback(
    (id: number) => {
      if (finePointer) {
        if (lockedStage === id) {
          setLockedStage(null);
          setActiveStage(1);
          return;
        }
        setLockedStage(id);
        setActiveStage(id);
        return;
      }

      setActiveStage(id);
      setLockedStage(id);
    },
    [finePointer, lockedStage],
  );

  const hoverStage = useCallback(
    (id: number) => {
      if (!finePointer || lockedStage !== null) return;
      setActiveStage(id);
    },
    [finePointer, lockedStage],
  );

  const leaveStage = useCallback(() => {
    if (!finePointer || lockedStage !== null) return;
    setActiveStage(1);
  }, [finePointer, lockedStage]);

  const goToPrevious = () => {
    setActiveStage((prev) => Math.max(1, prev - 1));
    setLockedStage((prev) => (prev !== null ? Math.max(1, prev - 1) : prev));
  };

  const goToNext = () => {
    setActiveStage((prev) => Math.min(PROGRAMME_STAGES.length, prev + 1));
    setLockedStage((prev) =>
      prev !== null ? Math.min(PROGRAMME_STAGES.length, prev + 1) : prev,
    );
  };

  useEffect(() => {
    const tab = tabRefs.current[activeStage - 1];
    if (!tab) return;
    tab.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeStage, reduceMotion]);

  const handleSectionKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPrevious();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNext();
    }
  };

  const progressScale =
    activeStage <= 1 ? 0 : (activeStage - 1) / (PROGRAMME_STAGES.length - 1);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="programme-structure-heading"
      onKeyDown={handleSectionKeyDown}
      className="border-t border-line-stone bg-[#F7F2E8] px-6 py-[clamp(72px,9vw,96px)]"
    >
      <div className="mx-auto max-w-[1040px]">
        <Eyebrow>THE STRUCTURE</Eyebrow>
        <h2
          id="programme-structure-heading"
          className="max-w-[620px] font-serif text-[clamp(32px,6vw,44px)] font-normal leading-[1.1] text-[#1F2622]"
        >
          How the Eight Weeks Work
        </h2>
        <p className="mt-4 max-w-[560px] font-sans text-body-lg leading-[1.72] text-[#68665F]">
          Move through four stages, each building on the one before it.
        </p>

        <div className="relative mt-10 lg:mt-12">
          {/* Bridge artwork — clean centrepiece, no overlays */}
          <div className="overflow-hidden rounded-[28px] border border-[rgba(31,38,34,0.1)] bg-[#FFFDF8] px-4 py-6 shadow-[0_24px_60px_-44px_rgba(31,38,34,0.22)] sm:px-8 sm:py-8">
            <Image
              src="/images/bridge-programme-structure2.png"
              alt="Four-stage Bridge Programme structure from understanding to integration"
              width={1672}
              height={941}
              unoptimized
              sizes="(max-width: 1024px) 100vw, 1040px"
              className="mx-auto h-auto w-full max-w-[920px] object-contain"
            />
          </div>

          {/* Desktop horizontal stepper — below the bridge */}
          <div className="relative mt-10 hidden lg:block">
            <div
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-8 z-[1] h-px bg-[rgba(196,165,116,0.4)]"
              aria-hidden
            >
              <motion.div
                className="h-full origin-left bg-[#B58A47]"
                animate={{ scaleX: progressScale }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: contentEase }}
                style={{ width: "100%" }}
              />
            </div>

            <div className="relative z-[2] grid grid-cols-4 gap-4">
              {PROGRAMME_STAGES.map((stage) => (
                <StructureStage
                  key={stage.id}
                  stage={stage}
                  isActive={activeStage === stage.id}
                  isFinePointer={finePointer}
                  panelId={panelId}
                  onSelect={selectStage}
                  onHover={hoverStage}
                  onLeave={leaveStage}
                />
              ))}
            </div>
          </div>

          {/* Mobile tab selector */}
          <div className="mt-8 lg:hidden">
            <div
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Programme phases"
            >
              {PROGRAMME_STAGES.map((stage, index) => {
                const selected = activeStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={mobilePanelId}
                    onClick={() => selectStage(stage.id)}
                    className={`shrink-0 rounded-full border px-4 py-2.5 font-sans text-[12px] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A47]/60 ${
                      selected
                        ? "border-[#B58A47] bg-[#243128] text-[#FFFDF8]"
                        : "border-[#D9C3A0] bg-[#FFFDF8] text-[#68665F]"
                    }`}
                  >
                    <span className="mr-1.5 font-medium">{stage.id}</span>
                    {stage.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile content panel */}
          <div className="mt-5 lg:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <StageContentPanel
                key={`mobile-${currentStage.id}`}
                stage={currentStage}
                panelId={mobilePanelId}
              />
            </AnimatePresence>
          </div>

          {/* Desktop shared panel */}
          <div className="mt-8 hidden lg:block">
            <AnimatePresence mode="wait" initial={false}>
              <StageContentPanel
                key={`desktop-${currentStage.id}`}
                stage={currentStage}
                panelId={panelId}
                showNav
                onPrevious={goToPrevious}
                onNext={goToNext}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
