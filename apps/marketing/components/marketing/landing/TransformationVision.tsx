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
      <div className="relative mx-auto max-w-[500px] px-6">
        <p className="font-serif text-[22px] italic leading-[1.85] text-ink">
          Imagine a life that has room for you. Where rest does not have to be
          earned. Where your future does not feel like a threat. It is possible —
          and you are exactly the right person to create it.
        </p>
      </div>
    </section>
  );
}
