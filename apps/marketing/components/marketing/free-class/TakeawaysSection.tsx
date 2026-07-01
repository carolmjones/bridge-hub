import Image from "next/image";
import { TakeawaysFlourish } from "./TakeawaysFlourish";

type Takeaway = {
  readonly num: string;
  readonly icon: string;
  readonly text: string;
};

export function TakeawaysSection({
  takeaways,
  title,
  subtitle,
}: {
  takeaways: readonly Takeaway[];
  title: string;
  subtitle: string;
}) {
  return (
    <section className="border-t border-line-stone bg-warm-paper px-6 py-[clamp(72px,9vw,96px)]">
      <div className="mx-auto max-w-[1120px] text-center">
        <TakeawaysFlourish />
        <h2 className="font-serif text-[clamp(32px,5vw,42px)] font-normal leading-[1.12] text-ink">
          {title}
        </h2>
        <p className="mt-2 font-sans text-sm text-soft-ink">{subtitle}</p>

        <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-5 lg:gap-4">
          {takeaways.map((item) => (
            <div
              key={item.num}
              className="flex flex-col items-center rounded-[12px] border border-line-stone bg-cream px-3 py-4 text-center sm:min-h-[260px] sm:rounded-[14px] sm:py-8 lg:min-h-[240px]"
            >
              <Image
                src={item.icon}
                alt=""
                width={78}
                height={78}
                className="mb-2 h-12 w-12 object-contain sm:mb-5 sm:h-16 sm:w-16 lg:mb-5 lg:h-[78px] lg:w-[78px]"
                aria-hidden
              />
              <span className="mb-2 font-serif text-2xl font-normal leading-none text-[#6E6254] sm:mb-4 sm:text-[32px]">
                {item.num}
              </span>
              <p className="font-sans text-[11px] leading-[1.55] text-soft-ink sm:text-[12px] sm:leading-[1.65]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
