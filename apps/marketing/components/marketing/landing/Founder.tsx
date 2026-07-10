import Image from "next/image";

const BODY_PARAGRAPHS = [
  "I have walked this path — first as a nurse, then as a therapist.",
  "Embracing change and evolving is not just what I teach — it is something I have lived. I have been on my own healing path for five years. I have felt the frustration, the setbacks, and the moments of wondering if anything would actually shift. I know firsthand what becomes possible when stored patterns in the body start to change.",
  "What I kept seeing with clients was the same thing: intelligent, capable women who had tried everything and still could not move forward. Not because they were not trying. Because the work was not reaching the right level.",
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

        {BODY_PARAGRAPHS.map((paragraph) => (
          <p
            key={paragraph}
            className="mb-4 font-sans text-body-lg leading-[1.75] text-soft-ink last:mb-0"
          >
            {paragraph}
          </p>
        ))}

        <p className="mt-4 font-sans text-body-lg font-medium leading-[1.75] text-ink">
          What I discovered changed everything: the nervous system is not fixed.
          Neuroscience shows us that the brain and body can form new patterns at
          any age. That capacity for change — neuroplasticity — is the
          foundation of everything I do.
        </p>
      </div>
    </section>
  );
}
