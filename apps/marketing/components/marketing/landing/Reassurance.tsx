import Image from "next/image";

export function Reassurance() {
  return (
    <section className="border-t border-line-stone bg-warm-paper py-[72px] text-center">
      <div className="mx-auto max-w-[400px] px-6">
        <div
          className="relative mx-auto mb-6 h-16 w-16 overflow-hidden rounded-full bg-stone"
          role="img"
          aria-label="Caroline Jones"
        >
          <Image
            src="/images/caroline-face.png"
            alt=""
            fill
            unoptimized
            className="object-cover object-center"
            sizes="128px"
          />
        </div>

        <h2 className="mb-5 font-serif text-[30px] font-normal text-ink">
          You are not alone.
        </h2>

        <p className="mb-2 font-sans text-body-lg text-soft-ink">
          I am here to show you that your body has been doing exactly what it
          learned to do.
        </p>
        <p className="font-sans text-body-lg font-medium text-ink">
          And I will give you the roadmap to move past it.
        </p>
      </div>
    </section>
  );
}
