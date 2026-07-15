const WHY_BODY = [
  "Why is it so hard to close the gap between who you know you could be and the life you are actually living? Why do we get stuck, over and over, in the exact place we swore we'd never be again? Why do we try so hard, fail so many times, and still not understand what went wrong? Is it me? Is it the world?",
  "I have asked myself that question more times than I can count.",
  "I grew up around violence. As an adult, I experienced homelessness. I learned how to survive, keep going and push through, no matter what was happening inside me.",
  "For a long time, I believed that was strength.",
  "Then I reached for the thing I wanted most in the world: becoming a mother. The road there brought pregnancy loss, infertility, painful procedures and more fear than I knew how to carry. Each time I was knocked down, I forced myself back up. I told myself that surviving made me strong.",
  "It took me years to understand that surviving was all I was doing.",
  "After everything it had taken to have my children, I nearly lost one of my daughters to a severe viral infection. After that, something in me could no longer keep pushing through. That was my lowest point, but it was also the first time I truly asked for help.",
  "That was when everything began to make sense.",
  "None of those experiences had landed on a blank slate. Every loss, every fear and every crisis had been layered on top of everything that came before. My body was responding to the present through the lens of my history.",
  "Those patterns were shaping my fears, my reactions and even the ways I pulled back from the life I was working so hard to build. I could understand what had happened to me, yet I still could not understand why I kept getting stuck.",
  "That stuckness appeared everywhere, including in my attempts to build my own business. I wanted to create meaningful work of my own, but I kept starting, stopping and losing trust in myself. It was not because I lacked ambition or effort. I was trying to build a future while my body was still focused on surviving the present.",
  "This is what I know now, and what I most want other women to understand.",
  "The problem was never that I was not trying hard enough. It was not a lack of discipline, willpower or desire. You can want change with everything you have and still struggle to reach it when your nervous system does not yet feel safe or steady enough to support that change.",
  "When no one explains this, you blame yourself. You decide that something is wrong with you, or that the life you want is simply not meant for you. You push harder, fall back again and end up feeling even more stuck.",
  "But it is not a failure of character.",
  "It is a body that learned to survive first and live second.",
  "Once I understood that, I stopped searching for another way to force myself forward. I began learning how to recognise my patterns, reconnect with myself and build the safety that change requires.",
  "That is the work I now do with women who recognise themselves in this story.",
  "It is why I created The Bridge Hub, and why I continue doing this work.",
] as const;

function Eyebrow({ children }: { children: string }) {
  return (
    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-glow-sage/30 bg-glow-sage/10 px-3.5 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#D4D8C4]">
      <span
        className="h-[5px] w-[5px] rounded-full bg-glow-sage shadow-[0_0_10px_rgba(190,194,169,0.75)]"
        aria-hidden
      />
      {children}
    </span>
  );
}

export function AboutKeynote() {
  return (
    <section className="relative overflow-hidden border-t border-line-stone bg-deep-card px-6 py-[clamp(82px,10vw,112px)]">
      <div
        className="pointer-events-none absolute -left-[8%] -top-[16%] h-[560px] w-[560px] animate-bm-aurora-a rounded-full bg-[radial-gradient(circle,rgba(142,154,124,0.54),transparent_68%)] blur-[36px] motion-reduce:animate-none"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-[22%] -right-[12%] h-[620px] w-[620px] animate-bm-aurora-b rounded-full bg-[radial-gradient(circle,rgba(218,206,191,0.34),transparent_68%)] blur-[42px] motion-reduce:animate-none"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-deep-card/35" aria-hidden />

      <div className="relative mx-auto max-w-[860px]">
        <div className="overflow-hidden rounded-[30px] border border-cream/10 bg-deep-card/70 px-7 py-9 shadow-[0_50px_120px_-60px_rgba(0,0,0,0.75)] backdrop-blur-sm md:px-10 md:py-11">
          <Eyebrow>My Why</Eyebrow>
          <h2 className="font-serif text-[clamp(26px,4.5vw,36px)] font-normal leading-[1.14] text-cream">
            Why I Do This Work
          </h2>
          <div className="mt-6 space-y-5 font-sans text-body-lg leading-[1.82] text-[#D4D8C4]">
            {WHY_BODY.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
