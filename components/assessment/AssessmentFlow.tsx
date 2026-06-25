"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PCL5_WRITE_IN_BODY,
  PCL5_WRITE_IN_HEADING,
  PCL5_WRITE_IN_LABEL,
  PCL5_WRITE_IN_PLACEHOLDER,
  QUESTIONS,
  TOTAL_QUESTIONS,
  type Question,
} from "@/lib/data/questions";
import { getSection, SECTIONS } from "@/lib/data/sections";
import {
  answerKey,
  loadLocalAssessment,
  saveLocalAssessment,
} from "@/lib/assessment/storage";
import { SectionTransition } from "@/components/assessment/SectionTransition";
import { AnswerCard } from "@/components/ui/AnswerCard";
import { BreathingButton } from "@/components/ui/BreathingButton";
import { BreathingOverlay } from "@/components/ui/BreathingOverlay";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { Wordmark } from "@/components/ui/Wordmark";

type AssessmentFlowProps = {
  sessionId: string;
  initialSection: number;
  initialItem: number;
  initialAnswers: Record<string, number>;
  showInitialTransition?: boolean;
};

type View =
  | { kind: "transition"; sectionIndex: number }
  | { kind: "write_in" }
  | { kind: "question"; question: Question };

export function AssessmentFlow({
  sessionId,
  initialSection,
  initialItem,
  initialAnswers,
  showInitialTransition = false,
}: AssessmentFlowProps) {
  const router = useRouter();
  const [sectionIndex, setSectionIndex] = useState(initialSection);
  const [itemIndex, setItemIndex] = useState(initialItem);
  const [answers, setAnswers] = useState(initialAnswers);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [dimmed, setDimmed] = useState(false);
  const [breathingOpen, setBreathingOpen] = useState(false);
  const [writeInDone, setWriteInDone] = useState(false);
  const [writeInText, setWriteInText] = useState("");
  const [view, setView] = useState<View>(() => {
    if (showInitialTransition) {
      return { kind: "transition", sectionIndex: 1 };
    }
    return {
      kind: "question",
      question:
        QUESTIONS.find(
          (q) => q.sectionIndex === initialSection && q.sectionItemIndex === initialItem
        ) ?? QUESTIONS[0],
    };
  });

  const currentQuestion = useMemo(() => {
    if (view.kind === "question") {
      return view.question;
    }
    return QUESTIONS.find(
      (q) => q.sectionIndex === sectionIndex && q.sectionItemIndex === itemIndex
    );
  }, [view, sectionIndex, itemIndex]);

  const section = getSection(sectionIndex);

  const completeSection = useCallback(
    async (
      instrument: Question["instrument"],
      options?: { writeIn?: string; final?: boolean }
    ) => {
      await fetch("/api/session/complete-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          instrument,
          section_end_time: new Date().toISOString(),
          write_in_text: options?.writeIn,
          complete_assessment: options?.final,
        }),
      });
    },
    [sessionId]
  );

  useEffect(() => {
    const local = loadLocalAssessment();
    if (local && local.sessionId === sessionId && !showInitialTransition) {
      setSectionIndex(local.currentSection);
      setItemIndex(local.currentItem);
      setAnswers((prev) => ({ ...prev, ...local.answers }));
      const question = QUESTIONS.find(
        (q) =>
          q.sectionIndex === local.currentSection &&
          q.sectionItemIndex === local.currentItem
      );
      if (question) {
        setView({ kind: "question", question });
      }
    }
  }, [sessionId, showInitialTransition]);

  useEffect(() => {
    history.pushState(null, "", window.location.href);
    const onPopState = () => {
      history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const persistAnswer = useCallback(
    async (question: Question, value: number, nextSection: number, nextItem: number) => {
      const key = answerKey(question.instrument, question.instrumentItemNumber);
      const nextAnswers = { ...answers, [key]: value };
      setAnswers(nextAnswers);

      saveLocalAssessment({
        sessionId,
        currentSection: nextSection,
        currentItem: nextItem,
        answers: nextAnswers,
        updatedAt: new Date().toISOString(),
      });

      await fetch("/api/session/save-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          instrument: question.instrument,
          item_number: question.instrumentItemNumber,
          response_value: value,
          reverse_scored: question.reverseScored,
          current_section: nextSection,
          current_item: nextItem,
          section_start:
            question.sectionItemIndex === 1
              ? new Date().toISOString()
              : undefined,
        }),
      });
    },
    [answers, sessionId]
  );

  const advanceAfterTransition = useCallback(
    (nextSectionIndex: number) => {
      if (nextSectionIndex === 4 && !writeInDone) {
        setView({ kind: "write_in" });
        return;
      }
      const firstQuestion = QUESTIONS.find((q) => q.sectionIndex === nextSectionIndex);
      if (!firstQuestion) {
        router.push("/results");
        return;
      }
      setSectionIndex(nextSectionIndex);
      setItemIndex(1);
      setSelectedValue(null);
      setView({ kind: "question", question: firstQuestion });
    },
    [router, writeInDone]
  );

  const handleTransitionComplete = useCallback(() => {
    if (view.kind === "transition") {
      advanceAfterTransition(view.sectionIndex);
    }
  }, [advanceAfterTransition, view]);

  const handleAnswer = async (value: number) => {
    if (!currentQuestion || view.kind !== "question") {
      return;
    }

    setSelectedValue(value);
    setDimmed(true);

    const isLastInSection =
      currentQuestion.sectionItemIndex === section.itemCount;
    const isLastOverall = currentQuestion.globalIndex === TOTAL_QUESTIONS;

    let nextSection = sectionIndex;
    let nextItem = itemIndex + 1;

    if (isLastInSection) {
      if (isLastOverall) {
        await persistAnswer(currentQuestion, value, sectionIndex, itemIndex);
        await completeSection(currentQuestion.instrument, {
          writeIn: writeInText.trim() || undefined,
          final: true,
        });
        router.push("/results");
        return;
      }
      nextSection = sectionIndex + 1;
      nextItem = 1;
      await persistAnswer(currentQuestion, value, nextSection, nextItem);
      await completeSection(currentQuestion.instrument, {
        writeIn:
          currentQuestion.instrument === "PCL5"
            ? writeInText.trim() || undefined
            : undefined,
      });
      window.setTimeout(() => {
        setSelectedValue(null);
        setDimmed(false);
        setSectionIndex(nextSection);
        setItemIndex(nextItem);
        setView({ kind: "transition", sectionIndex: nextSection });
      }, 400);
      return;
    }

    await persistAnswer(currentQuestion, value, sectionIndex, nextItem);

    const nextQuestion = QUESTIONS.find(
      (q) =>
        q.sectionIndex === sectionIndex && q.sectionItemIndex === itemIndex + 1
    );

    window.setTimeout(() => {
      setSelectedValue(null);
      setDimmed(false);
      setItemIndex(nextItem);
      if (nextQuestion) {
        setView({ kind: "question", question: nextQuestion });
      }
    }, 400);
  };

  if (view.kind === "transition") {
    return (
      <SectionTransition
        section={getSection(view.sectionIndex)}
        onComplete={handleTransitionComplete}
      />
    );
  }

  if (view.kind === "write_in") {
    return (
      <div
        className="flex min-h-dvh flex-col px-5 py-6"
        style={{ backgroundColor: section.toneBg }}
      >
        <div className="flex items-center justify-between">
          <p className="font-sans text-label uppercase text-soft-ink">
            {section.userFacingName}
          </p>
          <BreathingButton onClick={() => setBreathingOpen(true)} />
        </div>
        <ProgressIndicator
          currentSection={sectionIndex}
          sectionProgress={0}
        />
        <div className="flex flex-1 flex-col justify-center">
          <h2 className="font-serif text-xl text-ink">{PCL5_WRITE_IN_HEADING}</h2>
          <p className="mt-3 font-sans text-body-sm leading-relaxed text-soft-ink">
            {PCL5_WRITE_IN_BODY}
          </p>
          <label
            htmlFor="pcl-write-in"
            className="mt-6 font-sans text-body-sm font-medium text-ink"
          >
            {PCL5_WRITE_IN_LABEL}
          </label>
          <textarea
            id="pcl-write-in"
            rows={3}
            className="mt-2 w-full rounded-card border border-line-stone/40 bg-white p-4 font-sans text-body text-ink"
            placeholder={PCL5_WRITE_IN_PLACEHOLDER}
            value={writeInText}
            onChange={(event) => setWriteInText(event.target.value)}
          />
          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setWriteInDone(true);
                advanceAfterTransition(4);
              }}
              className="btn-primary"
            >
              Begin section 4
            </button>
            <button
              type="button"
              onClick={() => {
                setWriteInDone(true);
                advanceAfterTransition(4);
              }}
              className="py-3 font-sans text-body-sm text-soft-ink underline"
            >
              Skip
            </button>
          </div>
        </div>
        <Wordmark className="mt-8 self-center" />
        <BreathingOverlay open={breathingOpen} onClose={() => setBreathingOpen(false)} />
      </div>
    );
  }

  const question = view.question;
  const sectionProgress = (question.sectionItemIndex - 1) / section.itemCount;

  return (
    <div className="flex min-h-dvh flex-col bg-warm-paper px-5 py-6">
      <div className="flex items-center justify-between">
        <p className="font-sans text-label uppercase text-soft-ink">
          {section.userFacingName}
        </p>
        <BreathingButton onClick={() => setBreathingOpen(true)} />
      </div>
      <ProgressIndicator
        currentSection={sectionIndex}
        sectionProgress={sectionProgress}
      />

      <div className="mt-10 flex flex-1 flex-col">
        {question.sectionItemIndex === 1 && (
          <p className="mb-6 font-sans text-body-sm leading-relaxed text-soft-ink">
            {section.assessmentInstruction}
          </p>
        )}
        <p className="font-sans text-label text-soft-ink/70">
          Question {question.sectionItemIndex} of {section.itemCount}
        </p>
        <h2 className="mt-4 font-serif text-lg leading-snug text-ink md:text-xl">
          {question.text}
        </h2>
        <div className="mt-8 flex flex-col gap-2.5">
          {question.scale.map((option) => (
            <AnswerCard
              key={option.value}
              label={option.label}
              selected={selectedValue === option.value}
              dimmed={dimmed && selectedValue !== option.value}
              hoverTone={section.toneHover}
              onSelect={() => handleAnswer(option.value)}
            />
          ))}
        </div>
      </div>

      <Wordmark className="mt-10 self-center opacity-40" />
      <BreathingOverlay open={breathingOpen} onClose={() => setBreathingOpen(false)} />
    </div>
  );
}
