"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "Is the Clarity Call a sales call?",
    answer:
      "It is a clinical conversation first. Caroline will have read your Bridge Map results before you speak. There is no pressure to decide on the call.",
  },
  {
    question: "Is this therapy?",
    answer:
      "No. This work is educational and supportive. If clinical therapy is what you need, Caroline will tell you honestly.",
  },
  {
    question: "What if I am not sure I am ready?",
    answer:
      "Start with the free class. Take the screening. You do not have to commit to anything to find out what your nervous system profile is.",
  },
  {
    question: "How is The Bridge Map different from a quiz?",
    answer:
      "It uses five validated clinical instruments used by psychologists worldwide. It is not a quiz. It is a structured psychological screening.",
  },
  {
    question:
      "What if I have already done therapy or personal development work?",
    answer:
      "Many women who come to The Bridge Hub have done significant work elsewhere. The Bridge Map gives Caroline a specific, structured picture of where you are right now — which makes the Clarity Call more useful, not less.",
  },
  {
    question: "Is my information private?",
    answer:
      "Yes. Your data is stored securely, seen only by you and Caroline, and held in compliance with GDPR. You can request deletion at any time.",
  },
] as const;

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-line-stone bg-warm-paper py-[72px]">
      <div className="mx-auto max-w-[680px] px-6">
        <p className="mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-sage">
          Common questions
        </p>
        <h2 className="mb-1.5 font-serif text-[clamp(20px,6vw,34px)] font-normal text-ink">
          What most women want to know before they start.
        </h2>
        <p className="mb-9 font-sans text-[13px] leading-[2.2] text-soft-ink">
          About The Bridge Programme
        </p>

        <div>
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="border-b border-line-stone py-5"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent p-0 text-left"
                >
                  <span className="font-sans text-sm font-medium text-ink">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 font-sans text-xs text-sage transition-transform duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    ⌄
                  </span>
                </button>
                {isOpen && (
                  <p className="mb-0 mt-3 font-sans text-[13px] leading-[1.7] text-soft-ink">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
