function getDiscoveryEmbedUrl(): string | null {
  return process.env.NEXT_PUBLIC_CAL_DISCOVERY_EMBED_URL?.trim() || null;
}

export function DiscoveryCallPage() {
  const embedUrl = getDiscoveryEmbedUrl();
  const embedSrc = embedUrl
    ? `${embedUrl}${embedUrl.includes("?") ? "&" : "?"}embed=true`
    : null;

  return (
    <section className="border-t border-line-stone bg-warm-paper px-6 py-[clamp(72px,9vw,104px)]">
      <div className="mx-auto max-w-[720px]">
        <div className="mx-auto mb-10 max-w-[520px] text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line-stone bg-white/60 px-3.5 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B7060]">
            <span className="h-[5px] w-[5px] rounded-full bg-glow-sage" aria-hidden />
            Free Discovery Call
          </span>
          <h1 className="font-serif text-[clamp(32px,5.5vw,44px)] font-normal leading-[1.12] text-ink">
            15 minutes. No commitment. Just a conversation.
          </h1>
          <p className="mt-4 font-sans text-body-lg leading-[1.72] text-soft-ink">
            Not sure where to start? Book a free 15 minute call with Caroline to
            talk it through before you decide on anything.
          </p>
        </div>

        <div className="overflow-hidden rounded-[22px] border border-line-stone bg-white/90 shadow-[0_20px_48px_-36px_rgba(35,40,36,0.22)]">
          <div className="border-b border-line-stone/70 px-5 py-4">
            <p className="font-sans text-[15px] font-medium text-ink">
              Discovery Call · Caroline Jones
            </p>
            <p className="mt-1 font-sans text-[13px] text-soft-ink/70">
              15 min · Video · Free
            </p>
          </div>
          {embedSrc ? (
            <iframe
              title="Book your Discovery Call"
              src={embedSrc}
              className="h-[640px] w-full border-0"
              loading="lazy"
            />
          ) : (
            <div className="px-5 py-12 text-center">
              <p className="font-sans text-body-lg text-soft-ink">
                Calendar is not configured yet.
              </p>
              <p className="mt-2 font-sans text-[13px] text-soft-ink/60">
                Set NEXT_PUBLIC_CAL_DISCOVERY_EMBED_URL in your environment.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
