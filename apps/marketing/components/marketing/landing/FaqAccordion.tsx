"use client";

import { useState } from "react";
import { LANDING_FAQS } from "@/lib/marketing/faq";

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
          {LANDING_FAQS.map((faq, index) => {
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
