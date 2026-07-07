import Image from "next/image";

const CREDENTIALS = [
  {
    icon: "/images/about/icon-stethoscope.png",
    label: "Dual Registered Nurse with NMBI (Children's and Adults)",
  },
  {
    icon: "/images/about/icon-degree.png",
    label:
      "Master's in Psychology, University of South Wales, specialising in Play Therapy, thesis grounded in attachment theory",
  },
  {
    icon: "/images/about/icon-book.png",
    label:
      "Currently in Psychotherapy and Counselling training at PCI College Ireland",
  },
  {
    icon: "/images/about/icon-people.png",
    label: "Member of IACP",
  },
  {
    icon: "/images/about/icon-document.png",
    label: "Published research in Play Therapy. UNIFESP.",
  },
] as const;

export function AboutCredentials() {
  return (
    <section className="border-b border-line-stone bg-warm-paper px-6 py-[clamp(56px,8vw,88px)] pt-[clamp(24px,4vw,40px)]">
      <div className="mx-auto max-w-[1080px]">
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-line-stone" aria-hidden />
          <p className="shrink-0 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-sage">
            Training &amp; credentials
          </p>
          <div className="h-px flex-1 bg-line-stone" aria-hidden />
        </div>

        <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {CREDENTIALS.map(({ icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center px-2 text-center"
            >
              <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-stone/70 bg-[#F3EDE2]">
                <Image
                  src={icon}
                  alt=""
                  width={32}
                  height={32}
                  unoptimized
                  className="h-8 w-8 object-contain"
                  aria-hidden
                />
              </div>
              <p className="font-sans text-[11px] leading-[1.55] text-soft-ink">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
