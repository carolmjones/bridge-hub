import Image from "next/image";

const BODY_PARAGRAPHS = [
  "I have walked this path first as a nurse and later through years of personal healing, study and ongoing training in psychotherapy and counselling.",
  "Change is not simply something I speak about. It is something I have had to live. For the past five years, I have been doing my own healing work. I have experienced the frustration, the setbacks and the moments of wondering whether anything would truly shift. I also know what can become possible when the patterns held in the body begin to change.",
  "I kept seeing the same struggle in the women I worked with. They were intelligent, capable and committed. They had tried everything, yet they still felt unable to move forward. It was not because they were not trying hard enough. The work simply was not reaching the level where the pattern was being held.",
  "What changed my understanding was learning that the nervous system is not fixed. The brain and body can develop new patterns throughout life. This capacity for change, known as neuroplasticity, is the foundation of the work I do.",
] as const;

export function Founder() {
  return (
    <section className="border-t border-line-stone bg-cream py-[72px]">
      <div className="mx-auto max-w-[680px] px-6">
        <p className="mb-5 font-serif text-lg italic text-sage">
          A different path is possible.
        </p>

        <h2 className="mb-6 font-serif text-[clamp(28px,6vw,34px)] font-normal text-ink">
          Hey, I am Caroline.
        </h2>

        <div
          className="relative mb-8 h-[340px] w-full overflow-hidden rounded-xl bg-stone"
          role="img"
          aria-label="Caroline Jones"
        >
          <Image
            src="/images/caroline-web4-founder.jpg"
            alt=""
            fill
            unoptimized
            className="object-cover object-[center_18%]"
            sizes="(max-width: 680px) 100vw, 680px"
          />
        </div>

        {BODY_PARAGRAPHS.map((paragraph, index) => (
          <p
            key={paragraph.slice(0, 48)}
            className={`mb-4 font-sans text-body-lg leading-[1.75] last:mb-0 ${
              index === BODY_PARAGRAPHS.length - 1
                ? "font-medium text-ink"
                : "text-soft-ink"
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
