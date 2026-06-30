import Image from "next/image";

export function TransformationVision() {
  return (
    <section className="relative overflow-hidden border-t border-line-stone bg-cream py-[72px] text-center">
      <Image
        src="/images/leaf.png"
        alt=""
        width={165}
        height={165}
        className="pointer-events-none absolute -left-[26px] -top-[25px] rotate-[20deg] opacity-40"
        aria-hidden
      />
      <Image
        src="/images/leaf.png"
        alt=""
        width={180}
        height={180}
        className="pointer-events-none absolute -bottom-11 -right-11 -scale-x-100 rotate-[10deg] opacity-40"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[760px] px-6">
        <div className="relative overflow-hidden rounded-[26px] border border-line-stone/70 bg-gradient-to-b from-white/75 via-white/55 to-white/35 px-7 py-10 shadow-[0_26px_60px_-40px_rgba(35,40,36,0.35)] backdrop-blur-sm md:px-12">
          <div
            className="pointer-events-none absolute -left-24 -top-20 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(190,194,169,0.35),transparent_70%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-28 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(158,170,132,0.26),transparent_72%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.55)_32%,transparent_62%)] opacity-50"
            aria-hidden
          />
          <p className="relative font-serif text-[22px] italic leading-[1.85] text-ink md:text-[24px]">
            Imagine a life that has room for you. Where rest does not have to be
            earned. Where your future does not feel like a threat. It is possible
            — and you are exactly the right person to create it.
          </p>
        </div>
      </div>
    </section>
  );
}
